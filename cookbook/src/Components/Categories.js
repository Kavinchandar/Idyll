import { FaPizzaSlice } from'react-icons/fa';
import { GiNoodles, GiChopsticks } from'react-icons/gi';
import { BiBowlRice } from'react-icons/bi';
import { GiFastNoodles } from'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Category = () => {

    return(
        <>
            <List className='mt-5'>
                <SLink to="/cuisine/Italian">
                    <FaPizzaSlice />
                    <h4>Italian</h4>
                </SLink>
                <SLink to="/cuisine/Thai">
                    <GiNoodles/>
                    <h4>Thai</h4>
                </SLink>
                <SLink to="/cuisine/Japanese">
                    <GiChopsticks/>
                    <h4>Japanese</h4>
                </SLink>
                <SLink to="/cuisine/Indian">
                    <BiBowlRice/>
                    <h4>Indian</h4>
                </SLink>
                <SLink to="/cuisine/Chinese">
                    <GiFastNoodles/>
                    <h4>Chinese</h4>
                </SLink>
            </List>
        </>
    );
};

const List = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 3rem;
    text-decoration: none;
    background: #f5f5f5;
    width: 8rem;
    height: 8rem;
    coursor: pointer;
    transform: scale(0.8);
    border-radius: 50%;

    h4 {
        color: #81BAB4;
        font-size: 1.3rem;
    }

    svg{
        color: #81BAB4;
        font-size: 3rem;
    }
    &.active {
        background: linear-gradient(to right, #81BAB4, #e94057);

        svg {
            color: white;
        }

        h4 {
            color: white;
        }
    }
    &:hover {
        svg {
            font-size: 5rem;
        }

        h4 {
            font-size: 2rem;
        }
    }

`;

export default Category;