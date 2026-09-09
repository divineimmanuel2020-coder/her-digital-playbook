/* =============================================
   DATA/PLAYGROUND.JS
   All content for Her Digital Playground — the Money Path quiz,
   Game Room mini-games, Client Simulator scenarios, Templates
   library, and the Glossary. Kept separate from data/store.js
   (articles/tools) since this content is consumed by dedicated
   pages, not the article.html?id= renderer.

   Nothing here talks to localStorage or the DOM — that's handled
   by js/playground.js and the page-specific scripts. This file is
   pure content, the same separation store.js already uses.
   ============================================= */

/* =============================================
   MONEY PATH QUIZ
   10 questions. Each option is tagged with the Money Path type(s)
   it points toward. Scores are tallied client-side in
   js/money-path.js; a clear winner returns that result, a close
   spread returns the "explorer" result instead of forcing an
   identity.
   ============================================= */

export const MONEY_PATH_QUESTIONS = [
  {
    question: 'What sounds most fun to actually work on?',
    options: [
      { label: 'Designing something beautiful', type: 'creative' },
      { label: 'Helping someone solve a problem directly', type: 'people' },
      { label: "Figuring out why something isn't working", type: 'strategist' },
      { label: 'Building or automating a tool or system', type: 'builder' },
      { label: 'Turning chaos into a clean, organized system', type: 'organized' },
      { label: 'Launching your own thing from scratch', type: 'entrepreneurial' },
    ],
  },
  {
    question: 'Which one is most "you"?',
    options: [
      { label: 'I think in pictures, colors, and stories', type: 'creative' },
      { label: 'I think in numbers, patterns, and logic', type: 'strategist' },
      { label: 'I think in people, conversations, and relationships', type: 'people' },
      { label: 'I think in systems, steps, and structure', type: 'organized' },
    ],
  },
  {
    question: 'How do you like to communicate?',
    options: [
      { label: 'Writing something once, polished, for lots of people', type: 'strategist' },
      { label: 'Talking directly, one-on-one', type: 'people' },
      { label: 'Showing, not telling — visuals over words', type: 'creative' },
      { label: "Documenting clearly so nothing gets missed", type: 'organized' },
    ],
  },
  {
    question: 'Pick a Saturday project.',
    options: [
      { label: 'Redesigning your Instagram feed', type: 'creative' },
      { label: "Helping a friend plan her whole week", type: 'organized' },
      { label: 'Researching how a business could grow', type: 'strategist' },
      { label: 'Trying out a new app or AI tool', type: 'builder' },
      { label: "Selling something you made", type: 'entrepreneurial' },
    ],
  },
  {
    question: "What's your tech comfort level?",
    options: [
      { label: 'I love learning new tools and tinkering with them', type: 'builder' },
      { label: "I use tech, but I don't love tinkering with it", type: 'people' },
      { label: 'I like using tech to make things look good', type: 'creative' },
      { label: 'I like using tech to stay organized', type: 'organized' },
    ],
  },
  {
    question: 'How do you feel about independence at work?',
    options: [
      { label: 'I want full control over my own schedule and decisions', type: 'entrepreneurial' },
      { label: 'I like structure and someone to check in with', type: 'organized' },
      { label: 'I like collaborating closely with people', type: 'people' },
      { label: 'I like deep, focused time alone on one hard problem', type: 'strategist' },
    ],
  },
  {
    question: 'Working with people — true or not for you?',
    options: [
      { label: "I love being the go-to person people rely on", type: 'people' },
      { label: 'I prefer working behind the scenes', type: 'builder' },
      { label: 'I like presenting ideas and persuading people', type: 'strategist' },
      { label: 'I like working with people who share a creative vision', type: 'creative' },
    ],
  },
  {
    question: 'How do you feel about selling?',
    options: [
      { label: 'Selling feels pretty natural to me', type: 'entrepreneurial' },
      { label: "I'd rather the work speak for itself", type: 'creative' },
      { label: "I'm fine selling if I believe in it and understand it", type: 'strategist' },
      { label: "I'd rather support the selling than do it myself", type: 'organized' },
    ],
  },
  {
    question: 'Which career goal excites you most?',
    options: [
      { label: 'Building my own income streams and being my own boss', type: 'entrepreneurial' },
      { label: 'Becoming known for a specific creative skill', type: 'creative' },
      { label: 'Becoming the person who keeps everything running smoothly', type: 'organized' },
      { label: 'Becoming a trusted strategist people come to for advice', type: 'strategist' },
      { label: "Becoming a go-to helper businesses can't do without", type: 'people' },
      { label: 'Becoming someone who builds and ships digital tools', type: 'builder' },
    ],
  },
  {
    question: 'Picture your ideal work day. What are you doing?',
    options: [
      { label: 'Deep in a creative project, headphones on', type: 'creative' },
      { label: 'Full of calls and messages with real people', type: 'people' },
      { label: 'Solving a specific business problem with data', type: 'strategist' },
      { label: 'Building or testing something technical', type: 'builder' },
      { label: 'Checking off a satisfying, organized task list', type: 'organized' },
      { label: 'Pitching or launching something of your own', type: 'entrepreneurial' },
    ],
  },
];

export const MONEY_PATH_RESULTS = {
  creative: {
    id: 'creative',
    icon: '🎨',
    label: 'The Creative Earner',
    desc: "You think in images, stories, and style — and there's real money in that when it's pointed at a specific audience.",
    directions: ['Graphic Design', 'Web Design', 'Content Creation', 'Video Editing', 'Digital Products'],
    skills: ['Visual design', 'Storytelling', 'Content creation', 'Basic design tools like Canva'],
    firstMove: 'Pick one creative skill and build 3 practice samples this week — even without a client yet.',
    articles: ['best-money-making-skills-2026', 'digital-skills-for-beginners', 'personal-branding-for-beginners'],
  },
  people: {
    id: 'people',
    icon: '💬',
    label: 'The People Person',
    desc: 'You genuinely like people, and businesses will pay well for someone who communicates clearly and makes clients feel taken care of.',
    directions: ['Virtual Assistance', 'Social Media Management', 'Client Success', 'Sales', 'Community Management'],
    skills: ['Client communication', 'Organization', 'Social media basics', 'Customer service'],
    firstMove: 'Read the Virtual Assistant article and write your one-sentence offer for who you help and how.',
    articles: ['virtual-assistant-pretty-paid-booked', 'how-to-get-your-first-freelance-client', 'digital-skills-for-beginners'],
  },
  strategist: {
    id: 'strategist',
    icon: '🧠',
    label: 'The Strategist',
    desc: "You think in patterns and problems, and you're drawn to figuring out the 'why' before jumping into the 'how.'",
    directions: ['Digital Marketing', 'SEO', 'Copywriting', 'Business Strategy', 'Email Marketing'],
    skills: ['Research', 'Writing', 'Analysis', 'Marketing fundamentals'],
    firstMove: "Pick one business you admire and write down 3 things you'd change about their marketing.",
    articles: ['best-money-making-skills-2026', 'making-money-online-things-beginners-need-to-know', 'personal-branding-for-beginners'],
  },
  builder: {
    id: 'builder',
    icon: '💻',
    label: 'The Digital Builder',
    desc: 'You like understanding how things actually work, and you enjoy learning new tools well enough to teach yourself the next one.',
    directions: ['Web Design', 'UI/UX', 'No-code tools', 'Automation', 'Technical digital services'],
    skills: ['Tool literacy', 'Problem-solving', 'Basic web concepts', 'AI-assisted workflows'],
    firstMove: 'Spend 30 minutes exploring one no-code or AI tool you\u2019ve never used, and build one tiny thing with it.',
    articles: ['digital-skills-for-beginners', 'how-to-create-and-sell-a-digital-product', '30-day-digital-skills-challenge'],
  },
  organized: {
    id: 'organized',
    icon: '📊',
    label: 'The Organized Girl',
    desc: "You bring order to chaos, and that's a genuinely rare, valuable skill that businesses will pay to have on their team.",
    directions: ['Virtual Assistance', 'Project Coordination', 'Operations', 'Bookkeeping-related learning', 'Administrative digital services'],
    skills: ['Systems thinking', 'Time management', 'Tools like Notion or Trello', 'Attention to detail'],
    firstMove: 'Build one simple system (a tracker, a calendar, a checklist) for a task you already do regularly.',
    articles: ['virtual-assistant-pretty-paid-booked', 'digital-skills-for-beginners', 'how-to-get-paid-as-a-freelancer'],
  },
  entrepreneurial: {
    id: 'entrepreneurial',
    icon: '🚀',
    label: 'The Entrepreneurial Girl',
    desc: 'You want to build something that\u2019s yours — and you\u2019re drawn to ownership over a paycheck.',
    directions: ['Digital Products', 'Online Business', 'Content Business', 'Freelancing', 'Service Businesses'],
    skills: ['Idea validation', 'Basic sales', 'Offer building', 'Consistency'],
    firstMove: 'Write down one problem you could solve for people and who specifically has that problem.',
    articles: ['how-to-create-and-sell-a-digital-product', 'build-your-online-empire', 'how-to-make-your-first-1000-online'],
  },
  explorer: {
    id: 'explorer',
    icon: '🌱',
    label: 'The Explorer',
    desc: "Your answers were spread pretty evenly — and that's completely fine. You don't need to pick your forever career today.",
    directions: ['A little bit of everything — and that\u2019s the point right now'],
    skills: ['Curiosity', 'Willingness to test things', 'Follow-through'],
    firstMove: 'Start by testing one skill for 30 days instead of trying to decide your whole path today.',
    articles: ['best-money-making-skills-2026', 'digital-skills-for-beginners'],
  },
};

