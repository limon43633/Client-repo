import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import WhyChoose from '../components/WhyChoose';
import Feedback from '../components/Feedback';
import ReadyToOrder from '../components/ReadyToOrder';
import OurProducts from '../components/OurProduct';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurProducts></OurProducts>
            <HowItWorks></HowItWorks>
            <WhyChoose></WhyChoose>
            <Feedback></Feedback>
            <ReadyToOrder></ReadyToOrder>

        </div>
    );
};

export default Home;