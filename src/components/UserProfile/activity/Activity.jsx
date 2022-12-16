import React from 'react';
import Review from '../review/Review';
import YourOrder from '../yourOrder/YourOrder';
import Address from '../address/Address';
import CustomerSupport from '../customerSupport/CustomerSupport';
import { FormattedMessage } from 'react-intl';
import './Activity.css';
const Activity = () => {
    return (
        <>
            <div className="row TopMarginProfile">
                <div className="col-lg-5">
                    <div
                        className="nav flex-column nav-pills ProfileVertTab"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                    >
                        <span className="ProfTabHead">
                            <FormattedMessage
                                id="UserProfile_page.ACTIVITY"
                                defaultMessage="ACTIVITY"
                            />
                        </span>
                        <button
                            className="btn nav-link ProfNavLink active"
                            id="v-pills-home-tab"
                            data-toggle="pill"
                            data-target="#v-pills-home"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-home"
                            aria-selected="false"
                        >
                            <FormattedMessage
                                id="UserProfile_page.Your Order"
                                defaultMessage="Your Order"
                            />
                        </button>
                        <button
                            className="btn nav-link ProfNavLink"
                            id="v-pills-profile-tab"
                            data-toggle="pill"
                            data-target="#v-pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                        >
                            <FormattedMessage
                                id="UserProfile_page.My Addresses"
                                defaultMessage="My Addresses"
                            />
                        </button>
                        <button
                            className="btn nav-link ProfNavLink"
                            id="v-pills-messages-tab"
                            data-toggle="pill"
                            data-target="#v-pills-messages"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-messages"
                            aria-selected="true"
                        >
                            <FormattedMessage
                                id="UserProfile_page.Customer Support"
                                defaultMessage="Customer Support"
                            />
                        </button>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Review />
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="tab-content" id="v-pills-tabContent">
                        <YourOrder />
                        <Address />
                        <CustomerSupport />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activity;
