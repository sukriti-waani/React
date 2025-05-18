import { createContext, useContext } from "react"; // createContext: Used to create a new Context.  useContext: Used to access the value of a Context in any child component.

// This creates a new context object named TodoContext using createContext. he initial/default value passed is an empty object {}
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updatedTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext); // uses useContext(TodoContext) to access the current value of the TodoContext
};

export const TodoProvider = TodoContext.Provider; //  exports the Provider component of the TodoContext and names it Todoprovider
