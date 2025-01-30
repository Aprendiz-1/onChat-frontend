import Image from "next/image";
import styles from "../../styles/auth.module.scss";
import RegisterForm from "./form";
import logo from "../../assets/new-logo.png";

export default function Register() {
  return (
    <div className={styles.container}>
      <Image alt="logo" src={logo} width={270} />
      <RegisterForm />
    </div>
  );
}
