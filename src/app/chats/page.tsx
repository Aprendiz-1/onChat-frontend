"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import styles from "../../styles/chat.module.scss";
import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/UserCard";
import ContactsContent from "@/components/ContactsContent";
import MessagesCard from "@/components/MessagesCard";
import EditUserModel from "@/components/EditUserModal";

export type UserProps = {
  _id: string;
  name: string;
  nickname?: string;
  email: string;
  avatar?: string;
  status: string;
};

export type ConversationProps = {
  _id: string;
  name: string;
  status: string;
  avatar?: string;
  lastMessage?: {
    sender: string;
    text: string;
    createdAt: Date;
  };
};

export type CurrentConversationProps = {
  conversationId: string;
  _id: string;
  name: string;
  status: string;
  avatar?: string;
};

export type CardsListageProps = {
  type: string;
  list: UserProps[] | ConversationProps[];
};

export default function ChatsPage() {
  const [user, setUser] = useState<UserProps>();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [cardsListage, setCardsListage] = useState<CardsListageProps>();
  const [currentConversation, setCurrentConversation] =
    useState<CurrentConversationProps>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadUser();
    loadContacts();
    loadConversations();
  }, []);

  async function loadUser() {
    try {
      const response = await api.get("/get-user");

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
      const response = await api.get("/list-conversations");

      const convs = response.data.map((conv) => {
        const otherParticipant = conv.participants[1]; // ajustar lógica
        return { ...otherParticipant, lastMessage: conv.lastMessage };
      });

      setConversations(convs);
      setCardsListage({ type: "contacts", list: convs });
    } catch (error) {
      console.log(error);
    }
  }

  async function selectConversation(recipient: UserProps | undefined) {
    try {
      const response = await api.post("/get-conversation", {
        participants: [user?._id, recipient?._id],
      });

      const conversation = response.data;
      const otherParticipant = conversation.participants[1];

      setCurrentConversation({
        conversationId: conversation._id,
        ...otherParticipant,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createConversation(recipient: UserProps | undefined) {
    try {
      const response = await api.post("/create-conversation", {
        participants: [user?._id, recipient?._id],
      });

      const conversation = response.data;
      const otherParticipant = conversation.participants[1]; // ajustar lógica

      const filteredUsers = users.filter(
        (us) => us._id !== otherParticipant._id
      );

      setUsers(filteredUsers);
      const newConversations = [otherParticipant, ...conversations];
      setConversations(newConversations);
      setCardsListage({ type: "contacts", list: newConversations });

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
        <UserCard user={user} openModal={() => setModalVisible(true)} />
        <ContactsContent
          contacts={cardsListage}
          setContacts={setCardsListage}
          selectConversation={selectConversation}
          createConversation={createConversation}
        />
      </div>

      <div className={styles.messages_container}>
        <MessagesCard user={user} currentConversation={currentConversation} />
      </div>

      {modalVisible && (
        <EditUserModel closeModal={() => setModalVisible(false)} user={user} />
      )}
    </div>
  );
}
