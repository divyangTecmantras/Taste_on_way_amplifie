import React from 'react';
import { FormattedMessage } from 'react-intl';
import './style.css';

const AboutUsContent4 = () => {
    return (
        <>
            <div className="container-fluid HomeBackRed">
                <div className="container">
                    <div className="row PaddingHomeAbout">
                        <div className="col-sm-12 col-md-12 col-lg-12 mt-3 text-center">
                            <h3 className="LocalEconomies">
                                <FormattedMessage
                                    id="AboutUs_page.Empowering local Economies"
                                    defaultMessage="Empowering local Economies"
                                />
                            </h3>
                            <div className="ContentText">
                                <FormattedMessage
                                    id="AboutUs_page.Content4_text"
                                    defaultMessage="
                                Empowering local economies means ensuring that people have equal
                                access to opportunity to reach their full potential. Learn how we
                                create positive impact for our communities, from business owners, to
                                Dashers, to our nonprofit partners."
                                />
                            </div>
                            <button className="btn btn-danger mt-4 BtnViewMore">
                                <FormattedMessage
                                    id="AboutUs_page.Start an Order"
                                    defaultMessage="Start an Order"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsContent4;
