import React from 'react';
import { Tunnel, TunnelRenderer, TunnelFlags } from '..';

const id = 'example'; // or `Symbol();` if you want to keep your tunnel fully private

console.log(
  <TunnelFlags id={id}>
    {(flags: any) => ( // the `any` here is here because using `TunnelFlags` with an id (and not with `createTunnel`) means we have no type information about the flags
      <div>Hello {flags.hello}</div>
    )}
  </TunnelFlags>
);

console.log(
  <Tunnel id={id} hello="world" />
);

console.log(
  <Tunnel id={id}>
    Sup yo
  </Tunnel>
);

console.log(
  <TunnelRenderer id={id} />
);
