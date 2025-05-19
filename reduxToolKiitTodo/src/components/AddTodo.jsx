import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch(); // It gives you access to the dispatch function so we can send actions to the Redux store. We're preparing to dispatch the addTodo action when the user submits a todo.

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input)); // Dispatches the addTodo action with the input value as the payload. This tells the Redux store to add a new todo item with that text (handled in your todoSlice).
    setInput(""); // Clears the input field after submitting, resetting it to an empty string so the user can type a new todo.
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) =>setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
