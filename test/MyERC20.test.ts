// To run this test
// npx hardhat test

import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("MyERC20 basic test", function () {
  let accounts: Signer[];
  let erc20Instance: Contract;
  let tx: any;
  let address_owner: string;
  let address_minter: string;
  let address_user1: string;
  let address_user2: string;

  // A before is executed before each 'describe' below
  // A beforeEach is executed before each 'it'
  before(async function () {
    accounts = await ethers.getSigners();
    address_owner = await accounts[0].getAddress();
    address_minter = await accounts[1].getAddress();
    address_user1 = await accounts[2].getAddress();
    address_user2 = await accounts[3].getAddress();
    // Contract deployment
    // Token
    const Erc20 = await ethers.getContractFactory("MyERC20");
    erc20Instance = await Erc20.deploy("Token name", "Token symbol");
    await erc20Instance.deployed();
    // Mint
    tx = await erc20Instance.mint(address_user1, 1);
    await tx.wait();
    // Grant controller role to minter
    const CONTROLLER_ROLE = ethers.utils.solidityKeccak256(
      ["string"],
      ["CONTROLLER_ROLE"]
    );
    console.log("CONTROLLER_ROLE", CONTROLLER_ROLE);
    tx = await erc20Instance.grantRole(CONTROLLER_ROLE, address_minter);
    await tx.wait();
  });

  describe("Checks that things are set-up", async function () {
    it("Roles have been setup", async function () {
      const controllerRole = await erc20Instance.getControllerRole();
      console.log("controllerRole", controllerRole);
      const ownerHasControllerRole = await erc20Instance.hasRole(
        controllerRole,
        address_owner
      );
      expect(ownerHasControllerRole).to.be.true;
      const minterHasControllerRole = await erc20Instance.hasRole(
        controllerRole,
        address_minter
      );
      expect(minterHasControllerRole).to.be.true;
    });
    it("Tokens have been minted", async function () {
      const user1BalanceBN = await erc20Instance.balanceOf(address_user1);
    });
  });
});
