# Cronos Hardhat Boilerplate

## Hardhat dependencies (including typescript dependencies) included in this repo

The dependencies have been installed with:

```shell
npm install --save-dev hardhat hardhat-gas-reporter

npm install --save-dev typescript ts-node

npm install --save-dev typechain

npm install --save-dev chai @types/node @types/mocha @types/chai ethereum-waffle

npm install --save-dev @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle @typechain/ethers-v5 @typechain/hardhat

npm install ethers dotenv @openzeppelin/contracts
```

## Set-up

```shell
npm install
```

## Local deployment and testing

```shell
npx hardhat compile
npx hardhat test
npx hardhat run scripts/DeployMyERC20.script.ts --network ganache
```

## Deployment to cronos mainnet

```shell
npx hardhat run scripts/DeployMyERC20.script.ts --network cronos
```
