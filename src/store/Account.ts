import AccountService from '@/service/Account';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import Credential from '@/interface/Credential';
import { getToken, setToken } from '@/helper/authentication';


export interface AccountState {
    loggedIn: boolean;
}


const initialState: AccountState = {
    loggedIn: false,
};

const builder = getStoreBuilder<RootState>().module('account', initialState);


const loggedInGetter = builder.read(function loggedInStaus(state: AccountState) {
    return getToken() !== null;
});


async function login(context: BareActionContext<AccountState, RootState>, credential: Credential) {
    const token = await AccountService.login(credential);
    setToken(token);
}

const stateGetter = builder.state();

export const account = {
    get state() {
        return stateGetter();
    },

    get loggedIn() {
        return loggedInGetter();
    },

    login: builder.dispatch(login),

};
