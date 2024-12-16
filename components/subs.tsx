"use client";

import { SUBSCRIPTION_CONTRACT } from "@/utils/contract";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { useState } from "react";
import { prepareContractCall, toEther, toWei } from "thirdweb";

export const SubsCription = () => {
    const account = useActiveAccount();

    const [DepositValue, setDepositValue] = useState(0);
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [Validity, setValidity] = useState("Active" || "Expired");

    const { data: getBalance, isLoading: loading } = useReadContract(
        {
            contract: SUBSCRIPTION_CONTRACT,
            method: "getBalance",
            queryOptions: {
                enabled: !!account
            }
        });

    const { data: getPeriod, isLoading: loadingPeriod } = useReadContract(
        {
            contract: SUBSCRIPTION_CONTRACT,
            method: "period",
            queryOptions: {
                enabled: !!account
            }
        }
    );
    const timeperiod = Number(getPeriod!);
    const HumanReadableTime = new Date(Number(timeperiod) * 1000).toLocaleString();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100 p-6">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
                {/* Connect Wallet */}
                <div className="flex justify-center mb-6">
                    <ConnectButton client={client} chain={chain} />
                </div>

                {/* Account Balance */}
                <div className="mb-6 text-center">
                    {account ? (
                        <>
                            {loading ? (
                                <h3 className="text-xl font-semibold text-gray-500">Loading Balance...</h3>
                            ) : (
                                <h3 className="text-xl font-semibold text-teal-600">Wallet Balance: {toEther(getBalance!).toString()}</h3>
                            )}
                        </>
                    ) : (
                        <h1 className="text-2xl font-bold text-gray-700">Connect Your Wallet First</h1>
                    )}
                </div>

                {/* Subscription Period */}
                <div className="mb-6 text-center">
                    {account ? (<>
                    {loadingPeriod ? (
                        <h3 className="text-xl font-semibold text-gray-500">Loading Subscription Period...</h3>
                    ) : (
                        <>
                            <h3 className="text-xl font-semibold text-indigo-600">Your Subscription Will Expire on:-</h3>
                            <h3 className="text-red-600">{HumanReadableTime}</h3>
                        </>
                    )}
                    </>):(<></>)}
                </div>

                {/* Deposit & Subscription Actions */}
                <div className="mb-6">
                    <input
                        type="number"
                        placeholder="0.0"
                        value={DepositValue}
                        onChange={(e) => setDepositValue(Number(e.target.value))}
                        className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                </div>

                {/* Transaction Buttons */}
                <div className="w-full space-y-4">
                    <TransactionButton
                        transaction={() => (
                            prepareContractCall({
                                contract: SUBSCRIPTION_CONTRACT,
                                method: "deposit",
                                params: [],
                                value: toWei(DepositValue.toString()),
                            })
                        )}
                        onTransactionConfirmed={() => setDepositValue(0)}
                        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Deposit
                    </TransactionButton>

                    <TransactionButton
                        transaction={() =>
                            prepareContractCall({
                                contract: SUBSCRIPTION_CONTRACT,
                                method: "nextPlan",
                            })
                        }
                        onTransactionConfirmed={() => setValidity("Active")}
                        className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Buy Subscription
                    </TransactionButton>

                    {Validity === "Active" ? (
                        <div className="text-center text-green-600 font-semibold">
                            <p>Congratulations, Subscription is Activated!</p>
                        </div>
                    ) : (
                        <div className="text-center text-red-600 font-semibold">
                            <p>Your Subscription is Expired</p>
                            <button
                                onClick={() => setValidity("Expired")}
                                className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Activate Subscription
                            </button>
                        </div>
                    )}
                </div>

                {/* Withdraw Section */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Enter withdraw address"
                        value={withdrawAddress}
                        onChange={(e) => setWithdrawAddress(e.target.value)}
                        className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <TransactionButton
                        transaction={() =>
                            prepareContractCall({
                                contract: SUBSCRIPTION_CONTRACT,
                                method: "withdraw",
                                params: [withdrawAddress],
                            })
                        }
                        onTransactionConfirmed={() => setWithdrawAddress("")}
                        className="w-full py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Withdraw
                    </TransactionButton>
                </div>
            </div>
        </div>
    );
};
