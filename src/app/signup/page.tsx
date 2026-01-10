"use client";

import { useState } from "react";
import axios from "axios";

import styles from "./signup.module.css";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async () => {
    if (!user.username || !user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/api/user/auth/signup", user);
      console.log("Signup successful", response.data);

      setSuccess(true);
      setUser({ username: "", email: "", password: "" });
    } catch (error: unknown) {
      console.error("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Signup</h1>

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

        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ?  <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>

        <button className={styles.button} onClick={onSignup}>
          {loading ? "Loading..." : "Signup"}
        </button>

        <p className={styles.footer}>
          Already have an account? <Link href="/signin">Signin</Link>
        </p>

        {error && <p className={styles.error}>{error}</p>}

        {success && (
          <p className={styles.success}>
            Registration successful, Please verify your email.
          </p>
        )}
      </div>
    </div>
  );
}
