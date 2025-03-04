import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import user_default from "../../assets/user_default.png";
import { UserProps } from "@/app/chats/page";
import styles from "./styles.module.scss";

type UserCardProp = {
  user: UserProps | undefined;
  openModal: () => void;
};

export default function UserCard({ user, openModal }: UserCardProp) {
  return (
    <div className={styles.user_card}>
      <div className={styles.user_status_content}>
        <span>Online</span>
      </div>

      <Image
        src={user?.avatar ? user.avatar : user_default}
        alt="Avatar"
        height={70}
      />

      <div className={styles.user_text_content}>
        <span className={styles.user_name}>{user?.name}</span>
        <span className={styles.user_email}>{user?.email}</span>
      </div>

      <button onClick={openModal} className={styles.edit_button}>
        <TbEdit size={18} color="#c9c9c9" />
      </button>
    </div>
  );
}
