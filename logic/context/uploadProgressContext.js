import { createContext } from "react";
import { useState, useContext } from "react";

export const DocUploadedContext = createContext(null);
export const IDuploadedContext = createContext(null);
export const DocsArrayContext = createContext(null);

export function UseDocUploaded() {
  return useContext(DocUploadedContext);
}

export function UseIDUploaded() {
  return useContext(IDuploadedContext);
}

export default function UploadProvider({ children }) {
  const [docStep, setDocStep] = useState(false);
  const [IDStep, setIDStep] = useState(false);
  const [value, setValue] = useState("test value");
  const [docsToUploadArr, setDocsToUploadArr] = useState([]);

  function setDocStepFunc(bool) {
    setDocStep(bool);
  }

  function setIDStepFunc(bool) {
    setIDStep(bool);
  }

  return (
    <IDuploadedContext.Provider value={{ value, setValue }}>
      <DocUploadedContext.Provider value={{ docStep, setDocStep }}>
        <DocsArrayContext.Provider
          value={{ docsToUploadArr, setDocsToUploadArr }}
        >
          {children}
        </DocsArrayContext.Provider>
      </DocUploadedContext.Provider>
    </IDuploadedContext.Provider>
  );
}
