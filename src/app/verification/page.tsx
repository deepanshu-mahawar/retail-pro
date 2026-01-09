"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const tokenFromUrl = searchParams.get("token");
  //   if (tokenFromUrl) {
  //     setToken(tokenFromUrl);
  //   }
  // }, [searchParams]);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/user/auth/verification", { token });
      setVerified(true);
    } catch (error) {
      setError("Email verification failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (token) verifyUserEmail();
  // }, [token]);

  return (
    // <div className={styles.container}>
    //   <div className={styles.card}>
    //     <h1 className={styles.title}>Email Verification</h1>

    //     {!token && (
    //       <p className={styles.error}>Invalid or missing verification token</p>
    //     )}

    //     {loading && <p className={styles.loading}>Verifying your email...</p>}

    //     {verified && (
    //       <div className={styles.successWrapper}>
    //         <h2 className={styles.successTitle}>
    //           ✅ Email Verified Successfully
    //         </h2>
    //         <Link href="/login" className={styles.button}>
    //           Go to Login
    //         </Link>
    //       </div>
    //     )}

    //     {error && <p className={styles.error}>{error}</p>}
    //   </div>
    // </div>
    <div>
      <button
        onClick={verifyUserEmail}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          cursor: 'pointer'
        }}
      >
        Verify Email
      </button>
    </div>
  );
}
