import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export const InputUploadImage = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    if (!previewSrc) return;

    uploadImage(previewSrc);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col lg="3">
          <Form onSubmit={handleSubmitFile}>
            <Form.File>
              <Form.File.Input onChange={handleFileInputChange} />
            </Form.File>
            <Button type="submit" className="mt-3" variant="success">
              Submit
            </Button>{" "}
          </Form>
        </Col>
        {previewSrc && (
          <Col lg="5">
            <Card className="preview-img-card">
              <Card.Img variant="top" src={previewSrc} />
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};
