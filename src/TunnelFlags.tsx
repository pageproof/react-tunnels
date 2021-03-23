import { Children, cloneElement, isValidElement } from 'react';
import { useTunnelFlags } from './useTunnelFlags';

export interface TunnelFlagsProps<Flags = object> {
  id: any;
  children: ((flags: Partial<Flags>) => (React.ReactElement | null)) | React.ReactElement;
}

export const TunnelFlags: React.FC<TunnelFlagsProps> = ({ id, children }) => {
  const flags = useTunnelFlags(id);

  if (typeof children === 'function') {
    return children(flags);
  }

  const child = Children.only(children);
  if (isValidElement(child)) {
    return cloneElement(child, flags);
  }

  return null;
};
