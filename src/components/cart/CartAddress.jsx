import React from 'react';
import home from '../../assets/images/home.png';
import addNewAddress from '../../assets/images/addnewaddress.png';
import { FormattedMessage } from 'react-intl';

const CartAddress = () => {
    return (
        <div className="col-lg-8">
            <div className="row">
                <div className="DivDeliveryAddress">
                    <div className="DeliciousDosaFont">
                        <FormattedMessage
                            id="Cart_page.Choose a delivery address"
                            defaultMessage="Choose a delivery address"
                        />
                    </div>
                    <div className="TextColor">
                        <FormattedMessage
                            id="Cart_page.Multiple addresses in this location"
                            defaultMessage="Multiple addresses in this location"
                        />
                    </div>
                    <div className="row">
                        <div className="col DivBoxAddress">
                            <img src={home} alt="homeIcon" />
                            <span className="HomeAddress">
                                <FormattedMessage id="Cart_page.Home" defaultMessage="Home" />
                            </span>
                            <p className="TextAdd">
                                27th Cross Rd, Banashankari Stage II,Banashankari,Ahmedabad,560070
                                India.
                            </p>
                            <p>38 mins</p>
                            <button
                                type="button"
                                className="btn btn-danger BtnDeliverHere"
                                data-dismiss="modal"
                            >
                                <FormattedMessage
                                    id="Cart_page.Deliver Here"
                                    defaultMessage="Deliver Here"
                                />
                            </button>
                        </div>
                        <div className="col DivBoxAddress">
                            <img src={addNewAddress} alt="addNewAddress" />
                            <span className="HomeAddress">
                                <FormattedMessage
                                    id="Cart_page.Add New Address"
                                    defaultMessage="Add New Address"
                                />
                            </span>
                            <p className="TextAdd">
                                27th Cross Rd, Banashankari Stage II,Banashankari,Ahmedabad,560070
                                India.
                            </p>
                            <p></p>
                            <button
                                type="button"
                                className="btn btn-danger BtnAddnewAdd"
                                data-dismiss="modal"
                            >
                                <FormattedMessage id="Cart_page.Add New" defaultMessage="Add New" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartAddress;
