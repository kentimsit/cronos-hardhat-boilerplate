// Run with:
// npx ts-node scripts/check-network-status.ts

import * as dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

async function main() {
    const provider = new ethers.JsonRpcProvider("https://evm.cronos.org/");
    const lastBlock = await provider.getBlockNumber();
    console.log("Last block number:", lastBlock);
}

main().catch(console.error);
