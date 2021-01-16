import * as admin from 'firebase-admin';
import { sendUnaryData, ServerUnaryCall, status, UntypedHandleCall } from '@grpc/grpc-js';
import { TodoService, ITodoServer } from './../../models/todo_grpc_pb';
import { TodoItem, TodoItems } from './../../models/todo_pb';
import { ServiceError } from '../utils/error';

/**
 * package todo
 * service Todo
 */
class Todo implements ITodoServer {
  // Argument of type 'Todo' is not assignable to parameter of type 'UntypedServiceImplementation'.
  // Index signature is missing in type 'Todo'.ts(2345)
  [method: string]: UntypedHandleCall;

  public async createTodo(call: ServerUnaryCall<TodoItem, TodoItem>, callback: sendUnaryData<TodoItem>): Promise<void> {
    const db = admin.firestore();
    const collection = db.collection('todos');
    const res = await collection.add({ text: call.request.getText() });

    const todoRef = collection.doc(res.id);
    const doc = await todoRef.get();
    const data = doc.data();

    if (!doc.exists) return callback(new ServiceError(status.DATA_LOSS, 'Error on create data'), null);

    const todo: TodoItem = new TodoItem();
    todo.setId(res.id);
    todo.setText(data?.text);

    callback(null, todo);
  }

  public async readTodos(call: ServerUnaryCall<any, any>, callback: sendUnaryData<TodoItems>): Promise<void> {
    const db = admin.firestore();
    const collection = db.collection('todos');
    const snapshot = await collection.get();

    if (snapshot.empty) callback(new ServiceError(status.NOT_FOUND, 'No todo found'), null);

    const todos: TodoItems = new TodoItems();

    snapshot.forEach((doc) => {
      const todo: TodoItem = new TodoItem();
      todo.setId(doc.id);
      todo.setText(doc.data().text);
      todos.addItems(todo);
    });

    callback(null, todos);
  }
}

export { TodoService, Todo };
