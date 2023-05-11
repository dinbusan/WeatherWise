import { ChangeEvent, useEffect } from "react";
import { OptionType } from "../types";

interface KeyboardEvent {
  key: string;
}

type Props = {
  term: string;
  options: OptionType[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: OptionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === "Enter") {
    onSubmit();
  }
};

useEffect(() => {
  document.addEventListener("keydown", handleKeyDown);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [onSubmit]);


  return (
    <main>
      <section className="search_header">
        <h1 className="search_title">WeatherWise</h1>
        <p className="search_text">
          Type in your city into the search bar, click on the correct city,{" "}
         
          {" "}then click the search button, or press Enter!
          <br />
          <br />
          If you select favorite your city will be reloaded each time you use
          this app.
        </p>
        <div className="input_button">
          <div className="input-and-list">
            <input
              type="text"
              value={term}
              placeholder="Enter a city..."
              className="input_field"
              onChange={onInputChange}
            />
            <div className="list">
              {options.map((option: OptionType, index: number) => (
                <div
                  className="search-option"
                  key={option.name + "-" + index}
                  onClick={() => {
                    onOptionSelect(option);
                    console.log(option);
                  }}
                >
                  {option.name}, {option.state}, {option.country}
                </div>
              ))}
            </div>
          </div>

          <button className="searchButton" onClick={onSubmit}>
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;
