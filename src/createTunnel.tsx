import React from 'react';
import { Tunnel } from './Tunnel';
import { TunnelRenderer, TunnelRendererProps } from './TunnelRenderer';
import { TunnelFlags, TunnelFlagsProps } from './TunnelFlags';
import { useTunnelFlags } from './useTunnelFlags';

export function createTunnel<Flags = object>() {
  const id = Symbol();

  const WrappedTunnel: React.FC<Partial<Flags>> = (props) => <Tunnel {...props} id={id} />;
  const WrappedTunnelRenderer: React.FC<Omit<TunnelRendererProps<Flags>, 'id'>> = (props) => <TunnelRenderer {...props} id={id} />;
  const WrappedTunnelFlags: React.FC<Omit<TunnelFlagsProps<Flags>, 'id'>> = (props) => <TunnelFlags {...props} id={id} />;
  const useWrappedTunnelFlags = () => useTunnelFlags<Flags>(id);

  return {
    Tunnel: WrappedTunnel,
    TunnelRenderer: WrappedTunnelRenderer,
    TunnelFlags: WrappedTunnelFlags,
    useTunnelFlags: useWrappedTunnelFlags,
  };
}
