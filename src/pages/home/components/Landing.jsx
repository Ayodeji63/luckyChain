"use client";

import React, { useEffect } from "react";
import {
  RocketLaunchIcon,
  ArrowPathIcon,
  CubeIcon,
  GiftIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Home, Rocket } from "lucide-react";
import DailyRewardPopup from "./DailyReward";

const GameThumbnail = ({ title, icon: Icon, color, gradient, size, route }) => (
  <Link href={route} passHref>
    <motion.div
      className={`${size} rounded-lg ${gradient} text-white text-center flex flex-col justify-center items-center cursor-pointer overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-1/3 h-1/3 mb-2" />
      <span className="text-xs sm:text-sm font-bold">{title}</span>
    </motion.div>
  </Link>
);

const games = [
  {
    title: "ROULETTE",
    icon: ArrowPathIcon,
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    size: "col-span-1 row-span-2 h-64",
    route: "/roulette/page",
  },

  {
    title: "CRASH",
    icon: RocketLaunchIcon,
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
    size: "col-span-2 row-span-2 h-64",
    route: "/games/crash",
  },
  {
    title: "MINES",
    icon: GiftIcon,
    gradient: "bg-gradient-to-br from-pink-500 to-red-600",
    size: "col-span-1 row-span-1 h-32",
    route: "/games/mines",
  },
  {
    title: "LUDO",
    icon: CubeIcon,
    gradient: "bg-gradient-to-br from-orange-400 to-amber-600",
    size: "col-span-2 row-span-1 h-32",
    route: "/games/ludo",
  },
  {
    title: "JACKPOT",
    icon: GiftIcon,
    gradient: "bg-gradient-to-br from-blue-400 to-cyan-600",
    size: "col-span-2 row-span-1 h-32",
    route: "/games/jackpot",
  },
  {
    title: "COINFLIP",
    icon: CurrencyDollarIcon,
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    size: "col-span-1 row-span-1 h-32",
    route: "/games/coinflip",
  },
];

const CasinoLandingPage = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/home/page");
    }
  }, [isConnected, address]);

  return (
    <div className="bg-gray-900 min-h-screen w-full p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Flame className="text-blue-500 mr-2" />
          <span className="font-bold text-lg">LuckyChain</span>
        </div>
        <div className="flex items-center">
          <span className="bg-yellow-500 text-black rounded-full px-2 py-1 text-xs mr-2">
            1561
          </span>
          <div className="bg-blue-500 rounded-full">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button className="bg-gray-800 p-2 rounded-full">
          <Home size={16} />
        </button>
        <button className="bg-gray-800 p-2 rounded-full">
          <Flame size={16} />
        </button>
        <button className="bg-gray-800 p-2 rounded-full">
          <div className="relative">
            <Rocket size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
          </div>
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <p className="text-sm sm:text-base text-gray-300 text-center mb-4">
          Experience the thrill of our games!
        </p>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-100">
            Popular Games
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {games.map((game, index) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={game.size}
              >
                <GameThumbnail {...game} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <DailyRewardPopup />
    </div>
  );
};

export default CasinoLandingPage;
