import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { removeCookie } from "@/cookies";
import styles from "./styles.module.scss";

type SiderbarProps = {
  setPeople: () => void;
  setContacts: () => void;
};

export default function Sidebar({ setPeople, setContacts }: SiderbarProps) {
  async function logOut() {
    await removeCookie();
  }

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.center_content}>
        <button onClick={setContacts}>
          <BiSolidMessageSquareDetail size={25} color="#404064" />
        </button>

        <button onClick={setPeople}>
          <BsFillPeopleFill size={25} color="#404064" />
        </button>
      </div>

      <button onClick={logOut} className={styles.logOut_button}>
        <IoMdLogOut size={27} color="#f2f2f2" />
      </button>
    </div>
  );
}
