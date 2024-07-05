import './App.css';
import { Card } from './components/card';
import { useFoodData } from './hooks/useFoodData';
import { useState, useEffect } from 'react'; // Importe useEffect
import { CreateModal } from './components/create-modal/create-modal';
import NearbyRestaurantsButton from './components/create-neabyRestaurants/NearbyRestaurantsButton';
import SearchAmazon from './components/create-searchAmazon/searchAmazon';

import emptyImage from './assets/pizza.png';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState<number>(0); // Estado para armazenar o preço máximo disponível

  // Defina o preço máximo disponível ao carregar os dados
  useEffect(() => {
    if (data) {
      const maxPrice = Math.max(...data.map(food => food.price));
      setMaxPriceLimit(maxPrice);
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const resetFilter = () => {
    setMaxPrice(0);
  };

  const filteredData = maxPrice > 0
    ? data?.filter(foodData => foodData.price <= maxPrice)
    : data;

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="content">
        <div className="filter-bar">
          <label htmlFor="priceSlider">Preço até R$ {maxPrice}</label>
          <input
            id="priceSlider"
            type="range"
            min="0"
            max={maxPriceLimit} // Ajuste para usar o preço máximo disponível
            value={maxPrice}
            onChange={handleSliderChange}
          />
          <button className="btn-filter" onClick={resetFilter}>Limpar Filtro</button>
        </div>
        <div className="card-grid">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map(foodData => (
              <Card
                key={foodData.id}
                id={foodData.id}
                price={foodData.price}
                title={foodData.title}
                image={foodData.image}
              />
            ))
          ) : (
            <div className="empty-state">
              <img src={emptyImage} alt="Empty State" />
              <p>Nenhum item encontrado no cardápio.</p>
            </div>
          )}
        </div>
        {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
        <button className="btn-add" onClick={handleOpenModal}>Adicionar</button>
        <NearbyRestaurantsButton />
        <SearchAmazon /> {/* Adicionar a barra de pesquisa */}
      </div>
    </div>
  );
}

export default App;