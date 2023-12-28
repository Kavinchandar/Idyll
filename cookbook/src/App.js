import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage.js';
import CuisinePage from './Pages/CuisinePage.js';
import './App.css';
import Lottie from "lottie-react";
import animationData1 from "./assets/animation_lkolf0w0.json";
import FridgePage from './Pages/Fridge.js';

import Search from './Components/Search.js';
import styled from'styled-components';
import { Link } from "react-router-dom";
import SearchResults from './Pages/SearchResults.js';
import Recipe from './Pages/Recipe.js';
import NavBarComponent from './Components/Navbar.js'

function App() {

 

  return (
    <BrowserRouter>
      <BigContainber>
        <div className="App">
        <NavBarComponent></NavBarComponent>
        <Nav>
          <LogoBox>
            <LottieContaier>
              <Link to={"/"}>
                <Lottie animationData={animationData1}/>
                {/* <Lottie animationData={animationData2}/> */}
              </Link>
            </LottieContaier>
          </LogoBox>
        </Nav>
        
          
          
          <div>
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cuisine/:name" element={<CuisinePage/>}/>
                <Route path="/searched/:input/:vegetarian/:vegan/:glutenfree/:dairyfree" element={<SearchResults/>}/>
                <Route path="/recipe/:name" element={<Recipe/>}/>
                <Route path="/fridge" element={<FridgePage/>}/>
              </Routes>       
          </div>                     
        </div>
        </BigContainber>    
    </BrowserRouter>
  );
}





    const BigContainber = styled.div`
      width: 80%;
      margin: auto;
      margin-top: 50px;
      // border: 3px solid aquamarine;
      // border-radius: 1rem;
    `;
    const LogoBox = styled(Link)`
      width: 80%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
  `;
    const Logo = styled(Link)`
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: black;
      font-size: 2rem;
      font-weight: 400;
      font-family: 'playfair display', sans-serif;
      // color: #81BAB4;
      width: 100%;
      justify-content: start;
      margin-left: 20rem;
      display: flex;
      font-weight: 800;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
      }
      
  `;
  
  const Nav = styled.div`
    padding: 4rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    svg {
      font-size: 2rem;
    }
    `;
  
    const LottieContaier = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      width: 20rem;
      height: 20rem;
      margin: 0;
      padding: 0;
      `;

    
export default App;
