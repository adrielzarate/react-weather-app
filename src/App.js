import './App.scss';
import Header from './components/header';
import Footer from './components/footer';
import Loading from './components/loading';
import { getWeather } from './services/openweather';
import { useState } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [headerData, setHeaderData] = useState(null);
    const [footerData, setFooterData] = useState(null);
    const [bgImage, setBgImage] = useState('');
    const [updateInterval, setUpdateInterval] = useState(0);
    let refreshWeatherTime = 1000 * 60 * 5;

    const updateWeatherData = async (coords) => {
        setIsLoading(true);

        const weatherResponse = await getWeather(coords.lat, coords.lon);
        const temperature = weatherResponse.main.temp;
        const description = weatherResponse.weather[0].description;
        const humidity = weatherResponse.main.humidity;
        const visibility = weatherResponse.visibility;
        const wind = weatherResponse.wind.speed;
        const bgImage = 'bg-' + weatherResponse.weather[0].icon;

        setHeaderData({ temperature, description });
        setFooterData({ humidity, visibility, wind });
        setBgImage(bgImage);
        setIsLoading(false);
    };

    const refreshingWeatherData = (coords) => {
        const interval = setInterval(async () => {
            await updateWeatherData(coords);
        }, refreshWeatherTime);
        setUpdateInterval(interval);
    };

    const onSelectCity = async (coords) => {
        clearInterval(updateInterval);
        setUpdateInterval(0);
        if (coords) {
            await updateWeatherData(coords);
            refreshingWeatherData(coords);
        } else {
            setHeaderData(null);
            setFooterData(null);
            setBgImage('');
        }
    }

    return (
        <div className={'card ' + (bgImage && bgImage)}>
            {isLoading && <Loading />}
            <div className={'card-container ' + (isLoading && 'is-loading')}>
                <Header weather={headerData} onSelectCity={onSelectCity} />
                {footerData && <Footer weather={footerData} />}
            </div>
        </div>
    );
}

export default App;
