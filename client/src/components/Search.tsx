import { ChangeEvent } from 'react';
import { OptionType } from '../types';

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
        <h1 className="search_title">Weather Forecast</h1>
        <p>Enter a city to check the weather!</p>

        <div className="input_button">
          <input
            type="text"
            value={term}
            className=""
            onChange={onInputChange}
          />
          <ul className="list">
            {options.map((option: OptionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  className="optionButton"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={onSubmit}>Search</button>
        </div>
      </section>
    </main>
  );
};

export default Search;
