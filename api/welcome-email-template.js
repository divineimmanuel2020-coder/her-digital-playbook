/* =============================================
   WELCOME-EMAIL-TEMPLATE.JS
   The full "Welcome Home, Gorgeous" redesign — a colourful,
   editorial, table-based HTML email built for real email client
   compatibility (Gmail, Gmail mobile, Outlook, Apple Mail, Yahoo).

   Two placeholders are swapped by api/subscribe.js at send time,
   exactly as before — nothing about the sending logic changed:

     {{SUBSCRIBER_NAME}}   -> the subscriber's real name
     {{UNSUBSCRIBE_URL}}   -> their real unsubscribe link

   Design notes:
   - Every layout is a single-column, role="presentation" table —
     no side-by-side card grids that could break in Outlook, so
     nothing needs a media query to "stack" on mobile; it's already
     one column everywhere, which is also simply the safest pattern
     across every major email client.
   - No <img> tags at all — every visual element is colour, type,
     and emoji, so the email looks exactly the same whether or not
     the subscriber's client blocks images.
   - Colours pull directly from the Her Digital Playbook palette:
     blush pink, hot pink/raspberry, lilac, peach, butter yellow,
     deep plum, and burgundy, each used section-by-section.
   ============================================= */

export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Welcome to Her Digital Playbook</title>
<!--[if mso]>
<style type="text/css">
  body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
