import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import WhyChoose from '../components/WhyChoose';
import Feedback from '../components/Feedback';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <WhyChoose></WhyChoose>
            <Feedback></Feedback>

        </div>
    );
};

export default Home;