import { useState } from "react";

let nextId = 0;
export const useUniqueKey = () => {
  const [id] = useState<number>(() => nextId++);
  return 'pageproof-react-tunnels-key-' + id;
};
