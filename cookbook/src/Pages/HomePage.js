import Popular from "../Components/Popular";
import Vegetarian from "../Components/Vegetarian";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData1 from "../assets/animation_lkbi58s6.json";
// import animationData2 from "./assets/bike.json";
import Category from '../Components/Categories.js';
import Search from '../Components/Search.js';
import styled from'styled-components';
import { Link } from "react-router-dom";
import { GiKnifeFork } from 'react-icons/gi';

const HomePage = () => {
    return (
        <>
        <div>
            <SearchBox>
                <Search/>
            </SearchBox>
            <Category/>
            <Popular /> 
            <Vegetarian/>
        </div>
        </>
    );
};

const SearchBox = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
    `;

export default HomePage;