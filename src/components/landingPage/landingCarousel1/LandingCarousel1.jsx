import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import star from '../../../assets/images/star.png';
import '../../../assets/styles/media.css';
import '../../landingPage/landingCarousel1/LandingCarousel1.css';

const LandingCarousel1 = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(3);
    const [count, setCount] = useState(0);
    const { kitchenOwnerList, kitchenOwnerError } = useSelector((state) => ({
        kitchenOwnerList: state?.kitchenOwnerList?.payload?.data?.kitchen_owners?.data,
        kitchenOwnerError: state?.kitchenOwnerList?.error?.response?.data,
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
        <div className="row">
            <div className="col-lg-12">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="Landing_page.City Favorites"
                            defaultMessage="City Favorites"
                        />
                    </h3>
                </div>

                <div className="DivClassControls">
                    <button
                        className={
                            visible <= 3 || kitchenOwnerError
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
                            visible >= kitchenOwnerList?.length || kitchenOwnerError
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
                            {kitchenOwnerError ? (
                                <div>{kitchenOwnerError?.message}</div>
                            ) : kitchenOwnerList?.length === 0 ? (
                                <div>
                                    <FormattedMessage
                                        id="Landing_page.No Kitchen Owner Found!"
                                        defaultMessage="No Kitchen Owner Found!"
                                    />
                                </div>
                            ) : (
                                <div className="row">
                                    {kitchenOwnerList &&
                                        kitchenOwnerList.slice(count, visible).map((data) => {
                                            return (
                                                <div className="col-lg-4 col-md-4" key={data.id}>
                                                    <div
                                                        className="card BoxCard BoxCardWidth"
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
                                                                {data.rating}{' '}
                                                                <img
                                                                    src={star}
                                                                    alt=""
                                                                    className="ImgWidthStar"
                                                                />{' '}
                                                                {data.avg_rating}
                                                            </p>
                                                            <button
                                                                className="btn BoxLink border-0 bg-transparent "
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

export default LandingCarousel1;
