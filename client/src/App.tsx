import Search from './components/Search';
import useForecast from './hooks/useForecast';
import Forecast from './components/Forecast';

const App = (): JSX.Element => {
  const { term, options, forecasts, onInputChange, onOptionSelect, onSubmit, deleteForecast } =
    useForecast();

  return (
    <main>
      {forecasts ? (
        <>
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
        <div className='forecasts_div'>
        {forecasts.map((forecast, index) => (
          <Forecast key={index} data={forecast} onDelete={() => deleteForecast(index)}/>
        ))}
        </div>
        </>
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};

export default App;
