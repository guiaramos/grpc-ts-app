import * as admin from 'firebase-admin';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import * as serviceAccount from '../serviceAccountKey.json';
import { Todo, TodoService } from './services/Todo';
import { ServiceAccount } from 'firebase-admin';

// Firebase settings
admin.initializeApp({ credential: admin.credential.cert(serviceAccount as ServiceAccount) });

const port = process.env.PORT ?? 50051;

const server = new Server();

server.addService(TodoService, new Todo());
server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err != null) {
    throw err;
  }
  console.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());
  server.start();
});
