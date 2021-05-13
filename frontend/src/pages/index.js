import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

import "../assets/css/index.css";

const MainPage = () => {
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

  return (
    <div>
      <h2 className="mt-3">Upload Image</h2>
      <Row className="align-items-center">
        <Col lg="3">
          <Form>
            <Form.File>
              <Form.File.Input onChange={handleFileInputChange} />
            </Form.File>
            <Button className="mt-3" variant="success">
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

export default MainPage;
