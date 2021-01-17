import { credentials } from '@grpc/grpc-js';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { TodoClient } from '../models/todo_grpc_pb';
import { TodoItem } from '../models/todo_pb';

const client: TodoClient = new TodoClient('localhost:50051', credentials.createInsecure());
const text = process.argv[2];

if (!text) throw new Error('Missing text arg! example: "npm run dev:client laundry".');

const req: TodoItem = new TodoItem();
req.setId('');
req.setText(text);

client.createTodo(req, (err, res) => {
  console.log('createTodo: ', res.getText());
  console.log('error: ', err);
});

client.readTodos(new Empty(), (err, res) => {
  const list = res.getItemsList();
  list.forEach((item) => console.log('read todos from server: ', item.getText()));
  console.log('error: ', err);
});

const streamReadTodos = client.readTodosStream(new Empty());

streamReadTodos
  .on('data', (res: TodoItem) => console.log('received item from server: ', res.getText()))
  .on('end', () => console.log('server done!'))
  .on('error', (e) => console.log('Error from server: ', e));
