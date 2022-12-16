import React from 'react';
import AboutUsContent1 from './About-us-widget1/AboutUsContent1';
import AboutUsContent2 from './About-us-widget2/AboutUsContent2';
import AboutUsContent3 from './About-us-widget3/AboutUsContent3';
import AboutUsContent4 from './About-us-widget4/AboutUsContent4';
import AboutBanner from './AboutUsBanner/AboutBanner';

const AboutUs = () => {
    return (
        <>
            <AboutBanner />
            <AboutUsContent1 />
            <AboutUsContent2 />
            <AboutUsContent3 />
            <AboutUsContent4 />
        </>
    );
};

export default AboutUs;
