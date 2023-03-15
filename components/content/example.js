import _ from "lodash";
import React from "react";
import { Dropdown } from "semantic-ui-react";
import { DocTypeContext } from "../../logic/context/docTypeContext";
import { useContext } from "react";

function dropDown(props) {
  const docOptions = [
    { key: "type unselected", text: "type unselected", value: "angular" },
    { key: "ID", text: "Identity Document", value: "angular" },
    { key: "marriageCert", text: "Marriage Certificate", value: "css" },
    { key: "affidavit", text: "Affidavit", value: "design" },
    {
      key: "universityCertificate",
      text: "University Certificate",
      value: "ember",
    },
    { key: "passport", text: "Passport", value: "html" },
    { key: "transferCertificate", text: "Transfer Certificate", value: "ia" },
    {
      key: "tradeCertificate",
      text: "Trade Certificates",
      value: "javascript",
    },
    { key: "divorceCertificate", text: "Divorce Certficates", value: "mech" },
    { key: "deathCertificate", text: "Death certificate", value: "meteor" },
    { key: "birthCertificate", text: "Birth Certificate", value: "node" },
    {
      key: "exportDocumentation",
      text: "Export Documentation",
      value: "plumbing",
    },
  ];

  const dataprovider = docOptions.map((object) => {
    return { key: object.key, value: object, text: object.text };
  });

  const { docTypeVal, setDocType } = useContext(DocTypeContext);
  const changeHandler = (event, { value }) => {
    setDocType(value.text);
  };

  return (
    <div>
      <Dropdown
        placeholder="Select Document"
        search
        selection
        options={dataprovider}
        onChange={changeHandler}
      />
    </div>
  );
}

export default dropDown;
