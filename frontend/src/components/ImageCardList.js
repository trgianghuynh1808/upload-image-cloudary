import React, { useState, useEffect } from "react";
import { Card, Button, Image } from "react-bootstrap";

export const ImageCardList = () => {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/images`
      );
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="mt-4">
      {images.length > 0 &&
        images.map((image, index) => (
          <Image src={image.url} width="300" thumbnail />
        ))}
    </div>
  );
};
