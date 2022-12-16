import React from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/media.css';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
    return (
        <div>
            <footer className="container-fluid HomeBackBlack mt-5">
                <div className="container PaddingHome">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-md-4">
                            <ul className="ListUlFooter">
                                <span className="FontTitle">
                                    <FormattedMessage
                                        id="Footer.Top Cities"
                                        defaultMessage="Top Cities"
                                    />
                                </span>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Ahmedabad"
                                            defaultMessage="Ahmedabad"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Vadodara"
                                            defaultMessage="Vadodara"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Surat"
                                            defaultMessage="Surat"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Anand"
                                            defaultMessage="Anand"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-4 col-md-4">
                            <ul className="ListUlFooter">
                                <span className="FontTitle">
                                    <FormattedMessage
                                        id="Footer.Top Cuisines"
                                        defaultMessage="Top Cuisines"
                                    />
                                </span>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Pizza near me"
                                            defaultMessage="Pizza near me"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Chinese food near me"
                                            defaultMessage="Chinese food near me"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Sushi near me"
                                            defaultMessage="Sushi near me"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Cafe near me"
                                            defaultMessage="Cafe near me"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-4 col-md-4">
                            <ul className="ListUlFooter">
                                <span className="FontTitle">
                                    <FormattedMessage
                                        id="Footer.Get to Know Us"
                                        defaultMessage="Get to Know Us"
                                    />
                                </span>
                                <li>
                                    <a className="ListFooter" href="/About-Us">
                                        <FormattedMessage
                                            id="Footer.About Us"
                                            defaultMessage="About Us"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Careers"
                                            defaultMessage="Careers"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Investors"
                                            defaultMessage="Investors"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a className="ListFooter" href="/">
                                        <FormattedMessage
                                            id="Footer.Company Blog"
                                            defaultMessage="Company Blogss"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="PaddingFooter">
                <div className="container">
                    <div className="Copyleft">
                        <span>© 2022,Tastes On Way. All rights Reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
