import { SlClose } from "react-icons/sl";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import api from "@/services/api";
import { UserProps } from "@/app/chats/page";

type ModalProp = {
  closeModal: () => void;
  user: UserProps | undefined;
};

export default function EditUserModel({ closeModal, user }: ModalProp) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  async function handleUpdateUser(e: FormEvent) {
    try {
      if (name === "" && email === "" && nickname === "") {
        e.preventDefault();
        alert("Preencha alguma informação!");
        return;
      }

      await api.put("/update-user", { name, email, nickname });

      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.modal_container}>
      <form onSubmit={handleUpdateUser}>
        <fieldset>
          <legend>Nome</legend>
          <input
            placeholder={user?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <input
            placeholder={user?.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Apelido</legend>
          <input
            placeholder={user?.nickname ? user.nickname : "Digite aqui"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </fieldset>

        <button type="submit" className={styles.confirm_button}>
          Confirmar
        </button>

        <button onClick={closeModal} className={styles.close_button}>
          <SlClose size={26} color="#c9c9c9" />
        </button>
      </form>
    </div>
  );
}
