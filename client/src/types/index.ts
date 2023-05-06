export type OptionType = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

export type forecastType = {
    isFavorite: boolean;
    name: string,
    country: string,
    sunrise: number, 
    coord: object
    sunset: number, 
    list: [{
        dt:number,
        main:{
            feels_like: number;
            humidity: number;
            pressure: number;
            temp: number;
            temp_max: number;
            temp_min: number;
        }
        weather:[{
            main: string,
            icon:string, 
            description: string
        }]
        wind: {
            speed: number,
            gust: number,
            deg: number
        }
        clouds: {
            all: number, 
        }
        pop: number
        visibility: number
    }]
}


export type useForecastType = {
  term: string;
  options: OptionType[];
  forecast: forecastType;
  onInputChange: (term: string) => void;
  onOptionSelect: (option: OptionType) => void;
  onSubmit: () => void;
}
