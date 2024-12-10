import { useSafeUserContext } from "../context/AuthenticationContext";
import { useSafeSettingsContext } from "../context/Settings";
import { getPersonalData } from "../utils/firebase/AuthService";

export const GetSettingsData = async () => {
  const { changeDarkTheme, changeFontFamily, changeFontSize } =
    useSafeSettingsContext();

  const { currentUserData } = useSafeUserContext();

  if (currentUserData.userId) {
    const userData = await getPersonalData(currentUserData.userId);

    if (userData) {
      changeDarkTheme(userData.appSettings.uiTheme);
      changeFontFamily(userData.appSettings.fontFamily);
      changeFontSize(userData.appSettings.fontSize);
    }
  }
};
