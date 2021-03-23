import { createContext } from 'react';

export interface Tunnel {
  tunnels: Map<string, {
    children: React.ReactNode;
    flags: { [flag: string]: any };
  }>;
  subscribers: Set<() => void>;
}

export interface TunnelContextType extends Map<any, Tunnel> {
  //
}

// For react apps that have multiple mounts, omitting `<TunnelProvider>` will allow tunnels to cross over to other mounts - as the default context value is used.
export const TunnelContext = createContext<TunnelContextType>(new Map());
TunnelContext.displayName = 'TunnelContext';
