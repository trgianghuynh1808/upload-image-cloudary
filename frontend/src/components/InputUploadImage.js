import { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export const InputUploadImage = ({ setIsRefetch, isRefetch, showMsgToast }) => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);

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
    try {
      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });

      showMsgToast(
        `Upload success, waiting a few seconds and then click "Refresh Button"`
      );
      //clear data
      setPreviewSrc("");
      document.getElementById("input-file").value = null;
    } catch (error) {
      console.error(error);
    }
  };

  const reFetchData = () => {
    setIsRefetch(!isRefetch);
  };

  useEffect(() => {
    if (previewSrc) {
      return setDisableSubmit(false);
    }

    setDisableSubmit(true);
  }, [previewSrc]);

  return (
    <div>
      <Row className="align-items-center">
        <Col lg="3">
          <Form onSubmit={handleSubmitFile}>
            <Form.File>
              <Form.File.Input
                onChange={handleFileInputChange}
                id="input-file"
              />
            </Form.File>
            <Button
              type="submit"
              className="mt-3"
              variant="success"
              disabled={disableSubmit}
            >
              Submit
            </Button>
            <Button
              className="mt-3 ml-3"
              variant="primary"
              onClick={reFetchData}
            >
              Refresh
            </Button>
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
