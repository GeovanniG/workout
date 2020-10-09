import React from 'react';
import Nav from './nav/Nav';
import DatePanel from './date-panel/DatePanel';
import Timer from './timer/Timer';
import Exercises from './exercises/Exercises';
import Workout from './workout/Workout';
import Footer from './footer/Footer';

const Applic = () => (
    <>
        <Nav />
        <Workout />
        <DatePanel />
        <Timer />
        <Exercises />
        <Footer />
    </>
)

export default Applic;