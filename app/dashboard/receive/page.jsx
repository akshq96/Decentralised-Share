"use client";

import styles from "../dashboard.module.scss";
import { useState, useEffect, useReducer } from "react";
import { Suspense } from "react";
import Gun from "gun/gun";
import { useAccount } from "wagmi";

// initialize gun locally
const gun = Gun({
  peers: [process.env.NEXT_PUBLIC_GUN_DB],
});
// create the initial state to hold the uploads
const initialState = {
  uploads: [],
};

// Create a reducer that will update the uploads array
function reducer(state, uploads) {
  return {
    uploads: [uploads, ...state.uploads],
  };
}

export default function Recive() {
  const { address } = useAccount();
  const [userAdd, setUserAdd] = useState("");

  useEffect(() => {
    if (address) {
      setUserAdd(address);
    }
  }, [address]);

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(reducer, initialState);
  const [receives, setReceives] = useState([]);

  useEffect(() => {
    // filter by user address
    const filtered = state.uploads.filter((upload) => upload.for === userAdd);
    setReceives(filtered);
  }, [state.uploads, userAdd]);

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const uploads = gun.get("uploads");
    uploads.map().on((m) => {
      dispatch({
        for: m.for,
        from: m.from,
        file: m.file,
        createdAt: m.createdAt,
      });
    });
  }, []);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <div className={styles.recPage}>
          {receives.map((db) => (
            <div key={db.createdAt}>
              <div className={styles.receivr}>
                <p className={styles.from}> From: {db.from}</p>

                <p className={styles.flink}>
                  Files:{" "}
                  <a
                    href={`https://${db.file}.ipfs.dweb.link/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    files...
                  </a>
                </p>
                <p className={styles.createdAt}> At: {db.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
}
