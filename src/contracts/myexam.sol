// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract MyExam {
    address public owner;
    address[]  donates;
    uint256  funds;

    constructor ()  {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0,  "Please doante amount more than 0");
        funds += msg.value;
        donates.push(msg.sender);
    }

    modifier isOwner{
        require(msg.sender == owner, "Only owner can withdraw");
        _;
    }

    function withdraw(uint256 _value) public payable isOwner {
        require(_value <= funds, "Insufficient funds");
        payable(owner).transfer(_value);
        funds -= _value;
    }

    function getDonate() public view returns (address[] memory) {
        return donates;
    }
}