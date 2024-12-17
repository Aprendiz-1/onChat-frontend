"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/auth.module.scss";
import ContactCard from "@/components/ContactCard";
import { socket } from "@/socket";
import { api } from "@/services/api";
import MessageItem from "@/components/MessageItem";
import Image from "next/image";
import user_default from "../../assets/user_default.png";
import { removeCookie } from "@/cookies";

export type UserProps = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

type ConversationProps = {
  conversationId: string;
  recipientName: string;
  recipientAvatar?: string;
};

export type MessageProps = {
  conversationId: string;
  sender: string;
  text: string;
  timestamp: Date;
};

export default function Chats() {
  const [user, setUser] = useState<UserProps>({
    _id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [socketInstance] = useState(socket());
  const [messageText, setMessageText] = useState("");
  const [contacts, setContacts] = useState<Array<UserProps>>([]);
  const [currentConversation, setCurrentConversation] =
    useState<ConversationProps>();
  const [messages, setMessages] = useState<Array<MessageProps>>([]);

  async function loadContacts() {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("user@data");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    loadContacts();

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

  async function createConversation(recipient: UserProps) {
    try {
      const response = await api.post("/conversation", {
        participants: [user._id, recipient._id],
      });

      const conversation = response.data;
      setCurrentConversation({
        conversationId: conversation._id,
        recipientName: recipient.name,
        recipientAvatar: recipient?.avatar,
      });

      loadMessages(conversation._id);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSendMessage() {
    const messageData = {
      conversationId: currentConversation?.conversationId,
      text: messageText,
      sender: user._id,
    };

    socketInstance.emit("send_message", messageData);
    setMessages((mess) => [...mess, messageData]);
    setMessageText("");
  }

  function logOut() {
    localStorage.clear();
    removeCookie();
  }

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={user.avatar ? user.avatar : user_default}
            alt="Avatar"
            height={43}
            style={{
              marginRight: 10,
              borderRadius: "50%",
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "#6b32ad",
            }}
          />
          <h2>{user?.name}</h2>
        </div>

        <button onClick={logOut} className={styles.logout_button}>
          Logout
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.contacts_list}>
          <input
            placeholder="Encontre pessoas"
            className={styles.search_input}
          />

          {contacts &&
            contacts.map((item) => (
              <ContactCard
                key={item._id}
                data={item}
                selectConversation={createConversation}
              />
            ))}
        </div>

        <div className={styles.messages_content}>
          <div className={styles.top_messages}>
            {currentConversation && (
              <Image
                src={
                  currentConversation.recipientAvatar
                    ? currentConversation.recipientAvatar
                    : user_default
                }
                alt="Avatar"
                height={35}
                style={{ marginRight: 8 }}
              />
            )}
            <h3>{currentConversation?.recipientName || "Mensagens"}</h3>
          </div>

          <div className={styles.center_messages}>
            {messages.map((item, index) => (
              <MessageItem
                key={index}
                data={item}
                user={user}
                recipientName={currentConversation?.recipientName}
              />
            ))}
          </div>

          <div className={styles.input_content}>
            <input
              placeholder="Digite aqui"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
