# 🚀 Scaffold-ETH Contract Monitor (SimpleDeFiToken)*
### Miguel Ferreira

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
## Resultado da execução final

![Debug Contracts tab](https://raw.githubusercontent.com/miguelrferreiraf/scaffold-eth-erc20_token/refs/heads/main/img/contract_monitor.png)

---

## 📌 Observações

* O deploy depende do script `01_deploy_simpledefitoken.ts` em `packages/hardhat/deploy/`.
* A página `contract-monitor` usa hooks do Scaffold-ETH para se conectar ao contrato e exibir dados em tempo real.
* É necessário conectar uma carteira (ex.: MetaMask) à rede local Hardhat para visualizar os saldos.

---

