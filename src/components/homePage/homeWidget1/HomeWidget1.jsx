import React from 'react';
import { FormattedMessage } from 'react-intl';
import dasher from '../../../assets/images/become a dasher.png';
import partner from '../../../assets/images/become a partner.png';
import app from '../../../assets/images/try an app.png';
import '../../../assets/styles/media.css';
import './HomeWidget1.css';

const HomeWidget1 = () => {
    return (
        <div>
            <div className="container">
                <div className="row TopMargin">
                    <div className="col-sm-12 col-md-4 col-md-4">
                        <div className="card BoxCard" style={{ width: '18rem' }}>
                            <img
                                src={dasher}
                                className="card-img-top BoxImg"
                                alt="become a dasher"
                            />
                            <div className="card-body BoxTextCenter">
                                <h5 className="card-title">
                                    <FormattedMessage
                                        id="Home_page.Become a Dasher"
                                        defaultMessage="Become a Dasher"
                                    />
                                </h5>
                                <p className="card-text">
                                    <FormattedMessage
                                        id="Home_page.HomeWidget1 Text"
                                        defaultMessage="abcd"
                                    />
                                </p>
                                <a href="/" className="BoxLink">
                                    <FormattedMessage
                                        id="Home_page.View More"
                                        defaultMessage="View More"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-md-4 TopBoxmargin">
                        <div className="card BoxCard" style={{ width: '18rem' }}>
                            <img
                                src={partner}
                                className="card-img-top BoxImg"
                                alt="become a dasher"
                            />
                            <div className="card-body BoxTextCenter">
                                <h5 className="card-title">
                                    <FormattedMessage
                                        id="Home_page.Become a Partner"
                                        defaultMessage="Become a Partner"
                                    />
                                </h5>
                                <p className="card-text">
                                    <FormattedMessage
                                        id="Home_page.HomeWidget1 Text"
                                        defaultMessage="abcd"
                                    />
                                </p>
                                <a href="/" className="BoxLink">
                                    <FormattedMessage
                                        id="Home_page.View More"
                                        defaultMessage="View More"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-4 col-md-4 TopBoxmargin">
                        <div className="card BoxCard" style={{ width: '18rem' }}>
                            <img src={app} className="card-img-top BoxImg" alt="become a dasher" />
                            <div className="card-body BoxTextCenter">
                                <h5 className="card-title">
                                    <FormattedMessage
                                        id="Home_page.Try an App"
                                        defaultMessage="Try an App"
                                    />
                                </h5>
                                <p className="card-text">
                                    <FormattedMessage
                                        id="Home_page.HomeWidget1 Text"
                                        defaultMessage="abcd"
                                    />
                                </p>
                                <a href="/" className="BoxLink">
                                    <FormattedMessage
                                        id="Home_page.View More"
                                        defaultMessage="View More"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeWidget1;
