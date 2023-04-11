import axios from 'axios';
import { useState } from 'react';
import { forecastType } from '../types';

type Props = {
  data: forecastType;
  onDelete: () => void;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

const Forecast = ({ data, onDelete }: Props): JSX.Element => {
  const today = data.list[0];
  // const [favorited, setFavorited] = useState(data.isFavorite || false);

  const handleFavoriteClick = async () => {
    try {
      const requestBody = {
        name: data.name,
        country: data.country,
        coord: data.coord,
      };
      await axios.post(`/api/favorites/`, requestBody);
      // setFavorited(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
      <div className={`weather_card`}>
        <section>
          <h2>
            {data.name}
            <span>, {data.country}</span>
          </h2>
          <h1>
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p>
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p>
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>
        <div>
          <button className="card_button" onClick={onDelete}>
            Delete
          </button>
          
          <button
          className="card_button"
            // className={`card_button ${favorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
          >
            Favorite
          </button>
          <p>Scroll to the right to see the today's forecast!</p>
          </div>

        <section className="weather_display">
          {data.list.map((item, i) => (
            <div className="weather_display_icon" key={i}>
              <p className="weather_display_text">
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="weather_display_temp">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        </div>
        </div>
        );
      };
      
export default Forecast;
