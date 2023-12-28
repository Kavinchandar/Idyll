import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";


const CuisinePage = () => {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        console.log(name);
        const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getCuisine?name=${name}`);
        const data = await response.json();
        console.log(data);
        setCuisine(data);
    };

    useEffect(() => {
            getCuisine(params.name);
            console.log(params.name);
        }, [params.name]);

    return (
            <div>
                <Wrapper>
                <div className='d-flex justify-content-end mb-5'><Link to="/"><Icon><IoArrowBackOutline size={30}/></Icon></Link></div>
                    <Grid>
                        {cuisine.map((cuisine) => (
                            <Card key={cuisine.id}>
                                <Link to={`/recipe/${cuisine.id}`}>
                                <img src={cuisine.image} alt={cuisine.name}/>
                                <p>{cuisine.title}</p>
                                </Link>
                            </Card>
                        ))}
                    </Grid>
                </Wrapper>
            </div>
        );
};

const Wrapper = styled.div`
    margin: auto;
    width: 70%;
    padding: 2rem;
`;

const Grid = styled.div`    
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-gap: 2rem;`;

const Card = styled.div`
    border-radius: 1rem;
    img{
        width: 100%;
        border-radius: 1rem;
    } 
    a {
        text-decoration: none;
    }   
    p{
        text-align: center;
        padding: 1rem;
        color: #000;
    }
`;

const Icon = styled.div`
cursor: pointer;
text-decoration: none;
color: #313131;
`;

export default CuisinePage;