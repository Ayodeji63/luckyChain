import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const NeonCasinoSign = () => {
  const starVariants = {
    initial: { opacity: 0.2, textShadow: "0 0 5px #fbbf24" },
    animate: { opacity: 1, textShadow: "0 0 15px #fbbf24" },
  };

  const starTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse",
  };

  const { address, isConnected } = useAccount();
  const router = useRouter();
  // console.log(account.address);

  useEffect(() => {
    if (isConnected) {
      router.push("/home/page");
    }
  }, [isConnected, address]);

  return (
    <div className="bg-gray-900 p-12 flex justify-center items-center h-screen">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Arch */}
        <motion.div
          className="w-80 h-40 border-t-8 border-pink-500 rounded-t-full absolute -top-20 left-1/2 transform -translate-x-1/2"
          initial={{ boxShadow: "0 0 5px #ec4899" }}
          animate={{ boxShadow: "0 0 15px #ec4899" }}
          transition={{ yoyo: Infinity, duration: 1 }}
        />

        {/* Casino text */}
        <motion.div
          className="text-4xl text-center font-bold text-blue-400 mb-4"
          initial={{ textShadow: "0 0 5px #60a5fa" }}
          animate={{ textShadow: "0 0 15px #60a5fa" }}
          transition={{ yoyo: Infinity, duration: 1 }}
        >
          Lucky <br />
          Chain
        </motion.div>

        {/* Stars */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="text-2xl text-yellow-400"
              variants={starVariants}
              initial="initial"
              animate="animate"
              transition={{
                ...starTransition,
                delay: index * 0.15,
              }}
            >
              ★
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-16">
        <div className="flex m-auto items-center ">
          <ConnectButton
            label="Connect Wallet"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NeonCasinoSign;
