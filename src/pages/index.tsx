import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { CasinoRoom } from '../components/CasinoRoom';
import CasinoLandingPage from './home/components/Landing';
import NeonCasinoSign from '../components/Welcome';

const Home: NextPage = () => {
  return (


    // <CasinoLandingPage />
    <NeonCasinoSign />

  );
};

export default Home;
