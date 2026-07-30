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
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785059850/file_00000000a0c481f481f3508efeac7a3b_ofiucc.png',
    content: `Hey girl 💖 — if you've been sitting on a business idea, a skill, or just a vague feeling that you could be making money online, this is your sign to actually start. Not "someday." This month.\n\n## Why This Matters\n\n$2000 isn't a random number. It's roughly what it takes to build real confidence — enough to cover a bill, pad your savings, or prove to yourself that you can generate income outside a 9-to-5. Once you've done it once, you stop wondering "could I?" and start asking "what's next?"\n\n## Let's Be Real\n\nYou don't need a huge following, a business degree, or a perfect idea. You need one skill, one offer, and the confidence to put it in front of five real people. That's genuinely the whole mechanism — everything else is detail.\n\n## Your Step-By-Step Plan\n\n- Pick one skill you already have: writing, organizing, designing, proofreading, scheduling, or simply being extremely reliable\n- Package it into one clear offer with a specific result (not "I can help with social media" but "I'll write you 2 weeks of Instagram captions")\n- Price it fairly for a first client — you can raise it later, you can't un-launch\n- Message 5 real people today: friends, past coworkers, or small local businesses\n- Deliver early, ask for a testimonial, then repeat the process with the price raised 20%\n\n## Common Mistakes To Avoid\n\n- Waiting for the "perfect" offer before telling anyone about it\n- Pricing so low it feels resentful to deliver\n- Only posting online instead of also messaging people directly\n\n💖 Big Sis Tip: Momentum beats perfection every time. Your first sale doesn't need to be impressive — it needs to happen. The confidence comes after the first yes, not before.\n\n## Your Next Step\n\nOpen your notes app right now and write down one skill and five names. That list is the entire first week of your plan.`,
  },
  {
    id: 'virtual-assistant-pretty-paid-booked',
    type: 'story',
    category: 'Career',
    title: "Pretty, Paid And Booked: How To Become A Virtual Assistant Clients Can't Stop Hiring",
    excerpt: 'How to enjoy your life now while building your dream future.',
    readTime: '7 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785060237/file_0000000001508243a7f0c96701b655dd_jvmmpd.png',
    content: `Hey girl 💖 — virtual assistant work gets dismissed as "just admin," but the VAs who are fully booked with a waitlist have built a real, respected business. Here's how to be one of them.\n\n## Why This Matters\n\nVA work is one of the fastest paths into remote income because the barrier to entry is trust, not credentials. Clients aren't hiring a resume — they're hiring peace of mind. That means the opportunity is genuinely open to you, starting now.\n\n## Let's Be Real\n\nThe most booked VAs aren't the cheapest ones. They're the ones clients trust to just handle it without micromanaging. Reputation, not rate, is what fills a calendar.\n\n## Your Step-By-Step Plan\n\n- Choose 1–2 specialties instead of "I can do anything": inbox + calendar management, social media scheduling, or light bookkeeping are strong starting lanes\n- Build a simple one-page portfolio describing exactly what you handle and for whom\n- Reach out to 10 small business owners or solo founders directly — they're often the easiest first clients\n- Show up on time, communicate before they have to ask, and slightly over-deliver on your first project\n- Ask every happy client for one specific thing: a referral or a testimonial, not just "thanks!"\n\n## Common Mistakes To Avoid\n\n- Advertising yourself as a generalist who "can do it all"\n- Going quiet mid-project instead of sending quick, proactive updates\n- Undercharging so much that resentment creeps into the work\n\n💖 Big Sis Tip: Specific beats general every time. "I manage inboxes for busy founders" books more clients than "I'm a virtual assistant," because it's instantly clear who you're for.\n\n## Your Next Step\n\nWrite one sentence describing your specialty, then send it to 3 people today.`,
  },
  {
    id: 'soft-girl-youtube-creator',
    type: 'story',
    category: 'Content',
    title: "The Soft Girl's Guide To Becoming A Full-Time YouTube Creator",
    excerpt: 'Step-by-step guide to stand out, add value, and grow with confidence.',
    readTime: '8 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785060710/file_00000000ffc481f49ac15fcb9e2ecd3f_b3kr2f.png',
    content: `Hey girl 💖 — going full-time on YouTube doesn't require being the loudest person online. It requires being the most consistent one. Let's build a plan you can actually keep.\n\n## Why This Matters\n\nCreators quit less often because they lack talent and more often because they burn out chasing virality instead of building a system. A sustainable rhythm beats a lucky viral hit almost every time.\n\n## Let's Be Real\n\nYour first 90 days won't make you money. They'll make you data. Treat them as research, not a report card, and the pressure drops dramatically.\n\n## Your Step-By-Step Plan\n\n- Pick one topic you could talk about for a full year without running out of ideas\n- Choose a posting schedule you can keep even on a hard week — once a week beats daily-then-nothing\n- Design one recognizable intro, thumbnail style, and title format so your channel feels cohesive\n- After each video, check retention: where do people stop watching, and what kept them until the end\n- Double down on whatever formats or topics outperform — let the data pick your next 5 videos\n\n## Common Mistakes To Avoid\n\n- Changing your whole format every week trying to find "the trick"\n- Comparing your episode 3 to someone else's episode 300\n- Skipping the analytics because the numbers feel discouraging early on\n\n💖 Big Sis Tip: Consistency compounds quietly. Nobody feels like a "real creator" during the first 90 days — that feeling shows up around video 30, not video 3. Keep going.\n\n## Your Next Step\n\nWrite down your one topic and your realistic posting schedule — then film video one this week, imperfect and all.`,
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
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785061030/file_000000006918824399b0cb56f742cb36_ldd7ur.png',
    content: `Hey girl 💖 — a digital product is just a solution to a problem you've already solved for yourself, packaged so someone else can use it too. Here's how to start small and let it grow the right way.\n\n## Your Step-By-Step Plan\n\n- Pick one problem you've personally solved — a template, checklist, or short guide is easier to finish and sell than a full course\n- Get it in front of 10 real people before building anything bigger\n- Price it like it's genuinely useful, not like you're apologizing for charging\n- Use early feedback to shape version two instead of guessing what people want\n- Let the product line grow the way your audience actually asks for it to\n\n💖 Big Sis Tip: Done and selling beats perfect and shelved. Ship the small version this month.`,
  },
  {
    id: 'instagram-pays-too-sis',
    type: 'article',
    category: 'Side Hustle',
    title: 'Instagram Pays Too, Sis',
    excerpt: 'The realistic ways women are turning a modest following into real income.',
    readTime: '4 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785062075/file_000000008d388243848d56c697fc6705_oovl82.png',
    content: `Hey girl 💖 — you don't need a massive following to earn from Instagram. You need an engaged one and a clear way for people to pay you.\n\n## Your Step-By-Step Plan\n\n- Affiliate links, digital guides, and small paid communities all work at just a few thousand followers if the audience trusts you\n- Post like you're talking to one person, not a crowd — that intimacy is what makes people stay\n- Add one clear "here's how to work with/buy from me" moment per week, not buried in a bio link alone\n- Track which posts actually drive clicks or DMs, and make more like those\n\n💖 Big Sis Tip: Trust converts better than reach. A smaller, warmer audience will out-earn a big cold one every time.`,
  },
  {
    id: 'linkedin-international-opportunity',
    type: 'article',
    category: 'Career',
    title: 'Babe, Your Next International Opportunity Is On LinkedIn',
    excerpt: 'How to use LinkedIn intentionally to open doors outside your country.',
    readTime: '6 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785062858/file_00000000ac8481f4b392bc237c2209ff_zqvy88.png',
    content: `Hey girl 💖 — remote and international roles rarely come from cold applications alone. They come from being visible to the right people before the job is even posted.\n\n## Your Step-By-Step Plan\n\n- Rewrite your headline around the outcome you deliver, not just your job title\n- Comment thoughtfully on posts from people at companies you admire — visibility compounds\n- Send a short, warm message asking one specific question instead of a generic "open to work" post\n- Keep your profile consistent with your resume so recruiters trust what they're seeing\n- Follow up once, politely, if you don't hear back in a week\n\n💖 Big Sis Tip: A specific question gets more replies than a general "let me know if you hear of anything." Specificity signals you did your homework.`,
  },
  {
    id: 'soft-girl-passive-income',
    type: 'article',
    category: 'Money',
    title: "The Soft Girl's Guide To Passive Income",
    excerpt: 'Realistic, low-drama ways to build income streams that work while you rest.',
    readTime: '5 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785065086/file_00000000101881f490ecb690b7d1bf73_zdavhi.png',
    content: `Hey girl 💖 — passive income is never fully passive at the start. It's active work up front that pays you back later, and that's genuinely good news: it means it's learnable.\n\n## Your Step-By-Step Plan\n\n- A digital template, an affiliate partnership, or a small stock portfolio all follow the same pattern: build once, maintain lightly, let it compound\n- Pick one stream and give it three focused months before judging it\n- Resist the urge to start five things at once — spread focus kills momentum\n- Set a monthly 30-minute maintenance check-in so it doesn't quietly go stale\n\n💖 Big Sis Tip: "Passive" describes month six, not month one. Protect your patience the way you'd protect your budget.`,
  },
  {
    id: 'build-your-online-empire',
    type: 'article',
    category: 'Business',
    title: 'Build Your Online Empire',
    excerpt: 'Why the strongest online businesses are built one repeatable system at a time.',
    readTime: '7 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785065926/file_00000000a62081f48031f03b654d4af4_mbhgcq.png',
    content: `Hey girl 💖 — an "empire" isn't five income streams launched in one month. It's one offer, run well, until it's steady enough to build the next one on top of it.\n\n## Your Step-By-Step Plan\n\n- Write down the one system that would free up the most time if it ran without you — content, fulfillment, or customer replies\n- Fix that one system before adding anything new\n- Document the process once it works, so it's repeatable and not just "in your head"\n- Only add a second stream once the first one runs without daily firefighting\n\n💖 Big Sis Tip: A wobbly foundation with five stories on top falls over. Build one solid floor at a time.`,
  },
  {
    id: 'budget-like-a-queen',
    type: 'article',
    category: 'Money',
    title: 'Budget Like A Queen: Build Your Wealth',
    excerpt: 'A simple budgeting framework that still leaves room for joy.',
    readTime: '5 min read',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785066583/file_00000000621081f48f486e093cccffd7_du0v6u.png',
    content: `Hey girl 💖 — a budget that only restricts you rarely survives past week two. A budget that plans for joy, savings, and bills all at once actually sticks.\n\n## Your Step-By-Step Plan\n\n- Split your income into needs, goals, and a guilt-free spending category, even if that last one is small\n- Automate the savings/goals slice the day you get paid, before it can get spent\n- Revisit the split monthly — your budget should flex as your income grows, not stay frozen\n- Try our Personal Budget Planner tool to see your exact numbers in seconds\n\n💖 Big Sis Tip: A budget with zero fun money is a budget you'll abandon by Friday. Build the joy in on purpose.`,
  },
];

