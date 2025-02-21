"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { setCookie } from "../cookies";
import LoginInput from "@/components/LoginInput";
import styles from "../styles/auth.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        alert("Preencha suas credenciais!");
        return;
      }

      const response = await api.post("/login", { email, password });

      const { _id, name, avatar, token } = response.data;
      setCookie(token);

      const userData = {
        _id,
        name,
        email,
        avatar,
      };

      localStorage.setItem("user@data", JSON.stringify(userData));
      setTimeout(() => {
        router.push("/chats");
      }, 1000);
    } catch (error) {
      console.log(error);
      alert(`Erro ao logar usuário: ${error?.message}`);
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

      <button type="submit">Login</button>
      <Link href="/register">Criar conta</Link>
    </form>
  );
}
