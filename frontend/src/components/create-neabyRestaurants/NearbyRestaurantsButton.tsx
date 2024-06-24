import React from 'react';
import './NearbyRestaurantsButton.css';

function NearbyRestaurantsButton() {
  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/search/restaurantes/@${latitude},${longitude},15z`;
        window.open(googleMapsUrl, '_blank');
      }, (error) => {
        console.error('Error obtaining location', error);
        alert('Não foi possível obter a localização. Verifique as permissões e tente novamente.');
      });
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  };

  return (
    <button className="btn-nearby" onClick={handleButtonClick}>
      <i className="fas fa-map-marker-alt"></i> Encontrar Restaurantes Próximos
    </button>
  );
}

export default NearbyRestaurantsButton;
