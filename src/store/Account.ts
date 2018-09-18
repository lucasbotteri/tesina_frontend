import AccountService from '@/service/Account';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';

export interface AccountState {
    loggedIn: boolean;
}


const initialState: AccountState = {
    loggedIn: false,
};

const builder = getStoreBuilder<RootState>().module('account', initialState);


const loggedInGetter = builder.read(function loggedInStaus(state: AccountState) {
    return state.loggedIn;
});


function setloggedIn(state: AccountState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
}

async function login(context: BareActionContext<AccountState, RootState>, creadentials: { username: string, password: string }) {
    try {
        await (new AccountService()).login(creadentials.username, creadentials.password);
        account.setloggedIn(true);
    } catch (error) {
        console.log(error);
    }
}

const stateGetter = builder.state();

export const account = {
    get state() {
        return stateGetter();
    },

    get loggedIn() {
        return loggedInGetter();
    },

    setloggedIn: builder.commit(setloggedIn),

    login: builder.dispatch(login),

};
