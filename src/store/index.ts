import Vue from 'vue';
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
// Each module must be explicitly imported here
// so that they are built before the store is built.
import '@/store/LelSymbolState';
import { LelSymbolState } from '@/store/LelSymbolState';

Vue.use(Vuex);

export interface RootState {
  symbols: LelSymbolState;
}

const store = getStoreBuilder<RootState>().vuexStore();
export default store;
