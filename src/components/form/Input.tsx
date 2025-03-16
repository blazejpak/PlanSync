import { ValuesTypes } from "../boxes/ValuesType";
import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  id: string;
  name: string;
  required: boolean;
  type: string;
  values?: ValuesTypes;
};

const Input = ({
  label,
  placeholder,
  onChange,
  id,
  name,
  required,
  type,
  values,
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
          value={values?.task}
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
          value={values?.description}
        />
      )}
    </div>
  );
};

export default Input;
