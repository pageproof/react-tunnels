# @pageproof/react-tunnels

React Tunnels are a convenient way of specifying a different part of the component tree to render your components.
Think React Portals but without the DOM. It's worth noting that it's not exactly like React Portals, but it can have a
similar effect. React Tunnels can also be used to pass around "flags" - which can be used to customize how the
tunnel is rendered, or just a convenient way to pass around data & keep it in-sync without emitting events.

## Installation

```sh
$ npm install --save @pageproof/react-tunnels
```

## Basic Usage

Below is an example of adding a basic "system-tray" in the header of your application.

__Header.jsx__
```jsx
export function Header() {
  return (
    <header>
      <img src="/img/logo.png" />
      <HeaderTray />
    </header>
  );
}
```

__HeaderTray.jsx__
```jsx
export function HeaderTray() {
  return (
    <aside>
      <TunnelRenderer id="header-tray" />
    </aside>
  );
}

export function HeaderTrayIcon({ iconUrl, onClick }) {
  return (
    <Tunnel id="header-tray">
      <button onClick={onClick}>
        <img src={iconUrl} />
      </button>
    </Tunnel>
  );
}
```

__Example.jsx__
```jsx
import { useState } from 'react';

export function Example() {
  const [showExample, setShowExample] = useState(false);

  return (
    <>
      <button onClick={() => setShowExample(!showExample)}>
        Toggle Example
      </button>

      {/* When showExample is set to true, render the tray icon. Set it back to false when it's clicked. */}
      {showExample && (
        <HeaderTrayIcon
          iconUrl="/img/example.png"
          onClick={() => setShowExample(false)}
        />
      )}
    </>
  );
}
```

## API

### `<Tunnel id={any}>{children}</Tunnel>`

The `Tunnel` component (when used with `children`) provides content for any associated `TunnelRenderer` to render.

The following example renders "Hello World" in any `TunnelRenderer` with the ID of `"message"`.

```jsx
<Tunnel id="message">
  Hello World
</Tunnel>
```

### `<Tunnel id={any} {...flags} />`

The `Tunnel` component (when no children are passed) exposes flags that can be consumed by (primarily) the renderer
associated to it, or any other components that wish to make use of them. It's a convenient way of passing data around,
as all flags are flattened when being consumed.

One example of using flags is if you wanted to allow components to tell the page's header to hide in certain situations.

```jsx
<Tunnel id="header" hide />

// ...

<TunnelFlags id="header">
  {(headerFlags) => (
    <header style={{ opacity: headerFlags.hide ? 0 : 1 }}>
      <img src="/img/logo.png" />
    </header>
  )}
</TunnelFlags>
```

Usually flags are boolean values, but there really isn't any restrictions around flag values. It's just worth noting
that if the same flag is set by multiple different `<Tunnel />` components (of the same ID), the last one wins.

### `<TunnelRenderer id={any} limit={number|undefined} />`

The `TunnelRenderer` component (with no children) is used to render all the children that are provided by the `Tunnel`
components with the same ID. You can optionally provide a `limit` prop, which limits the number of children it renders.
By default this limit is set to `0` meaning no limit/all children.

```jsx
<header>
  <img src="/img/logo.png" />
  <TunnelRenderer id="header" />
</header>
```

### `<TunnelRenderer id={any} limit={number|undefined}>{children}</TunnelRenderer>`

The `TunnelRenderer` component (with children) is used to customize how to render the tunnel children. The children prop
takes in a render function that is passed two arguments; the first being an array of React elements, and the second
being the flattened tunnel flags (for convenience).

```jsx
<TunnelRenderer id="header">
  {(elements, headerFlags) => (
    <header style={{ opacity: headerFlags.hide ? 0 : 1 }}>
      <img src="/img/logo.png" />
      {elements}
    </header>
  )}
</TunnelRenderer>
```

### `<TunnelFlags id={any}>{children}</TunnelFlags>`

The `TunnelFlags` component is used to consume the a tunnel's flags. The `children` prop accepts a function that accepts
a function, which is provided the flattened flags object, and expects a React Element to be returned (and rendered).

Alternatively you can use the `useTunnelFlags` hook to consume a tunnel's flag.

### `useTunnelFlags(id: any)`

The `useTunnelFlags` hook returns a tunnel's flags, and automatically updates whenever the flags are changed.

The following example is similar to an earlier example of hiding a header using flags, but instead of setting the
opacity, it simply bails out of the component - rendering nothing.

```jsx
import { useTunnelFlags } from '@pageproof/react-tunnels';

function Header() {
  const headerFlags = useTunnelFlags('header');

  if (headerFlags.hide) {
    return null;
  }

  return (
    <header>
      <img src="/img/logo.png" />
    </header>
  );
}
```

### `<TunnelProvider>{children}</TunnelProvider>`

The `TunnelProvider` component provides the underlying context used by the tunnels.

For projects with multiple React roots, you can avoid using the `TunnelProvider` component, in order to allow tunnels
to jump across roots.

### `createTunnel<Flags>(): { Tunnel, TunnelRenderer, TunnelFlags, useTunnelFlags }`

The `createTunnel` function can be used to create a private tunnel. Internally, the ID used by the tunnel is a unique
`Symbol` object - making it impossible to intercept.

The return value is an object containing wrapped instances of the `Tunnel`, `TunnelRenderer`, and `TunnelFlags`
components, and the `useTunnelFlags` hook. The only difference is that you do not need to provide an `id` prop/argument
to any of them.

If you're using TypeScript, you also benefit from `createTunnel`, as you can pass in a type that describes all the valid
flags you intend to use in the tunnel. I'd suggest always using private tunnels, unless there's some reason you can't.

```tsx
import { createTunnel } from '@pageproof/react-tunnels';

interface MyCustomFlags {
  message: string;
  type: 'something' | 'another';
}

const {
  Tunnel: MyCustomTunnel,
  TunnelRenderer: MyCustomTunnelRenderer,
  useTunnelFlags: useMyCustomTunnelFlags,
} = createTunnel<MyCustomFlags>();

// Works
<MyCustomTunnel type="something" />

// Throws a TypeScript compilation error
<MyCustomTunnel type="not-a-valid-type" />
```

## License

[MIT License](./LICENSE)
