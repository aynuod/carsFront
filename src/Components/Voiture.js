import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Importer les hooks nécessaires
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

const Voiture = () => {
  const [voiture, setVoiture] = useState({
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    prix: '',
    annee: ''
  });

  const navigate = useNavigate(); // Hook pour la navigation
  const { id } = useParams(); // Hook pour récupérer l'ID dans l'URL

  // Charger les données de la voiture si l'ID est fourni (cas d'édition)
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/voitures/${id}`)
        .then(response => {
          if (response.data != null) {
            setVoiture(response.data);
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement de la voiture:', error);
        });
    }
  }, [id]);

  const voitureChange = event => {
    setVoiture({
      ...voiture,
      [event.target.name]: event.target.value
    });
  };

  const submitVoiture = event => {
    event.preventDefault();

    const voitureData = {
      marque: voiture.marque,
      modele: voiture.modele,
      couleur: voiture.couleur,
      immatricule: voiture.immatricule,
      prix: parseInt(voiture.prix), 
      annee: parseInt(voiture.annee)
    };

    if (id) {
      // Cas d'édition
      axios.put(`http://localhost:8080/voitures/${id}`, voitureData, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.data != null) {
            alert('Voiture mise à jour avec succès');
            navigate('/list'); // Retour à la liste après la mise à jour
          }
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de la voiture:', error);
        });
    } else {
      // Cas d'ajout
      axios.post('http://localhost:8080/voitures/add', voitureData, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.data != null) {
            setVoiture({
              marque: '',
              modele: '',
              couleur: '',
              immatricule: '',
              prix: '',
              annee: ''
            });
            alert('Voiture ajoutée avec succès');
            navigate('/list'); 
          }
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la voiture:', error);
        });
    }
  };

  return (
    <Card className={"border border-dark bg-dark text-white"}>
      <Card.Header>{id ? 'Modifier Voiture' : 'Ajouter Voiture'}</Card.Header>
      <Form onSubmit={submitVoiture} id="VoitureFormId">
        <Card.Body>
          <Row>
            <Form.Group as={Col} controlId="formGridMarque">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                required
                name="marque"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Marque Voiture"
                value={voiture.marque}
                onChange={voitureChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridModele">
              <Form.Label>Modele</Form.Label>
              <Form.Control
                required
                name="modele"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Modele Voiture"
                value={voiture.modele}
                onChange={voitureChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCouleur">
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                required
                name="couleur"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Couleur Voiture"
                value={voiture.couleur}
                onChange={voitureChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridImmatricule">
              <Form.Label>Immatricule</Form.Label>
              <Form.Control
                required
                name="immatricule"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Immatricule Voiture"
                value={voiture.immatricule}
                onChange={voitureChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                required
                name="prix"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Prix Voiture"
                value={voiture.prix}
                onChange={voitureChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAnnee">
              <Form.Label>Annee</Form.Label>
              <Form.Control
                required
                name="annee"
                type="text"
                className="bg-dark text-white"
                placeholder="Entrez Annee Voiture"
                value={voiture.annee}
                onChange={voitureChange}
              />
            </Form.Group>
          </Row>
        </Card.Body>
        <Card.Footer style={{ textAlign: 'right' }}>
          <Button size="sm" variant="success" type="submit">
            <FontAwesomeIcon icon={id ? faEdit : faPlus} className="me-2" />
            {id ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default Voiture;
