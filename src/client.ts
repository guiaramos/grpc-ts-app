import { credentials } from '@grpc/grpc-js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { TodoClient } from '../models/todo_grpc_pb';
import { TodoItem } from '../models/todo_pb';

const client: TodoClient = new TodoClient('localhost:50051', credentials.createInsecure());

const req: TodoItem = new TodoItem();
req.setId('');
req.setText('Do Laundry');

client.createTodo(req, (err, res) => {
  console.log('createTodo: ' + JSON.stringify(res));
  console.log('error: ', err);
});

client.readTodos(new Empty(), (err, res) => {
  console.log('readTodos: ' + JSON.stringify(res));
  console.log('error: ', err);
});
