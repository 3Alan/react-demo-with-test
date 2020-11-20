import React, { useState } from 'react';

export default function Header(props) {
    const [content, setContent] = useState('');
    const handleKeyUp = (e) => {
      if (e.keyCode === 13 && content) {
        props.addItem(content);
        setContent('');
      } 
    }
    return (
        <div>
            <input
                data-test="input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyUp={(e) => handleKeyUp(e)}
                placeholder="test ui"
                autoFocus
            ></input>
        </div>
    );
}
