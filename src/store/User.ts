import UserService from '@/service/User';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import User from '@/model/User';
import Credential from '@/interface/Credential';
import { type } from 'os';
export interface UserState {
    users: User[];
}


const initialState: UserState = {
    users: [],
};


const builder = getStoreBuilder<RootState>().module('user', initialState);

const usersGetter = builder.read(function users(state: UserState) {
    return state.users;
});

function setUsers(state: UserState, user: User[]) {
    state.users = user;
}

async function fetchUsers(context: BareActionContext<UserState, RootState>) {
    try {
        // could send context.state.added as parameter
        const users = await UserService.list();
        userStore.setUsers(users);
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function fetchUser(context: BareActionContext<UserState, RootState>, userId: string) {
    const users = await UserService.get(userId);
    return users;
}

async function saveUser(context: BareActionContext<UserState, RootState>, data: { credential: Credential, type: string }) {
    const user = await UserService.save(data.credential, data.type);
    context.state.users.push(user);
    return user;
}

async function removeUser(context: BareActionContext<UserState, RootState>, userId: string) {
    const result = await UserService.remove(userId);
    // Remove element from array
    context.state.users.splice(context.state.users.findIndex((ls) => ls.id === userId), 1);
    return result;
}

const stateGetter = builder.state();
const userStore = {
    get state() {
        return stateGetter();
    },

    get users() {
        return usersGetter();
    },

    setUsers: builder.commit(setUsers),


    fetchUsers: builder.dispatch(fetchUsers),

    fetchUser: builder.dispatch(fetchUser),

    saveUser: builder.dispatch(saveUser),

    removeUser: builder.dispatch(removeUser),

};

export default userStore;
