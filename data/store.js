/* =============================================
   STORE.JS
   Central data store for Her Digital Playbook.

   Every card on the homepage (Featured Stories, Latest
   Articles, Free Tools) is generated from the arrays below
   by js/render.js. Add a new object to the right array and
   it automatically appears on the homepage AND gets its own
   detail page at /pages/article.html?id=<id> — no other
   file needs to change.
   ============================================= */

export const CATEGORIES = [
  { label: 'Career',         icon: '💼' },
  { label: 'Digital Skills', icon: '💻' },
  { label: 'Money',          icon: '💰' },
  { label: 'Business',       icon: '🏪' },
  { label: 'AI',             icon: '✨' },
  { label: 'Freelancing',    icon: '📱' },
  { label: 'Productivity',   icon: '📋' },
  { label: 'Leadership',     icon: '👑' },
];

export const FEATURED_STORIES = [
  {
    id: 'first-2000-online',
    type: 'story',
    category: 'Money',
    title: "Girl, Let's Make Your First $2000 Online In 2026",
    excerpt: 'Simple, practical steps to secure your financial future early.',
    readTime: '6 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785059850/file_00000000a0c481f481f3508efeac7a3b_ofiucc.png',
    content: `You don't need a huge following or a business degree to make your first $2000 online — you need one skill, one offer, and the confidence to put it in front of people.\n\nStart with what you already know how to do: writing, organizing, designing, or simply being reliable. Package that into a service or a small digital product, price it fairly, and offer it to five people this week.\n\nMomentum builds fast once you land your first client or sale. Track what worked, repeat it, and raise your price the next time. That's the whole playbook.`,
  },
  {
    id: 'virtual-assistant-pretty-paid-booked',
    type: 'story',
    category: 'Career',
    title: "Pretty, Paid And Booked: How To Become A Virtual Assistant Clients Can't Stop Hiring",
    excerpt: 'How to enjoy your life now while building your dream future.',
    readTime: '7 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785060237/file_0000000001508243a7f0c96701b655dd_jvmmpd.png',
    content: `The most booked virtual assistants aren't the cheapest — they're the ones clients trust to just handle it.\n\nPick one or two skills to specialize in (inbox and calendar management, social media scheduling, or light bookkeeping) instead of offering everything to everyone. Specialists get referred more.\n\nShow up on time, communicate proactively, and deliver a little more than promised. That reputation is what turns a single gig into a full, repeatable client roster.`,
  },
  {
    id: 'soft-girl-youtube-creator',
    type: 'story',
    category: 'Content',
    title: "The Soft Girl's Guide To Becoming A Full-Time YouTube Creator",
    excerpt: 'Step-by-step guide to stand out, add value, and grow with confidence.',
    readTime: '8 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785060710/file_00000000ffc481f49ac15fcb9e2ecd3f_b3kr2f.png',
    content: `Full-time creators aren't the loudest people online — they're the most consistent. Pick one topic you could talk about for a year and start there.\n\nPost on a schedule you can actually keep, even if that's just once a week at first. A calm, repeatable rhythm beats a burst of ten videos followed by silence.\n\nTreat your first 90 days as research: watch your analytics, notice what people finish watching, and do more of that.`,
  },
];

