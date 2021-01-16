import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js';
import { TodoService, ITodoServer } from './../../models/todo_grpc_pb';
import { TodoItem, TodoItems } from './../../models/todo_pb';

/**
 * package todo
 * service Todo
 */
class Todo implements ITodoServer {
  // Argument of type 'Todo' is not assignable to parameter of type 'UntypedServiceImplementation'.
  // Index signature is missing in type 'Todo'.ts(2345)
  [method: string]: UntypedHandleCall;

  public createTodo(call: ServerUnaryCall<TodoItem, TodoItem>, callback: sendUnaryData<TodoItem>): void {
    const todo: TodoItem = new TodoItem();
    todo.setId(call.request.getId());
    todo.setText(call.request.getText());

    callback(null, todo);
  }

  public readTodos(_, callback: sendUnaryData<TodoItems>): void {}
}

export { TodoService, Todo };
