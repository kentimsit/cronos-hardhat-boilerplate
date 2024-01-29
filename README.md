# Cronos Hardhat Boilerplate

## Hardhat dependencies (including typescript dependencies) included in this repo

This project was created with `npx hardhat init` (see hardhat.org), using Typescript.

It leverages the following libraries:

-   OpenZeppelin contracts (https://docs.openzeppelin.com/contracts/)

## Set-up

```bash
npm install
```

See the configuration file `hardhat.config.ts` including network details for Cronos blockchain.

Create .env file for environment variables, using .env.example as template.

# Create your contract(s)

Smart contracts are created in the /contracts directory.

You can use https://wizard.openzeppelin.com/ to generate standard code.

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

The test also incluces a gas report when the .env file includes: `REPORT_GAS=true npx hardhat test`.

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

Don't forget to note the address of the contract after deployment.

## Contract verification on Cronoscan

For contract verification, you need an API key for the Explorer API. Here are the URLs where you can register in order to request an API key:

-   Cronos Mainnet: https://explorer-api-doc.cronos.org/mainnet/
-   Cronos Testnet: https://explorer-api-doc.cronos.org/testnet/

Contract verification requires custom chain configuration in `hardhat.config.ts`. See the `hardhat.config.ts` file in this repository for Cronos testnet and mainnet configurations.

To see the list of supported blockchain network for contract verification:

```
npx hardhat verify --list-networks
```

Verify on Cronos Testnet by including the constructor's arguments in the command line:

```shell
npx hardhat verify --network cronosTestnet "DEPLOYED_CONTRACT_ADDRESS" "My token name" "My token symbol"
```

Of, if the constructor's arguments have been saved in the "./scripts/deploy-verification-arguments.js" file:

```bash
npx hardhat verify --network cronosTestnet "0x3F273114f20f87C602D87E1f1cd87D6F3ae5Ac72" --constructor-args "./scripts/deploy-verification-arguments.js"
```

Verify on Cronos Mainnet:

```bash
npx hardhat verify --network cronos "DEPLOYED_CONTRACT_ADDRESS" "Constructor argument 1" "Constructor argument 2"
```

## Deployment and verification on Ethereum Sepolia testnet

```bash
npx hardhat run scripts/DeployMyERC20.script.ts --network ethereumSepoliaTestnet
npx hardhat verify --network ethereumSepoliaTestnet "DEPLOYED_CONTRACT_ADDRESS" "My token name" "My token symbol"
```
