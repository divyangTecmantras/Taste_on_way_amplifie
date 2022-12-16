import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import star from '../../../assets/images/star.png';
// import starGroup from '../../../assets/images/star_group.png';
import './RestaurantReviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchKitchenOwnerReview } from '../../../redux/actions/kitchenOwner/KitchenOwnerReview';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const RestaurantReviews = () => {
    const [visible, setVisible] = useState(2);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const { KitchenOwnerId } = useParams();
    const { reviewList } = useSelector((state) => ({
        reviewList: state?.kitchenOwnerReviewHistory?.payload?.data,
    }));

    useEffect(() => {
        const data = {
            business_owner_id: KitchenOwnerId,
        };
        dispatch(fetchKitchenOwnerReview(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextOnClick = () => {
        setCount((prv) => prv + 2);
        setVisible((prv) => prv + 2);
    };
    const prviousOnClick = () => {
        setCount((prv) => prv - 2);
        setVisible((prv) => prv - 2);
    };

    return (
        <div className="row TopMargin">
            {reviewList?.length > 0 ? (
                <div className="col-lg-12">
                    <div className="">
                        <h3>
                            <FormattedMessage
                                id="RestaurentDetails.What People Are Saying"
                                defaultMessage="What People Are Saying"
                            />
                        </h3>
                        <div className="DeliciousDosaFont">
                            4.8 <img src={star} alt="" className="StarImgRest" /> 110 Rating{' '}
                            <span style={{ color: '#e70f0f' }}>
                                <FormattedMessage
                                    id="RestaurentDetails.Tastes on way"
                                    defaultMessage="Tastes on way"
                                />
                            </span>
                        </div>
                    </div>

                    <div className="DivClassControlsRestDetails">
                        <button
                            className={
                                visible <= 3
                                    ? 'carousel-control-prev d-none'
                                    : 'carousel-control-prev'
                            }
                            type="button"
                            data-target="#carouselExampleInterval1"
                            data-slide="prev"
                            onClick={prviousOnClick}
                        >
                            <img src={previousSliderImg} alt="" className="ImgCarouselWidth" />
                        </button>
                        <button
                            className={
                                visible >= reviewList?.length
                                    ? 'carousel-control-next d-none'
                                    : 'carousel-control-next '
                            }
                            type="button"
                            data-target="#carouselExampleInterval1"
                            data-slide="next"
                            onClick={nextOnClick}
                        >
                            <img src={nextSliderImg} alt="" className="ImgCarouselWidth" />
                        </button>
                    </div>
                    <div
                        id="carouselExampleInterval1"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <div className="carousel-inner mt-5">
                            <div className="carousel-item active" data-interval="10000">
                                <div className="row">
                                    {reviewList &&
                                        reviewList?.slice(count, visible).map((data) => {
                                            return (
                                                <div
                                                    className="col-lg-6 col-md-6 RespMarTopCard"
                                                    key={data.id}
                                                >
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title star">
                                                                {data.users?.name
                                                                    ? data.users?.name
                                                                    : 'null'}
                                                                <ReactStars
                                                                    count={data.rating}
                                                                    size={23}
                                                                    value={data.rating}
                                                                    activeColor="#ffd700"
                                                                    edit={false}
                                                                />
                                                            </h5>
                                                            <p className="card-text">
                                                                {data.feedback}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default RestaurantReviews;
