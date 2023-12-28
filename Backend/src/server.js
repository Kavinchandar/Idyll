import express from "express";
import axios from "axios";
import 'dotenv/config';
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!\/api).+/,(req, res) => {
    res.sendFile(path.join(__dirname,'../build/index.html'));
});

//popular choices
app.get('/api/getRandomRecipes',async(req,res) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    res.send(response.data.recipes);
});

//vegetarian choices
app.get('/api/getVegetarianRecipes',async(req,res) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
    res.send(response.data.recipes);
});

//cuisine choices
app.get('/api/getCuisine',async(req,res) => {
    const name = req.query.name;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
    res.send(response.data.results);
});

//search choices
app.get('/api/getSearchResults',async(req,res) => {
    const name = req.query.name;
    const diet = req.query.diet;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&diet=${diet}`);
    res.send(response.data.results);
});

//recipe choices
app.get('/api/getRecipe',async(req,res) => {
    const name = req.query.name;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    res.send(response.data);
});

//get Recipe information
app.get('/api/getRecipeInfo',async(req,res) => {
    const name = req.query.name;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${name}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`);
    res.send(response.data);
});

//get Autocomplete information
app.get('/api/getAutocomplete',async(req,res) => {
    const name = req.query.word;
    const response = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?number=10&query=${name}&apiKey=${process.env.REACT_APP_API_KEY}`);
    res.send(response.data);
});

//get Recipes By Ingredient information
app.get('/api/getRecipeByIngredient',async(req,res) => {
    const name = req.query.word;
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&apiKey=${process.env.REACT_APP_API_KEY}`);
    res.send(response.data);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`I'm alive on port ${PORT}`));