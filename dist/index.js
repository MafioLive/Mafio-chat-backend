"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var actions_1 = require("./actions");
var app = express();
var port = process.env.PORT || 8000;
app.use(cors());
var server = http_1.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    }
});
/* This code block is creating a socket connection and handling various events related to the chat
application. */
io.on("connection", function (socket) {
    console.log("connection created");
    // Join a conversation
    var _a = socket.handshake.query, room = _a.room, name = _a.name;
    var user = actions_1.addUser({ id: socket.id, name: name, room: room }).user;
    socket.join(user.room);
    io.in(user.room).emit('allUsersData', {
        room: user.room,
        users: actions_1.getUsersInRoom(user.room)
    });
    console.log("getUsersInRoom", actions_1.getUsersInRoom(user.room));
    // Listen for new messages
    socket.on("send message", function (data) {
        io.in(user.room).emit("send message", data);
    });
    // Listen typing events
    socket.on("start typing message", function (data) {
        io.in(user.room).emit("start typing message", data);
    });
    socket.on("stop typing message", function (data) {
        io.in(user.room).emit("stop typing message", data);
    });
    socket.on("disconnect", function () {
        console.log(socket.id + ": (" + user.name + ") left chat!");
        actions_1.removeUser(socket.id);
        io.in(user.room).emit("user leave chat", user);
        socket.leave(user.room);
    });
});
/* This code block is creating a route for the root URL of the server. When a GET request is made to
the root URL, the server responds with a message "Your on the backend Mr.Maur Make sure you run
'yarn start' in the FrontEnd Directory". */
app.get('/', function (req, res) {
    res.send("Your on the backend Mr.Maur Make sure you run 'yarn start' in the FrontEnd Directory");
});
/* `server.listen(port, function () { return console.log("App running on port " + port + "."); });` is
starting the server and listening for incoming requests on the specified port. When the server
starts running, it logs a message to the console indicating that the app is running on the specified
port. */
server.listen(port, function () {
    return console.log("App running on port " + port + ".");
});
//# sourceMappingURL=index.js.map