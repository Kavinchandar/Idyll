import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './Burger.css';

const Search = () => {
    const [ word, setWord ] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [glutenFree, setGlutenFree] = useState(false);
    const [dairyFree, setDairyFree] = useState(false);

    const navigate = useNavigate();
        const submitHandler = (e) => {
            e.preventDefault();
            navigate(`/searched/`+ word + `/`+ vegetarian+`/`+ vegan +`/`+ glutenFree + `/` + dairyFree);
        };

        const handleInputChange = async(event) => {
            const inputValue = event.target.value;
            setWord(inputValue);
            const response = await fetch(`https://idyll-395122.wl.r.appspot.com/api/getAutocomplete?word=${inputValue}`);
            const data = await response.json();
            setFilteredOptions(data);
          };

        const handleClick = (item) =>{
            setWord(item);
            setFilteredOptions([]);
        }
        const handleVegetarian = () => {
          setVegetarian(!vegetarian);  
        }
        const handleVegan = () => {
            setVegan(!vegan);  
          }
          const handleGlutenFree = () => {
            setGlutenFree(!glutenFree);    
          }
          const handleDairyFree = () => {
            setDairyFree(!dairyFree);  
          }

    return (
        <>
            { vegetarian ? <Burger onClick={handleVegetarian}>Vegetarian</Burger>: <p></p> }
            { vegan ? <Burger onClick={handleVegan}>Vegan</Burger>: <p></p> }
            { glutenFree ? <Burger onClick={handleGlutenFree}>glutenFree</Burger>: <p></p> }
            { dairyFree ? <Burger onClick={handleDairyFree}>dairyFree</Burger>: <p></p> }
            <FormStyle onSubmit={submitHandler}>
                <div className='mb-3'>
                    <FaSearch />
                    <input type="text" value={word} onChange={handleInputChange} placeholder='what are we craving...' />
                </div>
                {word && <Autocomplete>
                    {filteredOptions.map((item) => (
                        <Suggestion key={item.id} className='m-3'>
                            <div onClick={() => handleClick(item.title)}>{item.title}</div>
                        </Suggestion>
                    ))}
                </Autocomplete>}
            </FormStyle>
            <Dropdown>
                <DropdownButton className='custom-dropdown-button'>
                        <Dropdown.Item className='burger-dropdown-menu-item' eventKey="Vegetarian" onClick={handleVegetarian}>Vegetarian</Dropdown.Item>
                        <Dropdown.Item className='burger-dropdown-menu-item' eventKey="Vegan" onClick={handleVegan}>Vegan</Dropdown.Item>
                        <Dropdown.Item className='burger-dropdown-menu-item' eventKey="GlutenFree" onClick={handleGlutenFree}>Gluten Free</Dropdown.Item>
                        <Dropdown.Item className='burger-dropdown-menu-item' eventKey="DairyFree" onClick={handleDairyFree}>Dairy Free</Dropdown.Item>
                </DropdownButton>
            </Dropdown>
        </>
    );
};

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
    flex-direction: column;
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
export default Search;