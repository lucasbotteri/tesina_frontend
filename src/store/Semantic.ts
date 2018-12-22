import SemanticService from '@/service/Semantic';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import constants from '@/constants';
import Semantic from '@/model/Semantic';

export interface SemanticState {
    notions: Semantic[];
    behaviouralResponses: Semantic[];
}


const initialState: SemanticState = {
    notions: [],
    behaviouralResponses: [],
};


const builder = getStoreBuilder<RootState>().module('semantic', initialState);

const notionsGetter = builder.read(function notions(state: SemanticState) {
    return state.notions;
});

const behaviouralResponsesGetter = builder.read(function behaviouralResponses(state: SemanticState) {
    return state.behaviouralResponses;
});

function setNotions(state: SemanticState, notions: Semantic[]) {
    state.notions = notions;
}

function setBehaviouralResponses(state: SemanticState, behaviouralResponses: Semantic[]) {
    state.behaviouralResponses = behaviouralResponses;
}

async function fetchTypeForSymbol(context: BareActionContext<SemanticState, RootState>, options: {type: string, lelSymbolId: string}) {
    try {
        const semantics = await SemanticService.getFromSymbol(options.lelSymbolId, options.type);
        return semantics;
    } catch (error) {
        console.log(error);
    }
}

async function saveSemantic(context: BareActionContext<SemanticState, RootState>, payload: {semantic: Semantic, lelSymbolId: string}) {
    try {
        return await SemanticService.save(payload.semantic, payload.lelSymbolId);
    } catch (error) {
        console.log(error);
    }
}


const stateGetter = builder.state();
const semanticStore = {
    get state() {
        return stateGetter();
    },

    setNotions: builder.commit(setNotions),

    setBehaviouralResponses: builder.commit(setBehaviouralResponses),

    fetchTypeForSymbol: builder.dispatch(fetchTypeForSymbol),

    saveSemantic: builder.dispatch(saveSemantic),

};

export default semanticStore;
