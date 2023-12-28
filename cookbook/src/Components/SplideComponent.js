import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

const SplideComponent = ({data,options,name}) => {

    
    return(
   <>
        <Wrapper>
            {/* <Title>{name}</Title> */}
            <Splide options={options}>
            {data.map((recipe, index) => (
                    <SplideSlide key={index}>
                        <Card key={index}>
                            <Link to={`/recipe/${recipe.id}`}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}/>
                                <Gradient/>
                            </Link>
                        </Card>
                    </SplideSlide>
            ))}
            </Splide>
        </Wrapper>
   </>);
};

const Wrapper = styled.div`
    margin: auto;
    width: 90%;
    padding: 2rem;
`;

const Title = styled.div`
    font-size: 2rem;
    color: black;
    font-weight: 600;
    padding-bottom: 1rem;
    font-family: 'Cedarville Cursive', sans-serif;
    text-align: center;
`;

const Card = styled.div`
    height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    background: white;
    img {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0);
        color: white;
        width: 100%;
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40%;
    }
`;

const Gradient = styled.div`
    z-index- 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default SplideComponent;