import React, { useState } from "react";
import { useTodo } from "../context";

// Component to render a single todo item
function TodoItem({ todo }) {
  // State to track whether the current todo is in "edit mode"
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  // State to store the current message of the todo (used when editing)
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  // Getting functions from context: to update, delete, or toggle a todo
  const { updatedTodo, deleteTodo, toggleComplete } = useTodo();

  // Function to save the edited todo
  const editTodo = () => {
    // Call the update function from context with new message
    updatedTodo(todo.id, { ...todo, todo: todoMsg });

    // Turn off edit mode
    setIsTodoEditable(false);
  };

  // Function to mark todo as complete/incomplete
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black 
        ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`} // Green background if completed, purple if not
    >
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Input to display/edit the todo message */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg 
          ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} 
          ${todo.completed ? "line-through" : ""}`} // Line-through if completed
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable} // Only editable if edit mode is ON
      />

      {/* Edit or Save button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center 
        bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          // Prevent editing if todo is already marked completed
          if (todo.completed) return;

          // If in edit mode, save changes; else enable edit mode
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed} // Disable button if todo is completed
      >
        {isTodoEditable ? "📁" : "✏️"}{" "}
        {/* Show Save icon (📁) or Edit icon (✏️) */}
      </button>

      {/* Delete button to remove the todo */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center 
        bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
