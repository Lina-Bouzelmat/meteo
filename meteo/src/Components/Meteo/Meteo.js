import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Container = styled.div`
    color : #fefefe;
    width : 80vw;
    position : absolute;
    height : 50vh;
    left : 10vw;
    top : 25vh;
    background: rgba(255, 255, 255, 0.32);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(13.8px);
    -webkit-backdrop-filter: blur(13.8px);
    border: 2px solid rgba(255, 255, 255, 0.74);
    border-radius : 20px;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-evenly
`
const DataBlock = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    font-family : Lora
`
const TimeBlock = styled(DataBlock)`
    height : 20%
`
const DataSpan = styled.span`
    font-size : 2em;
    text-transform : uppercase;
    color : #fefafa;
`
const TempSpan = styled(DataSpan)`
    font-size : 3em
`
const City = styled.h1`
    font-size : 4.5em;
    display : flex;
    justify-content : center;
    text-transform : uppercase;
    position : absolute;
    top : -20%
`

const IconWeather = styled.img`
    width : 25%;
`

export default function Meteo() { 
    const [data, setData] = useState(false);
    const [icon, setIcon] = useState(false);

    const city = useSelector((state) => state.city.value);
    const lang = useSelector((state) => state.lang.value);

    useEffect(() => {
        getWeather();
    }, [lang, city]);

    useEffect(() => {
        if (data) {
            setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        }
    }, [data]);

    const getWeather = () => {
        if (city && lang) {
            const units = lang === 'fr' ? 'metric' : 'imperial';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}&lang=${lang}&units=${units}`;
            axios.get(url)
                .then((res) => setData(res.data))
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        alert('Erreur : Ville non trouvée');
                    } else {
                        alert(`Une erreur s'est produite: ${error.message}`);
                    }
                });
        }
    };

    return (
        <Container>
            {data && <City>{data.name}</City>}
            <TimeBlock>
                <DataSpan>Date & Heure</DataSpan>
            </TimeBlock>
            {icon && <IconWeather src={icon} />}
            {data && (
                <>
                    <DataBlock>
                        <TempSpan>
                            {data.main.temp}
                            {lang === 'fr' ? '°C' : '°F'}
                        </TempSpan>
                    </DataBlock>
                    <DataBlock>
                        <DataSpan>{data.weather[0].description}</DataSpan>
                    </DataBlock>
                </>
            )}
        </Container>
    );
}