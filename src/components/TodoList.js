/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { CheckCircleOutline } from "heroicons-react";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  handleTaskDone(task) {
    this.props.onTaskDone(task);
  }

  taskClass(done) {
    let className = "px-3 py-1 flex items-center cursor-pointer ";
    if (done) {
      className += "text-gray-400";
    } else {
      className += "text-gray-800";
    }
    return className;
  }

  render() {
    return (
      <ul>
        {this.props.list.map((task) => (
          <li
            onClick={this.handleTaskDone.bind(this, task)}
            key={task.id}
            className={this.taskClass.bind(this, task.done)()}
          >
            {task.done && <CheckCircleOutline />}
            <span className="ml-1">{task.text}</span>
          </li>
        ))}
      </ul>
    );
  }
}
