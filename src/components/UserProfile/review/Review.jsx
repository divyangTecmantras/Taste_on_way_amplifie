import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { addCustomerReview } from '../../../redux/actions/user/customerReview';
import reviewer from '../../../assets/images/reviewrestaurent.png';
import feedback from '../../../assets/images/give us your feedback.png';
import './Review.css';

const Review = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            Review: '',
        },

        onSubmit: (values, { resetForm }) => {
            const Review = {
                feedback: values.Review,
            };
            dispatch(addCustomerReview(Review));
            resetForm();
        },
    });

    return (
        <div>
            <div
                className="card ImgProfileBg"
                data-toggle="modal"
                data-target="#exampleModalreview"
            >
                <img src={feedback} className="card-img mb-5" alt="feedback" />
                <div className="card-img-overlay ImgOverlayProf">
                    <h5 className="card-title">
                        <FormattedMessage
                            id="UserProfile_page.GIVE US YOUR FOOD FEEDBACK"
                            defaultMessage="GIVE US YOUR <br /> FOOD FEEDBACK"
                            values={{ br: <br /> }}
                        />
                    </h5>
                    <p className="card-text ">
                        <FormattedMessage
                            id="UserProfile_page.Your word makes tastes on way a better place."
                            defaultMessage="Your word makes tastes <br /> on way a better place."
                            values={{ br: <br /> }}
                        />
                    </p>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModalreview"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">
                                <FormattedMessage
                                    id="UserProfile_page.Review"
                                    defaultMessage="Review"
                                    values={{ br: <br /> }}
                                />
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center">
                                        <img
                                            src={reviewer}
                                            className="Widthreview"
                                            alt="reviewer"
                                        />
                                        <h6 className="card-title">Delicious Dosa</h6>
                                        <p className="card-text">Sattelite Road , Ahmedabad</p>
                                        <span className="card-text TextColor ordercolumn">
                                            Cheese Burst Chatpata Dosa
                                        </span>

                                        <hr />
                                    </div>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="inputEmail4" className="Labelmodel">
                                                    <FormattedMessage
                                                        id="UserProfile_page.Leave a comment"
                                                        defaultMessage="Leave a comment"
                                                    />
                                                </label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    rows={4}
                                                    name="Review"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.Review}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer ModalHomeFooterProfile">
                            <form className="floatRightButton" onSubmit={formik.handleSubmit}>
                                <button
                                    type="button"
                                    className="btn mr-2 btn-outline-danger btnradius"
                                    data-dismiss="modal"
                                >
                                    <FormattedMessage
                                        id="UserProfile_page.Cancel"
                                        defaultMessage="Cancel"
                                    />
                                </button>

                                <button type="submit" className="btn btn-danger btnradius">
                                    <FormattedMessage
                                        id="UserProfile_page.Submit"
                                        defaultMessage="Submit"
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
