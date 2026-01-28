
import {
    ICredentialType,
    INodeProperties,
    ICredentialTestRequest,
} from 'n8n-workflow';

export class PostmarkAccountToken implements ICredentialType {
    name = 'postmarkAccountToken';
    displayName = 'Postmark Account Token';
    documentationUrl = 'https://postmarkapp.com/developer';
    properties: INodeProperties[] = [
        {
            displayName: 'Account Token',
            name: 'accountToken',
            type: 'string',
            default: '',
            typeOptions: {
                password: true,
            },
        },
    ];
    test: ICredentialTestRequest = {
        request: {
            url: 'https://api.postmarkapp.com/servers',
            method: 'GET',
            headers: {
                'X-Postmark-Account-Token': '={{$credentials.accountToken}}',
            },
        },
    };
}
