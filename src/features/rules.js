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
    "string": [
      {
        "type": "sample",
        "items": [
          {
            "id": "sample",
            "name": "Dataset",
            "type": "dropdown",
            "values": [
              "addresses",
              "cities",
              "emails",
              "firstnames",
              "lastnames",
              "names",
              "products",
              "urls",
              "words"
            ]
          }
        ]
      },
      {
        "type": "zip"
      },
      {
        "type": "code",
        "items": [
          {
            "id": "upper",
            "name": "Upper-case",
            "type": "checkbox",
            "default": false
          },
          {
            "id": "length",
            "name": "Length",
            "type": "number",
            "default": 16
          }
        ]
      },
      {
        "type": "uuid"
      },
      {
        "type": "phone"
      },
      {
        "type": "integer",
        "items": [
          {
            "id": "unique",
            "name": "Unique value",
            "type": "checkbox",
            "default": false
          },
          {
            "id": "to_str",
            "default": true
          }
        ]
      },
      "date",
      {
        "type": "ip"
      },
      {
        "type": "enum",
        "items": [
          {
            "id": "values",
            "name": "Possible values",
            "type": "list"
          }
        ]
      },
      {
        "type": "foreign",
        "items": [
          {
            "id": "dataset",
            "name": "Table",
            "type": "dropdown",
            "values": "tables"
          },
          {
            "id": "field",
            "name": "Field",
            "type": "dropdown",
            "values": "fields"
          }
        ]
      }
    ],
    "number": [
      {
        "type": "integer",
        "items": [
          {
            "id": "unique",
            "name": "Unique value",
            "type": "checkbox",
            "default": false
          },
          {
            "id": "to_str",
            "default": false
          }
        ]
      },
      {
        "type": "enum",
        "items": [
          {
            "id": "values",
            "name": "Possible values",
            "type": "list"
          }
        ]
      }
    ],
    "array": [
      {
        "type": "array",
        "items": [
          {
            "id": "occurrence_min",
            "name": "Minimum items in list",
            "type": "number",
            "default": 1
          },
          {
            "id": "Maximum items in list",
            "name": "Length",
            "type": "number",
            "default": 2
          }
        ]
      },
      {
        "type": "enum",
        "items": [
          {
            "id": "values",
            "name": "Possible values",
            "type": "list"
          }
        ]
      }
    ],
    "boolean": [
      {
        "type": "enum",
        "items": [
          {
            "id": "values",
            "name": "Possible values",
            "type": "list"
          }
        ]
      }
    ],
    "object": [
      {
        "type": "object"
      },
      {
        "type": "enum",
        "items": [
          {
            "id": "values",
            "name": "Possible values",
            "type": "list"
          }
        ]
      }
    ]
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