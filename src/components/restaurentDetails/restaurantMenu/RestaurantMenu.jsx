import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import './RestaurantMenu.css';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';

const RestaurantMenu = () => {
    const { KitchenOwnerId } = useParams();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(4);

    const [count, setCount] = useState(0);

    const { kitchenOwnerMenuList } = useSelector((state) => ({
        kitchenOwnerMenuList: state?.kitchenOwnerMenuList?.payload?.data?.data,
    }));

    useEffect(() => {
        window.scrollTo(0, 898);
    });

    const nextOnClick = () => {
        setCount((prv) => prv + 4);
        setVisible((prv) => prv + 4);
    };

    const prviousOnClick = () => {
        setCount((prv) => prv - 4);
        setVisible((prv) => prv - 4);
    };

    const menuItemClick = (id) => {
        navigate(`/kitchenOwnerDetails/${KitchenOwnerId}/${id}`);
    };

    return (
        <div className=" TopMargin">
            <div className="">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="RestaurentDetails.Featured Items"
                            defaultMessage="Featured Items"
                        />
                    </h3>
                </div>
                <div className="DivClassControlsRestDetails">
                    <button
                        className={
                            visible <= 4 ? 'carousel-control-prev d-none' : 'carousel-control-prev'
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="prev"
                        onClick={prviousOnClick}
                    >
                        <img src={previousSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                    <button
                        className={
                            visible >= kitchenOwnerMenuList?.length
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
                <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner mt-5">
                        <div className="carousel-item active" data-interval="10000">
                            <div className="row">
                                {kitchenOwnerMenuList?.slice(count, visible).map((data) => {
                                    const finalSentence = data.name.replace(
                                        /(^\w{1})|(\s+\w{1})/g,
                                        (letter) => letter.toUpperCase(),
                                    );
                                    return (
                                        <div key={data.id} className="col-lg-3 col-md-3">
                                            <div className="card bg-dark text-white BoxSpecials">
                                                <button
                                                    className="AdddBtnTextimg"
                                                    onClick={() => menuItemClick(data.id)}
                                                >
                                                    <img
                                                        style={{
                                                            height: '15rem',
                                                            objectFit: 'cover',
                                                        }}
                                                        src={data.image_menu_link}
                                                        className="card-img"
                                                        alt="navratri specials"
                                                    />
                                                </button>
                                                <div className="card-img-overlay CardImgoverlayBottom">
                                                    <button
                                                        className="card-title AdddBtnText border-0"
                                                        onClick={() => menuItemClick(data.id)}
                                                    >
                                                        <FormattedMessage
                                                            id="RestaurentDetails.Items"
                                                            defaultMessage="Items"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="DeliciousDosaFontBlack mt-2">
                                                {finalSentence}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
