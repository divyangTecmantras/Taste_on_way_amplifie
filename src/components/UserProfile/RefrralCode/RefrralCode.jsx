import React from 'react';
import { useState } from 'react';
const RefrralCode = () => {
    const [code, setCode] = useState('copy');
    const handleShow = () => {
        setCode('copide');
    };
    return (
        <>
            <div className="sd ">
                <button className="btn btn-danger" onClick={handleShow}>
                    Generate Refferal code
                </button>
            </div>
            <h3>{code}</h3>
        </>
    );
};

export default RefrralCode;
