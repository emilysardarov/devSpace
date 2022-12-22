import React, { useRef, useEffect } from 'react';

const CodeSnippet = ({ value, onChange }) => {
  const el = useRef();

  useEffect(() => {
    const editor = CodeMirror(el.current, {
      value,
      mode: { name: 'javascript', json: true },
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      styleActiveLine: true,
      autoCloseBrackets: true,
      theme: 'material-darker',
      smartIndent: true,
      indentWithTabs: true,
      refresh: true,
      dragDrop: true,
    });
    editor.on('change', () => {
      onChange(editor.getValue());
    });
  }, [el]);

  return <div ref={el}></div>;
};

export default CodeSnippet;
