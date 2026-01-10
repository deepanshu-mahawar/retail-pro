"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./verification.module.css";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Email Verification</h1>

        {loading && <p className={styles.loading}>Verifying your email...</p>}

        <button className={styles.button} onClick={verifyUserEmail}>
          Verify Email
        </button>

        {verified && (
          <div className={styles.successWrapper}>
            <h2 className={styles.successTitle}>
              Email Verified Successfully
            </h2>
            <Link href="/signin" className={styles.button}>
              Go to Signin
            </Link>
          </div>
        )}
        
        {!token && (
          <p className={styles.error}>Invalid or missing verification token</p>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
