import LelSymbolService from '@/service/LelSymbol';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import LelSymbol from '@/model/LelSymbol';
/* Use http://georgekinsman.com/programming/2018/04/19/Typed-State-Management-With-Vuex.html as vuex-typex tutorial */
/* Use https://github.com/gkinsman/vue-types-demo/blob/master/src/store/CartModule.ts as template (for future reference) */

export interface LelSymbolState {
    symbols: LelSymbol[];
}


const initialState: LelSymbolState = {
    symbols: [],
};


const builder = getStoreBuilder<RootState>().module('lelSymbol', initialState);

const lelSymbolsGetter = builder.read(function lelSymbols(state: LelSymbolState) {
    return state.symbols;
});

function setLelSymbols(state: LelSymbolState, symbol: LelSymbol[]) {
    state.symbols = symbol;
}

async function fetchLelSymbols(context: BareActionContext<LelSymbolState, RootState>) {
    try {
        // could send context.state.added as parameter
        const symbols = await LelSymbolService.list();
        lelSymbolStore.setLelSymbols(symbols);
        return symbols;
    } catch (error) {
        console.log(error);
    }
}



const stateGetter = builder.state();
const lelSymbolStore = {
    get state() {
        return stateGetter();
    },

    get lelSymbols() {
        return lelSymbolsGetter();
    },

    setLelSymbols: builder.commit(setLelSymbols),


    fetchLelSymbols: builder.dispatch(fetchLelSymbols),

};

export default lelSymbolStore;
