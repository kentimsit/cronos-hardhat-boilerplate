// To run this test
// npx hardhat test
import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyERC20 basic test", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployERC20Fixture() {
        const accounts = await ethers.getSigners();
        const address_owner = await accounts[0].getAddress();
        const address_minter = await accounts[1].getAddress();
        const address_user1 = await accounts[2].getAddress();
        const address_user2 = await accounts[3].getAddress();
        // Contract deployment
        // Token
        const Erc20 = await ethers.getContractFactory("MyERC20");
        const erc20Instance = await Erc20.deploy("Token name", "Token symbol");
        await erc20Instance.waitForDeployment();
        // Mint
        const tx01 = await erc20Instance.mint(address_user1, 1);
        await tx01.wait();
        // Grant controller role to minter
        const CONTROLLER_ROLE = ethers.solidityPackedKeccak256(
            ["string"],
            ["CONTROLLER_ROLE"]
        );
        console.log("CONTROLLER_ROLE", CONTROLLER_ROLE);
        const tx02 = await erc20Instance.grantRole(
            CONTROLLER_ROLE,
            address_minter
        );
        await tx02.wait();
        return { erc20Instance, address_owner, address_minter, address_user1 };
    }

    describe("Checks that things are set-up", function () {
        it("Roles have been setup", async function () {
            const { erc20Instance, address_owner, address_minter } =
                await loadFixture(deployERC20Fixture);
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
            const { erc20Instance, address_user1 } = await loadFixture(
                deployERC20Fixture
            );
            const user1BalanceBN = await erc20Instance.balanceOf(address_user1);
            expect(user1BalanceBN).to.be.equal(1);
        });
    });
});
