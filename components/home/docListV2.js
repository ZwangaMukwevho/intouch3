import ReactPaginate from "react-paginate";
import { useState, useEffect, useRef, useContext } from "react";
import Storage from "../../logic/config/firebaseConfig.js";
import { ref, listAll, getMetadata } from "firebase/storage";
import classes from "./docsList.module.css";
import RowItemV2 from "../content/rowItemV2.js";
import { dbDocsContext } from "../../logic/context/dbDocs.js";

export default function DocsListV2() {
  const { dbDocs, setUpdateDocs } = useContext(dbDocsContext);

  const prevArrState = useRef([]);
  const [arr, setArr] = useState([]);

  const idArrState = useRef([]);

  var id = "";
  if (typeof window !== "undefined") {
    id = JSON.parse(localStorage.getItem("id"));
  }

  const listRef = ref(Storage, `drag/${id}`);
  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      getMetadata(itemRef).then((metadata) => {
        var fileMetadata = {
          id: metadata.generation,
          name: itemRef.name,
        };
        fileMetadata.dateCreated = metadata.timeCreated;
        fileMetadata.documentType = metadata["customMetadata"].documentType;
        fileMetadata.status = metadata["customMetadata"].status;
        fileMetadata.docRef = itemRef;

        if (!idArrState.current.includes(metadata.generation)) {
          prevArrState.current.push(fileMetadata);
          idArrState.current.push(metadata.generation);
          //
          // console.log("unique items length", idArrState.current.length);
          setArr([...arr, fileMetadata]);
          setUpdateDocs(prevArrState.current);
        }
      });
    });
  });

  useEffect(() => {}, [arr]);
  return dbDocs;
}
