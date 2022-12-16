import React from 'react';
import { FormattedMessage } from 'react-intl';
import saladBowl from '../../../assets/images/saladbowl.png';
import '../../../assets/styles/media.css';
import './LandingWidget1.css';

const LandingWidget1 = () => {
    return (
        <div className="row PaddingHome TopMargin TopMarginResp">
            <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                <h3 className="AboutTopMarg">
                    <FormattedMessage
                        id="Landing_page.Simple Way of Eating Delicious"
                        defaultMessage="Simple Way of Eating <br /> Delicious"
                        values={{ br: <br /> }}
                    />
                </h3>
                <div className="ContentText">
                    <FormattedMessage
                        id="Landing_page.LandingWidget1 Text"
                        defaultMessage="
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry &apos s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book."
                    />
                </div>
                <button className="btn btn-danger mt-4 BtnViewMore">
                    <FormattedMessage
                        id="Landing_page.Start an Order"
                        defaultMessage="Start an Order"
                    />
                </button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
                <img
                    src={saladBowl}
                    className="card-img-top ContentImgRest img-fluid"
                    alt="saladbowl"
                />
            </div>
        </div>
    );
};

export default LandingWidget1;
