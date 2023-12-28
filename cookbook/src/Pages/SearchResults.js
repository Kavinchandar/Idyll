import { useState, useEffect } from'react';
import { useParams } from 'react-router-dom';
import styled from'styled-components';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";


const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const params = useParams();
    
    const getSearchResults = async (name,vegetarian,vegan,glutenfree,dairyfree) => {
        var dietstring = "";
        if (vegetarian === 'true') { dietstring += "vegetarian,"; }
        if(vegan === 'true') { dietstring += "vegan,"; }
        if(glutenfree === 'true') { dietstring += "glutenfree,"; }
        if(dairyfree === 'true') { dietstring += "dairyfree,";}
        dietstring = dietstring.slice(0,-1);
        console.log(dietstring);
        const url = `https://idyll-395122.wl.r.appspot.com/api/getSearchResults?name=${name}&diet=${dietstring}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data);
    };

    useEffect(() => {
        getSearchResults(params.input,params.vegetarian,params.vegan,params.glutenfree,params.dairyfree);
        console.log(params);
    },[params]);

    return (
        <Wrapper>
            {searchResults.length > 1 ? <div>
            <div className='d-flex justify-content-end mb-5'><Link to="/"><Icon><IoArrowBackOutline size={30}/></Icon></Link></div>
                <Grid>
                        {searchResults.map((cuisine) => (
                            <Card key={cuisine.id}>
                                <Link to={`/recipe/${cuisine.id}`}>
                                <img src={cuisine.image} alt={cuisine.name}/>
                                <h4>{cuisine.title}</h4>
                                </Link>
                            </Card>
                        ))}
                </Grid> </div>
         : <Nope>No Results Found</Nope>} 
        </Wrapper>
    )
}

const Nope = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    border: 2px solid red;
    border-radius: 1rem;
`;
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
    h4 {
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
export default SearchResults;