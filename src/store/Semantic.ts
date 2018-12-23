import SemanticService from '@/service/Semantic';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import constants from '@/constants';
import Semantic from '@/model/Semantic';
import { stat } from 'fs';
import { type } from 'os';

export interface SemanticState {
    semantics: {
        NOTION: Semantic[];
        BEHAVIOURAL_RESPONSE: Semantic[];
        [key: string]: Semantic[];
    };
}


const initialState: SemanticState = {
    semantics: {
        NOTION: [],
        BEHAVIOURAL_RESPONSE: [],
    },
};


const builder = getStoreBuilder<RootState>().module('semantic', initialState);

const semanticsGetter = builder.read(function semantics(state) {
    return state.semantics;
});

function addSemantic(state: SemanticState, semantic: Semantic) {
    state.semantics[semantic.type].push(semantic);
}


async function fetchTypeForSymbol(context: BareActionContext<SemanticState, RootState>, options: { type: string, lelSymbolId: string }) {
    try {
        const semantics = await SemanticService.getFromSymbol(options.lelSymbolId, options.type);
        context.state.semantics[options.type] = semantics;
        return semantics;
    } catch (error) {
        console.log(error);
    }
}

async function saveSemantic(context: BareActionContext<SemanticState, RootState>, payload: { semantic: Semantic, lelSymbolId: string }) {
    try {
        const semantic = await SemanticService.save(payload.semantic, payload.lelSymbolId);
        semanticStore.addSemantic(semantic);
        return semantic;
    } catch (error) {
        console.log(error);
    }
}

async function removeSemantic(context: BareActionContext<SemanticState, RootState>, payload: { semanticId: string, type: string }) {
    try {
        const semantic = await SemanticService.remove(payload.semanticId, payload.type);
        const semanticList = context.state.semantics[payload.type];
        semanticList.splice(semanticList.findIndex((s: Semantic) => s.id === payload.semanticId), 1);
        return semantic;
    } catch (error) {
        console.log(error);
    }
}


const stateGetter = builder.state();
const semanticStore = {
    get state() {
        return stateGetter();
    },

    get semantics() {
        return semanticsGetter();
    },

    addSemantic: builder.commit(addSemantic),

    fetchTypeForSymbol: builder.dispatch(fetchTypeForSymbol),

    saveSemantic: builder.dispatch(saveSemantic),

    removeSemantic: builder.dispatch(removeSemantic),

};

export default semanticStore;
