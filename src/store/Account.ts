import AccountService from '@/service/Account';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import Credential from '@/interface/Credential';
import { setToken, isLoggedIn, removeToken, isAdmin } from '@/helper/authentication';


export interface AccountState {
    loggedIn: boolean;
    isAdmin: boolean;
}


const initialState: AccountState = {
    loggedIn: false,
    isAdmin: false,
};

const builder = getStoreBuilder<RootState>().module('account', initialState);


const loggedInGetter = builder.read(function loggedInStaus(state: AccountState) {
    return state.loggedIn || isLoggedIn();
});

const isAdminGetter = builder.read(function isAdmintrator(state: AccountState) {
    return state.isAdmin || isAdmin();
});


function setLoggedIn(state: AccountState, loggedIn: boolean) {
    state.loggedIn = loggedIn;
}

function setIsAdmin(state: AccountState, value: boolean) {
    state.isAdmin = value;
}


async function login(context: BareActionContext<AccountState, RootState>, credential: Credential) {
    const token = await AccountService.login(credential);
    setToken(token);
    account.setLoggedIn(true);
    account.setIsAdmin(isAdmin());
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

    get isAdmin() {
        return isAdminGetter();
    },

    setLoggedIn: builder.commit(setLoggedIn),
    setIsAdmin: builder.commit(setIsAdmin),

    logout: builder.commit(logout),

    login: builder.dispatch(login),

};

export default account;
