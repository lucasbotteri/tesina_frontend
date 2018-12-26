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
    PRURAL_READABLE_SEMANTIC_TYPE: new Map([
        ['NOTION', 'Nociones'],
        ['BEHAVIOURAL_RESPONSE', 'Impactos'],
    ]),
    READABLE_SEMANTIC_TYPE: new Map([
        ['NOTION', 'Noción'],
        ['BEHAVIOURAL_RESPONSE', 'Impacto'],
    ]),
    SEMANTIC_TYPE: {
        NOTION: 'NOTION',
        BEHAVIOURAL_RESPONSE: 'BEHAVIOURAL_RESPONSE',
    },
    SEMANTIC_ENDPOINT_TYPE: new Map([
        ['NOTION', 'notion'],
        ['BEHAVIOURAL_RESPONSE', 'behavioural-response'],
    ]),
    USER_ROLE: {
        ADMINISTRATOR: 'ADMINISTRATOR',
        REGULAR: 'REGULAR',
    },
    USER_ROLE_READABLE: new Map([
        ['ADMINISTRATOR', 'Administrador'],
        ['REGULAR', 'Regular'],
    ]),
};
