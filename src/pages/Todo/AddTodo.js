import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../../store/todoService/todoSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    content: "",
    contentError: null,
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: null,
    });
  };
  const add = () => {
    if (content === "") {
      setState({ ...state, contentError: "Content must not be empty!" });
      return;
    }
    dispatch(addToDo({ newContent: content }));
    setState({ ...state, content: "" });
  };
  const { content, contentError } = state;
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
      {contentError ? console.log({ contentError }) : console.log("All Good")}
    </div>
  );
};

export default AddTodo;
