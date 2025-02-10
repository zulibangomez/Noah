import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './../layout/stylesLogin.css';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/img/logos_principal/logo_principal.jpeg'; 

// Array de imágenes de fondo
const backgrounds = [
  '/src/assets/img/logos_principal/fondo1.jpeg',
  '/src/assets/img/logos_principal/fondo2.jpeg',
  '/src/assets/img/logos_principal/fondo3.jpeg',
  '/src/assets/img/logos_principal/fondo4.jpeg',
];

export const AuthVistaGeneral = ({ children, titulo = '' }) => {
  const [error] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Cambia la imagen de fondo cada 5 segundos
    const interval = setInterval(() => {
      setCurrentBackground(prev => (prev + 1) % backgrounds.length);
    }, 5000); // Cambiar cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-container">
      {/* Imagen de fondo */}
      <div className="background-image" style={{ backgroundImage: `url(${backgrounds[currentBackground]})` }} />
      
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
      
        <Row className="justify-content-center">
        
          {/* Columna para el formulario */}
          <Col xs={10} sm={5} md={7}>
         
            <Card className="shadow" style={{ borderRadius: '8px' }}>
              <Card.Body>
                <Row className="text-center">
                  <img src={logo} alt="User Icon" className="background-logo" />
                  <Card.Title as="h5" className="mb-3">{titulo}</Card.Title>
                </Row>
              
                {children}
                
                <br></br>
                <h5 className='text-center'>Conéctate con nosotros</h5>
                        <div className="social-icons">
                        
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="social-icon" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="social-icon" />
                            </a>
                            <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
                                <FaEnvelope className="social-icon" />
                            </a>
                        </div>
                    
              </Card.Body>
              
            </Card>
            
          </Col>
          
        </Row>
      </Container>
    </div>
  );
};
