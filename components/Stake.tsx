'use client';
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { STAKE_REWARD_TOKEN_CONTRACT, STAKE_TOKEN_CONTRACT, STAKING_CONTRACT } from "@/utils/contract";
import { useEffect, useState } from "react";
import { prepareContractCall, toEther, toWei } from "thirdweb";
import { approve, balanceOf } from "thirdweb/extensions/erc20";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";

export const Stake = () => {
    const account = useActiveAccount();

    const [stakeAmount, setStakeAmount] = useState();
    const [withdrawAmount, setWithdrawAmount] = useState();
    const [stakingState, setStakingState] = useState("init" || "approved");
    const [isStaking, setIsStaking] = useState(false);
    const [isWithdraw, setIsWithdraw] = useState(false);


    const { data: stakingTokenBalance,
        isLoading: loadingstakeTokenBalance,
        refetch: refetchStakingTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: STAKE_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
        }
    );

    const { data: TokenRewardBalance,
        isLoading: loadingRewardTokenBalance,
        refetch: refetchRewardTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: STAKE_REWARD_TOKEN_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
        }
    );

    const { data: stakeInfo,
        refetch: refetchstakeInfo
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
        queryOptions: {
            enabled: !!account,
        },
    });

    function truncate(value: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be a number');
        }
        const factor: number = Math.pow(10, decimalPlaces);
        return Math.trunc(numericValue * factor) / factor;
    }

    useEffect(() => {
        setInterval(() => {
            refetchstakeInfo();
        }, 10000);
    }, []);



    return (
        <div className="text-white">
            {account && (
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <ConnectButton
                            client={client}
                            chain={chain}
                        />
                    </div>

                    <div className="bg-black rounded-xl p-6 space-y-4 border border-zinc-800">
                        {loadingstakeTokenBalance ? (
                            <p className="text-center text-zinc-400">Loading Stake Token Balance...</p>
                        ) : (
                            <p className="text-center text-lg">Available to Stake: <span className="font-mono text-blue-400 font-medium">{truncate(toEther(stakingTokenBalance!), 2)}</span></p>
                        )}

                        {loadingRewardTokenBalance ? (
                            <p className="text-center text-zinc-400">Loading Reward Token Balance...</p>
                        ) : (
                            <p className="text-center text-lg">Rewards Available: <span className="font-mono text-emerald-400 font-medium">{truncate(toEther(TokenRewardBalance!), 2)}</span></p>
                        )}
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsStaking(true)}
                            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Stake Tokens
                        </button>
                        <button
                            onClick={() => setIsWithdraw(true)}
                            className="px-6 py-2.5 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
                        >
                            Withdraw
                        </button>
                    </div>

                    {stakeInfo && (
                        <div className="bg-black rounded-xl p-6 space-y-4 border border-zinc-800">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <p className="text-sm text-zinc-400 mb-1">Total Staked</p>
                                    <p className="text-xl font-mono text-blue-400 font-medium">{truncate(toEther(stakeInfo[0]).toString(), 2)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-zinc-400 mb-1">Pending Rewards</p>
                                    <p className="text-xl font-mono text-emerald-400 font-medium">{truncate(toEther(stakeInfo[1]).toString(), 2)}</p>
                                </div>
                            </div>
                            <TransactionButton
                                transaction={() => (
                                    prepareContractCall({
                                        contract: STAKING_CONTRACT,
                                        method: "claimRewards",
                                    })
                                )}
                                onTransactionConfirmed={() => {
                                    refetchRewardTokenBalance();
                                    refetchstakeInfo();
                                }}
                                className="w-full px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Claim Rewards
                            </TransactionButton>
                        </div>
                    )}

                    {isStaking && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative border border-zinc-800">
                                <button
                                    onClick={() => setIsStaking(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">Stake Tokens</h2>
                                <p className="text-center text-slate-600 mb-6">You can stake your tokens here.</p>
                                <p className="text-right text-slate-600 mb-4">Balance: {truncate(toEther(stakingTokenBalance!), 2)}</p>

                                {stakingState === "init" ? (
                                    <div className="space-y-4">
                                        <input
                                            type="number"
                                            placeholder="0.0"
                                            value={stakeAmount}
                                            onChange={(e) => setStakeAmount(Number(e.target.value))}
                                            className="text-black w-full p-3 text-lg border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                                        />
                                        <TransactionButton
                                            transaction={() => approve({
                                                contract: STAKE_TOKEN_CONTRACT,
                                                spender: STAKING_CONTRACT.address,
                                                amount: stakeAmount,
                                            })}
                                            onTransactionConfirmed={() => setStakingState("approved")}
                                            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Set Approval
                                        </TransactionButton>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-center text-blue-600">{stakeAmount}</h3>
                                        <TransactionButton
                                            transaction={() => prepareContractCall({
                                                contract: STAKING_CONTRACT,
                                                method: "stake",
                                                params: [toWei(stakeAmount.toString())],
                                            })}
                                            onTransactionConfirmed={() => {
                                                setStakeAmount(0);
                                                setStakingState("init");
                                                refetchstakeInfo();
                                                refetchStakingTokenBalance();
                                                setIsStaking(false);
                                            }}
                                            className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                                        >
                                            Stake
                                        </TransactionButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isWithdraw && (
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative border border-zinc-800">
                                <button
                                    onClick={() => setIsWithdraw(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h2 className="text-2xl font-semibold mb-2 text-center text-rose-600">Withdraw</h2>
                                <p className="text-center text-slate-600 mb-6">Enter amount to withdraw</p>
                                <div className="space-y-4">
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                        className=" text-black w-full p-3 text-lg border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    />
                                    <TransactionButton
                                        transaction={() => prepareContractCall({
                                            contract: STAKING_CONTRACT,
                                            method: "withdraw",
                                            params: [toWei(withdrawAmount.toString())],
                                        })}
                                        onTransactionConfirmed={() => {
                                            setWithdrawAmount(0);
                                            refetchstakeInfo();
                                            refetchStakingTokenBalance();
                                            setIsWithdraw(false);
                                        }}
                                        className="w-full px-6 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
                                    >
                                        Withdraw
                                    </TransactionButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
