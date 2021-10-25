'use strict';

import { DbService } from './db-service.js';
import { utils } from './utils.service.js';
import baseUsers from './users.json';

const KEY = 'users';

export default {
    query,
    get,
    remove,
    save,
    getEmptyUser,
    getByEmail,
    login,
    logout,
    getLoggedInUser,
    signup
};

async function login(creds) {
    const user = await getByEmail(creds.email);

    if (user.password !== creds.password) {
        throw new Error('Wrong name or email');
    }
    if (!user.balance) user.balance = 100;
    console.log('logged in ', user);

    utils.storeToStorage('loggedInUser', user);
    return user;
}

async function signup(creds) {
    creds.balance = 100;
    console.log('logged in ', creds);
    const user = await save(creds)
    utils.storeToStorage('loggedInUser', user);
    return user;
}

async function logout() {
    localStorage.removeItem('loggedInUser');
    return Promise.resolve();
}

function getLoggedInUser() {
    const user = localStorage.loggedInUser;
    if (!user) return null;
    return JSON.parse(user);
}

async function getByEmail(email) {
    const users = await query();
    const user = users.find(user => user.email === email);
    if (!user) {
        throw new Error('Unknown User');
    }
    return Promise.resolve(user);
}

async function query() {
    var users = await DbService.query(KEY);
    if (!users || !users.length) {
        users = baseUsers;
        await DbService.insert(KEY, users);
    }
    return users;
}

async function get(id) {
    const user = await DbService.get(KEY, id);
    if (!user) {
        throw new Error('Unknown User');
    }
    return user;
}

function remove(id) {
    return DbService.delete(KEY, id);
}

function save(user) {
    if (user._id) return DbService.put(KEY, user);
    else return DbService.post(KEY, user);
}


function getEmptyUser() {
    return {
        name: "",
        email: "",
        phone: "",
        password: "",
        isAdmin: false
    };
}
