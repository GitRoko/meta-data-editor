export async function readFile(handle = false) {

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
      dirHandle,
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

