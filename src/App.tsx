import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/ItemList";
import styles from "./App.module.css";
import TodoService from "./Services/Spica.service";

export interface TodoItemInterface {
  title: string;
  _id: string;
  completed: boolean;
}
const App = () => {
  const [todos, setTodos] = useState<TodoItemInterface[]>([]);

  useEffect(() => {
    TodoService.getAllRealtime().subscribe((res: any) => setTodos(res));
  }, []);

  const updateTodoItemStatus = (_id: string) => {
    TodoService.update(_id, {
      completed: !todos.find((item) => item._id === _id)?.completed,
    }).catch((err) => console.log(err));
  };

  const deleteTodoItem = (_id: string) => {
    TodoService.remove(_id).catch((err) => console.log(err));
  };

  const addTodoItem = (title: string) => {
    const newTodo = {
      title,
      completed: false,
    };
    TodoService.insert(newTodo).catch((err) => console.log(err));
  };

  const setUpdatedTodoItem = (updatedTitle: string, _id: string) => {
    setTodos(
      todos.map((todo: TodoItemInterface) => {
        if (todo._id === _id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };
  const updateTodoItemTitle = (_id: string) => {
    TodoService.update(_id, {
      title: todos.find((item) => item._id === _id)?.title,
    }).catch((err) => console.log(err));
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <div className={styles.inner}>
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodoList
                  todos={todos}
                  updateTodoItemTitle={updateTodoItemTitle}
                  handleChangeProps={updateTodoItemStatus}
                  deleteTodoProps={deleteTodoItem}
                  setUpdate={setUpdatedTodoItem}
                />
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;