/* =============================================
   WELCOME-EMAIL-TEMPLATE-PLAIN.JS
   A second, deliberately plain version of the welcome email —
   same warmth, same information, same personalization, but with
   almost none of the visual "marketing email" signals: no
   gradients, no color-block cards, no styled button, minimal
   HTML structure, one plain hyperlink.

   This exists purely to A/B test against the original styled
   template (welcome-email-template.js) for Gmail Primary-tab
   placement. Nothing here is guaranteed to land in Primary either
   — Gmail decides that per-recipient, over time — but this is the
   version that gives you the best real odds.

   Same two placeholders as the styled version:
     {{SUBSCRIBER_NAME}}
     {{UNSUBSCRIBE_URL}}
   ============================================= */

export const WELCOME_EMAIL_TEMPLATE_PLAIN = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Her Digital Playbook</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#2b2b2b;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:0;line-height:0;">
    Hey {{SUBSCRIBER_NAME}} — quick note now that you're signed up.
  </div>

  <div style="max-width:600px;margin:0 auto;padding:32px 20px;font-size:15px;line-height:1.7;">

    <p>Hey {{SUBSCRIBER_NAME}},</p>

    <p>I'm genuinely glad you signed up. You've joined Her Digital Playbook — a space for women who want more freedom, more creativity, more income, and more control over their lives.</p>

    <p>This isn't a typical newsletter. Think of it as a running playbook: practical guides, honest encouragement, and tools you can actually use — no fluff, no fake gurus.</p>

    <p>A few things you'll find inside:</p>

    <p>
      &middot; Practical step-by-step guides<br>
      &middot; Free resources and digital tools<br>
      &middot; Ready-to-use templates and checklists<br>
      &middot; AI prompts that save you hours<br>
      &middot; Weekly notes, big-sister style
    </p>

    <p>Women in this community are building real results — from their first few hundred dollars to consistent monthly income — by learning one practical skill at a time. No income is guaranteed, only honest guidance and steady work.</p>

    <p>When you have a minute, take a look around: <a href="https://herdigitalplaybook.com" style="color:#B5546A;">herdigitalplaybook.com</a></p>

    <p>One small favor — if this landed somewhere other than your main inbox, dragging it there (or replying to say hi) helps make sure future emails land where you'll actually see them.</p>

    <p>Welcome home.</p>

    <p>
      Love,<br>
      Princess<br>
      <span style="color:#8a8a8a;font-size:13px;">Founder, Her Digital Playbook</span>
    </p>

    <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0 16px 0;">

    <p style="font-size:12px;color:#8a8a8a;line-height:1.6;">
      You're receiving this because you signed up at Her Digital Playbook.<br>
      <a href="{{UNSUBSCRIBE_URL}}" style="color:#8a8a8a;">Unsubscribe</a> anytime — no hard feelings.
    </p>

  </div>
</body>
</html>`;
