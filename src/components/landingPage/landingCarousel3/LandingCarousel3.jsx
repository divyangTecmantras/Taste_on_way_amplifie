/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import OrderDetails from '../../common/OrderDetails';
import { fetchOrderAgainList } from '../../../redux/actions/kitchenOwner/OrderAgainList';
import ErrorFallback from '../../common/ErrorFallback';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import star from '../../../assets/images/star.png';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import '../../../assets/styles/media.css';
import './LandingCarousel3.css';
import { FormattedMessage } from 'react-intl';

const LandingCarousel3 = () => {
    const [visible, setVisible] = useState(3);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const { orderAgainList, orderAgainError } = useSelector((state) => ({
        orderAgainList: state?.orderAgainList?.payload?.data,
        orderAgainError: state?.orderAgainList?.error?.response?.data,
    }));

    const nextOnClick = () => {
        setCount((prv) => prv + 3);
        setVisible((prv) => prv + 3);
    };
    const prviousOnClick = () => {
        setCount((prv) => prv - 3);
        setVisible((prv) => prv - 3);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const orderAgainListData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                radius: 10,
            };
            dispatch(fetchOrderAgainList(orderAgainListData));
        });
    }, []);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="Landing_page.Order Again"
                            defaultMessage="Order Again"
                        />
                    </h3>
                </div>

                <div className="DivClassControls">
                    <button
                        className={
                            visible <= 3 || orderAgainError
                                ? 'carousel-control-prev d-none'
                                : 'carousel-control-prev'
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="prev"
                        onClick={prviousOnClick}
                    >
                        <img
                            src={previousSliderImg}
                            className="ImgCarouselWidth ImgCarouselWidthresp"
                            alt=""
                        />
                    </button>
                    <button
                        className={
                            visible >= orderAgainList?.length || orderAgainError
                                ? 'carousel-control-next d-none'
                                : 'carousel-control-next '
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="next"
                        onClick={nextOnClick}
                    >
                        <img src={nextSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                </div>
                <div id="carouselExampleInterval" className="carousel slide">
                    <div className="carousel-inner mt-5">
                        <div className="carousel-item active">
                            {orderAgainError ? (
                                <div>{orderAgainError?.message}</div>
                            ) : orderAgainList?.length === 0 ? (
                                <div>No Kitchen Owner Found!</div>
                            ) : (
                                <div className="row">
                                    {orderAgainList &&
                                        orderAgainList.slice(count, visible).map((data) => {
                                            return (
                                                <div className="col-lg-4 col-md-4" key={data.id}>
                                                    <div
                                                        className="card BoxCard"
                                                        style={{ width: '18rem' }}
                                                    >
                                                        <img
                                                            src={data.business_owner.avatar}
                                                            className="card-img-top"
                                                            alt="delicious dosa"
                                                            style={{
                                                                height: '15rem',
                                                                objectFit: 'none',
                                                            }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {
                                                                    data.business_owner_address
                                                                        .office_name
                                                                }
                                                            </h5>
                                                            <div className="card-text cardTextGrey">
                                                                {
                                                                    data.business_owner_address.city
                                                                        .name
                                                                }
                                                            </div>
                                                            <p className="card-text cardTextGrey">
                                                                {/* {data.rating[0].rating}{' '} */}
                                                                <img
                                                                    src={star}
                                                                    alt=""
                                                                    className="ImgWidthStar"
                                                                />{' '}
                                                            </p>
                                                            <ErrorBoundary
                                                                FallbackComponent={ErrorFallback}
                                                            >
                                                                <OrderDetails data={data} />
                                                            </ErrorBoundary>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingCarousel3;
