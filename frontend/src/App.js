import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import IdentifyShortestPath from "./Pages/IdentifyShortestPath"
import Error from "./Pages/Error"
import './Assets/Styles/App.css';

function App() {

  return (
    <div className="App">

      <Router>


        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/identify_shortest_path" element={<IdentifyShortestPath />} />

          <Route path="*" element={<Error />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
