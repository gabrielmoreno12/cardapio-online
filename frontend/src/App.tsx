import './App.css';
import { Card } from './components/card';
import { useFoodData } from './hooks/useFoodData';
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal';

import emptyImage from './assets/pizza.png';


function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="content">
        <div className="card-grid">
          {data && data.length > 0 ? (
            data.map(foodData => (
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
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button className="btn-add" onClick={handleOpenModal}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;

