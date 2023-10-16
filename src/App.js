import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
// import Bottombar from "./components/Bottombar";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Sidebar />
        <Content />
      </div>
      {/* <Bottombar /> */}
    </Router>
  );
}

export default App;
