# @pageproof/react-tunnels

**React Tunnels is experimental, please proceed with caution. The v0.x release is not appropriate for production
use-cases. The API is subject to change - so if you do decide to use it, please make sure to use `--save-exact` when
installing to avoid unexpected surprises.**

React Tunnels are a convenient way of specifying a different part of the component tree to render your components.
Think _React Portals_ but without the DOM. It's worth noting that it's not exactly like React Portals, but it can have a
similar effect.

React Tunnels can also be used to pass around data, called "flags". Flags can be used to customize how the tunnel is
rendered, or just a convenient way to pass around data & keep it in-sync without emitting events.

## Installation

```sh
$ npm install --save @pageproof/react-tunnels
```

## Documentation

Documentation is minimal right now, as we decide the best API for React Tunnels. We have some incomplete documentation
in the [docs](./docs) folder in the repo. Probably the best place to start would be the [`createTunnel()`](./docs/api/createTunnel.md)
documentation, as it contains some examples. And using/enabling TypeScript intellisense features in your IDE will also
help a lot.

## License

[MIT License](./LICENSE)
