import { createContext } from 'react';
import { ContextType } from '../../types';

const contextoGeral = createContext<ContextType>({
  apiGeral: [],
  setApiGeral: () => null,
});

export default contextoGeral;
