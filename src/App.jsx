import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); // array which holds all the todos

  const handleEdit = (id) => {
    const editedTodo = prompt("Edit the todo:");
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, todo: editedTodo } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([
        ...todos,
        { id: uuidv4(), todo: todo.trim(), isCompleted: false },
      ]);
      setTodo("");
    } else {
      alert("Todo cannot be empty");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value); // For input change
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-3/4 lg:w-1/2">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add your task</h2>
          <div className="flex flex-col sm:flex-row">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full sm:w-full p-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-md"
              placeholder="Enter a new todo"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 p-3 py-2 transition-all duration-200 text-white rounded-md w-full sm:w-auto"
            >
              Add
            </button>
          </div>
        </div>
        <h2 className="text-lg font-bold">Your tasks</h2>
        <div className="todos">
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex flex-col sm:flex-row w-full sm:w-2/3 justify-between my-3 p-2 border-b border-gray-300"
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="mr-2"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-md"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
