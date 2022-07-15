import getExample from './helperFunctions.js'
import {fakerDefaultValue, typeRules} from './rules.js'
import { v4 as uuidv4 } from "uuid";

export default class Field {
  constructor( args ) {
    this.field_name = args.field_name;
    this.json_type = args.json_type;
    this.td_type = args.td_type;
    this.mandatory = args.mandatory;
    this.pydantic_type = args.pydantic_type;
    this.example = args.example;
    this.faker = args.faker;
    this.nested = args.nested;
    this.array = args.array;
    this.object = args.object;
    this.rowId = args.rowId;
  }

  // json_type
  get json_type() {
    return this._json_type;
  }
  set json_type(value) {

    if (value !== this.json_type) {

      //change td_type if json_type changed 
      if (this.td_type !== undefined) {
        this.td_type = typeRules.td_type[value].length === 1 
        ? typeRules.td_type[value][0] 
          : "";
      }

      //change pydantic_type if json_type changed 
      this.pydantic_type = typeRules.pydantic_type[value].length === 1 
        ? typeRules.pydantic_type[value][0] 
          : "";

      //change faker if json_type changed 
      this.faker = fakerDefaultValue[typeRules.faker[value][0]];

      //change example if json_type changed 
      if (this.example !== undefined) {
        this.example = getExample(value);
      }

      //change nested if json_type changed 
      if (value === 'array' && this.nested === undefined 
          || value === 'object' && this.nested === undefined
        ) {
          this.nested = false;
      }

      this._json_type = value;
    }
   
    console.log('json_type changed')
  }

  // nested
  get nested() {
    return this._nested;
  }
  set nested(value) {
    if (value === true && this.json_type === 'array') {

      // create new field type 'array'
      this.array = new Field ({
        json_type: 'string',
        mandatory: false,
        pydantic_type: 'StrictStr',
        example:  'someText',
        rowId: uuidv4(),
        faker: { type: "sample"},
        nested: undefined,
        td_type: undefined,
        object: undefined,
      });

      // clearing data from item
      this.td_type = undefined;
      this.example = undefined;
      this.object = undefined;
    }

    if (value === false && this.json_type === 'array') {

      this.array = undefined;
      this.example = getExample('array');
      this.td_type = typeRules.td_type[this.json_type].length === 1 
        ? typeRules.td_type[this.json_type][0] 
          : "";
    }

    if (value === true && this.json_type === 'object') {
      // create new field type 'object'
      this.object = [new Field ({
        json_type: 'string',
        mandatory: false,
        pydantic_type: 'StrictStr',
        example:  'someText',
        rowId: uuidv4(),
        faker: { type: "sample"},
        nested: undefined,
        td_type: undefined,
        object: undefined,
      })];

      // clearing data from item
      this.td_type = undefined;
      this.example = undefined;
      this.array = undefined;
    }

    if (value === false && this.json_type === 'object') {

      this.object = undefined;
      this.example = getExample('object');
      this.td_type = typeRules.td_type[this.json_type].length === 1 
        ? typeRules.td_type[this.json_type][0] 
          : "";
    }
        
    this._nested = value;
  }

  returnItem() {
    return {
      field_name: this.field_name,
      json_type: this.json_type,
      td_type: this.td_type,
      mandatory: this.mandatory,
      pydantic_type: this.pydantic_type,
      example: this.example,
      faker: this.faker,
      array: this.array,
      object: this.object,
      nested: this.nested,
      rowId: this.rowId,
    }
  }
}