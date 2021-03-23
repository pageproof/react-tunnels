import React, { cloneElement, isValidElement } from 'react';
import { Fragment } from 'react';
import { combineFlags } from './internal/combineFlags';
import { useTunnelSubscription } from './internal/useTunnelSubscription';

export interface TunnelRendererProps<Flags = object> {
  id: any;
  limit?: number;
  children?: (elements: React.ReactElement[], flags: Partial<Flags>) => (React.ReactElement | null);
}

export const TunnelRenderer: React.FC<TunnelRendererProps> = ({ id, limit, children }) => {
  const tunnel = useTunnelSubscription(id);
  const entries = Object.entries(Object.fromEntries(tunnel.tunnels.entries()));

  const elements = entries
    .filter(entry => entry[1].children)
    .slice(0, limit || undefined)
    .map(([key, entry]) => (
      isValidElement(entry.children)
        ? cloneElement(entry.children, { key })
        : <Fragment key={key}>{entry.children}</Fragment>
    ));

  if (children) {
    const flags = combineFlags(tunnel);
    return children(elements, flags);
  }

  return <>{elements}</>;
};
