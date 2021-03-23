import React from 'react';
import { createTunnel } from '..';

interface ExampleFlags {
  hello: 'world';
}

const { Tunnel, TunnelRenderer, TunnelFlags } = createTunnel<ExampleFlags>();

console.log(
  <TunnelFlags>
    {(flags) => ( // we don't have to specify a type here because we created our tunnel using `createTunnel` which handles this for us automatically
      <div>Hello {flags.hello}</div>
    )}
  </TunnelFlags>
);

console.log(
  <Tunnel hello="world" />
);

console.log(
  <Tunnel>
    Sup yo
  </Tunnel>
);

console.log(
  <TunnelRenderer />
);
