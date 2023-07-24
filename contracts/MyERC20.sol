// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract MyERC20 is
    Context,
    Ownable,
    AccessControlEnumerable,
    ERC20Burnable,
    ERC20Pausable
{
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");
    bytes32 public constant SPENDER_ROLE = keccak256("SPENDER_ROLE");

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(CONTROLLER_ROLE, _msgSender());
        _setupRole(SPENDER_ROLE, _msgSender());
    }

    modifier onlyController() {
        require(
            hasRole(CONTROLLER_ROLE, _msgSender()),
            "Only a contract controller can call this function"
        );
        _;
    }

    modifier onlySpender() {
        require(
            hasRole(SPENDER_ROLE, _msgSender()),
            "Only a contract spender can call this function"
        );
        _;
    }

    function getControllerRole() public view virtual returns (bytes32) {
        return CONTROLLER_ROLE;
    }

    function getSpenderRole() public view virtual returns (bytes32) {
        return SPENDER_ROLE;
    }

    function mint(address to, uint256 amount) public virtual onlyController {
        _mint(to, amount);
    }

    function forceTransfer(
        address from,
        address to,
        uint256 amount
    ) public virtual onlySpender {
        _transfer(from, to, amount);
    }

    function pause() public virtual onlyController {
        _pause();
    }

    function unpause() public virtual onlyController {
        _unpause();
    }

    /**
     * @dev Internal functions
     */

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
