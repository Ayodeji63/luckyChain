"use client";

import React, { useEffect } from "react";
// import { Dice } from 'lucide-react';
import { Dice1 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GameThumbnail } from "./GameThumbnail";
import { CubeIcon } from "@heroicons/react/24/solid";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Mines = () => (
  <GameThumbnail
    title="MINES"
    icon={<CubeIcon className="w-12 h-12 text-white" />}
    color="bg-gradient-to-br from-pink-400 to-purple-500"
    subtitle="Fiery Originals"
  />
);
export const CasinoRoom = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  // console.log(account.address);

  useEffect(() => {
    if (isConnected) {
      router.push("/home/page");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="bg-opacity-10 rounded-3xl w-full max-w-md space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-400">
          Welcome to Casino Room!
        </h1>

        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-600 rounded-full flex items-center justify-center">
              <Dice1 className="w-16 h-16 sm:w-20 sm:h-20 text-white" />

              {/* <Mines /> */}
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-14 sm:w-12 sm:h-16 bg-blue-500 rounded-lg transform rotate-45"></div>
          </div>
        </div>

        <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4">
          <p className="text-white text-center text-sm sm:text-base">
            There are a wide variety of games available to play.
          </p>
        </div>

        <div className="flex">
          <div className="flex m-auto items-center ">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
