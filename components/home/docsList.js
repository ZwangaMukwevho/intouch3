import ReactPaginate from "react-paginate";
import { useState, useEffect, useRef, useContext } from "react";
import Storage from "../../logic/config/firebaseConfig.js";
import { ref, listAll, getMetadata } from "firebase/storage";
import classes from "./docsList.module.css";
import RowItemV2 from "../content/rowItemV2.js";
import { dbDocsContext } from "../../logic/context/dbDocs.js";

export default function DocsList() {
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

  console.log("db docs");
  console.log(dbDocs);
  useEffect(() => {}, [arr]);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayRows = dbDocs
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((doc, i) => {
      return (
        <RowItemV2
          key={i}
          title={doc.name}
          type={doc.documentType}
          date={doc.dateCreated}
          status={doc.status}
          docRef={doc.docRef}
          id={doc.id}
        ></RowItemV2>
      );
    });

  const docsCount = Math.ceil(prevArrState.current.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={classes.tableBackround}>
      <div className={classes.marginBottom}>{displayRows}</div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"Next"}
        pageCount={docsCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttns}
        previousLinkClassName={classes.previousBttn}
        nextLinkClassName={classes.nextBttn}
        disabledClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      ></ReactPaginate>
    </div>
  );
}
