# Cronos Hardhat Boilerplate

## Hardhat dependencies (including typescript dependencies) included in this repo

The dependencies have been installed with:

```shell

npx hardhat
# "❯ Create an advanced sample project that uses TypeScript"

npm install ethers dotenv @openzeppelin/contracts
npm install --save-dev @nomiclabs/hardhat-etherscan@^3.1.0
npm install --save-dev @cronos-labs/hardhat-cronoscan
npm install --save-dev solidity-coverage
npm install --save-dev hardhat-gas-reporter
```

## Set-up

```shell
npm install
```

## Local deployment and testing

```shell
npx hardhat compile
npx hardhat test
npx hardhat coverage
npx hardhat run scripts/DeployMyERC20.script.ts --network ganache
```

## Deployment to cronos

Cronos Tesnet:

```shell
npx hardhat run scripts/DeployMyERC20.script.ts --network cronos_testnet
```

Cronos Mainnet:

```shell
npx hardhat run scripts/DeployMyERC20.script.ts --network cronos
```

## Contract verification on Cronoscan

Contract verification requires a dedicated Cronos plug-in for Hardhat: see documentation at https://www.npmjs.com/package/@cronos-labs/hardhat-cronoscan and follow the instructions.

Check list of supported network:

```
npx hardhat verify --list-networks
```

Verify on Cronos Testnet:

```shell
npx hardhat verify --network cronosTestnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"

# For example:
npx hardhat verify --network cronosTestnet "0xf70333ABcE27D26ACa444457735F5f95AA0bf6ce" "My token name" "My token symbol"
```

Verify on Cronos Mainnet:

```shell
npx hardhat verify --network cronos DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```
