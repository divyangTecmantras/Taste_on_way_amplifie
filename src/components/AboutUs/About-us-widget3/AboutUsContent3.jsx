import React from 'react';
import { FormattedMessage } from 'react-intl';
import ourmerchants from '../../../assets/images/ourmerchants.png';
import './style.css';

const AboutUsContent3 = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row PaddingHome">
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                            <h3 className="AboutTopMarg">
                                <FormattedMessage
                                    id="AboutUs_page.Our Merchants"
                                    defaultMessage="Our Merchants"
                                />
                            </h3>
                            <div className="ContentText">
                                <FormattedMessage
                                    id="AboutUs_page.Content3_text"
                                    defaultMessage="
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book."
                                />
                            </div>
                            <button className="btn btn-danger mt-4 BtnViewMore">
                                <FormattedMessage
                                    id="AboutUs_page.Start an Order"
                                    defaultMessage="Start an Order"
                                />
                            </button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img
                                src={ourmerchants}
                                className="card-img-top ContentImg img-fluid"
                                alt="become a dasher"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsContent3;
