import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://6ph1anvvdg.execute-api.us-east-1.amazonaws.com/v1';

const App = () => {
  const [mototaxistas, setMototaxistas] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [localidade, setLocalidade] = useState('');

  // Função para buscar mototaxistas
  const getMototaxistas = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMototaxistas(response.data);
    } catch (error) {
      console.error('Erro ao buscar mototaxistas:', error);
    }
  };

  // Função para cadastrar um novo mototaxista
  const addMototaxista = async () => {
    try {
      const novoMototaxista = { nome, telefone, localidade };
      await axios.post(apiUrl, novoMototaxista);
      setNome('');
      setTelefone('');
      setLocalidade('');
      getMototaxistas();
    } catch (error) {
      console.error('Erro ao cadastrar mototaxista:', error);
    }
  };

  useEffect(() => {
    getMototaxistas();
  }, []);

  return (
    <div>
      <h1>Cadastro de Mototaxistas</h1>
      <input 
        type="text" 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone" 
        value={telefone} 
        onChange={(e) => setTelefone(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Localidade" 
        value={localidade} 
        onChange={(e) => setLocalidade(e.target.value)} 
      />
      <button onClick={addMototaxista}>Cadastrar</button>

      <h2>Mototaxistas Cadastrados</h2>
      <ul>
        {mototaxistas.map((moto) => (
          <li key={moto.telefone}>
            {moto.nome} - {moto.telefone} - {moto.localidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
