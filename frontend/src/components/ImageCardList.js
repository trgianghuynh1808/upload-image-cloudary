import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import LoadingSpinners from "./LoadingSpinners";
import ImageCard from "./ImageCard";

export const ImageCardList = ({ showMsgToast, isRefetch }) => {
  const [images, setImages] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const loadImages = async () => {
    try {
      setIsLoadingData(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/api/images`
      );
      const data = await res.json();
      setImages(data);
      setIsLoadingData(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    loadImages();
  }, [isRefetch]);

  return (
    <div className="mt-4">
      {isLoadingData ? (
        <LoadingSpinners />
      ) : (
        <Row>
          {images.length > 0 &&
            images.map((image, index) => (
              <Col lg="3" className="mb-2" key={index}>
                <ImageCard image={image} showMsgToast={showMsgToast} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};
