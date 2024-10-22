import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import NavigationBar from './Components/NavigationBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      prix: '',
      annee: '',
    };

    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  voitureChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitVoiture = (event) => {
    alert(`Marque: ${this.state.marque}, Modele: ${this.state.modele}, Couleur: ${this.state.couleur}, Immatricule: ${this.state.immatricule}, Prix: ${this.state.prix}, Annee: ${this.state.annee}`);
    event.preventDefault();
  };

  render() {
    const marginTop = { marginTop: '20px' };
    return (
      <Router>
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route
                  path="/add"
                  element={
                    <Voiture
                      marque={this.state.marque}
                      modele={this.state.modele}
                      voitureChange={this.voitureChange}
                      submitVoiture={this.submitVoiture}
                    />
                  }
                />
                <Route path="/list" element={<VoitureListe />} />
                <Route path="/edit/:id" element={<Voiture />} /> 
              </Routes>
            </Col>
          </Row>
          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;