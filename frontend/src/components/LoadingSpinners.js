import React from "react";
import { Row, Spinner, Container } from "react-bootstrap";

const LoadingSpinners = () => {
  return (
    <Container style={styles.container}>
      <Row className="justify-content-md-center">
        <Spinner className="mr-2" animation="grow" variant="primary" />
        <Spinner className="mr-2" animation="grow" variant="secondary" />
        <Spinner className="mr-2" animation="grow" variant="success" />
        <Spinner className="mr-2" animation="grow" variant="danger" />
        <Spinner className="mr-2" animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    height: "60vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default LoadingSpinners;