export const FREE_TOOLS = [
  {
    id: 'salary-negotiation-calculator',
    type: 'tool',
    category: 'Career',
    title: 'Salary Negotiation Calculator',
    excerpt: 'Know your worth and negotiate with confidence.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785067484/file_00000000c43481f4b9f6f957ce7df0ed_tmr7st.png',
    content: `Enter your current offer, your market research, and your must-haves, and this tool will suggest a counter-offer range that's ambitious but realistic.\n\nUse it before every negotiation conversation — even ones that feel too early to push back on.`,
  },
  {
    id: 'freelance-rate-calculator',
    type: 'tool',
    category: 'Freelancing',
    title: 'Freelance Rate Calculator',
    excerpt: 'Calculate the perfect rate for your freelance services.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785067838/file_00000000d74481f491ee4f73866522df_m1irsi.png',
    content: `This tool factors in your target income, working hours, and expenses to give you an hourly or project rate you can quote without flinching.\n\nRevisit it every few months as your skills and demand grow.`,
  },
  {
    id: 'resume-review-checklist',
    type: 'tool',
    category: 'Career',
    title: 'Resume Review Checklist',
    excerpt: 'Make sure your resume stands out to recruiters.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785068075/file_00000000f47c81f4985aaa7c768a9854_ptaphi.png',
    content: `A line-by-line checklist covering formatting, keyword alignment, and the small mistakes that get resumes filtered out before a human ever reads them.\n\nRun it before every application, not just once a year.`,
  },
  {
    id: 'ai-prompt-builder',
    type: 'tool',
    category: 'AI',
    title: 'AI Prompt Builder',
    excerpt: 'Create better prompts and get better AI results.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785068533/file_000000000cc481f4b9485f3373dbeefe_hhn0ge.png',
    content: `Answer a few guided questions about your goal, tone, and audience, and this tool assembles a clear, structured prompt you can paste into any AI tool.\n\nGreat for content drafts, business ideas, and study help alike.`,
  },
  {
    id: 'business-idea-validator',
    type: 'tool',
    category: 'Business',
    title: 'Business Idea Validator',
    excerpt: 'Validate your business idea before you invest.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785069040/file_00000000345881f4b10374929e3be809_gey16b.png',
    content: `Walk through demand, competition, and startup cost questions to get an honest read on whether an idea is worth pursuing right now.\n\nUse it before you spend a single dollar building anything.`,
  },
  {
    id: 'personal-budget-planner',
    type: 'tool',
    category: 'Money',
    title: 'Personal Budget Planner',
    excerpt: 'Plan your budget and achieve your savings goals.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785069432/file_00000000fcf081f48f345777ffa74c96_pdbrhz.png',
    content: `A simple needs / goals / guilt-free spending planner that updates automatically as you enter your income and expenses.\n\nCheck in monthly to keep it honest.`,
  },
];

export const ALL_ITEMS = [...FEATURED_STORIES, ...LATEST_ARTICLES, ...FREE_TOOLS];

export function findItemById(id) {
  return ALL_ITEMS.find((item) => item.id === id) || null;
}
