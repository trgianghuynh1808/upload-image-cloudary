import React from "react";
import { Row, Spinner, Container } from "react-bootstrap";

const LoadingSpinners = () => {
  return (
    <Container style={styles.container}>
      <Row className="justify-content-md-center">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
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