/* =============================================
   GAME ROOM — 6 MINI-GAMES
   ============================================= */

// Game 1 — Money Moves: financial decision scenarios, no universally
// "correct" answer, just honest reasoning for each option.
export const GAME_MONEY_MOVES = [
  {
    situation: 'You just received your first $500 from freelance work. What would be the smartest next move?',
    options: [
      { label: 'Spend it on something fun to celebrate', feedback: 'Celebrating a first win is fair — just be intentional about how much of it goes to celebration versus your next move.' },
      { label: 'Put it all into savings', feedback: 'Solid instinct, especially if you have no emergency fund yet — though some freelancers also reinvest a portion into their business.' },
      { label: 'Reinvest some of it into a tool or skill that helps you earn more', feedback: 'A common smart move — a portion reinvested into your own capability can pay off, as long as it\u2019s not the entire amount.' },
      { label: 'Split it — some savings, some reinvestment, a little for yourself', feedback: 'This balanced approach is popular for a reason: it protects you, grows your skills, and acknowledges the win, all at once.' },
    ],
  },
  {
    situation: 'A client offers to pay you in "exposure" instead of money for a real project.',
    options: [
      { label: 'Accept it — exposure could lead to real clients', feedback: 'Exposure can occasionally lead somewhere, but it\u2019s worth asking what specifically that exposure looks like before agreeing to work for free.' },
      { label: "Decline and explain you're not able to work for exposure alone", feedback: 'A clear, professional decline protects your rate and time — most legitimate clients will understand.' },
      { label: 'Offer a smaller scope in exchange for the exposure', feedback: 'A reasonable middle ground if the exposure is genuinely valuable and specific, not vague.' },
      { label: 'Ask exactly what the exposure includes before deciding', feedback: 'Smart — getting specifics turns a vague offer into something you can actually evaluate.' },
    ],
  },
  {
    situation: "You're deciding whether to buy a $300 course promising to teach you a skill you're learning for free elsewhere.",
    options: [
      { label: 'Buy it — more investment means more commitment', feedback: 'Paying for something can boost commitment for some people, but it\u2019s not the only path to follow-through.' },
      { label: 'Skip it and keep using free resources', feedback: 'A reasonable call, especially early on — free resources are often genuinely enough to build real skill.' },
      { label: 'Wait until you\u2019ve exhausted free resources, then decide', feedback: 'A cautious, practical approach — you\u2019ll know exactly what gap the paid course would actually fill.' },
      { label: 'Ask someone who took the course if it delivered on its promise', feedback: 'A smart way to reduce risk before spending — direct, specific feedback beats a sales page every time.' },
    ],
  },
  {
    situation: 'You made $1,200 this month from a side hustle — more than usual. What do you do?',
    options: [
      { label: "Treat it as your new normal and plan spending around it", feedback: 'Worth caution — one strong month isn\u2019t necessarily a new baseline, especially for irregular income.' },
      { label: 'Set part of it aside for a slower month', feedback: 'A strong habit for irregular income — treating good months as a buffer for leaner ones protects you long-term.' },
      { label: 'Use it all to pay down a small debt', feedback: 'Reasonable, especially for high-interest debt — just make sure you still have some cushion left.' },
      { label: 'Invest in equipment or tools for your hustle', feedback: 'Can be smart if the tool genuinely increases your capacity or quality — worth weighing against having a buffer too.' },
    ],
  },
  {
    situation: "A friend asks to borrow money you'd need for a client's project deposit refund next week.",
    options: [
      { label: 'Lend it anyway to help her out', feedback: 'Generous, but risky if it leaves you unable to meet a real business obligation — worth being upfront about that constraint.' },
      { label: 'Explain you can\u2019t right now because it\u2019s already committed', feedback: 'A clear, honest boundary — protecting money already earmarked for a real obligation is a healthy habit.' },
      { label: 'Offer a smaller amount instead of the full request', feedback: 'A reasonable compromise that helps without compromising your own commitments.' },
      { label: 'Suggest another way to help that isn\u2019t money', feedback: 'A thoughtful option — support doesn\u2019t always have to be financial.' },
    ],
  },
];

// Game 2 — Client or Red Flag?
export const GAME_RED_FLAG = [
  { situation: "I need you to complete the entire project tonight. I'll pay you after I get paid by my customer.", isRedFlag: true, explanation: 'Two warning signs at once: an unrealistic deadline and payment contingent on someone else\u2019s payment, not yours.' },
  { situation: 'Here\u2019s the full project brief, timeline, and budget — let me know if you have questions before we start.', isRedFlag: false, explanation: 'Clear scope, timeline, and budget upfront is exactly what a healthy client relationship looks like.' },
  { situation: 'Before we hire you, can you create three full logo concepts for us to review?', isRedFlag: true, explanation: 'Extensive unpaid "test work" — especially deliverable-level work — is a common way real labor gets extracted for free.' },
  { situation: 'Can you just add these five extra things? They\u2019re small, shouldn\u2019t take long.', isRedFlag: true, explanation: 'Classic scope creep — "small" additions outside the agreed scope should still be discussed and often billed.' },
  { situation: 'I\u2019d like to send a 50% deposit before we begin — here\u2019s my payment info.', isRedFlag: false, explanation: 'A client proactively offering a deposit is a strong, healthy signal.' },
  { situation: 'Can you send me your bank login so I can deposit your payment directly?', isRedFlag: true, explanation: 'No legitimate client needs your bank login — payments go through normal transfers or invoicing, never account credentials.' },
  { situation: 'I need unlimited revisions until I\u2019m fully satisfied, with no end date.', isRedFlag: true, explanation: 'Unlimited, open-ended revisions with no cap are a common source of scope creep and burnout — a healthy agreement caps revisions.' },
  { situation: 'I\u2019d rather not sign anything — let\u2019s just start and figure out the details as we go.', isRedFlag: true, explanation: 'A client unwilling to put basic terms in writing is a meaningful risk factor for payment or scope disputes later.' },
];

// Game 3 — Skill Match
export const GAME_SKILL_MATCH = [
  { problem: 'A business needs short-form videos for Instagram and TikTok.', options: ['Video Editing', 'Bookkeeping', 'SEO'], correctIndex: 0, explanation: 'Short-form video content calls for video editing skills — trimming, captions, pacing, and platform-specific formatting.' },
  { problem: 'A local bakery isn\u2019t showing up when people search "cupcakes near me."', options: ['Graphic Design', 'SEO', 'Video Editing'], correctIndex: 1, explanation: 'Showing up in local search results is an SEO problem — optimizing their listing and website for relevant search terms.' },
  { problem: 'A coach has too many emails and DMs to manage and no system for it.', options: ['Virtual Assistance', 'Copywriting', 'Video Editing'], correctIndex: 0, explanation: 'Inbox and scheduling overwhelm is a classic virtual assistance problem — organizing and managing communication.' },
  { problem: 'A new online store\u2019s product pages aren\u2019t convincing anyone to buy.', options: ['Copywriting', 'Bookkeeping', 'Web Hosting'], correctIndex: 0, explanation: 'Persuasive, clear product descriptions are a copywriting skill — turning features into reasons to buy.' },
  { problem: 'A small business owner has no idea where her money is going each month.', options: ['SEO', 'Bookkeeping basics', 'Content Creation'], correctIndex: 1, explanation: 'Tracking and categorizing income and expenses is a bookkeeping-adjacent skill.' },
  { problem: 'A creator wants a simple website to sell one digital product.', options: ['Web Design', 'Email Marketing', 'Virtual Assistance'], correctIndex: 0, explanation: 'Building a simple, functional sales page or website calls for basic web design skills.' },
];

