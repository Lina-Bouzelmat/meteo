import styled from "styled-components"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCity } from "../../redux/citySlice"

const Container = styled.div`
    position : absolute;
    width : 70vw;
    bottom : 10%;
    left : 15vw;
    display : flex;
    justify-content : space-between;
    height : 5vh;
`
const Input = styled.input`
    width : 70%;
    border-radius : 10px;
    background: rgba(255, 255, 255, 0.32);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(13.8px);
    -webkit-backdrop-filter: blur(13.8px);
    border: 1px solid rgba(255, 255, 255, 0.74);
    font-size : 1.5em;
    text-transform : uppercase;
    color : #fafefe;
`
const Button = styled.button`
    background-color : #233333;
    color : #fafefe;
    border-radius : 10px;
    width : 25%;
`
export default function CityInput(){
    const [inputValue, setInputValue] = useState("")
    const lang = useSelector((state) => state.lang.value)
    const dispatch = useDispatch()

    const changeCity = () => {
        dispatch(setCity(inputValue))
    }
    
    return(
        <Container>        
            <Input 
                type='text' 
                placeholder={lang === 'fr' ? 'Nom de la ville' : 'City Name'}
                onChange={(e)=>{setInputValue(e.target.value)}}
            />
            <Button onClick={changeCity}>
                {lang === 'fr' ? 'Changer de ville' : 'Change City'}
            </Button>
        </Container>
    )
}