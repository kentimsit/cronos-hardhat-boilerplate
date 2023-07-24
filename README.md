# Cronos Hardhat Boilerplate

## Hardhat dependencies (including typescript dependencies) included in this repo

This project was created with `npx hardhat` (see hardhat.org), using Typescript.

It leverages the following libraries:

-   OpenZeppelin contracts (https://docs.openzeppelin.com/contracts/)

## Set-up

```bash
npm install
```

Set-up configuration file `hardhat.config.ts` including network details for Cronos blockchain.

Create .env file for environment variables, using .env.example as template.

# Create your contract(s)

In the /contracts directory.

Use https://wizard.openzeppelin.com/ to generate standard code.

## Local deployment and testing

Compile the smart contracts:

```bash
npx hardhat compile
```

Execute the test script, and then calculate the test coverage of the smart contract code:

```bash
npx hardhat test
npx hardhat coverage
```

The test also incluces a gas report when the .env file includes: `REPORT_GAS=true npx hardhat test`

Deploy the smart contract to the local blockchain network:

```bash
npx hardhat run scripts/DeployMyERC20.script.ts --network hardhat
```

## Deployment to Cronos

Cronos Tesnet:

```bash
npx hardhat run scripts/DeployMyERC20.script.ts --network cronosTestnet
```

Cronos Mainnet:

```bash
npx hardhat run scripts/DeployMyERC20.script.ts --network cronos
```

## Contract verification on Cronoscan

Contract verification requires custom chain configuration in `hardhat.config.ts`. See the `hardhat.config.ts` file in this repository for Cronos testnet and mainnet configurations.

Check list of supported network:

```
npx hardhat verify --list-networks
```

Verify on Cronos Testnet:

```shell
npx hardhat verify --network cronosTestnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```

For example in this case:

```bash
npx hardhat verify --network cronosTestnet "0x3F273114f20f87C602D87E1f1cd87D6F3ae5Ac72" --constructor-args "./scripts/deploy-verification-arguments.js"
```

or

```bash
npx hardhat verify --network cronosTestnet "0x3F273114f20f87C602D87E1f1cd87D6F3ae5Ac72" "My token name" "My token symbol"
```

Verify on Cronos Mainnet:

```bash
npx hardhat verify --network cronos DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```

for example in this case:

```bash
npx hardhat verify --network cronos "0x5110ceB3f5fEd7484fda722A775927d238275D44" --constructor-args "./scripts/deploy-verification-arguments.js"
```
