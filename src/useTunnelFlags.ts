import { useDebugValue } from 'react';
import { combineFlags } from './internal/combineFlags';
import { useTunnelSubscription } from './internal/useTunnelSubscription';

export function useTunnelFlags<T = object>(id: any) {
  const tunnel = useTunnelSubscription(id);
  const flags = combineFlags(tunnel);
  useDebugValue(flags);
  return flags as Partial<T>;
}
