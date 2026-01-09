"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/auth/signup", user);
      console.log("Signup successful", response.data);
      router.push("/signin");
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
        <h1 className={styles.title}>{loading ? "Processing" : "Register"}</h1>

        <input
          className={styles.input}
          placeholder="Username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />

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

        <button className={styles.button} onClick={onSignup}>
          Register
        </button>

        <p className={styles.footer}>
          Already have an account? <Link href="/signin">Signin</Link>
        </p>
      </div>
    </div>
  );
}
