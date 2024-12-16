"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { useState } from 'react';


const Login: React.FC = () => {
  const [isNavVisible, setNavVisible] = useState(true); // State to control nav visibility

  const toggleNav = () => {
    setNavVisible(prev => !prev); // Toggle visibility
  };

  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center bg-black text-white">
      <p className="font-bold text-2xl mb-4 sm:mb-0">FitNessLeague</p>

      <div className="flex items-center gap-4">
        {/* Toggle Button with Icon */}
        <button 
          onClick={toggleNav} 
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md transition-colors"
        >
          {isNavVisible ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      {isNavVisible && (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 mt-4 sm:mt-0">
          <Link href="/" className="hover:bg-sky-500 p-2 rounded-md transition-colors">
            Home
          </Link>
          <Link href="/customer" aria-current="page" className="hover:bg-sky-500 p-2 rounded-md transition-colors">
            Subscription
          </Link>
          <Link href="/staking" className="hover:bg-sky-500 p-2 rounded-md transition-colors">
            Staking
          </Link>
          <Link href="/profile" className="hover:bg-sky-500 p-2 rounded-md transition-colors">
            About
          </Link>
        </div>
      )}
    </div>
  );
}

export default Login;
