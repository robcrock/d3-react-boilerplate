import * as d3 from "d3";

function App() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const scale = d3.scaleLinear().domain([0, 10]).range(data);

  console.log("Scale", scale(100));

  return <div className="App"></div>;
}

export default App;
