export const verifyAccountTemplate = (name: string, url: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your account</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding:40px 0;">
        <tr>
        <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.08);">
            <tr>
                <td style="background-color:#4f46e5; padding:24px 32px;">
                <span style="color:#ffffff; font-size:20px; font-weight:600;">CRMSales</span>
                </td>
            </tr>
            <tr>
                <td style="padding:32px;">
                <h1 style="margin:0 0 16px; font-size:20px; color:#111827;">Verify your account</h1>
                <p style="margin:0 0 16px; font-size:15px; line-height:1.5; color:#374151;">
                    Hi ${name},
                </p>
                <p style="margin:0 0 24px; font-size:15px; line-height:1.5; color:#374151;">
                    Thanks for signing up for CRMSales. Please confirm your email address by clicking the button below to activate your account.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                    <td style="border-radius:6px; background-color:#4f46e5;">
                        <a href="${url}" target="_blank" style="display:inline-block; padding:12px 28px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:6px;">
                        Verify account
                        </a>
                    </td>
                    </tr>
                </table>
                <p style="margin:24px 0 0; font-size:13px; line-height:1.5; color:#6b7280;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin:8px 0 0; font-size:13px; line-height:1.5; word-break:break-all;">
                    <a href="${url}" style="color:#4f46e5;">${url}</a>
                </p>
                <p style="margin:24px 0 0; font-size:13px; line-height:1.5; color:#9ca3af;">
                    If you didn't create an account with CRMSales, you can safely ignore this email.
                </p>
                </td>
            </tr>
            <tr>
                <td style="padding:20px 32px; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
                <p style="margin:0; font-size:12px; color:#9ca3af;">
                    © CRMSales. All rights reserved.
                </p>
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