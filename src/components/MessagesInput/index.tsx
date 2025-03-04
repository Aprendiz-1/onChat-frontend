import { IoSend } from "react-icons/io5";
import styles from "./styles.module.scss";

type MessageInputProps = {
  handleSendMessage: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  message: string;
  setMessage: (message: string) => void;
};

export default function MessagesInput({
  handleSendMessage,
  handleKeyPress,
  message,
  setMessage,
}: MessageInputProps) {
  return (
    <div className={styles.input_content}>
      <input
        placeholder="Digite aqui"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <button onClick={handleSendMessage}>
        <IoSend size={22} color="#fff" />
      </button>
    </div>
  );
}
