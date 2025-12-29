
import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class PostmarkApi implements ICredentialType {
    name = 'postmarkApi';
    displayName = 'Postmark API';
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
            description: 'The "Server API Token" found in your server settings.',
        },
        {
            displayName: 'Account Token',
            name: 'accountToken',
            type: 'string',
            default: '',
            typeOptions: {
                password: true,
            },
            description: 'The "Account API Token" found in your account settings. Required fopr fetching verified domains.',
        },
    ];
}
