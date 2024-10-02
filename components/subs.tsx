"use client";
import { chain, client, CONTRACT } from "@/utils/constants";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { Button } from "./button";

export default function Test() {
  const [inputValue, setAmount] = useState('');
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const { data: getBalance, isLoading: loading } = useReadContract({
    contract: CONTRACT,
    method: "getBalance"
  });

  const handleDeposit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const amount = toWei(inputValue);

    try {
      const transaction  = await prepareContractCall({
        contract: CONTRACT,
        method: "deposit",
        params: [],
        value : amount,
      });

      const response = await sendTransaction(transaction);
      console.log('Transaction Response:', response);
      alert("Wait for the transaction to be mined");

    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg shadow-lg animate-shadow transition-shadow">
        <h1 className="text-3xl font-semibold text-center mb-6 animate-gradient">Crypto Wallet</h1>
        <div className="flex justify-center mb-4">
          <ConnectButton client={client} chain={chain} />
        </div>

        {account ? (
          <div>
            {loading ? (
              <h2 className="text-xl text-center text-gray-400">Loading...</h2>
            ) : (
              <h2 className="text-xl text-center text-gray-200">Balance: {getBalance ? getBalance.toString() : 'N/A'}</h2>
            )}
          </div>
        ) : (
          <h2 className="text-xl text-center text-red-500">Connect your wallet first</h2>
        )}

        <input 
          type="text" 
          placeholder="Enter Amount To Deposit" 
          onChange={(e) => setAmount(e.target.value)} 
          value={inputValue} 
          className="mt-4 p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <p className="mt-2 text-center text-gray-400">Entered Amount: {inputValue}</p>

        <div className="flex flex-col items-center mt-4 space-y-4">
          <Button onClick={handleDeposit} className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-700 transition">Deposit</Button>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <TransactionButton 
              transaction={() => prepareContractCall({
                contract: CONTRACT,
                method: "withdraw",
              })}
              className=" py-2 rounded-md shadow hover:bg-green-700 text-white transition"
            >
              Withdraw
            </TransactionButton>

            <TransactionButton 
              transaction={() => prepareContractCall({
                contract: CONTRACT,
                method: "RegularPlan",
              })}
              className="  py-2 rounded-md shadow hover:bg-yellow-600 text-white transition"
            >
              Buy Subscription
            </TransactionButton>

            <TransactionButton 
              transaction={() => prepareContractCall({
                contract: CONTRACT,
                method: "nextPlan",
              })}
              
              className="py-2 rounded-md shadow hover:bg-purple-700 text-white transition"
            >
              Next Plan
            </TransactionButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background: linear-gradient(270deg, #ff0080, #ff8c00, #ff0080, #ff8c00);
          background-size: 400% 400%;
          animation: gradient 5s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes shadow {
          0% {
            box-shadow: 0 0 10px rgba(255, 0, 128, 0.7);
          }
          25% {
            box-shadow: 0 0 20px rgba(255, 204, 0, 0.7);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 204, 255, 0.7);
          }
          75% {
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.7);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 0, 128, 0.7);
          }
        }

        .animate-shadow {
          animation: shadow 5s ease infinite;
        }
      `}</style>
    </div>
  );
}

