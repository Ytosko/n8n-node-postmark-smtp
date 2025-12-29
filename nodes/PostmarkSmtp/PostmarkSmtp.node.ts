
import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    ILoadOptionsFunctions,
    INodePropertyOptions,
    IRequestOptions,
} from 'n8n-workflow';

export class PostmarkSmtp implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Postmark SMTP by Ytosko',
        name: 'postmarkSmtp',
        icon: 'file:postmark.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Send emails via Postmark API',
        defaults: {
            name: 'Postmark SMTP',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'postmarkApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Email',
                        value: 'email',
                    },
                ],
                default: 'email',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['email'],
                    },
                },
                options: [
                    {
                        name: 'Send Email',
                        value: 'sendEmail',
                        action: 'Send an email',
                    },
                    {
                        name: 'Send Email with Template',
                        value: 'sendEmailWithTemplate',
                        action: 'Send an email using a template',
                    },
                ],
                default: 'sendEmail',
            },
            {
                displayName: 'From Domain',
                name: 'fromDomain',
                type: 'options',
                required: true,
                typeOptions: {
                    loadOptionsMethod: 'getDomains',
                },
                default: '',
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
                description: 'Choose a verified domain',
            },
            {
                displayName: 'From Name',
                name: 'fromName',
                type: 'string',
                default: '',
                placeholder: 'Sender Name',
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'From Email',
                name: 'fromEmail',
                type: 'string',
                default: '',
                placeholder: 'sender@example.com',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
                description: 'The sender email address. Must be from the selected domain.',
            },
            {
                displayName: 'To Name',
                name: 'toName',
                type: 'string',
                default: '',
                placeholder: 'Recipient Name',
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'To Email',
                name: 'toEmail',
                type: 'string',
                default: '',
                placeholder: 'receiver@example.com',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
                description: 'Comma separated list of recipients',
            },
            {
                displayName: 'Subject',
                name: 'subject',
                type: 'string',
                default: '',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['sendEmail'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'HTML Body',
                name: 'htmlBody',
                type: 'string',
                typeOptions: {
                    rows: 5,
                },
                default: '',
                displayOptions: {
                    show: {
                        operation: ['sendEmail'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'Text Body',
                name: 'textBody',
                type: 'string',
                typeOptions: {
                    rows: 5,
                },
                default: '',
                displayOptions: {
                    show: {
                        operation: ['sendEmail'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'Attachments',
                name: 'attachmentsToggle',
                type: 'boolean',
                default: false,
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'Attachments',
                name: 'attachments',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
                displayOptions: {
                    show: {
                        attachmentsToggle: [true],
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
                options: [
                    {
                        name: 'attachment',
                        displayName: 'Attachment',
                        values: [
                            {
                                displayName: 'Property Name',
                                name: 'propertyName',
                                type: 'string',
                                default: 'data',
                                description: 'Name of the binary property which contains the data for the attachment',
                            },
                            {
                                displayName: 'File Name',
                                name: 'fileName',
                                type: 'string',
                                default: '',
                                description: 'Optional name for the file',
                            },
                        ],
                    },
                ],
                default: {},
            },
            // Additional fields for Send Email
            {
                displayName: 'Cc',
                name: 'cc',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'Bcc',
                name: 'bcc',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        operation: ['sendEmail', 'sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            // ----------------------------------
            //         sendEmailWithTemplate
            // ----------------------------------
            {
                displayName: 'Template ID',
                name: 'templateId',
                type: 'string',
                default: '',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
            },
            {
                displayName: 'Template Model',
                name: 'templateModel',
                type: 'json',
                default: '{}',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['sendEmailWithTemplate'],
                        resource: ['email'],
                    },
                },
                description: 'JSON object containing the template model values',
            },

        ],
    };

    methods = {
        loadOptions: {
            async getDomains(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const credentials = await this.getCredentials('postmarkApi');
                const token = credentials.accountToken as string;

                const options: IRequestOptions = {
                    method: 'GET',
                    uri: 'https://api.postmarkapp.com/domains?count=50&offset=0',
                    headers: {
                        'X-Postmark-Account-Token': token,
                        'Accept': 'application/json',
                    },
                    json: true,
                };

                const response = await this.helpers.request(options);
                const domains = response.Domains || [];

                return domains.map((domain: any) => ({
                    name: domain.Name,
                    value: domain.Name,
                }));
            },
        },
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const operation = this.getNodeParameter('operation', 0) as string;
        const credentials = await this.getCredentials('postmarkApi');
        const serverToken = credentials.serverToken as string;

        for (let i = 0; i < items.length; i++) {
            try {
                let responseData;

                if (operation === 'sendEmail') {
                    const fromDomain = this.getNodeParameter('fromDomain', i) as string;
                    const fromName = this.getNodeParameter('fromName', i) as string;
                    const fromEmail = this.getNodeParameter('fromEmail', i) as string;

                    if (!fromEmail.toLowerCase().endsWith('@' + fromDomain.toLowerCase())) {
                        if (this.continueOnFail()) {
                            returnData.push({
                                json: {
                                    error: `From Email (${fromEmail}) must belong to the selected domain (${fromDomain})`,
                                },
                            });
                            continue;
                        }
                        throw new Error(`From Email (${fromEmail}) must belong to the selected domain (${fromDomain})`);
                    }

                    let from = fromEmail;
                    if (fromName) {
                        from = `"${fromName}" <${fromEmail}>`;
                    }

                    const toName = this.getNodeParameter('toName', i) as string;
                    const toEmail = this.getNodeParameter('toEmail', i) as string;

                    let to = toEmail;
                    if (toName) {
                        to = `"${toName}" <${toEmail}>`;
                    }

                    const subject = this.getNodeParameter('subject', i) as string;
                    const htmlBody = this.getNodeParameter('htmlBody', i) as string;
                    const textBody = this.getNodeParameter('textBody', i) as string;
                    const cc = this.getNodeParameter('cc', i) as string;
                    const bcc = this.getNodeParameter('bcc', i) as string;

                    const body: any = {
                        From: from,
                        To: to,
                        Subject: subject,
                        HtmlBody: htmlBody,
                        TextBody: textBody,
                        Cc: cc,
                        Bcc: bcc,
                        MessageStream: 'outbound',
                    };

                    // Handle Attachments
                    const attachmentsToggle = this.getNodeParameter('attachmentsToggle', i) as boolean;
                    if (attachmentsToggle) {
                        const attachmentsConfig = this.getNodeParameter('attachments', i) as any;
                        const attachments = [];

                        if (attachmentsConfig && attachmentsConfig.attachment) {
                            for (const att of attachmentsConfig.attachment) {
                                const propertyName = att.propertyName;
                                const binaryData = this.helpers.assertBinaryData(i, propertyName);
                                const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, propertyName);

                                attachments.push({
                                    Name: att.fileName || binaryData.fileName || 'attachment',
                                    Content: binaryDataBuffer.toString('base64'),
                                    ContentType: binaryData.mimeType,
                                });
                            }
                        }

                        if (attachments.length > 0) {
                            body.Attachments = attachments;
                        }
                    }

                    const options: IRequestOptions = {
                        method: 'POST',
                        uri: 'https://api.postmarkapp.com/email',
                        headers: {
                            'X-Postmark-Server-Token': serverToken,
                            'Accept': 'application/json',
                        },
                        body: body,
                        json: true,
                    };

                    responseData = await this.helpers.request(options);
                } else if (operation === 'sendEmailWithTemplate') {
                    const fromDomain = this.getNodeParameter('fromDomain', i) as string;
                    const fromName = this.getNodeParameter('fromName', i) as string;
                    const fromEmail = this.getNodeParameter('fromEmail', i) as string;

                    if (!fromEmail.toLowerCase().endsWith('@' + fromDomain.toLowerCase())) {
                        if (this.continueOnFail()) {
                            returnData.push({
                                json: {
                                    error: `From Email (${fromEmail}) must belong to the selected domain (${fromDomain})`,
                                },
                            });
                            continue;
                        }
                        throw new Error(`From Email (${fromEmail}) must belong to the selected domain (${fromDomain})`);
                    }

                    let from = fromEmail;
                    if (fromName) {
                        from = `"${fromName}" <${fromEmail}>`;
                    }

                    const toName = this.getNodeParameter('toName', i) as string;
                    const toEmail = this.getNodeParameter('toEmail', i) as string;

                    let to = toEmail;
                    if (toName) {
                        to = `"${toName}" <${toEmail}>`;
                    }

                    const templateId = this.getNodeParameter('templateId', i) as string;
                    const templateModel = this.getNodeParameter('templateModel', i) as object;
                    const cc = this.getNodeParameter('cc', i) as string;
                    const bcc = this.getNodeParameter('bcc', i) as string;

                    const body: any = {
                        From: from,
                        To: to,
                        TemplateId: templateId,
                        TemplateModel: templateModel,
                        Cc: cc,
                        Bcc: bcc,
                        MessageStream: 'outbound',
                    };

                    // Handle Attachments
                    const attachmentsToggle = this.getNodeParameter('attachmentsToggle', i) as boolean;
                    if (attachmentsToggle) {
                        const attachmentsConfig = this.getNodeParameter('attachments', i) as any;
                        const attachments = [];

                        if (attachmentsConfig && attachmentsConfig.attachment) {
                            for (const att of attachmentsConfig.attachment) {
                                const propertyName = att.propertyName;
                                const binaryData = this.helpers.assertBinaryData(i, propertyName);
                                const binaryDataBuffer = await this.helpers.getBinaryDataBuffer(i, propertyName);

                                attachments.push({
                                    Name: att.fileName || binaryData.fileName || 'attachment',
                                    Content: binaryDataBuffer.toString('base64'),
                                    ContentType: binaryData.mimeType,
                                });
                            }
                        }

                        if (attachments.length > 0) {
                            body.Attachments = attachments;
                        }
                    }

                    const options: IRequestOptions = {
                        method: 'POST',
                        uri: 'https://api.postmarkapp.com/email/withTemplate',
                        headers: {
                            'X-Postmark-Server-Token': serverToken,
                            'Accept': 'application/json',
                        },
                        body: body,
                        json: true,
                    };

                    responseData = await this.helpers.request(options);
                }

                returnData.push({
                    json: responseData,
                });

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: (error as any).message,
                        },
                    });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}
