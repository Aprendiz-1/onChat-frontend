import styles from "./styles.module.scss";
import ContactsInput from "../ContactsInput";
import ContactCard from "../ContactCard";
import api from "@/services/api";
import { useState } from "react";
import { CardsListageProps, UserProps } from "@/app/chats/page";

type ContactsContent = {
  user: UserProps | undefined;
  contacts: CardsListageProps;
  setContacts: (contacts: CardsListageProps) => void;
  selectConversation: (recipient?: UserProps) => Promise<void>;
  createConversation: (recipient?: UserProps) => Promise<void>;
  loadConvs: (user_id: string | undefined) => Promise<void>;
};

export default function ContactsContent({
  user,
  contacts,
  setContacts,
  selectConversation,
  createConversation,
  loadConvs,
}: ContactsContent) {
  const [userName, setUserName] = useState("");
  const [searchRealized, setSearchRealized] = useState(false);

  function searchConversation() {
    try {
      if (userName === "") {
        alert("Digite algum nome!");
        return;
      }

      const conversations = contacts?.list;
      const findedConversation = conversations?.filter((conv) =>
        conv.name.toLowerCase().includes(userName.toLowerCase())
      );

      setContacts({ type: "contacts", list: findedConversation });
      setSearchRealized(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function resetConversationSearch() {
    try {
      await loadConvs(user?._id);
      setUserName("");
      setSearchRealized(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchUser() {
    try {
      if (userName === "") {
        alert("Digite algum nome!");
        return;
      }

      const response = await api.get("/search-user", {
        params: {
          name: userName,
        },
      });

      const findedUser = response.data;
      setContacts({ type: "people", list: findedUser });
      setSearchRealized(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function resetUserSearch() {
    try {
      const response = await api.get("/contacts");
      const users = response.data;
      setUserName("");
      setContacts({ type: "people", list: users });
      setSearchRealized(false);
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
        showSearch={searchRealized}
        loadUsers={resetUserSearch}
        loadConvs={resetConversationSearch}
      />

      {contacts &&
        contacts?.list.map((item, index) => (
          <ContactCard
            key={index}
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
