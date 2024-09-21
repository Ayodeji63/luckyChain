import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from "wagmi";
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';
import { rouletteAbi, rouletteAddress } from "../../../contract/rouletteAbi";

const DailyRewardPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { address } = useAccount();


    const { writeContract } = useWriteContract();

    function submit() {
        writeContract({
            abi: rouletteAbi,
            address: rouletteAddress,
            functionName: 'mint',
            args: [BigInt(100)],
        })
    }


    useEffect(() => {
        setShowPopup(true);
    }, []);

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Coins className="mr-2" />
                            <span className="font-bold">Claim your daily 100 tokens!</span>
                        </div>
                        <button
                            onClick={submit}
                            className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition-colors"
                        >
                            {/* {isPending ? 'Claiming...' : 'Claim Now'} */}
                            Claim Now
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DailyRewardPopup;