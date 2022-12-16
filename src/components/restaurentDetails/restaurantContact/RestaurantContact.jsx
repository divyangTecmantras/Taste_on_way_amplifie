import React from 'react';
import { FormattedMessage } from 'react-intl';
import orderOnline from '../../../assets/images/order-online.png';
import trackRealtime from '../../../assets/images/track-realtime.png';
import enjoyYourMeal from '../../../assets/images/enjoy-your-meal.png';
// import rupee from '../../../assets/images/rupee.png';
import '../../../assets/styles/media.css';
// import '../../../assets/styles/style.css';
import './RestaurantContact.css';
const RestaurantContact = () => {
    return (
        <div>
            <div className="row TopMargin mb-5">
                <div className="col-lg-4">
                    <div className="text-center">
                        <img src={orderOnline} alt="" className="RestDetailIcon" />
                        <div className="DetailTextIcon">
                            <FormattedMessage
                                id="RestaurentDetails.Order Online"
                                defaultMessage="Order Online"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="text-center">
                        <img src={trackRealtime} alt="" className="RestDetailIcon" />
                        <div className="DetailTextIcon">
                            <FormattedMessage
                                id="RestaurentDetails.Track Real Time"
                                defaultMessage="Track Real Time"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="text-center">
                        <img src={enjoyYourMeal} alt="" className="RestDetailIcon" />
                        <div className="DetailTextIcon">
                            <FormattedMessage
                                id="RestaurentDetails.Enjoy Your Meal"
                                defaultMessage="Enjoy Your Meal"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="row TopMargin">
                <div className="DeliciousDosaFont AddressBackRed">
                    Get 0 delivery fees on your first order (of{' '}
                    <img src={rupee} alt="" className="RupeeImg" />
                    15 or more)
                    <br />
                    from this store.
                </div>
            </div> */}
        </div>
    );
};

export default RestaurantContact;
