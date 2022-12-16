import React from 'react';
import { FormattedMessage } from 'react-intl';
import './HomeBanner.css';
import '../../../assets/styles/media.css';

const HomeBanner = () => {
    return (
        <div>
            <div className="LandingPageBg">
                <div className="container">
                    <div className="row">
                        <h1 className="CoverHead">
                            <FormattedMessage
                                id="Home_page.Home Banner"
                                defaultMessage="Homemade Food,<br/>Delivered To Your Door"
                                values={{ linebreak: <br /> }}
                            />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
