import { fakerDefaultValue, typeRules } from "./rules.js";
import { v4 as uuidv4 } from "uuid";

export const getExample = (value) => {
  switch (value) {
    case "string":
      return "Some string";
    case "number":
      return "123";
    case "boolean":
      return false;
    case "array":
      return ["Some string"];
    case "object":
      return {
        id: 123,
      };
    default:
      return "";
  }
};

export const getNewRootField = (fieldName, fieldType) => {
  const newFaker = fakerDefaultValue[typeRules.faker[fieldType][0]];
  newFaker.rowId = uuidv4();

  return {
    rowId: uuidv4(),
    field_name: fieldName,
    json_type: fieldType,
    mandatory: false,
    td_type: typeRules.td_type[fieldType][0],
    pydantic_type: typeRules.pydantic_type[fieldType][0],
    example: getExample(fieldType),
    faker: { ...newFaker },
    description: "",
    pii: false,
    array: undefined,
    object: undefined,
    nested: fieldType === "array" || fieldType === "array" ? false : undefined,
  };
};
export const getNewNestedField = (fieldName, fieldType) => {
  const newFaker = fakerDefaultValue[typeRules.faker[fieldType][0]];
  newFaker.rowId = uuidv4();

  return {
    rowId: uuidv4(),
    field_name: fieldName,
    json_type: fieldType,
    mandatory: false,
    pydantic_type: typeRules.pydantic_type[fieldType][0],
    example: getExample(fieldType),
    faker: { ...newFaker },
    description: "",
    pii: false,
    array: undefined,
    object: undefined,
    nested: fieldType === "array" || fieldType === "array" ? false : undefined,
  };
};

export const prepareData = (object) => {
  const objectFields = Object.keys(object);

  const addHelperFields = (objectFields) => {
    if (
      objectFields.json_type === "array" &&
      // eslint-disable-next-line no-prototype-builtins
      objectFields.hasOwnProperty("array")
    ) {
      objectFields.nested = true;
      addHelperFields(objectFields.array);
    }

    if (
      objectFields.json_type === "array" &&
      // eslint-disable-next-line no-prototype-builtins
      !objectFields.hasOwnProperty("array")
    ) {
      objectFields.nested = false;
      objectFields.array = undefined;
      objectFields.object = undefined;

    }

    // eslint-disable-next-line no-prototype-builtins
    if (objectFields.hasOwnProperty("faker")) {
      // addHelperFields(objectFields.faker);
      objectFields.faker.rowId = uuidv4()
    }

    if (
      objectFields.json_type === "object" &&
      // eslint-disable-next-line no-prototype-builtins
      objectFields.hasOwnProperty("object")
    ) {
      objectFields.nested = true;
      objectFields.object = prepareData(objectFields.object);
    }

    if (
      objectFields.json_type === "object" &&
      // eslint-disable-next-line no-prototype-builtins
      !objectFields.hasOwnProperty("object")
    ) {
      objectFields.nested = false;
      objectFields.object = undefined;
      objectFields.array = undefined;


    }

    if (objectFields.json_type !== "object" 
        && objectFields.json_type !== "array") {
      objectFields.array = undefined;
      objectFields.object = undefined;
      objectFields.nested = undefined;
    }

    objectFields.rowId = uuidv4();

    return objectFields;
  };

  const newData = objectFields.map((field) => {
    return addHelperFields({ ...object[field], field_name: field });
  });

  console.log("newData = ", newData);
  return newData;
};
