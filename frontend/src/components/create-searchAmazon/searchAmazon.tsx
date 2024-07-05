import React, { useState } from 'react';
import './searchAmazon.css';

interface SearchAmazonProps {
  onSearch: (query: string) => void;
}

const SearchAmazon: React.FC<SearchAmazonProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Simulação de redirecionamento para a página da Amazon
    window.open(`https://www.amazon.com.br/s?k=${encodeURIComponent(searchQuery)}`, '_blank');
    // Chama a função de pesquisa passada como prop para atualizar o estado na App
    onSearch(searchQuery);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-amazon">
      <input
        type="text"
        placeholder="Buscar no Amazon"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Pesquisar Ingredientes</button>
    </div>
  );
};

export default SearchAmazon;
