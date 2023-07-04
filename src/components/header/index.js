import React from 'react';
import City from '../city';
import './style.scss';

const Header = ({ weather, onSelectCity }) => {

    return (
        <div className="card-header">
            <div className='details'>
                <City onSelectCity={onSelectCity} />
                {
                    weather &&
                    <div className='weather'>
                        <span className='value'>{weather.description}</span>
                    </div>
                }
            </div>

            {
                weather &&
                <div className="temperature">
                    <span className='value'>{Math.floor(weather.temperature)}°C</span>
                </div>
            }
        </div>
    );
};

export default Header;