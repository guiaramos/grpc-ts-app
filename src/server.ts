import { Server, ServerCredentials } from '@grpc/grpc-js'
import { Todo, TodoService } from './services/Todo'

const port = process.env.PORT ?? 50051

const server = new Server({
  'grpc.max_receive_message_length': -1,
  'grpc.max_send_message_length': -1
})

server.addService(TodoService, new Todo())
server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err != null) {
    throw err
  }
  console.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString())
  server.start()
})
