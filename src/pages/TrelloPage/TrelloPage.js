import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "./Nav/Nav";
import TodoContainer from "./TodoContainer/TodoConatainer";

const TrelloPage = () => {
  const dispatch = useDispatch();

  let accessToken = useSelector((state) => {
    return state.token;
  });

  let boardData = useSelector((state) => {
    return state.boardData;
  });
  console.log("컨테이너쪽:", boardData);
  let { id } = useParams();
  const [TitleData, setTitleData] = useState([]);
  const [TitleValue, setTitleValue] = useState("");
  const [render, setRender] = useState(true);
  const rendering = () => {
    setRender(!render);
  };

  return (
    <div>
      <Nav boardData={boardData} />
      <TodoContainer
        TitleValue={TitleValue}
        setTitleValue={setTitleValue}
        TitleData={TitleData}
        setTitleData={setTitleData}
        id={id}
        boardData={boardData}
        render={render}
        setRender={setRender}
        rendering={rendering}
      />
    </div>
  );
};

export default TrelloPage;
