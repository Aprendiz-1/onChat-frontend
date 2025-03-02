import MessageItem from "../MessageItem";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import MessagesInput from "../MessagesInput";
import TopMessagesCard from "../TopMessagesCard";
import { BiMessageSquareX } from "react-icons/bi";
import api from "@/services/api";
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
  const messagesContentRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const scrollableElement = messagesContentRef.current;

    if (scrollableElement) {
      scrollableElement.scrollTop = scrollableElement.scrollHeight;
    }
  }, [messages]);

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

  if (messages.length === 0 && !currentConversation) {
    return (
      <div className={styles.messages_card}>
        <div className={styles.no_message_content}>
          <BiMessageSquareX size={90} color="#404064" />
          <p>Não há mensagens para exibir</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messages_card}>
      <TopMessagesCard currentConversation={currentConversation} />

      <div className={styles.messages_content} ref={messagesContentRef}>
        {messages.map((mess, index) => {
          const isFirstMessage =
            index === 0 || messages[index - 1].sender !== mess.sender;

          return (
            <MessageItem
              key={index}
              data={mess}
              user={user}
              isFirst={isFirstMessage}
              recipientName={currentConversation?.name}
            />
          );
        })}
      </div>

      <MessagesInput
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        message={messageText}
        setMessage={setMessageText}
      />
    </div>
  );
}
