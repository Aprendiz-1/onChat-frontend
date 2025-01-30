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
        backgroundColor: isSender ? "steelblue" : "rgba(255, 255, 255, 0.7) ",
      }}
    >
      <span
        className={styles.messageTitle}
        style={{ color: isSender ? "#f2f2f2" : "steelblue" }}
      >
        {isSender ? user.name : recipientName}
      </span>
      <span style={{ color: isSender ? "#f2f2f2" : "#222" }}>{data.text}</span>
    </div>
  );
}
