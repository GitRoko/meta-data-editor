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