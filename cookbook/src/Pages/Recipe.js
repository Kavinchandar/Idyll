import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import { IoArrowBackOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Recipe.css';
import { Link, useNavigate } from 'react-router-dom';

const Recipe = () => {
    const [ recipe, setRecipe ] = useState({});
    const [ recipeInfo, setRecipeInfo ] = useState({});
    const [ activeTab, setActiveTab ] = useState('Recipe');
    const params = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
      };

    const getRecipe = async (name) => {
        const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getRecipe?name=${name}`);
        const data = await response.json();
        setRecipe(data);
    };

    const getRecipeInfo = async (name) => {
        const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getRecipeInfo?name=${name}`);
        const data = await response.json();
        setRecipeInfo(data);
    };

    useEffect(() => {
        getRecipe(params.name);
        getRecipeInfo(params.name);
        console.log(params.name);
    },[params.name]);

    return (
        <Card
                            border = {'dark'}
                            bg={'white'}
                            key={'dark'}
                            text={'dark'}
                            style={{ width: 'auto', height: 'auto' }}
                            className="m-5"
                            >
                                <TitleBox>
                                <Card.Title className="d-flex justify-content-between mt-5" width={50}><Title>{recipe.title}</Title><Icon onClick={handleGoBack}><IoArrowBackOutline size={30}/></Icon></Card.Title>
                                </TitleBox>
                            
        <div className="container">
            <div className="row">
                <div className="col">
                    <DetailWrapper>   
                            <img src={recipe.image} alt={recipe.title}/>
                            <Card
                            bg={'dark'}
                            key={'dark'}
                            text={'light'}
                            style={{ width: '80%', maxWidth:'600px' }}
                            className="mt-4"
                            >
                                <Card.Body>
                                    <Card.Title>  </Card.Title>
                                    <Card.Text>
                                        <Nutrients>
                                        {recipeInfo.weightPerServing !== undefined ? <p>Serving {JSON.stringify(recipeInfo.weightPerServing.amount)}{JSON.stringify(recipeInfo.weightPerServing.unit).substring(1,2)}</p> : <p></p>}
                                        <p>Calories {recipeInfo.calories}</p>
                                        <p>Protein {recipeInfo.protein}</p>
                                        <p>Carbs {recipeInfo.carbs}</p>    
                                        <p>Fat {recipeInfo.fat}</p>
                                        </Nutrients>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card
                            bg= {'dark'}
                            key={'dark'}
                            text={'light'}
                            style={{ width: '80%' , maxWidth:'600px'}}
                            className="mt-4 mb-2"
                            >
                            <Card.Body>
                                <Card.Title>  </Card.Title>
                                <Card.Text>
                                    <Nutrients>                          
                                    <p> {JSON.stringify(recipe.vegetarian) === "true" ? <True>Vegetarian</True> : <False>Non-Vegetarian</False>}</p>   
                                    <p> {JSON.stringify(recipe.vegan) === "true" ? <True>Vegan</True> : <False>Not Vegan</False>}</p>      
                                    <p> {JSON.stringify(recipe.glutenFree) === "true" ? <True>Gluten Free</True> : <False>Has gluten</False>}</p>  
                                    <p> {JSON.stringify(recipe.dairyFree) === "true" ? <True>Dairy Free</True> : <False> Has Dairy </False>}</p>                                     
                                    </Nutrients>   
                                </Card.Text>
                            </Card.Body>
                            </Card>
                    </DetailWrapper>
                </div>
                <div className="row">
                <Info>
                    <ButtonBox>
                    <Button className={activeTab === 'Recipe' ? 'active':''} onClick={() => setActiveTab('Recipe')}>Recipe</Button>
                    <Button className={activeTab === 'Ingredients' ? 'active':''} onClick={() => setActiveTab('Ingredients')}>Ingredients</Button>
                    </ButtonBox>
                    { activeTab === "Recipe" && <InfoWrapper>
                        <p dangerouslySetInnerHTML={{__html: recipe.instructions}} className="lead"></p>                         
                    </InfoWrapper>}
                    {
                        activeTab === "Ingredients" && <InfoWrapper>
                                <ul>
                            {recipe.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                        </InfoWrapper>
                    }
                    
                </Info>
                </div>
            </div>
        </div>                 

    </Card>
        
    );
};

const Icon = styled.div`
cursor: pointer;
text-decoration: none;
color: black;
`;

const Nutrients = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 2rem;`;

const Title = styled.h2`
font-size: 1.5rem;
margin-bottom: 2rem;
font-weight: 800;
`;

const TitleBox = styled.h2`
width: 80%;
margin: auto;
`;

const InfoWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
width: 80%;
margin: auto;
p {
    li{font-size: 1.5rem;}
    font-weight: 500;
    padding-bottom: 2rem;
}
li{font-size: 1.5rem;}
`;

const DetailWrapper = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 2rem;
    margin-right: 2rem;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
    img{
        width: 80%;
        max-width: 600px;
        height: auto;
        border-radius: 1rem;
    }
    `;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid #81BAB4;
    border-radius: 5px;
    margin-left: 1rem;
    margin-bottom: 2rem;
    font-weight: 600;
    margin-top: 2rem;

`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Info = styled.div`
   width: 80%;
   margin: auto;
`;

const True = styled.div`
    color: white;
    border: 2px solid green;
    border-radius: 5px;
    padding: 0.5rem;
`;
const False = styled.div`
    color: white;
    border: 2px solid red;
    border-radius: 5px;
    padding: 0.5rem;
`;
export default Recipe;