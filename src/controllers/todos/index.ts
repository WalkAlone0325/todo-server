import { Response, Request } from "express";
import { ITodo } from "./../../types/todo";
import Todo from "../../models/todo";

// 获取
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

// 添加
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "desctiption" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.desctiption,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();
  } catch (error) {
    throw error;
  }
};

// 更新
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );

    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

// 删除
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo deleted",
      todo: deleteTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
