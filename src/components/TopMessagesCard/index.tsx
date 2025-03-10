import Image from "next/image";
import user_default from "../../assets/user_default.png";
import { CurrentConversationProps } from "@/app/chats/page";
import styles from "./styles.module.scss";

type TopCardProps = {
  currentConversation: CurrentConversationProps | undefined;
};

export default function TopMessagesCard({ currentConversation }: TopCardProps) {
  return (
    <div className={styles.top_content}>
      <Image
        src={
          currentConversation?.avatar
            ? currentConversation.avatar
            : user_default
        }
        alt="Avatar"
        height={47}
        style={{
          borderRadius: "50%",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor:
            currentConversation?.status === "online" ? "#4bc16e" : "#555",
        }}
      />

      <div className={styles.top_text}>
        <h3>{currentConversation?.name}</h3>
        <span>{currentConversation?.status}</span>
      </div>
    </div>
  );
}
