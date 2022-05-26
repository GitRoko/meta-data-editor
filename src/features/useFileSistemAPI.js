export async function openFile(handle = false) {
  let fileHandle;
  let file;

  if (handle) {
    file = await handle.getFile();
  } else {
    [fileHandle] = await window.showOpenFilePicker();
    file = await fileHandle.getFile();
  }

  const contents = await file.text();

  return contents;
}

export async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

export async function readDirectory() {
  const dirHandle = await window.showDirectoryPicker();
  const promises = [];

  const getDirectoryData = async (data) => {
    const file = await data.getFile();
    let fileHandle = await dirHandle.getFileHandle(file.name);

    return {
      fileName: file.name,
      fileHandle,
    };
  };

  for await (const entry of dirHandle.values()) {
    const fileExtension = entry.name.split(".")[1];

    if (entry.kind !== "file") {
      break;
    }

    if (fileExtension === "yaml") {
      promises.push(getDirectoryData(entry, fileExtension));
    }
  }

  const dataDirectory = await Promise.all(promises);

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  return dataDirectory.sort(byField("fileName"));
}
// export async function readDirectory() {
//   const dirHandle = await window.showDirectoryPicker();
//   // console.log("dirHandle -", await dirHandle.getFileHandle());
//   const promises = [];

//   const getData = async (data, ext) => {
//     const file = await data.getFile();
//     const fileData = await file.text();
//     let fileHandle = await dirHandle.getFileHandle(file.name);

//     return {
//       fileName: file.name,
//       fileExtension: ext,
//       fileSize: file.size,
//       fileData,
//       fileHandle,
//     };
//   };
//   const getData = async (data, ext) => {
//     const file = await data.getFile();
//     const fileData = await file.text();
//     let fileHandle = await dirHandle.getFileHandle(file.name);

//     return {
//       fileName: file.name,
//       fileExtension: ext,
//       fileSize: file.size,
//       fileData,
//       fileHandle,
//     };
//   };

//   for await (const entry of dirHandle.values()) {
//     const fileExtension = entry.name.split(".")[1];
//     // console.log("getFileHandle -", await dirHandle.getFileHandle());

//     if (entry.kind !== "file") {
//       break;
//     }

//     if (fileExtension === "yaml") {
//       promises.push(getData(entry, fileExtension));
//     }
//   }

//   const dataDirectory = await Promise.all(promises);
//   console.log("dataDirectory - ", dataDirectory);

//   function byField(field) {
//     return (a, b) => (a[field] > b[field] ? 1 : -1);
//   }

//   return dataDirectory.sort(byField("fileName"));
// }
// export async function readDirectory() {
//   const dirHandle = await window.showDirectoryPicker();
//   for await (const entry of dirHandle.values()) {
//     console.log(entry.kind, entry.name);
//   }
// }
