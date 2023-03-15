import { slide as Menu } from "react-burger-menu";
import SideBar from "../../components/main/sideBar";
import Header from "../../components/main/header";
import ReactPaginate from "react-paginate";
import RowItem from "../../components/content/rowItem.js";
import { useState, useEffect, useRef } from "react";
import Storage from "../../logic/config/firebaseConfig.js";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { formatDate, getStatus } from "../../logic/data/format";
import classes from "./index.module.css";

export default function App() {
  const prevArrState = useRef([]);
  const prevArrLength = useRef(-1);
  const [arr, setArr] = useState([]);

  const idArrState = useRef([]);

  const listRef = ref(Storage, "drag/");
  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      getMetadata(itemRef).then((metadata) => {
        var fileMetadata = {
          id: metadata.generation,
          name: itemRef.name,
        };
        (fileMetadata.dateCreated = metadata.timeCreated),
          (fileMetadata.documentType = metadata["customMetadata"].documentType),
          (fileMetadata.status = metadata["customMetadata"].status);

        if (!idArrState.current.includes(metadata.generation)) {
          idArrState.current.push(metadata.generation);
          prevArrState.current.push(fileMetadata);
          // console.log("unique items length", idArrState.current.length);
          setArr([...arr, fileMetadata]);
        }
      });
    });
  });

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayRows = prevArrState.current
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((doc, i) => {
      return (
        <RowItem
          key={i}
          title={doc.name}
          type={doc.documentType}
          date={formatDate(doc.dateCreated)}
          status={getStatus(doc.status)}
          changeHan
          download={"doc.download"}
        />
      );
    });

  const docsCount = Math.ceil(prevArrState.current.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {/* <Header /> */}
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
