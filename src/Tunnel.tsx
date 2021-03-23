import { useEffect } from 'react';
import { useUniqueKey } from './internal/useUniqueKey';
import { useTunnel } from './internal/useTunnel';

export interface TunnelProps {
  id: any;
  [flag: string]: any;
}

export const Tunnel: React.FC<TunnelProps> = ({ id, children, ...flags }) => {
  const tunnel = useTunnel(id);
  const childId = useUniqueKey();

  useEffect(() => {
    tunnel.tunnels.set(childId, { children, flags });
    const update = () => tunnel.subscribers.forEach((subscriber) => subscriber());
    update();

    return () => {
      tunnel.tunnels.delete(childId);
      update();
    };
  });

  return null;
};
