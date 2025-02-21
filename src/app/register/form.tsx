"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import LoginInput from "@/components/LoginInput";
import styles from "../../styles/auth.module.scss";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      if (name === "" || email === "" || password === "") {
        alert("Preencha todos os dados!");
        return;
      }

      await api.post("/register", { name, email, password });
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(`Erro ao criar usuário: ${error?.message}`);
    }
  }

  return (
    <form onSubmit={handleRegister} className={styles.form_content}>
      <LoginInput
        title="Nome"
        keyId="nome"
        placeholderText="Seu nome"
        value={name}
        type="text"
        onChangeText={setName}
      />

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

      <button type="submit">Criar conta</button>
      <Link href="/">Fazer login</Link>
    </form>
  );
}
