import Image from "next/image";
import user_default from "../../assets/user_default.png";
import styles from "./styles.module.scss";
import { UserProps } from "@/app/chats/chats";

interface ContactProp {
  data: UserProps;
  isSelected: boolean;
  type: string;
  select: (recipint: UserProps) => void;
  create: (recipint: UserProps) => void;
}

export default function ContactCard({
  data,
  isSelected,
  type,
  select,
  create,
}: ContactProp) {
  if (type === "people") {
    return (
      <button
        onClick={() => create(data)}
        className={styles.card_container}
        style={{
          backgroundColor: "#444462",
        }}
      >
        <Image
          src={data.avatar ? data.avatar : user_default}
          alt="Avatar"
          height={44}
        />

        <div className={styles.text_content}>
          <span className={styles.contact_name}>{data.name}</span>
        </div>

        <span className={styles.contact_status}>({data.status})</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => select(data)}
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
        {data?.lastMessage && (
          <span className={styles.last_message}>{data.lastMessage.text}</span>
        )}
      </div>

      <span className={styles.contact_status}>({data.status})</span>
    </button>
  );
}
