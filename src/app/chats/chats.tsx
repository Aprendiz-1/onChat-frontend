"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import styles from "../../styles/chat.module.scss";
import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/UserCard";
import ContactsContent from "@/components/ContactsContent";
import MessagesCard from "@/components/MessagesCard";

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

export type ConversationProps = {
  conversationId: string;
  recipientName: string;
  recipientAvatar?: string;
};

export type CardsListageProps = {
  type: string;
  list: UserProps[];
};

export default function ChatsPage({ token }: ChatProp) {
  const [user, setUser] = useState<UserProps>({
    _id: "",
    name: "",
    email: "",
    avatar: "",
    status: "",
  });
  const [users, setUsers] = useState<Array<UserProps>>([]);
  const [conversations, setConversations] = useState<Array<UserProps>>([]);
  const [cardsListage, setCardsListage] = useState<CardsListageProps>();
  const [currentConversation, setCurrentConversation] =
    useState<ConversationProps>();

  useEffect(() => {
    loadUser();
    loadContacts();
    loadConversations();
  }, []);

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

  async function loadContacts() {
    try {
      const response = await api.get("/contacts");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadConversations() {
    try {
      const response = await api.get("/list-conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const convs = response.data.map((conv) => {
        const otherParticipant = conv.participants[1]; // ajustar lógica
        return { ...otherParticipant };
      });

      setConversations(convs);
      setCardsListage({ type: "contacts", list: convs });
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
      const otherParticipant = conversation.participants[1]; // ajustar lógica

      setCurrentConversation({
        conversationId: conversation._id,
        ...otherParticipant,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function setContactsList(listConversations: CardsListageProps) {
    setCardsListage(listConversations);
  }

  return (
    <div className={styles.chat_container}>
      <Sidebar
        setPeople={() => setContactsList({ type: "people", list: users })}
        setContacts={() =>
          setContactsList({ type: "contacts", list: conversations })
        }
      />

      <div className={styles.cards_container}>
        <UserCard user={user} />
        <ContactsContent
          contacts={cardsListage}
          createConversation={createConversation}
        />
      </div>

      <div className={styles.messages_container}>
        <MessagesCard user={user} currentConversation={currentConversation} />
      </div>
    </div>
  );
}
