import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  id: string;
  name: string;
  required: boolean;
  type: string;
};

const Input = ({
  label,
  placeholder,
  onChange,
  id,
  name,
  required,
  type,
}: InputProps) => {
  return (
    <div className={styles.form}>
      <label className={styles.label} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </label>
      {type == "text" && (
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
        />
      )}
      {type === "textarea" && (
        <textarea
          name={name}
          id={id}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
        />
      )}
    </div>
  );
};

export default Input;
