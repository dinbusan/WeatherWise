import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CLIENT_RENEG_LIMIT } from "tls";
import { OptionType, forecastType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<OptionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecasts, setForecasts] = useState<forecastType[]>([]);

  const getInitialFavorites = async () => {
    try {
      const response = await axios.get("https://europe-west1-weatherwise-543ec.cloudfunctions.net/app/api/favorites");
      const data = response.data[0].places;
      const initialData = data.map((item: any) => {
        const { lat, lon } = item.coord;
        const name = item.name;
        return { name, lat, lon };
      });

      const newForecasts = [];
      for (const city of initialData) {
        const response = await axios.get(
          `https://europe-west1-weatherwise-543ec.cloudfunctions.net/app/api/weather/${city.lat}/${city.lon}`
        );
        const newForecast = response.data;
        newForecasts.push(newForecast);
      }

      setForecasts([...forecasts, ...newForecasts]);
    } catch (error) {
      console.error(error);
      throw new Error("Error");
    }
  };

  const getSearchOptions = async (value: string) => {
    const apiKey = "10f3b9293d761df72964a0fe6e00e4f1";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=${5}&appid=${apiKey}`
      );
      const data = response.data;
      setOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteForecast = async (index: number) => {
    try {
      await axios.delete(`https://europe-west1-weatherwise-543ec.cloudfunctions.net/app/api/favorites/${index}`);
      setForecasts((prevForecasts) =>
        prevForecasts.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;

    getSearchOptions(value);
  };

  const getForecast = async (city: OptionType) => {
    try {
      const response = await axios.get(`https://europe-west1-weatherwise-543ec.cloudfunctions.net/app/api/weather/${city.lat}/${city.lon}`);
      const newForecast = response.data;
      setForecasts([newForecast, ...forecasts]);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
    setTerm("");
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
  };

  useEffect(() => {
    getInitialFavorites();
  }, []);

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
      console.log(1, 'console logging something')
    }
  }, [city]);

  return {
    term,
    options,
    forecasts,
    onInputChange,
    onOptionSelect,
    onSubmit,
    deleteForecast,
    getInitialFavorites,
  };
};

export default useForecast;
