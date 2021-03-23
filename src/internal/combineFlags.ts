import { Tunnel } from './TunnelContext';

export const combineFlags = (tunnel: Tunnel) => {
  return [...tunnel.tunnels.values()]
    .reduce((tunnelFlags, tunnel) => ({
      ...tunnelFlags,
      ...tunnel.flags,
    }), {});
};
