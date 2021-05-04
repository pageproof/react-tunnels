# createTunnel()

Creates a "private tunnel", using a [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
as the tunnel ID. This function returns an object containing all the components and hooks that are exposed by this
library, but with the `id` prop (for the components) and `id` argument (for the hooks) already set to the tunnel's ID.
The tunnel ID is not included in this object - ensuring that the tunnel can only be used by code you expose it to.

When creating a private tunnel that uses flags in a TypeScript codebase, you must also specify the type/interface that
contains the flags & their types. By default the flags type is set to `object` which prevents you from being able to
easily access the flags in your code - this is intentionally, to ensure type safety in your code (see below).

```ts
const ExampleTunnel = createTunnel<{ variant: string }>();

const { color } = ExampleTunnel.useTunnelFlags();
     // ^ error TS2339: Property 'color' does not exist on type 'Partial<{ variant: string; }>'.
```

## Example: Modals

The following example creates a tunnel for modals. The developer uses the `<Modal />` component anywhere in the
component structure and it gets rendered by the `<App />` component - outside the content area of the page. This is
bare-bones approach to implementing modals - as this example does not handle any _accessibility_ issues.

The renderer for the modal tunnel specifies the `limit` prop (set to `1`), which ensures that only one modal is placed
onto the page at once.

```tsx
import { createTunnel } from '@pageproof/react-tunnels';

const ModalTunnel = createTunnel();

interface ModalProps {
  title: React.ReactNode;
  onDismiss: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onDismiss }) => {
  return (
    <ModalTunnel.Tunnel>
      <div className="Modal">
        <header>
          <h1>{title}</h1>
          <aside>
            <button onClick={onDismiss}>
              Dismiss
            </button>
          </aside>
        </header>
        <div>
          {children}
        </div>
      </div>
    </ModalTunnel.Tunnel>
  );
};

const App: React.FC = () => (
  <TunnelProvider>
    <Content />
    <ModalTunnel.TunnelRenderer limit={1} />
  </TunnelProvider>
);

const Content: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal
      </button>
      {showModal && (
        <Modal title="Example" onDismiss={() => setShowModal(false)}>
          Hello, this is the modal message.
        </Modal>
      )}
    </>
  );
};
```

## Example: System Tray (using children)

In this example, anywhere in your app can make use of a simple `SystemTrayIcon` component to place an icon in the header
of the page. The `SystemTrayIcon` component uses the `Tunnel` component to insert a child node into a renderer that the
`App` component places in the header (system tray). This approach can be handy when you want parts of your app to
temporarily place a custom icon in the system tray.

```tsx
import { createTunnel } from '@pageproof/react-tunnels';

const SystemTrayTunnel = createTunnel();

interface SystemTrayIconProps {
  iconUrl: string;
  onClick: () => void;
}

const SystemTrayIcon: React.FC<SystemTrayIconProps> = ({ iconUrl, onClick }) => {
  return (
    <SystemTrayTunnel.Tunnel>
      <button className="SystemTrayIcon" onClick={onClick}>
        <img src={iconUrl} />
      </button>
    </SystemTrayTunnel.Tunnel>
  );
};

const App: React.FC = () => (
  <TunnelProvider>
    <header>
      <img src="/logo.svg" />
      <aside className="SystemTray">
        <SystemTrayTunnel.TunnelRenderer />
      </aside>
    </header>
    <Content />
  </TunnelProvider>
);

const Content: React.FC = () => (
  <>
    <p>Hello World!</p>
    <SystemTrayIcon
      iconUrl="/help.svg"
      onClick={() => alert('Show a help modal!')}
    />
  </>
);
```

## Example: System Tray (using flags)

In this example, instead of using the tunnel to pass children through to the renderer, we can make use of tunnel flags
to enable which system tray icons the `SystemTray` component should render. This approach is helpful when multiple areas
of your app need to activate the same feature (eg. a generic help icon). However that doesn't mean you have to pick
between using children or flags, you can use them both!

```tsx
import { createTunnel } from '@pageproof/react-tunnels';

interface SystemTrayTunnelFlags {
  help: boolean;
}

const SystemTrayTunnel = createTunnel<SystemTrayTunnelFlags>();

const SystemTray: React.FC = () => (
  <aside className="SystemTray">
    <SystemTrayTunnel.TunnelFlags>
      {({ help }) => (
        <>
          {help && (
            <button className="SystemTrayIcon" onClick={() => alert('Show a help modal!')}>
              <img src="/help.svg" />
            </button>
          )}
        </>
      )}
    </SystemTrayTunnel.TunnelFlags>
  </aside>
);

const App: React.FC = () => (
  <TunnelProvider>
    <header>
      <img src="/logo.svg" />
      <SystemTray />
    </header>
    <Content />
  </TunnelProvider>
);

const Content: React.FC = () => (
  <>
    <p>Hello World!</p>
    <SystemTrayTunnel.Tunnel help />
  </>
);
```
