"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Connector() {
  const router = useRouter();

  const { openConnectModal } = useConnectModal();

  const onClick = () => {
    openConnectModal();
    router.prefetch("/dashboard");
  };
  return (
    <>
      <button
        onClick={() => {
          onClick();
        }}
        className={styles.btn}
      >
        Connect Wallet
      </button>
    </>
  );
}
