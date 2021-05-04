# \<Tunnel />

The `Tunnel` component can be used to render other components/children in any `TunnelRenderer` component with the same
tunnel ID. If there are no `TunnelRenderer` components currently mounted with the same tunnel ID, the children you pass
just won't render anywhere.

Any additional props you provide this component are used as flags for that tunnel. This means it's not possible to have
a flag named `id` or `children`.

## Props

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | `any` | Yes | An arbitrary identifier of the tunnel you wish to render into, or set the flags for. |
| children | `ReactNode` | No | The children nodes to render within any `TunnelRenderer`s with the same tunnel ID. |
| [...] | `any` | No | Any number of additional props - where the prop names and values are used as tunnel flags for a tunnel with the same tunnel ID. |

## Example

TODO

```js
const UsersPage = ({ users }) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  return (
    <div>
      <aside className="Sidebar">
        <ul>
          <li><a href="./create">Create new user</a></li>
          <TunnelRenderer id="sidebar-options" />
        </ul>
      </aside>
      <ul className="UserList">
        {users.map((user, index) => (
          <li key={user.id} onClick={() => selectedUserIndex(index)}>
            <strong>{user.name}</strong><br />
            <em>{user.email}</em>
          </li>
        ))}
      </ul>
      {selectedUserIndex && (
        <UserProfile user={users[selectedUserIndex]} />
      )}
    </div>
  );
};

const UserProfile = ({ user }) => (
  <>
    <div>
      <h2>{user.email}</h2>
    </div>
    <Tunnel id="sidebar-options">
      <li><a href="./edit">Edit user</a></li>
      <li><a href="./delete">Delete user</a></li>
    </Tunnel>
  </>
);
```
