import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

import "../assets/css/index.css";
import { InputUploadImage } from "../components/InputUploadImage";
import { ImageCardList } from "../components/ImageCardList";

const MainPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState("");
  const [isRefetch, setIsRefetch] = useState(false);

  const showMsgToast = (msg) => {
    setShowToast(true);
    setMsgToast(msg);
  };

  // close notify toast
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return (
    <div>
      <h2 className="mt-3">Upload Image To Cloudinary</h2>
      <InputUploadImage
        setIsRefetch={setIsRefetch}
        isRefetch={isRefetch}
        showMsgToast={showMsgToast}
      />
      <ImageCardList showMsgToast={showMsgToast} isRefetch={isRefetch} />

      {showToast && (
        <Toast className="toast bg-success text-white">
          <Toast.Body>{msgToast}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default MainPage;
