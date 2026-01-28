
import {
    ICredentialType,
    INodeProperties,
    ICredentialTestRequest,
} from 'n8n-workflow';

export class PostmarkServerToken implements ICredentialType {
    name = 'postmarkServerToken';
    displayName = 'Postmark Server Token';
    documentationUrl = 'https://postmarkapp.com/developer';
    properties: INodeProperties[] = [
        {
            displayName: 'Server Token',
            name: 'serverToken',
            type: 'string',
            default: '',
            typeOptions: {
                password: true,
            },
        },
    ];
    test: ICredentialTestRequest = {
        request: {
            url: 'https://api.postmarkapp.com/server',
            method: 'GET',
            headers: {
                'X-Postmark-Server-Token': '={{$credentials.serverToken}}',
            },
        },
    };
}
