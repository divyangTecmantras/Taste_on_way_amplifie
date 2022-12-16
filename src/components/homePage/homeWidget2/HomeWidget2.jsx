import React from 'react';
import { FormattedMessage } from 'react-intl';
import healthyFood from '../../../assets/images/healthy-food-home.png';
import healthyFruitSalad from '../../../assets/images/healthy-fruit-salad.png';
import '../../../assets/styles/media.css';

const HomeWidget2 = () => {
    return (
        <div>
            <div className="container-fluid TopMargin HomeBackWhite">
                <div className="container">
                    <div className="row PaddingHome">
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                            <h2>
                                <FormattedMessage
                                    id="Home_page.It’s all here.All in one app."
                                    defaultMessage="It’s all here. <br /> All in one app."
                                    values={{ linebreak: <br /> }}
                                />
                            </h2>
                            <div className="ContentText">
                                <FormattedMessage
                                    id="Home_page.HomeWidget1 Text1"
                                    defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a galley of
                                type."
                                />
                            </div>
                            <button className="btn btn-danger mt-4 BtnViewMore">
                                <FormattedMessage
                                    id="Home_page.View More"
                                    defaultMessage="View More"
                                />
                            </button>
                            <div />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img
                                src={healthyFood}
                                className="card-img-top ContentImg img-fluid"
                                alt="become a dasher"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row PaddingHome">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img
                                src={healthyFruitSalad}
                                className="card-img-top ContentImgLeft img-fluid"
                                alt="become a dasher"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                            <h2>
                                <FormattedMessage
                                    id="Home_page.Every Flavor Welcome"
                                    defaultMessage=" Every Flavor <br />Welcome"
                                    values={{ br: <br /> }}
                                />
                            </h2>
                            <div className="ContentText">
                                <FormattedMessage
                                    id="Home_page.HomeWidget1 Text2"
                                    defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a galley of
                                type."
                                />
                            </div>
                            <button className="btn btn-danger mt-4 BtnViewMore">
                                <FormattedMessage
                                    id="Home_page.View More"
                                    defaultMessage="View More"
                                />
                            </button>
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeWidget2;
