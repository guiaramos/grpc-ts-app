import { credentials } from '@grpc/grpc-js';
import { TodoClient } from '../models/todo_grpc_pb';
import { TodoItem } from '../models/todo_pb';

const client: TodoClient = new TodoClient('localhost:50051', credentials.createInsecure());

const req: TodoItem = new TodoItem();
req.setId(-1);
req.setText('Do Laundry');

client.createTodo(req, (err, res) => {
  console.log('Received from server ' + JSON.stringify(res));
  console.log('error: ', err);
});