// Game 4 — Inbox Boss: client messages, several response options, one
// flagged as the strongest with honest trade-offs on the others.
export const GAME_INBOX_BOSS = [
  {
    message: 'Can you quickly add three extra things to the project? They\u2019re tiny.',
    options: [
      { label: 'Sure, no problem at all', tier: 1, feedback: 'Generous, but agreeing instantly to undefined "extras" makes it hard to hold a scope boundary next time.' },
      { label: 'Happy to look — can you tell me exactly what those three things are so I can see if they fit the current scope?', tier: 3, feedback: 'Strong response: professional, not defensive, and gets the specifics needed before committing to anything.' },
      { label: 'No, that\u2019s not part of the agreement', tier: 2, feedback: 'A fair boundary, though a bit blunt — pairing it with a path forward (a quote for the extra work) tends to land better.' },
    ],
  },
  {
    message: 'This isn\u2019t what I expected at all. I need it redone completely.',
    options: [
      { label: 'Redo everything immediately, no questions asked', tier: 1, feedback: 'Jumping straight to a full redo without understanding the gap can waste effort if the actual issue is small or a misunderstanding.' },
      { label: 'Ask specifically what\u2019s different from what was expected, referencing the original brief', tier: 3, feedback: 'Strong move — grounding the conversation in the original agreed brief protects both of you and clarifies the real issue.' },
      { label: 'Get defensive and explain why your work followed the brief', tier: 1, feedback: 'Understandable instinct, but leading with defense before understanding their concern can escalate an otherwise fixable situation.' },
    ],
  },
  {
    message: 'Can we hop on a call right now? It\u2019s urgent.',
    options: [
      { label: 'Drop everything and call immediately', tier: 1, feedback: 'Sometimes necessary, but constantly dropping everything trains clients to expect instant availability.' },
      { label: 'Reply that you can call in [specific time], and ask for a quick summary of the urgency in the meantime', tier: 3, feedback: 'Strong response — protects your schedule while still being responsive and gathering context first.' },
      { label: 'Ignore it until you feel like responding', tier: 1, feedback: 'Risky — even a brief acknowledgment reply is usually better than silence for something flagged as urgent.' },
    ],
  },
  {
    message: 'I found someone who\u2019ll do this for half your price. Can you match it?',
    options: [
      { label: 'Match the price immediately to keep the client', tier: 1, feedback: 'Matching instantly can undervalue your work and set an expectation that your rate is always negotiable under pressure.' },
      { label: 'Explain what\u2019s included in your price and offer a smaller scope if budget is the real constraint', tier: 3, feedback: 'Strong response — protects your rate while genuinely working with their budget through scope, not just discounting.' },
      { label: 'Tell them to go with the cheaper option then', tier: 2, feedback: 'A valid boundary, though a warmer version (wishing them well, leaving the door open) tends to preserve the relationship better.' },
    ],
  },
  {
    message: 'Just checking in — any update on timing?',
    options: [
      { label: 'Don\u2019t reply until it\u2019s actually done', tier: 1, feedback: 'Leaving a check-in unanswered often creates more anxiety for the client than an honest status update would.' },
      { label: 'Reply with a specific status and expected completion date', tier: 3, feedback: 'Strong response — specific, honest updates build trust even when things are running a little behind.' },
      { label: 'Reply vaguely that it\u2019s "coming soon"', tier: 2, feedback: 'Better than silence, but a vague answer tends to generate a follow-up question anyway — specifics save everyone time.' },
    ],
  },
];

// Game 5 — Price This Project: no single correct price, just a
// reflection exercise on the factors that should shape it.
export const GAME_PRICE_THIS = [
  {
    project: 'A small beauty business wants: 5 social graphics, 3 short-form videos, captions for each, and one week of scheduling.',
    considerations: ['How long would this realistically take you?', 'How much editing/design skill does it require?', 'How many revisions are included?', 'What would a client like this typically expect to pay in your market?'],
    ranges: ['Under $100', '$100–$300', '$300–$600', '$600+'],
  },
  {
    project: 'A coach wants a 20-page ebook written and designed from an outline she already has.',
    considerations: ['How much of the writing is truly from scratch versus organizing her outline?', 'How polished does the design need to be?', 'Is this a one-time project or could it lead to repeat work?'],
    ranges: ['Under $200', '$200–$500', '$500–$1,000', '$1,000+'],
  },
  {
    project: 'A local shop wants a simple 5-page website with no e-commerce, using a template.',
    considerations: ['How much custom design work is really needed?', 'Will you also handle hosting/domain setup?', 'What\u2019s included in "done" — content too, or just building it?'],
    ranges: ['Under $300', '$300–$800', '$800–$1,500', '$1,500+'],
  },
  {
    project: 'A creator wants ongoing monthly social media management: daily posts, community replies, monthly report.',
    considerations: ['Is this a one-time project or a retainer?', 'How many hours per week does this realistically take?', 'What\u2019s the client\u2019s business size and budget likely to be?'],
    ranges: ['Under $300/mo', '$300–$800/mo', '$800–$1,500/mo', '$1,500+/mo'],
  },
];

// Game 6 — Real or Scam?
export const GAME_REAL_OR_SCAM = [
  { situation: '"Congratulations! You\u2019ve been selected for a $5,000/week remote job. Just pay a small $200 registration fee to start."', isScam: true, explanation: 'Legitimate jobs never require you to pay a fee to start working — this is a classic pay-to-work scheme.' },
  { situation: 'A small business emails asking for a quote after finding your portfolio through a mutual connection.', isScam: false, explanation: 'A specific, low-pressure inquiry referencing real context (your portfolio, a mutual connection) is a normal, legitimate lead.' },
  { situation: '"Invest $500 today and we guarantee triple your money back in 30 days, no risk."', isScam: true, explanation: 'Guaranteed high returns with "no risk" is a hallmark of investment scams — real investing always carries risk.' },
  { situation: 'A client sends an overpayment by mistake and asks you to wire back the difference before their original payment clears.', isScam: true, explanation: 'A classic overpayment scam — the original payment often bounces after you\u2019ve already sent real money back.' },
  { situation: 'A brand reaches out with a clear scope, a written agreement, and pays 50% upfront through a standard invoice.', isScam: false, explanation: 'Clear scope, a written agreement, and a standard upfront deposit are all healthy, legitimate signs.' },
  { situation: '"We need you to buy gift cards for a project and send us the codes — we\u2019ll reimburse you."', isScam: true, explanation: 'Requests to purchase gift cards and send codes are an extremely common scam pattern, almost never legitimate.' },
  { situation: 'An email claiming to be from a payment platform asks you to "verify your account" by clicking a link and entering your password.', isScam: true, explanation: 'A classic phishing attempt — legitimate platforms don\u2019t ask you to re-enter your password through an emailed link.' },
  { situation: 'A recruiter messages you on LinkedIn about a role that matches your actual skills, then schedules a video call to discuss it.', isScam: false, explanation: 'A relevant opportunity plus a normal verification step (a real video call) is a reasonably healthy sign, though it\u2019s still smart to research the company independently.' },
];

/* =============================================
   CLIENT SIMULATOR — 7 SCENARIOS
   Each option carries a "tier" (1 = risky, 2 = reasonable, 3 =
   strong) used to compute the final Client Boss Level.
   ============================================= */

