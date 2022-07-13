# Metadata

Metadata are config files in order to be reused by different modules from one place. It provides the following information:

- List of columns:
  - Column datatype representation in json
  - Pydantic datatype to validate ingestion
  - Example of value for documentation
  - Faker data description to generate random data

## json_type

Available values: https://www.w3schools.com/js/js_json_datatypes.asp

## pydantic_type

Available values: https://pydantic-docs.helpmanual.io/usage/types/


## tenant

Defines a set of tenants with specific fields

## example

Available values: any yaml value

## faker

The yaml object containing type key and other depending on it's value. List of types:

### array
Creates list of elements. The number of generated elements is implied by **occurrence_min** and **occurrence_max**.
```
type: array
occurrence_min: 1
occurrence_max: 2
values:
  type: enum
  values:
  - 1
  - 2
  - 3
```
The element to generete is taken from "values" key. The element can be any faker supported type.

### object

Generates object in yaml data format.
```
type: object
values:
  activity_score:
    type: enum
    values:
    - ploom.it
  loyalty_points:
    type: enum
    values:
    - ploom.it
```
The object to generate should consists of key, value pairs, where a key is the name of field and value is a faker supported type.

### foreign

Inherits the values form another field entity.
```
type: foreign
dataset: ambassador_changelog_raw
field: change_id
```
Where **dataset** is an entity name and **field** is its column to get already generated values.

### sample

Reuses one of pre-generated datasets.
```
type: sample
sample: city
```
Where **sample** is one of: addresses, cities, emails, firstnames, lastnames, names, products, urls, words.

### zip

Generates values from 00001 to 99999.
```
type: zip
```

### code

Generates code of random latin chars + numbers.
```
type: code
upper: false
length: 16
```
Where **upper** is bool parameter for uppercase characters generation and **length** to specify its length.


### uuid

Generates uuid4 values.
```
type: uuid
```

### phone

Generates values "+" char + values from 1111111111111 to 9999999999999.
```
type: phone
```

### integer

Generates random integers.
```
type: integer
unique: false
to_str: false
```
Where **unique** is avoid dublicates and **to_str** to convert values to string.


### date

Generates date strings in
```
type: date
format: "%d-%b-%Y-%H:%M:%S"
min_year: 2018
max_year: 2022
```
Where **format** is a python [strftime string date format representation](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior), **min_year** and **max_year** is a limit range for generated dates.

### enum

Picks randomly values.
```
type: enum
values:
- Ploom
- 'No'
- bb
```
Where **values** is a list of possible values.


### ip

Generates values from 0.0.0.0 to 255.255.255.255.
```
type: ip
```


