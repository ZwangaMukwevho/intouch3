import ReactPaginate from "react-paginate";
import { useState, useEffect, useContext } from "react";
import Storage from "../../logic/config/firebaseConfig.js";
import { ref, listAll, getMetadata } from "firebase/storage";
import classes from "./docsList.module.css";
import RowItemV2 from "../content/rowItemV2.js";
import { dbDocsContext } from "../../logic/context/dbDocs.js";
import Loader from "../../components/upload/loader.js";

export default function DocsList() {
  const { dbDocs, setUpdateDocs } = useContext(dbDocsContext);
  var tempArr = [];
  const [loading, setloading] = useState(true);

  var id = "";
  if (typeof window !== "undefined") {
    id = JSON.parse(localStorage.getItem("id"));
  }

  useEffect(() => {
    async function getMetadataForFiles() {
      try {
        const listRef = ref(Storage, `drag/${id}`);
        const res = await listAll(listRef);

        var length = res.items.length;
        var itemRef;
        var fileMetadata;

        for (let i = 0; i < length; i++) {
          itemRef = res.items[i];

          let metadata = await getMetadata(itemRef);
          fileMetadata = {
            id: metadata.generation,
            name: itemRef.name,
          };
          fileMetadata.dateCreated = metadata.timeCreated;
          fileMetadata.documentType = metadata["customMetadata"].documentType;
          fileMetadata.status = metadata["customMetadata"].status;
          fileMetadata.docRef = itemRef;
          tempArr.push(fileMetadata);
        }

        let uniqueDocs = tempArr.filter((doc, index, arr) => {
          return arr.findIndex((p) => p.id === doc.id) === index;
        });
        localStorage.setItem("_files", JSON.stringify(uniqueDocs.length));
        setUpdateDocs(uniqueDocs);
        setloading(false);
      } catch (err) {
        console.error("Error getting metadata for files:");
      }
    }
    getMetadataForFiles();
  }, []);

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

  const docsCount = Math.ceil(dbDocs.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return loading ? (
    <Loader bool={loading} />
  ) : (
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
