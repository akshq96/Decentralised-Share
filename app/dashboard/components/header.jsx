"use client";
import styles from "../dashboard.module.scss";
import Image from "next/image";
import Avatar from "boring-avatars";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const { address, isConnected } = useAccount();
  const [hover, setHover] = useState(false);
  const [userAdd, setUserAdd] = useState("");

  useEffect(() => {
    if (isConnected) {
      setUserAdd(address);
    }
  }, [isConnected]);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0", opacity: 1, transition: { delay: -0.2 } }}
            transition={{ duration: 1 }}
            className={styles.profile}
          >
            <Avatar
              size={40}
              name={userAdd}
              variant="pixel"
              colors={["#E0DDAA", "#203239", "#EEEDDE", "#175d6c", "#141E27"]}
            />
            <p
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              {hover
                ? userAdd
                : userAdd.slice(0, 6) + "..." + userAdd.slice(-4)}
            </p>
          </motion.div>
        </div>
        <div className={styles.right}>
          <div className={styles.crum}></div>
        </div>
      </header>
    </>
  );
}
