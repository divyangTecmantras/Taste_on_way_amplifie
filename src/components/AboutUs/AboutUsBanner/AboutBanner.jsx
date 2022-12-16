import React from 'react';
import { FormattedMessage } from 'react-intl';
import './style.css';

const AboutBanner = () => {
    return (
        <>
            <div className="LandingPageBgAbout">
                <div className="container">
                    <div className="row">
                        <div className="CoverHeadAbout">
                            <h1>
                                <FormattedMessage
                                    id="AboutUs_page.About Us"
                                    defaultMessage="About Us"
                                />
                            </h1>
                            <span>
                                <FormattedMessage
                                    id="AboutUs_page.Banner_text"
                                    defaultMessage="
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem
                                <br />
                                Ipsum has been the industry's standard dummy text ever since
                                the 1500s"
                                    values={{ br: <br /> }}
                                />
                            </span>
                            <div className="mt-3">
                                <button type="button" className="btn btnExplore">
                                    <FormattedMessage
                                        id="AboutUs_page.Explore"
                                        defaultMessage="Explore"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutBanner;
