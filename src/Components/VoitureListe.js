import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import axios from 'axios';
import MyToast from './MyToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

class VoitureListe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      loading: true,
      error: null,
      show: false // Ajout de l'état pour le toast
    };

    this.deleteVoiture = this.deleteVoiture.bind(this);
    this.editVoiture = this.editVoiture.bind(this);
  }

  componentDidMount() {
    this.fetchVoitures();
  }

  fetchVoitures() {
    fetch('http://localhost:8080/voitures/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          voitures: data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
        console.error('Erreur lors de la récupération des voitures:', error);
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete("http://localhost:8080/voitures/" + voitureId)
      .then(response => {
        if(response.data != null) {
          // Mise à jour de l'état pour afficher le toast
          this.setState({
            show: true,
            voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
          });
          
          // Masquer le toast après 3 secondes
          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      });
  };

  editVoiture(voitureId) {
    window.location.href = `/edit/${voitureId}`;
  }

  render() {
    const { voitures, loading, error } = this.state;

    return (
      <>
        <div style={{"display": this.state.show ? "block" : "none"}}>
          <MyToast children={{ 
            show: this.state.show, 
            message: "Voiture supprimée avec succès." 
          }}/>
        </div>

        <Container className="py-4">
          {loading && <div className="text-center p-4">Chargement...</div>}
          
          {error && <div className="text-center text-danger p-4">Erreur: {error}</div>}
          
          {!loading && !error && (
            <>
              <h2 className="text-center mb-4" style={{ color: 'blue' }}>
                <FontAwesomeIcon icon={faCar} className="me-2" />
                Liste des Voitures
            </h2>
              <Table striped bordered hover responsive="sm" variant="light">
                <thead className="thead-dark">
                  <tr>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Couleur</th>
                    <th>Prix</th>
                    <th>Matricule</th>
                    <th>Année</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {voitures.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Aucune voiture disponible
                      </td>
                    </tr>
                  ) : (
                    voitures.map((voiture) => (
                      <tr key={voiture.id}>
                        <td>{voiture.marque}</td>
                        <td>{voiture.modele}</td>
                        <td>{voiture.couleur}</td>
                        <td className="text-right">{voiture.prix.toLocaleString()} €</td>
                        <td>{voiture.immatricule}</td>
                        <td className="text-center">{voiture.annee}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => this.editVoiture(voiture.id)}
                              className="d-flex align-items-center"
                            >
                              <FaEdit className="me-1" /> Éditer
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => this.deleteVoiture(voiture.id)}
                              className="d-flex align-items-center"
                            >
                              <FaTrash className="me-1" /> Supprimer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Container>
      </>
    );
  }
}

export default VoitureListe;