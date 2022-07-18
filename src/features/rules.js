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
  },
  "faker": {
    "string": ["sample", "zip", "code", "enum", "uuid", "phone", "integer", "foreign", "ip", "date"],
    "number": ["integer","enum"],
    "array": ["array","enum"],
    "boolean": ["enum"],
    "object": ["object", "enum"],
    "sample": ["addresses", "cities", "emails", "firstnames", "lastnames", "names", "products", "urls", "words"],
  },
};

// export function getSelectItems(mainValue, nameValue) {
//   switch (mainValue) {
//     case "string":
//       console.log(typeRules[nameValue][mainValue]);
//       return typeRules[nameValue][mainValue];

//     default:
//       return;
//   }
// }

export const fakerDefaultValue = {
  "array": {
    type: 'array',
    occurrence_min: 0,
    occurrence_max: 1,
  },
  "code": {
    type: 'code',
    upper: false,
    length: 16,
  },
  "uuid": {
    type: 'uuid',
  },
  "zip": {
    type: 'zip',
  },
  "phone": {
    type: 'phone',
  },
  "ip": {
    type: 'ip',
  },
  "enum": {
    type: 'enum',
    values: []
  },
  "sample": {
    type: 'sample',
    sample: '',
  },
  "integer": {
    type: 'integer',
    unique: false,
    to_str: false,
  },
  "object": {
    type: 'object',
  },
  "foreign": {
    type: 'foreign',
    dataset: '',
    field: '',
  },
  "date": {
    type: 'date',
    format: "%Y-%m-%d",
    min_year: 2018,
    max_year: 2022,
  },
};

