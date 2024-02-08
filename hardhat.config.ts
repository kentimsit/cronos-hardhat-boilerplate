import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-gas-reporter";

const myPrivateKey: string = <string>process.env.MY_PRIVATE_KEY;
const cronosApiKeyMainnet: string = <string>(
    process.env.CRONOS_EXPLORER_MAINNET_API_KEY
);
const cronosApiKeyTestnet: string = <string>(
    process.env.CRONOS_EXPLORER_TESTNET_API_KEY
);

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
        cronos: {
            url: "https://evm.cronos.org/",
            chainId: 25,
            accounts: [myPrivateKey],
            gasPrice: 10100000000000,
        },
        cronosTestnet: {
            url: "https://evm-t3.cronos.org/",
            chainId: 338,
            accounts: [myPrivateKey],
            gasPrice: 10100000000000,
        },
        ethereumSepoliaTestnet: {
            url: process.env.ETHEREUM_SEPOLIA_URL,
            chainId: 11155111,
            accounts: [myPrivateKey],
        },
    },
    etherscan: {
        apiKey: {
            mainnet: <string>process.env["ETHERSCAN_API_KEY"],
            sepolia: <string>process.env["ETHERSCAN_API_KEY"],
            cronos: cronosApiKeyMainnet,
            cronosTestnet: cronosApiKeyTestnet,
            // As Cronoscan is being replaced by Cronos Explorer, the old settings below are commented out.
            // cronos: <string>process.env["CRONOSCAN_API_KEY"],
        },
        customChains: [
            // Note that the Cronos Explorer API requires the API Key to be part of the URL below as well,
            // so it's not enough to just set the apiKey above.
            // This is different from Etherscan, where the API Key is passed as a separate parameter.
            {
                network: "cronos",
                chainId: 25,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/mainnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyMainnet,
                    browserURL: "https://explorer.cronos.org",
                },
            },
            {
                network: "cronosTestnet",
                chainId: 338,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyTestnet,
                    browserURL: "https://explorer.cronos.org/testnet",
                },
            },
            // As Cronoscan is being replaced by Cronos Explorer, the old settings below are commented out.
            // {
            //     network: "cronos",
            //     chainId: 25,
            //     urls: {
            //         apiURL: "https://api.cronoscan.com/api",
            //         browserURL: "https://cronoscan.com",
            //     },
            // },
        ],
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 5000, // In GWei
        coinmarketcap: <string>process.env["COINMARKETCAP_API"],
    },
    sourcify: {
        enabled: false,
    },
};

export default config;
