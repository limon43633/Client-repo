import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import WhyChoose from '../components/WhyChoose';
import Feedback from '../components/Feedback';
import ReadyToOrder from '../components/ReadyToOrder';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <WhyChoose></WhyChoose>
            <Feedback></Feedback>
            <ReadyToOrder></ReadyToOrder>

        </div>
    );
};

export default Home;