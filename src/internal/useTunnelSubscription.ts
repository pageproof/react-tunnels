import { useForceUpdate } from './useForceUpdate';
import { useEffect } from 'react';
import { useTunnel } from './useTunnel';

export const useTunnelSubscription = (id: any) => {
  const tunnel = useTunnel(id);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const subscriber = () => forceUpdate();
    tunnel.subscribers.add(subscriber);

    return () => {
      tunnel.subscribers.delete(subscriber);
    };
  }, [id]);

  return tunnel;
};
