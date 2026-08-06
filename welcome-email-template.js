/* =============================================
   WELCOME-EMAIL-TEMPLATE.JS
   The full "Girlllllll..." welcome email, unchanged from the
   original design — every section, every gradient, every line
   is preserved exactly. The ONLY thing different from the
   original file is that the two dynamic spots now use plain
   placeholders instead of Pipedream's variable syntax:

     {{SUBSCRIBER_NAME}}   was  {{steps.trigger.event.body.name}}
     {{UNSUBSCRIBE_URL}}   was  {{unsubscribe_url}}

   api/subscribe.js swaps both placeholders for real values right
   before sending, using a plain .replace(). If you ever want to
   redesign the email, edit the HTML string below directly — it's
   the exact same markup you already had, just living here instead
   of in a standalone .html file so the serverless function can
   import it.
   ============================================= */

export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>✨ Welcome to Her Digital Playbook ✨</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
    </style>
</head>
<body style="margin:0;padding:0;background-color:#FFE4EC;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    
    <!-- PREHEADER SPACER -->
    <div style="display:none;max-height:0px;overflow:hidden;mso-hide:all;font-size:0px;line-height:0px;color:#FFE4EC;">
        Girlllllll... You're officially one of us 💖 Welcome to your digital playbook for ambitious women — practical guides, soft luxury &amp; big-sister energy ✨
    </div>

    <!-- OUTER WRAPPER (pink dream background) -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE4EC;">
        <tr>
            <td align="center" style="padding:24px 16px 40px 16px;">
                
                <!-- MAIN CONTAINER (luxury magazine card with soft shadow) -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:#FFF5F7;border-radius:28px;overflow:hidden;box-shadow:0 20px 50px rgba(200,140,150,0.15);">
                    
                    <!-- ============ TOP DECORATIVE RIBBON (gradient) ============ -->
                    <tr>
                        <td style="background-image:linear-gradient(135deg,#F9D5D3,#F2B8B5,#FBC8D4,#FADDE1);background-color:#F9D5D3;height:8px;font-size:0;line-height:0;border-radius:0 0 20px 20px;" height="8">
                            &nbsp;
                        </td>
                    </tr>

                    <!-- ============ BRAND MASTHEAD (dramatic serif) ============ -->
                    <tr>
                        <td align="center" style="padding:28px 32px 6px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:14px;letter-spacing:4px;color:#E5A3AF;text-transform:uppercase;font-weight:500;line-height:1.4;">
                                        ♡ Her Digital Playbook ♡
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ HERO SECTION (typography drama) ============ -->
                    <tr>
                        <td align="center" style="padding:16px 32px 12px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="font-family:'Great Vibes','Parisienne','Sacramento','Allura','Brush Script MT',cursive;font-size:60px;line-height:1.1;color:#D4677A;font-weight:400;letter-spacing:0.5px;mso-line-height-rule:exactly;">
                                        Girlllllll...
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:6px;font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:26px;line-height:1.35;color:#B25768;font-weight:500;font-style:italic;letter-spacing:0.3px;">
                                        You're officially one of us.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:18px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="width:45px;height:1px;background-color:#FAC8D0;font-size:0;line-height:0;">&nbsp;</td>
                                                <td style="width:20px;text-align:center;font-size:16px;color:#F2A5B5;line-height:1;">&nbsp;💖&nbsp;</td>
                                                <td style="width:45px;height:1px;background-color:#FAC8D0;font-size:0;line-height:0;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ PERSONALIZED GREETING (script accent) ============ -->
                    <tr>
                        <td align="center" style="padding:14px 32px 4px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-family:'Great Vibes','Parisienne','Sacramento','Allura',cursive;font-size:24px;line-height:1.5;color:#C7546B;font-weight:400;text-align:center;letter-spacing:0.4px;">
                                        Hey beautiful...
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:2px;font-family:Helvetica,Arial,sans-serif;font-size:18px;line-height:1.5;color:#4A3F42;font-weight:400;text-align:center;">
                                        {{SUBSCRIBER_NAME}} 💖
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ WELCOME MESSAGE (warm big-sister tone) ============ -->
                    <tr>
                        <td align="center" style="padding:18px 32px 6px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="font-family:Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.75;color:#4B383C;font-weight:400;text-align:center;">
                                        I'm genuinely so happy you're here. You've just stepped into a <span style="font-weight:600;color:#D4677A;">special space</span> for women who want more — more freedom, more creativity, more income, and more control over their lives.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top:12px;font-family:Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.75;color:#4B383C;font-weight:400;text-align:center;">
                                        You don't have to figure everything out alone anymore. This isn't just another newsletter. This is your <span style="font-weight:600;color:#D4677A;">digital playbook</span> — a thoughtfully curated resource for ambitious women, filled with practical guidance, honest encouragement, and the tools you actually need.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ DECORATIVE DIVIDER (sparkles & hearts) ============ -->
                    <tr>
                        <td align="center" style="padding:22px 32px 18px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="font-size:18px;color:#F2B8C4;letter-spacing:8px;line-height:1;">&nbsp;✨&nbsp;♡&nbsp;🎀&nbsp;♡&nbsp;✨&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ WHAT YOU'LL DISCOVER (editorial card) ============ -->
                    <tr>
                        <td align="center" style="padding:4px 28px 4px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF0F3;border-radius:20px;border:1px solid #FAD4DC;">
                                <tr>
                                    <td align="center" style="padding:24px 18px 20px 18px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:24px;line-height:1.3;color:#B55467;font-weight:500;letter-spacing:0.2px;">
                                                    ✨ What You'll <span style="color:#E18A99;">Discover</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:6px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#C49CA3;font-weight:400;font-style:italic;">
                                                    A world of pretty opportunities...
                                                </td>
                                            </tr>
                                            <!-- Opportunity grid using two columns of pink tags -->
                                            <tr>
                                                <td align="center" style="padding-top:14px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">🤖 AI &amp; Automation</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">✍️ Freelancing</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📋 Virtual Assistance</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📝 Copywriting</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📱 Content Creation</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📊 Digital Marketing</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">💰 Affiliate Marketing</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">💌 Email Marketing</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">🎨 Canva &amp; Design</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">🌟 Personal Branding</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📦 Digital Products</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">📸 UGC Creation</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">🌐 Remote Work</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">💻 Online Business</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">▶️ YouTube &amp; Video</td></tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="padding:6px 2%;vertical-align:top;">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFE8EC;border-radius:12px;border:1px solid #FCCED7;">
                                                                    <tr><td align="center" style="padding:12px 8px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.4;color:#4F3A40;font-weight:500;">⚡ Automation</td></tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:10px;font-family:'Playfair Display',Georgia,serif;font-size:14px;font-style:italic;color:#C48F9A;">...and so many more ♡</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ DECORATIVE DIVIDER ============ -->
                    <tr>
                        <td align="center" style="padding:18px 32px 14px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="font-size:16px;color:#F2B8C4;letter-spacing:6px;line-height:1;">&nbsp;💎&nbsp;♡&nbsp;💎&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ INCOME POSSIBILITIES (pink card with script pull quote) ============ -->
                    <tr>
                        <td align="center" style="padding:4px 28px 6px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF2F5;border-radius:20px;border:1px solid #FAD4DC;">
                                <tr>
                                    <td align="center" style="padding:24px 20px 22px 20px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:22px;line-height:1.3;color:#B55467;font-weight:500;">
                                                    💰 Realistic <span style="color:#E18A99;">Income</span> Possibilities
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:12px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#4B383C;font-weight:400;">
                                                    Women in this community are building <span style="font-weight:500;color:#C7546B;">real results</span> — from their first few hundred dollars to thousands in consistent monthly income. They're creating digital assets, multiple income streams, and lives they genuinely love.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:14px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFE4EB;border-radius:12px;">
                                                        <tr>
                                                            <td style="padding:10px 18px;font-family:Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.5;color:#9B6D77;font-weight:400;font-style:italic;text-align:center;">
                                                                ⚠️ Success requires learning, consistency &amp; action.<br>No income is guaranteed — only honest guidance.
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <!-- Script pull quote -->
                                            <tr>
                                                <td align="center" style="padding-top:16px;font-family:'Great Vibes','Parisienne','Sacramento','Allura',cursive;font-size:22px;line-height:1.4;color:#D4677A;font-weight:400;font-style:italic;">
                                                    “Your winning era starts today.”
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ DECORATIVE DIVIDER ============ -->
                    <tr>
                        <td align="center" style="padding:20px 32px 16px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="font-size:16px;color:#F2B8C4;letter-spacing:6px;line-height:1;">&nbsp;🎀&nbsp;✨&nbsp;🎀&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ WHAT YOU'LL RECEIVE (another pink card) ============ -->
                    <tr>
                        <td align="center" style="padding:4px 28px 6px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF0F3;border-radius:20px;border:1px solid #FAD4DC;">
                                <tr>
                                    <td align="center" style="padding:22px 18px 18px 18px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:22px;line-height:1.3;color:#B55467;font-weight:500;">
                                                    📋 What You'll <span style="color:#E18A99;">Receive</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:14px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">✨ Practical step-by-step guides</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">🎁 Free resources &amp; digital tools</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">📄 Ready-to-use templates &amp; checklists</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">🤖 AI prompts that save hours</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">🎯 Industry insights &amp; trend spotting</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">💌 Weekly motivation (big-sister style)</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">🔑 Opportunities worth exploring</td></tr>
                                                        <tr><td style="padding:7px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;">⏱️ Time-saving shortcuts</td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ DECORATIVE DIVIDER ============ -->
                    <tr>
                        <td align="center" style="padding:20px 32px 16px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="font-size:16px;color:#F2B8C4;letter-spacing:6px;line-height:1;">&nbsp;♡&nbsp;✨&nbsp;♡&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ BRAND PROMISE (elegant quote box) ============ -->
                    <tr>
                        <td align="center" style="padding:4px 28px 6px 28px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF5F5;border-radius:20px;border:1px solid #FCCED7;">
                                <tr>
                                    <td align="center" style="padding:24px 18px 20px 18px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="font-family:'Playfair Display','Cormorant Garamond',Georgia,serif;font-size:22px;line-height:1.3;color:#B55467;font-weight:500;">
                                                    🤍 Our <span style="color:#E18A99;">Promise</span> to You
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding-top:14px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="85%">
                                                        <tr><td style="padding:8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;text-align:center;">🌸 This is a <span style="font-weight:500;color:#D4677A;">safe space</span> — always</td></tr>
                                                        <tr><td style="padding:8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;text-align:center;">🚫 No fake gurus. No fluff. No jargon.</td></tr>
                                                        <tr><td style="padding:8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;text-align:center;">✅ Only practical guidance you can use</td></tr>
                                                        <tr><td style="padding:8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;text-align:center;">💗 Encouragement that feels like a warm hug</td></tr>
                                                        <tr><td style="padding:8px 0;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#4B383C;font-weight:400;text-align:center;">🤝 Honesty. Consistency. Real talk.</td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <!-- script tagline -->
                                            <tr>
                                                <td align="center" style="padding-top:12px;font-family:'Great Vibes','Parisienne','Sacramento','Allura',cursive;font-size:21px;line-height:1.4;color:#D4677A;font-weight:400;font-style:italic;">
                                                    “This is your soft life meets smart strategy era.”
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ DECORATIVE DIVIDER ============ -->
                    <tr>
                        <td align="center" style="padding:22px 32px 12px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="font-size:16px;color:#F2B8C4;letter-spacing:6px;line-height:1;">&nbsp;💖&nbsp;🎀&nbsp;💖&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ CTA (luxury pink gradient button) ============ -->
                    <tr>
                        <td align="center" style="padding:8px 32px 14px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="font-family:'Playfair Display',Georgia,serif;font-size:18px;line-height:1.4;color:#B55467;font-weight:500;">
                                        Ready to dive in?
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:16px;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="background-color:#D4677A;background-image:linear-gradient(135deg,#E88A9D,#D4677A,#C14D63);border-radius:50px;box-shadow:0 8px 24px rgba(212,103,122,0.30);">
                                                    <a href="https://herdigitalplaybook.com" target="_blank" style="display:inline-block;padding:18px 42px;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.3;color:#FFFFFF;font-weight:600;text-decoration:none;letter-spacing:0.4px;border-radius:50px;text-align:center;white-space:nowrap;">
                                                        ✨ Explore Her Digital Playbook ✨
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ CLOSING (script love note) ============ -->
                    <tr>
                        <td align="center" style="padding:18px 32px 6px 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="font-family:'Great Vibes','Parisienne','Sacramento','Allura',cursive;font-size:26px;line-height:1.5;color:#D4677A;font-weight:400;letter-spacing:0.4px;">
                                        Welcome home, lovely.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:8px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#4B383C;font-weight:400;">
                                        Your future self is already smiling. Keep showing up — you're exactly where you need to be.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:18px;font-family:'Great Vibes','Parisienne','Sacramento','Allura',cursive;font-size:28px;line-height:1.5;color:#C7546B;font-weight:400;">
                                        Love,
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="font-family:'Playfair Display',Georgia,serif;font-size:20px;line-height:1.4;color:#B55467;font-weight:500;">
                                        Princess
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top:2px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#C49CA3;text-transform:uppercase;">
                                        Founder, Her Digital Playbook
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ============ BOTTOM DECORATIVE RIBBON ============ -->
                    <tr>
                        <td style="background-image:linear-gradient(135deg,#F9D5D3,#F2B8B5,#FBC8D4,#FADDE1);background-color:#F9D5D3;height:6px;font-size:0;line-height:0;border-radius:20px 20px 0 0;" height="6">
                            &nbsp;
                        </td>
                    </tr>

                </table>
                <!-- END MAIN CONTAINER -->

                <!-- ============ FOOTER (pink minimal) ============ -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin-top:22px;">
                    <tr>
                        <td align="center" style="padding:6px 20px;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;color:#C49CA3;font-weight:400;">
                            Her Digital Playbook &copy; 2026 &nbsp;|&nbsp; All rights reserved
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:2px 20px;">
                            <a href="https://herdigitalplaybook.com" target="_blank" style="color:#E18A99;text-decoration:underline;font-family:Helvetica,Arial,sans-serif;font-size:11px;">herdigitalplaybook.com</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:6px 20px;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#D4A5AF;">
                            💌 Instagram &nbsp;·&nbsp; Pinterest &nbsp;·&nbsp; TikTok &nbsp;·&nbsp; YouTube
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:10px 20px 4px 20px;font-family:Helvetica,Arial,sans-serif;font-size:10.5px;line-height:1.6;color:#D4A5AF;font-weight:400;">
                            You received this email because you signed up at Her Digital Playbook.<br>
                            If you'd like to step away, you can <a href="{{UNSUBSCRIBE_URL}}" target="_blank" style="color:#E18A99;text-decoration:underline;">unsubscribe here</a> anytime — no hard feelings. 💕
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
    <!-- END OUTER WRAPPER -->

</body>
</html>`;
