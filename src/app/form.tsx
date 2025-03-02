"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { setCookie } from "../cookies";
import LoginInput from "@/components/LoginInput";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "../styles/auth.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        alert("Preencha suas credenciais!");
        return;
      }

      setLoadingAuth(true);
      const response = await api.post("/login", { email, password });
      const { token } = response.data;

      await setCookie(token);
      router.push("/chats");
      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className={styles.form_content}>
      <LoginInput
        title="E-mail"
        keyId="email"
        placeholderText="user@email.com"
        value={email}
        type="email"
        onChangeText={setEmail}
      />

      <LoginInput
        title="Senha"
        keyId="pass"
        placeholderText="* * * * *"
        value={password}
        type="password"
        onChangeText={setPassword}
      />

      <button type="submit">
        {loadingAuth ? (
          <BeatLoader color="#fff" loading={loadingAuth} size={10} />
        ) : (
          "Login"
        )}
      </button>
      <Link href="/register">Criar conta</Link>
    </form>
  );
}
