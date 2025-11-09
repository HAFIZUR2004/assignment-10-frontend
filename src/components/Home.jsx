import React from 'react';
import Banner from './Banner';
import AboutAIModels from '../pages/AboutAIModels';
import GetStarted from '../pages/GetStarted';
import FeaturedAIModels from '../pages/FeaturedAIModels';

const Home = () => {
    return (
        <div>
            
           <section>
        <Banner></Banner>
           </section>
           <main>
            <FeaturedAIModels></FeaturedAIModels>
           </main>
           <section>
            <AboutAIModels></AboutAIModels>
            <GetStarted></GetStarted>
           </section>

        </div>
    );
};

export default Home;