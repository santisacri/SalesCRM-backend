
export const invitationHTML = (invitedByName: string, organizationName: string, url: URL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
        <tr>
        <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <tr>
                <td style="background-color:#111827; padding:24px 32px;">
                <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">CRMSales</h1>
                </td>
            </tr>
            <tr>
                <td style="padding:32px;">
                <h2 style="margin:0 0 16px; color:#111827; font-size:18px;">Reset your password</h2>
                <p style="margin:0 0 16px; color:#374151; font-size:15px; line-height:1.5;">
                    Hi,
                </p>
                <p style="margin:0 0 24px; color:#374151; font-size:15px; line-height:1.5;">
                    ${invitedByName} invited you to <span style="font-size:17px; font-weight:600">${organizationName}</span> organization
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                    <td style="border-radius:6px; background-color:#111827;">
                        <a href="${url}" target="_blank" style="display:inline-block; padding:12px 24px; color:#ffffff; font-size:15px; font-weight:600; text-decoration:none; border-radius:6px;">
                        Accept invitation
                        </a>
                    </td>
                    </tr>
                </table>
                <p style="margin:24px 0 0; color:#6b7280; font-size:13px; line-height:1.5;">
                    If you dont want to join this organization, you can ignore this email.
                </p>
                <p style="margin:16px 0 0; color:#9ca3af; font-size:12px; line-height:1.5;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <span style="color:#6b7280; word-break:break-all;">${url}</span>
                </p>
                </td>
            </tr>
            <tr>
                <td style="padding:20px 32px; background-color:#f9fafb; text-align:center;">
                <p style="margin:0; color:#9ca3af; font-size:12px;">© CRMSales. All rights reserved.</p>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
`
}