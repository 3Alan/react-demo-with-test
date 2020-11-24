const { useEffect, useState } = require('react');

const useComputed = (name) => {
  const [value, setValue] = useState();
  const changeValue = () => {
    setValue('use changeValue');
  };
  useEffect(() => {
    setValue(`Hello ${name}`);
  }, [name]);
  return { value, changeValue };
};

export { useComputed };
