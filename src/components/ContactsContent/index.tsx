import styles from "./styles.module.scss";
import ContactsInput from "../ContactsInput";
import ContactCard from "../ContactCard";
import { CardsListageProps, UserProps } from "@/app/chats/chats";

type ContactsContent = {
  contacts: CardsListageProps;
  createConversation: (recipient: UserProps) => Promise<void>;
};

export default function ContactsContent({
  contacts,
  createConversation,
}: ContactsContent) {
  return (
    <div className={styles.contacts_container}>
      <ContactsInput />

      {contacts &&
        contacts.list.map((item) => (
          <ContactCard
            key={item._id}
            data={item}
            isSelected={false}
            selectConversation={createConversation}
          />
        ))}
    </div>
  );
}
