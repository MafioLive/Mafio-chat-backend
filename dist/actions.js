"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.removeUser = exports.addUser = void 0;
var users = [];
/* The `addUser` function is a function that takes an object with `id`, `room`, and `name` properties
as its argument. It then checks if the `name` and `room` properties are truthy (not empty or
undefined), and if not, it returns an error object with a message. It also checks if there is
already a user with the same `name` and `room` in the `users` array, and if so, it returns an error
object with a message. If there are no errors, it creates a new `user` object with the `id`, `room`,
and `name` properties, adds it to the `users` array, and returns an object with the `user` property
set to the newly created user object. The `name` and `room` properties are also trimmed and
converted to lowercase before being used. */
var addUser = function (_a) {
    var id = _a.id, room = _a.room, name = _a.name;
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    var existingUser = users.find(function (user) { return user.room === room && user.name === name; });
    if (!name || !room)
        return { error: 'Username and room are required.' };
    if (existingUser)
        return { error: 'Username is taken.' };
    var user = { id: id, room: room, name: name };
    users.push(user);
    return { user: user };
};
/* This code is defining and exporting two functions, `addUser` and `removeUser`, as part of a module. */
exports.addUser = addUser;
var removeUser = function (id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
/* These lines of code are exporting the `removeUser` and `getUsersInRoom` functions as part of the
module. This allows other parts of the code to import and use these functions. */
exports.removeUser = removeUser;
var getUsersInRoom = function (room) { return users.filter(function (user) { return user.room === room; }); };
exports.getUsersInRoom = getUsersInRoom;
//# sourceMappingURL=actions.js.map