export const CLIENT_SIM_SCENARIOS = [
  {
    id: 'low-budget',
    title: 'The Low-Budget Client',
    message: 'I need a complete website tomorrow. My budget is $50.',
    options: [
      { label: 'Accept it to avoid losing the client', tier: 1, feedback: 'Accepting an unrealistic timeline and budget together often leads to burnout and resentment on a single project.' },
      { label: 'Explain what\u2019s realistically possible at that budget and timeline, and offer a smaller, honest option', tier: 3, feedback: 'Strong response — honest about constraints while still offering a path forward if one exists.' },
      { label: 'Decline without any explanation', tier: 2, feedback: 'A fair boundary, though a brief explanation usually leaves the door open for a better-fit project later.' },
    ],
  },
  {
    id: 'scope-creep',
    title: 'The Scope Creep',
    message: 'Can you just add these five extra things? They\u2019re small.',
    options: [
      { label: 'Add them for free to keep things smooth', tier: 1, feedback: 'Repeated "small" free additions add up fast and make it harder to hold scope on future projects.' },
      { label: 'Review what\u2019s being asked against the original scope, and quote the extras separately', tier: 3, feedback: 'Strong response — checking against the agreed scope before saying yes protects your time and rate.' },
      { label: 'Refuse outright with no further discussion', tier: 2, feedback: 'A valid boundary, though offering a quote for the extra work often satisfies the client just as well.' },
    ],
  },
  {
    id: 'unpaid-test',
    title: 'The Unpaid Test Work',
    message: 'Before we hire you, create three full designs for us.',
    options: [
      { label: 'Do all three for free to prove yourself', tier: 1, feedback: 'Extensive free "test work" — especially deliverable-level work — is a common way real labor gets extracted without pay.' },
      { label: 'Offer to show existing portfolio samples instead, or one small paid trial project', tier: 3, feedback: 'Strong response — protects your time while still giving the client a real way to evaluate your work.' },
      { label: 'Walk away immediately without responding', tier: 2, feedback: 'A reasonable instinct for a clear red flag, though a brief, professional decline is usually just as effective.' },
    ],
  },
  {
    id: 'payment-upfront',
    title: 'The Payment Question',
    message: 'Let\u2019s start first. I\u2019ll pay you when everything is finished.',
    options: [
      { label: 'Agree with no deposit or milestones', tier: 1, feedback: 'Starting real work with zero payment structure leaves you fully exposed if the client disappears.' },
      { label: 'Propose a deposit or milestone payments before starting', tier: 3, feedback: 'Strong, standard practice — a deposit or milestones protect your time without being an unreasonable ask.' },
      { label: 'Refuse to start unless paid in full upfront', tier: 2, feedback: 'Protective, though full upfront payment isn\u2019t always necessary or expected — a deposit is often enough.' },
    ],
  },
  {
    id: 'revision-loop',
    title: 'The Revision Loop',
    message: 'This is close, but can you just tweak it one more time? (Fifth time asking.)',
    options: [
      { label: 'Keep revising indefinitely to avoid conflict', tier: 1, feedback: 'Unlimited revisions with no cap are a common source of scope creep and burnout on a single project.' },
      { label: 'Reference the agreed number of revisions and offer to quote any beyond that', tier: 3, feedback: 'Strong response — a documented revision limit makes this conversation easy and non-confrontational.' },
      { label: 'Get frustrated and refuse to continue', tier: 1, feedback: 'Understandable frustration, but leading with refusal instead of a documented boundary can damage the relationship unnecessarily.' },
    ],
  },
  {
    id: 'difficult-client',
    title: 'The Difficult Client',
    message: 'This is honestly not good enough. I\u2019m really disappointed.',
    options: [
      { label: 'Respond defensively and list everything you did right', tier: 1, feedback: 'Leading with defense before understanding the specific concern tends to escalate rather than resolve the situation.' },
      { label: 'Stay calm, ask specifically what\u2019s falling short, and document the conversation', tier: 3, feedback: 'Strong response — calm, specific, and documented, which protects you if the situation continues to escalate.' },
      { label: 'Apologize repeatedly without addressing specifics', tier: 1, feedback: 'Over-apologizing without clarifying the actual issue rarely resolves the underlying problem.' },
    ],
  },
  {
    id: 'great-client',
    title: 'The Great Client',
    message: 'Here\u2019s the full brief, timeline, and budget. Let me know if anything needs adjusting before we start.',
    options: [
      { label: 'Confirm the scope, timeline, and payment terms in writing before starting', tier: 3, feedback: 'Strong response — even with a great client, confirming everything in writing protects the relationship long-term.' },
      { label: 'Just start immediately since everything sounds good', tier: 2, feedback: 'Understandable enthusiasm, but a quick written confirmation costs little and prevents future misunderstandings.' },
      { label: 'Assume everything will work out and skip any written confirmation', tier: 1, feedback: 'Even healthy client relationships benefit from a written record of what was agreed.' },
    ],
  },
];

/* =============================================
   TEMPLATES LIBRARY
   type: 'text' (copy/download a script), 'checklist' (persistent
   checkboxes), 'worksheet' (freeform labeled fields), or 'tracker'
   (an add/remove-row table). One generic renderer per type lives
   in js/templates.js.
   ============================================= */

export const TEMPLATES = [
  // ---- CAREER ----
  {
    id: 'job-application-tracker', category: 'Career', type: 'tracker',
    title: 'Job Application Tracker',
    description: 'Keep every application, its status, and your follow-up dates in one place.',
    columns: ['Company', 'Position', 'Date Applied', 'Status', 'Interview Date', 'Follow-up Date', 'Notes'],
    seedRows: 3,
  },
  {
    id: 'interview-prep-worksheet', category: 'Career', type: 'worksheet',
    title: 'Interview Preparation Worksheet',
    description: 'Walk into your next interview actually prepared, not just hopeful.',
    fields: [
      { label: 'Company & role', type: 'text' },
      { label: 'Why I want this role', type: 'textarea' },
      { label: 'My relevant strengths for this role', type: 'textarea' },
      { label: 'Questions they might ask, and how I\u2019ll answer', type: 'textarea' },
      { label: 'Questions I\u2019ll ask them', type: 'textarea' },
      { label: 'What to research before the interview', type: 'textarea' },
    ],
  },
  {
    id: 'linkedin-profile-checklist', category: 'Career', type: 'checklist',
    title: 'LinkedIn Profile Checklist',
    description: 'A quick pass to make sure your profile actually works for you.',
    items: [
      'Professional, clear photo',
      'Headline states who you help and how, not just a job title',
      'About section written in first person, not a resume dump',
      'Featured section includes real work samples',
      'Experience section shows outcomes, not just duties',
      'Skills section filled with relevant, specific skills',
      'Custom profile URL set',
      '"Open to work" or "providing services" turned on appropriately',
      'At least one post or piece of activity in the last 30 days',
    ],
  },
  {
    id: 'career-planning-worksheet', category: 'Career', type: 'worksheet',
    title: 'Career Planning Worksheet',
    description: 'Get honest about where you are and where you\u2019re headed.',
    fields: [
      { label: 'Where I am right now', type: 'textarea' },
      { label: 'Where I want to be in 12 months', type: 'textarea' },
      { label: 'Skills I need to build to get there', type: 'textarea' },
      { label: 'People I should talk to along the way', type: 'textarea' },
      { label: 'One action I\u2019ll take this month', type: 'text' },
    ],
  },

  // ---- FREELANCING ----
  {
    id: 'client-outreach-template', category: 'Freelancing', type: 'text',
    title: 'Client Outreach Template',
    description: 'A specific, personalized opening message that doesn\u2019t feel like spam.',
    body: "Hi [name] — I help [specific audience] with [specific outcome]. I noticed [specific, genuine observation about their business]. Would it be helpful if I put together a quick [small sample] so you can see what that could look like for you?",
  },
  {
    id: 'follow-up-template', category: 'Freelancing', type: 'text',
    title: 'Follow-Up Template',
    description: 'A low-pressure nudge for when your first message goes quiet.',
    body: "Hi [name], just floating this back up in case it got buried! No pressure at all — happy to send that sample over whenever's useful for you.",
  },
  {
    id: 'freelance-proposal-structure', category: 'Freelancing', type: 'text',
    title: 'Freelance Proposal Structure',
    description: 'The five sections every clear, professional proposal needs.',
    body: "Project summary — one paragraph on what you understand the client needs.\n\nWhat's included — a specific, bulleted list of deliverables.\n\nTimeline — start date, key milestones, delivery date.\n\nPrice — the total, and how it's broken down if relevant.\n\nNext step — a specific call to action, e.g. \"Reply to confirm and I'll send the deposit invoice.\"",
  },
  {
    id: 'client-onboarding-checklist', category: 'Freelancing', type: 'checklist',
    title: 'Client Onboarding Checklist',
    description: 'Start every new client relationship the same clear, professional way.',
    items: [
      'Send a warm welcome message',
      'Confirm scope of work in writing',
      'Collect necessary access, files, or brand assets',
      'Confirm the project timeline',
      'Confirm the payment schedule and deposit',
      'Set expectations for communication (channel, response time)',
      'Share a simple project timeline or plan',
    ],
  },
  {
    id: 'scope-of-work-checklist', category: 'Freelancing', type: 'checklist',
    title: 'Scope of Work Checklist',
    description: 'Everything a clear scope of work should cover before you start.',
    items: [
      'What\u2019s included, specifically',
      'What\u2019s explicitly not included',
      'Number of revisions included',
      'Project timeline',
      'Total price',
      'Payment schedule (deposit, milestones, final)',
      'Cancellation or kill-fee terms',
      'Both sides have confirmed in writing',
    ],
  },
  {
    id: 'payment-reminder-template', category: 'Freelancing', type: 'text',
    title: 'Payment Reminder Template',
    description: 'A polite, professional nudge for an overdue invoice.',
    body: "Hi [name], just a friendly follow-up — invoice #[number] for $[amount] was due on [date]. Let me know if there's anything you need from me to process it, or if there's a better time this week.",
  },
  {
    id: 'client-discovery-questions', category: 'Freelancing', type: 'text',
    title: 'Client Discovery Questions',
    description: 'Ask these before you quote anything — they protect your price and your time.',
    body: "1. What does success look like for this project specifically?\n2. What's your timeline, and is it flexible?\n3. What's your budget range for this?\n4. Have you worked with a freelancer before? How did that go?\n5. Who else is involved in approving the final work?\n6. What have you already tried or put together?\n7. Is this a one-time project or could it become ongoing?",
  },

  // ---- CONTENT ----
  {
    id: '30-day-content-planner', category: 'Content', type: 'tracker',
    title: '30-Day Content Planner',
    description: 'Plan a full month of content without staring at a blank page every day.',
    columns: ['Day', 'Platform', 'Content Idea', 'Status'],
    seedRows: 30,
  },
  {
    id: 'content-pillar-worksheet', category: 'Content', type: 'worksheet',
    title: 'Content Pillar Worksheet',
    description: 'Give your content a repeatable structure instead of starting from zero every time.',
    fields: [
      { label: 'Pillar 1: name & what it covers', type: 'textarea' },
      { label: 'Pillar 2: name & what it covers', type: 'textarea' },
      { label: 'Pillar 3: name & what it covers', type: 'textarea' },
      { label: 'Pillar 4: name & what it covers', type: 'textarea' },
    ],
  },
  {
    id: 'content-idea-bank', category: 'Content', type: 'tracker',
    title: 'Content Idea Bank',
    description: 'A running list so you\u2019re never short on what to post next.',
    columns: ['Idea', 'Pillar', 'Format', 'Status'],
    seedRows: 5,
  },
  {
    id: 'caption-planning-template', category: 'Content', type: 'text',
    title: 'Caption Planning Template',
    description: 'A simple formula for captions that actually hold attention.',
    body: "Hook (first line — stop the scroll): ___\n\nContext (what this post is actually about): ___\n\nValue or story (the useful or relatable part): ___\n\nCall to action (what you want them to do): ___",
  },

  // ---- BUSINESS ----
  {
    id: 'business-idea-worksheet', category: 'Business', type: 'worksheet',
    title: 'Business Idea Worksheet',
    description: 'Pressure-test an idea before you spend real time or money on it.',
    fields: [
      { label: 'The problem I want to solve', type: 'textarea' },
      { label: 'Who specifically has this problem', type: 'textarea' },
      { label: 'My proposed solution', type: 'textarea' },
      { label: 'How this makes money', type: 'textarea' },
      { label: 'What makes this different from existing options', type: 'textarea' },
      { label: 'The biggest risk or unknown', type: 'textarea' },
    ],
  },
  {
    id: 'offer-builder', category: 'Business', type: 'worksheet',
    title: 'Offer Builder',
    description: 'Turn a vague idea into a specific, sellable offer.',
    fields: [
      { label: 'What I offer', type: 'textarea' },
      { label: 'Who it\u2019s for', type: 'textarea' },
      { label: 'The result or transformation', type: 'textarea' },
      { label: 'Price', type: 'text' },
      { label: 'What\u2019s included', type: 'textarea' },
      { label: 'What\u2019s not included', type: 'textarea' },
    ],
  },
  {
    id: 'customer-research-worksheet', category: 'Business', type: 'worksheet',
    title: 'Customer Research Worksheet',
    description: 'Get specific about who you\u2019re actually building for.',
    fields: [
      { label: 'Who is my ideal customer', type: 'textarea' },
      { label: 'Their biggest frustration related to my offer', type: 'textarea' },
      { label: 'Where they spend time online', type: 'textarea' },
      { label: 'What they\u2019ve already tried', type: 'textarea' },
      { label: 'What would make them say yes', type: 'textarea' },
    ],
  },
  {
    id: 'digital-product-planner', category: 'Business', type: 'worksheet',
    title: 'Digital Product Planner',
    description: 'The essentials to nail down before you build anything.',
    fields: [
      { label: 'Product idea', type: 'text' },
      { label: 'Format (ebook, template, course, etc.)', type: 'text' },
      { label: 'Audience', type: 'textarea' },
      { label: 'Price', type: 'text' },
      { label: 'Where I\u2019ll sell it', type: 'text' },
      { label: 'Target launch date', type: 'text' },
    ],
  },

  // ---- MONEY ----
  {
    id: 'monthly-money-check-in', category: 'Money', type: 'tracker',
    title: 'Monthly Money Check-In',
    description: 'A quick monthly snapshot so nothing sneaks up on you.',
    columns: ['Month', 'Income', 'Expenses', 'Saved', 'Notes'],
    seedRows: 3,
  },
  {
    id: 'income-tracker', category: 'Money', type: 'tracker',
    title: 'Income Tracker',
    description: 'Every dollar in, from every source, in one place.',
    columns: ['Date', 'Source', 'Amount', 'Notes'],
    seedRows: 5,
  },
  {
    id: 'side-hustle-income-tracker', category: 'Money', type: 'tracker',
    title: 'Side-Hustle Income Tracker',
    description: 'Track income and hours by client or gig so you know your real rate.',
    columns: ['Date', 'Hustle / Client', 'Amount', 'Hours', 'Notes'],
    seedRows: 5,
  },
  {
    id: 'goal-tracker', category: 'Money', type: 'tracker',
    title: 'Goal Tracker',
    description: 'Turn a fuzzy goal into something with a date and a status.',
    columns: ['Goal', 'Target Date', 'Progress', 'Status'],
    seedRows: 4,
  },
];

