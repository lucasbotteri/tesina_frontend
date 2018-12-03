export default {
    LEL_SYMBOL_TYPES: {
        OBJECT: 'OBJECT',
        SUBJECT: 'SUBJECT',
        STATE: 'STATE',
        VERB: 'VERB',
    },
    LEL_SYMBOL_TYPES_READABLE: new Map([
        ['OBJECT', 'Objeto'],
        ['SUBJECT', 'Sujeto'],
        ['STATE', 'Estado'],
        ['VERB', 'Verbo'],
    ]),
    READABLE_SEMANTIC_TYPE: new Map([
        ['NOTION', 'Noción'],
        ['BEHAVIOURAL_RESPONSE', 'IMPACTO'],
    ]),
    SEMANTIC_TYPE: {
        NOTION: 'notion',
        BEHAVIOURAL_RESPONSE: 'behaviouralResponse',
    }
};
