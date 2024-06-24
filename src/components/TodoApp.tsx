//https://dev.to/w3tsa/an-introduction-to-typescript-building-a-simple-todo-app-with-react-1m2d
//The useState hook is imported from React, which allows the component to have state variables.

import { useState } from 'react';

//This interface defines the structure of a todo item, including its id, text, and completed properties.

//Defining Props Interface: interface defines the type of props the component accepts. In this case string and boolean

// In TypeScript, we often define interfaces to describe the shape of our objects. Let's start by defining the TodoItem 

interface TodoItem {
     id:string;
     text:string;
     completed:boolean;
}

     //The TodoApp component is defined as a functional component.

const TodoApp = () => {
     // Two state variables are defined using the useState hook:
     // todos: An array of TodoItem objects, initialized as an empty array.
     // newTodo: A string to hold the text for a new todo item, initialized as an empty string.
     
     //useState<TodoItem[] A TypeScript type annotation indicating that the state will be an array of TodoItem
     //[]: The initial state value, an empty array in this case

     const [todos, setTodos] = useState<TodoItem[]>([]);
     const [newTodo, setNewTodo] = useState('');

     const addTodo = () => {
          //checks if newTodo is not an empty string
       if (newTodo !== '') {
         const newId = crypto.randomUUID();
         //Creates a new TodoItem object with the generated ID, text from newTodo, and completed set to false.

         const newTodoItem: TodoItem = {
           id: newId,
           text: newTodo,
           completed: false,
         };
          //State Update: setTodos is a function that updates the state variable todos.
//Spread Operator (...): The spread operator ... is used to create a new array that includes all the current items in the todos array.
//creates a new array with all existing todos and adds newTodoItem at the end.
         setTodos([...todos, newTodoItem]);
         // clear the form 
         setNewTodo('');
       }
     };

     const removeTodo = (id: string) => {

          // The filter method creates a new array with all elements that pass the test implemented by the provided function.
       const updatedTodos = todos.filter((todo) => todo.id !== id);
       setTodos(updatedTodos);
     };

     const toggleComplete = (id: string) => {
          // The map method creates a new array populated with the results of calling a provided function on every element in the calling array

       const updatedTodos = todos.map((todo) => {
          
         if (todo.id === id) {
           return { ...todo, completed: !todo.completed };
         }
         return todo;
       });
       setTodos(updatedTodos);
     };

     return (
          <div className="p-4 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Todo App</h1>
            <div className="flex mb-4">
              <input
                className="border border-gray-300 rounded p-2 flex-grow"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white rounded p-2 ml-2"
                onClick={addTodo}
              >
                Add Todo
              </button>
            </div>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    <span
                      className={`flex-grow ${todo.completed ? 'line-through' : ''}`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    className="bg-red-500 text-white rounded p-2"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      };
      
      export default TodoApp;