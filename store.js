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
  { label: 'Freelancing',    icon: '💗' },
  { label: 'Productivity',   icon: '📋' },
  { label: 'Leadership',     icon: '👑' },
];

export const FEATURED_STORIES = [
  {
    id: 'first-2000-online',
    type: 'story',
    category: 'Money',
    missionNumber: 1,
    missionLabel: 'MONEY MOVE',
    missionBrief: 'Turn five honest messages into your first $2000 online.',
    moneySkill: 'Freelance Income',
    title: "Girl, Let's Make Your First $2000 Online In 2026",
    excerpt: 'Simple, practical steps to secure your financial future early.',
    readTime: '18 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785059850/file_00000000a0c481f481f3508efeac7a3b_ofiucc.png',
    content: `Girl \ud83d\udc96 — pull up a seat. Get your favorite drink. I want to talk to you about something that changes everything once it clicks: making your first $2000 online.\n\nNot someday. Not "when I figure out my niche." This month, if you actually work the plan in front of you.\n\nHere's my promise to you: by the end of this masterclass, you won't just understand the theory — you'll have an actual list of names to message, an actual offer to sell, and an actual reason to believe this is possible for you specifically. Let's go.\n\n## What You'll Walk Away With\n\n- A clear, honest answer to "what can I actually offer right now?"\n- A simple offer you could describe in one sentence\n- A list of 5 real people to message today\n- A pricing approach that doesn't make you want to disappear\n- A repeatable system for turning one sale into five\n\n🌸 Pause For A Second...\n\nGirl... can I ask you something?\n\nImagine three months from now. You've sent the messages. You've landed a few small projects. You've got your first real testimonials sitting in your inbox.\n\nNow imagine...\n\nWould you finally stop stress-checking your bank account before payday? Would you finally book that little trip you keep saving for "someday"? Would you finally feel like you're building something instead of just surviving the month?\n\nThat feeling isn't magic. It's built through five uncomfortable messages, sent on purpose, this week. Let's build it together.\n\n## Chapter 1: Why $2000 Is The Number That Changes Everything\n\n$2000 isn't random. It's roughly what it takes to build real, tangible proof that you can generate income outside your regular paycheck. It's enough to matter, small enough to be genuinely achievable in weeks, not years.\n\nHere's what nobody tells you: the money isn't actually the biggest win here. The biggest win is what happens in your head the moment someone pays you for something you created or offered. You stop asking "could I?" and start asking "what's next?" That mental shift is the real prize, and everything after it gets easier.\n\n💡 Pro Tip: Write your target amount somewhere you'll actually see it — a sticky note on your laptop, a lock screen reminder, wherever. Vague goals get postponed. Visible goals get worked on.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which of these sounds most like you right now?
OPTION: I'm good with words|✍️
RESULT: I'm good with words|✍️|You'd probably love Writing & Content Work!|Captions, product descriptions, and simple copywriting are all in demand — and you already have the raw skill.|Fast to start,Low cost,In-demand
OPTION: I love organizing chaos|🗂️
RESULT: I love organizing chaos|🗂️|You'd probably love Organizing & Admin Work!|Inboxes, calendars, and spreadsheets feel satisfying to you — and busy people will pay well for that relief.|Reliable,Repeat clients,Easy to start
OPTION: I'm the reliable one|⏰
RESULT: I'm the reliable one|⏰|You'd probably love Deadline-Driven Projects!|Showing up on time, every time, is rarer than people think — and it's exactly what turns one client into five.|Trustworthy,Referral-friendly,High retention

## Chapter 2: Picking Your One Skill (Without Overthinking For Three Weeks)\n\nHere's the belief I need you to let go of right now: you do not need to be the best in the world at something to get paid for it. You need to be *slightly* more helpful or available than the person's other option — which is usually "figure it out myself" or "don't do it at all." That's a much lower bar than your brain is currently telling you.\n\nSo, what counts as a sellable skill? Genuinely more than you think:\n\n- Writing — captions, emails, product descriptions, resumes\n- Organizing — inboxes, calendars, digital files, spreadsheets\n- Designing — simple graphics, Canva templates, presentation decks\n- Proofreading and editing — for students, small businesses, content creators\n- Scheduling and light admin — the exact same skill VAs get paid well for\n- Simply being reliable under a deadline — undervalued and in constant demand\n\n🚨 Common Mistake: Spending two more weeks "researching" which skill to pick. The honest answer is usually the first one that came to mind while reading that list. Go with it.\n\n## Chapter 3: Turning A Skill Into An Offer Someone Actually Wants\n\nThis is the step most beginners skip, and it's the one that determines whether anyone says yes. A skill is not an offer. "I can write" is a skill. "I'll write you two weeks of Instagram captions, delivered in a spreadsheet, ready to post" is an offer.\n\nThe difference matters because a specific offer removes all the guesswork for the person you're pitching. They instantly know what they're getting, so they can say yes fast — no back-and-forth, no "can you tell me more about what you do?"\n\n**The formula:** [What you'll deliver] + [In what form] + [By when]. That's genuinely the whole formula. Fill in those three blanks and you have a real offer.\n\n> An offer nobody understands is an offer nobody buys. Clarity is the actual sales skill.\n\n## Chapter 4: Pricing Without Wanting To Disappear\n\nLet's talk about the number that makes most beginners want to close their laptop and never speak of this again: your price.\n\nHere's the honest truth — your first price should feel like "a little low, but okay," not "amazing deal, I feel great." If it doesn't feel slightly uncomfortable, you're probably underpricing out of fear, and that fear will quietly show up in resentment while you're doing the work.\n\nYou can raise your price with your very next client. You cannot un-launch. Waiting for the "right" price is just fear wearing a spreadsheet costume.\n\n☕ Coffee Break: Take 60 seconds right now and actually write down a number. Not a range — one number. That's your starting price for client one.\n\n## Chapter 5: The Five Messages That Start Everything\n\nHere's where most beginners quietly stall out: they build the offer, then wait for people to somehow discover it. That's not how the first sale happens. The first sale happens because you sent a direct, personal message to five real people.\n\n- [ ] Write down 5 real people: friends, past coworkers, a small local business, someone in a group you're part of\n- [ ] Draft one honest message: "Hey, I'm offering [specific thing] this month for [price] — would this be useful for you, or do you know someone it might help?"\n- [ ] Send message 1 today, not tomorrow\n- [ ] Send messages 2 through 5 within 48 hours\n- [ ] Write down every reply, even the no's — they often turn into a referral later\n\n👀 Reality Check: Some of these five will say no. That's not rejection of you — it's just information. Send five more, and adjust your offer based on what people actually asked about.\n\n## Chapter 6: What Happens After The First Yes\n\nGetting the first yes is genuinely the hardest part — but what you do right after determines whether this becomes a repeatable business or a one-time fluke.\n\n**Step 1 — Deliver slightly early.** Not perfect, early. Reliability is what gets you referred.\n\n**Step 2 — Ask for two specific things:** a testimonial, and a referral. Most beginners forget to ask for either, and both are worth more than the payment itself for landing sale number two and three.\n\n**Step 3 — Raise your next price by 15–20%.** Every new client is a chance to close the gap between "a little low" and "what you're actually worth."\n\n✨ Tiny Win: The moment you deliver your first project, you are no longer "someone who wants to make money online." You're someone who has. Let that sink in for a second — you earned that shift.\n\n🎉 Celebrate Yourself: Whatever stage you're at right now — picking your skill, drafting your offer, or waiting on a reply — you are already doing the part 90% of people never do: actually starting. That's genuinely worth celebrating.\n\n## A Real Story, So This Feels Possible\n\nPicture a woman named Amara. Full-time job, zero "freelance experience," just genuinely good at organizing chaos. She didn't build a website or design a logo. She sent seven direct messages offering to organize small business owners' Google Drives for a flat $75. Two people said yes in the same week.\n\nShe delivered both over a weekend, asked for testimonials, and used those testimonials to land her third client at $120 — no ads, no funnel, just honest messages and a fair, specific offer. That's the whole arc, and it's genuinely repeatable.\n\n💅 Hot Girl Reminder: You don't need a perfect Instagram grid or 10,000 followers to start this. You need one clear offer and five honest messages. Everything else is a distraction dressed up as preparation.\n\n%%QUIZ
Q: A potential client replies "how much do you charge?" before you've even described the project. What's your best move?
A: Blurt out a number immediately so you don't lose them
B: Ask 2-3 quick questions about their needs first, then give a specific price *
C: Ignore the question and hope they forget
WHY: Pricing before understanding the actual scope almost always backfires — either you undercharge for something bigger than expected, or you scare off someone who needed something smaller. A couple of clarifying questions protects you both.

## Quick FAQ\n\n### Q: Do I need a business name or LLC to start?\nNo. Your first few clients genuinely don't care. Formalize the business side once the income justifies the paperwork — not before.\n\n### Q: What if nobody says yes to my first five messages?\nSend five more, and tweak the specific result you're offering based on what people asked about or hesitated on. This is a normal part of the process, not a sign to quit.\n\n### Q: How do I know what to charge?\nStart slightly lower than you think, deliver well, then raise your rate by 15–20% with every new client. Our Freelance Rate Calculator can help you sanity-check the number with real math instead of a guess.\n\n### Q: What if I only have a little time outside my full-time job?\nThat's completely fine — this plan is designed around evenings and weekends. Five messages take fifteen minutes. You have that.\n\n💖 Big Sis Note: I need you to hear this clearly — momentum beats perfection, every single time. Your first sale doesn't need to be impressive. It needs to happen. The confidence comes after the first yes, not before it, so please stop waiting to feel ready.\n\n## 🌸 Sweetheart...\n\nLook at how far we just went together — from "I don't even know where to start" to holding an actual plan, with actual names, an actual offer, and an actual price. That's not nothing. That's the entire hard part, already done.\n\nProgress here isn't going to come from one perfect burst of motivation. It comes from five honest messages this week, then five more next week, then a small raise in your price the week after that. Consistency, not intensity, is what built every version of "making it" you've ever admired from the outside.\n\nSo here's your Digital Playbook, girl — your actual roadmap from here:\n\n- **Your Next 7 Days:** Pick your one skill, write your one-sentence offer, message 5 real people\n- **Your Next 30 Days:** Deliver your first 1–2 projects, collect testimonials, message 5 more people using those testimonials as proof\n- **Your Next 90 Days:** Raise your price twice, ask every happy client for one referral, and start noticing which type of client you enjoy working with most\n- **Skills Worth Building Next:** Simple pricing conversations, a one-page portfolio, and basic client communication habits\n\n📚 Keep going with these next: try the Freelance Rate Calculator to nail your pricing, or read "Pretty, Paid And Booked" to learn how to turn this into a fully booked VA business.\n\nJoin the Her Digital Playbook newsletter for weekly nudges exactly like this one — practical, warm, and never overwhelming.\n\n🚀 Next Challenge: Close this tab and send your first message right now. Not after dinner. Not tomorrow. Now, while the courage is still warm.`,
  },
  {
    id: 'virtual-assistant-pretty-paid-booked',
    type: 'story',
    category: 'Career',
    missionNumber: 2,
    missionLabel: 'CAREER GLOW-UP',
    missionBrief: 'Turn your organizing instincts into a fully booked VA business.',
    moneySkill: 'Virtual Assistant Work',
    title: "Pretty, Paid And Booked: How To Become A Virtual Assistant Clients Can't Stop Hiring",
    excerpt: 'How to enjoy your life now while building your dream future.',
    readTime: '15 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785060237/file_0000000001508243a7f0c96701b655dd_jvmmpd.png',
    content: `Babe \ud83d\udc96 — let's talk about virtual assistant work, because it gets dismissed as "just admin" way too often. The VAs who are fully booked with a waitlist? They've built a real, respected business. By the end of this masterclass, you'll know exactly how to become one of them.\n\n## What You'll Walk Away With\n\n- A clear specialty instead of a vague "I do everything" pitch\n- A one-page offer clients can say yes to in 30 seconds\n- A list of 10 real potential clients\n- A communication system that keeps clients for years, not weeks\n\n🌸 Pause For A Second...\n\nGirl... imagine six months from now. You've got 3–4 steady clients who trust you completely. Your calendar has a waitlist instead of gaps.\n\nWould you finally stop refreshing job boards at 11pm? Would you finally say yes to that trip without doing math in your head first? Would you finally feel like your work has structure instead of scrambling?\n\nThat life gets built one specific, well-delivered project at a time. Let's map it out.\n\n## Chapter 1: Why "I Can Do Anything" Is Quietly Killing Your Bookings\n\nHere's the truth nobody tells new VAs: the word "generalist" does more damage than low rates ever could. When you say "I can do anything," a busy potential client has to do the work of figuring out if you're actually right for them — and busy people don't do that work. They scroll past.\n\nSpecificity does the selling for you. "I manage inboxes for busy founders" tells someone exactly what you do and exactly who you're for, in one sentence.\n\n🚨 Common Mistake: Listing ten different services on your profile hoping something sticks. Pick one or two lanes and go deep instead of wide.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which activities do you enjoy most?
OPTION: Email Management|📧
RESULT: Email Management|📧|You'd probably love Email Management!|You're detail-oriented and love order — inboxes feel satisfying to you, not overwhelming.|Organized,Reliable,In-Demand
OPTION: Social Media Management|📱
RESULT: Social Media Management|🏆|You'd probably LOVE Social Media Management!|You love content, creativity, and helping brands shine online. This niche is perfect for you, girl!|Creative,In-Demand,High Paying
OPTION: Project Management|📊
RESULT: Project Management|📊|You'd probably love Project Management!|You're the one who keeps everyone else organized — structure and clarity are your superpower.|Structured,Leadership,Big-Picture

## Chapter 2: Choosing Your Specialty\n\nThree strong starting lanes, all in constant demand:\n\n- Inbox and calendar management — keeping a busy person's day organized and their inbox at zero\n- Social media scheduling — batching and scheduling content so a business owner never has to think about posting\n- Light bookkeeping — tracking expenses and invoices in a simple spreadsheet or tool\n\nPick whichever one sounds the least exhausting to you. That's usually a sign you'll actually enjoy doing it, which shows up in the quality of your work.\n\n💡 Pro Tip: You don't need to master a specialty before offering it. You need to be reliable and slightly ahead of your client in that one skill. You'll get sharper with every project.\n\n## Chapter 3: Building Your One-Page Offer\n\nForget a full website for now. You need one simple page — even a Notion doc or Google Doc works — that says exactly what you handle, who it's for, and what it costs to start.\n\n> A client should be able to read your offer once and know exactly what happens next.\n\nKeep it to these four parts: what you do, who it's for, what it costs, and how to start. That's it. Overcomplicating this page is the second most common way new VAs stall out.\n\n## Chapter 4: Finding Your First 10 Clients\n\n- [ ] List 10 small business owners, solo consultants, or coaches you could realistically reach\n- [ ] Write one personalized message per person — reference something specific about their business\n- [ ] Send 3 messages today\n- [ ] Send the remaining 7 over the next 3 days\n- [ ] Track every reply in one simple spreadsheet\n\nLocal service businesses, coaches, and solo consultants are often the easiest first clients because they feel the pain of admin work most acutely, and they're usually reachable directly on social media or by email.\n\n## Chapter 5: The Habit That Actually Books You Repeat Clients\n\nHere's what separates a VA clients keep for years from one they quietly stop replying to: proactive communication. Send a quick update before they have to ask "how's it going?" That single habit does more for client retention than any skill upgrade.\n\n☕ Coffee Break: Think about the last time someone updated you before you had to ask. Notice how much more you trusted them afterward? That's the exact feeling you're building for your clients.\n\n🧠 Did You Know? Studies on freelance client relationships consistently show that communication frequency, not just work quality, is the top predictor of whether a client renews a contract.\n\n## A Real Story\n\nConsider Zainab, who started by managing inboxes for two busy real estate agents at $20/hour. She never advertised as "a virtual assistant" — her one-line pitch was "I keep real estate agents' inboxes and calendars under control so they never miss a lead." That specificity is exactly what got her referred to a third agent within a month, at $28/hour.\n\n✨ Tiny Win: The moment you write your one-sentence specialty down, you've already done something most aspiring VAs never do — gotten specific. That clarity alone will change how people respond to you.\n\n🎉 Celebrate Yourself: Wherever you are in this process right now — choosing a specialty, drafting your offer, or waiting on replies — you're already ahead of everyone still saying "I should really look into VA work sometime."\n\n%%QUIZ
Q: A client asks you to be available for messages every evening and weekend "just in case." What's the professional response?
A: Agree to avoid conflict
B: Kindly set clear working hours and a response-time expectation *
C: Go quiet and hope they stop asking
WHY: Clients respect boundaries set early far more than availability given resentfully later. Clear working hours actually build more trust, not less.

## Quick FAQ\n\n### Q: Do I need special software or certifications to start?\nNo. Most VAs start with tools clients already use — Gmail, Google Calendar, a shared spreadsheet. Add paid tools once you have consistent income to justify them.\n\n### Q: What if I don't have testimonials yet?\nOffer your very first project at a reduced rate in exchange for an honest testimonial and permission to use their name. One good testimonial reliably unlocks the next several clients.\n\n### Q: How many clients can one VA realistically handle well?\nMost sustainable VA businesses run 3–5 steady clients rather than juggling ten shallow ones. Depth of relationship beats breadth almost every time.\n\n💖 Big Sis Note: Specific beats general, every single time. Say exactly who you help and how, and the right clients will find it so much easier to say yes to you.\n\n## 🌸 Sweetheart...\n\nLook at everything we just covered — from "VA work feels vague" to having an actual specialty, an actual offer, and an actual list of people to reach. That's real progress, and it's yours now.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Choose your specialty, write your one-page offer, message 10 potential clients\n- **Your Next 30 Days:** Deliver your first 1–2 projects, request testimonials, refine your communication rhythm\n- **Your Next 90 Days:** Reach 3–5 steady clients, raise your rate once, and start turning away work outside your specialty\n- **Skills Worth Building Next:** Simple client onboarding, basic pricing conversations, and time-blocking your week\n\n📚 Keep going with these next: try the Freelance Rate Calculator to price your services with confidence, or read "Girl, Let's Make Your First $2000 Online" if you're still building your very first offer.\n\n🚀 Next Challenge: Write your one-sentence specialty right now, and send it to three people before you close this tab.`,
  },
  {
    id: 'soft-girl-youtube-creator',
    type: 'story',
    category: 'Content',
    missionNumber: 3,
    missionLabel: 'DIGITAL BAG',
    missionBrief: "Turn your soft-girl aesthetic into a full-time YouTube income.",
    moneySkill: 'Content Creation',
    title: "The Soft Girl's Guide To Becoming A Full-Time YouTube Creator",
    excerpt: 'Step-by-step guide to stand out, add value, and grow with confidence.',
    readTime: '16 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785060710/file_00000000ffc481f49ac15fcb9e2ecd3f_b3kr2f.png',
    content: `Bestie \ud83d\udc96 — going full-time on YouTube doesn't require being the loudest person online. It requires being the most consistent one. Let's build a plan you can actually keep, even on the weeks you don't feel inspired.\n\n## What You'll Walk Away With\n\n- One clear topic you could talk about for a year without running dry\n- A realistic posting schedule that survives real life\n- A simple way to read your own analytics without spiraling\n- A repeatable system for turning small channels into full-time ones\n\n🌸 Pause For A Second...\n\nGirl... picture a year from now. You've posted consistently. Your best videos have found their audience. You're starting to see real, steady numbers.\n\nWould you finally quit refreshing your bank balance with anxiety? Would you finally invest in that better mic you've been eyeing? Would you finally feel like your creativity has a real home?\n\nThat's built through one unglamorous habit: showing up on schedule, video after video, whether you feel ready or not.\n\n## Chapter 1: Why Most New Creators Quit (And It's Not Talent)\n\nCreators quit less often because they lack talent and more often because they burn out chasing virality instead of building a system. A sustainable rhythm beats a lucky viral hit almost every time — and a rhythm is something you can actually control, unlike an algorithm.\n\n👀 Reality Check: Your first 90 days won't make you money. They'll make you data. Treat them as research, not a report card, and the pressure drops dramatically.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which style of video excites you most to make?
OPTION: Teaching something step-by-step|🎓
RESULT: Teaching something step-by-step|🎓|You'd probably love Educational Content!|You enjoy breaking things down clearly — viewers stick around for creators who make hard things feel simple.|Evergreen,Trust-building,Searchable
OPTION: Sharing my day-to-day life|🎥
RESULT: Sharing my day-to-day life|🎥|You'd probably love Vlog-Style Content!|You're comfortable being yourself on camera — authenticity is exactly what builds a loyal audience.|Personal,Relatable,Community-building
OPTION: Reviewing products or trends|🔍
RESULT: Reviewing products or trends|🔍|You'd probably love Review & Trend Content!|You naturally form strong opinions and love sharing them — that's a built-in engagement magnet.|Opinionated,Affiliate-friendly,Timely

## Chapter 2: Picking One Topic (Not Ten)\n\nMost new creators try to figure out "their niche" through pure brainstorming. Skip that entirely. Pick one topic you could talk about for a full year without running out of things to say, start posting about it, and let the *actual* niche reveal itself through what people respond to.\n\n🚨 Common Mistake: Hopping between three unrelated topics hoping one sticks. Depth in one lane beats scattered attempts across five.\n\n## Chapter 3: A Schedule You Can Actually Keep\n\nChoose a posting schedule you can keep even on a hard week. Once a week, forever, beats daily for a month and then silence. Consistency is the actual algorithm — platforms reward channels that show up reliably over channels that post in unpredictable bursts.\n\n- [ ] Choose your realistic posting frequency (weekly is a strong, sustainable default)\n- [ ] Block time on your calendar for filming, not just "whenever I feel like it"\n- [ ] Design one recognizable intro and thumbnail style\n- [ ] Film your very first video this week\n\n## Chapter 4: Reading Your Analytics Without Spiraling\n\nAfter each video, check retention: where do people stop watching, and what kept them until the end? That's your actual research — more valuable than any "how to grow on YouTube" video you'll ever watch.\n\n💡 Pro Tip: Look at your audience retention graph, not just view count. A steep early drop tells you your intro needs work. A steady decline tells you the middle section needs tightening.\n\n> Data doesn't lie to you the way self-doubt does. Let the numbers guide the next video, not your mood.\n\n## Chapter 5: Doubling Down On What Works\n\nOnce you notice a video outperforming your others, don't treat it as a fluke — treat it as direction. Let the data pick your next five video topics instead of guessing what might work.\n\n☕ Coffee Break: Think about the last piece of content — anywhere — that made you stop scrolling. What made it work? That instinct is more useful for your own content than any trend report.\n\n## A Real Story\n\nThink of a creator who spent her first 20 videos hopping between skincare, productivity, and book reviews, unsure what her "thing" was. Video 21 — a simple desk organization video — outperformed everything by 4x. She didn't decide her niche in a notebook; her audience decided it for her, through data. She leaned in, and video 40 hit six figures of views.\n\n✨ Tiny Win: Publishing video one — imperfect, nervous, all of it — puts you ahead of everyone who's still "thinking about starting a channel." That's genuinely the hardest step, and you'll have already done it.\n\n🎉 Celebrate Yourself: However small your current numbers are, you're building something most people only talk about. That's worth acknowledging right now, not just after you "make it."\n\n🧠 Did You Know? Many successful creators report their channel didn't feel "real" to them until somewhere around video 30 — not video 3. The feeling of legitimacy lags behind the actual progress.\n\n%%QUIZ
Q: Your last video got way fewer views than usual. What should you actually do?
A: Delete your channel and start over
B: Check the retention graph to see where viewers dropped off, then adjust *
C: Post the exact same format again immediately without checking anything
WHY: One low-performing video is data, not a verdict. Retention graphs tell you specifically what to fix — that's far more useful than guessing or giving up.

## Quick FAQ\n\n### Q: Do I need expensive equipment to start?\nNo. A phone and decent lighting beats a fancy camera with inconsistent uploads. Upgrade gear after you've proven the content works, not before.\n\n### Q: How long until I can monetize?\nPlatform partner programs have their own thresholds, but sponsorships and affiliate income can start much earlier if your content clearly solves a specific problem well.\n\n### Q: What if my views stay low for months?\nCheck retention, not just views. A small, deeply engaged audience is the foundation every larger channel was originally built on.\n\n💅 Hot Girl Reminder: You don't need perfect lighting or a fancy setup to start. You need one topic and the willingness to press record before you feel ready.\n\n💖 Big Sis Note: Consistency compounds quietly. Nobody feels like a "real creator" during the first 90 days — that feeling shows up later. Keep going even when it feels like nothing is happening.\n\n## 🌸 Sweetheart...\n\nLook at what we just built together — from "I don't know my niche" to an actual topic, an actual schedule, and an actual first video plan. That's the entire hard part, done.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Pick your one topic, choose your schedule, film video one\n- **Your Next 30 Days:** Publish 4 videos, review retention data on each\n- **Your Next 90 Days:** Publish consistently, double down on your best-performing format, and refine your intro/thumbnail style\n- **Skills Worth Building Next:** Basic editing, thumbnail design, and simple audience engagement habits\n\n📚 Keep going with these next: try the AI Prompt Builder to brainstorm video ideas faster, or read "Instagram Pays Too, Sis" to build an audience across platforms.\n\n🚀 Next Challenge: Film video one this week. Not next month — this week, exactly as imperfect as it needs to be.`,
  },
];

