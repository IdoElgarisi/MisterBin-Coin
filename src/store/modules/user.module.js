import userService from '@/services/user.service';

export default {
    state: {
        users: null,
        loggedInUser: null,
        filterBy: null,
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedInUser({ loggedInUser }) {
            return loggedInUser;
        },
        usersToShow(state) {
            if (!state.filterBy) return state.users;
            const usersToShow = state.users.filter((user) => {
                return (
                    user.name.toLowerCase().includes(state.filterBy.name.toLowerCase()) &&
                    user.email.toLowerCase().includes(state.filterBy.email.toLowerCase())
                );
            });
            return usersToShow;
        },
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { id }) {
            const idx = state.users.findIndex(user => user._id === id);
            state.users.splice(idx, 1);
        },
        saveUser(state, { user }) {
            const idx = state.users.findIndex(currUser => user._id === currUser._id);
            if (idx === -1) state.users.push(user);
            else state.users.splice(idx, 1, user);
        },
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        }
    },
    actions: {
        async loadUsers(context) {
            const users = await userService.query();
            context.commit({ type: 'setUsers', users });
        },
        async loadUser({ commit }) {
            const user = userService.getLoggedInUser();
            if (user) commit({ type: 'setLoggedInUser', user });
        },
        async removeUser(context, { id }) {
            await userService.remove(id);
            context.commit({ type: 'removeUser', id });
        },
        async saveUser({ commit }, { user }) {
            const updatedUser = await userService.save(user);
            commit({ type: 'saveUser', user: updatedUser });
        },
        async login({ commit }, { creds }) {
            const user = await userService.login(creds);
            commit({ type: 'setLoggedInUser', user });
        },
        async login({ commit }, { creds }) {
            const user = await userService.signup(creds);
            commit({ type: 'setLoggedInUser', user });
        },
        async logout({ commit }) {
            await userService.logout();
            commit({ type: 'setLoggedInUser', user: null });
        }
    }
};