import Image from "next/image";
import user_default from "../../assets/user_default.png";
import styles from "./styles.module.scss";
import { UserProps } from "@/app/chats/page";

interface ContactProp {
  data: UserProps;
  isSelected: boolean;
  selectConversation: (recipint: UserProps) => void;
}

export default function ContactCard({
  data,
  isSelected,
  selectConversation,
}: ContactProp) {
  return (
    <button
      onClick={() => selectConversation(data)}
      className={styles.card_container}
      style={{
        backgroundColor: isSelected ? "rgba(96, 55, 194, 0.7)" : "#444462",
      }}
    >
      <Image
        src={data.avatar ? data.avatar : user_default}
        alt="Avatar"
        height={44}
      />

      <div className={styles.text_content}>
        <span className={styles.contact_name}>{data.name}</span>
        <span className={styles.last_message}>Boa noite! Tudo certo?</span>
      </div>

      <span className={styles.contact_status}>({data.status})</span>
    </button>
  );
}