export const LATEST_ARTICLES = [
  {
    id: 'profitable-digital-product-business',
    type: 'article',
    category: 'Business',
    missionNumber: 4,
    missionLabel: 'BUSINESS MOVE',
    missionBrief: 'Turn one idea into a real, sellable digital product.',
    moneySkill: 'Digital Products',
    title: 'How To Start And Grow A Profitable Digital Product Business',
    excerpt: 'A grounded, step-by-step approach to turning your knowledge into income.',
    readTime: '13 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785061030/file_000000006918824399b0cb56f742cb36_ldd7ur.png',
    content: `Hey love \ud83d\udc96 — a digital product is just a solution to a problem you've already solved for yourself, packaged so someone else can use it too. Let's build one the smart way, without the six-month overbuild trap so many beginners fall into.\n\n## What You'll Walk Away With\n\n- A clear idea for your first simple digital product\n- A validation process so you're not guessing\n- A pricing approach that respects your work\n- A repeatable system to build version two based on real feedback\n\n👀 Reality Check: Your first digital product should embarrass you a little with how simple it is. If it doesn't, you probably spent too long building it before anyone asked for it.\n\n## Chapter 1: What Actually Counts As A Digital Product\n\nTemplates, checklists, short guides, spreadsheets, mini email courses — all count. The common thread is that it solves one specific problem for one specific person, packaged so it can be delivered instantly and repeatedly.\n\n🧠 Did You Know? Some of the most profitable digital products aren't flashy courses — they're simple, focused templates that save someone a few hours of work they'd rather not do themselves.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which format feels easiest for you to create first?
OPTION: A simple template|🗒️
RESULT: A simple template|🗒️|You'd probably love Templates!|You like giving people a head start rather than a full lecture — templates solve problems fast, and that's exactly the appeal.|Quick to build,Easy to price,Reusable
OPTION: A short written guide|📘
RESULT: A short written guide|📘|You'd probably love Short Guides!|You enjoy explaining things clearly in writing — a focused guide plays right into that strength.|Beginner-friendly,Low production cost,Evergreen
OPTION: A spreadsheet or tool|📈
RESULT: A spreadsheet or tool|📈|You'd probably love Spreadsheet Tools!|You think in systems and numbers — a well-built spreadsheet can save someone hours, and they'll happily pay for that.|Practical,High perceived value,Repeat use

## Chapter 2: Validating Before You Build\n\n- [ ] Write down the one problem you've personally solved for yourself\n- [ ] Describe your product idea in one sentence to 10 real people\n- [ ] Ask directly: "would you pay for this, and how much feels fair?"\n- [ ] Note any hesitation — it's telling you something important\n\n> Ten honest conversations will teach you more than a month of silent building ever could.\n\n## Chapter 3: Building The Minimum Version\n\nBuild the smallest version that still solves the problem completely. Resist the urge to add "just one more section" — that instinct is what turns a two-week project into a six-month one that never ships.\n\n🚨 Common Mistake: Spending months building before validating anyone wants it. Validate first, build second, always.\n\n## Chapter 4: Pricing It Like It's Genuinely Useful\n\nPrice it like it's genuinely useful, not like you're apologizing for charging. A $19–$47 price point is common for a focused first product. Undercharging doesn't make it sell faster — it just makes the work feel less worth doing.\n\n💡 Pro Tip: Use AI tools to help draft your product description and sales page copy quickly — just make sure the final voice still sounds like you, warm and specific, not generic.\n\n## Chapter 5: Using Feedback To Build What's Actually Next\n\nUse early feedback to shape version two instead of trying to predict everything in advance. Let the product line grow the way your audience actually asks for it to, not the way you assumed it would when you started.\n\n✨ Tiny Win: The moment your first product goes live — however small — you've built something with your own hands that can sell while you sleep. That's worth pausing to notice.\n\n🎉 Celebrate Yourself: Validating an idea with real people takes courage most people skip entirely. If you've done that step, you're already ahead.\n\n%%QUIZ
Q: You've built your digital product for two months and haven't shown it to anyone yet. What's the smartest next step?
A: Keep polishing it for another month
B: Show it to 10 real people this week and ask if they'd pay for it *
C: Launch a huge ad campaign immediately
WHY: Feedback from real people is the fastest way to know if a product is ready — polishing in isolation just delays finding out what actually needs to change.

## Quick FAQ\n\n### Q: What platform should I sell on?\nStart with whatever's simplest to set up today — a simple checkout link is enough for version one. Optimize the platform once you have sales coming in.\n\n### Q: What if my first product doesn't sell?\nThat's data, not failure. Ask the people who saw it what held them back, and adjust the offer itself, not just the price.\n\n💖 Big Sis Note: Done and selling beats perfect and shelved. Ship the small version this month — you can always build the bigger one once people are already buying.\n\n## 🌸 Sweetheart...\n\nFrom "I have an idea" to an actual validated, priced, sellable product — that's the whole journey, and you just walked through it.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Choose your one problem and validate it with 10 real people\n- **Your Next 30 Days:** Build and launch your minimum version\n- **Your Next 90 Days:** Gather feedback, adjust, and plan version two\n- **Skills Worth Building Next:** Simple sales page writing and basic email follow-up sequences\n\n📚 Keep going with these next: try the Business Idea Validator before building anything bigger, or read "Build Your Online Empire" for what comes after your first product succeeds.\n\n🚀 Next Challenge: Write your one-sentence product idea right now, and share it with one real person today.`,
  },
  {
    id: 'instagram-pays-too-sis',
    type: 'article',
    category: 'Side Hustle',
    missionNumber: 5,
    missionLabel: 'SIDE HUSTLE',
    missionBrief: 'Turn your Instagram presence into an actual income stream.',
    moneySkill: 'Social Monetization',
    title: 'Instagram Pays Too, Sis',
    excerpt: 'The realistic ways women are turning a modest following into real income.',
    readTime: '12 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785062075/file_000000008d388243848d56c697fc6705_oovl82.png',
    content: `Sis \ud83d\udc96 — you don't need a massive following to earn from Instagram. You need an engaged one and a clear way for people to pay you. Let's build that clarity together, step by step.\n\n## What You'll Walk Away With\n\n- A monetization path that fits your current following size\n- A content approach that builds trust, not just reach\n- A weekly habit for mentioning your offer clearly\n- A simple way to track what's actually working\n\n👀 Reality Check: Growth and income aren't the same metric. An account with 3,000 deeply engaged followers can out-earn one with 30,000 passive ones. Chase trust, not just numbers.\n\n## Chapter 1: Choosing Your Monetization Path\n\nThree solid starting options, all workable at just a few thousand followers if trust is strong:\n\n- Affiliate links — earning a commission recommending products you genuinely use\n- A digital guide — a simple paid resource solving one problem for your audience\n- A small paid community — a space where your most engaged followers pay for closer access\n\n💡 Pro Tip: Pick the path that requires the least new skill-building right now. You can add the others later once the first one is working.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which monetization style fits your current audience?
OPTION: Recommending products I love|🛍️
RESULT: Recommending products I love|🛍️|You'd probably love Affiliate Marketing!|You already talk about products you genuinely like — turning that into commission is a natural next step.|Low effort,No product to make,Passive-leaning
OPTION: Teaching what I know|📖
RESULT: Teaching what I know|📖|You'd probably love Selling a Digital Guide!|You have real knowledge your audience keeps asking about — package it once, sell it repeatedly.|Higher margin,Builds authority,Scalable
OPTION: Building a close-knit space|💗
RESULT: Building a close-knit space|💗|You'd probably love a Paid Community!|Your audience already feels close to you — a small paid space deepens that connection and creates steady income.|Recurring income,Deep loyalty,High engagement

## Chapter 2: Posting Like You're Talking To One Person\n\nPost like you're talking to one person, not a crowd. That intimacy is exactly what makes people stay and eventually buy. Broadcast-style content builds reach; conversational content builds trust — and trust is what actually converts.\n\n🚨 Common Mistake: Posting only promotional content instead of building trust first. Aim for roughly one clear offer mention per week, surrounded by genuinely useful or relatable content.\n\n## Chapter 3: Making Your Offer Impossible To Miss\n\n- [ ] Write one clear sentence describing what you offer\n- [ ] Add it to your bio this week\n- [ ] Mention it naturally in at least one post or story weekly\n- [ ] Create one saved highlight explaining how to buy or work with you\n\n> People can't buy from an offer they never saw. Say it clearly, and say it often enough to actually be seen.\n\n## Chapter 4: Tracking What Actually Works\n\nTrack which posts actually drive clicks or DMs, and make more like those specifically. Instagram's built-in insights are enough to start — you don't need a fancy analytics tool for this stage.\n\n🧠 Did You Know? Many creators find that their highest-converting posts aren't their highest-view posts. Clicks and DMs matter more than raw reach when it comes to actual income.\n\n☕ Coffee Break: Scroll your last 10 posts right now. Which one got the most comments or DMs — not likes, replies? That's a clue about what your audience actually wants more of.\n\n## A Real-Life Scenario\n\nImagine a woman with 2,400 followers sharing budgeting tips. She didn't wait for 10k to start — she launched a $15 budgeting template, mentioned it clearly once a week, and earned her first $400 in a month from an audience most people would call "too small to monetize." Small and warm beat big and cold.\n\n✨ Tiny Win: Adding one clear line about your offer to your bio today is a five-minute task that directly increases how many people know you sell something. Do it before you close this tab.\n\n🎉 Celebrate Yourself: If you've been posting consistently even without monetizing yet, that consistency is the exact foundation this entire plan builds on. You're not starting from zero.\n\n%%QUIZ
Q: You have 1,800 followers and want to start earning. What's the most realistic first step?
A: Wait until you hit 10,000 followers
B: Pick one monetization path and mention it clearly to your current audience *
C: Buy followers to look more credible
WHY: Engaged trust matters more than raw follower count. Many creators earn steadily well under 10k by simply being clear about what they offer.

## Quick FAQ\n\n### Q: How many followers do I need to start earning?\nThere's no magic number — engagement and trust matter more than follower count. Some creators earn steadily at under 2,000 followers.\n\n### Q: Should I focus on Reels or static posts?\nFocus on whichever format you can sustain consistently and that clearly communicates your offer. Consistency beats chasing whatever format is trending this week.\n\n💅 Hot Girl Reminder: You don't need a perfectly curated grid to start earning. You need clarity about what you offer and the confidence to say it out loud, weekly.\n\n💖 Big Sis Note: Trust converts better than reach. Say what you offer clearly and often — people genuinely can't buy from an offer they never saw.\n\n## 🌸 Sweetheart...\n\nFrom "I don't have enough followers to make money" to an actual monetization plan you can start today — that shift just happened, right here.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Choose your monetization path and update your bio\n- **Your Next 30 Days:** Mention your offer weekly and track which posts drive clicks or DMs\n- **Your Next 90 Days:** Double down on your best-performing content type and refine your offer based on real questions you're getting\n- **Skills Worth Building Next:** Simple content batching and basic DM-to-sale conversations\n\n📚 Keep going with these next: try the AI Prompt Builder to plan a week of content in minutes, or read "The Soft Girl's Guide To Passive Income" to add a second income stream.\n\n🚀 Next Challenge: Update your bio with one clear sentence about what you offer — right now, before anything else.`,
  },
  {
    id: 'linkedin-international-opportunity',
    type: 'article',
    category: 'Career',
    missionNumber: 6,
    missionLabel: 'FUTURE YOU',
    missionBrief: 'Turn your LinkedIn profile into your next international opportunity.',
    moneySkill: 'Career Opportunities',
    title: 'Babe, Your Next International Opportunity Is On LinkedIn',
    excerpt: 'How to use LinkedIn intentionally to open doors outside your country.',
    readTime: '13 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785062858/file_00000000ac8481f4b392bc237c2209ff_zqvy88.png',
    content: `Babe \ud83d\udc96 — remote and international roles rarely come from cold applications alone. They come from being visible to the right people before the job is even posted. Let's build that visibility together, the real way.\n\n## What You'll Walk Away With\n\n- A headline that leads with outcomes, not just your job title\n- A simple visibility habit you can keep in 15 minutes a day\n- A message template that actually gets replies\n- A profile that matches your resume so recruiters trust what they see\n\n👀 Reality Check: This is a weeks-to-months process, not a same-day fix. Consistency in showing up beats a single perfectly-worded message.\n\n## Chapter 1: Teaching Yourself LinkedIn (For Real This Time)\n\nLinkedIn isn't just an online resume — it's a visibility engine. Recruiters and hiring managers browse it, search it, and get recommended profiles based on activity. That means a profile that just sits there, unused, is invisible even if it's well-written.\n\n🧠 Did You Know? Many recruiters use LinkedIn's search and recommendation features before ever posting a public job listing — meaning some roles are filled through visibility alone.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which visibility strategy fits your personality?
OPTION: Posting my own insights|📝
RESULT: Posting my own insights|📝|You'd probably love Content-Led Visibility!|You have opinions and experience worth sharing — consistent posting builds recognition over time.|Builds authority,Compounding,Low pressure
OPTION: Reaching out directly|✉️
RESULT: Reaching out directly|✉️|You'd probably love Direct Outreach!|You're comfortable being proactive — a well-crafted message often moves faster than waiting to be noticed.|Fast results,Personal,High intent
OPTION: Engaging on others' posts|💬
RESULT: Engaging on others' posts|💬|You'd probably love Strategic Engagement!|You're thoughtful and observant — genuine comments on the right posts quietly build real relationships.|Low pressure,Relationship-building,Consistent

## Chapter 2: Rewriting Your Headline Around Outcomes\n\nRewrite your headline around the outcome you deliver, not just your job title. "Helping SaaS teams cut onboarding time by 40%" beats "Customer Success Manager" because it tells a stranger exactly what value you create.\n\n- [ ] Write down one measurable outcome from your current or most recent role\n- [ ] Turn it into a headline using the format: "Helping [who] achieve [outcome]"\n- [ ] Update your headline today\n\n## Chapter 3: Building Visibility Through Cold Outreach (Done Warmly)\n\nCold outreach sounds intimidating, but here it just means reaching out to someone you haven't met yet, with a specific, respectful ask. Comment thoughtfully on posts from people at companies you admire — visibility compounds slowly, then suddenly.\n\n> A specific question always beats a generic "let me know if you hear of anything."\n\nSend a short, warm message asking one specific question instead of a vague "open to work" post that blends into everyone else's feed.\n\n💡 Pro Tip: Use AI to help you draft a first version of your outreach message, then edit it in your own voice — specific, warm, and clearly about them, not just about you.\n\n## Chapter 4: Keeping Your Story Consistent\n\nKeep your profile consistent with your resume so recruiters trust what they're seeing at a glance. Mismatched dates, titles, or claims create doubt before a conversation even starts.\n\n🚨 Common Mistake: Sending the same generic message to everyone. Personalization — even one specific sentence — dramatically increases response rates.\n\n## Chapter 5: The Follow-Up Habit Most People Skip\n\nFollow up once, politely, if you don't hear back within a week. Most opportunities are lost not from rejection, but from people simply not following up at all.\n\n☕ Coffee Break: Think about the last time you didn't reply to a message right away — was it rejection, or just a busy week? Give people that same benefit of the doubt, and follow up.\n\n✨ Tiny Win: Sending one specific, well-crafted message today is a bigger step toward an international opportunity than scrolling job boards for an hour. Small, intentional action wins here.\n\n🎉 Celebrate Yourself: Rewriting your headline around real outcomes takes honest reflection on your own value — that's not a small thing to do well.\n\n%%QUIZ
Q: You send a great outreach message and hear nothing back for a week. What now?
A: Assume it's a no and move on forever
B: Send one polite, brief follow-up *
C: Send the same message five more times
WHY: Most missed opportunities come from silence, not rejection. One respectful follow-up dramatically increases your odds without feeling pushy.

## Quick FAQ\n\n### Q: Should I message recruiters or the hiring team directly?\nBoth can work — but a specific, relevant question to someone on the actual team often gets a warmer response than a cold recruiter DM.\n\n### Q: How often should I post?\nOnce or twice a week is plenty if the content clearly shows the outcomes you deliver. Quality and clarity matter more than frequency.\n\n💅 Hot Girl Reminder: You don't need a perfectly polished profile to start being visible. You need one strong headline and the courage to comment and message consistently.\n\n💖 Big Sis Note: A specific question gets more replies than a general "let me know if you hear of anything." Specificity signals you did your homework, and people respond to effort.\n\n## 🌸 Sweetheart...\n\nFrom "I don't know how to get noticed" to an actual visibility plan with a real headline and real outreach habit — that's exactly the shift this masterclass was built for.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Rewrite your headline and summary around outcomes\n- **Your Next 30 Days:** Comment thoughtfully on posts from 10 people at target companies, send 5 warm specific messages\n- **Your Next 90 Days:** Follow up on unanswered messages, and track which types of outreach get the best response\n- **Skills Worth Building Next:** Simple resume alignment and basic interview storytelling\n\n📚 Keep going with these next: try the Resume Review Checklist to make sure your resume matches your new positioning, or read "Pretty, Paid And Booked" if remote client work interests you alongside a job search.\n\n🚀 Next Challenge: Rewrite your LinkedIn headline right now, before you close this tab.`,
  },
  {
    id: 'soft-girl-passive-income',
    type: 'article',
    category: 'Money',
    missionNumber: 7,
    missionLabel: 'MONEY MINDSET',
    missionBrief: 'Turn one small system into income that works while you rest.',
    moneySkill: 'Passive Income',
    title: "The Soft Girl's Guide To Passive Income",
    excerpt: 'Realistic, low-drama ways to build income streams that work while you rest.',
    readTime: '13 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785065086/file_00000000101881f490ecb690b7d1bf73_zdavhi.png',
    content: `Queen \ud83d\udc96 — passive income is never fully passive at the start. It's active work up front that pays you back later, and that's genuinely good news: it means it's learnable, not luck.\n\n## What You'll Walk Away With\n\n- A clear understanding of what "passive" actually means in practice\n- One stream chosen instead of five started\n- A realistic three-month timeline\n- A light monthly maintenance habit\n\n👀 Reality Check: "Passive" describes month six, not month one. If you expect it to feel passive immediately, you'll quit right before it would have started paying off.\n\n## Chapter 1: What Passive Income Actually Means\n\nThe phrase "passive income" makes people expect instant, effortless money. The real version is a fair trade: focused effort now, in exchange for income that keeps arriving with much less ongoing work later. It's delayed ease, not immediate ease.\n\n🧠 Did You Know? Nearly every "overnight passive income" story you've seen online skips over months of unseen setup work before the "passive" part actually began.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which passive income style fits you best?
OPTION: Something I build once|🗂️
RESULT: Something I build once|🗂️|You'd probably love a Digital Template!|You like the idea of doing focused work upfront, then stepping back — templates are exactly that model.|One-time effort,Scalable,Low maintenance
OPTION: Recommending things I use|🔗
RESULT: Recommending things I use|🔗|You'd probably love Affiliate Partnerships!|You naturally recommend products to friends already — this just adds a commission to something you already do.|Low setup,No inventory,Flexible
OPTION: Growing my money over time|📈
RESULT: Growing my money over time|📈|You'd probably love Simple Investing!|You're patient and think long-term — steady, boring investing genuinely suits your temperament.|Long-term,Low effort,Compounding

## Chapter 2: Choosing Your One Stream\n\nA digital template, an affiliate partnership, or a small stock or index investment all follow the same pattern: build once, maintain lightly, let it compound.\n\n- [ ] List all the passive income ideas you've considered\n- [ ] Circle just one — the one requiring the least new skill for you specifically\n- [ ] Write down the very first step for that one stream\n\n🚨 Common Mistake: Starting multiple streams simultaneously and finishing none. Spread focus is the single biggest killer of passive income attempts.\n\n## Chapter 3: The Three-Month Rule\n\nGive your chosen stream three focused months before judging whether it's "working." Most passive income streams look like nothing is happening for the first several weeks — that's normal, not a sign of failure.\n\n> Judging a plant by its first two weeks in the soil tells you nothing about the harvest. Give this the same patience.\n\n## Chapter 4: Keeping It Alive Without Reviving It From Scratch\n\nSet a monthly 30-minute maintenance check-in so the stream doesn't quietly go stale from neglect. Update a broken link, refresh a stale price, check what's working — small, regular attention beats occasional big overhauls.\n\n💡 Pro Tip: Put this 30-minute check-in directly on your calendar as a recurring event. Things that live on a calendar happen; things that live in "I'll get to it" usually don't.\n\n☕ Coffee Break: Think of one thing in your life that runs well because of small, regular maintenance rather than big one-time effort. That's the model for passive income too.\n\n✨ Tiny Win: Choosing just one stream today — instead of staying stuck comparing five options — is real progress, even though it doesn't feel dramatic yet.\n\n🎉 Celebrate Yourself: Committing to three months of patience with one thing, in a world that pushes instant results, is genuinely a skill. You're building it right now.\n\n%%QUIZ
Q: Two weeks into your new passive income stream, it's made almost nothing. What should you do?
A: Shut it down — it's clearly not working
B: Keep going and reassess at the three-month mark *
C: Start three more streams at once to compensate
WHY: Most passive income streams look like "nothing is happening" in the first few weeks. Three months is a fairer, more realistic test than two weeks.

## Quick FAQ\n\n### Q: What's the easiest passive income stream to start?\nA simple digital template or guide tends to have the lowest setup cost and fastest first sale, making it a strong first choice.\n\n### Q: How much time does maintenance really take?\nOften as little as 30 minutes a month once the stream is set up — updating links, checking numbers, minor tweaks.\n\n💅 Hot Girl Reminder: You don't need five income streams to feel secure. You need one that actually works, tended consistently.\n\n💖 Big Sis Note: Protect your patience the way you'd protect your budget. The income becomes passive later — your patience has to be active now.\n\n## 🌸 Sweetheart...\n\nFrom "passive income sounds like a scam" to an actual plan with one chosen stream and a realistic timeline — that clarity is worth everything right now.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Choose your one stream and outline the first step\n- **Your Next 30 Days:** Build and launch the minimum version\n- **Your Next 90 Days:** Maintain lightly, review what's working, and decide whether to expand or adjust\n- **Skills Worth Building Next:** Simple tracking habits and basic reinvestment decisions\n\n📚 Keep going with these next: try the Personal Budget Planner to see where this income could go, or read "Budget Like A Queen" to build a plan around your new income stream.\n\n🚀 Next Challenge: Write down your one stream and its very first step, right now.`,
  },
  {
    id: 'build-your-online-empire',
    type: 'article',
    category: 'Business',
    missionNumber: 8,
    missionLabel: 'CEO ENERGY',
    missionBrief: 'Turn your side hustle into a business with real CEO energy.',
    moneySkill: 'Business Building',
    title: 'Build Your Online Empire',
    excerpt: 'Why the strongest online businesses are built one repeatable system at a time.',
    readTime: '14 min masterclass',
    difficulty: 'Intermediate',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785065926/file_00000000a62081f48031f03b654d4af4_mbhgcq.png',
    content: `Beautiful \ud83d\udc96 — an "empire" isn't five income streams launched in one month. It's one offer, run well, until it's steady enough to build the next one on top of it. Let's build yours the sturdy way, not the scattered way.\n\n## What You'll Walk Away With\n\n- Clarity on the one system holding your current offer back\n- A documentation habit that makes your business repeatable\n- A clear signal for when you're actually ready to add stream two\n- A calmer, more sustainable definition of "growth"\n\n👀 Reality Check: If your current offer still requires daily emergency attention, that's a sign to slow down and fix the foundation — not a sign to launch something new.\n\n## Chapter 1: Why Ambitious Women Stall Out\n\nMany ambitious women stall out chasing five streams at once, each one half-built. A single well-run offer that actually works is worth more than five half-finished ones — both financially and for your own sanity.\n\n🧠 Did You Know? Research on small business growth consistently shows that businesses which "add complexity" before stabilizing their core offer are more likely to struggle, not less.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which system is quietly your biggest bottleneck?
OPTION: Creating content|🎨
RESULT: Creating content|🎨|Your bottleneck is likely your Content System!|If content creation eats your week, batching and templates will free up the most time for you specifically.|Batch-friendly,High leverage,Repeatable
OPTION: Delivering the work|📦
RESULT: Delivering the work|📦|Your bottleneck is likely your Fulfillment System!|If delivery feels chaotic, documenting your process once will make every future project smoother.|Documentation,Consistency,Scalable
OPTION: Answering customers|💬
RESULT: Answering customers|💬|Your bottleneck is likely your Customer Care System!|If replies pile up, templated responses and clear expectations will give you back real hours each week.|Templates,Boundaries,Time-saving

## Chapter 2: Finding Your One Bottleneck System\n\nIdentify the one system that would free up the most time if it ran without you — content, fulfillment, or customer replies. Most businesses have exactly one bottleneck creating 80% of the daily stress.\n\n- [ ] List every recurring task in your business\n- [ ] Circle the one that eats the most time or causes the most stress\n- [ ] Write down what "fixed" would look like for that one task\n\n## Chapter 3: Fixing Before Adding\n\nFix that one system before adding anything new. This is the unglamorous work that makes everything after it easier — and it's the step most people skip because it's less exciting than launching something new.\n\n> A business is only as strong as its most neglected system. Fix that one first.\n\n💡 Pro Tip: Use AI tools to help draft templates, standard replies, or checklists for your bottleneck task — this is exactly the kind of repetitive work AI can meaningfully lighten.\n\n## Chapter 4: Documenting So It's Repeatable\n\nDocument the process once it works, so it's repeatable and not just "in your head" where only you can run it. Even a simple numbered list in a doc counts — it doesn't need to be fancy to be useful.\n\n🚨 Common Mistake: Launching stream two while stream one is still chaotic. It multiplies stress instead of multiplying income.\n\n## Chapter 5: Knowing When You're Actually Ready For More\n\nOnly add a second stream once the first runs without daily firefighting. A useful test: could you take a few days off without it falling apart? If not, that's your answer.\n\n☕ Coffee Break: Picture taking three days completely off right now. What would break? That's your real answer about readiness for stream two — not how excited you feel about the new idea.\n\n✨ Tiny Win: Simply writing down your one bottleneck task today is more clarity than most business owners ever sit down to find. That's real progress.\n\n🎉 Celebrate Yourself: Choosing to build a sturdy foundation instead of chasing five shiny ideas at once takes real discipline. Acknowledge that.\n\n%%QUIZ
Q: Your current offer still needs daily emergency fixes, but you're excited about a new income stream idea. What's the wiser move?
A: Launch the new stream anyway — excitement is a good sign
B: Fix and stabilize your current offer first *
C: Pause everything and rethink your whole business
WHY: Adding complexity on top of a shaky foundation usually multiplies stress rather than income. A stable first offer makes every stream after it easier.

## Quick FAQ\n\n### Q: How do I know when my first offer is "stable enough" to add a second?\nWhen a normal week doesn't require emergency fixes and you could take a few days off without it falling apart.\n\n### Q: Should I hire help before or after adding a new stream?\nGenerally after your first offer is documented and stable — hiring into chaos usually multiplies the chaos rather than solving it.\n\n💅 Hot Girl Reminder: A calm, steady one-offer business is still a real empire in progress. You don't need five things running to be "successful."\n\n💖 Big Sis Note: A wobbly foundation with five stories on top falls over. Build one solid floor at a time, and the empire holds for the long run.\n\n## 🌸 Sweetheart...\n\nFrom "I need to do everything at once" to a calm, focused plan built around fixing one thing at a time — that shift alone will change how sustainable this all feels.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Identify your single most time-consuming system\n- **Your Next 30 Days:** Fix or streamline that one system and document the process\n- **Your Next 90 Days:** Reassess whether it's truly stable before adding anything new\n- **Skills Worth Building Next:** Basic process documentation and simple delegation habits\n\n📚 Keep going with these next: try the Business Idea Validator before launching your next stream, or read "How To Start And Grow A Profitable Digital Product Business" for your next offer.\n\n🚀 Next Challenge: Name your most chaotic system out loud, then spend 30 minutes today just documenting how it currently works.`,
  },
  {
    id: 'budget-like-a-queen',
    type: 'article',
    category: 'Money',
    missionNumber: 9,
    missionLabel: 'MONEY MINDSET',
    missionBrief: 'Turn your paycheck into a plan you\u2019re actually proud of.',
    moneySkill: 'Budgeting',
    title: 'Budget Like A Queen: Build Your Wealth',
    excerpt: 'A simple budgeting framework that still leaves room for joy.',
    readTime: '14 min masterclass',
    difficulty: 'Beginner Friendly',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785066583/file_00000000621081f48f486e093cccffd7_du0v6u.png',
    content: `Girl \ud83d\udc96 — a budget that only restricts you rarely survives past week two. A budget that plans for joy, savings, and bills all at once actually sticks. Let's build one you'll genuinely keep.\n\n## What You'll Walk Away With\n\n- A simple three-bucket budgeting system\n- An automation habit that protects your savings\n- A monthly review rhythm that flexes with your income\n- Permission to build joy into your plan on purpose\n\n👀 Reality Check: A budget with zero fun money is a budget you'll abandon by Friday. Building in joy on purpose isn't indulgent — it's what makes the plan sustainable long-term.\n\n## Chapter 1: Why Most Budgets Fail\n\nMost budgets fail not from bad math, but from feeling punishing. A sustainable budget treats your goals and your joy as equally real line items — not one strict category and one guilty afterthought.\n\n🧠 Did You Know? Behavioral finance research consistently shows that budgets with zero discretionary spending have dramatically higher abandonment rates than budgets that include planned, guilt-free spending.\n\n%%PATHQUIZ
TITLE: Choose Your Path
SUBTITLE: Which describes your current spending style?
OPTION: Bills take almost everything|🧾
RESULT: Bills take almost everything|🧾|You're likely Needs-Heavy right now!|That's common and fixable — even small trims to fixed costs free up real room for goals and joy over time.|Common,Fixable,Worth tracking
OPTION: I save aggressively|💰
RESULT: I save aggressively|💰|You're likely Goals-Heavy right now!|Strong instinct — just make sure a little guilt-free spending stays in the plan so it's sustainable long-term.|Disciplined,Sustainable tweak needed,Strong foundation
OPTION: I balance spending and saving|⚖️
RESULT: I balance spending and saving|⚖️|You're likely already Balanced!|You're closer to a sustainable system than you think — small monthly reviews will keep it dialed in as life changes.|Sustainable,Flexible,Low stress

## Chapter 2: The Three-Bucket System\n\n- [ ] Calculate your monthly take-home income\n- [ ] Split it into needs (roughly 50%), goals/savings (roughly 30%), and guilt-free spending (roughly 20%)\n- [ ] Write down what falls into each bucket for your actual life\n- [ ] Adjust the percentages if your situation calls for it — this is a starting point, not a law\n\n> A budget is a plan for joy as much as it's a plan for bills. Both belong in the same document.\n\n## Chapter 3: Automating Before You Can Spend It\n\nAutomate the savings and goals slice the day you get paid, before it has a chance to get spent elsewhere. This single habit shift — paying your goals first, not last — changes almost everything about whether a budget sticks.\n\n💡 Pro Tip: Set up the automatic transfer once, on payday, and you never have to rely on willpower for that portion again. Remove the decision entirely.\n\n🚨 Common Mistake: Saving "whatever's left" at the end of the month instead of automating savings first. There's rarely anything left when savings comes last.\n\n## Chapter 4: Revisiting Monthly, Not Yearly\n\nRevisit the split monthly. Your budget should flex as your income grows or changes, not stay frozen at last year's numbers. A budget is a living document, not a one-time decision.\n\n☕ Coffee Break: When did you last actually look at your budget instead of just following it on autopilot? A five-minute monthly check-in is enough to keep it honest.\n\n## Chapter 5: Using Real Tools Instead Of Guessing\n\nUse our Personal Budget Planner tool to see your exact dollar breakdown in seconds instead of guessing percentages in your head. Real numbers remove the anxiety of not knowing where you stand.\n\n✨ Tiny Win: Setting up just one automatic transfer today is a five-minute task that protects your future self from having to rely on willpower every single month.\n\n🎉 Celebrate Yourself: Choosing to build a budget that includes joy, instead of one that only restricts, is a genuinely healthier relationship with money than most people ever build. That's worth recognizing.\n\n%%QUIZ
Q: You just got a small raise. What's the smartest first move with the extra money?
A: Let it blend into spending without a plan
B: Decide on purpose how it splits across needs, goals, and guilt-free spending *
C: Save all of it and never enjoy any of it
WHY: A raise without a plan tends to quietly disappear into lifestyle creep. Deciding on purpose — even a simple split — keeps the extra money working for you.

## Quick FAQ\n\n### Q: What if my income varies month to month?\nBudget off your lowest realistic month, and treat anything above that as a bonus split between goals and fun.\n\n### Q: Is the 50/30/20 split a strict rule?\nNo — it's a strong starting point. Adjust the percentages to fit your real life and goals; the structure matters more than the exact numbers.\n\n💅 Hot Girl Reminder: Budgeting isn't about restriction, babe — it's about making sure your money supports the actual life you want, joy included.\n\n💖 Big Sis Note: Give every dollar a job before the month starts, not after it's already gone. That single habit shift changes everything about how a budget feels.\n\n## 🌸 Sweetheart...\n\nFrom "budgeting feels punishing" to an actual three-bucket system that includes real joy — that's the whole shift, and it's yours now.\n\nYour Digital Playbook from here:\n\n- **Your Next 7 Days:** Calculate your income and split it into your three buckets\n- **Your Next 30 Days:** Automate your savings transfer and track spending against your buckets\n- **Your Next 90 Days:** Do your first monthly review and adjust the split based on what you learned\n- **Skills Worth Building Next:** Simple expense tracking and basic goal-setting for savings\n\n📚 Keep going with these next: try the Personal Budget Planner tool for your exact numbers, or read "The Soft Girl's Guide To Passive Income" to grow the income side of this equation.\n\n🚀 Next Challenge: Open your banking app right now and set up one automatic transfer toward your goals bucket.`,
  },
];

