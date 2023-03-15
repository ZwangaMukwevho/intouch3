import { createContext } from "react";
import { useState } from "react";

export const dbDocsContext = createContext([]);

export default function DbDocsProvider({ children }) {
  const [dbDocs, setUpdateDocs] = useState([]);

  return (
    <dbDocsContext.Provider value={{ dbDocs, setUpdateDocs }}>
      {children}
    </dbDocsContext.Provider>
  );
}
