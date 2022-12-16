import React from 'react';
import { useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
// import rupee from '../../../assets/images/rupee.png';
import './RestaurantEnterAddress.css';
import '../../../assets/styles/media.css';

const RestaurantEnterAddress = () => {
    // const Address = intl.formatMessage({ id: 'Place_holder.Address', defaultMessage: 'Addresss' });
    const { kitchenOwnerDetails } = useSelector((state) => ({
        kitchenOwnerDetails: state?.kitchenOwnerDetails?.payload?.data?.[0],
    }));

    return (
        <div>
            <div className="row DeliciousDosaRow">
                <div className="DeliciousDosaFont">
                    {`${
                        kitchenOwnerDetails?.name == null
                            ? `Taste On Way - `
                            : `${kitchenOwnerDetails?.name} - `
                    }  ${kitchenOwnerDetails?.area ? `${kitchenOwnerDetails?.area}, ` : ''}${
                        kitchenOwnerDetails?.city ? `${kitchenOwnerDetails?.city}- ` : ''
                    }${
                        kitchenOwnerDetails?.rating == null
                            ? ``
                            : `${kitchenOwnerDetails?.rating}+ Ratings - `
                    }
                     ${
                         kitchenOwnerDetails?.distance
                             ? `${kitchenOwnerDetails?.distance.toFixed(2)} KM`
                             : ''
                     }`}
                </div>
            </div>

            <div className="row">
                {/* <div className="col-sm-6"> */}
                {/* <div className="row BlockRest">
                        <div className="col-sm-5 BoxRestaurent">
                            <h4>
                                <img src={rupee} alt="" className="RupeeImg" /> 0.00
                            </h4>
                            <div>
                                <FormattedMessage
                                    id="RestaurentDetails.delivery fee, first order"
                                    defaultMessage="delivery fee, first order"
                                />
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="vl" />
                        </div>
                        <div className="col-sm-5 BoxPaddingRest">
                            <h4>
                                <FormattedMessage
                                    id="RestaurentDetails.Enter Address"
                                    defaultMessage="Enter Address"
                                />
                            </h4>
                            <div>
                                <FormattedMessage
                                    id="RestaurentDetails.to see delivery time"
                                    defaultMessage="to see delivery time"
                                />
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* <div className="col-sm-6" /> */}
            </div>

            {/* <div className="row TopMargin">
                <div className="col-lg-12 AddressBackGrey">
                    <h4>
                        <FormattedMessage
                            id="RestaurentDetails.Enter Your Delivery Address"
                            defaultMessage="Enter Your Delivery Address"
                        />
                    </h4>
                    <div>
                        <FormattedMessage
                            id="RestaurentDetails.This will help us confirm the store availability and delivery fees"
                            defaultMessage="This will help us confirm the store availability and delivery fees"
                        />
                    </div>
                    <form className="mt-4">
                        <div className="form-row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control FormControlAddress"
                                    placeholder={Address}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}

            {/* <div className="row">
                <div className="mt-4 DeliciousDosaFont">
                    <FormattedMessage
                        id="RestaurentDetails.Local restaurants delivered in 45 minutes"
                        defaultMessage="Local restaurants delivered in 45 minutes"
                    />
                </div>
            </div> */}
        </div>
    );
};

export default injectIntl(RestaurantEnterAddress);
