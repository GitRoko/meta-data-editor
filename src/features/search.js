
// eslint-disable-next-line no-unused-vars
export const getContainingObject = (list, path) => {
  let itemPathArray = path.split(":");
  if (itemPathArray.length === 1) {
    return null;
  }

  itemPathArray = itemPathArray.slice(0, -1);
  let currentObject = null;
  for (let i = 0; i < itemPathArray.length; i++) {
    const id = itemPathArray[i];

    if (currentObject?.json_type === 'array') {
      currentObject = currentObject.array;
    }

    if (currentObject?.json_type === 'object') {
      currentObject = currentObject.object.find(item => item.rowId === id);
    }

    if (!currentObject) {
      currentObject = list.find(item => item.rowId === id);
    }
  }
  return currentObject;
};

// eslint-disable-next-line no-unused-vars
 export const findObject = (list, path) => {
  let parent = getContainingObject(list, path);
  if (parent?.json_type === 'array') {
    return parent.array;
  }

  let id = path.split(':')[-1] || path;
  if (parent?.object === 'object') {
    return parent.object.find(item => item.rowId === id);
  }

  if (parent === null) {
    return list.find(item => item.rowId === id);
  }
};
