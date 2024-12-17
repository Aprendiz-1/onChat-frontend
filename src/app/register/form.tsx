"use client";

import Link from "next/link";
import styles from "../../styles/auth.module.scss";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

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
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="E-mail"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Criar conta</button>
      <Link href="/">Fazer login</Link>
    </form>
  );
}