export const LATEST_ARTICLES = [
  {
    id: 'profitable-digital-product-business',
    type: 'article',
    category: 'Business',
    title: 'How To Start And Grow A Profitable Digital Product Business',
    excerpt: 'A grounded, step-by-step approach to turning your knowledge into income.',
    readTime: '5 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785061030/file_000000006918824399b0cb56f742cb36_ldd7ur.png',
    content: `A digital product is just a solution to a problem you've already solved for yourself, packaged so someone else can use it too.\n\nStart small: a template, checklist, or short guide is easier to finish and sell than a full course. Get it in front of ten real people before you build anything bigger.\n\nUse their feedback to improve the next version, and let the product line grow the way your audience actually asks for it to.`,
  },
  {
    id: 'instagram-pays-too-sis',
    type: 'article',
    category: 'Side Hustle',
    title: 'Instagram Pays Too, Sis',
    excerpt: 'The realistic ways women are turning a modest following into real income.',
    readTime: '4 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785062075/file_000000008d388243848d56c697fc6705_oovl82.png',
    content: `You don't need a massive following to earn from Instagram — you need an engaged one and a clear way for people to pay you.\n\nAffiliate links, digital guides, and small paid communities all work at a few thousand followers if the audience trusts you.\n\nPost like you're talking to one person, not a crowd. That's what makes people stick around long enough to buy.`,
  },
  {
    id: 'linkedin-international-opportunity',
    type: 'article',
    category: 'Career',
    title: 'Babe, Your Next International Opportunity Is On LinkedIn',
    excerpt: 'How to use LinkedIn intentionally to open doors outside your country.',
    readTime: '6 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785062858/file_00000000ac8481f4b392bc237c2209ff_zqvy88.png',
    content: `Remote and international roles rarely come from cold applications alone — they come from being visible to the right people.\n\nRewrite your headline around the outcome you deliver, not just your job title, and comment thoughtfully on posts from people at companies you admire.\n\nA short, warm message asking one specific question will open more doors than a generic "open to work" banner ever will.`,
  },
  {
    id: 'soft-girl-passive-income',
    type: 'article',
    category: 'Money',
    title: "The Soft Girl's Guide To Passive Income",
    excerpt: 'Realistic, low-drama ways to build income streams that work while you rest.',
    readTime: '5 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785065086/file_00000000101881f490ecb690b7d1bf73_zdavhi.png',
    content: `Passive income is never fully passive at the start — it's active work up front that pays you back later.\n\nA digital template, an affiliate partnership, or a small stock portfolio all follow the same pattern: build once, maintain lightly, let it compound.\n\nPick one stream, give it three focused months, and resist the urge to start five things at once.`,
  },
  {
    id: 'build-your-online-empire',
    type: 'article',
    category: 'Business',
    title: 'Build Your Online Empire',
    excerpt: 'Why the strongest online businesses are built one repeatable system at a time.',
    readTime: '7 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785065926/file_00000000a62081f48031f03b654d4af4_mbhgcq.png',
    content: `An "empire" isn't five income streams launched in one month — it's one offer, run well, until it's steady enough to build the next on top of it.\n\nWrite down the one system that would free up the most time if it ran without you (content, fulfillment, or customer replies) and fix that first.\n\nEverything else can wait until your foundation stops wobbling.`,
  },
  {
    id: 'budget-like-a-queen',
    type: 'article',
    category: 'Money',
    title: 'Budget Like A Queen: Build Your Wealth',
    excerpt: 'A simple budgeting framework that still leaves room for joy.',
    readTime: '5 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785066583/file_00000000621081f48f486e093cccffd7_du0v6u.png',
    content: `A budget that only restricts you rarely survives past week two. A budget that plans for joy, savings, and bills all at once actually sticks.\n\nSplit your income into needs, goals, and a guilt-free spending category, even if that last one is small.\n\nRevisit the split monthly. Your budget should flex as your income grows, not stay frozen at what you were earning a year ago.`,
  },
];

export const FREE_TOOLS = [
  {
    id: 'salary-negotiation-calculator',
    type: 'tool',
    category: 'Career',
    title: 'Salary Negotiation Calculator',
    excerpt: 'Know your worth and negotiate with confidence.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785067484/file_00000000c43481f4b9f6f957ce7df0ed_tmr7st.png',
    content: `Enter your current offer, your market research, and your must-haves, and this tool will suggest a counter-offer range that's ambitious but realistic.\n\nUse it before every negotiation conversation — even ones that feel too early to push back on.`,
  },
  {
    id: 'freelance-rate-calculator',
    type: 'tool',
    category: 'Freelancing',
    title: 'Freelance Rate Calculator',
    excerpt: 'Calculate the perfect rate for your freelance services.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785067838/file_00000000d74481f491ee4f73866522df_m1irsi.png',
    content: `This tool factors in your target income, working hours, and expenses to give you an hourly or project rate you can quote without flinching.\n\nRevisit it every few months as your skills and demand grow.`,
  },
  {
    id: 'resume-review-checklist',
    type: 'tool',
    category: 'Career',
    title: 'Resume Review Checklist',
    excerpt: 'Make sure your resume stands out to recruiters.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785068075/file_00000000f47c81f4985aaa7c768a9854_ptaphi.png',
    content: `A line-by-line checklist covering formatting, keyword alignment, and the small mistakes that get resumes filtered out before a human ever reads them.\n\nRun it before every application, not just once a year.`,
  },
  {
    id: 'ai-prompt-builder',
    type: 'tool',
    category: 'AI',
    title: 'AI Prompt Builder',
    excerpt: 'Create better prompts and get better AI results.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785068533/file_000000000cc481f4b9485f3373dbeefe_hhn0ge.png',
    content: `Answer a few guided questions about your goal, tone, and audience, and this tool assembles a clear, structured prompt you can paste into any AI tool.\n\nGreat for content drafts, business ideas, and study help alike.`,
  },
  {
    id: 'business-idea-validator',
    type: 'tool',
    category: 'Business',
    title: 'Business Idea Validator',
    excerpt: 'Validate your business idea before you invest.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785069040/file_00000000345881f4b10374929e3be809_gey16b.png',
    content: `Walk through demand, competition, and startup cost questions to get an honest read on whether an idea is worth pursuing right now.\n\nUse it before you spend a single dollar building anything.`,
  },
  {
    id: 'personal-budget-planner',
    type: 'tool',
    category: 'Money',
    title: 'Personal Budget Planner',
    excerpt: 'Plan your budget and achieve your savings goals.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/v1785069432/file_00000000fcf081f48f345777ffa74c96_pdbrhz.png',
    content: `A simple needs / goals / guilt-free spending planner that updates automatically as you enter your income and expenses.\n\nCheck in monthly to keep it honest.`,
  },
];

export const ALL_ITEMS = [...FEATURED_STORIES, ...LATEST_ARTICLES, ...FREE_TOOLS];

export function findItemById(id) {
  return ALL_ITEMS.find((item) => item.id === id) || null;
     }
     
