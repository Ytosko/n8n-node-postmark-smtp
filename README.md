# n8n-nodes-postmark-smtp

This is an n8n community node. It lets you use Postmark to send transactional emails directly from your n8n workflows.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

[Postmark](https://postmarkapp.com/) is a fast and reliable email delivery service for developers.

## Features

- **Send Email**: Send individual emails with support for:
    - HTML and Text bodies.
    - Attachments (binary data).
    - CC and BCC recipients.
    - Dynamic sender verification (loads verified domains from your account).
- **Batch Send Email**: Send multiple emails in a single API request for better performance.
- **Send Email with Template**: Use Postmark's template feature to send emails by providing a Template ID and a Model (JSON).

## Credentials

This node requires two types of credentials:

1.  **Postmark Server Token**: Required for sending emails. You can find this in your Postmark server settings under "API Tokens".
2.  **Postmark Account Token**: Required *only* if you want to use the "From (Domain)" dropdown to fetch verified domains. You can find this in your Postmark account settings.

## Installation

### Community Node (Recommended)
You can install this node directly in n8n via the **Settings > Community Nodes** panel. Search for `n8n-nodes-postmark-smtp`.

### Manual Installation
To install this node manually in your n8n Docker instance:

```bash
docker exec -it n8n npm install n8n-nodes-postmark-smtp
```

## Usage

### sending an Email
1.  Select the **Send Email** operation.
2.  Connect your **Postmark Server Token**.
3.  (Optional) Connect your **Postmark Account Token** to auto-populate the *From (Domain)* field.
4.  Enter the *From (Local Part)* (e.g., `info` for `info@example.com`).
5.  Select a valid *From (Domain)*.
6.  Enter the recipient(s) in *To*.
7.  Fill in *Subject*, *HTML Body*, and *Text Body*.

### Sending with Templates
1.  Select the **Send Email with Template** operation.
2.  Enter the **Template ID** (found in Postmark UI).
3.  Provide the **Template Model** as a JSON object matching your template variables.
    ```json
    {
      "user_name": "John Doe",
      "action_url": "https://example.com/login"
    }
    ```

## Development

To develop and test this node locally:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Build the node**:
    ```bash
    npm run build
    ```
3.  **Start n8n with this node**:
    ```bash
    npm run dev
    ```

## License

MIT
