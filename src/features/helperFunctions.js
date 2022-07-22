import { fakerDefaultValue, typeRules } from './rules.js';
import { v4 as uuidv4 } from "uuid";
// import { uuid } from 'uuidv4';

export const getExample = (value) => {
  switch (value) {
    case 'string':
      return 'Some string';
    case 'number':
      return '123';
    case 'boolean':
      return false;
    case 'array':
      return ['Some string'];
    case 'object':
      return {
        id: 123,
      };
    default: return "";
  }
}

export const getNewField = (fieldName, fieldType) => {
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
  };
}
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
  };
}