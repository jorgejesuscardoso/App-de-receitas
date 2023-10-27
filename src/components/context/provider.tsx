import { useState } from 'react';
import { Geral } from '../../types';
import contextoGeral from './geralContext';

type PropParaChildren = {
  children: React.ReactNode;
};

function ProviderApi({ children }: PropParaChildren) {
  const [apiGeral, setApiGeral] = useState<Geral[]>([]);

  const contexto = {
    apiGeral,
    setApiGeral,
  };

  return (
    <contextoGeral.Provider value={ contexto }>

      { children }

    </contextoGeral.Provider>
  );
}

export default ProviderApi;
