import React from "react";
import { Card } from "react-bootstrap";

const ImageCard = ({ image, showMsgToast }) => {
  const copyUrlToClipboard = (imgUrl) => {
    const inputEle = document.createElement("input");

    document.body.appendChild(inputEle);
    inputEle.value = imgUrl;
    inputEle.select();
    document.execCommand("copy", false);
    inputEle.remove();
  };

  const handleClickImgCard = (image) => {
    showMsgToast(`${image.publicId} copied`);
    copyUrlToClipboard(image.url);
  };

  return (
    image && (
      <Card>
        <Card.Img
          variant="top"
          src={image.url}
          style={{ height: "150px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Text>{image.publicId}</Card.Text>
          <Card.Link
            href="#"
            onClick={() => {
              handleClickImgCard(image);
            }}
          >
            Copy Url
          </Card.Link>
          <Card.Link href="#" className="text-secondary">
            Remove Image
          </Card.Link>
        </Card.Body>
      </Card>
    )
  );
};

export default ImageCard;
