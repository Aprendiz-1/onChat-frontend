import styles from "./style.module.scss";

type LoginInputProps = {
  title: string;
  keyId: string;
  placeholderText: string;
  value: string;
  onChangeText: (value: string) => void;
};

export default function LoginInput({
  title,
  keyId,
  placeholderText,
  value,
  onChangeText,
}: LoginInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={keyId}>{title}</label>
      <input
        id={keyId}
        placeholder={placeholderText}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
}
