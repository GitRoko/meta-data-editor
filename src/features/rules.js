export const typeRules = {
  "td_type": {
    "string": ["varchar"],
    "number": ["bigint","double"],
    "array": ["string","array(varchar)"],
    "boolean": ["varchar"],
    "object": ["varchar"]
  },
  "pydantic_type": {
    "string": ["StrictStr"],
    "number": ["StrictInt","StrictFloat"],
    "array": ["List"],
    "boolean": ["StrictBool"],
    "object": ["Dict"]
  }
};

export function getSelectItems(mainValue, nameValue) {
  switch (mainValue) {
    case "string":
      console.log(typeRules[nameValue][mainValue]);
      return typeRules[nameValue][mainValue];

    default:
      return;
  }
}