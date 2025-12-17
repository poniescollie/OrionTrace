# OrionTrace

Built for Base

OrionTrace is a small, Base-centric repository created to observe network state, validate RPC responses, and confirm wallet connectivity on Base using official Coinbase tooling.

The repository is intentionally lightweight and focuses on infrastructure signals rather than application-specific business logic.

## Scope and Intent

OrionTrace is designed to:
- Confirm Base Mainnet and Base Sepolia accessibility
- Exercise OnchainKit wallet connection flows
- Perform read-only RPC calls via Viem
- Provide direct Basescan references for inspection and verification

## Networks

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  
RPC: https://mainnet.base.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  
RPC: https://sepolia.base.org  

## Application Behavior

Primary file: `app/orionTrace.ts`

When the app runs:
- An OnchainKitProvider is initialized for the selected Base network
- Wallet connection UI is rendered
- Viem is used to query:
  - RPC chainId
  - latest block number
  - native ETH balance for a supplied address
- Basescan explorer URLs are exposed for transparency

## Project Layout

app/  
- orionTrace.ts  
  React entry component combining wallet UX with Base RPC reads.

Typical repository companions:
- package.json
- tsconfig.json
- .env (optional)

## Libraries and Tooling

OnchainKit  
Wallet UI components and Base-first primitives  
https://github.com/coinbase/onchainkit  

Viem  
EVM client for Base JSON-RPC reads  

## Installation and Running

Requirements:
- Node.js 18+
- Browser environment with wallet support

Install dependencies with your preferred package manager and run the project using a standard React/Vite or Next.js development setup.

Optional environment variables:
- VITE_BASE_RPC_URL
- VITE_BASE_SEPOLIA_RPC_URL

## Author

GitHub: https://github.com/poniescollie/ 

Public contact (email): ponies.04collie@icloud.com 

Public contact (X): https://x.com/nickie_condes

## License

MIT License

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract #1 address:  
0x65454738901cdff1a02c801d1a0a36a3db7c1f4c

Deployment and verification:
- https://sepolia.basescan.org/address/0x65454738901cdff1a02c801d1a0a36a3db7c1f4c
- https://sepolia.basescan.org/0x65454738901cdff1a02c801d1a0a36a3db7c1f4c/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
