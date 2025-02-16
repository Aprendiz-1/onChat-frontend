import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import user_default from "../../assets/user_default.png";
import styles from "./styles.module.scss";
import { UserProps } from "@/app/chats/chats";

type UserCardProp = {
  user: UserProps;
};

export default function UserCard({ user }: UserCardProp) {
  return (
    <div className={styles.user_card}>
      <select onChange={() => {}} className={styles.select_status}>
        <option value="online" style={{ backgroundColor: "#4BC16E" }}>
          Online
        </option>
        <option value="offline" style={{ backgroundColor: "#fdd835" }}>
          Ausente
        </option>
        <option value="offline" style={{ backgroundColor: "#fd3535" }}>
          Ocupado
        </option>
      </select>

      <Image
        src={user.avatar ? user.avatar : user_default}
        alt="Avatar"
        height={70}
      />

      <div className={styles.user_text_content}>
        <span className={styles.user_name}>{user?.name}</span>
        <span className={styles.user_email}>{user?.email}</span>
      </div>

      <TbEdit
        size={18}
        color="#c9c9c9"
        style={{ position: "absolute", bottom: 12, right: 12 }}
      />
    </div>
  );
}
