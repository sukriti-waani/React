import React, { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo(); // Accesses the addTodo function from the context using the custom hook useTodo()

  const add = (e) => {
    //  A function to handle the form submission when a new todo is added
    e.preventDefault();

    if (!todo) return; //  Stops the function if the input is empty (no todo entered)

    addTodo({ todo, completed: false }); //  Calls the addTodo function with a new todo objects

    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
