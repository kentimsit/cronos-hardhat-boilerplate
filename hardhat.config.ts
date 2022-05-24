import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";

const myPrivateKey: string = <string>process.env.MY_PRIVATE_KEY;

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [myPrivateKey],
    },
    cronos_testnet: {
      url: "https://evm-t3.cronos.org/",
      chainId: 338,
      accounts: [myPrivateKey],
      gasPrice: 5000000000000,
    },
    cronos: {
      url: "https://evm.cronos.org/",
      chainId: 25,
      accounts: [myPrivateKey],
      gasPrice: 5000000000000,
    },
  },
  etherscan: {
    apiKey: {
      cronos: <string>process.env["CRONOSCAN_API"],
    },
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 5000, // In GWei
    coinmarketcap: <string>process.env["COINMARKETCAP_API"],
  },
};

export default config;
