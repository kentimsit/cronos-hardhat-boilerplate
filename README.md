# Cronos Hardhat Boilerplate

## Hardhat dependencies (including typescript dependencies) included in this repo

The dependencies have been installed with:

```shell

npx hardhat
# "❯ Create an advanced sample project that uses TypeScript"

npm install ethers dotenv @openzeppelin/contracts

npm install --save-dev solidity-coverage hardhat-gas-reporter
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

## Deployment to cronos mainnet

```shell
npx hardhat run scripts/DeployMyERC20.script.ts --network cronos
```

## Contract verification on Cronoscan

```shell
npx hardhat verify --constructor-args scripts/deploy-verification-arguments.js DEPLOYED_CONTRACT_ADDRESS --network cronos
```
