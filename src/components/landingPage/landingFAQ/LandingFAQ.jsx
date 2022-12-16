import React from 'react';
import { FormattedMessage } from 'react-intl';
import './LandingFAQ.css';
const LandingFAQ = () => {
    return (
        <div className="container-fluid HomeBackRed TopMargin">
            <div className="container">
                <div className="row PaddingHomeAbout">
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-3 text-center">
                        <h3 className="LocalEconomies">
                            <FormattedMessage
                                id="Landing_page.FAQ.Frequently Asked Questions"
                                defaultMessage="Frequently Asked Questions"
                            />
                        </h3>
                    </div>
                </div>
                <div className="row PaddingRestBottom">
                    <div className="col-lg-12">
                        <div className="accordion" id="accordionExample">
                            <div className="card BtnCardHead">
                                <div className="card-header BtnCardHeadWhite" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block btnCollapseWhite text-left"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <FormattedMessage
                                                id="Landing_page.FAQ.How does tastes on way works ?"
                                                defaultMessage="How does tastes on way works ?"
                                            />
                                        </button>
                                    </h2>
                                </div>

                                <div
                                    id="collapseOne"
                                    className="collapse show"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <FormattedMessage
                                            id="Landing_page.FAQ.Q1 ans"
                                            defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion mt-3" id="accordionExample">
                            <div className="card BtnCardHead">
                                <div className="card-header BtnCardHeadWhite" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block btnCollapseWhite text-left"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseTwo"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <FormattedMessage
                                                id="Landing_page.FAQ.Can I schedule a delivery in advance ?"
                                                defaultMessage="Can I schedule a delivery in advance ?"
                                            />
                                        </button>
                                    </h2>
                                </div>

                                <div
                                    id="collapseTwo"
                                    className="collapse"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <FormattedMessage
                                            id="Landing_page.FAQ.Q2 ans"
                                            defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion mt-3" id="accordionExample">
                            <div className="card BtnCardHead">
                                <div className="card-header BtnCardHeadWhite" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block btnCollapseWhite text-left"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseThree"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <FormattedMessage
                                                id="Landing_page.FAQ.How fast will i get my food ?"
                                                defaultMessage="How fast will i get my food ?"
                                            />
                                        </button>
                                    </h2>
                                </div>

                                <div
                                    id="collapseThree"
                                    className="collapse"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <FormattedMessage
                                            id="Landing_page.FAQ.Q3 ans"
                                            defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion mt-3" id="accordionExample">
                            <div className="card BtnCardHead">
                                <div className="card-header BtnCardHeadWhite" id="headingOne">
                                    <h2 className="mb-0">
                                        <button
                                            className="btn btn-link btn-block btnCollapseWhite text-left"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target="#collapseFour"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <FormattedMessage
                                                id="Landing_page.FAQ.What is a group order and how can I create one ?"
                                                defaultMessage="What is a group order and how can I create one ?"
                                            />
                                        </button>
                                    </h2>
                                </div>

                                <div
                                    id="collapseFour"
                                    className="collapse"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <FormattedMessage
                                            id="Landing_page.FAQ.Q4 ans"
                                            defaultMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                                        />
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

export default LandingFAQ;
