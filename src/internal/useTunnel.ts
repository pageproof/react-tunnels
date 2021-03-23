import { useContext } from 'react';
import { Tunnel, TunnelContext } from './TunnelContext';

export const useTunnel = (id: any): Tunnel => {
  const context = useContext(TunnelContext);

  if (!context.has(id)) {
    context.set(id, {
      tunnels: new Map(),
      subscribers: new Set(),
    });
  }

  return context.get(id)!;
};
