import React, { useState } from 'react';
import './App.css';

const WorkInclusive = () => {
  const [disabilities, setDisabilities] = useState({
    fisica: false,
    visiva: false,
    uditiva: false,
    cognitiva: false,
    mentale: false
  });

  const [suggerimenti, setSuggerimenti] = useState([]);

  const proposteLavoro = [
    { nome: 'Assistente domiciliare', disabilitàNonAdatte: [] },
    { nome: 'Programmatore web', disabilitàNonAdatte: ['fisica'] },
    { nome: 'Traduttore', disabilitàNonAdatte: [] },
    { nome: 'Assistente telefonico', disabilitàNonAdatte: ['uditiva'] },
    { nome: 'Copywriter', disabilitàNonAdatte: [] },
    { nome: 'Programmatore di software di accessibilità', disabilitàNonAdatte: [] },
    { nome: 'Scrittore', disabilitàNonAdatte: [] },
    { nome: 'Trascrittore', disabilitàNonAdatte: [] },
    { nome: 'Programmatore di sottotitoli', disabilitàNonAdatte: ['uditiva'] },
    { nome: 'Supporto tecnico telefonico', disabilitàNonAdatte: ['cognitiva'] },
    { nome: 'Artista digitale', disabilitàNonAdatte: [] },
    { nome: 'Assistente amministrativo', disabilitàNonAdatte: [] },
    { nome: 'Copywriter', disabilitàNonAdatte: [] },
    { nome: 'Consulente online', disabilitàNonAdatte: [] },
    { nome: 'Programmatore di app di salute mentale', disabilitàNonAdatte: [] },
    // Lavori adatti a tutte le disabilità
    { nome: 'Programmatore', disabilitàNonAdatte: ['fisica', 'visiva', 'uditiva', 'cognitiva', 'mentale'] },
    { nome: 'Consulente', disabilitàNonAdatte: ['fisica', 'visiva', 'uditiva', 'cognitiva', 'mentale'] },
    { nome: 'Designer', disabilitàNonAdatte: ['fisica', 'visiva', 'uditiva', 'cognitiva', 'mentale'] },
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDisabilities(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleGetSuggerimenti = () => {
    let suggerimenti = [];
    let disabilitàSelezionate = Object.keys(disabilities).filter(key => disabilities[key]);
    
    if (disabilitàSelezionate.length === 0) {
      setSuggerimenti(proposteLavoro.map(lavoro => lavoro.nome));
      return;
    }

    suggerimenti = proposteLavoro.filter(lavoro => {
      for (let disabilità of disabilitàSelezionate) {
        if (lavoro.disabilitàNonAdatte.includes(disabilità)) {
          return false;
        }
      }
      return true;
    }).map(lavoro => lavoro.nome);

    setSuggerimenti(suggerimenti);
  };

  return (
    <div className='WorkInclusive'>
      <h2>Scegli le tue disabilità</h2>
      <label>
        <input type="checkbox" name="fisica" checked={disabilities.fisica} onChange={handleCheckboxChange} />
        Disabilità fisica
      </label>
      <label>
        <input type="checkbox" name="visiva" checked={disabilities.visiva} onChange={handleCheckboxChange} />
        Disabilità visiva
      </label>
      <label>
        <input type="checkbox" name="uditiva" checked={disabilities.uditiva} onChange={handleCheckboxChange} />
        Disabilità uditiva
      </label>
      <label>
        <input type="checkbox" name="cognitiva" checked={disabilities.cognitiva} onChange={handleCheckboxChange} />
        Disabilità cognitiva
      </label>
      <label>
        <input type="checkbox" name="mentale" checked={disabilities.mentale} onChange={handleCheckboxChange} />
        Disabilità mentale
      </label>
      <button onClick={handleGetSuggerimenti}>Ottenere suggerimenti</button>
      {suggerimenti.length > 0 ? (
        <div>
          <h3>Lavori suggeriti:</h3>
          <ul id='result'>
            {suggerimenti.map((lavoro, index) => (
              <li key={index}>{lavoro}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Puoi svolgere ogni tipo di lavoro.</p>
      )}
    </div>
  );
};

export default WorkInclusive;
