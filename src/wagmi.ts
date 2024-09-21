import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrumSepolia,
  arbitrum,
  localhost,
  // Add other chains as needed...
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: String(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID),
  chains: [
    arbitrumSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [arbitrumSepolia, arbitrum, localhost]
      : []),
  ],
  ssr: true,
});