/* =============================================
   GLOSSARY
   ============================================= */

export const GLOSSARY = [
  // Digital Business
  { term: 'Digital Product', category: 'Digital Business', def: 'A product that exists only in digital form and is delivered electronically.', girlie: 'Something you make once and sell over and over — like an ebook, template, or course.', example: 'A $19 Notion template for meal planning.', why: 'Digital products can earn income without ongoing physical inventory.', related: ['Offer', 'Niche'], learn: [{ label: 'How to Create and Sell a Digital Product', id: 'how-to-create-and-sell-a-digital-product' }] },
  { term: 'Online Business', category: 'Digital Business', def: 'A business that operates primarily or entirely over the internet.', girlie: 'A business you can run from your laptop, wherever you are.', example: 'A freelance design business run entirely through email and video calls.', why: 'Lower overhead and location flexibility compared to many traditional businesses.', related: ['Digital Product', 'Business Model'], learn: [{ label: 'Build Your Online Empire', id: 'build-your-online-empire' }] },
  { term: 'Business Model', category: 'Digital Business', def: 'The core plan for how a business creates and captures value.', girlie: 'The basic explanation of how your business actually makes money.', example: 'A subscription model where customers pay monthly for ongoing access.', why: 'Clarifying this early prevents building something with no real path to income.', related: ['Offer', 'Online Business'], learn: [] },
  { term: 'Offer', category: 'Digital Business', def: 'The specific product or service a business sells, along with its terms.', girlie: 'What you\u2019re actually selling, spelled out clearly enough that someone could say yes to it.', example: '"$150 for a 5-page website, delivered in 2 weeks."', why: 'A vague idea isn\u2019t sellable — a specific offer is.', related: ['Niche', 'Target Audience'], learn: [{ label: 'Offer Builder template', href: '/pages/templates.html#offer-builder' }] },
  { term: 'Niche', category: 'Digital Business', def: 'A specific, focused segment of a market.', girlie: 'Your specific lane — not "marketing," but "email marketing for small bakeries."', example: 'A copywriter who only writes for wellness coaches.', why: 'Specificity tends to attract better-fit clients and referrals than being generic.', related: ['Target Audience', 'Offer'], learn: [{ label: 'Personal Branding for Beginners', id: 'personal-branding-for-beginners' }] },
  { term: 'Target Audience', category: 'Digital Business', def: 'The specific group of people a product or message is designed for.', girlie: 'The exact person you\u2019re talking to when you make or market something.', example: 'New freelancers in their first year of business.', why: 'Speaking to a specific audience is more effective than speaking to "everyone."', related: ['Niche', 'Customer Persona'], learn: [] },
  { term: 'Customer Persona', category: 'Digital Business', def: 'A semi-fictional profile representing your ideal customer.', girlie: 'A sketch of your dream customer — their situation, frustrations, and goals.', example: '"Amara, 27, new freelancer, overwhelmed by pricing her services."', why: 'Makes marketing and product decisions more concrete and less guesswork-based.', related: ['Target Audience'], learn: [{ label: 'Customer Research Worksheet', href: '/pages/templates.html#customer-research-worksheet' }] },
  { term: 'Lead Magnet', category: 'Digital Business', def: 'A free resource offered in exchange for someone\u2019s contact information.', girlie: 'A free freebie that gets someone onto your email list.', example: 'A free checklist offered in exchange for an email address.', why: 'Builds an audience you can reach directly, outside of social media algorithms.', related: ['Sales Funnel', 'Email Marketing'], learn: [] },
  { term: 'Sales Funnel', category: 'Digital Business', def: 'The path a potential customer travels from first hearing about you to buying.', girlie: 'The journey from "never heard of you" to "just bought your thing."', example: 'Social post → free guide → email sequence → paid offer.', why: 'Understanding the path helps you see where potential customers are dropping off.', related: ['Lead Magnet', 'Conversion Rate'], learn: [] },

  // Marketing
  { term: 'SEO', category: 'Marketing', def: 'Search Engine Optimization — improving content so it ranks higher in search results.', girlie: 'Making sure Google actually shows your stuff when people search for it.', example: 'Using the phrase "freelance rate calculator" naturally throughout a relevant page.', why: 'Good SEO brings in visitors without paying for ads.', related: ['SEM', 'Content Marketing'], learn: [{ label: 'Digital Skills for Beginners', id: 'digital-skills-for-beginners' }] },
  { term: 'SEM', category: 'Marketing', def: 'Search Engine Marketing — paid advertising that appears in search results.', girlie: 'Paying to show up at the top of search results instead of earning it organically.', example: 'A sponsored listing above the regular Google search results.', why: 'Can bring faster visibility than SEO, at a direct cost per click.', related: ['SEO'], learn: [] },
  { term: 'CTA', category: 'Marketing', def: 'Call To Action — the specific next step you want someone to take.', girlie: 'The "now click this" moment at the end of a post, email, or page.', example: '"Download the free checklist" button.', why: 'Without a clear CTA, people often just... leave.', related: ['Conversion Rate'], learn: [] },
  { term: 'Conversion Rate', category: 'Marketing', def: 'The percentage of people who take a desired action out of everyone who saw the opportunity.', girlie: 'Out of everyone who saw your offer, how many actually said yes.', example: '100 visitors, 5 purchases = a 5% conversion rate.', why: 'Tells you how effective your offer and messaging actually are, not just how much traffic you get.', related: ['CTA', 'Sales Funnel'], learn: [] },
  { term: 'Engagement Rate', category: 'Marketing', def: 'A measure of how much an audience interacts with content, relative to its reach.', girlie: 'How much people actually like, comment, and share — not just scroll past.', example: 'A post with high comments relative to views has strong engagement.', why: 'Often matters more to algorithms and real influence than raw follower count.', related: [], learn: [] },
  { term: 'Email Marketing', category: 'Marketing', def: 'Marketing directly to people through email.', girlie: 'Talking to your audience in their inbox instead of hoping they see your post.', example: 'A weekly newsletter with tips and an occasional offer.', why: 'You own your email list — unlike a social platform, it can\u2019t change the rules on you overnight.', related: ['Lead Magnet'], learn: [] },
  { term: 'Content Marketing', category: 'Marketing', def: 'Attracting and keeping an audience by consistently creating valuable content.', girlie: 'Teaching or entertaining people for free until they trust you enough to buy.', example: 'A series of free how-to videos related to a paid course.', why: 'Builds trust and visibility before ever asking for a sale.', related: ['SEO'], learn: [] },
  { term: 'Affiliate Marketing', category: 'Marketing', def: 'Earning a commission by promoting someone else\u2019s product.', girlie: 'You recommend something, someone buys through your link, you get a cut.', example: 'A blog post recommending tools, each with a tracked affiliate link.', why: 'A way to earn income without creating your own product.', related: ['Affiliate Link'], learn: [] },
  { term: 'Social Media Marketing', category: 'Marketing', def: 'Using social platforms to promote a brand, product, or service.', girlie: 'Using Instagram, TikTok, etc. on purpose to grow a business, not just for fun.', example: 'A consistent content calendar built around specific content pillars.', why: 'Meets audiences where they already spend time.', related: ['Content Marketing'], learn: [{ label: 'Instagram Pays Too, Sis', id: 'instagram-pays-too-sis' }] },

  // Freelancing
  { term: 'Freelancer', category: 'Freelancing', def: 'Someone who works independently, offering services to multiple clients rather than one employer.', girlie: 'You\u2019re your own boss, working with clients instead of one employer.', example: 'A freelance graphic designer working with 4 different small businesses.', why: 'Offers flexibility and control, along with the responsibility of finding your own clients.', related: ['Scope of Work', 'Client Acquisition'], learn: [{ label: 'How to Get Your First Freelance Client', id: 'how-to-get-your-first-freelance-client' }] },
  { term: 'Retainer', category: 'Freelancing', def: 'An ongoing arrangement where a client pays a set fee regularly for continued access to your work.', girlie: 'Instead of one project, the client pays you monthly for ongoing help.', example: '$500/month for 10 hours of social media management.', why: 'Creates predictable, recurring income instead of constantly chasing new projects.', related: ['Scope of Work'], learn: [] },
  { term: 'Scope of Work', category: 'Freelancing', def: 'A detailed description of exactly what a project includes.', girlie: 'The written line in the sand for what you\u2019re actually agreeing to do.', example: '"3 blog posts, 800 words each, 1 round of revisions."', why: 'The single biggest protection against scope creep and disputes.', related: ['Proposal', 'Revision'], learn: [{ label: 'Scope of Work Checklist', href: '/pages/templates.html#scope-of-work-checklist' }] },
  { term: 'Proposal', category: 'Freelancing', def: 'A document outlining a project\u2019s scope, timeline, and price, sent to a potential client.', girlie: 'Your pitch, in writing, for exactly what you\u2019d do and what it costs.', example: 'A one-page PDF outlining a website redesign project.', why: 'Sets clear expectations before any work or money changes hands.', related: ['Scope of Work'], learn: [{ label: 'Freelance Proposal Structure', href: '/pages/templates.html#freelance-proposal-structure' }] },
  { term: 'Invoice', category: 'Freelancing', def: 'A formal request for payment for completed work.', girlie: 'The official "please pay me now" document.', example: 'Invoice #004, due in 7 days, sent via email.', why: 'A professional record protects both you and the client.', related: ['Deposit', 'Milestone'], learn: [{ label: 'How to Get Paid as a Freelancer', id: 'how-to-get-paid-as-a-freelancer' }] },
  { term: 'Deposit', category: 'Freelancing', def: 'An upfront partial payment made before work begins.', girlie: 'The "I\u2019m serious" payment a client makes before you start.', example: 'A 50% deposit due before the project timeline starts.', why: 'Protects your time investment and filters out non-serious inquiries.', related: ['Invoice', 'Milestone'], learn: [] },
  { term: 'Milestone', category: 'Freelancing', def: 'A specific checkpoint in a project, often tied to a partial payment.', girlie: 'A "we\u2019re halfway there" moment, usually with a payment attached.', example: 'Payment released after the first draft is approved.', why: 'Breaks risk into smaller, safer chunks for both sides.', related: ['Deposit'], learn: [] },
  { term: 'Revision', category: 'Freelancing', def: 'A requested change to completed work.', girlie: 'A "can you tweak this" request after you\u2019ve delivered something.', example: '"2 rounds of revisions included" in a proposal.', why: 'Setting a limit upfront prevents endless, unpaid back-and-forth.', related: ['Scope of Work'], learn: [] },
  { term: 'Client Acquisition', category: 'Freelancing', def: 'The process of finding and winning new clients.', girlie: 'How you actually go from "no clients" to "paying clients."', example: 'Cold outreach, referrals, and a visible portfolio combined.', why: 'The skill that keeps a freelance business fed with work.', related: ['Freelancer'], learn: [{ label: 'How to Get Your First Freelance Client', id: 'how-to-get-your-first-freelance-client' }] },

  // Creator Economy
  { term: 'UGC', category: 'Creator Economy', def: 'User-Generated Content — content created by everyday people rather than a brand itself.', girlie: 'Real-feeling content made by a normal person, not a polished brand ad.', example: 'A short "review" video made for a brand to use in their own ads.', why: 'Feels more authentic to audiences than traditional advertising, and can be a paid service.', related: ['Content Creator', 'Brand Deal'], learn: [] },
  { term: 'Content Creator', category: 'Creator Economy', def: 'Someone who produces content, often across social platforms, as their main or side work.', girlie: 'Someone who makes the internet stuff you actually enjoy watching.', example: 'A creator posting daily short-form videos in a specific niche.', why: 'A legitimate career path with multiple monetization routes.', related: ['Influencer', 'Monetization'], learn: [{ label: 'The Soft Girl\u2019s Guide to Becoming a Full-Time YouTube Creator', id: 'soft-girl-youtube-creator' }] },
  { term: 'Influencer', category: 'Creator Economy', def: 'A content creator with an audience large or engaged enough to influence purchasing decisions.', girlie: 'A creator brands pay because their audience actually listens to them.', example: 'A beauty influencer partnering with a skincare brand.', why: 'Reach and trust with an audience are what brands are actually paying for.', related: ['Brand Deal', 'Sponsorship'], learn: [] },
  { term: 'Brand Deal', category: 'Creator Economy', def: 'A paid partnership between a creator and a brand.', girlie: 'Getting paid to feature or talk about a brand\u2019s product.', example: 'A sponsored post featuring a specific product, disclosed as an ad.', why: 'A major income source for many creators.', related: ['Sponsorship'], learn: [] },
  { term: 'Sponsorship', category: 'Creator Economy', def: 'Financial support from a brand in exchange for promotion or association.', girlie: 'A brand backing your content in exchange for exposure to your audience.', example: 'A brand sponsoring a video in exchange for a mention.', why: 'Similar to a brand deal, often used interchangeably.', related: ['Brand Deal'], learn: [] },
  { term: 'Affiliate Link', category: 'Creator Economy', def: 'A trackable link that earns a commission when someone makes a purchase through it.', girlie: 'Your special link that tells a company "this sale came from me."', example: 'A "shop my favorites" link in a creator\u2019s bio.', why: 'Lets creators earn from recommending products they already use.', related: ['Affiliate Marketing'], learn: [] },
  { term: 'Monetization', category: 'Creator Economy', def: 'The process of turning an audience, skill, or platform into income.', girlie: 'Turning your following, skill, or content into actual money.', example: 'Ad revenue, brand deals, and digital products together.', why: 'The overall goal for most creators building a sustainable income.', related: ['Content Creator'], learn: [] },

  // Website / Tech
  { term: 'Domain', category: 'Website / Tech', def: 'The address people type to find a website (e.g., herdigitalplaybook.com).', girlie: 'Your website\u2019s actual name on the internet.', example: 'herdigitalplaybook.com', why: 'A key part of a professional online presence.', related: ['Hosting', 'Website'], learn: [] },
  { term: 'Hosting', category: 'Website / Tech', def: 'The service that stores a website\u2019s files and makes it accessible online.', girlie: 'The storage space that keeps your website actually live on the internet.', example: 'Vercel hosting a static website.', why: 'Without hosting, a domain has nowhere to actually point.', related: ['Domain'], learn: [] },
  { term: 'Website', category: 'Website / Tech', def: 'A collection of linked web pages accessible via a single domain.', girlie: 'Your actual online home base.', example: 'A 5-page portfolio site.', why: 'Gives you a professional presence you fully control, unlike a social profile.', related: ['Domain', 'Landing Page'], learn: [] },
  { term: 'Landing Page', category: 'Website / Tech', def: 'A single, focused web page designed to drive one specific action.', girlie: 'A one-job page — usually to get a sale or an email signup.', example: 'A page built only to sell one digital product.', why: 'Focus tends to convert better than a busy, multi-purpose page.', related: ['CTA', 'Conversion Rate'], learn: [] },
  { term: 'CMS', category: 'Website / Tech', def: 'Content Management System — software used to create and manage website content without coding.', girlie: 'A tool that lets you update your website without touching code.', example: 'WordPress or Webflow.', why: 'Makes ongoing website updates accessible to non-developers.', related: ['Website'], learn: [] },
  { term: 'HTML', category: 'Website / Tech', def: 'HyperText Markup Language — the structural code that builds web pages.', girlie: 'The skeleton of every webpage — the "what goes where."', example: 'A heading tag marking the title of a page.', why: 'The foundational building block of the entire web.', related: ['CSS', 'JavaScript'], learn: [{ label: 'Digital Skills for Beginners', id: 'digital-skills-for-beginners' }] },
  { term: 'CSS', category: 'Website / Tech', def: 'Cascading Style Sheets — the code that styles how a webpage looks.', girlie: 'What makes a webpage look pretty instead of plain black text.', example: 'Code that sets a button\u2019s color to pink.', why: 'Separates a page\u2019s structure from its visual design.', related: ['HTML'], learn: [] },
  { term: 'JavaScript', category: 'Website / Tech', def: 'A programming language that adds interactivity and logic to web pages.', girlie: 'What makes a website actually do things, not just sit there.', example: 'Code that makes a quiz calculate and show your result.', why: 'Powers nearly every interactive feature on the modern web.', related: ['HTML', 'CSS'], learn: [] },
  { term: 'API', category: 'Website / Tech', def: 'Application Programming Interface — a way for two systems to communicate with each other.', girlie: 'How two different apps or services "talk" to each other behind the scenes.', example: 'A newsletter signup form sending data to an email service through its API.', why: 'Lets websites connect to outside tools instead of building everything from scratch.', related: ['Automation'], learn: [] },
  { term: 'Database', category: 'Website / Tech', def: 'An organized system for storing and retrieving data.', girlie: 'Where all the actual information behind an app or website lives.', example: 'A list of newsletter subscribers stored in a database.', why: 'Powers anything that needs to remember information over time.', related: ['CMS'], learn: [] },
  { term: 'Responsive Design', category: 'Website / Tech', def: 'Web design that adapts to different screen sizes and devices.', girlie: 'A website that actually looks good on your phone, not just a desktop.', example: 'A navigation menu that becomes a hamburger icon on mobile.', why: 'Most web traffic today happens on phones.', related: ['UX', 'UI'], learn: [] },
  { term: 'UX', category: 'Website / Tech', def: 'User Experience — how a product feels and functions for the person using it.', girlie: 'How easy and pleasant something is to actually use.', example: 'A checkout process that takes 2 steps instead of 8.', why: 'Good UX keeps people from giving up and leaving.', related: ['UI', 'Responsive Design'], learn: [] },
  { term: 'UI', category: 'Website / Tech', def: 'User Interface — the visual elements a person interacts with.', girlie: 'What a product actually looks like — buttons, colors, layout.', example: 'A clean, pink, easy-to-read button design.', why: 'The first impression of how trustworthy and professional something feels.', related: ['UX'], learn: [] },

  // Money
  { term: 'Revenue', category: 'Money', def: 'The total amount of money a business brings in before expenses.', girlie: 'All the money coming in, before anything gets subtracted.', example: '$5,000 in total sales this month.', why: 'Often confused with profit — revenue isn\u2019t what you actually keep.', related: ['Profit', 'Gross Income'], learn: [] },
  { term: 'Profit', category: 'Money', def: 'What remains after subtracting expenses from revenue.', girlie: 'What you actually keep after paying for everything the business needed.', example: '$5,000 revenue minus $1,200 expenses = $3,800 profit.', why: 'The number that actually reflects how well a business is doing.', related: ['Revenue', 'Expense'], learn: [] },
  { term: 'Expense', category: 'Money', def: 'Money spent to run a business or maintain a lifestyle.', girlie: 'Money going out — tools, subscriptions, supplies, bills.', example: 'A monthly software subscription.', why: 'Tracking expenses is essential to knowing real profit.', related: ['Profit', 'Cash Flow'], learn: [] },
  { term: 'Cash Flow', category: 'Money', def: 'The movement of money in and out of a business or budget over time.', girlie: 'The timing of money coming in versus going out — not just the totals.', example: 'Being profitable on paper but short on cash because clients pay late.', why: 'A business can be profitable and still run into trouble if cash flow is poor.', related: ['Revenue', 'Expense'], learn: [] },
  { term: 'Passive Income', category: 'Money', def: 'Income that requires little to no ongoing active effort to maintain.', girlie: 'Money that keeps coming in without you actively trading time for it every time.', example: 'Ongoing sales of a digital product made once.', why: 'Often misunderstood — most passive income requires real upfront work to build.', related: ['Active Income'], learn: [{ label: 'The Soft Girl\u2019s Guide to Passive Income', id: 'soft-girl-passive-income' }] },
  { term: 'Active Income', category: 'Money', def: 'Income earned in direct exchange for time or active work.', girlie: 'Money you earn by actively doing the work, hour by hour or project by project.', example: 'Freelance client work billed hourly.', why: 'The most common starting point before building any passive income.', related: ['Passive Income'], learn: [] },
  { term: 'Gross Income', category: 'Money', def: 'Total income before taxes or deductions.', girlie: 'The full number before anything gets taken out.', example: 'A $60,000 gross salary before taxes.', why: 'Often different — sometimes very different — from what actually lands in your account.', related: ['Net Income'], learn: [] },
  { term: 'Net Income', category: 'Money', def: 'Income remaining after taxes and deductions.', girlie: 'What actually lands in your account after everything\u2019s taken out.', example: 'Take-home pay after taxes.', why: 'The realistic number to budget from.', related: ['Gross Income'], learn: [] },
  { term: 'Budget', category: 'Money', def: 'A plan for how income will be spent, saved, or invested.', girlie: 'Giving every dollar a job before the month starts.', example: 'Splitting income into needs, savings, and guilt-free spending.', why: 'Prevents money from quietly disappearing with nothing to show for it.', related: ['Cash Flow'], learn: [{ label: 'Budget Like a Queen', id: 'budget-like-a-queen' }] },
  { term: 'Emergency Fund', category: 'Money', def: 'Money set aside specifically for unexpected expenses or income gaps.', girlie: 'Your "just in case life happens" cushion.', example: '3 months of essential expenses saved separately.', why: 'Especially important for freelancers with irregular income.', related: ['Budget'], learn: [] },

  // Career
  { term: 'Personal Branding', category: 'Career', def: 'The intentional, consistent impression you build across your professional presence.', girlie: 'Being known, specifically and consistently, for something real about how you work.', example: 'A consistent name, photo, and bio across every platform.', why: 'Helps people remember and refer you.', related: ['Portfolio', 'Networking'], learn: [{ label: 'Personal Branding for Beginners', id: 'personal-branding-for-beginners' }] },
  { term: 'Transferable Skills', category: 'Career', def: 'Skills that apply across multiple roles or industries.', girlie: 'Skills you keep no matter what direction you switch to.', example: 'Communication, organization, and problem-solving.', why: 'Makes a career pivot far less risky than it feels.', related: [], learn: [{ label: 'How to Choose a Career', id: 'how-to-choose-a-career' }] },
  { term: 'Networking', category: 'Career', def: 'Building and maintaining professional relationships.', girlie: 'Making real connections instead of only applying into the void.', example: 'A genuine LinkedIn conversation that leads to a referral.', why: 'Many opportunities come through people, not just applications.', related: ['Personal Branding'], learn: [{ label: 'Babe, Your Next International Opportunity Is On LinkedIn', id: 'linkedin-international-opportunity' }] },
  { term: 'Portfolio', category: 'Career', def: 'A curated collection of work samples showcasing skill and experience.', girlie: 'Proof you can actually do the thing, not just say you can.', example: '3 focused design samples in one specific style.', why: 'Often more persuasive than a resume alone.', related: ['Personal Branding'], learn: [] },
  { term: 'Resume/CV', category: 'Career', def: 'A formal document summarizing work history, skills, and education.', girlie: 'Your professional highlight reel on paper.', example: 'A one-page resume tailored to a specific role.', why: 'Still a key first filter in most hiring processes.', related: ['Applicant Tracking System'], learn: [{ label: 'Resume Review Checklist', href: '/pages/article.html?id=resume-review-checklist' }] },
  { term: 'Applicant Tracking System', category: 'Career', def: 'Software that scans and filters resumes before a human sees them.', girlie: 'The robot that reads your resume before an actual person does.', example: 'A system that filters out resumes missing certain keywords.', why: 'Explains why keyword-matching your resume to a job post actually matters.', related: ['Resume/CV'], learn: [] },
  { term: 'Remote Work', category: 'Career', def: 'Work performed outside of a traditional office, often from home.', girlie: 'A job you can do from literally anywhere with a laptop and wifi.', example: 'A fully remote virtual assistant role.', why: 'Opens up opportunities beyond your immediate location.', related: [], learn: [] },
  { term: 'Soft Skills', category: 'Career', def: 'Interpersonal and behavioral skills like communication and adaptability.', girlie: 'The "how you work with people" skills, not the technical ones.', example: 'Clear communication under a tight deadline.', why: 'Often the deciding factor between two similarly qualified candidates.', related: ['Transferable Skills'], learn: [] },

  // AI
  { term: 'Generative AI', category: 'AI', def: 'AI systems that create new content — text, images, audio — based on prompts.', girlie: 'AI that makes new stuff for you based on what you ask it.', example: 'An AI tool writing a first draft of a caption.', why: 'Increasingly used across content, business, and technical work.', related: ['Prompt', 'AI Model'], learn: [{ label: 'AI Prompt Builder', href: '/pages/article.html?id=ai-prompt-builder' }] },
  { term: 'Prompt', category: 'AI', def: 'The instruction or question given to an AI tool to get a specific response.', girlie: 'What you type to actually get the AI to do the thing you want.', example: '"Write 3 Instagram captions for a bakery launch, playful tone."', why: 'A clear, specific prompt gets a far more useful answer than a vague one.', related: ['Generative AI'], learn: [] },
  { term: 'AI Model', category: 'AI', def: 'The underlying system trained to perform a specific AI task.', girlie: 'The "brain" behind an AI tool that actually does the thinking.', example: 'The model powering a chatbot\u2019s responses.', why: 'Different models have different strengths, costs, and limitations.', related: ['Generative AI'], learn: [] },
  { term: 'Automation', category: 'AI', def: 'Using technology to perform tasks with minimal ongoing human effort.', girlie: 'Setting something up once so it just keeps happening on its own.', example: 'An email that automatically sends when someone joins a newsletter.', why: 'Frees up time for work that actually needs a human.', related: ['AI-Assisted Workflow', 'API'], learn: [] },
  { term: 'AI-Assisted Workflow', category: 'AI', def: 'A work process that incorporates AI tools to speed up or improve tasks.', girlie: 'Using AI as a genuine helper in how you actually get work done.', example: 'Drafting with AI, then editing it in your own voice.', why: 'A practical, realistic way to use AI without losing your own voice or judgment.', related: ['Generative AI', 'Automation'], learn: [] },
];

