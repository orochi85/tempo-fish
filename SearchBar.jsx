import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Adicione estilos se necessário

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor, insira um termo de busca.');
      return;
    }

    try {
      const response = await axios.get(`https://api.example.com/search?q=${query}`);
      setResults(response.data);
      setError(null); // Limpa o erro se a busca for bem-sucedida
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setError('Erro ao buscar cidades. Tente novamente mais tarde.');
      setResults([]); // Limpa os resultados em caso de erro
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar cidade..."
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Busca ao pressionar Enter
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p className="error-message">{error}</p>}

      <ul className="results-list">
        {results.map((city, index) => (
          <li key={index}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar; 