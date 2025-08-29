 "use client";

import Image from "next/image";
import Connector from "./connector";
import styles from "./page.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const [isConnected, setConnected] = useState(false);
  const { address } = useAccount();
  
  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      setConnected(true);
    }
  }, [address]);

  return (
    <>
      <span className={styles.web3txt}>King WEB3</span>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.herotxt}>ANON SHARE</h1>
          <img className={styles.heroimg} src="/images/hero.png" alt="hero" />
          <div className={styles.overlay}></div>

          <div className={styles.scrolld}>
            <a href="#main">Scroll Down</a>
          </div>
        </header>

        <main id="main" className={styles.main}>
          <div className={styles.left}>
            <div className={styles.titlep}>
              <h2 className={styles.title}>What is</h2>
              <span>Anon Share</span>
            </div>
            <p className={styles.description}>
              This is a decentralized file sharing platform that allows users to
              upload and share files with other users anonymously. This platform
              is powered by{" "}
              <a
                href="https://web3.storage/"
                target="_blank"
                rel="noopener noreferrer"
              >
                web3.storage
              </a>{" "}
              which is used to store users files on{" "}
              <a
                href="https://ipfs.tech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IPFS
              </a>{" "}
              &{" "}
              <a
                href="https://gun.eco/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gun.js
              </a>{" "}
              (god db) which is used as the <i>Anon's</i> decentralized data
              base.
            </p>
            <Connector />
          </div>
          <div className={styles.right}>
            <img
              src="/images/minh.svg"
              alt="madeInHell"
              className={styles.rimg}
            />
          </div>
        </main>
        <footer className={styles.footer}>
          <p>
            by{" "}
            <a
              href="https://vanoob.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vanoob
            </a>{" "}
            for Chainlink Fall 2022 Hackathon
          </p>
          <span> <a
                href="https://github.com/vanoob404/anon-share"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git repo
              </a></span>
        </footer>
      </div>
    </>
  );
}
