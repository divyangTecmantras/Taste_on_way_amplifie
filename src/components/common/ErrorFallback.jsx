import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/style.css';
const ErrorFallback = ({ error }) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre className="errorFallBack_cls">{error.message}</pre>
        </div>
    );
};
ErrorFallback.propTypes = {
    error: PropTypes.node.isRequired,
};
export default ErrorFallback;
