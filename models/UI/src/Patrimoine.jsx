import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function Patrimoine() {
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [jour, setJour] = useState(1);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  useEffect(() => {
    fetch(`/patrimoine/range?type=month&dateDebut=${dateDebut.toISOString()}&dateFin=${dateFin.toISOString()}&jour=${jour}`)
      .then(response => response.json())
      .then(data => setValeurPatrimoine(data));
  }, [dateDebut, dateFin, jour]);

  const handleDateDebutChange = (date) => {
    setDateDebut(date);
  };

  const handleDateFinChange = (date) => {
    setDateFin(date);
  };

  const handleJourChange = (jour) => {
    setJour(jour);
  };

  return (
    <Container>
      <Row className='mt-4'>
        <Col md={12}>
          <h1>Patrimoine</h1>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={6} style={{width : '100%'}}>
          <Form className='text-center'>
            <Form.Group controlId="dateDebut">
              <Form.Label>Date début:</Form.Label>
              <Form.Control type="date" value={dateDebut.toISOString()} onChange={handleDateDebutChange} />
            </Form.Group>
            <Form.Group controlId="dateFin">
              <Form.Label>Date fin:</Form.Label>
              <Form.Control type="date" value={dateFin.toISOString()} onChange={handleDateFinChange} />
            </Form.Group>
            <Form.Group controlId="jour">
              <Form.Label>Jour:</Form.Label>
              <Form.Control type="number" value={jour} onChange={handleJourChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          {valeurPatrimoine && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Jour</th>
                  <th>Valeur patrimoine</th>
                </tr>
              </thead>
              <tbody>
                {valeurPatrimoine.map((value, index) => (
                  <tr key={index}>
                    <td>Jour {index + 1}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Patrimoine;