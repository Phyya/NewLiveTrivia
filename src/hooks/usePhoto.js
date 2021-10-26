import { useState, useContext, useEffect } from "react";
import { get } from "../context/Store";
import userAvatar from "../img/user-alt.svg";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Storage } from "@capacitor/storage";
import { Share } from "@capacitor/share";
import { Store } from "../context/Store";

export const basicShare = async () => {
  await Share.share({
    title: "See cool stuff",
    text: "Really awesome thing you need to see right now",
    url: "http://ionicframework.com/",
    dialogTitle: "Share with buddies",
  });
};

const PHOTO_STORAGE = "photos";

export function usePhoto() {
  const { state } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const currentPicture = state.userDetails.profilePicture
    ? state.userDetails.profilePicture
    : userAvatar;
  const [photo, setPhoto] = useState(currentPicture);

  const takePhoto = async () => {
    setLoading(true);
    try {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 20,
      });
      setLoading(true);
      const base64Image = cameraPhoto.base64String;
      const finalPicture = `data:image/jpeg;base64,${base64Image}`;

      setPhoto(finalPicture);
      Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(finalPicture) });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  return {
    photo,
    loading,
    setLoading,
    takePhoto,
  };
}
