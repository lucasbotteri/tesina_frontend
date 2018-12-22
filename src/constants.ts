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
        ['NOTION', 'Nociones'],
        ['BEHAVIOURAL_RESPONSE', 'Impactos'],
    ]),
    SEMANTIC_TYPE: {
        NOTION: 'NOTION',
        BEHAVIOURAL_RESPONSE: 'BEHAVIOURAL_RESPONSE',
    },
    SEMANTIC_ENDPOINT_TYPE: new Map([
        ['NOTION', 'notion'],
        ['BEHAVIOURAL_RESPONSE', 'behavioural-response'],
    ]),
};
