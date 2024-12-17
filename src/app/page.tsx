import styles from "../styles/auth.module.scss";
import LoginForm from "./form";

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
