import React, { useRef } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

const clearSelection = () => {
    if (window.getSelection) window.getSelection().removeAllRanges();
};

const RefrralCode = () => {
    const [showCode, setShowCode] = useState(false);
    const [copyText, setCopyText] = useState('COPY');
    const codeRef = useRef();
    const handleClick = () => {
        if (codeRef.current) {
            codeRef.current.select();

            try {
                const copySuccess = document.execCommand('copy');
                setCopyText(copySuccess ? 'copied' : 'unable to copy');
            } catch (error) {
                console.log(error);
            }
            clearSelection();
        }
    };

    return (
        <>
            <div className="col-lg-12 d-flex justify-content-end">
                <Button onClick={() => setShowCode(true)}>Generate Your Referral Code</Button>
            </div>
            {showCode ? (
                <div className="text-box col-lg-11 d-flex justify-content-end mt-3">
                    <input type="text" value="keyur" ref={codeRef} />
                    <div className="copy-btn">
                        <button onClick={handleClick}>{copyText}</button>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default RefrralCode;
