import React from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/media.css';
import previousSliderImg from '../../assets/images/previous-slider.png';
import nextSliderImg from '../../assets/images/next-slider.png';
import specialImage1 from '../../assets/images/navratri specials.png';
import specialImage2 from '../../assets/images/newly opened.png';
import specialImage3 from '../../assets/images/trending this week.png';
import { FormattedMessage } from 'react-intl';

const LandingCarousel2 = () => {
    return (
        <div className="row TopMargin">
            <div className="col-lg-12">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="Landing_page.Collections"
                            defaultMessage="Collections"
                        />
                    </h3>
                    <p className="cardTextGrey">
                        <FormattedMessage
                            id="Landing_page.LandingCarousel2_Collection_text"
                            defaultMessage="
                        Explore curated lists of top restaurants, cafes, pubs, and bars in
                        Ahmedabad, based on trends."
                        />
                    </p>
                </div>

                <div className="DivClassControlsRest">
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-target="#carouselExampleInterval1"
                        data-slide="prev"
                    >
                        <img src={previousSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-target="#carouselExampleInterval1"
                        data-slide="next"
                    >
                        <img src={nextSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                </div>
                <div id="carouselExampleInterval1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner mt-5">
                        <div className="carousel-item active" data-interval="10000">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage1}
                                            className="card-img"
                                            alt="navratri specials"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Navratri Specials"
                                                    defaultMessage="Navratri Specials"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage2}
                                            className="card-img"
                                            alt="newly opened"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Newly Opened"
                                                    defaultMessage="Newly Opened"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage3}
                                            className="card-img"
                                            alt="trending this week"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                {' '}
                                                <FormattedMessage
                                                    id="Landing_page.Trending This Week"
                                                    defaultMessage="Trending This Week"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                {' '}
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-interval="2000">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage1}
                                            className="card-img"
                                            alt="navratri specials"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Navratri Specials"
                                                    defaultMessage="Navratri Specials"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage2}
                                            className="card-img"
                                            alt="newly opened"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Newly Opened"
                                                    defaultMessage="Newly Opened"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage3}
                                            className="card-img"
                                            alt="trending this week"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Trending This Week"
                                                    defaultMessage="Trending This Week"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage1}
                                            className="card-img"
                                            alt="navratri specials"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Navratri Specials"
                                                    defaultMessage="Navratri Specials"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage2}
                                            className="card-img"
                                            alt="newly opened"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Newly Opened"
                                                    defaultMessage="Newly Opened"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div
                                        className="card bg-dark text-white BoxSpecials"
                                        style={{ width: '18rem' }}
                                    >
                                        <img
                                            src={specialImage3}
                                            className="card-img"
                                            alt="trending this week"
                                        />
                                        <div className="card-img-overlay CardImgoverlayBottom">
                                            <h5 className="card-title">
                                                <FormattedMessage
                                                    id="Landing_page.Trending This Week"
                                                    defaultMessage="Trending This Week"
                                                />
                                            </h5>
                                            <p className="card-text">
                                                <FormattedMessage
                                                    id="Landing_page.16 Places"
                                                    defaultMessage="16 Places"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingCarousel2;
