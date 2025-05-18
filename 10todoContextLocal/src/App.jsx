import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  //  This function adds a new todo item to the top of the existing todo list.
  //  It gives the new todo a unique id using Date.now().
  //  ...todo copies the rest of the todo data.
  //  ...prev keeps the old todos.
  //  setTodos updates the todo state safely using the previous state.
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // The updatedTodo function updates a specific todo item by matching its id. It uses map to go through the todo list and replaces the matched item with the new todo, while keeping the rest unchanged.
  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // It uses filter to keep only those todos whose ID does not match the given id, effectively deleting the one with the matching ID.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ...prev keeps the old todos. ...prev, completed: true adds a completed property to each todo, marking it as completed.
  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    // This useEffect runs once when the component mounts (because of the empty [] dependency array).
    const todos = JSON.parse(localStorage.getItem("todos")); //Gets the saved todos (as a JSON string) from the browser's local storage.

    if (todos && todos.length > 0) {
      // Checks if there are any saved todos
      setTodos(todos); // Sets them into the state so they show up in your app.
    }
  }, []);

  useEffect(() => {
    // This useEffect runs whenever the todos state changes (because of the todos dependency array).
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // saves that string in the browser's local storage under the key "todos".

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
