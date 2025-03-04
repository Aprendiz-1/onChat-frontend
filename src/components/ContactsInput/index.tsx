import { IoSearchOutline } from "react-icons/io5";
import { VscClearAll } from "react-icons/vsc";
import styles from "./styles.module.scss";

type ContactsInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  type: string | undefined;
  searchUser: () => Promise<void>;
  searchConv: () => void;
  showSearch: boolean;
  loadUsers: () => Promise<void>;
  loadConvs: () => Promise<void>;
};

export default function ContactsInput({
  value,
  onChangeText,
  type,
  searchUser,
  searchConv,
  showSearch,
  loadUsers,
  loadConvs,
}: ContactsInputProps) {
  return (
    <div className={styles.search_content}>
      <input
        placeholder="Buscar pessoas"
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />

      {showSearch ? (
        <button onClick={type === "people" ? loadUsers : loadConvs}>
          <VscClearAll size={20} color="#1E1E48" />
        </button>
      ) : (
        <button onClick={type === "people" ? searchUser : searchConv}>
          <IoSearchOutline size={24} color="#1E1E48" />
        </button>
      )}
    </div>
  );
}
