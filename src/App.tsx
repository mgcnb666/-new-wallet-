import React, { useState } from 'react';
import { Wallet } from 'ethers';
import { Keypair } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';
import { Download, Shield } from 'lucide-react';

interface WalletInfo {
  network: string;
  address: string;
  privateKey: string;
}

function App() {
  const [count, setCount] = useState<number>(1);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('eth');

  const generateWallets = () => {
    const newWallets: WalletInfo[] = [];
    for (let i = 0; i < count; i++) {
      switch (selectedNetwork) {
        case 'eth': {
          const wallet = Wallet.createRandom();
          newWallets.push({
            network: 'ETH',
            address: wallet.address,
            privateKey: wallet.privateKey,
          });
          break;
        }
        case 'sol': {
          const keypair = Keypair.generate();
          newWallets.push({
            network: 'SOL',
            address: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('hex'),
          });
          break;
        }
        case 'btc': {
          const keyPair = bitcoin.ECPair.makeRandom();
          const { address } = bitcoin.payments.p2pkh({ 
            pubkey: keyPair.publicKey,
            network: bitcoin.networks.bitcoin 
          });
          newWallets.push({
            network: 'BTC',
            address: address!,
            privateKey: keyPair.privateKey!.toString('hex'),
          });
          break;
        }
      }
    }
    setWallets(newWallets);
  };

  const downloadWallets = () => {
    const content = wallets
      .map((w, i) => `钱包 ${i + 1} (${w.network}):\n地址: ${w.address}\n私钥: ${w.privateKey}\n\n`)
      .join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crypto-wallets.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">多链钱包生成器</h1>
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <Shield size={24} />
            <p className="text-lg">安全离线生成</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              <option value="eth">以太坊 (ETH)</option>
              <option value="btc">比特币 (BTC)</option>
              <option value="sol">索拉纳 (SOL)</option>
            </select>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-gray-700 text-white px-4 py-2 rounded-md w-32"
              placeholder="数量"
            />
            <button
              onClick={generateWallets}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition-colors"
            >
              生成钱包
            </button>
          </div>

          {wallets.length > 0 && (
            <>
              <div className="space-y-4 mb-6">
                {wallets.map((wallet, index) => (
                  <div key={`${wallet.address}-${index}`} className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      钱包 {index + 1} ({wallet.network})
                    </h3>
                    <div className="space-y-2">
                      <p className="break-all">
                        <span className="text-gray-400">地址：</span>
                        {wallet.address}
                      </p>
                      <p className="break-all">
                        <span className="text-gray-400">私钥：</span>
                        {wallet.privateKey}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={downloadWallets}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-md transition-colors"
              >
                <Download size={20} />
                下载钱包信息
              </button>
            </>
          )}
        </div>

        <div className="text-center text-gray-400">
          <p>⚠️ 请务必保管好您的私钥，切勿泄露给他人</p>
          <p>建议在断网环境下使用本工具</p>
        </div>
      </div>
    </div>
  );
}

export default App;