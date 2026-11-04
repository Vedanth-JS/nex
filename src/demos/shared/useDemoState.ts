import { useContext } from 'react';
import { DemoStateContext } from './DemoStateContext';

export const useDemoState = () => {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
};

