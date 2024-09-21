import React, { useCallback, useEffect, useRef, useState } from "react";
import { Flame, Home, Rocket, MessageSquare } from "lucide-react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GameButton from "./GameButton";
import { rouletteAbi, rouletteAddress } from "../../../contract/rouletteAbi";
import { erc20Abi, erc20Address } from "../../../contract/erc20";
import { formatEther } from "viem";
import { Abi, Address } from 'viem'

const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]

const FieryGGUI = () => {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winningNumber, setWinningNumber] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const rouletteRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<number | null>();
  const { address } = useAccount();

  const { writeContract, isPending } = useWriteContract();

  const spin = useCallback(() => {
    if (balance < bet) {
      alert("Insufficient balance!")
      return
    }
    setBalance(balance - bet)
    setIsSpinning(true)
    setWinningNumber(null)

    const spinDuration = 5000 // 5 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < spinDuration) {
        setOffset((elapsedTime / 20) % 100) // Adjust speed here
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        const result = Math.floor(Math.random() * ROULETTE_NUMBERS.length)
        const winningNum = ROULETTE_NUMBERS[result]
        setWinningNumber(winningNum)

        // Calculate the correct offset to align the winning number with the pointer
        const numberWidth = rouletteRef.current ? rouletteRef.current.offsetWidth / ROULETTE_NUMBERS.length : 0
        const newOffset = (result * numberWidth) + (numberWidth / 2)
        setOffset((newOffset / rouletteRef.current!.offsetWidth) * 100)

        // Handle win/loss logic here
        if (winningNum % 2 === 0) {
          setBalance(balance => balance + bet * 2)
        }
      }
    }

    requestAnimationFrame(animate)
  }, [balance, bet])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        spin()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [spin])

  const { isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push("/");
    }
  }, [isDisconnected]);

  function transer() {
    writeContract({
      abi: erc20Abi,
      address: erc20Address,
      functionName: 'transfer',
      args: [rouletteAddress, BigInt(bet)],
    })
    setMode(2);
  }

  function submit() {
    writeContract({
      abi: rouletteAbi,
      address: rouletteAddress,
      functionName: 'placeBet',
      args: [bet, mode],
    })

    spin();
  }

  const result = useReadContract(
    {
      abi: erc20Abi,
      address: erc20Address,
      functionName: "balanceOf",
      args: [address]
    }
  )
  console.log(`Balance of `, result.data);

  return (
    // <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 h-screen flex items-center justify-center">
    <div className="bg-gray-900 h-screen w-screen p-4 w-80 text-white">
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

      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <div className="text-xs text-gray-400 mb-2">ROUND #14612962</div>
        <div className="relative h-20 bg-gray-700 rounded-lg overflow-hidden mb-6">
          <div
            ref={rouletteRef}
            className="absolute space-x-1 top-0 left-0 flex transition-transform duration-300 ease-linear"
            style={{ transform: `translateX(-${offset}%)` }}
          >
            {[...ROULETTE_NUMBERS, ...ROULETTE_NUMBERS].map((number, index) => (
              <GameButton key={index} number={number} color={number % 2 === 0 ? 'red' : 'blue'} />
            ))}
          </div>
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-400 z-10"></div>
        </div>

        <div className="text-center mb-6">
          <p className="text-2xl font-bold">
            {winningNumber !== null ? `Winning Number: ${winningNumber}` : 'Spin the roulette!'}
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full"
          />
          <button onClick={() => setBet(Math.max(0, bet - 10))} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">-10</button>
          <button onClick={() => setBet(bet + 10)} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">+10</button>
        </div>

        <button
          onClick={submit}
          disabled={isSpinning}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-3 rounded-lg font-bold text-lg mb-4"
        >
          {isPending ? 'Spinning...' : 'Spin'}
        </button>

        <div className="text-center mb-4">
          {/* @ts-expect-error */}
          <p className="text-xl font-bold">Balance: ${result.data ? Number(formatEther(result.data)) : 0}</p>
        </div>
        <div className="flex justify-between">
          <button className="bg-red-500 w-24 py-2 rounded-xl" onClick={transer}>Red 2X</button>
          <button className="bg-purple-500 w-24 py-2 rounded-xl" onClick={transer}>
            Purple 14X
          </button>
          <button className="bg-blue-500 w-24 py-2 rounded-xl" onClick={transer}>Blue 2X</button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="bg-orange-500 w-2 h-2 rounded-full mr-2"></div>
        <span className="text-gray-400 text-sm">20</span>
      </div>

      <div className="space-y-2">
        {["Ralph Edwards", "Kristin Watson", "Ronald Richards"].map(
          (name, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
              <span>{name}</span>
            </div>
          )
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around">
        <button className="text-gray-400">
          <Home size={24} />
        </button>
        <button className="text-gray-400">
          <Rocket size={24} />
        </button>
        <button className="text-blue-500">
          <Flame size={24} />
        </button>
        <button className="text-gray-400">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default FieryGGUI;
