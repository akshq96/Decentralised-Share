"use client";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard/send");
    router.prefetch("/dashboard/receive");
    router.prefetch("/dashboard/history");
  }, []);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
