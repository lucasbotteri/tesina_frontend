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

async function fetchNotions(context: BareActionContext<SemanticState, RootState>, lelSymbolId: string) {
    try {
        const notions = await SemanticService.getFromSymbol(lelSymbolId, constants.SEMANTIC_TYPE.NOTION);
        semanticStore.setNotions(notions);
        return notions;
    } catch (error) {
        console.log(error);
    }
}

async function fetchBehaviouralResponses(context: BareActionContext<SemanticState, RootState>, lelSymbolId: string) {
    try {
        const behaviouralResponses = await SemanticService.getFromSymbol(lelSymbolId, constants.SEMANTIC_TYPE.BEHAVIOURAL_RESPONSE);
        semanticStore.setBehaviouralResponses(behaviouralResponses);
        return behaviouralResponses;
    } catch (error) {
        console.log(error);
    }
}


const stateGetter = builder.state();
const semanticStore = {
    get state() {
        return stateGetter();
    },

    get notions() {
        return notionsGetter();
    },

    get behaviouralResponses() {
        return behaviouralResponsesGetter();
    },

    setNotions: builder.commit(setNotions),

    setBehaviouralResponses: builder.commit(setBehaviouralResponses),

    fetchNotions: builder.dispatch(fetchNotions),
    fetchBehaviouralResponses: builder.dispatch(fetchBehaviouralResponses),

};

export default semanticStore;
