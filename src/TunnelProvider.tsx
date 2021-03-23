import React from 'react';
import { useState } from 'react';
import { TunnelContext, TunnelContextType } from './internal/TunnelContext';

export const TunnelProvider: React.FC = ({ children }) => {
  const [contextState] = useState<TunnelContextType>(() => new Map());

  return (
    <TunnelContext.Provider value={contextState}>
      {children}
    </TunnelContext.Provider>
  );
};
