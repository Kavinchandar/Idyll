
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SplideComponent from "./SplideComponent";

const Vegetarian = () => {
    const [Vegetarian, setVegetarian] = useState([]);

    useEffect(() => {
        getVegetarianRecipes();
    },[]);
    
    const getVegetarianRecipes = async () => {
        const check = sessionStorage.getItem('vegetarian');

        if(check){
            setVegetarian(JSON.parse(check));
        }else{
            try {
                const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getVegetarianRecipes`);
                const data = await response.json();
                sessionStorage.setItem('vegetarian', JSON.stringify(data));
                setVegetarian(data);
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    };

    const options = {
        type: 'loop',
        perPage: 4,
        gap: "2rem",
        arrows: false,
        drag: 'free',
        pagination: false,
        autoplay: true,
        interval: 5000,
        rewind: true,
        speed: 5000,
        pauseOnHover: false,
        };

    return (
        <div className="mb-5">
            <SplideComponent data={Vegetarian} options={options} name={"Vegetarian Options"}></SplideComponent>
        </div>
    )
}


export default Vegetarian;