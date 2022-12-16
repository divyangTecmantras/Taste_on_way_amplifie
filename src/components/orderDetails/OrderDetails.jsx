import React, { useState, useEffect } from 'react';
import { fetchCancelOrder } from '../../redux/actions/order/cancelOrder';
import { FormattedMessage } from 'react-intl';
import { getItem } from '../../utils/utils';
import { fetchCreateOrderDetails } from '../../redux/actions/order/orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import rupee from '../../assets/images/rupee.png';
import '../../assets/styles/media.css';
import './OrderDetails.css';
import { createOrderClean } from '../../redux/actions/order/createOrder';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const [cancel, setCancel] = useState(false);
    const { orderDetails, cancelOrderResponse } = useSelector((state) => ({
        orderDetails: state?.orderDetails?.payload?.data,
        cancelOrderResponse: state?.cancelOrder?.payload?.data,
    }));
    console.log(
        '🚀 ~ file: OrderDetails.jsx:20 ~ const{orderDetails,cancelOrderResponse}=useSelector ~ orderDetails',
        orderDetails,
    );

    const date = orderDetails?.date_for_incoming_order;

    useEffect(() => {
        const newDate = new Date();
        const currentTime = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        const orderTime = JSON.parse(getItem('orderTime'));
        if (orderTime > currentTime) {
            setCancel(true);
        }

        const orderId = getItem('orderID');
        const apiData = {
            order_id: orderId,
        };

        dispatch(fetchCreateOrderDetails(apiData));
        if (cancelOrderResponse) {
            setCancel(true);
        }
        return () => {
            dispatch(createOrderClean());
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelOrderResponse]);

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setCancel(true);
        }

        return (
            <div className="timer">
                <div className="value">{remainingTime}</div>
                <div className="text">
                    <FormattedMessage id="Order_details.seconds" defaultMessage="seconds" />
                </div>
                <button
                    className="bg-transparent border-0 text-danger"
                    onClick={() => cancelOrder()}
                >
                    <FormattedMessage id="Order_details.CancelOrder" defaultMessage="CancelOrder" />
                </button>
            </div>
        );
    };

    const cancelOrder = () => {
        const orderId = getItem('orderID');
        const apiData = {
            order_id: orderId,
            order_status: '6',
        };
        dispatch(fetchCancelOrder(apiData));
    };
    return (
        <div>
            {!cancel ? (
                <>
                    <div className="d-flex justify-content-center flex-column">
                        <div
                            className=" d-flex justify-content-center direction-row"
                            style={{ marginTop: '25vh', marginBottom: '25vh' }}
                        >
                            <CountdownCircleTimer
                                isPlaying
                                duration={60}
                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[45, 30, 15, 0]}
                            >
                                {renderTime}
                            </CountdownCircleTimer>
                        </div>
                        <div className="d-flex justify-content-center mb-5">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setCancel(true)}
                            >
                                <FormattedMessage
                                    id="Order_details.View Order Details"
                                    defaultMessage="View Order Details"
                                />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="container mb-5">
                        <div className="row TopMargin">
                            <div className="col-lg-12">
                                <h4 className="text-center TextColor">
                                    <FormattedMessage
                                        id="Order_details.Thanks for choosing Tastes on way! Here are your order details:"
                                        defaultMessage="Thanks for choosing Tastes on way! Here are your order details:"
                                    />
                                </h4>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-12">
                                <h4 className="text-center">
                                    <FormattedMessage
                                        id="Order_details.Order No :"
                                        defaultMessage="Order No :"
                                    />{' '}
                                    <span className="RedColorFont">{`#${orderDetails?.order_no}`}</span>
                                </h4>
                            </div>
                        </div>

                        <div className="row TopMargin">
                            <div className="col-lg-12">
                                <div className="DivDeliveryAddress">
                                    <div className="row">
                                        <div className="col">
                                            <div className="DeliciousDosaFont">
                                                <FormattedMessage
                                                    id="Order_details.Order placed at :"
                                                    defaultMessage="Order placed at :"
                                                />{' '}
                                                {` ${date?.split('-').reverse().join('/')}, ${
                                                    orderDetails?.time_for_incoming_order
                                                }`}
                                            </div>
                                            <div className="OrderFromText">
                                                <FormattedMessage
                                                    id="Order_details.Ordered From:"
                                                    defaultMessage="Ordered From:"
                                                />
                                            </div>
                                            <div className="PlacesText">
                                                {orderDetails?.business_owner_address?.office_name}
                                            </div>
                                            <div className="TextColor">
                                                {orderDetails?.business_owner_address?.area}
                                            </div>
                                        </div>
                                        <div className="col">
                                            {orderDetails?.order_status == 'Pending' ? (
                                                <div className="DeliciousDosaFont TextRightBox">
                                                    <FormattedMessage
                                                        id="Order_details.Order Status :"
                                                        defaultMessage="Order Status :"
                                                    />{' '}
                                                    {orderDetails?.order_status}
                                                </div>
                                            ) : (
                                                <div className="DeliciousDosaFont TextRightBox">
                                                    <FormattedMessage
                                                        id="Order_details.Order Status :"
                                                        defaultMessage="Order Status :"
                                                    />
                                                    {orderDetails?.order_status}
                                                </div>
                                            )}

                                            <div className="OrderFromText TextRightBox">
                                                <FormattedMessage
                                                    id="Order_details.Delivered To:"
                                                    defaultMessage="Delivered To:"
                                                />
                                            </div>
                                            <div className="PlacesText TextRightBox">
                                                {orderDetails?.user?.name}
                                            </div>
                                            <div className="TextColor TextRightBox">
                                                {orderDetails?.user_address?.area}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="OrderFromText">
                                            <FormattedMessage
                                                id="Order_details.Item Name:"
                                                defaultMessage="Item Name:"
                                            />
                                        </div>
                                        {orderDetails?.order_detail.map((i) => {
                                            return i.menu_items.map((d) => {
                                                return (
                                                    <div key={d.id} className="PlacesText">
                                                        {i.quantity} <span>x</span> {d.name}
                                                    </div>
                                                );
                                            });
                                        })}
                                    </div>
                                    <div className="col">
                                        <div className="OrderFromText TextRightBox">
                                            <FormattedMessage
                                                id="Order_details.Price"
                                                defaultMessage="Price"
                                            />
                                        </div>
                                        {orderDetails?.order_detail.map((i) => {
                                            return (
                                                <div key={i.id} className="PlacesText TextRightBox">
                                                    <img src={rupee} className="RupeeImg" alt="" />
                                                    {i.item_price}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr className="mt-5" />
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="PlacesText">
                                            <FormattedMessage
                                                id="Order_details.Delivery Fee:"
                                                defaultMessage="Delivery Fee:"
                                            />{' '}
                                            <span className="PlacesText TextRightBox TextFloatright">
                                                <img src={rupee} className="RupeeImg" alt="" />
                                                {orderDetails?.delivery_charge}
                                            </span>
                                        </div>
                                        <div className="PlacesText">
                                            <FormattedMessage
                                                id="Order_details.Total :"
                                                defaultMessage="Total :"
                                            />{' '}
                                            <span className="PlacesText TextRightBox TextFloatright">
                                                <img src={rupee} className="RupeeImg" alt="" />
                                                {orderDetails?.order_total}
                                            </span>
                                        </div>
                                        {orderDetails?.coupon_amount ? (
                                            <div className="PlacesText">
                                                <FormattedMessage
                                                    id="Order_details.Discount :"
                                                    defaultMessage="Discount :"
                                                />

                                                <span className="PlacesText TextRightBox TextFloatright">
                                                    -
                                                    <img src={rupee} className="RupeeImg" alt="" />
                                                    {orderDetails?.coupon_amount}
                                                </span>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        <div className="PlacesText">
                                            <FormattedMessage
                                                id="Order_details.Tax Collected :"
                                                defaultMessage="Tax Collected :"
                                            />

                                            <span className="PlacesText TextRightBox TextFloatright">
                                                <img src={rupee} className="RupeeImg" alt="" />
                                                {orderDetails?.tax_amount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="PlacesText">
                                            <FormattedMessage
                                                id="Order_details.Grand Total"
                                                defaultMessage="Grand Total"
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="PlacesText TextRightBox">
                                            <img src={rupee} className="RupeeImg" alt="" />
                                            {orderDetails?.order_final_total}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderDetails;
