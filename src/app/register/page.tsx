import styles from "../../styles/auth.module.scss";
import RegisterForm from "./form";

export default function Register() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}
