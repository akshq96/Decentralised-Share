"use client";
import { Suspense } from "react";
import styles from "../dashboard.module.scss";
import { FileUploader } from "react-drag-drop-files";
import { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Gun from "gun/gun";
//GunDB starts here ###################################################//

// initialize gun locally
const gun = Gun({
  peers: [process.env.NEXT_PUBLIC_GUN_DB],
});

//GunDB ends here!! ###################################################//

export default function Send() {
  const { address } = useAccount();
  const [files, setFiles] = useState([]);
  const [fcid, setFcid] = useState("");
  const [feed, setFeed] = useState("");
  const [recipientAdd, setRecipientAdd] = useState("");
  const [sentFeed, setSentFeed] = useState("");
  const [allClear, setAllClear] = useState(false);
  const [addValid, setAddValid] = useState(false);
  const [sameAdd, setSameAdd] = useState(false);

  //Validating address
  useEffect(() => {
    if (ethers.utils.isAddress(recipientAdd)) {
      if (fcid === "") {
        setAllClear(false);
      } else {
        setAllClear(true);
      }
      if (recipientAdd === address) {
        setSameAdd(true);
        setAddValid(false);
        setAllClear(false);
      } else {
        setAddValid(true);
      }
    } else {
      setAllClear(false);
      setAddValid(false);
    }

    if (recipientAdd === address) {
      setSameAdd(true);
    } else {
      setSameAdd(false);
    }
  }, [recipientAdd, fcid, address]);

  //remove sentFeed after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setSentFeed("");
    }, 5000);
  }, [feed]);

  // File upload function starts here ------//----------------------//------------------- //
  useEffect(() => {
    async function upload() {
      if (files.length > 0) {
        const token = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
        const storage = new Web3Storage({ token });
        setFeed(
          `${
            files.length > 1
              ? `Uploading ${files.length} files...`
              : `Uploading file...`
          }`
        );
        const cid = await storage.put(files);
        setFeed(`Uploaded!!!`);
        setFcid(cid);
      }
    }
    upload();
  }, [files]);

  // getting file & dividing into chunks(400bytes)
  const handleChange = async (file) => {
    setFiles(file);
  };
  // on Size Error
  const sizeError = (file) => {
    setFeed(`Your file exceedes max limit of 100mb, Please choose smaller one`);
  };
  //Note: I have used react-drag-drop-files for file upload
  // File upload function ends here!! -----------------------------------------------//

  //now
  //On submit, send the message to the gunDB
  // set a new message in gun, update the local state to reset the form field
  function saveMessage() {
    const uploads = gun.get("uploads");
    uploads.set({
      for: recipientAdd,
      from: address,
      file: fcid,
      createdAt: new Date().toTimeString(),
    });
    setFeed("Sent!");
    setRecipientAdd("");
  }

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <div className={styles.sendr}>
          <div className={styles.fileUploader}>
            <FileUploader
              handleChange={handleChange}
              onSizeError={sizeError}
              multiple={true}
              hoverTitle="Drop here :)"
              name="file"
              maxSize="100"
            >
              <div className={styles.dash}>
                <p>Drag your file here to start</p>
                <p>or</p>
                <p className={styles.browse}>Browse files</p>
                <p className={styles.feed}>{feed}</p>
              </div>
            </FileUploader>
          </div>

          <input
            placeholder="0xRecipient's polygon address"
            type="text"
            name="address"
            onChange={(e) => setRecipientAdd(e.target.value)}
            value={recipientAdd}
            className={addValid ? styles.input : styles.inputInvalid}
            required
          />
          <p>{sameAdd ? "😑" : ""}</p>
          {allClear ? (
            <button onClick={saveMessage} className={styles.btn}>
              SEND
            </button>
          ) : (
            <button
              disabled
              id="dis"
              className={`${styles.btn} ${styles.rbtn}`}
            >
              SEND
            </button>
          )}
          <div className={styles.sent}>{sentFeed}</div>
        </div>
      </Suspense>
    </>
  );
}
