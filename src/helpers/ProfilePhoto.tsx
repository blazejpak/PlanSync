import profileImg from "../assets/profile-icon.png";
import { useEffect, useState } from "react";

type ProfilePhoto = {
  profileImage: string;
};

export const ProfilePhoto = ({ profileImage }: ProfilePhoto) => {
  const [profilePhoto, setProfilePhoto] = useState(profileImg);
  console.log(profileImage);
  useEffect(() => {
    const loadProfilePhoto = async () => {
      if (profileImage && typeof profileImage === "string") {
        try {
          setProfilePhoto(profileImage as string);
        } catch (error) {
          setProfilePhoto(profileImg);
        }
      } else {
        setProfilePhoto(profileImg);
      }
    };

    loadProfilePhoto();
  }, [profileImage]);

  return (
    <img src={profilePhoto} alt="Profile Icon" referrerPolicy="no-referrer" />
  );
};
