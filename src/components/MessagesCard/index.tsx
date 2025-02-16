import MessageItem from "../MessageItem";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import MessagesInput from "../MessagesInput";
import TopMessagesCard from "../TopMessagesCard";
import { api } from "@/services/api";
import { socket } from "@/socket";
import { ConversationProps, UserProps } from "@/app/chats/chats";

type MessageCardProps = {
  user: UserProps;
  currentConversation: ConversationProps;
};

export default function MessagesCard({
  user,
  currentConversation,
}: MessageCardProps) {
  const [socketInstance] = useState(socket(user._id));
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    loadMessages(currentConversation?.conversationId);

    socketInstance.on("receive_message", (message) => {
      if (message.conversationId === currentConversation?.conversationId) {
        setMessages((mess) => [...mess, message]);
      }
    });

    return () => {
      socketInstance.off("receive_message");
    };
  }, [currentConversation, socketInstance]);

  async function loadMessages(conversationId: string) {
    if (!conversationId) {
      return;
    }

    try {
      const response = await api.get("/messages", {
        params: {
          conversationId: conversationId,
        },
      });

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  function handleSendMessage() {
    if (messageText === "" || !currentConversation?.conversationId) {
      return;
    }

    const messageData = {
      conversationId: currentConversation?.conversationId,
      text: messageText,
      sender: user?._id,
    };

    socketInstance.emit("send_message", messageData);
    setMessages((mess) => [...mess, messageData]);
    setMessageText("");
  }

  return (
    <div className={styles.messages_card}>
      {messages.length !== 0 ? (
        <>
          <TopMessagesCard currentConversation={currentConversation} />

          <div className={styles.messages_content}>
            {messages.map((mess, index) => (
              <MessageItem
                key={index}
                data={mess}
                user={user}
                recipientName={currentConversation?.name}
              />
            ))}
          </div>

          <MessagesInput
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            message={messageText}
            setMessage={setMessageText}
          />
        </>
      ) : (
        <p>Sem mensagens por aqui, amigao</p>
      )}
    </div>
  );
}
