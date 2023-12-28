

import styled from'styled-components';
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';


const FridgePage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [Recipe, setRecipe] = useState([]);
    const [ingredientexists, setIngredientexists] = useState(false);

    const getRecipesByIngredients = async(ingredient) => {
        setRecipe('');
        const word = ingredient + ','+ ingredients.map((item) => item).join(',');
        console.log(word);
        const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getRecipeByIngredient?word=${word}`);
        const data = await response.json();
        setRecipe(data);
    };
    const RemoveIngredient = (index) => {
        setIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
          });
        getRecipesByIngredients('');
    };
    const addIngredient = (newIngredient) => {
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        console.log(ingredients);
      };
    
        const submitHandler = (e) => {
            e.preventDefault();
            const newIngredient = e.target.ingredient.value;
            console.log(newIngredient);
            if (newIngredient !== '' && !ingredients.includes(newIngredient)) {
                getRecipesByIngredients(newIngredient);
                addIngredient(newIngredient);
                e.target.ingredient.value = '';
              }
              else{
                e.target.ingredient.value = '';
              }

            if (ingredients.includes(newIngredient)){
                setIngredientexists(true);
            } else {
                setIngredientexists(false);
            }
            
            e.target.reset();
        };

    return (
        <>
        {ingredientexists && <Nope>Ingredient already added!</Nope>}
        <FormStyle onSubmit={submitHandler}>
            <div className='mb-3'>
                    <FaSearch />
                    <input type="text" name='ingredient' placeholder='what are we working with...' />
            </div>
            {/* <Button onClick={getRecipesByIngredients}>Generate Recipes</Button> */}
        </FormStyle>

        <Box>
            {ingredients.map((ingredient, index) => (

            <Ingredient key={index} onClick={() => RemoveIngredient(index)}>{ingredient}</Ingredient>
            
            ))}
        </Box>
        <Box>
            <Wrapper>
                {Recipe.length > 1 && <div>
                    <Grid>
                            {Recipe.map((cuisine) => (
                                <Card key={cuisine.id}>
                                    <Link to={`/recipe/${cuisine.id}`}>
                                    <img src={cuisine.image} alt={cuisine.name}/>
                                    <h4>{cuisine.title}</h4>
                                    </Link>
                                </Card>
                            ))}
                    </Grid> </div>}
            </Wrapper>
        </Box>
        </>
    );
};

const Button = styled.button`
    background: #81BAB4; 
    height: 50px;
    margin-left: 30px;
    margin-bottom: 12px;
    border-radius: 12px;
    padding: 1rem;
    color: white;
    box-shadow: 10px 10px 5px lightblue;
`;
const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;
    width: 80%;
    margin: auto;
`;

const Ingredient = styled.div`
    border: 1px solid #81BAB4;
    border-radius: 12px;
    width: fit-content;
    padding: 0.5em;    
    font-size: 1.5rem;
    margin-right: 1em;
`;
const Autocomplete = styled.div`
    border: none;
    background: #81BAB4;
    font-size: 1.5rem;
    color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 5px lightblue;
    cursor: pointer;
    z-index: 1;
    position: absolute; 
    overflow-y: auto;
    max-height: 250px;
`;
const FormStyle = styled.form`
    margin: 0rem 2rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: 100%;
        min-width: 300px;
        max-width: 600px;
        position: relative;
    }
    input {
        border: none;
        background: #81BAB4;
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        color: white;
        box-shadow: 10px 10px 5px lightblue;
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`;

const Burger = styled.div`
    width: auto;
    height: auto;
    color: black;   
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid green;
    margin: 0;
    margin-right: 1rem;
`;

const Suggestion = styled.div`
    
    width: 90% !important;
    pading: 1rem !important;
    
    div {
        padding: 0.5rem;
        border-radius: 10px!important;
    }
    div:hover{
        background: aquamarine;
    }
`;
const Nope = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    border: 2px solid red;
    border-radius: 1rem;
    margin-bottom: 2rem;
`;
const Wrapper = styled.div`
    margin: auto;
    width: 80%;
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

export default FridgePage;