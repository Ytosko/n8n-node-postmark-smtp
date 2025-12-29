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
- **Send Email with Template**: Use Postmark's template feature to send emails with full sender/recipient control.

## Credentials

This node requires a **Postmark API** credential which includes:

1.  **Server Token**: Required for sending emails. You can find this in your Postmark server settings under "API Tokens".
2.  **Account Token**: Required *only* if you want to fetch verified domains dynamically. You can find this in your Postmark account settings.

## Installation

### Community Node (Recommended)
You can install this node directly in n8n via the **Settings > Community Nodes** panel. Search for `n8n-nodes-postmark-smtp`.

### Manual Installation
To install this node manually in your n8n Docker instance:

```bash
docker exec -it n8n npm install n8n-nodes-postmark-smtp
```

## Usage

### Sending an Email
1.  Select the **Send Email** operation.
2.  Connect your **Postmark API** credential (fill in Server Token and optionally Account Token).
3.  Select a valid **From Domain** (dynamically loaded).
4.  (Optional) Enter **From Name**.
5.  Enter **From Email**. *Note: This must belong to the selected 'From Domain' or the node will error.*
6.  (Optional) Enter **To Name**.
7.  Enter **To Email**.
8.  Fill in *Subject*, *HTML Body*, and *Text Body*.

### Sending with Templates
1.  Select the **Send Email with Template** operation.
2.  Connect your **Postmark API** credential.
3.  Select a valid **From Domain**.
4.  Enter **From Name** and **From Email**.
5.  Enter **To Name** and **To Email**.
6.  Enter the **Template ID** (found in Postmark UI).
7.  Provide the **Template Model** as a JSON object matching your template variables.
    ```json
    {
      "user_name": "John Doe",
      "action_url": "https://example.com/login"
    }
    ```
8.  (Optional) Add **Attachments**.

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
