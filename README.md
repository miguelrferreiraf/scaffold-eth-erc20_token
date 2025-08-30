# 🚀 Scaffold-ETH Contract Monitor (SimpleDeFiToken)*

Este é um mini-projeto baseado no **Scaffold-ETH 2** que demonstra como monitorar um contrato ERC20 (com função especial de auto-burn) em tempo real via frontend **Next.js**.

---

## ⚙️ Funcionalidades

- **Contrato monitorado:** `SimpleDeFiToken` (ERC20 básico + função `transferWithAutoBurn`).
- **O que é monitorado:**
  - Nome e símbolo do token.
  - Total Supply.
  - Saldo de ETH e saldo de tokens do usuário conectado.
  - Últimos eventos `Transfer` emitidos pelo contrato.

---

## 📂 Estrutura principal

```

packages/
├── hardhat/         # Backend (contratos, scripts de deploy, chain local)
│   ├── contracts/   # Contrato Solidity (basic\_erc20.sol)
│   ├── deploy/      # Script de deploy (01\_deploy\_simpledefitoken.ts)
│   └── deployments/ # JSONs gerados após deploy
└── nextjs/          # Frontend (Next.js + wagmi + Scaffold hooks)
└── app/
└── contract-monitor/ # Página Contract Monitor

````

---

## 🛠️ Como rodar o projeto

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/miguelrferreiraf/scaffold-eth-erc20_token.git
cd scaffold-first-prjct
yarn install
````

---

### 1️⃣ Subir a blockchain local

```bash
cd packages/hardhat
yarn chain
```

### 2️⃣ Fazer o deploy do contrato

Em outro terminal:

```bash
cd packages/hardhat
yarn deploy
```

Isso vai criar o arquivo JSON de deploy em `packages/hardhat/deployments/localhost/SimpleDeFiToken.json`.

### 3️⃣ Rodar o frontend

Em outro terminal:

```bash
cd packages/nextjs
yarn dev
```

A aplicação estará disponível em:

```
http://localhost:3000/contract-monitor
```

---

## 🧾 Contrato: `SimpleDeFiToken`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleDeFiToken is ERC20 {
    constructor() ERC20("Simple DeFi Token", "SDFT") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function transferWithAutoBurn(address to, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");
        uint256 burnAmount = amount / 10; // 10% burn
        _burn(msg.sender, burnAmount);
        _transfer(msg.sender, to, amount - burnAmount);
    }
}
```

---

## 📌 Observações

* O deploy depende do script `01_deploy_simpledefitoken.ts` em `packages/hardhat/deploy/`.
* A página `contract-monitor` usa hooks do Scaffold-ETH para se conectar ao contrato e exibir dados em tempo real.
* É necessário conectar uma carteira (ex.: MetaMask) à rede local Hardhat para visualizar os saldos.

---

### *Abaixo, segue-se o README.md default do Scaffold-ETH

# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
