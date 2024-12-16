import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { STAKING_CONTRACT_ABI } from "./stakingContractABI";
import { SUBSCRIPTION_CONTRACT_ABI } from "./subsCriptionABI";

const stakeTokenAddress="0x656980BE0E30553bFEE7224eE576589D5aAb7f2F";
const stakeTokenRewardAddress="0x724089bF73c4F411c5D51Fcf2179aF0260215c14"
const stakingContractAddress="0x7A7d673cB73855313EF80014FDA002506b95eEd4"

// Subscription contract address
const subsContract = "0xA5Aa49ED221c146bd11d8407dc9e9F97296607cC"

export const STAKE_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address : stakeTokenAddress,
});

export const STAKE_REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address : stakeTokenRewardAddress,
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address : stakingContractAddress,
    abi:STAKING_CONTRACT_ABI,
});

export const SUBSCRIPTION_CONTRACT = getContract({
    client: client,
    chain: chain,
    address : subsContract,
    abi: SUBSCRIPTION_CONTRACT_ABI,
})
