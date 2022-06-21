import "./App.css";
import LoinPage from "./pages/LoginPage/LoginPage";
import TrelloPage from "./pages/TrelloPage/TrelloPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoinPage />} />
        <Route path="/trello" element={<TrelloPage />} />
      </Routes>
      {/* <Link to="/login">로그인!!!</Link>
      <Link to="/trello">트렐로!!!</Link> */}
    </>
  );
}

export default App;
