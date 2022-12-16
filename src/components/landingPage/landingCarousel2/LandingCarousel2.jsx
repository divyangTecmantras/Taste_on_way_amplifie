import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import star from '../../../assets/images/star.png';
import '../../../assets/styles/media.css';
import './LandingCarousel2.css';
import { FormattedMessage } from 'react-intl';

const LandingCarousel2 = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(3);
    const [count, setCount] = useState(0);

    const { topFiveRestaurantList, topFiveRestaurantsError } = useSelector((state) => ({
        topFiveRestaurantList: state?.topFiveRestaurantsList?.payload?.data,
        topFiveRestaurantsError: state?.topFiveRestaurantsList?.error?.response?.data,
    }));

    const nextOnClick = () => {
        setCount((prv) => prv + 3);
        setVisible((prv) => prv + 3);
    };

    const prviousOnClick = () => {
        setCount((prv) => prv - 3);
        setVisible((prv) => prv - 3);
    };
    const viewMoreClick = (id) => {
        navigate(`/kitchenOwnerDetails/${id}`);
    };

    return (
        <div className="row TopMargin">
            <div className="col-lg-12">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="Landing_page.Top Five Restaurants"
                            defaultMessage="Top Five Restaurants"
                        />
                    </h3>
                    <p className="cardTextGrey">
                        <FormattedMessage
                            id="Landing_page.LandingCarousel2_Collection_text"
                            defaultMessage="Explore curated lists of top restaurants, cafes, pubs, and bars in
                        Ahmedabad, based on trends."
                        />
                    </p>
                </div>

                <div className="DivClassControlsRest">
                    <button
                        className={
                            visible <= 3 || topFiveRestaurantsError
                                ? 'carousel-control-prev d-none'
                                : 'carousel-control-prev'
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="prev"
                        onClick={prviousOnClick}
                    >
                        <img src={previousSliderImg} className="ImgCarouselWidth" alt="" />
                    </button>
                    <button
                        className={
                            visible >= topFiveRestaurantList?.length || topFiveRestaurantsError
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
                <div id="carouselExampleInterval1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner mt-5">
                        <div className="carousel-item active" data-interval="10000">
                            {topFiveRestaurantsError ? (
                                <div>{topFiveRestaurantsError?.message}</div>
                            ) : topFiveRestaurantList?.length === 0 ? (
                                <div>
                                    <FormattedMessage
                                        id="Landing_page.No Restaurant Found!"
                                        defaultMessage="No Restaurant Found!"
                                    />
                                </div>
                            ) : (
                                <div className="row">
                                    {topFiveRestaurantList &&
                                        topFiveRestaurantList.slice(count, visible).map((data) => {
                                            return (
                                                <div className="col-lg-4 col-md-4" key={data.id}>
                                                    <div
                                                        className="card BoxCard"
                                                        style={{ width: '18rem' }}
                                                    >
                                                        <img
                                                            src={data.picture}
                                                            className="card-img-top"
                                                            alt="delicious dosa"
                                                            style={{
                                                                height: '15rem',
                                                                objectFit: 'none',
                                                            }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {data.name}
                                                            </h5>
                                                            <div className="card-text cardTextGrey">
                                                                {data.city_name}
                                                            </div>
                                                            <p className="card-text cardTextGrey">
                                                                {data.rating}
                                                                {'  '}

                                                                <img
                                                                    src={star}
                                                                    alt=""
                                                                    className="ImgWidthStar"
                                                                />

                                                                {data.avg_rating}
                                                            </p>
                                                            <button
                                                                className="BoxLink border-0 bg-transparent "
                                                                onClick={() =>
                                                                    viewMoreClick(
                                                                        data.business_owner_id,
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage
                                                                    id="Landing_page.View More"
                                                                    defaultMessage="View More"
                                                                />
                                                            </button>
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

export default LandingCarousel2;
