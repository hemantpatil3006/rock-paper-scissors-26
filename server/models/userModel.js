const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../../data', 'users.json');

const readUsers = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

const findUserByEmail = (email) => {
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id) => {
    const users = readUsers();
    return users.find(u => u.id === id);
};

const createUser = (user) => {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
};

module.exports = { findUserByEmail, findUserById, createUser };
