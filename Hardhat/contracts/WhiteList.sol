// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract WhiteList
{
    uint public maxWhitelistedAddress;

    mapping(address=>bool)public Whitelistedornot;

    uint public presentNumofWhiteListing;


    constructor(uint _maxWhitelistedAddress)
    {
        maxWhitelistedAddress=_maxWhitelistedAddress;
    }

    function addWhiteListing()public
    {
        require(!Whitelistedornot[msg.sender],"User has Already been WhiteListed");
        require(maxWhitelistedAddress>presentNumofWhiteListing,"Number of Whitelisting Limit has reached");
        Whitelistedornot[msg.sender]=true;
        presentNumofWhiteListing=presentNumofWhiteListing+1;
    }
}