</style>
<![endif]-->
<style type="text/css">
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background-color:#FFF8F2; }
  table { border-collapse:collapse; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  a { text-decoration:none; }
  .email-wrapper { width:100%; background-color:#FFF8F2; }
  .email-container { max-width:600px; margin:0 auto; }
  @media only screen and (max-width:600px) {
    .email-container { width:100% !important; }
    .stack { display:block !important; width:100% !important; }
    .px-mobile { padding-left:20px !important; padding-right:20px !important; }
    .hero-headline { font-size:30px !important; line-height:1.15 !important; }
    .section-headline { font-size:22px !important; }
    .card-pad { padding:20px !important; }
    .btn-full { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#FFF8F2;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#FFF8F2;">
    Hi {{SUBSCRIBER_NAME}} \u2014 welcome to the Girl Gang. Money moves, career glow-ups, and opportunities from Lagos to London are waiting inside. \u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C\u200C
  </div>

  <table role="presentation" class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:24px;overflow:hidden;">

          <!-- ============ MASTHEAD ============ -->
          <tr>
            <td align="center" bgcolor="#4A2545" style="background-color:#4A2545;padding:22px 20px;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:22px;color:#F6C9D6;">Her\u2661</span>
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:2px;color:#FFFFFF;font-weight:bold;">&nbsp;&nbsp;DIGITAL PLAYBOOK</span>
            </td>
          </tr>

          <!-- ============ HERO ============ -->
          <tr>
            <td class="px-mobile" align="center" bgcolor="#FDEEF2" style="background-color:#FDEEF2;background-image:linear-gradient(135deg,#FDEEF2 0%,#FBE0E8 55%,#FFF3E9 100%);padding:44px 36px 40px;">
              <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:20px;color:#EC5C82;">Hi {{SUBSCRIBER_NAME}},</p>
              <h1 class="hero-headline" style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:36px;line-height:1.1;color:#3A1B32;font-weight:900;letter-spacing:-0.5px;">WELCOME HOME,<br>GORGEOUS. \ud83c\udf80</h1>
              <p style="margin:0 auto;max-width:440px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#5C4650;">You're officially part of the <strong>Her Digital Playbook Girl Gang</strong> \u2014 and honestly? I'm so happy you're here.</p>
              <p style="margin:16px auto 0;max-width:440px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#5C4650;">This inbox is about to become your spot for money moves, career opportunities, digital skills, business ideas, AI, freelancing, online income, tools, and the honest big-sis advice to actually use all of it.</p>
            </td>
          </tr>

          <!-- ============ WHAT YOU'LL GET ============ -->
          <tr>
            <td class="px-mobile" style="padding:40px 28px 12px;">
              <p style="margin:0 0 22px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;color:#C9A253;font-weight:bold;text-transform:uppercase;">What You'll Get Here</p>
            </td>
          </tr>

          <tr>
            <td class="px-mobile" style="padding:0 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#FBE0E8" style="background-color:#FBE0E8;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#7A2039;">\ud83d\udcb8 Money Moves</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Practical ways to make money online, grow your income, and discover new income streams.</p>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td bgcolor="#E6E0F5" style="background-color:#E6E0F5;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#4A2545;">\ud83d\udcbc Career Glow-Ups</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">CV advice, LinkedIn strategy, salary negotiation, remote work, and international career opportunities.</p>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td bgcolor="#FCD9C2" style="background-color:#FCD9C2;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#7A3B1D;">\ud83d\udcbb Digital Skills</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">AI, freelancing, virtual assistance, content creation, and other skills that actually pay.</p>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td bgcolor="#FDE9A8" style="background-color:#FDE9A8;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#6B5416;">\ud83d\udecd\ufe0f Business Ideas</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Digital products, online businesses, personal brands, and turning your skills into real income.</p>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td bgcolor="#4A2545" style="background-color:#4A2545;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#F6C9D6;">\ud83c\udf0d Opportunities</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#EAD9E5;">Jobs, fellowships, scholarships, grants, and programmes worth knowing about \u2014 wherever you are.</p>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td bgcolor="#F6C9D6" style="background-color:#F6C9D6;border-radius:16px;padding:20px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#7A2039;">\ud83c\udf81 Tools &amp; Resources</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Calculators, templates, guides, checklists, and prompts you can actually use today.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ BIG SIS TIP ============ -->
          <tr>
            <td style="padding:40px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="card-pad" bgcolor="#3A1B32" style="background-color:#3A1B32;padding:44px 40px;" align="center">
                    <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:52px;line-height:0.5;color:#C9A253;">&#8220;</p>
                    <p style="margin:0 0 16px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;color:#EC5C82;font-weight:bold;text-transform:uppercase;">A Little Big-Sis Talk \ud83d\udc8c</p>
                    <p style="margin:0 auto;max-width:440px;text-align:center;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.5;color:#FFF8F2;">Don't wait until you feel completely ready.</p>
                    <p style="margin:16px auto 0;max-width:440px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#EAD9E5;">The girl who starts with one skill, one idea, one application, or one tiny offer today can be in a completely different financial position twelve months from now. You don't need to have everything figured out. You just need to start making better moves. That's what we're here for.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ SO WHERE DO WE START ============ -->
          <tr>
            <td class="px-mobile" style="padding:40px 28px 8px;" align="center">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:900;color:#3A1B32;" class="section-headline">SO... WHERE DO WE START? \ud83c\udf80</p>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#8A7480;">A few places to jump in right now \u2014 no overwhelm, just pick one.</p>
            </td>
          </tr>

          <tr>
            <td class="px-mobile" style="padding:16px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border:1.5px solid #FBE0E8;border-radius:16px;padding:22px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#3A1B32;">\ud83d\udcb8 Make Your First $2,000 Online</p>
                    <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Discover practical ways to begin building online income \u2014 no guesswork, just a real plan.</p>
                    <a href="https://herdigitalplaybook.com/pages/article.html?id=first-2000-online" class="btn-full" style="display:inline-block;background-color:#EC5C82;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:50px;">READ THE GUIDE \u2192</a>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td style="border:1.5px solid #E6E0F5;border-radius:16px;padding:22px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#3A1B32;">\ud83d\udcbb Build Your Digital Skills</p>
                    <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Explore every Money Mission and pick a skill worth learning this week.</p>
                    <a href="https://herdigitalplaybook.com/#articles" class="btn-full" style="display:inline-block;background-color:#EC5C82;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:50px;">EXPLORE ARTICLES \u2192</a>
                  </td>
                </tr>
                <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td style="border:1.5px solid #FCD9C2;border-radius:16px;padding:22px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#3A1B32;">\ud83e\uddf0 Explore Free Tools</p>
                    <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#5C4650;">Calculators and checklists to help you price, plan, and negotiate with confidence.</p>
                    <a href="https://herdigitalplaybook.com/#tools" class="btn-full" style="display:inline-block;background-color:#EC5C82;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:50px;">TRY A TOOL \u2192</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ INTERNATIONAL GIRL GANG ============ -->
          <tr>
            <td style="padding:44px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="card-pad" align="center" bgcolor="#7A2039" style="background-color:#7A2039;background-image:linear-gradient(120deg,#7A2039 0%,#4A2545 100%);padding:40px 30px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.6;font-weight:900;color:#FFFFFF;text-align:center;">FROM LAGOS TO LONDON.<br>FROM ACCRA TO TORONTO.<br>FROM NAIROBI TO NEW YORK.</p>
                    <p style="margin:14px 0 0;font-family:Georgia,serif;font-style:italic;font-size:17px;color:#F6C9D6;text-align:center;">Wherever you are \u2014 you're welcome here. \ud83c\udf0d</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ COMMUNITY ============ -->
          <tr>
            <td class="px-mobile" align="center" style="padding:40px 30px;">
              <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:900;color:#3A1B32;" class="section-headline">YOU'RE ONE OF US NOW. \ud83e\udd17\ud83c\udf80</p>
              <p style="margin:0 auto;max-width:440px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#5C4650;">The Girl Gang is women supporting women \u2014 sharing opportunities, learning new skills, and making smarter money moves together. No gatekeeping, no judgment. Just girls actually helping girls build something real.</p>
            </td>
          </tr>

          <!-- ============ PRIMARY CTA ============ -->
          <tr>
            <td align="center" style="padding:8px 28px 44px;">
              <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:900;color:#3A1B32;">LET'S GET STARTED, GORGEOUS. \ud83c\udf80</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#EC5C82" style="background-color:#EC5C82;background-image:linear-gradient(120deg,#F6C9D6,#EC5C82,#C9A253);border-radius:50px;">
                    <a href="https://herdigitalplaybook.com/" class="btn-full" style="display:inline-block;padding:16px 40px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;letter-spacing:0.5px;">EXPLORE HER DIGITAL PLAYBOOK \u2192</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ PERSONAL LETTER ============ -->
          <tr>
            <td class="px-mobile" bgcolor="#FFF8F2" style="background-color:#FFF8F2;padding:40px 32px;">
              <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#5C4650;">Please don't think you have to become a completely different person to build the life you want.</p>
              <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#5C4650;">You don't need to hustle 24/7. You don't need to know everything. You don't need to compare your chapter one to someone else's chapter twenty.</p>
              <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#5C4650;">We're building this intentionally.</p>
              <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#EC5C82;font-weight:bold;">One skill. One opportunity. One money move. One brave decision at a time.</p>
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#3A1B32;">Welcome to the Girl Gang. \ud83e\udd17\ud83c\udf80</p>
              <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#5C4650;">We're so glad you're here.</p>
              <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#7A2039;">Princess</p>
              <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8A7480;">Her Digital Playbook<br>Your digital big sis on money, careers, business &amp; opportunities.</p>
            </td>
          </tr>

          <!-- ============ P.S. CARD ============ -->
          <tr>
            <td class="px-mobile" style="padding:0 28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#FDE9A8" style="background-color:#FDE9A8;border-radius:16px;padding:20px 22px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#6B5416;">P.S. \ud83d\udc97</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5C4650;">Save this email. You never know which little idea you discover inside Her Digital Playbook will become your next big money move.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ MOVE TO PRIMARY REMINDER (placed at the end, not the top, so it doesn't distract from the main welcome message) ============ -->
          <tr>
            <td class="px-mobile" style="padding:0 28px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-top:1px solid #F3D9E0;padding:20px 10px 0;">
                    <p style="margin:0;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#8A7480;">
                      \ud83d\udccc Girl if you don't find our email, check promotions tab in your Gmail app, Tap the three dots menu at the top right, click on <strong>MOVE TO</strong>, then move us to <strong>Primary</strong> to keep receiving more beautiful emails. Don't miss the life-changing opportunities we've got for you. \u2728
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============ FOOTER ============ -->
          <tr>
            <td align="center" bgcolor="#3A1B32" style="background-color:#3A1B32;padding:36px 28px;">
              <p style="margin:0 0 14px;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#F6C9D6;">Her\u2661 Digital Playbook</p>
              <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:2;color:#EAD9E5;">
                <a href="https://herdigitalplaybook.com/" style="color:#EAD9E5;">Home</a> &nbsp;\u00b7&nbsp;
                <a href="https://herdigitalplaybook.com/#articles" style="color:#EAD9E5;">Articles</a> &nbsp;\u00b7&nbsp;
                <a href="https://herdigitalplaybook.com/#tools" style="color:#EAD9E5;">Free Tools</a> &nbsp;\u00b7&nbsp;
                <a href="https://herdigitalplaybook.com/pages/about.html" style="color:#EAD9E5;">About</a> &nbsp;\u00b7&nbsp;
                <a href="https://herdigitalplaybook.com/pages/contact.html" style="color:#EAD9E5;">Contact</a>
              </p>
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#B89AAE;">herdigitalplaybook.com</p>
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#B89AAE;">You're receiving this because you joined the Her Digital Playbook Girl Gang.</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;">
                <a href="{{UNSUBSCRIBE_URL}}" style="color:#B89AAE;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
