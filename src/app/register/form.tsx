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
      <div className={styles.inputContainer}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          placeholder="user@email.com"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="pass">Senha</label>
        <input
          id="pass"
          placeholder="* * * * *"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Criar conta</button>
      <Link href="/">Fazer login</Link>
    </form>
  );
}
