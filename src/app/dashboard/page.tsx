"use client";

import axios from "axios";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  __v: number;
  verifyToken: string;
  verifyTokenExpiry: string;
}

interface GetUserResponse {
  message: string;
  data: User;
}

export default function DashboardPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState<"dashboard" | "addProduct">(
    "dashboard"
  );

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post<GetUserResponse>("/api/user/auth/me");
      setUser(response.data.data);
    } catch (error) {
      console.log("Failed to fetch user details", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/user/auth/logout");
      setMessage("Logout successful! Redirecting to login page...");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (error) {
      setMessage("Logout failed. Please try again.");
      console.log("Logout failed", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className={styles.profileInfo}>
            <p className={styles.username}>{user?.username}</p>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>

        <nav className={styles.menu}>
          <a
            href="#"
            onClick={() => setActivePage("dashboard")}
            className={styles.menuItem}
          >
            Dashboard
          </a>
          <a href="#" className={styles.menuItem}>
            Users
          </a>
          <a
            href="#"
            onClick={() => setActivePage("addProduct")}
            className={styles.menuItem}
          >
            Add Product
          </a>
          <a href="#" className={styles.menuItem}>
            Orders
          </a>
          <a href="#" className={styles.menuItem}>
            Settings
          </a>
        </nav>

        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      <main className={styles.main}>
        <h1>
          {loading
            ? "Loading..."
            : activePage === "dashboard"
            ? "Dashboard"
            : activePage === "addProduct"
            ? "Add Product"
            : ""}
        </h1>

        {activePage === "dashboard" && (
          <div className={styles.contentBox}>
            <p>Welcome to your dashboard 🎉</p>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        )}

        {activePage === "addProduct" && (
          <div className={styles.contentBox}>
            <ProductForm />
          </div>
        )}
      </main>
    </div>
  );
}
