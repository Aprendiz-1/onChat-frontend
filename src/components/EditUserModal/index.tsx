import { SlClose } from "react-icons/sl";
import styles from "./styles.module.scss";

type ModalProp = {
  closeModal: () => void;
};

export default function EditUserModel({ closeModal }: ModalProp) {
  return (
    <div className={styles.modal_container}>
      <form>
        <fieldset>
          <legend>Nome</legend>
          <input placeholder="Digite aqui" />
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <input placeholder="Digite aqui" />
        </fieldset>

        <fieldset>
          <legend>Apelido</legend>
          <input placeholder="Digite aqui" />
        </fieldset>

        <button onClick={() => {}} className={styles.confirm_button}>
          Confirmar
        </button>

        <button onClick={closeModal} className={styles.close_button}>
          <SlClose size={26} color="#c9c9c9" />
        </button>
      </form>
    </div>
  );
}
