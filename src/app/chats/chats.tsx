"use client";

import React, { useEffect, useState } from "react";
import ContactCard from "@/components/ContactCard";
import { socket } from "@/socket";
import { api } from "@/services/api";
import MessageItem from "@/components/MessageItem";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Image from "next/image";
import user_default from "../../assets/user_default.png";
import { removeCookie } from "@/cookies";
import styles from "../../styles/chat.module.scss";

type ChatProp = {
  token: string;
};

export type UserProps = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  status: string;
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

export default function ChatsPage({ token }: ChatProp) {
  const [user, setUser] = useState<UserProps>({
    _id: "",
    name: "",
    email: "",
    avatar: "",
    status: "",
  });
  const [socketInstance] = useState(socket(user._id));
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

  async function loadUser() {
    try {
      const response = await api.get("/get-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { _id, name, email } = response.data;
      setUser({ _id, name, email, status: "online" });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadUser();
    loadContacts();

    socketInstance.on("receive_message", (message) => {
      if (message.conversationId === currentConversation?.conversationId) {
        setMessages((mess) => [...mess, message]);
      }
    });

    return () => {
      socketInstance.off("receive_message");
      setUser({ ...user, status: "offline" });
    };
  }, [socketInstance]);

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
    <div className={styles.chat_container}>
      <div className={styles.sidebar_container}>
        <span>{user.status}</span>
        <span>{user.name}</span>
        <div
          style={{
            display: "flex",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: user.status === "online" ? "#f00000" : "#555",
            borderRadius: 30,
          }}
        >
          <FaCircleUser size={35} color="#fff" />
        </div>
        <div className={styles.center_content}>
          <BiSolidMessageSquareDetail size={25} color="#fff" />
          <BsFillPeopleFill size={25} color="#fff" />
        </div>

        <button onClick={logOut} className={styles.logOut_button}>
          <IoMdLogOut size={30} color="#222" />
        </button>
      </div>

      <div className={styles.contacts_container}>
        {contacts &&
          contacts.map((item) => (
            <ContactCard
              key={item._id}
              data={item}
              selectConversation={createConversation}
            />
          ))}
      </div>

      <div className={styles.messages_container}>
        {/* {currentConversation && (
          <div className={styles.top_content}>
            <Image
              src={
                currentConversation?.recipientAvatar
                  ? currentConversation?.recipientAvatar
                  : user_default
              }
              alt="Avatar"
              height={45}
            />

            <h3>{currentConversation?.recipientName}</h3>
          </div>
        )} */}

        <div className={styles.messages_content}>
          {messages.map((mess, index) => (
            <MessageItem
              key={index}
              data={mess}
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
            onKeyDown={handleKeyPress}
          />

          <button onClick={handleSendMessage}>
            <IoSend size={22} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
