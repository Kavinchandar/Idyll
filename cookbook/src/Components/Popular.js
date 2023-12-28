
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SplideComponent from "./SplideComponent";

const Popular = () => {
    const [Recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRandomRecipes();
    },[]);
    
    const getRandomRecipes = async () => {
        const check = sessionStorage.getItem('popular');

        if(check){
            setRecipes(JSON.parse(check));
        }else{
            try {
                const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getRandomRecipes`);
                const data = await response.json();
                sessionStorage.setItem('popular', JSON.stringify(data));
                setRecipes(data);
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    };

    const options = {
        type: 'loop',
        perPage: 3,
        gap: "2rem",
        arrows: false,
        drag: 'free',
        pagination: false,
        autoplay: true,
        interval: 5000,
        speed: 5000,
        pauseOnHover: false,
        };

    return (
        <div>
            <SplideComponent data={Recipes} options={options} name={"Popular Choices"}></SplideComponent>
        </div>
    )
}


export default Popular;