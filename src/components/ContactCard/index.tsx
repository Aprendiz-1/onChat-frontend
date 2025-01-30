import Image from "next/image";
import user_default from "../../assets/user_default.png";
import styles from "./styles.module.scss";
import { UserProps } from "@/app/chats/page";

interface ContactProp {
  data: UserProps;
  selectConversation: (recipint: UserProps) => void;
}

export default function ContactCard({ data, selectConversation }: ContactProp) {
  return (
    <button
      onClick={() => selectConversation(data)}
      className={styles.card_container}
    >
      <Image
        src={data.avatar ? data.avatar : user_default}
        alt="Avatar"
        height={40}
      />
      <span>
        {data.name} ({data?.status})
      </span>
    </button>
  );
}
