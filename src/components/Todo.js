import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      todoList: [],
      filter: "all",
      filters: [
        { text: "All", val: "all", selected: true },
        { text: "Done", val: "done", selected: false },
        { text: "Undone", val: "undone", selected: false },
      ],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text == "") return;

    const newList = this.state.todoList.concat({
      id: uuidv4(),
      text: this.state.text,
      done: false,
    });
    this.setState({ text: "", todoList: newList });
  }

  handleTaskDone(task) {
    task.done = !task.done;
    const idx = this.state.todoList.indexOf(task);
    const newList = [...this.state.todoList];
    newList[idx] = task;
    this.setState(newList);
  }

  handleInput(e) {
    this.setState({
      text: e.target.value,
    });
  }

  todoListFilter() {
    return this.state.todoList.filter((task) => {
      switch (this.state.filter) {
        case "done":
          return task.done;
        case "undone":
          return !task.done;
        default:
          return true;
      }
    });
  }

  handleClickFilter(filter) {
    const filters = [...this.state.filters];
    const newFilters = filters.map((f) => {
      f.selected = false;
      if (filter.text == f.text) {
        f.selected = true;
        this.setState({ filter: filter.val });
      }
      return f;
    });
    this.setState({ filters: newFilters });
  }

  componentDidMount() {
    let todoListSaved = localStorage.getItem("todo-list") || "[]";
    this.setState({ todoList: JSON.parse(todoListSaved) });
  }

  componentDidUpdate() {
    localStorage.setItem("todo-list", JSON.stringify(this.state.todoList));
  }

  render() {
    return (
      <div className="mx-auto grid grid-flow-col sm:w-full lg:w-1/2 grid-cols-3 shadow-md rounded-lg border border-indigo-200">
        <div className="bg-indigo-50 rounded-tl-lg rounded-bl-lg">
          <div className="py-4">
            <ul className="text-gray-800 text-sm">
              {this.state.filters.map((filter) => (
                <li
                  key={filter.val}
                  className={`px-4 py-1 hover:bg-indigo-200 cursor-pointer ${
                    filter.selected ? "bg-indigo-200" : ""
                  }`}
                  onClick={this.handleClickFilter.bind(this, filter)}
                >
                  {filter.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 h-72">
          <div className="p-4 rounded-tr-lg">
            <form onSubmit={this.handleSubmit}>
              <input
                name="text"
                type="text"
                className="w-full border h-8 rounded px-2 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300"
                placeholder="Add new task"
                value={this.state.text}
                onChange={this.handleInput}
                autoComplete="off"
              />
            </form>
          </div>
          <div className="mb-4">
            <TodoList
              onTaskDone={this.handleTaskDone}
              list={this.todoListFilter.bind(this)()}
            />
          </div>
        </div>
      </div>
    );
  }
}
