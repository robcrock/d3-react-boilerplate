import HistogramPage from "./pages/HistogramPage";

import WeatherDataProvider from "./components/charts/WeatherDataProvider";
import AlphabetDataProvider from "./components/charts/AlphabetDataProvider";
import BarChartPage from "./pages/BarChartPage";

function App() {
  return (
    <div className="App">
      {/* <WeatherDataProvider Consumer={HistogramPage} /> */}
      <AlphabetDataProvider Consumer={BarChartPage} />
    </div>
  );
}

export default App;
