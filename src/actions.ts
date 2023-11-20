const users = [];

/**
 * This function adds a new user to a chat room if the username is not taken and both the username and
 * room are provided.
 * @param  - The function `addUser` takes an object as its parameter with three properties:
 * @returns The function `addUser` returns an object with a `user` property if the user was
 * successfully added to the `users` array. If there was an error, it returns an object with an `error`
 * property.
 */
export const addUser = ({ id, room, name }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, room, name };
    users.push(user);

    return { user };
};

/**
 * This function removes a user from an array of users based on their ID.
 * @param id - The `id` parameter is a unique identifier for a user that needs to be removed from an
 * array of users. The function uses this `id` to find the index of the user in the `users` array using
 * the `findIndex` method. If the user is found, the function removes
 * @returns the user object that was removed from the `users` array. If no user with the specified `id`
 * is found in the array, the function returns `undefined`.
 */
export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

/**
 * This function filters an array of users to return only those who are in a specific room.
 * @param room - The `room` parameter is a string that represents the name or ID of a chat room. The
 * function `getUsersInRoom` filters an array of `users` and returns an array of users who are
 * currently in the specified `room`. The `user` objects in the `users` array
 */
export const getUsersInRoom = (room) => users.filter((user) => user.room === room);