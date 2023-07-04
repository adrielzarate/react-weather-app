import React, { useState } from 'react';
import { getCity } from '../../services/openweather';
import PlaceIcon from '../icons/place';
import './style.scss';

const City = (props) => {
    const [cities, setCities] = useState(null);
    const { onSelectCity } = props;
    let timer;

    const onInputChange = (e) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            const value = e.target.value;
            if (value.length > 2) {
                const citiesResponse = await getCity(value);
                const cities = citiesResponse.reduce((acc, curr) => {
                    const key = `${curr.name}, ${curr.state}, ${curr.country}`;
                    const value = {
                        lat: curr.lat,
                        lon: curr.lon,
                    }
                    const cityObj = { [key]: value };
                    acc = { ...acc, ...cityObj };
                    return acc;
                }, {});
                setCities(cities);
            } else {
                onClickHandler(null);
            }
        }, 300);
    };

    const onClickHandler = (cityCoords) => {
        onSelectCity(cityCoords);
        setCities(null);
    };

    return (
        <div className='container'>
            <input
                className="inputCityName"
                placeholder='Enter a City Name'
                onChange={(e) => onInputChange(e)}
            />
            {
                cities &&
                Object.keys(cities).length > 0 &&
                <div className='cities-list'>
                    {Object.keys(cities).map(city => {
                        return (
                            <div
                                key={city}
                                className='cities-item'
                                onClick={() => onClickHandler(cities[city])}
                            >
                                <PlaceIcon />
                                <div className='city-name'>{city}</div>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default City;