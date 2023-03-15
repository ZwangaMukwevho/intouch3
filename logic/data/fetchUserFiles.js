import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import Storage from "../../logic/config/firebaseConfig.js";
import React, { useEffect, useState } from "react";

// const listRef = ref(Storage, "drag/");

// async function getDownloadLink(fileRef) {
//   getDownloadURL(fileRef)
//     .then((url) => {
//       return url;
//     })
//     .catch((error) => {
//       return error;
//     });
// }

// listAll(listRef).then((res) => {
//   res.items.forEach((itemRef) => {
//     getMetadata(itemRef).then((metadata) => {
//       var fileMetadata = {
//         id: itemRef.generation,
//         name: itemRef.name,
//       };
//       (fileMetadata.id = itemRef.fullPath),
//         (fileMetadata.name = itemRef.name),
//         (fileMetadata.dateCreated = metadata.timeCreated),
//         (fileMetadata.documentType = metadata["customMetadata"].documentType),
//         (fileMetadata.status = metadata["customMetadata"].status);
//       filesMetadata.push(fileMetadata);
//     });
//   });
// });

async function getFiles() {
  const listRef = ref(Storage, "drag/");
  const res = await listAll(listRef);
  const meta = await getFilesMetadata(res);
  return meta;
}

async function getFilesMetadata(res) {
  var metadataList = [];
  const items = res.items;

  for (const item of items) {
    var metadata = await getMetadata(item);
    metadataList.push(metadata);
  }

  // res.items.forEach(async (itemRef) => {
  //   var metadata = await getMetadata(itemRef);
  //   var fileMetadata = {};
  //   (fileMetadata.id = itemRef.fullPath),
  //     (fileMetadata.name = itemRef.name),
  //     (fileMetadata.dateCreated = metadata.timeCreated),
  //     (fileMetadata.documentType = metadata["customMetadata"].documentType),
  //     (fileMetadata.status = metadata["customMetadata"].status);
  //   metadataList.push(fileMetadata);
  // });
  return metadataList;
}

// console.log(filesMetadata);
export default getFiles;
