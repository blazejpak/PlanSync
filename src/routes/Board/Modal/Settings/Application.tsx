import { useSafeSettingsContext } from "../../../../context/Settings";

const Application = () => {
  const { changeFontFamily, changeFontSize, switchDarkTheme } =
    useSafeSettingsContext();

  return (
    <div>
      <div>
        <strong>Change theme:</strong>
        <p>light</p>
        <p>DARK</p>
      </div>

      {/* INTER | ROBOTO | RUBIK */}
      <div>
        <strong>Change Font</strong>
        <p onClick={() => changeFontFamily("Rubik")}>Rubik</p>
        <p onClick={() => changeFontFamily("Lora")}>Lora</p>
        <p onClick={() => changeFontFamily("Montserrat")}>Montserrat</p>
      </div>

      <div>
        <strong>Change size of letters</strong>
        <p>SMALL</p>
        <p>MEDIUM</p>
        <p>LARGE</p>
      </div>
    </div>
  );
};

export default Application;
