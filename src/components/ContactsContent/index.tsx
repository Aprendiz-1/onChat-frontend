import styles from "./styles.module.scss";
import ContactsInput from "../ContactsInput";
import ContactCard from "../ContactCard";
import api from "@/services/api";
import { useState } from "react";
import { CardsListageProps, UserProps } from "@/app/chats/page";

type ContactsContent = {
  contacts: CardsListageProps | undefined;
  setContacts: (contacts: CardsListageProps) => void;
  selectConversation: (recipient?: UserProps) => Promise<void>;
  createConversation: (recipient?: UserProps) => Promise<void>;
};

export default function ContactsContent({
  contacts,
  setContacts,
  selectConversation,
  createConversation,
}: ContactsContent) {
  const [userName, setUserName] = useState("");

  async function searchConversation() {
    try {
      const response = await api.get("/search-conversation", {
        params: {
          name: userName,
        },
      });

      const findedConversation = response.data;
      setContacts({ type: "contacts", list: findedConversation });
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  }

  async function searchUser() {
    try {
      const response = await api.get("/search-user", {
        params: {
          name: userName,
        },
      });

      const findedUser = response.data;
      setContacts({ type: "people", list: findedUser });
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.contacts_container}>
      <ContactsInput
        value={userName}
        onChangeText={setUserName}
        type={contacts?.type}
        searchUser={searchUser}
        searchConv={searchConversation}
      />

      {contacts &&
        contacts?.list.map((item) => (
          <ContactCard
            key={item._id}
            data={item}
            isSelected={false}
            type={contacts?.type}
            select={selectConversation}
            create={createConversation}
          />
        ))}
    </div>
  );
}