export const FREE_TOOLS = [
  {
    id: 'salary-negotiation-calculator',
    type: 'tool',
    category: 'Career',
    title: 'Salary Negotiation Calculator',
    excerpt: "Know your worth, girl. Let's build your counter-offer.",
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785067484/file_00000000c43481f4b9f6f957ce7df0ed_tmr7st.png',
    content: `Enter your current offer, your market research, and your must-haves, and this tool will suggest a counter-offer range that's ambitious but realistic.\n\nUse it before every negotiation conversation — even ones that feel too early to push back on.`,
  },
  {
    id: 'freelance-rate-calculator',
    type: 'tool',
    category: 'Freelancing',
    title: 'Freelance Rate Calculator',
    excerpt: "Stop guessing your rate, babe. Let's do the real math.",
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785067838/file_00000000d74481f491ee4f73866522df_m1irsi.png',
    content: `This tool factors in your target income, working hours, and expenses to give you an hourly or project rate you can quote without flinching.\n\nRevisit it every few months as your skills and demand grow.`,
  },
  {
    id: 'resume-review-checklist',
    type: 'tool',
    category: 'Career',
    title: 'Resume Review Checklist',
    excerpt: 'Get that glow-up resume recruiters can\u2019t scroll past.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785068075/file_00000000f47c81f4985aaa7c768a9854_ptaphi.png',
    content: `A line-by-line checklist covering formatting, keyword alignment, and the small mistakes that get resumes filtered out before a human ever reads them.\n\nRun it before every application, not just once a year.`,
  },
  {
    id: 'ai-prompt-builder',
    type: 'tool',
    category: 'AI',
    title: 'AI Prompt Builder',
    excerpt: 'Prompt like a pro, girl — better questions, better AI.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785068533/file_000000000cc481f4b9485f3373dbeefe_hhn0ge.png',
    content: `Answer a few guided questions about your goal, tone, and audience, and this tool assembles a clear, structured prompt you can paste into any AI tool.\n\nGreat for content drafts, business ideas, and study help alike.`,
  },
  {
    id: 'business-idea-validator',
    type: 'tool',
    category: 'Business',
    title: 'Business Idea Validator',
    excerpt: 'Reality-check your dream business before you spend a dime.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785069040/file_00000000345881f4b10374929e3be809_gey16b.png',
    content: `Walk through demand, competition, and startup cost questions to get an honest read on whether an idea is worth pursuing right now.\n\nUse it before you spend a single dollar building anything.`,
  },
  {
    id: 'personal-budget-planner',
    type: 'tool',
    category: 'Money',
    title: 'Personal Budget Planner',
    excerpt: 'Give your money a plan, babe — goals included.',
    image: 'https://res.cloudinary.com/s9jk4ddk/image/upload/w_700,q_auto,f_auto,dpr_auto/v1785069432/file_00000000fcf081f48f345777ffa74c96_pdbrhz.png',
    content: `A simple needs / goals / guilt-free spending planner that updates automatically as you enter your income and expenses.\n\nCheck in monthly to keep it honest.`,
  },
];

export const ALL_ITEMS = [...FEATURED_STORIES, ...LATEST_ARTICLES, ...FREE_TOOLS];

export function findItemById(id) {
  return ALL_ITEMS.find((item) => item.id === id) || null;
}
