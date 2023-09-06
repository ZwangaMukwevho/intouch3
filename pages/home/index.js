import classes from "./home.module.css";
import Example from "../../components/content/example.js";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/layout";
import UploadDoc from "../../components/content/uploadDoc.js";
import { useState } from "react";
import TableHeader from "../../components/content/tableHeader";
import { DocTypeContext } from "../../logic/context/docTypeContext";
import DocsList from "../../components/home/docsList";
import DbDocsProvider from "../../logic/context/dbDocs";
import ConsentProvider from "../../logic/context/consentContext";
import Checkbox from "../../components/home/checkbox";
import Base from "@layouts/Baseof";
import config from "@config/config.json";

export default function SideBarTest(props) {
  const x = 1;
  // Styling for dropdown
  useEffect(() => {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href =
      "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    styleLink.onLoad = () => {};
  }, [x]);

  // Document stuff
  const [docTypeVal, setDocType] = useState("None");
  const { title } = config.site;

  return (
    <Base title={title}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div className={classes.mainDiv}>
          <Layout>
            <p className={classes.title}>Document overview</p>
            <p className={classes.subtitle}>
              Before you get started please make sure to read the following
              instructions to get your documents certified
            </p>
            <ul>
              <div className={classes.list}>
                <div className={classes.circle}> 1 </div>
                <p className={classes.marginLeft}>
                  Upload the scanned document that needs to be certified
                </p>
              </div>
              <div className={classes.list}>
                <div className={classes.circle}> 2 </div>
                <p className={classes.marginLeft}>
                  Close up picture of person whose document needs to certified
                  holding up their ID
                </p>
              </div>
            </ul>
            <div className={classes.infoPar}>
              <p>
                Forgery of any document is punishable by law as per Section 9 of
                the Justicies of the Peace and Commissioners of Oath Amendment
                Act of 1963 which states: ‘Any person who, in an affidavit,
                affirmation or solemn or attested declaration made before a
                person competent to adm”n” ster an oath or affirmation or take
                the declaration in question, has made a false statement knowing
                it to be false, shall be guilty of an offence and liable upon
                conviction to the penalties prescribed by law for the offence of
                perjury.”
              </p>
            </div>
            <ConsentProvider>
              <Checkbox />

              <DocTypeContext.Provider value={{ docTypeVal, setDocType }}>
                <div className={classes.docDiv}>
                  <Example />
                </div>

                <UploadDoc docType={docTypeVal} />
              </DocTypeContext.Provider>
            </ConsentProvider>
            <div></div>
            <TableHeader />
            <DbDocsProvider>
              <DocsList />
            </DbDocsProvider>
          </Layout>
        </div>
      </div>
    </Base>
  );
}

// export async function getServerSideProps(context) {
//   const auth = getAuth()
//     .getUser(uid)
//     .then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//     })
//     .catch((error) => {
//       console.log("Error fetching user data:", error);
//     });

//   if (true) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { authUser },
//   };
// }
