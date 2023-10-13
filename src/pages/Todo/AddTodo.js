import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../../store/todoService/todoSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    content: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const add = () => {
    if (content === "") {
      setState({ ...state });
      return;
    }
    dispatch(addToDo({ newContent: content }));
    setState({ ...state, content: "" });
  };
  const { content } = state;
  return (
    <div className="">
      <h2 className="text-black">Add Todo</h2>
      <input
        type="text"
        value={content}
        name="content"
        onChange={handleChange}
        className="text-black"
      />
      <button type="button" className="text-black rounded bg-red" onClick={add}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;
