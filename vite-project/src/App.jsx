import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Patrimoine from "../../models/Patrimoine.js"
import Possession from "../../models/possessions/Possession.js"
import data from "./data.json"

function App() {
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Patrimoine</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur initiale</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Amortissement</th>
                <th>Valeur actuelle</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item,index) => {
                const possession = new Possession(
                  item.libelle,
                  item.valeur_initiale,
                  item.datedebut,
                  item.datefin,
                  item.amortissement,
                  item.valeur_actuelle
                )

                return (
                  <tr key= {index}>
                    <td>{item.libelle}</td>
                    <td>{item.valeur_initiale}</td>
                    <td>{item.datedebut}</td>
                    <td>{item.datefin}</td>
                    <td>{item.amortissement}</td>
                    <td>{item.valeur_actuelle}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary">Valider</Button>
          </Form>
          <p>Valeur du patrimoine : <span> </span></p>
        </Col>
      </Row>
    </Container>
  );
}

export default App