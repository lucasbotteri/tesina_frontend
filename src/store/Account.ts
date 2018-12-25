import AccountService from '@/service/Account';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import Credential from '@/interface/Credential';
import { setToken, isLoggedIn, removeToken } from '@/helper/authentication';


export interface AccountState {
    loggedIn: boolean;
}


const initialState: AccountState = {
    loggedIn: false,
};

const builder = getStoreBuilder<RootState>().module('account', initialState);


const loggedInGetter = builder.read(function loggedInStaus(state: AccountState) {
    return state.loggedIn || isLoggedIn();
});


function setLoggedIn(state: AccountState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
}


async function login(context: BareActionContext<AccountState, RootState>, credential: Credential) {
    const token = await AccountService.login(credential);
    account.setLoggedIn(true);
    setToken(token);
}

async function logout(state: AccountState) {
    account.setLoggedIn(false);
    removeToken();
}

const stateGetter = builder.state();

const account = {
    get state() {
        return stateGetter();
    },

    get loggedIn() {
        return loggedInGetter();
    },

    setLoggedIn: builder.commit(setLoggedIn),
    logout: builder.commit(logout),

    login: builder.dispatch(login),

};

export default account;
