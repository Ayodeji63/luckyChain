import React, { useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Home, Rocket, MessageSquare, Menu } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

const FieryGGUI = () => {
    const { isDisconnected, isConnected } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (isDisconnected) {
            router.push("/");
        }


    }, [isDisconnected, isConnected]);

    return (

        <div className="bg-gray-900 text-white font-sans h-screen p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Flame className="text-blue-500 mr-2" />
                    <span className="font-bold text-lg">Casino-Room</span>
                </div>
                <div className="flex items-center">
                    <div className="bg-yellow-500 text-black rounded-full px-2 py-1 text-xs font-bold mr-2">
                        1561
                    </div>
                    <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold">
                        +
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2 text-xs text-gray-400">
                    <span>0 of 20 rounds</span>
                    <span>0x multiplier</span>
                </div>
                <div className="flex justify-center mb-4">
                    <div className="bg-yellow-500 rounded-full w-28 h-28 flex items-center justify-center">
                        {/* <Flame className="text-4xl text-orange-600" /> */}
                        <img src={"/assets/gold.png"} alt="" />

                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <button className="bg-purple-600 text-white rounded-l-full pr-10 drop-shadow-lg py-1 pl-1 flex flex-grow  justify-between items-center mr-4">
                        <div className=" w-12 h-12 flex mr-4 items-center justify-center">
                            <img src={"/assets/gold.png"} alt="" />

                        </div>
                        <p className='text-small font-bold'>EAGLE</p>
                    </button>
                    <button className="bg-purple-600 text-white rounded-r-full pl-10 rounded-l-xl py-1 pr-1 flex flex-grow  justify-between items-center">

                        <p className='text-small font-bold'>TAILS</p>
                        <div className=" w-12 h-12 flex ml-4 items-center justify-center">
                            <img src={"/assets/silver.png"} alt="" />

                        </div>
                    </button>
                </div>
                <div className="flex justify-between mb-4">
                    <ChevronLeft className="text-gray-600" />
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-xs">
                            x1.94
                        </div>
                    ))}
                    <ChevronRight className="text-gray-600" />
                </div>
                <div className="mb-4">
                    <div className="bg-gray-700 rounded-lg p-2 mb-2 flex items-center">
                        <span className="text-gray-400 mr-2">Enter amount</span>
                        <span className="text-gray-500">×</span>
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">Min</button>
                        <button className="bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">+10</button>
                        <button className="bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">+25</button>
                        <button className="bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">+50</button>
                        <button className="bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">Max</button>
                    </div>
                </div>
                <button className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full font-bold">
                    Play Game
                </button>
            </div>

            {/* Bets Section */}
            <div>
                <div className="flex mb-2">
                    <button className="bg-gray-700 text-white rounded-lg py-1 px-3 text-sm mr-2">All bets</button>
                    <button className="bg-gray-800 text-gray-400 rounded-lg py-1 px-3 text-sm mr-2">My bets</button>
                    <button className="bg-gray-800 text-gray-400 rounded-lg py-1 px-3 text-sm">Rare wins</button>
                </div>
                <div className="bg-gray-800 rounded-lg p-2 mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-gray-700 rounded-full w-8 h-8 mr-2"></div>
                            <span className="text-sm">Jerome...</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-500 mr-2">104</span>
                            <span className="text-gray-400 mr-2">x1.94</span>
                            <span className="text-green-500">200</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-gray-700 rounded-full w-8 h-8 mr-2"></div>
                            <span className="text-sm">Jane...</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-500 mr-2">104</span>
                            <span className="text-red-500">x1.94</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
                <div className="flex justify-between max-w-sm mx-auto">
                    <Home className="text-gray-400" />
                    <Rocket className="text-blue-500" />
                    <MessageSquare className="text-gray-400" />
                    <Menu className="text-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default FieryGGUI;