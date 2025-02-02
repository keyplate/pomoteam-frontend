export const ERROR_TYPES = {
    NETWORK: 'network',
    SERVER: 'server',
    ALIAS_CONFLICT: 'alias_conflict',
    HUB_NOT_FOUND: 'hub_not_found',
    INVALID_HUB_ID: 'invalid_hub_id'
};

export const ERROR_MESSAGES = {
    [ERROR_TYPES.NETWORK]: 'Unable to connect to the server. Please check your internet connection.',
    [ERROR_TYPES.SERVER]: 'Something went wrong on our side. Please try again later.',
    [ERROR_TYPES.ALIAS_CONFLICT]: 'This hub name is already taken. Please try another one.',
    [ERROR_TYPES.HUB_NOT_FOUND]: 'The specified hub does not exist.',
    [ERROR_TYPES.INVALID_HUB_ID]: 'Invalid hub ID provided.'
};

export class HubOperationError extends Error {
    constructor(message, type) {
        super(message);
        this.name = 'HubOperationError';
        this.type = type;
    }
}