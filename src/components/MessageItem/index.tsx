import { MessageProps, UserProps } from "@/app/chats/page";
import styles from "./style.module.scss";

type MessageItemProp = {
  data: MessageProps;
  user: UserProps;
  recipientName?: string;
};

export default function MessageItem({
  data,
  user,
  recipientName,
}: MessageItemProp) {
  const isSender = user._id === data.sender;

  return (
    <div
      className={styles.messageContainer}
      style={{
        alignSelf: isSender ? "flex-end" : "flex-start",
        backgroundColor: isSender ? "rgba(255, 255, 255, 0.1)" : "#6b32ad62",
      }}
    >
      <span
        className={styles.messageTitle}
        style={{ color: isSender ? "#874fc7" : "#f2f2f2" }}
      >
        {isSender ? user.name : recipientName}
      </span>
      <span className={styles.messageText}>{data.text}</span>
    </div>
  );
}
