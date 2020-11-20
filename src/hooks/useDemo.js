const { useEffect } = require('react');

const useDemo = (name) => {
    const [result, setResult] = useEffect();
    useEffect(() => {
        setResult(`hello ${name}`);
    });
    return result;
};

export { useDemo };
