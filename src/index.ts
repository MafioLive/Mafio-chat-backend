import * as express from 'express';
import * as cors from 'cors';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {
    addUser,
    removeUser,
    getUsersInRoom
} from "./actions";

/* This code is setting up a basic server using the Express framework in Node.js. It creates an
instance of the Express application, sets the port to either the value of the `PORT` environment
variable or 8000 if it is not defined, enables Cross-Origin Resource Sharing (CORS) using the
`cors()` middleware, creates an HTTP server using the `createServer()` method from the Node.js
`http` module, and creates a new instance of the Socket.IO server using the `Server()` constructor.
The `cors` option in the Socket.IO server configuration allows all origins to access the server. */

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket: Socket) => {
    console.log("connection created");

    // Join a conversation
    const { room, name } = socket.handshake.query;

    const { user } = addUser({ id: socket.id, name: name, room: room });

    socket.join(user.room);

    io.in(user.room).emit('allUsersData', {
        room: user.room,
        users: getUsersInRoom(user.room)
    });
    console.log("getUsersInRoom", getUsersInRoom(user.room))

    // Listen for new messages
    socket.on("send message", (data) => {
        io.in(user.room).emit("send message", data);
    });

    // Listen typing events
    socket.on("start typing message", (data) => {
        io.in(user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", (data) => {
        io.in(user.room).emit("stop typing message", data);
    });

/* This code is listening for a "disconnect" event on the socket, which is triggered when a client
disconnects from the server. When this event is triggered, the code logs a message to the console
indicating which user has left the chat, removes the user from the list of users in the room, emits
a "user leave chat" event to all clients in the room, and removes the socket from the room. */
    socket.on("disconnect", () => {
        console.log(`${socket.id}: (${user.name}) left chat!`);
        removeUser(socket.id);
        io.in(user.room).emit("user leave chat", user);
        socket.leave(user.room as string);
    });
});


/* This code is setting up a basic HTTP server using the Express framework in Node.js. The `app.get()`
method is defining a route for the root URL (`/`) and sending a response to the client. The
`server.listen()` method is starting the server and listening for incoming requests on the specified
port. When the server starts, it logs a message to the console indicating which port it is running
on. */
app.get('/', function (req, res) {
    res.send("Your on the backend Mr.Maur Make sure you run 'yarn start' in the FrontEnd Directory");
});

server.listen(port, () =>
    console.log(`App running on port ${port}.`)
);