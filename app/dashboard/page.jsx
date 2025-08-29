"use client";

import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <div className={styles.description}></div>
    </>
  );
}
