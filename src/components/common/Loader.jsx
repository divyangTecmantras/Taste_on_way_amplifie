import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const Loader = (loading) => {
    return (
        <div className="modal-content d-flex justify-content-center align-items-center  p-5 ">
            <PulseLoader size={30} color={'#E70F0F'} loading={loading} />
        </div>
    );
};

export default Loader;
