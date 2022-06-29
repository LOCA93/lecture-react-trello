import TodoCard from "./TodoCard/TodoCard";
import "./style.css";
import { GoTrashcan, GoPencil } from "react-icons/go";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { changeBoardData } from "../../../../../store";

const TodoBox = ({
  boardData,
  id,
  setTitleData,
  setTitleValue,
  TitleData,
  TitleValue,
  handleChange,
  rendering,
  item,
}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.token);
  const [editToggle, setEditToggle] = useState(true);
  const [cardToggle, setCardToggle] = useState(true);
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3010/cards/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("카드가져오기성공", res);
        if (res.status === 200) {
          const data = res.data;
          const cardData = data.item;

          console.log("item:", item);
          console.log("item.cards:", item.cards);
          console.log("cardData:", cardData);
          console.log("boardData:", boardData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardData]);

  const editToggler = () => {
    setEditToggle(!editToggle);
    console.log(editToggle);
  };
  const onRemove = () => {
    axios
      .delete(`http://localhost:3010/lists/${item.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("삭제성공", res);
        rendering();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTitleValue(TitleValue);
    const data = {
      title: TitleValue,
    };
    setTitleData([...TitleData, data]);

    axios
      .put(`http://localhost:3010/lists/${item.id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("리스트수정성공!", res);
        rendering();
        editToggler();
        setTitleValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoChange = () => {};
  const todoSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="TodoBox">
      {editToggle === true ? (
        <div className="todoTitle">
          {item.title}
          <button className="titleEditBtn" onClick={editToggler}>
            <GoPencil />
          </button>
          <button className="titleDeleteBtn" onClick={onRemove}>
            <GoTrashcan />
          </button>
        </div>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={handleEditSubmit}>
          <input className="addTodoBoxInput" onChange={handleChange} value={TitleValue}></input>
          <button type="submit" className="enterBtn">
            Enter!
          </button>
        </form>
      )}
      <ul className="todos">
        {/* {cardList.map(() => {
          console.log(item);
          return <TodoCard />;
        })} */}
      </ul>

      {cardToggle === true ? (
        <button
          className="todoBoxAddBtn"
          onClick={() => {
            setCardToggle(!cardToggle);
            console.log(cardToggle);
          }}
        >
          +Add Cart
        </button>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={todoSubmit}>
          <input className="addTodoBoxInput" onChange={todoChange} value={todoValue}></input>
          <button type="submit" className="enterBtn">
            Enter!
          </button>
        </form>
      )}
    </div>
  );
};

export default TodoBox;
