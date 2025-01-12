# Multi-Chain Wallet Generator

A secure multi-chain wallet generation tool that can batch generate addresses and private keys for Ethereum (ETH), Bitcoin (BTC), and Solana (SOL).

## Main Features

- 🔐 **Completely Offline**: Ensures maximum security
- 📝 **Batch Wallet Generation**: No limit on the number of wallets
- 💾 **Export Wallet Information**: Save wallet data as a text file
- 🌐 **Offline Support**: Can be used without an internet connection
- 🔗 **Multi-Chain Support**: Supports ETH, BTC, and SOL
- 💻 **Modern User Interface**

## Supported Blockchains

- Ethereum (ETH)
- Bitcoin (BTC)
- Solana (SOL)

## Security Usage Instructions

To ensure maximum security, please follow these steps:

1. Clone and install the project.
2. Run the project and load the page.
3. Disconnect from the network.
4. Generate the desired wallets.
5. Save the wallet information.
6. Clear your browser cache after use.

## Development Deployment

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build Production Version
```bash
npm run build
```

## Tech Stack

- React + TypeScript
- Vite
- ethers.js (ETH)
- bitcoinjs-lib (BTC)
- @solana/web3.js (SOL)
- TailwindCSS
- Lucide Icons

## Security Tips

⚠️ **Important Security Reminder**:

- Your private key is the only credential to access your wallet; keep it secure.
- It is recommended to use this tool in an offline environment.
- Never share your private key with anyone.
- After generating wallets, save the information in a safe offline location.
- Be mindful of system resource consumption when generating a large number of wallets.

## Disclaimer

This tool is for educational and research purposes only. Users assume all risks associated with using this tool, and it is essential to keep the generated private keys secure. The developer is not responsible for any losses resulting from the use of this tool.
