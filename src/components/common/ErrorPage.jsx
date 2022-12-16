import React from 'react';
import { FormattedMessage } from 'react-intl';

const ErrorPage = () => {
    return (
        <div>
            <FormattedMessage
                id="common_page.Error Page NOT found!!"
                defaultMessage="Error Page NOT found!!"
            />
        </div>
    );
};

export default ErrorPage;
