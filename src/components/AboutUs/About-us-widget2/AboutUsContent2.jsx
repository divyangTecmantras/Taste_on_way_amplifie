import React from 'react';
import { FormattedMessage } from 'react-intl';
import ourcustomer from '../../../assets/images/ourcustomers.png';
import './style.css';

const AboutUsContent2 = () => {
    return (
        <>
            <div className="container-fluid HomeBackWhite">
                <div className="container">
                    <div className="row PaddingHome">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img
                                src={ourcustomer}
                                className="card-img-top ContentImgLeft img-fluid"
                                alt="become a dasher"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                            <h3 className="AboutTopMarg">
                                <FormattedMessage
                                    id="AboutUs_page.Our Customers"
                                    defaultMessage="Our Customers"
                                />
                            </h3>
                            <div className="ContentText">
                                <FormattedMessage
                                    id="AboutUs_page.Content2_text"
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
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsContent2;
