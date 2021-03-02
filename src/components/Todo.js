/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

export default function Todo(props) {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoFiltered, setTodoFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filters, setFilters] = useState([
    { text: "All", val: "all", selected: true },
    { text: "Done", val: "done", selected: false },
    { text: "Undone", val: "undone", selected: false },
  ]);
  const [todoListStorage, setTodoListStorage] = useLocalStorage(
    "todo-list",
    "[]"
  );
  const inputEl = useRef(null);

  useEffect(() => {
    setTodoList(todoListStorage);
    inputEl.current.focus();
  }, []);

  useEffect(() => {
    setTodoListStorage(todoList);
  }, [todoList]);

  useEffect(() => {
    const newList = todoList.filter((task) => {
      switch (filter) {
        case "done":
          return task.done;
        case "undone":
          return !task.done;
        default:
          return true;
      }
    });
    setTodoFiltered(newList);
  }, [todoList, filter]);

  function handleSubmit(e) {
    e.preventDefault();
    if (text == "") return;

    const newList = todoList.concat({
      id: uuidv4(),
      text: text,
      done: false,
    });
    setText("");
    setTodoList(newList);
  }

  function handleTaskDone(task) {
    task.done = !task.done;
    const idx = todoList.indexOf(task);
    const newList = [...todoList];
    newList[idx] = task;
    setTodoList(newList);
  }

  function handleClickFilter(filter) {
    const filtersClone = [...filters];
    const newFilters = filtersClone.map((f) => {
      f.selected = false;
      if (filter.text == f.text) {
        f.selected = true;
        setFilter(filter.val);
      }
      return f;
    });
    setFilters(newFilters);
  }

  return (
    <div className="mx-auto grid grid-flow-col sm:w-full lg:w-1/2 grid-cols-3 shadow-md rounded-lg border border-indigo-200">
      <div className="bg-indigo-50 rounded-tl-lg rounded-bl-lg">
        <div className="py-4">
          <ul className="text-gray-800 text-sm">
            {filters.map((filter) => (
              <li
                key={filter.val}
                className={`px-4 py-1 hover:bg-indigo-200 cursor-pointer ${
                  filter.selected ? "bg-indigo-200" : ""
                }`}
                onClick={() => handleClickFilter(filter)}
              >
                {filter.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-2 h-72">
        <div className="p-4 rounded-tr-lg">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              name="text"
              type="text"
              className="w-full border h-8 rounded px-2 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300"
              placeholder="Add new task"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
              ref={inputEl}
            />
          </form>
        </div>
        <div className="mb-4">
          <TodoList
            onTaskDone={(task) => handleTaskDone(task)}
            list={todoFiltered}
          />
        </div>
      </div>
    </div>
  );
}
