import React from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/media.css';
import phoneCall from '../../../src/assets/images/phone-call.png';
import star from '../../../src/assets/images/star.png';
import rupee from '../../assets/images/rupeeiconblack.png';
import Loader from '../common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MapContainer from '../common/MapContainer';
import {
    fetchCreateOrderDetails,
    fetchDeliveryPersonLocation,
} from '../../services/orederDetails/OrderDetails';

const TrackOrderDetails = ({ data }) => {
    const dispatch = useDispatch();

    const { orderTracking, deliveryPersonLocation, loading } = useSelector((state) => ({
        loading: state?.orderTracking?.loading,
        orderTracking: state?.orderTracking.orderDetails.orderDetails,
        deliveryPersonLocation: state?.orderTracking.deliveryPersonLocation.deliveryPersonLocation,
    }));
    const userAddress = orderTracking?.user_address;
    const businessOwnerAddress = orderTracking?.business_owner_address;
    const getLocationData = deliveryPersonLocation?.getLocationData[0]?.location_data;
    const currentRiderLocation =
        getLocationData &&
        (getLocationData?.length > 1
            ? getLocationData[getLocationData.length - 1]
            : getLocationData[0]);

    const orderRating = orderTracking?.rating?.length > 0 && orderTracking?.rating[0]?.rating;
    const orderId = data?.id;
    const deliveryPerson = orderTracking?.delivery_person || null;

    const orderStatus = deliveryPersonLocation?.order_status?.delivery_person_order_status;
    useEffect(() => {
        const intervalID = setInterval(() => {
            dispatch(fetchCreateOrderDetails({ order_id: orderId }));
        }, 10000);
        if (deliveryPerson) {
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, deliveryPerson]);

    useEffect(() => {
        if (deliveryPerson?.id) {
            const deliveryPersonLocationIntervalID = setInterval(() => {
                if (deliveryPersonLocation?.order_status?.order_status !== 'Delivered') {
                    dispatch(
                        fetchDeliveryPersonLocation({
                            order_id: orderId,
                            delivery_person_id: deliveryPerson.id,
                        }),
                    );
                }
            }, 10000);
            if (deliveryPersonLocation?.order_status?.order_status === 'Delivered') {
                clearInterval(deliveryPersonLocationIntervalID);
            }
            return () => {
                clearInterval(deliveryPersonLocationIntervalID);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deliveryPerson?.id, deliveryPersonLocation?.order_status?.order_status]);

    return (
        <>
            {loading ? (
                <div className="loader">
                    <Loader loading={loading} />
                </div>
            ) : (
                <div className="modal-body">
                    {/* <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.2335572155607!2d72.5286881153765!3d23.015195184956738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85811e6e44f3%3A0xab464c480b78aa76!2sICONIC%20SHYAMAL!5e0!3m2!1sen!2sin!4v1667901434226!5m2!1sen!2sin"
                        width="100%"
                        title="abcd"
                        height="450"
                        style={{ border: '0' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    /> */}
                    <div width="100%" title="abcd" height="450" style={{ border: '0' }}>
                        <MapContainer
                            destination={userAddress}
                            source={businessOwnerAddress}
                            currentLocation={currentRiderLocation}
                            orderStatus={orderStatus}
                        />
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mt-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="stepper d-flex flex-column">
                                                <div className="d-flex mb-1">
                                                    <div className="d-flex flex-column pr-4 align-items-center">
                                                        <div className="rounded-circle py-2 px-2 bg-danger text-white mb-1" />
                                                        <div className="lineVert" />
                                                    </div>
                                                    <div>
                                                        <div className="text-dark TextContent">
                                                            {
                                                                orderTracking
                                                                    ?.business_owner_address
                                                                    ?.address
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex mb-1">
                                                    <div className="d-flex flex-column pr-4 align-items-center">
                                                        <div className="rounded-circle py-2 px-2 bg-danger text-white mb-1" />
                                                    </div>
                                                    <div>
                                                        <div className="text-dark TextContent">
                                                            {orderTracking?.user_address?.address}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div className="TextContent TextEnd">
                                                <img
                                                    src={rupee}
                                                    className="RupeeBlackWidth"
                                                    alt="rupee"
                                                />
                                                {orderTracking?.order_final_total}
                                            </div>
                                            <div className="TextContent TextEnd MargintopDist">
                                                {Math.round(
                                                    orderTracking?.user_address?.distance || 0,
                                                )}
                                                KM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mt-4">
                                <div className="card-header cardheadwhite">
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <img
                                                src={orderTracking?.delivery_person?.avatar}
                                                className="WidthProfImgRider"
                                                alt="john-rider"
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="HeadProfBoxRider">
                                                {orderTracking?.delivery_person?.name}| Rider :
                                                Happy
                                            </div>
                                            <div className="NormalTextProfRide mt-3">
                                                <img
                                                    src={phoneCall}
                                                    className="WidthIconCall"
                                                    alt="phoneCall"
                                                />
                                                {orderTracking?.delivery_person?.mobile_number}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="TextEnd">
                                                <span className="TextColor TextContent">
                                                    {orderRating}
                                                </span>
                                                <img src={star} className="RatingImg" alt="star" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrackOrderDetails;
