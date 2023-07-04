import React from 'react';
import './style.scss';

const Footer = ({ weather }) => {
    const { humidity, visibility, wind } = weather;

    return (
        <div className="card-footer">
            <div className='col'>
                <div className='value'>{humidity}%</div>
                <div>Humidity</div>
            </div>
            <div className='col'>
                <div className='value'>{visibility}m</div>
                <div>Visibility</div>
            </div>
            <div className='col'>
                <div className='value'>{wind}m/s</div>
                <div>Wind</div>
            </div>
        </div>
    );
};

export default Footer;