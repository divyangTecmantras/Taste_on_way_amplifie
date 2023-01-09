import React, { useState } from 'react';
import OrderDetails from '../../common/OrderDetails';
import ErrorFallback from '../../common/ErrorFallback';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ErrorBoundary } from 'react-error-boundary';
import trackorder from '../../../assets/images/trackorder.png';
import rupee from '../../../assets/images/rupeeiconblack.png';
import { useEffect } from 'react';
import { fetchUserOrderHistory } from '../../../redux/actions/user/userOrderHistory';
import TrackOrderDetails from '../TrackOrderDetails';
import { Modal } from 'react-bootstrap';
import RefrralCode from '../RefrralCode/RefrralCode';
import { getItem } from '../../../utils/utils';
const YourOrder = () => {
    const [searchValue, setSearchValue] = useState('all');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { userOrderHistory } = useSelector((state) => ({
        userOrderHistory: state?.userOrderHistory?.payload?.data?.data,
    }));
    const lat = getItem('lat');
    const long = getItem('long');

    useEffect(() => {
        const apiData = {
            date_filter: searchValue,
            latitude: lat,
            longitude: long,
            radius: '6',
        };
        dispatch(fetchUserOrderHistory(apiData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
            >
                <h2 className="respmargtopprof RespMargTop">
                    <FormattedMessage
                        id="UserProfile_page.Your Order"
                        defaultMessage="Your Order"
                    />
                </h2>
                <RefrralCode />

                <div className="input-group mt-4">
                    <select onChange={handleChange} className="form-control">
                        <option value="all">All</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>

                <div className="side-bar">
                    {userOrderHistory?.map((data) => (
                        <div className="row" key={data.id}>
                            <div className="col-lg-12">
                                <div className="card mt-4  ">
                                    <h5 className="card-header Boxcardborderbottom">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <img
                                                    src={data.business_owner.avatar}
                                                    className="WidthProfImg"
                                                    alt="profiledeliciousdosa"
                                                />
                                            </div>
                                            <div className="col-lg-4">
                                                <h5 className="HeadProfBox">
                                                    {data?.business_owner_address?.office_name}
                                                </h5>
                                                <div className="NormalTextProf">
                                                    {data?.business_owner_address?.address}
                                                </div>
                                                <div className="NormalTextProf">
                                                    {Math.round(data.user_address.distance * 100) /
                                                        100}
                                                    <FormattedMessage
                                                        id="UserProfile_page.KM"
                                                        defaultMessage="KM"
                                                    />
                                                </div>
                                            </div>

                                            {data.order_status == 'Delivered' ||
                                            data.order_status == 'Cancelled' ? (
                                                <div className="col-lg-6 d-flex justify-content-end   ">
                                                    <div className="btn btn-default DivRightCancelled">
                                                        {data.order_status}
                                                    </div>
                                                    <ErrorBoundary
                                                        FallbackComponent={ErrorFallback}
                                                    >
                                                        <OrderDetails data={data} />
                                                    </ErrorBoundary>
                                                </div>
                                            ) : (
                                                <div className="col-lg-6">
                                                    <div className="BadgeMainDiv">
                                                        <a
                                                            href="/"
                                                            className="badge TrackOrder"
                                                            data-toggle="modal"
                                                            data-target="#exampleModaltrack"
                                                            onClick={() => {
                                                                setShow(true);
                                                                setSelectedOrder(data);
                                                            }}
                                                        >
                                                            <FormattedMessage
                                                                id="UserProfile_page.Track Order"
                                                                defaultMessage="Track Order"
                                                            />{' '}
                                                            <img
                                                                src={trackorder}
                                                                alt="trackorder"
                                                            />
                                                        </a>

                                                        {selectedOrder?.id == data?.id && show && (
                                                            <Modal
                                                                show={show}
                                                                onHide={() => setShow(!show)}
                                                                animation={false}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                >
                                                                    <span
                                                                        onClick={() =>
                                                                            setShow(!show)
                                                                        }
                                                                        aria-hidden="true"
                                                                    >
                                                                        ×
                                                                    </span>
                                                                </button>
                                                                <TrackOrderDetails
                                                                    data={selectedOrder}
                                                                />
                                                            </Modal>
                                                        )}
                                                    </div>
                                                    <ErrorBoundary
                                                        FallbackComponent={ErrorFallback}
                                                    >
                                                        <OrderDetails data={data} />
                                                    </ErrorBoundary>
                                                </div>
                                            )}
                                        </div>
                                    </h5>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <span className="TextOverflowCard">
                                                    {data.order_detail[0].quantity} x{' '}
                                                    {data.order_detail[0].menu_items[0].name}
                                                </span>
                                                <div className="mt-2 TextColor">
                                                    {data.date_for_incoming_order} at{' '}
                                                    {data.time_for_incoming_order}
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="BadgeMainDiv">
                                                    <span>
                                                        <img
                                                            src={rupee}
                                                            className="RupeeBlackWidth"
                                                            alt="rupee"
                                                        />
                                                        {data.order_final_total}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default YourOrder;
