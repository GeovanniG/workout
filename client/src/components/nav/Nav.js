import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './nav.css';

const SideBar = styled.ul`
    position: absolute;
    padding-left: 0px;
    left: -50px;
    color: blue;
    transition: all .7s ease;
    visibility: hidden;

    width: 100vw;
    height: 100vh;
    list-style-type: none;

    &.easeIn {
        background: black;
        left: 0;
        visibility: visible;
    }
`;

const SideBarItem = styled.li`
    padding: .5rem;
    color: white;
`;

const SideBarOpenIcon = styled.span`
    color: red;
    visibility: ${props => props.hidden ? 'hidden' : 'visible'};
    display: inline;
`;

const SideBarCloseIcon = styled.span`
    color: blue;
`;

const ProfileIcon = styled.span`
`;

const Nav = () => {
    let [clicked, setClicked] = useState(false);

    return (
        <nav>
            <ul className='nav-links'>
                <SideBar onClick={() => setClicked(!clicked)} className={clicked && 'easeIn'}>
                    <SideBarItem>Item 1</SideBarItem>
                    <SideBarItem>Item 2</SideBarItem>
                    <SideBarItem>Item 3</SideBarItem>
                    <SideBarCloseIcon>Close</SideBarCloseIcon>
                </SideBar>
                <li onClick={() => setClicked(!clicked)}>
                        <SideBarOpenIcon hidden={clicked}>Open</SideBarOpenIcon>
                </li>
                <li>Home</li>
                <li><Link to='/login'><ProfileIcon>Profile</ProfileIcon></Link></li>
            </ul>
        </nav>
)}

export default Nav;