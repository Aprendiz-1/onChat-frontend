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
      }}
    >
      <span className={styles.messageTitle}>
        {isSender ? user.name : recipientName}
      </span>

      <div
        className={styles.messageTextContent}
        style={{
          textAlign: isSender ? "right" : "left",
          backgroundColor: isSender
            ? "rgba(96, 55, 194, 0.7)"
            : "rgba(255, 255, 255, 0.7) ",
        }}
      >
        <span>{data.text}</span>
      </div>
    </div>
  );
}
