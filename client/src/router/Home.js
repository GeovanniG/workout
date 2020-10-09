import React from 'react';
import Nav from '../components/nav/Nav';
import DatePanel from '../components/date-panel/DatePanel';
import Timer from '../components/timer/Timer';
import Footer from '../components/footer/Footer';
import Workouts from '../components/workouts/Workouts';

const HomePage = () => (
    <>
        <Nav />
        <DatePanel />
        <Timer />
        <Workouts />
        <Footer />
    </>
)

export default HomePage;