import { useSafeUserContext } from "../context/AuthenticationContext";
import { useSafeSettingsContext } from "../context/Settings";
import { PickedFont, PickedFontSize, PickedTheme } from "../types/settings";
import { getPersonalData } from "../utils/firebase/AuthService";

export const GetSettingsData = async () => {
  const { changeDarkTheme, changeFontFamily, changeFontSize } =
    useSafeSettingsContext();

  const { currentUserData } = useSafeUserContext();

  const theme = localStorage.getItem("theme") as PickedTheme;
  const fontFamily = localStorage.getItem("fontFamily") as PickedFont;
  const fontSize = localStorage.getItem("fontSize") as PickedFontSize;

  if (theme && fontFamily && fontSize) {
    return;
  }

  if (currentUserData.userId) {
    const userData = await getPersonalData(currentUserData.userId);

    if (userData) {
      changeDarkTheme(userData.appSettings.uiTheme);
      changeFontFamily(userData.appSettings.fontFamily);
      changeFontSize(userData.appSettings.fontSize);
    }
  }
};
