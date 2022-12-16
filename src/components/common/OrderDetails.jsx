import React from 'react';
import { FormattedMessage } from 'react-intl';
import rupee from '../../assets/images/rupeeiconblack.png';
import star from '../../assets/images/star.png';
import '../../assets/styles/style.css';
import '../../assets/styles/media.css';

const OrderDetails = (e) => {
    const data = e.data;
    return (
        <>
            <div
                className="BadgeMainDiv mt-3"
                data-toggle="modal"
                data-target={`#exampleModalorder${data.id}`}
            >
                <button className="btn BtnViewMoreProfile">
                    <FormattedMessage
                        id="UserProfile_page.View Details"
                        defaultMessage="View Details"
                    />
                </button>
            </div>
            <div
                className="modal fade"
                id={`exampleModalorder${data.id}`}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">
                                <FormattedMessage
                                    id="UserProfile_page.Order Summary"
                                    defaultMessage="Order Summary"
                                />
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="">
                                        <span className="OrderItems">
                                            <FormattedMessage
                                                id="UserProfile_page.Your Orders"
                                                defaultMessage="Your Orders"
                                            />
                                        </span>
                                        <span className="DeliveryStatus">{data.order_status}</span>
                                        <hr />
                                    </div>
                                    <div className="">
                                        {data.order_detail.map((orderData, index) => {
                                            return (
                                                <div key={index}>
                                                    {orderData.menu_items.map((e) => {
                                                        return (
                                                            <div className="OrderItems" key={e.id}>
                                                                {e.name}
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="ItemQuantity">
                                                        <label htmlFor="items">
                                                            {orderData.quantity}
                                                        </label>
                                                        x
                                                        <img
                                                            src={rupee}
                                                            className="ordersummaryrupee"
                                                            alt="rupee"
                                                        />
                                                        {orderData.item_price}
                                                        <span className="floatRightButton">
                                                            <img
                                                                src={rupee}
                                                                className="ordersummaryrupee"
                                                                alt="rupee"
                                                            />
                                                            {orderData.item_total}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <hr />
                                    </div>
                                    <div className="">
                                        <div className="OrderItems">
                                            <FormattedMessage
                                                id="UserProfile_page.Item Total"
                                                defaultMessage="Item Total"
                                            />
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Taxes & Charges"
                                                    defaultMessage="Taxes & Charges"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                <img
                                                    src={rupee}
                                                    className="ordersummaryrupee"
                                                    alt="rupee"
                                                />
                                                {data.tax_amount}
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Dilevery Charges"
                                                    defaultMessage="Dilevery Charges"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                <img
                                                    src={rupee}
                                                    className="ordersummaryrupee"
                                                    alt="rupee"
                                                />
                                                {data.delivery_charge == null
                                                    ? '0.00'
                                                    : data.delivery_charge}
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            {data.coupon_amount ? (
                                                <>
                                                    <span>
                                                        <FormattedMessage
                                                            id="UserProfile_page.Promo Code"
                                                            defaultMessage="Promo Code"
                                                        />
                                                    </span>
                                                    <span className="floatRightButton">
                                                        <img
                                                            src={rupee}
                                                            className="ordersummaryrupee"
                                                            alt="rupee"
                                                        />
                                                        {data.coupon_amount}
                                                    </span>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="">
                                        <div className="OrderItems">
                                            <FormattedMessage
                                                id="UserProfile_page.Total"
                                                defaultMessage="Total"
                                            />
                                        </div>

                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Grand Total"
                                                    defaultMessage="Grand Total"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                <img
                                                    src={rupee}
                                                    className="ordersummaryrupee"
                                                    alt="rupee"
                                                />
                                                {data.order_final_total}
                                            </span>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="">
                                        <div className="OrderItems">
                                            <FormattedMessage
                                                id="UserProfile_page.Order Detail"
                                                defaultMessage="Order Detail"
                                            />
                                        </div>

                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Order Number"
                                                    defaultMessage="Order Number"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                {data.order_no}
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Payment type"
                                                    defaultMessage="Payment type"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                <FormattedMessage
                                                    id="UserProfile_page.Paid using Bank"
                                                    defaultMessage="Paid using Bank"
                                                />
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Date"
                                                    defaultMessage="Date"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                {data.date_for_incoming_order} at{' '}
                                                {data.time_for_incoming_order}
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Phone Number"
                                                    defaultMessage="Phone Number"
                                                />
                                            </span>
                                            <span className="floatRightButton">
                                                +91-
                                                {data.user.mobile_number}
                                            </span>
                                        </div>
                                        <div className="ItemQuantity">
                                            <span>
                                                <FormattedMessage
                                                    id="UserProfile_page.Picked Up From"
                                                    defaultMessage="Picked Up From"
                                                />
                                            </span>
                                            <span className="floatRightButton FloatRightAddress">
                                                {data?.business_owner_address?.address}
                                            </span>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="">
                                        <div className="OrderItems">
                                            <FormattedMessage
                                                id="UserProfile_page.You Rated"
                                                defaultMessage="You Rated"
                                            />

                                            <span className="badge badge-success">
                                                5
                                                <img src={star} className="starimg" alt="star" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
