import { IoSearchOutline } from "react-icons/io5";
import styles from "./styles.module.scss";

type ContactsInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  type: string | undefined;
  searchUser: () => Promise<void>;
  searchConv: () => Promise<void>;
};

export default function ContactsInput({
  value,
  onChangeText,
  type,
  searchUser,
  searchConv,
}: ContactsInputProps) {
  return (
    <div className={styles.search_content}>
      <input
        placeholder="Buscar pessoas"
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <button onClick={type === "people" ? searchUser : searchConv}>
        <IoSearchOutline size={24} color="#1E1E48" />
      </button>
    </div>
  );
}
