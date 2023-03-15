import { createContext } from "react";
import { useState } from "react";

export const consentContext = createContext(false);

export default function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(false);

  return (
    <consentContext.Provider value={{ consent, setConsent }}>
      {children}
    </consentContext.Provider>
  );
}
