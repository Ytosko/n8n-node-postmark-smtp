# n8n-nodes-postmark-smtp

This is an n8n community node. It lets you use Postmark to send transactional emails directly from your n8n workflows.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

[Postmark](https://postmarkapp.com/) is a fast and reliable email delivery service for developers.

## Features

- **Send Email**: Send individual emails with support for:
    - HTML bodies.
    - Attachments (binary data).
    - CC and BCC recipients.
    - Dynamic sender verification (loads verified domains from your account).

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
1.  Connect your **Postmark API** credential (fill in Server Token and optionally Account Token).
2.  Select a valid **From Domain** (dynamically loaded).
3.  (Optional) Enter **From Name**.
4.  Enter **From Email**. *Note: This must belong to the selected 'From Domain' or the node will error.*
5.  (Optional) Enter **To Name**.
6.  Enter **To Email**.
7.  Fill in **Subject** and **HTML Body**.
8.  (Optional) **Additional Fields**:
    -   **Cc**
    -   **Bcc**
    -   **Attachments**: Add files from previous nodes.

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
