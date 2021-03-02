/* eslint-disable react/prop-types */
import React from "react";
import { CheckCircleOutline } from "heroicons-react";

export default function TodoList(props) {
  function handleTaskDone(task) {
    props.onTaskDone(task);
  }

  return (
    <ul>
      {props.list.map((task) => (
        <li
          onClick={() => handleTaskDone(task)}
          key={task.id}
          className={`px-3 py-1 flex items-center cursor-pointer ${
            task.done ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {task.done && <CheckCircleOutline />}
          <span className="ml-1">{task.text}</span>
        </li>
      ))}
    </ul>
  );
}
