import { IoSearchOutline } from "react-icons/io5";
import styles from "./styles.module.scss";

export default function ContactsInput() {
  return (
    <div className={styles.search_content}>
      <input placeholder="Buscar pessoas" />
      <button>
        <IoSearchOutline size={24} color="#1E1E48" />
      </button>
    </div>
  );
}
