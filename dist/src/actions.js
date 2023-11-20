"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.removeUser = exports.addUser = void 0;
var users = [];
/* The `addUser` variable is defining a function that takes an object with `id`, `room`, and `name`
properties as its argument. It then checks if the `name` and `room` properties are truthy and not
empty strings, and if not, returns an error object. It also checks if there is already a user with
the same `name` and `room` in the `users` array, and if so, returns an error object. If there are no
errors, it creates a new `user` object with the given `id`, `room`, and `name`, adds it to the
`users` array, and returns an object with the `user` property set to the newly created user object. */
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
exports.addUser = addUser;
/* The `removeUser` variable is defining a function that takes an `id` as its argument. It then uses
the `findIndex` method to find the index of the user in the `users` array whose `id` matches the
given `id`. If the index is not `-1`, indicating that a user with the given `id` was found, it
removes that user from the `users` array using the `splice` method and returns the removed user
object. */
var removeUser = function (id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
/* These lines of code are exporting two functions, `removeUser` and `getUsersInRoom`, from the module.
They can be imported and used in other parts of the codebase. `removeUser` removes a user from the
`users` array based on their `id`, and `getUsersInRoom` returns an array of all users in a given
`room`. */
exports.removeUser = removeUser;
var getUsersInRoom = function (room) { return users.filter(function (user) { return user.room === room; }); };
exports.getUsersInRoom = getUsersInRoom;
//# sourceMappingURL=actions.js.map