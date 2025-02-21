import styles from "./style.module.scss";

type LoginInputProps = {
  title: string;
  keyId: string;
  placeholderText: string;
  value: string;
  type: string;
  onChangeText: (value: string) => void;
};

export default function LoginInput({
  title,
  keyId,
  placeholderText,
  value,
  type,
  onChangeText,
}: LoginInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={keyId}>{title}</label>
      <input
        id={keyId}
        placeholder={placeholderText}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
}
