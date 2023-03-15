export function createMetadata(name, type, createdOn, status) {
  const metadata = {
    customMetadata: {
      documentName: name,
      documentType: type,
      dateCreated: createdOn,
      status: status,
    },
  };
  return metadata;
}
