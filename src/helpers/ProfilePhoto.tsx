import { useSafeUserContext } from "../context/AuthenticationContext";

import profileImg from "../assets/profile-icon.png";
import { useEffect, useState } from "react";

export const ProfilePhoto = () => {
  const { user } = useSafeUserContext();

  const [profilePhoto, setProfilePhoto] = useState(profileImg);

  useEffect(() => {
    const loadProfilePhoto = async () => {
      if (user?.photoURL && typeof user.photoURL === "string") {
        try {
          setProfilePhoto(user.photoURL as string);
        } catch (error) {
          setProfilePhoto(profileImg);
        }
      } else {
        setProfilePhoto(profileImg);
      }
    };

    loadProfilePhoto();
  }, [user]);

  return (
    <img src={profilePhoto} alt="Profile Icon" referrerPolicy="no-referrer" />
  );
};
