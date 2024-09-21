import React from 'react';
import { RocketLaunchIcon, ArrowPathIcon, CubeIcon, GiftIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

 export const GameThumbnail = ({ title, icon, color, subtitle }) => (
  <div className={`w-32 h-32 rounded-3xl p-4 flex flex-col justify-between ${color}`}>
    <div className="text-white text-2xl font-bold">{title}</div>
    <div className="flex justify-between items-end">
      {icon}
      <div className="text-white text-xs">{subtitle}</div>
    </div>
  </div>
);

const Mines = () => (
  <GameThumbnail
    title="MINES"
    icon={<CubeIcon className="w-12 h-12 text-white" />}
    color="bg-gradient-to-br from-pink-400 to-purple-500"
    subtitle="Fiery Originals"
  />
);

// const Crash = () => (
//   <GameThumbnail
//     title="CRASH"
//     icon={<RocketLaunchIcon className="w-12 h-12 text-white" />}
//     color="bg-gradient-to-br from-purple-600 to-blue-500"
//     subtitle="Fiery Originals"
//   />
// );

// const Roulette = () => (
//   <GameThumbnail
//     title="ROULETTE"
//     icon={<ArrowPathIcon className="w-12 h-12 text-white" />}
//     color="bg-gradient-to-br from-green-400 to-green-600"
//     subtitle="Fiery Originals"
//   />
// );

// const Ludo = () => (
//   <GameThumbnail
//     title="LUDO"
//     icon={<CubeIcon className="w-12 h-12 text-white" />}
//     color="bg-gradient-to-br from-orange-400 to-pink-500"
//     subtitle="Fiery Originals"
//   />
// );

// const Jackpot = () => (
//   <GameThumbnail
//     title="JACKPOT"
//     icon={<GiftIcon className="w-12 h-12 text-white" />}
//     color="bg-gradient-to-br from-blue-300 to-purple-400"
//     subtitle="Fiery Originals"
//   />
// );

// const CoinFlip = () => (
//   <GameThumbnail
//     title="COINFLIP"
//     icon={<CurrencyDollarIcon className="w-12 h-12 text-white" />}
//     color="bg-gradient-to-br from-blue-400 to-blue-600"
//     subtitle="Fiery Originals"
//   />
// );

// const GameGrid = () => (
//   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gradient-to-br from-blue-800 to-purple-900">
//     <Mines />
//     <Crash />
//     <Roulette />
//     <Ludo />
//     <Jackpot />
//     <CoinFlip />
//   </div>
// );

// export default GameGrid;