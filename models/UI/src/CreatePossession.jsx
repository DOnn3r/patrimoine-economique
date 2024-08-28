import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreatePossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState(0);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [taux, setTaux] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/possession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ libelle, valeur, dateDebut, taux })
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Create new possession</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur</th>
                <th>Date début</th>
                <th>Taux</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control type="text" value={libelle} onChange={(event) => setLibelle(event.target.value)} />
                </td>
                <td>
                  <Form.Control type="number" value={valeur} onChange={(event) => setValeur(event.target.value)} />
                </td>
                <td>
                  <DatePicker
                    selected={dateDebut}
                    onChange={(date) => setDateDebut(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                </td>
                <td>
                  <Form.Control type="number" value={taux} onChange={(event) => setTaux(event.target.value)} />
                </td>
                <td>
                  <Button type="submit" onClick={handleSubmit}>Create</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePossession;