import LelSymbolService from '@/service/LelSymbol';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
/* Use http://georgekinsman.com/programming/2018/04/19/Typed-State-Management-With-Vuex.html as vuex-typex tutorial */
/* Use https://github.com/gkinsman/vue-types-demo/blob/master/src/store/CartModule.ts as template (for future reference) */

export interface LelSymbolState {
    added: string[];
    property: string | null;
}

const initialState: LelSymbolState = {
    added: [],
    property: null,
};

const builder = getStoreBuilder<RootState>().module('lelSymbol', initialState);

const propertyGetter = builder.read(function propertyStaus(state: LelSymbolState) {
    // Could add more logic
    return state.property;
});

function pushItemToArray(state: LelSymbolState, item: string) {
    state.added.push(item);
}

function setProperty(state: LelSymbolState, property: string | null) {
    state.property = property;
}

function setAdded(state: LelSymbolState, added: string[]) {
    state.added = added;
}

async function apiCall(context: BareActionContext<LelSymbolState, RootState>) {
    const added = [...context.state.added];
    lelSymbol.setProperty(null);
    lelSymbol.setAdded([]);
    try {
        // could send context.state.added as parameter
        // await (new LelSymbolService()).list();
        lelSymbol.setProperty('successful');
    } catch {
        lelSymbol.setProperty('failed');
        lelSymbol.setAdded(added);
    }
}

/* I don't understand why this is an async call
async function addProductToCart(context: BareActionContext<CartState, RootState>, product: Product) {
    cart.setCheckoutStatus(null);
    if (product.inventory > 0) {
        const cartItem = cart.state.added.find(item => item.product.id === product.id);
        if (!cartItem) {
            cart.pushProductToCart(product);
        } else {
            cart.incrementItemQuantity(product);
        }

        products.decrementProductInventory(product);
    }
}
*/

const stateGetter = builder.state();

export const lelSymbol = {
    get state() {
        return stateGetter();
    },

    get property() {
        return propertyGetter();
    },

    pushItemToArray: builder.commit(pushItemToArray),
    setProperty: builder.commit(setProperty),
    setAdded: builder.commit(setAdded),

    apiCall: builder.dispatch(apiCall),

};
