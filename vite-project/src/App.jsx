import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import Patrimoine from "../../models/Patrimoine.js"
import Possession from "../../models/possessions/Possession.js"
import Flux from "../../models/possessions/Flux.js"
import data from "../../data/data.json"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
  const [patrimoine, setPatrimoine] = useState(null);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  useEffect(() => {
    const possessions = data
      .filter((item) => item.model === "Patrimoine")
      .map((item) => item.data.possessions)
      .flat()
      .map((possession) => {
        if (possession.tauxAmortissement) {
          return new Possession(
            possession.possesseur,
            possession.libelle,
            parseFloat(possession.valeur),
            new Date(possession.dateDebut),
            new Date(possession.dateFin),
            parseFloat(possession.tauxAmortissement)
          );
        } else {
          return new Flux(
            possession.possesseur,
            possession.libelle,
            parseFloat(possession.valeur),
            new Date(possession.dateDebut),
            new Date(possession.dateFin),
            null,
            possession.jour,
            parseFloat(possession.valeurConstante)
          );
        }
      });

    const patrimoine = new Patrimoine(data.possesseur, possessions);
    setPatrimoine(patrimoine);
  }, []);

  const calculerValeurPatrimoine = () => {
    if (patrimoine) {
      let valeur = 0;
      patrimoine.possessions.forEach((possession) => {
        if (possession instanceof Possession) {
          valeur += possession.getValeur(dateSelectionnee);
        } else if (possession instanceof Flux) {
          valeur += possession.getValeur(dateSelectionnee);
        }
      });
      const macBookPro = patrimoine.possessions.find((possession) => possession.libelle === "MacBook Pro");
      if (macBookPro) {
        valeur += macBookPro.getValeur(dateSelectionnee);
      }
      setValeurPatrimoine(valeur);
    }
  };

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
              {data
                .filter((item) => item.model === "Patrimoine")
                .map((item, index) => {
                  const possessions = item.data.possessions;

                  return possessions.map((possession, possessionIndex) => (
                    <tr key={possessionIndex}>
                      <td>{possession.libelle}</td>
                      <td>{possession.valeur}</td>
                      <td>{possession.dateDebut}</td>
                      <td>{possession.dateFin}</td>
                      <td>{possession.tauxAmortissement}</td>
                      <td>{possession.valeurConstante}</td>
                    </tr>
                  ));
                })}
            </tbody>
          </Table>
          <Form>
            <div className="mb-4 mt-5">
              <label className='labelStyle'>Sélectionner une date :</label>
              <DatePicker
                selected={dateSelectionnee}
                onChange={(date) => setDateSelectionnee(date)}
                dateFormat="yyyy-MM-dd"
                className='datePickerStyle'
              />
            </div>
            <Button style={{ backgroundColor: 'gray' }} onClick={calculerValeurPatrimoine}>Valider</Button>
          </Form>
          {valeurPatrimoine !== null && (
            <div className="mt-4">
              <h3>Valeur Totale du Patrimoine</h3>
              <p>{valeurPatrimoine.toFixed(2)} Ariary</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;