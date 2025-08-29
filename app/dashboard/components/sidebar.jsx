"use client";
import Link from "next/link";
import styles from "../dashboard.module.scss";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <>
      <motion.nav
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { delay: -0.2 } }}
        transition={{ duration: 1 }}
        className={styles.sidebar}
      >
        <div className={styles.nav}>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { delay: 1.2 } }}
            transition={{ type: "spring", duration: 0.8 }}
            whileHover={{
              type: "spring",
              x: 20,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className={styles.navitem}
          >
            <Link href={"/dashboard/send"}>Send</Link>
          </motion.div>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { delay: 1.4 } }}
            transition={{ type: "spring", duration: 0.8 }}
            whileHover={{
              type: "spring",
              x: 20,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className={styles.navitem}
          >
            <Link href={"/dashboard/receive"}>Received</Link>
          </motion.div>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0", opacity: 1, transition: { delay: 1.6 } }}
            transition={{ type: "spring", duration: 0.8 }}
            whileHover={{
              type: "spring",
              x: 20,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className={styles.history}
          >
            <Link href={"/dashboard/history"}>History</Link>
          </motion.div>
        </div>
        <div className={styles.links}>
          <div className={styles.litems}>
            <div className={styles.link}>
              <a
                href="https://github.com/vanoob404/anon-share"
                target="_blank"
                rel="noopener noreferrer"
              >
                 Github Repo
              </a>
              
             </div>
          </div>
          {/* <div className={styles.litems}>
            <div className={styles.link}></div>
          </div> */}
        </div>
      </motion.nav>
    </>
  );
}
