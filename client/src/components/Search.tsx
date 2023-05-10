import { ChangeEvent } from "react";
import { OptionType } from "../types";

type Props = {
  term: string;
  options: [];
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
  return (
    <main>
      <section className="search_header">
        <h1 className="search_title">WeatherWise</h1>
        {/* <p>Enter a city to check the weather!</p>
        <p>Clicking Favorite will add the city to your favorites list and reload anytime you use this app.</p> */}
        <p className="search_text">
          Type in your city into the search bar, <br />
          <br />
          click on the correct city,
          <br />
          <br />
          then click the search button!
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
