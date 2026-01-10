"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "@/app/signup/signup.module.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/auth/signin", user);
      console.log("Login successful", response.data);
      router.push("/dashboard");
    } catch (error: unknown) {
      console.log("Signup failed");
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Signin</h1>

        <input
          className={styles.input}
          placeholder="Email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        <button className={styles.button} onClick={onLogin}>
          {loading ? "Loading..." : "Signin"}
        </button>

        <p className={styles.footer}>
          Dont have an account? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