/* =============================================
   START HERE, GIRL — PATHWAYS
   ============================================= */

export const START_HERE_PATHS = [
  {
    id: 'zero', icon: '🌱', label: "I'm Starting From Zero",
    blurb: "You don't know which skill to learn, have no online income yet, or aren't sure where to begin. That's exactly what this is for.",
    recommendations: [
      { title: 'Find Your Money Path', href: '/pages/money-path.html', icon: '💸' },
      { articleId: 'digital-skills-for-beginners' },
      { articleId: 'best-money-making-skills-2026' },
      { articleId: '30-day-digital-skills-challenge' },
    ],
  },
  {
    id: 'learn-skill', icon: '💻', label: 'I Want to Learn a Digital Skill',
    blurb: "You're ready to actually build a skill, not just read about one.",
    recommendations: [
      { title: 'Find Your Money Path', href: '/pages/money-path.html', icon: '💸' },
      { articleId: 'digital-skills-for-beginners' },
      { articleId: 'best-money-making-skills-2026' },
      { articleId: '30-day-digital-skills-challenge' },
    ],
  },
  {
    id: 'make-money', icon: '💸', label: 'I Want to Make Money Online',
    blurb: "You want a real, honest plan for your first income online.",
    recommendations: [
      { articleId: 'first-2000-online' },
      { articleId: 'how-to-make-your-first-1000-online' },
      { articleId: 'making-money-online-things-beginners-need-to-know' },
      { articleId: 'soft-girl-passive-income' },
    ],
  },
  {
    id: 'freelance', icon: '👩🏽\u200d💻', label: 'I Want to Freelance',
    blurb: "You want real clients, real payment systems, and real practice before you start.",
    recommendations: [
      { articleId: 'how-to-get-your-first-freelance-client' },
      { articleId: 'how-to-get-paid-as-a-freelancer' },
      { articleId: 'virtual-assistant-pretty-paid-booked' },
      { articleId: 'freelance-rate-calculator' },
      { title: 'Client Simulator', href: '/pages/client-simulator.html', icon: '💼' },
    ],
  },
  {
    id: 'business', icon: '🛍️', label: 'I Want to Build a Business',
    blurb: "You've got an idea (or want one) and you're ready to build something of your own.",
    recommendations: [
      { articleId: 'how-to-create-and-sell-a-digital-product' },
      { articleId: 'profitable-digital-product-business' },
      { articleId: 'business-idea-validator' },
      { articleId: 'build-your-online-empire' },
    ],
  },
  {
    id: 'creator', icon: '📱', label: 'I Want to Become a Creator',
    blurb: "You want to build an audience and turn content into income.",
    recommendations: [
      { articleId: 'soft-girl-youtube-creator' },
      { articleId: 'instagram-pays-too-sis' },
      { articleId: 'personal-branding-for-beginners' },
    ],
  },
  {
    id: 'career', icon: '💼', label: 'I Want a Better Career',
    blurb: "You want to move up, move out, or move on — with a real plan.",
    recommendations: [
      { articleId: 'how-to-choose-a-career' },
      { articleId: 'linkedin-international-opportunity' },
      { articleId: 'resume-review-checklist' },
      { articleId: 'salary-negotiation-calculator' },
      { articleId: 'personal-branding-for-beginners' },
    ],
  },
  {
    id: 'unsure', icon: '🤷🏽\u200d♀️', label: "I Honestly Don't Know",
    blurb: "Totally fine. Let's find out together.",
    recommendations: [
      { title: 'Find Your Money Path', href: '/pages/money-path.html', icon: '💸' },
    ],
  },
];

/* =============================================
   PLAYGROUND PAGES
   Used by js/search.js so these real pages are discoverable
   through the existing header search, alongside articles/tools.
   ============================================= */

export const PLAYGROUND_PAGES = [
  { id: 'playground-hub', title: 'Her Digital Playground', category: 'Playground', icon: '🎀', url: '/pages/playground.html' },
  { id: 'playground-start-here', title: 'Start Here, Girl', category: 'Playground', icon: '🌱', url: '/pages/start-here.html' },
  { id: 'playground-money-path', title: 'Find Your Money Path', category: 'Playground', icon: '💸', url: '/pages/money-path.html' },
  { id: 'playground-game-room', title: 'The Digital Girl Game Room', category: 'Playground', icon: '🎮', url: '/pages/game-room.html' },
  { id: 'playground-client-simulator', title: 'Client Simulator', category: 'Playground', icon: '💼', url: '/pages/client-simulator.html' },
  { id: 'playground-templates', title: 'Free Girlie Templates', category: 'Playground', icon: '🎀', url: '/pages/templates.html' },
  { id: 'playground-glossary', title: 'The Digital Girl Glossary', category: 'Playground', icon: '🔎', url: '/pages/glossary.html' },
];
