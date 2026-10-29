// data/pg/money-paths.js
var SKILLS = [
  { id: "writing", label: "Writing", hint: "Clear sentences, emails, captions" },
  { id: "visual", label: "Visual taste", hint: "Layouts, colour, photos, video" },
  { id: "organizing", label: "Organising", hint: "Systems, schedules, follow-through" },
  { id: "people", label: "People skills", hint: "Calm, warm, good at talking" },
  { id: "tech", label: "Tech curiosity", hint: "Figuring out apps and tools" },
  { id: "numbers", label: "Numbers & analysis", hint: "Spotting patterns, spreadsheets" },
  { id: "teaching", label: "Explaining things", hint: "Making hard things simple" },
  { id: "selling", label: "Persuading", hint: "Making a case, asking for the yes" }
];
var QUESTIONS = [
  {
    id: "goal",
    title: "What monthly income would feel like a real win?",
    help: "Think extra money on top of what you have now. Be honest: the answer changes which directions make sense.",
    type: "single",
    options: [
      { value: 300, label: "Around $300", hint: "Breathing room" },
      { value: 800, label: "Around $800", hint: "A real difference" },
      { value: 1500, label: "Around $1,500", hint: "Serious side income" },
      { value: 3e3, label: "$3,000 or more", hint: "Replace or beat a salary" }
    ]
  },
  {
    id: "hours",
    title: "How many hours a week can you really give this?",
    help: "Count hours you will actually protect, not hours you hope to find.",
    type: "single",
    options: [
      { value: 3, label: "About 3 hours", hint: "Squeezed in" },
      { value: 7, label: "About 7 hours", hint: "A few evenings" },
      { value: 12, label: "About 12 hours", hint: "A proper side project" },
      { value: 20, label: "20 hours or more", hint: "Close to part-time" }
    ]
  },
  {
    id: "budget",
    title: "What can you spend to get started?",
    help: "Most of these start free. Some work faster with a small budget for tools or equipment.",
    type: "single",
    options: [
      { value: 0, label: "$0", hint: "Free tools only" },
      { value: 50, label: "Up to $50", hint: "A tool or two" },
      { value: 200, label: "Up to $200", hint: "Tools plus a course" },
      { value: 600, label: "$600 or more", hint: "Equipment and learning" }
    ]
  },
  {
    id: "timeline",
    title: "How soon do you need the first money?",
    help: "Faster usually means services. Slower can mean assets that keep paying.",
    type: "single",
    options: [
      { value: "fast", label: "Within a month", hint: "I need something soon" },
      { value: "soon", label: "Within 3 months", hint: "Reasonable patience" },
      { value: "steady", label: "Within 6 months", hint: "I can build slowly" },
      { value: "long", label: "No rush", hint: "I am playing the long game" }
    ]
  },
  {
    id: "strengths",
    title: "Pick up to three things you are naturally good at.",
    help: "Think about what friends ask you for help with.",
    type: "multi",
    max: 3,
    options: []
    /* filled from SKILLS below */
  },
  {
    id: "people",
    title: "How much talking to people do you want in your work?",
    help: "Neither answer is better. It is about energy.",
    type: "single",
    options: [
      { value: "solo", label: "Mostly on my own", hint: "Headphones on" },
      { value: "balanced", label: "A healthy mix", hint: "Some calls, some quiet" },
      { value: "people", label: "Lots of people", hint: "I get energy from it" }
    ]
  },
  {
    id: "camera",
    title: "How do you feel about being on camera?",
    help: "Many routes never need it. This just filters the ones that lean on it.",
    type: "single",
    options: [
      { value: "yes", label: "Happy to", hint: "Video is fine" },
      { value: "maybe", label: "Sometimes", hint: "Hands or voice only" },
      { value: "no", label: "Please no", hint: "Faceless only" }
    ]
  },
  {
    id: "income",
    title: "What kind of income shape suits you?",
    help: "This is about your nervous system as much as your bank account.",
    type: "single",
    options: [
      { value: "steady", label: "Predictable", hint: "Similar amount each month" },
      { value: "project", label: "Project by project", hint: "Some months bigger than others" },
      { value: "compound", label: "Slow build", hint: "Lean now, stronger later" }
    ]
  },
  {
    id: "experience",
    title: "Where are you starting from?",
    help: "This changes how hard we think the learning curve will feel.",
    type: "single",
    options: [
      { value: "none", label: "Brand new", hint: "No experience yet" },
      { value: "some", label: "Dabbled", hint: "Tried things, nothing paid" },
      { value: "solid", label: "Have a skill", hint: "I can already do something people pay for" }
    ]
  }
];
QUESTIONS.find((q) => q.id === "strengths").options = SKILLS.map((s) => ({ value: s.id, label: s.label, hint: s.hint }));
var TIMELINE_WEEKS = { fast: 4, soon: 13, steady: 26, long: 52 };
var PATHS = [
  {
    id: "virtual-assistant",
    icon: "\u{1F5C2}\uFE0F",
    name: "Virtual Assistant",
    tagline: "Be the person who keeps a busy founder organised: inbox, calendar, bookings, admin.",
    skills: { organizing: 3, people: 2, writing: 1, tech: 1 },
    minHours: 4,
    ramp: [2, 8],
    cost: 0,
    perHour: [7, 17],
    people: 2,
    camera: 0,
    shape: "steady",
    ceiling: 3,
    difficulty: 1,
    bestFor: "Reliable, detail-minded people who like being trusted with things.",
    watchOut: "Hourly work caps your income. Move to monthly packages as soon as you can so your pay is not tied to your hours.",
    firstStep: 'Write a one-line offer: "I help [type of busy person] with [3 specific tasks]." Then message five people you know who fit.',
    plan: ["Pick one niche (coaches, creators, small shops) and list the 5 tasks you would take off their plate.", 'Set up free tools you will use (calendar, a shared drive, a task board) and make a one-page "How I work" doc.', "Pitch 10 people with a specific offer and a small trial task.", "Land one client, agree scope and payment in writing, deliver, and ask for a testimonial."],
    tools: ["Google Workspace", "Trello or Notion (free tiers)", "Calendly (free)"],
    articles: ["virtual-assistant-pretty-paid-booked", "how-to-get-your-first-freelance-client", "how-to-get-paid-as-a-freelancer"],
    terms: ["Retainer", "Scope of Work", "Invoice"],
    templates: ["client-outreach", "client-onboarding", "proposal"]
  },
  {
    id: "social-media-management",
    icon: "\u{1F4F1}",
    name: "Social Media Management",
    tagline: "Plan, write and schedule posts for small businesses that have no time for it.",
    skills: { writing: 2, visual: 2, people: 1, tech: 1, selling: 1 },
    minHours: 5,
    ramp: [3, 10],
    cost: 20,
    perHour: [6, 18],
    people: 2,
    camera: 0,
    shape: "steady",
    ceiling: 3,
    difficulty: 2,
    bestFor: "People who already live on social media and notice what makes a post work.",
    watchOut: "Clients expect results you cannot fully control. Agree on what you deliver (posts, replies, reports), not on follower counts.",
    firstStep: "Pick one local business and draft a week of posts for it in a free design tool. That is your first portfolio piece.",
    plan: ["Choose one platform and one type of business to focus on.", "Make three sample weeks of content for a business you admire (as practice, labelled as samples).", 'Pitch 10 businesses with a "first month" package and a clear list of what is included.', "Start one client on a paid month, report monthly on what you posted and what happened."],
    tools: ["Canva (free)", "Meta Business Suite (free)", "A simple content calendar"],
    articles: ["instagram-pays-too-sis", "personal-branding-for-beginners", "how-to-get-your-first-freelance-client"],
    terms: ["Content Marketing", "Engagement Rate", "Retainer"],
    templates: ["content-calendar", "client-outreach", "proposal"]
  },
  {
    id: "graphic-design",
    icon: "\u{1F3A8}",
    name: "Graphic Design",
    tagline: "Create logos, social graphics, brand kits and simple print pieces for small brands.",
    skills: { visual: 3, tech: 1 },
    minHours: 5,
    ramp: [3, 10],
    cost: 15,
    perHour: [6, 20],
    people: 1,
    camera: 0,
    shape: "project",
    ceiling: 4,
    difficulty: 3,
    bestFor: "People with a good eye who enjoy making things look right.",
    watchOut: 'Clients love "one more change". Cap revisions in writing and be wary of unpaid "test" designs.',
    firstStep: "Redesign something real (a local cafe menu, a podcast cover) and save it as a case study with your reasoning.",
    plan: ["Learn layout, type pairing and colour basics through three small redesigns.", "Build a three-piece portfolio on one page.", "Offer a fixed-price starter package (for example a brand kit) to 10 small brands.", "Deliver one paid project with a clear brief, two revision rounds and a written sign-off."],
    tools: ["Canva (free)", "Figma (free)", "Adobe Express (free tier)"],
    articles: ["21-online-skills-that-can-change-your-income", "digital-skills-for-beginners", "personal-branding-for-beginners"],
    terms: ["Portfolio", "Revision", "UX"],
    templates: ["portfolio-case-study", "proposal", "scope-change"]
  },
  {
    id: "copywriting",
    icon: "\u270D\uFE0F",
    name: "Copywriting",
    tagline: "Write websites, emails, product pages and ads that make people act.",
    skills: { writing: 3, selling: 3, people: 1 },
    minHours: 5,
    ramp: [3, 12],
    cost: 0,
    perHour: [6, 22],
    people: 1,
    camera: 0,
    shape: "project",
    ceiling: 5,
    difficulty: 3,
    bestFor: "Writers who like psychology and enjoy making a message land.",
    watchOut: "Skill gap is real: pretty writing is not the same as writing that sells. Study before you charge, and always get a brief and a goal.",
    firstStep: "Rewrite the homepage headline and first paragraph of a small business site, then explain each change in two lines.",
    plan: ["Study 10 pieces of great copy and copy them out by hand to learn the moves.", "Write three spec samples (a landing page, a three-email sequence, a product description).", "Pitch 10 small businesses with one specific improvement you would make.", "Take one paid project with a clear goal, such as lifting email clicks, and report the outcome."],
    tools: ["Google Docs", "Hemingway Editor (free)", "A swipe file of good examples"],
    articles: ["21-online-skills-that-can-change-your-income", "best-money-making-skills-2026", "how-to-get-your-first-freelance-client"],
    terms: ["CTA", "Conversion Rate", "Email Marketing"],
    templates: ["client-outreach", "proposal", "testimonial-request"]
  },
  {
    id: "video-editing",
    icon: "\u{1F3AC}",
    name: "Short-Form Video Editing",
    tagline: "Turn raw footage into tight Reels, Shorts and TikToks with captions and sound.",
    skills: { visual: 3, tech: 2 },
    minHours: 6,
    ramp: [3, 10],
    cost: 20,
    perHour: [6, 20],
    people: 1,
    camera: 0,
    shape: "project",
    ceiling: 4,
    difficulty: 3,
    bestFor: "People with patience for detail who can feel when a cut is a beat late.",
    watchOut: "Files are big and revisions are common. Agree on how many versions are included and who supplies the footage and music rights.",
    firstStep: "Take any free stock footage and edit a 30-second vertical clip with captions. Post it as a sample.",
    plan: ["Learn one editor (CapCut or similar) and the basics: cuts, captions, audio levels, export.", "Make three sample edits in different styles.", 'Pitch 10 creators or coaches with a "5 clips" starter package.', "Deliver a paid batch with a repeatable workflow and offer a monthly plan."],
    tools: ["CapCut (free)", "DaVinci Resolve (free)", "A cloud folder for files"],
    articles: ["soft-girl-youtube-creator", "21-online-skills-that-can-change-your-income", "digital-skills-for-beginners"],
    terms: ["Content Creator", "Revision", "Engagement Rate"],
    templates: ["portfolio-case-study", "client-outreach", "proposal"]
  },
  {
    id: "ugc-creator",
    icon: "\u{1F933}",
    name: "UGC Creator",
    tagline: "Make authentic product videos and photos that brands use in their own ads.",
    skills: { people: 2, selling: 2, visual: 1, writing: 1 },
    minHours: 4,
    ramp: [2, 10],
    cost: 30,
    perHour: [4, 22],
    people: 2,
    camera: 1,
    shape: "project",
    ceiling: 4,
    difficulty: 2,
    bestFor: "Natural communicators who can talk to a phone camera. Hands-and-voice-only work exists too.",
    watchOut: 'Pay is lumpy and "free product only" deals can eat your time. Know your usage rights and what you charge for them.',
    firstStep: "Film one 30-second honest review of something you already own, with a hook in the first two seconds.",
    plan: ["Study how brands structure UGC (hook, problem, demo, call to action).", "Film three sample videos of products you own.", "Pitch 15 small brands with a specific idea for each.", "Close a paid package with clear deliverables, usage rights and a revision limit."],
    tools: ["Your phone and natural light", "CapCut (free)", "A simple rate sheet"],
    articles: ["instagram-pays-too-sis", "soft-girl-youtube-creator", "how-to-get-paid-as-a-freelancer"],
    terms: ["UGC", "Brand Deal", "Sponsorship"],
    templates: ["client-outreach", "proposal", "portfolio-case-study"]
  },
  {
    id: "digital-products",
    icon: "\u{1F6CD}\uFE0F",
    name: "Digital Products",
    tagline: "Make a template, planner or mini-guide once and sell it again and again.",
    skills: { visual: 2, teaching: 2, organizing: 1, selling: 1, writing: 1 },
    minHours: 6,
    ramp: [4, 16],
    cost: 40,
    perHour: [0, 10],
    people: 0,
    camera: 1,
    shape: "compound",
    ceiling: 5,
    difficulty: 3,
    bestFor: "Makers who are happy to be patient and can package what they know.",
    watchOut: "Most first products earn little. The money comes from a clear audience, several products and steady promotion, not from one launch.",
    firstStep: "Write down the one problem you could solve for one specific group, then outline a one-page product that solves it.",
    plan: ["Validate: ask 10 people in your target group what they struggle with and what they have already paid for.", "Build a small first version (a one-page tracker or template) that solves one problem well.", "Put it on a simple store page with a clear promise and a preview.", "Share it in three places your audience already is, collect feedback, improve it."],
    tools: ["Canva (free)", "Notion or Google Sheets", "Gumroad or Stan (free to start)"],
    articles: ["how-to-create-and-sell-a-digital-product", "profitable-digital-product-business", "30-passive-income-ideas-for-beginners"],
    terms: ["Digital Product", "Lead Magnet", "Offer"],
    templates: ["offer-builder", "content-calendar", "testimonial-request"]
  },
  {
    id: "email-marketing",
    icon: "\u{1F48C}",
    name: "Email Marketing Support",
    tagline: "Write and send newsletters and automations for businesses that already have a list.",
    skills: { writing: 3, tech: 2, selling: 2, numbers: 1 },
    minHours: 5,
    ramp: [4, 12],
    cost: 20,
    perHour: [8, 22],
    people: 1,
    camera: 0,
    shape: "steady",
    ceiling: 4,
    difficulty: 3,
    bestFor: "Writers who like systems and are curious about what gets opened and clicked.",
    watchOut: "You are touching someone else's subscriber list. Learn consent and unsubscribe rules before you send anything.",
    firstStep: "Write a three-email welcome sequence for an imaginary shop and note the goal of each email.",
    plan: ["Learn one email platform and the basics of lists, segments and automations.", "Build a three-email welcome sequence as a sample.", "Pitch 10 creators or shops with a newsletter audit.", "Run one monthly newsletter for a client and report opens and clicks."],
    tools: ["MailerLite or Mailchimp (free tiers)", "Google Docs", "A spreadsheet for reporting"],
    articles: ["21-online-skills-that-can-change-your-income", "best-money-making-skills-2026", "how-to-get-your-first-freelance-client"],
    terms: ["Email Marketing", "Lead Magnet", "Conversion Rate"],
    templates: ["client-outreach", "proposal", "testimonial-request"]
  },
  {
    id: "customer-support",
    icon: "\u{1F3A7}",
    name: "Remote Customer Support",
    tagline: "Help customers by chat and email for a company, often on a set schedule.",
    skills: { people: 3, writing: 2, organizing: 1, tech: 1 },
    minHours: 12,
    ramp: [2, 8],
    cost: 0,
    perHour: [6, 14],
    people: 3,
    camera: 0,
    shape: "steady",
    ceiling: 2,
    difficulty: 1,
    bestFor: "Patient, warm communicators who want predictable work and a faster start.",
    watchOut: "It is usually hourly with a fixed schedule, so it is less flexible and the ceiling is lower. Great as a foundation or a bridge.",
    firstStep: "Rewrite three real customer complaints (from public reviews) into calm, helpful replies and save them as writing samples.",
    plan: ["Learn the basics of a help-desk tool and write three sample replies.", "Tidy your CV around communication and reliability.", "Apply to 15 remote support roles and ask each about schedule and tools.", "Start, learn the product fast, and note wins you can use for a higher-paid role later."],
    tools: ["A reliable laptop and internet", "Zendesk or Freshdesk (free trials)", "A tidy CV"],
    articles: ["remote-online-jobs-that-can-grow-toward-5000-a-month", "digital-skills-for-beginners", "how-to-choose-a-career"],
    terms: ["Remote Work", "Soft Skills", "Resume/CV"],
    templates: ["resume-bullets", "job-tracker", "salary-script"]
  },
  {
    id: "online-tutoring",
    icon: "\u{1F393}",
    name: "Online Tutoring & Coaching",
    tagline: "Teach a subject or skill you know well, one-to-one or in small groups.",
    skills: { teaching: 3, people: 2, organizing: 1 },
    minHours: 3,
    ramp: [1, 6],
    cost: 15,
    perHour: [7, 20],
    people: 3,
    camera: 1,
    shape: "steady",
    ceiling: 3,
    difficulty: 2,
    bestFor: "People who explain things well and enjoy watching someone else get it.",
    watchOut: "Your income is capped by your hours, and students cancel. Group sessions and recorded lessons are how you lift the ceiling.",
    firstStep: "Write a one-paragraph description of exactly who you teach and what they will be able to do after four sessions.",
    plan: ["Choose one subject and one type of learner you can genuinely help.", "Outline a four-session starter plan with a clear outcome.", "Offer a discounted trial session to five people and ask for honest feedback.", "Set a clear price, cancellation policy and booking link, then take your first paying student."],
    tools: ["Zoom or Google Meet", "A free booking page", "A shared whiteboard"],
    articles: ["how-to-choose-a-career", "build-your-online-empire", "digital-skills-for-beginners"],
    terms: ["Niche", "Target Audience", "Retainer"],
    templates: ["offer-builder", "client-onboarding", "testimonial-request"]
  },
  {
    id: "seo-writing",
    icon: "\u{1F50D}",
    name: "SEO & Blog Writing",
    tagline: "Write helpful articles that rank in search for businesses that want steady traffic.",
    skills: { writing: 3, numbers: 2, tech: 1, teaching: 1 },
    minHours: 5,
    ramp: [4, 12],
    cost: 20,
    perHour: [5, 16],
    people: 0,
    camera: 0,
    shape: "project",
    ceiling: 4,
    difficulty: 3,
    bestFor: "Researchers who like to explain things clearly and work quietly.",
    watchOut: "Pay per article can be low at first and AI-written filler is everywhere. Real expertise and original value are your edge.",
    firstStep: "Pick a question people really search, and outline an article that answers it better than the top result.",
    plan: ["Learn search intent, headings and basic keyword research with free tools.", "Publish two sample articles on a free blog or a document with a portfolio link.", "Pitch 10 small businesses and niche blogs with a specific article idea each.", "Deliver one paid article with sources and a clean structure, then propose a monthly plan."],
    tools: ["Google Search Console (free)", "Google Docs", "A free keyword tool"],
    articles: ["21-online-skills-that-can-change-your-income", "best-money-making-skills-2026", "how-to-use-chatgpt-and-claude-to-build-income-streams"],
    terms: ["SEO", "Content Marketing", "Target Audience"],
    templates: ["client-outreach", "portfolio-case-study", "proposal"]
  },
  {
    id: "no-code-web",
    icon: "\u{1F4BB}",
    name: "No-Code Website Builds",
    tagline: "Build simple websites and landing pages with drag-and-drop tools for small businesses.",
    skills: { tech: 3, visual: 2, organizing: 1, writing: 1 },
    minHours: 6,
    ramp: [4, 14],
    cost: 80,
    perHour: [8, 24],
    people: 1,
    camera: 0,
    shape: "project",
    ceiling: 5,
    difficulty: 4,
    bestFor: "Tinkerers who enjoy working out how things fit together.",
    watchOut: "Clients assume you also do their writing, photos and hosting. Spell out exactly what you build and what you do not.",
    firstStep: "Build a one-page site for a made-up business in a free no-code builder and publish it.",
    plan: ["Learn one builder end to end, including domains, forms and mobile layouts.", "Build two sample sites for different types of business.", "Pitch 10 businesses with an outdated site, naming one specific improvement.", "Deliver a fixed-price build with a written scope, a handover guide and a maintenance option."],
    tools: ["Carrd, Framer or WordPress (free tiers)", "A domain (about $12 a year)", "Google Analytics"],
    articles: ["21-online-skills-that-can-change-your-income", "digital-skills-for-beginners", "best-money-making-skills-2026"],
    terms: ["Landing Page", "Domain", "Responsive Design"],
    templates: ["proposal", "scope-change", "portfolio-case-study"]
  },
  {
    id: "ai-workflows",
    icon: "\u{1F916}",
    name: "AI-Assisted Operations",
    tagline: "Set up AI tools and simple automations that save small teams hours each week.",
    skills: { tech: 3, organizing: 2, numbers: 1, writing: 1 },
    minHours: 5,
    ramp: [3, 10],
    cost: 25,
    perHour: [8, 24],
    people: 1,
    camera: 0,
    shape: "steady",
    ceiling: 5,
    difficulty: 3,
    bestFor: "Curious problem-solvers who like making boring tasks disappear.",
    watchOut: "Tools change quickly and clients worry about privacy. Be clear about what data goes where and always have a human check the output.",
    firstStep: "Pick one repetitive task you do weekly and build an AI-assisted checklist that cuts the time in half. Document before and after.",
    plan: ["Learn one general AI assistant well and one automation tool.", "Automate three real tasks (for example, summarising meeting notes or drafting replies) and record the time saved.", 'Pitch 10 small teams with a specific audit: "I will find three tasks to automate".', "Deliver one paid setup with a short guide and a privacy note, then offer a monthly tune-up."],
    tools: ["An AI assistant", "Zapier or Make (free tiers)", "A notes app for documenting workflows"],
    articles: ["how-to-use-chatgpt-and-claude-to-build-income-streams", "best-money-making-skills-2026", "21-online-skills-that-can-change-your-income"],
    terms: ["Generative AI", "Prompt", "Automation"],
    templates: ["proposal", "scope-change", "portfolio-case-study"]
  },
  {
    id: "content-creator",
    icon: "\u{1F4F9}",
    name: "Faceless Content Creator",
    tagline: "Build an audience with videos, pins or posts, then earn from ads, affiliates and products.",
    skills: { visual: 2, writing: 2, teaching: 2, selling: 1 },
    minHours: 5,
    ramp: [12, 40],
    cost: 60,
    perHour: [0, 5],
    people: 0,
    camera: 1,
    shape: "compound",
    ceiling: 5,
    difficulty: 3,
    bestFor: "Consistent, patient people who like making things for the long term.",
    watchOut: "It is the slowest route to first money and most channels earn nothing for months. Treat it as a long investment, ideally alongside a faster income.",
    firstStep: "Choose one narrow topic and one platform, and publish your first three pieces within seven days.",
    plan: ["Pick a narrow topic you can make 50 pieces about, and study three channels doing it well.", "Publish consistently for the month on one platform.", "Review what people watched or saved, and double down on the top two formats.", "Add one simple way to earn: an affiliate link, a freebie that builds an email list, or a first small product."],
    tools: ["Your phone", "CapCut or Canva (free)", "A posting schedule"],
    articles: ["soft-girl-youtube-creator", "soft-girl-passive-income", "how-to-make-a-living-online-without-showing-your-face"],
    terms: ["Content Creator", "Monetization", "Affiliate Marketing"],
    templates: ["content-calendar", "offer-builder", "testimonial-request"]
  }
];

// data/pg/client-cases.js
var SKILL_LABELS = {
  boundaries: "Boundaries",
  pricing: "Pricing",
  clarity: "Clear communication",
  paperwork: "Contracts & payment",
  composure: "Staying composed"
};
var METERS = [
  { id: "money", label: "Money protected", icon: "\u{1F4B0}" },
  { id: "trust", label: "Client trust", icon: "\u{1F91D}" },
  { id: "energy", label: "Your energy", icon: "\u{1F50B}" }
];
var CASES = [
  {
    id: "low-budget",
    title: "The $50 website",
    tag: "Pricing",
    level: 1,
    minutes: 3,
    blurb: "A new client wants a lot, fast, for very little.",
    setup: "You are a freelance web designer. A stranger has found you through a friend and sent a message.",
    lesson: "You can say no to the package and yes to the person. Name what is realistic, offer a smaller honest option, and put the scope and a deposit in writing before you start.",
    templates: ["proposal", "client-onboarding"],
    terms: ["Scope of Work", "Deposit"],
    article: "how-to-get-your-first-freelance-client",
    start: "n1",
    rubric: [
      { id: "honest", label: "Says plainly what is and is not realistic", rx: /realistic|can'?t|cannot|won'?t be able|not possible|unable|not able|doesn'?t cover|wouldn'?t cover|too (short|tight|little)/i },
      { id: "alt", label: "Offers a smaller option or different timeline", rx: /instead|option|smaller|one[- ]page|starter|phase|simple|basic|could do|can do|happy to (do|build|create)/i },
      { id: "terms", label: "Mentions a price, timeline or scope", rx: /\$\s?\d|\d+\s*(day|week|hour)s?|price|quote|rate|scope|timeline|deliver/i },
      { id: "warm", label: "Keeps a warm, professional tone", rx: /thank|appreciate|happy|glad|love to|great to hear|excited/i }
    ],
    sample: "Thanks so much for reaching out! A full website in a day for $50 is not something I can do well, but I would be happy to build a simple one-page site for you. That would be $[price] with delivery in [X] days, and I would start once the deposit is in. Want me to send the details?",
    nodes: {
      n1: { from: "Jordan, new client", msg: "I need a complete website tomorrow. My budget is $50.", options: [
        { label: "Say yes. Winning a client matters more right now.", q: 0, fx: [-20, 0, -20], skill: "pricing", fb: "A full site in one day for $50 means a very low hourly rate and a high chance of resentment before you finish.", reply: "Amazing! Can you also add an online shop and a blog? Same budget, right?" },
        { label: "Explain what is realistic by tomorrow and offer a smaller, honest option with a price.", q: 3, fx: [10, 8, 5], skill: "pricing", fb: "You were honest about constraints and still gave a way forward. This is exactly how to turn a mismatch into a smaller yes.", reply: "Oh. I had not realised it was that much work. What could I get for $50?" },
        { label: "Decline with no explanation and move on.", q: 1, fx: [0, -6, 4], skill: "clarity", fb: "A boundary is fine, but two lines of explanation usually leave the door open to a better-fitting project later.", reply: "Okay, no problem." },
        { label: "Quote your full normal price without comment.", q: 2, fx: [5, -2, 2], skill: "pricing", fb: "Holding your price is good. Acknowledging their budget and offering a smaller option would have kept the conversation open.", reply: "That is way more than I expected. Is there a cheaper way?" }
      ] },
      n2good: { from: "Jordan", msg: "What could I get for $50? Honestly it is a side project and I am nervous about spending.", options: [
        { label: "Offer a clear one-page site with a defined scope, delivered next week, with half paid first.", q: 3, fx: [12, 8, 4], skill: "paperwork", fb: "A defined scope, a realistic date and a deposit protect you both. Notice how a nervous client relaxes when the edges are clear.", reply: "That sounds perfect. I will pay the deposit today." },
        { label: 'Say you will "see what you can do" and start tonight.', q: 1, fx: [-6, 2, -10], skill: "clarity", fb: 'Starting before the scope is defined invites "while you are at it" requests that you will have no grounds to refuse.', reply: "Great! I will send my ideas over in a few messages." },
        { label: "Tell them to come back when they have more budget.", q: 1, fx: [0, -8, 2], skill: "clarity", fb: "True, but you had already opened a smaller option. This closes it without need.", reply: "Oh... okay. Thanks anyway." }
      ] },
      n2bad: { from: "Jordan", msg: "Great, thanks! Quick thing: I also need a logo, three product photos edited, and the site in two languages. Still $50?", options: [
        { label: "Say it is not included and offer a quote for each extra.", q: 3, fx: [10, -2, 8], skill: "boundaries", fb: "Late, but a clear reset is far better than silently absorbing it. Next time, set scope in writing before you begin.", reply: "Hmm, I did not realise they were separate. Can you send the prices?" },
        { label: "Quietly do it all to avoid an awkward conversation.", q: 0, fx: [-20, 2, -25], skill: "boundaries", fb: "This is how a $50 job quietly becomes 25 hours. The awkward conversation costs far less than the burnout.", reply: "You are the best! By the way, could you also manage my social media?" },
        { label: "Say you will do the logo but not the rest.", q: 2, fx: [-4, 3, -4], skill: "boundaries", fb: "A partial boundary helps, but you are still giving free work. Quote the logo too, or trade it for a clear scope reduction.", reply: "Okay, thanks for the logo!" }
      ] }
    }
  },
  {
    id: "scope-creep",
    title: "Five tiny extras",
    tag: "Scope",
    level: 1,
    minutes: 3,
    blurb: 'The project is going well. Then the "small" requests begin.',
    setup: "You are a freelance social media manager, two weeks into a monthly package of 12 posts.",
    lesson: "Scope creep rarely arrives as one big ask. Check requests against the written scope, quote extras separately, and keep the tone friendly while the boundary stays firm.",
    templates: ["scope-change", "proposal"],
    terms: ["Scope of Work", "Revision"],
    article: "how-to-get-paid-as-a-freelancer",
    start: "n1",
    rubric: [
      { id: "check", label: "Refers to the agreed scope or package", rx: /scope|package|agreed|original|included|plan|current (plan|agreement)|what we (agreed|discussed)/i },
      { id: "quote", label: "Offers to price or schedule the extras", rx: /quote|price|cost|rate|add[- ]on|extra|additional|separate|\$\s?\d|next (month|package)/i },
      { id: "clear", label: "Asks which extras they mean or lists them", rx: /which|what exactly|can you (send|list|tell)|let me know (which|what)|details/i },
      { id: "warm", label: "Keeps it friendly", rx: /happy|glad|love to|thanks|thank you|absolutely|of course|sure/i }
    ],
    sample: "Happy to help with these! Your current package covers 12 posts a month, so the extras would sit outside it. Can you tell me exactly what you have in mind? I will send a quick quote for the add-ons, or we can fit some into next month.",
    nodes: {
      n1: { from: "Amara, client", msg: "Loving the posts! Can you just add five extra things this week: two stories, a carousel, a reel and a highlight cover? They are small, shouldn't take long.", options: [
        { label: "Add them for free to keep things smooth.", q: 0, fx: [-18, 4, -18], skill: "boundaries", fb: "One free favour is a gesture. A pattern of them becomes the new normal and makes next month harder to hold.", reply: "You are amazing! Next week I will need a few more things." },
        { label: "Check against the agreed scope, ask what exactly she needs, and offer to quote the extras.", q: 3, fx: [12, 6, 6], skill: "boundaries", fb: "Friendly, curious and firm. Clients almost always accept this because it sounds like a professional running a system.", reply: "Oh, of course. What would that cost?" },
        { label: "Say no, it is not in the package.", q: 2, fx: [4, -6, 2], skill: "boundaries", fb: 'Correct boundary, cold delivery. Offering a price turns a "no" into a "yes, for this".', reply: "Oh. I did not mean to be annoying." },
        { label: "Do two of them and ignore the rest.", q: 1, fx: [-8, -6, -8], skill: "clarity", fb: "Silence reads as rudeness and still gives away work. Tell her what you are and are not doing.", reply: "Hey, did you see my other three requests?" }
      ] },
      n2good: { from: "Amara", msg: "What would that cost? Also, can you shorten my approval time? I keep forgetting to check.", options: [
        { label: "Send a short price list for add-ons and set a 48-hour approval window in writing.", q: 3, fx: [12, 6, 8], skill: "paperwork", fb: "You fixed the present request and the underlying process. A written approval window removes a whole category of delays.", reply: "This is so clear. Let us add the reel for the price you listed." },
        { label: "Quote verbally and say you will sort the details later.", q: 1, fx: [-4, 0, -4], skill: "paperwork", fb: "A verbal quote is easy to forget or dispute. Put numbers and dates in writing.", reply: "Sounds fine, I think I remember the price." },
        { label: "Offer unlimited approvals within the same package to keep her happy.", q: 0, fx: [-10, 2, -12], skill: "boundaries", fb: "Open-ended flexibility is a cost you pay for forever. Boundaries are what make a good relationship sustainable.", reply: "Perfect, no deadlines then!" }
      ] },
      n2bad: { from: "Amara", msg: "I assumed the extras were fine since you did the first ones. Can you do another batch? Same arrangement.", options: [
        { label: 'Reset kindly: "I realise I set an unclear pattern. From now on extras are quoted separately."', q: 3, fx: [10, 0, 10], skill: "boundaries", fb: "Owning your part and resetting is strong. It lets her keep her dignity while you fix the pattern.", reply: "That is fair. Please send me prices." },
        { label: "Keep doing them and quietly resent it.", q: 0, fx: [-20, 0, -25], skill: "boundaries", fb: "Resentment is a sign that a boundary is missing, not that the client is bad.", reply: "Thanks! Can we also add a monthly report?" },
        { label: "Snap that she is taking advantage.", q: 0, fx: [0, -25, -6], skill: "composure", fb: "You may be right, but you set the pattern. A calm reset protects the relationship and the money.", reply: "Wow. I did not realise I was a problem." }
      ] }
    }
  },
  {
    id: "late-payment",
    title: "The late invoice",
    tag: "Payment",
    level: 2,
    minutes: 4,
    blurb: "The work is done. The money has not arrived.",
    setup: "You delivered a $450 project 19 days ago on 14-day terms. The client has gone quiet.",
    lesson: "Chase early, politely and in writing, with the invoice attached and a specific date. Terms, a deposit and late-fee wording on the invoice make this conversation short.",
    templates: ["invoice-chase", "client-onboarding"],
    terms: ["Invoice", "Deposit", "Milestone"],
    article: "how-to-get-paid-as-a-freelancer",
    start: "n1",
    rubric: [
      { id: "invoice", label: "Names the invoice, amount or due date", rx: /invoice|#\s?\d|\$\s?\d|due|overdue|outstanding/i },
      { id: "date", label: "Asks for payment by a specific date", rx: /by (monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|end of|\d)|(\d+)\s*(day|hour)s?|on or before|\b\d{1,2}(st|nd|rd|th)?\b/i },
      { id: "calm", label: "Stays calm and professional", rx: /thank|appreciate|hope|friendly|reminder|checking in|following up/i },
      { id: "next", label: "Mentions the next step or a payment option", rx: /bank|transfer|link|paypal|stripe|payment (plan|option)|let me know|confirm/i }
    ],
    sample: "Hi [name], a quick reminder that invoice #[number] for $450 was due on [date]. Could you let me know when I can expect payment, ideally by [date]? I have attached it again with the payment link. Thanks so much, and let me know if anything is holding it up.",
    nodes: {
      n1: { from: "Priya, client", msg: "Hi!! So sorry, things have been crazy. I will definitely get to it soon!", options: [
        { label: 'Say "no worries!" and wait another couple of weeks.', q: 0, fx: [-15, 4, -10], skill: "paperwork", fb: 'Waiting makes it feel optional. "Soon" has no date and the longer it drifts, the less likely it is paid.', reply: "(No reply for ten days.)" },
        { label: "Reply warmly with the invoice number, the amount and a specific payment date, and attach it again.", q: 3, fx: [14, 5, 8], skill: "paperwork", fb: "Specific, friendly and easy to act on. You make paying the easiest next step.", reply: "Oh, thank you for attaching it. I can pay this Friday." },
        { label: "Send an angry message about unprofessional clients.", q: 0, fx: [-6, -25, -8], skill: "composure", fb: "Anger rarely gets money faster and it can damage a reference. Firm and calm gets paid more often.", reply: "I am sorry you feel that way. I will pay when I can." },
        { label: "Say work is on hold on her other projects until the invoice is paid.", q: 2, fx: [8, -4, 4], skill: "boundaries", fb: "A fair consequence, but lead with the specific invoice and date first. Pausing works best once the request is clear.", reply: "Understood. Let me check with my accountant." }
      ] },
      n2good: { from: "Priya", msg: "I can pay this Friday. Also, can you start the next project now and I will pay for both together?", options: [
        { label: "Say yes once Friday's payment arrives, and ask for a deposit on the next one.", q: 3, fx: [12, 4, 6], skill: "paperwork", fb: "Clean sequence: first invoice, then a deposit. You get to keep a good client without financing her business.", reply: "That is fair. I will send the deposit with Friday's payment." },
        { label: "Start now. She seems trustworthy.", q: 0, fx: [-18, 4, -10], skill: "paperwork", fb: "Trust is lovely; terms are what protect you. Doing more work on credit raises what you stand to lose.", reply: "You are the best! Friday for sure." },
        { label: "Refuse any future work with her.", q: 1, fx: [0, -10, 2], skill: "clarity", fb: "She has just committed to a date. Wait and see whether she keeps it before ending the relationship.", reply: "Okay. I will still pay on Friday." }
      ] },
      n2bad: { from: "Priya", msg: "(Ten days later.) I thought I had already paid. Can you check?", options: [
        { label: "Check your records, reply with proof it is not received, resend the invoice and set a final date.", q: 3, fx: [12, 2, 6], skill: "paperwork", fb: "Facts first, tone friendly, date firm. Keep the paper trail, in case you need to escalate.", reply: "Oh no, you are right. Paying now." },
        { label: "Assume she did and write it off.", q: 0, fx: [-20, 0, -8], skill: "paperwork", fb: "Never write off money you have not verified. Check your account first.", reply: "Thanks for understanding!" },
        { label: "Threaten to sue immediately.", q: 1, fx: [2, -20, -10], skill: "composure", fb: "Legal steps can be appropriate later, but jumping to them over a 10-day delay is premature and burns goodwill.", reply: "There is no need for threats. I will look into it." }
      ] }
    }
  },
  {
    id: "unpaid-test",
    title: "The free test project",
    tag: "Boundaries",
    level: 2,
    minutes: 3,
    blurb: "A promising lead asks you to prove yourself with unpaid work.",
    setup: "You are a freelance brand designer. A company contacts you about a big, recurring project.",
    lesson: "A portfolio, a short call or a small paid trial can prove your skill. Free deliverable-level work usually cannot be reused by you but can be used by them.",
    templates: ["proposal", "portfolio-case-study"],
    terms: ["Portfolio", "Scope of Work"],
    article: "how-to-get-your-first-freelance-client",
    start: "n1",
    rubric: [
      { id: "portfolio", label: "Points to existing work or samples", rx: /portfolio|samples?|previous work|case stud(y|ies)|examples?|past (work|projects)/i },
      { id: "paid", label: "Offers a paid trial or small paid first step", rx: /paid|trial|pilot|small (project|first)|starter|fee|rate/i },
      { id: "respect", label: "Declines unpaid work politely", rx: /don'?t (do|offer)|unable to|not able to|can'?t offer|prefer|happy to|glad to/i },
      { id: "next", label: "Proposes a clear next step", rx: /call|chat|brief|next step|send|schedule|let me know|book/i }
    ],
    sample: "Thanks for thinking of me! I do not offer unpaid test designs, but my portfolio has similar projects here: [link]. If you would like to see how I would work with you, I can do a small paid trial. Shall we hop on a 15-minute call to scope it?",
    nodes: {
      n1: { from: "Marcus, marketing lead", msg: "We love your style! Before we hire you, can you create three full logo concepts so we can compare? Big project coming after.", options: [
        { label: "Create all three to show what you can do.", q: 0, fx: [-20, 2, -20], skill: "boundaries", fb: "Full concepts are the product. Giving them away free can hand the client the work without ever hiring you.", reply: "Great, thanks! We will let you know. (They never reply.)" },
        { label: "Share your portfolio and propose a small paid trial or a short call.", q: 3, fx: [12, 6, 6], skill: "boundaries", fb: "You respect your time and give them a real way to evaluate you. Serious clients accept this.", reply: "Hmm, ok. Let me check with my team about a paid trial." },
        { label: "Walk away without responding.", q: 2, fx: [0, -4, 4], skill: "boundaries", fb: "A fair instinct for a clear red flag, but a short polite decline usually protects your reputation.", reply: "(Silence.)" },
        { label: "Do one concept as a compromise.", q: 1, fx: [-8, 2, -8], skill: "boundaries", fb: "Still free production. If you do any free work, keep it small and clearly separate from deliverables.", reply: "Thanks! Can you do the other two as well?" }
      ] },
      n2good: { from: "Marcus", msg: "OK, we can do a paid trial. But our budget is tight: can it be $100?", options: [
        { label: "Offer a narrower scope at that price, one defined deliverable with 1 revision, in writing.", q: 3, fx: [10, 6, 6], skill: "pricing", fb: "You kept the price and shrank the scope instead. That is much healthier than discounting the work.", reply: "Perfect, let us do that." },
        { label: "Agree to the full trial at $100 with no limits.", q: 1, fx: [-10, 4, -12], skill: "pricing", fb: "Discounting without reducing scope trains clients to expect the lower price for everything.", reply: "Great! We might add a few things." },
        { label: "Hold your original price and let them decide.", q: 2, fx: [4, -2, 4], skill: "pricing", fb: "Valid, but offering a smaller scope keeps the door open.", reply: "Let me get back to you." }
      ] },
      n2bad: { from: "Marcus", msg: "We reviewed the concepts and went with another designer. But we will use your colour palette. Thanks!", options: [
        { label: "Calmly say your concepts are not licensed for use, and offer a paid licence.", q: 3, fx: [10, -2, 8], skill: "paperwork", fb: "Unpaid work without a contract can be hard to enforce. Spell out ownership and licensing before you create anything next time.", reply: "We did not realise it worked like that. What would a licence cost?" },
        { label: "Say nothing. It is just a palette.", q: 0, fx: [-10, 0, -12], skill: "paperwork", fb: 'It is rarely "just" a palette. Quietly absorbing it teaches clients that your work has no owner.', reply: "(They thank you and move on.)" },
        { label: "Post an angry rant about them online.", q: 0, fx: [-4, -22, -10], skill: "composure", fb: "A public rant can hurt your reputation more than theirs. A private, firm message is stronger.", reply: "We are surprised by your post. (They block you.)" }
      ] }
    }
  },
  {
    id: "endless-revisions",
    title: "Revision number six",
    tag: "Feedback",
    level: 2,
    minutes: 4,
    blurb: "The brief keeps changing and the finish line keeps moving.",
    setup: "You are a freelance copywriter on a $400 sales page. Your contract included two revision rounds. You are now on round six.",
    lesson: 'Clear revision limits, a written approval step and a short "what is not working?" question are the antidote to endless feedback loops.',
    templates: ["scope-change", "proposal"],
    terms: ["Revision", "Scope of Work", "Milestone"],
    article: "how-to-get-paid-as-a-freelancer",
    start: "n1",
    rubric: [
      { id: "limit", label: "Refers to the agreed number of revisions", rx: /revision|round|included|two|agreed|contract|scope/i },
      { id: "ask", label: "Asks what specifically is not working", rx: /what (specifically|exactly)|which (part|section)|what.*(missing|not working|feel)|can you (tell|point)|specific/i },
      { id: "option", label: "Offers extra rounds as paid or a final pass", rx: /additional|extra|paid|\$\s?\d|rate|final|last (pass|round)|add[- ]on/i },
      { id: "warm", label: "Stays warm and solution-focused", rx: /happy|glad|love|thank|together|get this (right|done)|great/i }
    ],
    sample: "Thanks for the feedback, I want this to land for you. We have used the two revision rounds in our agreement, so I can offer a final pass for $[price] or we can book extra rounds at $[hourly]. To make it count, can you tell me exactly what feels off and what outcome you want it to produce?",
    nodes: {
      n1: { from: "Lena, client", msg: "Hmm. It still isn't quite right. Can you make it pop more? I will know it when I see it.", options: [
        { label: "Do round six without saying anything about the limit.", q: 0, fx: [-15, 2, -20], skill: "boundaries", fb: 'Silence is agreement. "I will know it when I see it" is a sign you need to change the process, not just the copy.', reply: "Better, but can we try a totally different angle?" },
        { label: "Acknowledge the effort, point to the agreed rounds, ask what is not working, and offer a paid final pass.", q: 3, fx: [10, 6, 10], skill: "boundaries", fb: "Warm, honest and structured. You turn vague feedback into a concrete brief and make extra rounds a clear choice.", reply: "Fair. I think the opening does not match our audience. Let me explain." },
        { label: "Tell her she has used all her rounds and refuse further changes.", q: 2, fx: [4, -8, 2], skill: "boundaries", fb: "Right principle, but offering a way forward makes it a choice rather than a wall.", reply: "That feels harsh after everything I have paid for." },
        { label: "Offer unlimited revisions to keep her happy.", q: 0, fx: [-18, 4, -22], skill: "boundaries", fb: "Unlimited revisions are an invitation to unlimited work. Limits protect both of you from drift.", reply: "Brilliant! I will send my notes over the weekend, and the next week." }
      ] },
      n2good: { from: "Lena", msg: "I think it needs to sound more like our founder. I do not have time to go through it but I will send a voice note.", options: [
        { label: "Ask for a 20-minute call, record it with permission, and then deliver one focused rewrite.", q: 3, fx: [10, 6, 6], skill: "clarity", fb: "A short conversation does what ten rounds of vague feedback cannot. Capture her words and your job gets much easier.", reply: "Great call. Send me the new version." },
        { label: "Guess the voice from her website and rewrite again.", q: 1, fx: [-6, 0, -8], skill: "clarity", fb: "You are guessing again, which is how rounds get wasted. Get the information first.", reply: "Closer, but still not there." },
        { label: "Tell her you are too busy for a call.", q: 1, fx: [0, -6, 2], skill: "clarity", fb: "A brief call saves you many emails. Refusing makes extra rounds likelier.", reply: "Okay. I will try to write down my thoughts." }
      ] },
      n2bad: { from: "Lena", msg: "Honestly I am getting frustrated. I have paid you a lot and it is still not right. Maybe I should ask for a refund.", options: [
        { label: "Stay calm, summarise what was delivered, offer one final paid pass or a partial refund of the unused portion, and ask what she prefers.", q: 3, fx: [4, 8, 10], skill: "composure", fb: "You separate the feeling from the facts and offer real choices. Calm gets difficult clients unstuck.", reply: "Okay, let us do the final pass. Thank you for being clear." },
        { label: "Agree to refund everything immediately.", q: 0, fx: [-25, 0, 0], skill: "paperwork", fb: "A full refund for completed work is rarely right. Check your contract and offer proportionate options.", reply: "Thank you. (She keeps the copy you wrote.)" },
        { label: "Argue that she is wrong and the copy is great.", q: 1, fx: [0, -18, -8], skill: "composure", fb: "Being right does not fix a frustrated client. Acknowledge, then offer a path.", reply: "I see you will not listen. We are done." }
      ] }
    }
  },
  {
    id: "rate-rise",
    title: "Raising your rates",
    tag: "Pricing",
    level: 3,
    minutes: 4,
    blurb: "A long-term client has been paying the same for two years.",
    setup: "You have worked with the same client for 24 months at the same price. Your skills and workload have grown.",
    lesson: "A rate rise is a business decision, not a favour. Give notice, state the new price plainly, thank them for the relationship and offer a clear transition date.",
    templates: ["rate-increase", "salary-script"],
    terms: ["Retainer", "Revenue"],
    article: "how-to-get-paid-as-a-freelancer",
    start: "n1",
    rubric: [
      { id: "price", label: "States the new price clearly", rx: /\$\s?\d|new (rate|price)|rate (will|is)|increase/i },
      { id: "notice", label: "Gives a start date or notice period", rx: /from (the )?(1st|first|next|january|february|march|april|may|june|july|august|september|october|november|december)|starting|effective|\d+\s*(day|week|month)s?|notice/i },
      { id: "thanks", label: "Thanks them for the relationship", rx: /thank|appreciate|enjoy|grateful|value|pleasure/i },
      { id: "noapology", label: "Does not over-apologise", neg: true, rx: /so sorry|apologi[sz]e|sorry to|hate to|i feel (terrible|awful|bad)|if that's okay|hope that's ok/i }
    ],
    sample: "Hi [name], I have really enjoyed working together over the last two years and I am grateful for your trust. From [date], my monthly rate will be $[new price] to reflect the expanded scope and my current experience. I am happy to talk it through if useful.",
    nodes: {
      n1: { from: "You (drafting a message)", msg: "You want to raise your monthly rate by 20%. How do you tell the client?", options: [
        { label: "Send a warm note with the new price, effective in 30 days, and thank them.", q: 3, fx: [14, 4, 8], skill: "pricing", fb: "Plain, kind and confident. Notice period gives them time to say yes.", reply: "Thanks for letting me know. That is fair. Can we talk about what is included?" },
        { label: 'Apologise at length and ask if they would "possibly consider" a small change.', q: 1, fx: [2, 0, -10], skill: "pricing", fb: "Over-apologising invites negotiation. State the price like it is a fact because it is.", reply: "Oh, I am not sure about that. Can we keep it the same?" },
        { label: "Quietly raise the invoice without telling anyone.", q: 0, fx: [4, -22, -6], skill: "clarity", fb: "Surprises erode trust fast. Always give notice and an explanation.", reply: "Why is this invoice higher than usual?" },
        { label: "Never raise rates. They might leave.", q: 0, fx: [-15, 2, -15], skill: "pricing", fb: "Staying stuck at an old rate is a pay cut every year as your skills and costs grow.", reply: "(Nothing changes, again.)" }
      ] },
      n2good: { from: "Client", msg: "Thanks for letting me know. Honestly, our budget is tight this quarter. Could you keep the old rate until June?", options: [
        { label: "Offer a phased rise: the new rate from June, or the old rate with a slightly reduced scope until then.", q: 3, fx: [8, 6, 8], skill: "pricing", fb: "You gave a real choice without discounting your value. Phasing keeps the relationship intact.", reply: "The reduced scope until June works well. Thank you." },
        { label: "Say yes to keep the peace.", q: 1, fx: [-8, 4, -6], skill: "pricing", fb: "A delay is fine if you decide it is. Make it a trade, not a surrender.", reply: "Thanks so much! You are the best." },
        { label: "Refuse and say take it or leave it.", q: 1, fx: [4, -14, -2], skill: "composure", fb: "Rigid answers can lose a good client. You can hold the price and flex the timeline or scope.", reply: "Understood. Let me think about it." }
      ] },
      n2bad: { from: "Client", msg: "This feels like a big jump and I was not expecting it. Honestly I might need to look at other freelancers.", options: [
        { label: "Stay calm, explain what has changed in your scope and results, and offer a clear choice between new rate and reduced scope.", q: 3, fx: [8, 6, 8], skill: "composure", fb: "You stay steady and give concrete options. If they leave, they leave at a price that works for you.", reply: "Okay, that makes sense. Let us talk about the scope." },
        { label: "Back down immediately and keep the old rate.", q: 0, fx: [-14, 2, -10], skill: "pricing", fb: "One push-back and you retreat. Prepare for pushback by deciding your floor in advance.", reply: "Great! Thanks so much for understanding." },
        { label: "Say good luck finding someone cheaper.", q: 1, fx: [0, -20, 2], skill: "composure", fb: "Snark burns bridges. You can let a client go kindly.", reply: "Wow. Okay, goodbye then." }
      ] }
    }
  }
];

// data/pg/games.js
var MONEY_MOVES = [
  { situation: "You just received your first $500 from freelance work.", options: [
    { label: "Celebrate with a big treat.", fx: [-10, -5, 12], fb: "Celebrating is healthy. It is the size that matters: a treat is fine, the whole amount may be too much when you have no buffer yet." },
    { label: "Split it: some saved, some for tools, a little for you.", fx: [8, 8, 8], fb: "A balanced split protects you, grows your skills and marks the win. It is popular for good reasons." },
    { label: "Put all of it in savings.", fx: [18, -8, 2], fb: "Safe, and sensible with no emergency fund. But nothing goes back into the business that earned it." },
    { label: "Put it all into a $497 course.", fx: [-18, 10, -10], fb: "Learning can pay, but spending every pound on one course before you know it works is concentrated risk." }
  ] },
  { situation: 'A client offers to pay you in "exposure" for a real project.', options: [
    { label: "Accept. Exposure might lead to real clients.", fx: [-12, 2, -8], fb: "Occasionally yes, usually no. Exposure does not pay rent and the client keeps your work." },
    { label: "Ask exactly what the exposure includes and what budget there is.", fx: [6, 6, 4], fb: "Specifics turn a vague offer into something you can judge. Often a budget appears." },
    { label: "Politely decline.", fx: [6, -2, 8], fb: "Clear and professional. You protect your rate and your time." }
  ] },
  { situation: "You are tempted by a $300 course that teaches a skill you are already learning free.", options: [
    { label: "Buy it. Paying means you will finish.", fx: [-15, 4, -6], fb: "Spending can boost commitment, but it is not the only route. A free resource you use beats an expensive one you abandon." },
    { label: "Exhaust the free resources first, then decide.", fx: [8, 6, 6], fb: "You will know exactly what gap a paid course would fill, so you only buy what you need." },
    { label: "Ask someone who took it if it delivered.", fx: [5, 7, 5], fb: "Specific feedback beats a sales page every time." }
  ] },
  { situation: "You earned $1,200 this month, double your usual.", options: [
    { label: "Treat it as your new normal and upgrade your lifestyle.", fx: [-18, -4, -8], fb: "One strong month is not a baseline. Irregular income needs a buffer, not a raise." },
    { label: "Set aside half for slower months and use the rest wisely.", fx: [14, 6, 10], fb: "Treat good months as the buffer for leaner ones. This habit protects freelancers for years." },
    { label: "Spend everything on equipment for your business.", fx: [-12, 10, -6], fb: "Tools can pay back, but not if they leave you unable to cover a quiet month." }
  ] },
  { situation: "A friend wants to borrow money you set aside for a client refund and tax.", options: [
    { label: "Lend it anyway.", fx: [-20, 0, -12], fb: "Generous, but risky if it leaves you unable to meet a real obligation." },
    { label: "Explain it is already committed and offer another way to help.", fx: [4, 0, 8], fb: "A clear, kind boundary. Money earmarked for an obligation is not spare money." },
    { label: "Offer a smaller amount you can truly afford to lose.", fx: [-4, 0, 4], fb: "A good rule for lending to friends: only lend what you could comfortably give." }
  ] },
  { situation: "Your laptop is slow, but it still works for your clients.", options: [
    { label: "Buy the newest model on credit.", fx: [-18, 6, -12], fb: "Upgrading on credit adds a payment for something you do not yet need." },
    { label: "Save for a replacement over a few months while it still works.", fx: [8, 8, 6], fb: "Planned purchases from earned money keep you in control." },
    { label: "Try fixing the slowness first with a clean-up or a small upgrade.", fx: [4, 6, 8], fb: "A cheap fix can add a year of life. Spend where the problem actually is." }
  ] },
  { situation: "A big client wants net-60 payment terms.", options: [
    { label: "Accept to keep the client.", fx: [-14, 4, -8], fb: "Sixty days is a long time to finance someone else. It is a cash-flow risk, not just a delay." },
    { label: "Counter with a deposit and net-14 or net-30.", fx: [12, 4, 8], fb: "Proposing a deposit plus shorter terms is normal and many clients agree." },
    { label: "Accept net-60 but raise your price.", fx: [4, 6, 2], fb: "Pricing the waiting time into the project is a smart way to be fair to yourself." }
  ] },
  { situation: "You have $400 spare this month. What do you do?", options: [
    { label: "Build your emergency fund towards three months of costs.", fx: [16, 0, 10], fb: "The boring answer often wins. A buffer is what lets you say no to bad clients." },
    { label: "Put it into one marketing experiment.", fx: [-8, 14, 2], fb: "Spending to learn what brings clients can be great, with an amount you can afford to lose." },
    { label: "Spread it between both.", fx: [8, 8, 6], fb: "Balanced and sensible. Review in a month what worked." }
  ] },
  { situation: 'A client says they will pay "after the launch". The launch has no date.', options: [
    { label: "Agree. You trust them.", fx: [-16, 2, -10], fb: "Payment tied to someone else's plans means you wait on their timeline." },
    { label: "Ask for a deposit now and the balance on delivery.", fx: [14, 4, 8], fb: "Your work has a delivery date. Payment should have one too." },
    { label: "Walk away immediately.", fx: [2, -4, 4], fb: "Safe, but you could have kept the job by changing the terms." }
  ] },
  { situation: "You are thinking about quitting your 9 to 5 because a side project made $900 this month.", options: [
    { label: "Quit tomorrow. Momentum matters.", fx: [-25, 6, -14], fb: "One good month is a signal, not a salary. Look for three consistent months and some months of runway first." },
    { label: "Keep your job and track income for three more months.", fx: [10, 8, 8], fb: "Proof of repeatability makes the leap safer. You can still build while employed." },
    { label: "Ask to go part-time.", fx: [4, 10, 8], fb: "A creative middle path. It reduces risk and buys you hours for the business." }
  ] },
  { situation: "Tax time is coming and you spent most of what you earned.", options: [
    { label: "Hope for the best and sort it out later.", fx: [-18, 0, -14], fb: "Hope is not a plan. Freelance income usually needs a share set aside as you earn." },
    { label: "From now on, move a fixed share of every payment into a separate pot.", fx: [14, 2, 10], fb: "Automating a set-aside is the easiest habit to keep. Ask a local professional what share applies where you live." },
    { label: "Look up the rules in your country and talk to an accountant if unsure.", fx: [8, 4, 8], fb: "Tax rules vary a lot. A short chat with a professional is cheap compared with a surprise bill." }
  ] },
  { situation: "You want to charge more but you are scared clients will leave.", options: [
    { label: "Raise rates for new clients only.", fx: [6, 8, 6], fb: "A low-risk way to test. New clients have no old price to compare with." },
    { label: "Stay where you are. It is safer.", fx: [-6, -6, 2], fb: "Staying put is a decision too. It quietly lowers your real pay as costs rise." },
    { label: "Raise everyone's rate tomorrow with no notice.", fx: [6, -2, -8], fb: "A raise is fair. Surprises are not. Give notice and a reason." }
  ] }
];
var RED_FLAGS = [
  { text: "I need the entire project tonight. I will pay you after my customer pays me.", flag: true, why: "Two warning signs: an unrealistic deadline and payment dependent on someone else paying them." },
  { text: "Here is the full brief, timeline and budget. Let me know if you have questions before we start.", flag: false, why: "Clear scope, timeline and budget up front is what a healthy client looks like." },
  { text: "Before we hire you, can you make three full logo concepts for us to review?", flag: true, why: 'Free deliverable-level "test work" is a common way labour is extracted without pay.' },
  { text: "Can you add these five small things? They should not take long.", flag: true, why: "Classic scope creep. Small extras outside the agreed scope still deserve a conversation and often a quote." },
  { text: "I would like to send a 50% deposit before we begin. Where should I send it?", flag: false, why: "A client offering a deposit is a strong, healthy signal." },
  { text: "Send me your bank login so I can deposit your payment directly.", flag: true, why: "No legitimate client needs your bank login. Payments go via normal transfer or invoice." },
  { text: "I need unlimited revisions until I am fully satisfied, no end date.", flag: true, why: "Open-ended revisions are a common cause of scope creep and burnout. A healthy agreement caps them." },
  { text: "I would rather not sign anything. Let us just start and work out details as we go.", flag: true, why: "A client unwilling to put basic terms in writing is a risk for payment and scope disputes later." },
  { text: "Happy to sign your contract. Can we change the payment terms to net-14?", flag: false, why: "Negotiating terms inside a signed contract is normal, healthy professional behaviour." },
  { text: "We are a big brand with a huge audience. We cannot pay but this will be great exposure.", flag: true, why: "Big audiences do not substitute for pay. Real exposure is worth asking about in specifics." },
  { text: "Our budget is $400 for this scope. If you can fit it, let us talk about the timeline.", flag: false, why: "A stated budget and scope makes a decision possible for you. You can say yes or no with facts." },
  { text: "You will get paid after we see how the project performs.", flag: true, why: "Payment tied to results you do not control, without a clear formula, can mean no pay at all." },
  { text: "Thanks for the update! Please send the invoice and I will pay within five working days.", flag: false, why: "Prompt, clear payment intent. Great client behaviour to notice and thank." },
  { text: "Can we jump on a quick call? I will explain everything. Do not put it in writing.", flag: true, why: "Avoiding writing is a warning sign. Calls are fine, but confirm agreements in writing afterwards." },
  { text: "Here is the access to our brand folder and a one-page style guide.", flag: false, why: "Giving you materials and guidance up front makes your job easier and saves revision rounds." },
  { text: "Your rates are too high. My nephew can do it for $20, but I want you to do it.", flag: true, why: "A comparison used to push a price down. You can say no, or reduce scope instead of price." },
  { text: "We will use your work in our ads, but the contract says you give up all rights forever.", flag: true, why: 'A rights transfer can be fine, but "all rights forever" with no extra payment is worth negotiating.' },
  { text: "I have to be honest, our last freelancer disappeared. I am nervous, so I am happy to pay in two milestones.", flag: false, why: "Honesty plus a structure that protects both sides is a green flag." },
  { text: "This is a rush, tomorrow morning! I will not pay a rush fee but I will give you a nice review.", flag: true, why: "Urgency without compensation is one-sided. A rush fee is standard." },
  { text: "Please check the attached brief. Our deadline is flexible. What do you need from us to start?", flag: false, why: "A flexible deadline, a brief and a question about your needs is a respectful client." },
  { text: "We will pay you the full fee, but first we need you to buy some software and we will reimburse you.", flag: true, why: "A request to pay first and be reimbursed later is a known scam pattern. Never front money for a new client." },
  { text: "Your portfolio is great. Could we book a 20-minute call to talk about the project and your rates?", flag: false, why: "A short call to discuss scope and rates is a normal first step." }
];
var SKILL_MATCH = [
  { need: "A business needs short vertical videos for Instagram and TikTok with captions.", options: ["Video editing", "Bookkeeping", "SEO writing"], answer: 0, why: "Short-form content calls for trimming, captions, pacing and platform-specific exports." },
  { need: "An online shop wants its product pages found when people search on Google.", options: ["SEO", "Voice acting", "Event planning"], answer: 0, why: "SEO focuses on helping pages appear in search results through content and structure." },
  { need: "A busy founder needs someone to manage her inbox, calendar and bookings.", options: ["Virtual assistance", "Logo design", "Photography"], answer: 0, why: "Inbox, calendar and bookings are classic virtual assistant tasks." },
  { need: "A coaching business wants a monthly newsletter and a three-email welcome sequence.", options: ["Email marketing", "Graphic design", "Data entry"], answer: 0, why: "Newsletters and automations are the core of email marketing work." },
  { need: "A small brand wants a logo, colours and fonts that feel consistent everywhere.", options: ["Brand and graphic design", "Transcription", "Customer support"], answer: 0, why: "Visual identity work is graphic and brand design." },
  { need: "A new app wants help writing clear help-centre answers for customers.", options: ["Customer support or technical writing", "Video editing", "Bookkeeping"], answer: 0, why: "Clear help content and support replies combine writing and customer empathy." },
  { need: "A creator wants a landing page for her new digital product, with a signup form.", options: ["No-code web design", "Podcast editing", "Translation"], answer: 0, why: "Landing pages and forms are typical no-code web work." },
  { need: "A team spends hours each week copying data between tools and wants it automated.", options: ["Automation and AI workflows", "Photography", "Copywriting"], answer: 0, why: "Connecting tools and automating repetitive steps is automation work." },
  { need: "A brand wants real-looking product videos from a customer's point of view for its ads.", options: ["UGC creation", "Bookkeeping", "SEO"], answer: 0, why: "User-generated content is authentic, creator-made video and photos used in marketing." },
  { need: "A shop wants persuasive words for its homepage, product pages and ads.", options: ["Copywriting", "Data analysis", "Web hosting"], answer: 0, why: "Copywriting is writing designed to make people act." },
  { need: "A school wants an evening tutor to explain algebra to teenagers on video calls.", options: ["Online tutoring", "Graphic design", "SEO"], answer: 0, why: "Explaining a subject to learners one-to-one or in groups is tutoring." },
  { need: "A startup wants to know which of its marketing channels bring customers, using its sales numbers.", options: ["Analytics and reporting", "Voice acting", "Illustration"], answer: 0, why: "Reading numbers to find patterns and report on results is analytics." },
  { need: "A podcaster wants episodes cleaned up and published weekly with show notes.", options: ["Podcast production", "Bookkeeping", "Logo design"], answer: 0, why: "Editing audio, show notes and publishing is podcast production." },
  { need: "A local caf\xE9 wants someone to plan and schedule a month of posts.", options: ["Social media management", "Software testing", "Translation"], answer: 0, why: "Planning, writing and scheduling posts is social media management." }
];
var INBOX = [
  { from: "New client", msg: "Hi! Love your work. Can you design a full brand identity for my new business? Budget is flexible, tell me your price.", best: "clarify", ok: ["quote"], why: 'A flexible budget is good news, but "full brand identity" is huge. Ask what is included, what they need and when, before you price.' },
  { from: "Existing client", msg: "Can you add three more pages to the website? Same price as before, right?", best: "quote", ok: ["clarify"], why: "Extra pages are new scope. Quote them separately, kindly and promptly." },
  { from: "Unknown sender", msg: "You are hired! Send your bank login and a copy of your passport so we can set up your salary.", best: "report", ok: ["decline"], why: "No real employer needs your bank login. This is a scam; report it and do not reply with details." },
  { from: "Past client", msg: "We loved last month's work! Same brief again next month. Can you confirm your availability?", best: "reply", ok: ["clarify"], why: "A repeat client with a known brief is a gift. Confirm quickly and clearly." },
  { from: "Large brand", msg: "We would like you to create 10 designs for our campaign. Payment: product samples and a shout-out.", best: "decline", ok: ["quote"], why: "Free product for 10 deliverables rarely makes sense. Decline politely or quote a real fee." },
  { from: "Potential client", msg: "Can you do this by tomorrow morning? It is a rush job.", best: "quote", ok: ["clarify"], why: "Rush work is a premium service. If you can do it, quote a rush fee." },
  { from: "Client", msg: "The invoice is due today but I am a bit short. Can you give me another two weeks?", best: "clarify", ok: ["quote"], why: "Ask what date works and whether a partial payment now is possible, then confirm in writing." },
  { from: "Stranger", msg: "I will pay $2,000 for a $200 job. Please pay the extra to my courier and I will send you the full amount.", best: "report", ok: ["decline"], why: "This is an overpayment scam. Never send money back or onward on someone else's behalf." },
  { from: "Recruiter", msg: "We have a remote role that matches your profile. Can you share your CV and a 15-minute call time?", best: "reply", ok: ["clarify"], why: "A normal, low-risk next step. Check the company and role while you reply." },
  { from: "Client", msg: "I do not like it. Redo the whole thing but better.", best: "clarify", ok: ["reply"], why: "Vague feedback needs questions. Ask what exactly is not working so a redo hits the target." },
  { from: "New client", msg: "I only need a quick edit but I cannot say what yet. How much?", best: "clarify", ok: ["quote"], why: "You cannot price what you cannot see. Ask for the file and the changes." },
  { from: "Client", msg: "Can you give me a discount? My budget is smaller than your rate.", best: "quote", ok: ["clarify"], why: "Offer a reduced scope at the smaller budget, instead of the same scope for less money." }
];
var INBOX_ACTIONS = [
  { id: "reply", label: "Reply and agree" },
  { id: "clarify", label: "Ask questions" },
  { id: "quote", label: "Quote or negotiate" },
  { id: "decline", label: "Decline politely" },
  { id: "report", label: "Report as scam" }
];
var PRICE_THIS = [
  { project: "A local bakery wants 8 branded Instagram graphics and a simple style guide.", hours: 10, rate: 30, buffer: 0.2, rush: 0, usage: 0, note: "Standard timeline, personal feedback, one revision round." },
  { project: "A coach wants a 5-page website in a no-code builder, with a contact form.", hours: 16, rate: 35, buffer: 0.25, rush: 0, usage: 0, note: "You supply the layout. Client provides text and photos." },
  { project: "A startup needs a three-email welcome sequence written, delivered in 2 days.", hours: 6, rate: 40, buffer: 0.15, rush: 0.3, usage: 0, note: "Rush job: they need it by Friday." },
  { project: "A skincare brand wants three product videos edited for ads they will run for a year.", hours: 8, rate: 35, buffer: 0.2, rush: 0, usage: 0.25, note: "Paid ads use extends how long and where the work can be seen." },
  { project: "A freelancer wants 12 hours a month of virtual assistance on a retainer.", hours: 12, rate: 22, buffer: 0.1, rush: 0, usage: 0, note: "Predictable monthly work, so a smaller buffer is reasonable." },
  { project: "A founder wants a 1,500-word article researched and written, with sources.", hours: 7, rate: 28, buffer: 0.2, rush: 0, usage: 0, note: "Includes research time and one round of edits." },
  { project: "An agency wants a logo and a brand kit delivered in 3 days for a big client launch.", hours: 14, rate: 45, buffer: 0.2, rush: 0.4, usage: 0.15, note: "Tight deadline and the logo will be used commercially." },
  { project: "A school wants a one-hour workshop plus slides on using AI tools safely.", hours: 9, rate: 40, buffer: 0.15, rush: 0, usage: 0, note: "Includes preparation, slides and a short follow-up email." }
];
var SCAMS = [
  { scam: true, why: "A legitimate employer never charges to start work, promises huge pay for no skills, or pushes you to move off the platform.", parts: [
    { t: "Congratulations! You have been selected for a " },
    { t: "$5,000 a week remote job", s: true },
    { t: ". No experience needed. " },
    { t: "Pay a small $200 registration fee", s: true },
    { t: " to begin, and " },
    { t: "message us on Telegram only", s: true },
    { t: "." }
  ] },
  { scam: false, why: "A named person, a real company and a clear next step with no money asked is what a normal recruiter message looks like.", parts: [
    { t: "Hi Amina, I am Sofia from Lumen Studio. We saw your portfolio and have a 3-month design contract. Would you be open to a 20-minute video call this week to discuss scope and rates?" }
  ] },
  { scam: true, why: "Overpayment, then asking you to send the difference back, is a classic fake-cheque scam. The first payment bounces later.", parts: [
    { t: "I will pay you " },
    { t: "$1,800 for your $600 service", s: true },
    { t: ". Just deposit the cheque and " },
    { t: "send the extra $1,200 to my assistant", s: true },
    { t: " by gift card today." }
  ] },
  { scam: true, why: "Urgency, secrecy and asking for passwords are all pressure tactics. Real platforms never ask you to share your login.", parts: [
    { t: "Your freelance account will be " },
    { t: "closed in 24 hours", s: true },
    { t: " unless you " },
    { t: "verify your password here", s: true },
    { t: ": http://free1ancer-secure.co/login" }
  ] },
  { scam: false, why: "The client is paying through the platform, in milestones, with no request for unusual information.", parts: [
    { t: "Thanks for the proposal! I would like to hire you via the platform with two milestones: 50% at the start and 50% on delivery. I have funded the first milestone, so you can begin whenever you are ready." }
  ] },
  { scam: true, why: "Real job offers do not arrive without an application, and none ask you to buy equipment from their supplier first.", parts: [
    { t: "We reviewed your profile and " },
    { t: "you are hired without an interview", s: true },
    { t: ". We will send a cheque for equipment. " },
    { t: "Buy your laptop from our approved vendor", s: true },
    { t: " and we will reimburse you." }
  ] },
  { scam: true, why: 'Guaranteed returns and "secret" methods are the hallmark of pyramid and investment scams.', parts: [
    { t: "Join my private group and " },
    { t: "earn $300 a day guaranteed", s: true },
    { t: " with a " },
    { t: "secret method banks hate", s: true },
    { t: ". Spots are limited. " },
    { t: "Send $99 to unlock", s: true },
    { t: "." }
  ] },
  { scam: false, why: "A real brand deal contract with a stated fee, usage and deadline. You can still negotiate, but nothing here is pressuring or secretive.", parts: [
    { t: "We would like to commission one 30-second video at $450. Usage: 3 months on our social accounts. Draft contract attached; please review and let us know if any changes are needed." }
  ] },
  { scam: true, why: "A payment link that is not from the official payment processor, with a deadline, is a phishing attempt.", parts: [
    { t: "Payment received! " },
    { t: "Click this link within 1 hour", s: true },
    { t: " to " },
    { t: "claim it", s: true },
    { t: ": bit.ly/pay-claim-now. " },
    { t: "Enter your card details", s: true },
    { t: " to confirm identity." }
  ] },
  { scam: false, why: "A normal marketplace message: a clear question, no pressure, and nothing about leaving the platform or sharing sensitive details.", parts: [
    { t: "Hello! Your listing says delivery is 5 days. Could you do 7 if I add a second logo variation? Happy to adjust the price." }
  ] }
];
var GAMES = [
  {
    id: "money-moves",
    title: "Money Moves",
    icon: "\u{1F4B8}",
    tone: "rose",
    rounds: 7,
    blurb: "Make seven money decisions and see what they do to your safety net, growth and calm.",
    how: "Each choice changes three meters. There is rarely one perfect answer, so you are watching the trade-offs. Keep all three above 25 to finish strong.",
    pool: MONEY_MOVES
  },
  {
    id: "red-flag",
    title: "Red Flag Radar",
    icon: "\u{1F6A9}",
    tone: "peach",
    rounds: 12,
    blurb: "Is that client message healthy or a warning sign? Build a streak.",
    how: "Read each message and decide: green flag or red flag. Streaks add bonus points. Healthy messages are in the mix too, so do not flag everything.",
    pool: RED_FLAGS
  },
  {
    id: "skill-match",
    title: "Skill Match",
    icon: "\u{1F9E9}",
    tone: "lilac",
    rounds: 8,
    blurb: "Match each business need with the digital skill that solves it.",
    how: "Read the need, pick the skill that fits best. Explanations tell you what each skill really does.",
    pool: SKILL_MATCH
  },
  {
    id: "inbox-boss",
    title: "Inbox Boss",
    icon: "\u{1F4E5}",
    tone: "pink",
    rounds: 8,
    blurb: "Triage a busy freelancer inbox. Reply, clarify, quote, decline or report.",
    how: "Choose the best way to handle each message. The best action earns 2 points, an acceptable one earns 1.",
    pool: INBOX
  },
  {
    id: "price-this",
    title: "Price This",
    icon: "\u{1F3F7}\uFE0F",
    tone: "blue",
    rounds: 5,
    blurb: "Set a price for real-looking projects and learn the formula behind it.",
    how: "You get the hours and the hourly rate. Then decide on the price, including buffer time, rush fees and usage rights. Within 15% is a bullseye.",
    pool: PRICE_THIS
  },
  {
    id: "spot-scam",
    title: "Spot the Scam",
    icon: "\u{1F575}\uFE0F",
    tone: "gold",
    rounds: 6,
    blurb: "Tap the warning signs in messages, then give your verdict.",
    how: "Tap any phrase that looks suspicious, then choose scam or legit. You score for the right verdict and for finding the real signs without false alarms.",
    pool: SCAMS
  }
];
function dailyPool() {
  const pool = [];
  RED_FLAGS.forEach((r, i) => pool.push({ id: `rf${i}`, game: "Red Flag Radar", prompt: r.text, choices: ["Green flag", "Red flag"], correct: r.flag ? 1 : 0, why: r.why }));
  SKILL_MATCH.forEach((r, i) => pool.push({ id: `sm${i}`, game: "Skill Match", prompt: r.need, choices: r.options, correct: r.answer, why: r.why }));
  SCAMS.forEach((r, i) => pool.push({ id: `sc${i}`, game: "Spot the Scam", prompt: r.parts.map((p) => p.t).join(""), choices: ["Looks legit", "Scam"], correct: r.scam ? 1 : 0, why: r.why }));
  return pool;
}

// data/pg/templates.js
var TEMPLATE_CATEGORIES = ["Freelancing", "Career", "Money", "Content", "Business"];
var TEMPLATES = [
  /* ---------------- FREELANCING ---------------- */
  {
    id: "client-outreach",
    category: "Freelancing",
    type: "text",
    title: "Cold Pitch Message",
    time: "5 min",
    icon: "\u{1F48C}",
    blurb: "A short, specific message to a business you would love to work with.",
    who: "Freelancers who are sending their first outreach messages.",
    tips: ["Name one real thing you noticed about their business.", 'Make one small, specific offer rather than "I can do anything".', "Send ten and expect a few replies. That is normal."],
    fields: [
      { id: "name", label: "Their first name", type: "text", ph: "Sam" },
      { id: "business", label: "Their business", type: "text", ph: "Bloom Studio" },
      { id: "noticed", label: "One real thing you noticed", type: "text", ph: "your recent post about the autumn collection" },
      { id: "problem", label: "One improvement you could help with", type: "text", ph: "turning those posts into a consistent weekly schedule" },
      { id: "offer", label: "Your small offer", type: "text", ph: "a free 3-post sample week" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: "Hi {{name}},\n\nI came across {{business}} and loved {{noticed}}.\n\nI help small businesses with {{problem}}. If it would be useful, I can send {{offer}} so you can see how it would look, with no obligation.\n\nWould that be helpful?\n\nThank you,\n{{you}}"
  },
  {
    id: "proposal",
    category: "Freelancing",
    type: "text",
    title: "Simple Project Proposal",
    time: "10 min",
    icon: "\u{1F4DD}",
    blurb: "One clear page that covers the goal, scope, price, timeline and next step.",
    who: "Anyone about to quote a project for the first time.",
    tips: ["List what is NOT included. That is where most arguments start.", "State revision rounds as a number.", "Always include a payment schedule, and ask for a deposit."],
    fields: [
      { id: "client", label: "Client name", type: "text", ph: "Maya Ltd" },
      { id: "goal", label: "What the client wants to achieve", type: "textarea", ph: "A clear, mobile-friendly website that explains our services and gets bookings." },
      { id: "included", label: "What is included", type: "textarea", ph: "5 pages, contact form, mobile layout, 2 rounds of revisions" },
      { id: "excluded", label: "What is not included", type: "textarea", ph: "Copywriting, photography, hosting" },
      { id: "timeline", label: "Timeline", type: "text", ph: "3 weeks from deposit" },
      { id: "price", label: "Total price", type: "text", ph: "$900" },
      { id: "deposit", label: "Deposit", type: "text", ph: "50% to start, 50% on delivery" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: 'PROJECT PROPOSAL for {{client}}\n\nGoal\n{{goal}}\n\nWhat is included\n{{included}}\n\nWhat is not included\n{{excluded}}\n\nTimeline\n{{timeline}}\n\nInvestment\n{{price}}\nPayment: {{deposit}}\n\nNext step\nReply "approved" and I will send an invoice for the deposit. I will begin as soon as it is paid.\n\n{{you}}'
  },
  {
    id: "client-onboarding",
    category: "Freelancing",
    type: "checklist",
    title: "Client Onboarding Checklist",
    time: "10 min",
    icon: "\u2705",
    blurb: "Everything to set up before you start working, so projects begin smoothly.",
    who: "Freelancers who want to look organised from day one.",
    tips: ["Send it to the client as a welcome message.", "Do not start until the first three items are ticked."],
    items: [
      { group: "Before work begins", text: "Written scope agreed (what is and is not included)" },
      { group: "Before work begins", text: "Deposit invoice sent and paid" },
      { group: "Before work begins", text: "Contract or terms confirmed in writing" },
      { group: "Before work begins", text: "Number of revision rounds stated" },
      { group: "Setup", text: "Main point of contact and preferred channel agreed" },
      { group: "Setup", text: "Access to the files, accounts or brand materials you need" },
      { group: "Setup", text: "Shared folder created and named clearly" },
      { group: "Setup", text: "Feedback process agreed: one person gives consolidated feedback" },
      { group: "Keeping it smooth", text: "Milestone dates added to your calendar" },
      { group: "Keeping it smooth", text: "Approval window stated (for example, 48 hours)" },
      { group: "Finish", text: "Final invoice sent when work is delivered" },
      { group: "Finish", text: "Testimonial and referral requested" }
    ]
  },
  {
    id: "scope-change",
    category: "Freelancing",
    type: "text",
    title: "Scope Change Request",
    time: "4 min",
    icon: "\u{1F9FE}",
    blurb: 'Reply kindly and firmly when "just one more thing" becomes extra work.',
    who: "Anyone dealing with scope creep or a changing brief.",
    tips: ["Say yes to the person and name the extra clearly.", "Give a price and a date so the decision is easy."],
    fields: [
      { id: "name", label: "Client first name", type: "text", ph: "Amara" },
      { id: "request", label: "What they asked for", type: "text", ph: "five extra stories and a reel" },
      { id: "scope", label: "What the agreement covers", type: "text", ph: "12 posts a month" },
      { id: "price", label: "Price for the extra", type: "text", ph: "$120" },
      { id: "date", label: "Delivery date if approved", type: "text", ph: "Friday" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: 'Hi {{name}},\n\nHappy to help with {{request}}! Our current agreement covers {{scope}}, so this would be an add-on.\n\nThe cost would be {{price}} and I could deliver by {{date}}. If you would like to go ahead, reply "approved" and I will get started.\n\nThanks so much,\n{{you}}'
  },
  {
    id: "invoice-chase",
    category: "Freelancing",
    type: "text",
    title: "Payment Reminder (3 stages)",
    time: "4 min",
    icon: "\u{1F4B3}",
    blurb: "Three polite-but-firm follow-ups for late invoices, from gentle to final.",
    who: "Freelancers whose invoices are overdue.",
    tips: ["Send the first reminder the day after it is due.", "Always attach the invoice again.", "Keep a record of every message."],
    fields: [
      { id: "name", label: "Client first name", type: "text", ph: "Priya" },
      { id: "number", label: "Invoice number", type: "text", ph: "2024-017" },
      { id: "amount", label: "Amount", type: "text", ph: "$450" },
      { id: "due", label: "Original due date", type: "text", ph: "14 March" },
      { id: "newdate", label: "New payment date you are asking for", type: "text", ph: "Friday 29 March" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: "STAGE 1: friendly reminder\nHi {{name}}, a quick reminder that invoice {{number}} for {{amount}} was due on {{due}}. I have attached it again. Could you let me know when I can expect payment? Thanks so much, {{you}}\n\nSTAGE 2: firm follow-up (7 days later)\nHi {{name}}, I am following up on invoice {{number}} ({{amount}}), now overdue since {{due}}. Please arrange payment by {{newdate}}. If something is holding it up, let me know and we can talk about options. {{you}}\n\nSTAGE 3: final notice\nHi {{name}}, this is a final reminder that invoice {{number}} for {{amount}} remains unpaid. Please pay by {{newdate}}. After that date I will need to pause further work and consider the next steps set out in our agreement. {{you}}"
  },
  {
    id: "rate-increase",
    category: "Freelancing",
    type: "text",
    title: "Rate Increase Email",
    time: "4 min",
    icon: "\u{1F4C8}",
    blurb: "Raise your price without grovelling. Warm, plain and confident.",
    who: "Anyone with long-term clients who has not raised prices in a while.",
    tips: ["Give 30 days notice.", "Do not apologise for the number.", "Offer a reduced-scope option if budget is tight."],
    fields: [
      { id: "name", label: "Client first name", type: "text", ph: "Dana" },
      { id: "duration", label: "How long you have worked together", type: "text", ph: "two years" },
      { id: "newrate", label: "New rate", type: "text", ph: "$1,200 a month" },
      { id: "date", label: "Effective date", type: "text", ph: "1 June" },
      { id: "reason", label: "Short reason (optional)", type: "text", ph: "the expanded scope and my current experience" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: "Hi {{name}},\n\nI have really enjoyed working together over the last {{duration}}, and I am grateful for your trust.\n\nFrom {{date}}, my rate will be {{newrate}}, reflecting {{reason}}. I am happy to talk it through if useful, and I will keep delivering the same quality and care.\n\nThank you,\n{{you}}"
  },
  {
    id: "testimonial-request",
    category: "Freelancing",
    type: "text",
    title: "Testimonial Request",
    time: "3 min",
    icon: "\u2B50",
    blurb: "Ask for a testimonial in a way that makes it easy to say yes.",
    who: "Freelancers who have just finished a project.",
    tips: ["Ask right after a happy moment.", "Give two or three prompts so they know what to write."],
    fields: [
      { id: "name", label: "Client first name", type: "text", ph: "Marcus" },
      { id: "project", label: "The project", type: "text", ph: "your new website" },
      { id: "you", label: "Your name", type: "text", ph: "Your name" }
    ],
    body: "Hi {{name}},\n\nIt was a pleasure working on {{project}}. If you are happy with the result, would you be willing to share a short testimonial? Even two or three sentences would be wonderful.\n\nIf it helps, you could mention:\n- What problem you were facing before we worked together\n- What it was like working with me\n- The result or change you have noticed\n\nThank you so much,\n{{you}}"
  },
  {
    id: "discovery-questions",
    category: "Freelancing",
    type: "checklist",
    title: "Discovery Call Questions",
    time: "5 min",
    icon: "\u2753",
    blurb: "Questions to ask a new client so you scope and price properly.",
    who: "Anyone preparing for a first client call.",
    tips: ["Tick off the questions as you get answers.", "Write answers beneath each question in your notes."],
    items: [
      { group: "Goal", text: "What is the main outcome you want from this project?" },
      { group: "Goal", text: "How will you know it has been a success?" },
      { group: "Scope", text: "What exactly would you like delivered?" },
      { group: "Scope", text: "What is not part of this project?" },
      { group: "Practical", text: "Who is the decision-maker and who gives feedback?" },
      { group: "Practical", text: "What is your ideal timeline and is it flexible?" },
      { group: "Practical", text: "Do you have materials (brand, logo, copy) ready?" },
      { group: "Money", text: "Do you have a budget in mind?" },
      { group: "Money", text: "How and when would you like to pay?" }
    ]
  },
  {
    id: "scope-checklist",
    category: "Freelancing",
    type: "checklist",
    title: "Scope of Work Checklist",
    time: "6 min",
    icon: "\u{1F4CF}",
    blurb: 'Check you have covered everything before you say "yes" to a project.',
    who: "Anyone writing a proposal or contract.",
    tips: ["If you cannot tick it, ask the client.", "Use it as the structure for your proposal."],
    items: [
      { group: "What", text: "Deliverables listed one by one" },
      { group: "What", text: "Number of revision rounds stated" },
      { group: "What", text: "What is not included written down" },
      { group: "When", text: "Start date and delivery date agreed" },
      { group: "When", text: "Client turnaround time for feedback agreed" },
      { group: "Money", text: "Price and what it covers" },
      { group: "Money", text: "Deposit and payment schedule" },
      { group: "Money", text: "Late fee or stop-work wording" },
      { group: "Rights", text: "Who owns the final work, and when" },
      { group: "Rights", text: "Permission to show it in your portfolio" }
    ]
  },
  {
    id: "portfolio-case-study",
    category: "Freelancing",
    type: "worksheet",
    title: "Portfolio Case Study Outline",
    time: "15 min",
    icon: "\u{1F5BC}\uFE0F",
    blurb: "Turn a project (even a practice one) into a case study that sells your skills.",
    who: "Beginners with no paid work yet.",
    tips: ["A practice project is a legitimate case study if you label it honestly.", "Show your thinking, not just the final result."],
    sections: [
      { title: "The situation", fields: [
        { id: "client", label: "Who was it for?", type: "text", ph: "A local bakery (practice project)" },
        { id: "problem", label: "What problem needed solving?", type: "textarea", ph: "Their Instagram looked inconsistent and did not show their prices." }
      ] },
      { title: "Your approach", fields: [
        { id: "approach", label: "What did you do, and why?", type: "textarea", ph: "I audited the feed, chose three consistent templates, and wrote a style guide." },
        { id: "tools", label: "Tools you used", type: "text", ph: "Canva, Google Docs" }
      ] },
      { title: "The result", fields: [
        { id: "result", label: "What changed (numbers if you have them)?", type: "textarea", ph: "A consistent 9-post grid and a one-page guide the owner can reuse." },
        { id: "lesson", label: "What would you do differently?", type: "textarea", ph: "I would test two caption styles to see which brings more saves." }
      ] }
    ]
  },
  /* ---------------- CAREER ---------------- */
  {
    id: "job-tracker",
    category: "Career",
    type: "tracker",
    title: "Job Application Tracker",
    time: "ongoing",
    icon: "\u{1F4CB}",
    blurb: "Keep every application, its status and your follow-up dates in one place.",
    who: "Anyone applying for several jobs at once.",
    tips: ["Add a row the same day you apply.", "Follow up 5 to 7 working days after applying."],
    columns: [
      { id: "company", label: "Company", type: "text" },
      { id: "role", label: "Role", type: "text" },
      { id: "applied", label: "Applied on", type: "date" },
      { id: "status", label: "Status", type: "select", options: ["Planning", "Applied", "Interview", "Offer", "Rejected"] },
      { id: "follow", label: "Follow up on", type: "date" },
      { id: "notes", label: "Notes", type: "text" }
    ],
    seedRows: 3
  },
  {
    id: "resume-bullets",
    category: "Career",
    type: "worksheet",
    title: "Resume Bullet Rewriter",
    time: "15 min",
    icon: "\u{1F4C4}",
    blurb: "Turn duties into results using the action + what + outcome formula.",
    who: "Anyone rewriting a CV or resume.",
    tips: ["Start with a strong verb.", "Add a number whenever you honestly can.", "Never exaggerate. Interviewers will ask about it."],
    sections: [
      { title: "Bullet 1", fields: [
        { id: "a1", label: "Action (what did you do?)", type: "text", ph: "Organised" },
        { id: "w1", label: "What / for whom", type: "text", ph: "a weekly schedule for a 6-person team" },
        { id: "o1", label: "Outcome (result, number)", type: "text", ph: "cutting missed handovers by half" }
      ] },
      { title: "Bullet 2", fields: [
        { id: "a2", label: "Action", type: "text", ph: "Handled" },
        { id: "w2", label: "What / for whom", type: "text", ph: "40+ customer emails a day" },
        { id: "o2", label: "Outcome", type: "text", ph: "with a 95% positive rating" }
      ] },
      { title: "Bullet 3", fields: [
        { id: "a3", label: "Action", type: "text", ph: "" },
        { id: "w3", label: "What / for whom", type: "text", ph: "" },
        { id: "o3", label: "Outcome", type: "text", ph: "" }
      ] }
    ],
    format: "bullets"
  },
  {
    id: "salary-script",
    category: "Career",
    type: "text",
    title: "Salary Negotiation Script",
    time: "8 min",
    icon: "\u{1F4AC}",
    blurb: "Words for asking for more, whether it is a new offer or your annual review.",
    who: "Anyone preparing to negotiate pay.",
    tips: ["Practise out loud once.", "Anchor with a number, not a feeling.", "After you ask, stop talking and let them respond."],
    fields: [
      { id: "role", label: "Your role", type: "text", ph: "Marketing coordinator" },
      { id: "number", label: "The number you are asking for", type: "text", ph: "$58,000" },
      { id: "proof1", label: "Your first proof point", type: "text", ph: "I took over the newsletter and grew the open rate from 22% to 38%" },
      { id: "proof2", label: "Your second proof point", type: "text", ph: "I trained two new team members" },
      { id: "market", label: "Market evidence", type: "text", ph: "similar roles in our area are advertised between $55,000 and $62,000" }
    ],
    body: "Thank you for the time today. I am really excited about the role of {{role}}.\n\nBased on my experience and what I would bring, I am looking for {{number}}.\n\nA few reasons: {{proof1}}, and {{proof2}}. I have also looked at the market, and {{market}}.\n\nIs there flexibility to get to that number?\n\n(Then pause and let them answer.)"
  },
  {
    id: "interview-prep",
    category: "Career",
    type: "worksheet",
    title: "Interview Prep Worksheet",
    time: "20 min",
    icon: "\u{1F3A4}",
    blurb: "Prepare three stories that answer most interview questions.",
    who: "Anyone with an interview coming up.",
    tips: ["Use the STAR structure: Situation, Task, Action, Result.", "Keep each story under two minutes."],
    sections: [
      { title: "Story 1: a time you solved a problem", fields: [
        { id: "s1", label: "Situation and task", type: "textarea", ph: "" },
        { id: "a1", label: "Action you took", type: "textarea", ph: "" },
        { id: "r1", label: "Result", type: "textarea", ph: "" }
      ] },
      { title: "Story 2: a time you worked with others", fields: [
        { id: "s2", label: "Situation and task", type: "textarea", ph: "" },
        { id: "a2", label: "Action you took", type: "textarea", ph: "" },
        { id: "r2", label: "Result", type: "textarea", ph: "" }
      ] },
      { title: "Your questions for them", fields: [
        { id: "q1", label: "Question about the role", type: "text", ph: "What does success look like in the first 90 days?" },
        { id: "q2", label: "Question about the team", type: "text", ph: "How does the team handle feedback?" }
      ] }
    ]
  },
  {
    id: "linkedin-checklist",
    category: "Career",
    type: "checklist",
    title: "LinkedIn Profile Checklist",
    time: "15 min",
    icon: "\u{1F517}",
    blurb: "A quick audit to make your profile clear and findable.",
    who: "Anyone job hunting or finding freelance work.",
    tips: ["Fix the headline first. It shows everywhere."],
    items: [
      { group: "Top of profile", text: "Clear, friendly photo" },
      { group: "Top of profile", text: "Headline says what you do and who you help" },
      { group: "Top of profile", text: "Custom profile link" },
      { group: "About", text: "First two lines explain your value" },
      { group: "About", text: "A clear call to action (how to contact you)" },
      { group: "Experience", text: "Each role has 2 to 3 results-based bullets" },
      { group: "Experience", text: "Skills section updated with the 10 skills you want to be found for" },
      { group: "Proof", text: "At least 2 recommendations or testimonials" },
      { group: "Proof", text: "Featured section with your best work" }
    ]
  },
  /* ---------------- MONEY ---------------- */
  {
    id: "income-tracker",
    category: "Money",
    type: "tracker",
    title: "Income & Expense Tracker",
    time: "ongoing",
    icon: "\u{1F4B0}",
    blurb: "Log money in and money out, and see your totals instantly.",
    who: "Anyone with side income or a small business.",
    tips: ["Log it the day it happens.", "Check the profit line monthly."],
    columns: [
      { id: "date", label: "Date", type: "date" },
      { id: "what", label: "What", type: "text" },
      { id: "type", label: "Type", type: "select", options: ["Income", "Expense"] },
      { id: "amount", label: "Amount", type: "number" }
    ],
    seedRows: 4,
    totals: { by: "type", amount: "amount", plus: "Income", minus: "Expense" }
  },
  {
    id: "monthly-money-check",
    category: "Money",
    type: "worksheet",
    title: "Monthly Money Check-in",
    time: "15 min",
    icon: "\u{1F5D3}\uFE0F",
    blurb: "Fifteen minutes each month to see what happened and what to do next.",
    who: "Anyone who wants a simple money habit.",
    tips: ["Do it on the same day each month.", "Keep it kind. The aim is clarity, not guilt."],
    sections: [
      { title: "The numbers", fields: [
        { id: "in", label: "Money in this month", type: "number", ph: "" },
        { id: "out", label: "Money out this month", type: "number", ph: "" },
        { id: "saved", label: "Money saved", type: "number", ph: "" }
      ] },
      { title: "The reflection", fields: [
        { id: "win", label: "One money win", type: "textarea", ph: "" },
        { id: "leak", label: "One place money leaked", type: "textarea", ph: "" },
        { id: "next", label: "One change for next month", type: "textarea", ph: "" }
      ] }
    ]
  },
  {
    id: "goal-planner",
    category: "Money",
    type: "worksheet",
    title: "90-Day Money Goal Planner",
    time: "15 min",
    icon: "\u{1F3AF}",
    blurb: "Turn a money goal into a number per month and a first step.",
    who: "Anyone with a savings or income goal.",
    tips: ["Choose a goal that is specific and has a date.", "Make the first step small enough for this week."],
    sections: [
      { title: "The goal", fields: [
        { id: "goal", label: "What is the goal?", type: "text", ph: "Save an emergency fund" },
        { id: "target", label: "Target amount", type: "number", ph: "900" },
        { id: "have", label: "Already saved or earned", type: "number", ph: "150" }
      ] },
      { title: "The plan", fields: [
        { id: "first", label: "First small step this week", type: "text", ph: "Open a separate savings pot" },
        { id: "block", label: "Biggest obstacle", type: "textarea", ph: "" },
        { id: "help", label: "Who or what could help", type: "textarea", ph: "" }
      ] }
    ],
    calc: "goal-90"
  },
  /* ---------------- CONTENT ---------------- */
  {
    id: "content-calendar",
    category: "Content",
    type: "tracker",
    title: "30-Day Content Planner",
    time: "ongoing",
    icon: "\u{1F4C6}",
    blurb: "Plan a month of posts with a topic, format and status for each day.",
    who: "Creators and freelancers who want to post consistently.",
    tips: ["Batch your content on one day per week.", "Repeat what worked."],
    columns: [
      { id: "day", label: "Day", type: "number" },
      { id: "topic", label: "Topic", type: "text" },
      { id: "format", label: "Format", type: "select", options: ["Reel", "Carousel", "Story", "Post", "Blog", "Video"] },
      { id: "status", label: "Status", type: "select", options: ["Idea", "Drafted", "Scheduled", "Posted"] }
    ],
    seedRows: 7
  },
  /* ---------------- BUSINESS ---------------- */
  {
    id: "offer-builder",
    category: "Business",
    type: "worksheet",
    title: "Offer Builder",
    time: "15 min",
    icon: "\u{1F381}",
    blurb: "Turn a skill into a clear offer people understand and can buy.",
    who: "Anyone about to sell a service or product for the first time.",
    tips: ["An offer names who it is for and the outcome, not just the activity."],
    sections: [
      { title: "Who and what", fields: [
        { id: "who", label: "Who do you help?", type: "text", ph: "Small bakeries" },
        { id: "problem", label: "What problem do they have?", type: "text", ph: "They post inconsistently and lose customers" },
        { id: "outcome", label: "What outcome do you create?", type: "text", ph: "A month of ready-to-post content in 3 days" }
      ] },
      { title: "How", fields: [
        { id: "includes", label: "What is included?", type: "textarea", ph: "12 posts, captions, a posting schedule" },
        { id: "price", label: "Price", type: "text", ph: "$250" },
        { id: "proof", label: "Proof you can do it", type: "text", ph: "Case study: Sunrise Caf\xE9" }
      ] }
    ],
    format: "offer"
  },
  {
    id: "business-idea-worksheet",
    category: "Business",
    type: "worksheet",
    title: "Business Idea Check",
    time: "12 min",
    icon: "\u{1F4A1}",
    blurb: "Pressure-test an idea before you spend time or money on it.",
    who: "Anyone with a business idea they are not sure about.",
    tips: ["If you cannot name ten potential customers, find them first.", "Look for people who have already paid for something similar."],
    sections: [
      { title: "The idea", fields: [
        { id: "idea", label: "What is the idea in one sentence?", type: "text", ph: "" },
        { id: "who", label: "Who exactly is it for?", type: "text", ph: "" },
        { id: "pain", label: "What problem does it solve, and how do they solve it now?", type: "textarea", ph: "" }
      ] },
      { title: "The test", fields: [
        { id: "ten", label: "Name three real people who might buy", type: "textarea", ph: "" },
        { id: "cheap", label: "Cheapest way to test it this week", type: "text", ph: "" },
        { id: "success", label: "What result would tell you to continue?", type: "text", ph: "" }
      ] }
    ]
  },
  {
    id: "customer-research",
    category: "Business",
    type: "worksheet",
    title: "Customer Interview Worksheet",
    time: "15 min",
    icon: "\u{1F5E3}\uFE0F",
    blurb: "Questions that uncover what people really want, without leading them.",
    who: "Anyone testing a service or product idea.",
    tips: ['Ask about the past, not the future. "Last time you tried X, what happened?"', "Listen far more than you talk."],
    sections: [
      { title: "Before the call", fields: [
        { id: "person", label: "Who are you speaking with?", type: "text", ph: "" },
        { id: "learn", label: "What do you most want to learn?", type: "textarea", ph: "" }
      ] },
      { title: "During the call", fields: [
        { id: "last", label: "What happened the last time they faced this problem?", type: "textarea", ph: "" },
        { id: "tried", label: "What have they already tried or paid for?", type: "textarea", ph: "" },
        { id: "words", label: "Exact words they used (copy them!)", type: "textarea", ph: "" }
      ] }
    ]
  }
];

// data/pg/glossary.js
var GLOSSARY_CATEGORIES = ["Digital Business", "Marketing", "Freelancing", "Creator Economy", "Website / Tech", "Money", "Career", "AI", "Digital Safety"];
var GLOSSARY = [
  {
    "term": "Digital Product",
    "category": "Digital Business",
    "def": "A product that exists only in digital form and is delivered electronically.",
    "girlie": "Something you make once and sell over and over \u2014 like an ebook, template, or course.",
    "example": "A $19 Notion template for meal planning.",
    "why": "Digital products can earn income without ongoing physical inventory.",
    "related": ["Offer", "Niche"],
    "learn": [{
      "label": "How to Create and Sell a Digital Product",
      "id": "how-to-create-and-sell-a-digital-product"
    }]
  },
  {
    "term": "Online Business",
    "category": "Digital Business",
    "def": "A business that operates primarily or entirely over the internet.",
    "girlie": "A business you can run from your laptop, wherever you are.",
    "example": "A freelance design business run entirely through email and video calls.",
    "why": "Lower overhead and location flexibility compared to many traditional businesses.",
    "related": ["Digital Product", "Business Model"],
    "learn": [{
      "label": "Build Your Online Empire",
      "id": "build-your-online-empire"
    }]
  },
  {
    "term": "Business Model",
    "category": "Digital Business",
    "def": "The core plan for how a business creates and captures value.",
    "girlie": "The basic explanation of how your business actually makes money.",
    "example": "A subscription model where customers pay monthly for ongoing access.",
    "why": "Clarifying this early prevents building something with no real path to income.",
    "related": ["Offer", "Online Business"],
    "learn": []
  },
  {
    "term": "Offer",
    "category": "Digital Business",
    "def": "The specific product or service a business sells, along with its terms.",
    "girlie": "What you\u2019re actually selling, spelled out clearly enough that someone could say yes to it.",
    "example": '"$150 for a 5-page website, delivered in 2 weeks."',
    "why": "A vague idea isn\u2019t sellable \u2014 a specific offer is.",
    "related": ["Niche", "Target Audience"],
    "learn": [{
      "label": "Offer Builder template",
      "href": "/pages/templates.html#offer-builder"
    }]
  },
  {
    "term": "Niche",
    "category": "Digital Business",
    "def": "A specific, focused segment of a market.",
    "girlie": 'Your specific lane \u2014 not "marketing," but "email marketing for small bakeries."',
    "example": "A copywriter who only writes for wellness coaches.",
    "why": "Specificity tends to attract better-fit clients and referrals than being generic.",
    "related": ["Target Audience", "Offer"],
    "learn": [{
      "label": "Personal Branding for Beginners",
      "id": "personal-branding-for-beginners"
    }]
  },
  {
    "term": "Target Audience",
    "category": "Digital Business",
    "def": "The specific group of people a product or message is designed for.",
    "girlie": "The exact person you\u2019re talking to when you make or market something.",
    "example": "New freelancers in their first year of business.",
    "why": 'Speaking to a specific audience is more effective than speaking to "everyone."',
    "related": ["Niche", "Customer Persona"],
    "learn": []
  },
  {
    "term": "Customer Persona",
    "category": "Digital Business",
    "def": "A semi-fictional profile representing your ideal customer.",
    "girlie": "A sketch of your dream customer \u2014 their situation, frustrations, and goals.",
    "example": '"Amara, 27, new freelancer, overwhelmed by pricing her services."',
    "why": "Makes marketing and product decisions more concrete and less guesswork-based.",
    "related": ["Target Audience"],
    "learn": [{
      "label": "Customer Research Worksheet",
      "href": "/pages/templates.html#customer-research"
    }]
  },
  {
    "term": "Lead Magnet",
    "category": "Digital Business",
    "def": "A free resource offered in exchange for someone\u2019s contact information.",
    "girlie": "A free freebie that gets someone onto your email list.",
    "example": "A free checklist offered in exchange for an email address.",
    "why": "Builds an audience you can reach directly, outside of social media algorithms.",
    "related": ["Sales Funnel", "Email Marketing"],
    "learn": []
  },
  {
    "term": "Sales Funnel",
    "category": "Digital Business",
    "def": "The path a potential customer travels from first hearing about you to buying.",
    "girlie": 'The journey from "never heard of you" to "just bought your thing."',
    "example": "Social post \u2192 free guide \u2192 email sequence \u2192 paid offer.",
    "why": "Understanding the path helps you see where potential customers are dropping off.",
    "related": ["Lead Magnet", "Conversion Rate"],
    "learn": []
  },
  {
    "term": "SEO",
    "category": "Marketing",
    "def": "Search Engine Optimization \u2014 improving content so it ranks higher in search results.",
    "girlie": "Making sure Google actually shows your stuff when people search for it.",
    "example": 'Using the phrase "freelance rate calculator" naturally throughout a relevant page.',
    "why": "Good SEO brings in visitors without paying for ads.",
    "related": ["SEM", "Content Marketing"],
    "learn": [{
      "label": "Digital Skills for Beginners",
      "id": "digital-skills-for-beginners"
    }]
  },
  {
    "term": "SEM",
    "category": "Marketing",
    "def": "Search Engine Marketing \u2014 paid advertising that appears in search results.",
    "girlie": "Paying to show up at the top of search results instead of earning it organically.",
    "example": "A sponsored listing above the regular Google search results.",
    "why": "Can bring faster visibility than SEO, at a direct cost per click.",
    "related": ["SEO"],
    "learn": []
  },
  {
    "term": "CTA",
    "category": "Marketing",
    "def": "Call To Action \u2014 the specific next step you want someone to take.",
    "girlie": 'The "now click this" moment at the end of a post, email, or page.',
    "example": '"Download the free checklist" button.',
    "why": "Without a clear CTA, people often just... leave.",
    "related": ["Conversion Rate"],
    "learn": []
  },
  {
    "term": "Conversion Rate",
    "category": "Marketing",
    "def": "The percentage of people who take a desired action out of everyone who saw the opportunity.",
    "girlie": "Out of everyone who saw your offer, how many actually said yes.",
    "example": "100 visitors, 5 purchases = a 5% conversion rate.",
    "why": "Tells you how effective your offer and messaging actually are, not just how much traffic you get.",
    "related": ["CTA", "Sales Funnel"],
    "learn": []
  },
  {
    "term": "Engagement Rate",
    "category": "Marketing",
    "def": "A measure of how much an audience interacts with content, relative to its reach.",
    "girlie": "How much people actually like, comment, and share \u2014 not just scroll past.",
    "example": "A post with high comments relative to views has strong engagement.",
    "why": "Often matters more to algorithms and real influence than raw follower count.",
    "related": [],
    "learn": []
  },
  {
    "term": "Email Marketing",
    "category": "Marketing",
    "def": "Marketing directly to people through email.",
    "girlie": "Talking to your audience in their inbox instead of hoping they see your post.",
    "example": "A weekly newsletter with tips and an occasional offer.",
    "why": "You own your email list \u2014 unlike a social platform, it can\u2019t change the rules on you overnight.",
    "related": ["Lead Magnet"],
    "learn": []
  },
  {
    "term": "Content Marketing",
    "category": "Marketing",
    "def": "Attracting and keeping an audience by consistently creating valuable content.",
    "girlie": "Teaching or entertaining people for free until they trust you enough to buy.",
    "example": "A series of free how-to videos related to a paid course.",
    "why": "Builds trust and visibility before ever asking for a sale.",
    "related": ["SEO"],
    "learn": []
  },
  {
    "term": "Affiliate Marketing",
    "category": "Marketing",
    "def": "Earning a commission by promoting someone else\u2019s product.",
    "girlie": "You recommend something, someone buys through your link, you get a cut.",
    "example": "A blog post recommending tools, each with a tracked affiliate link.",
    "why": "A way to earn income without creating your own product.",
    "related": ["Affiliate Link"],
    "learn": []
  },
  {
    "term": "Social Media Marketing",
    "category": "Marketing",
    "def": "Using social platforms to promote a brand, product, or service.",
    "girlie": "Using Instagram, TikTok, etc. on purpose to grow a business, not just for fun.",
    "example": "A consistent content calendar built around specific content pillars.",
    "why": "Meets audiences where they already spend time.",
    "related": ["Content Marketing"],
    "learn": [{
      "label": "Instagram Pays Too, Sis",
      "id": "instagram-pays-too-sis"
    }]
  },
  {
    "term": "Freelancer",
    "category": "Freelancing",
    "def": "Someone who works independently, offering services to multiple clients rather than one employer.",
    "girlie": "You\u2019re your own boss, working with clients instead of one employer.",
    "example": "A freelance graphic designer working with 4 different small businesses.",
    "why": "Offers flexibility and control, along with the responsibility of finding your own clients.",
    "related": ["Scope of Work", "Client Acquisition"],
    "learn": [{
      "label": "How to Get Your First Freelance Client",
      "id": "how-to-get-your-first-freelance-client"
    }]
  },
  {
    "term": "Retainer",
    "category": "Freelancing",
    "def": "An ongoing arrangement where a client pays a set fee regularly for continued access to your work.",
    "girlie": "Instead of one project, the client pays you monthly for ongoing help.",
    "example": "$500/month for 10 hours of social media management.",
    "why": "Creates predictable, recurring income instead of constantly chasing new projects.",
    "related": ["Scope of Work"],
    "learn": []
  },
  {
    "term": "Scope of Work",
    "category": "Freelancing",
    "def": "A detailed description of exactly what a project includes.",
    "girlie": "The written line in the sand for what you\u2019re actually agreeing to do.",
    "example": '"3 blog posts, 800 words each, 1 round of revisions."',
    "why": "The single biggest protection against scope creep and disputes.",
    "related": ["Proposal", "Revision"],
    "learn": [{
      "label": "Scope of Work Checklist",
      "href": "/pages/templates.html#scope-checklist"
    }]
  },
  {
    "term": "Proposal",
    "category": "Freelancing",
    "def": "A document outlining a project\u2019s scope, timeline, and price, sent to a potential client.",
    "girlie": "Your pitch, in writing, for exactly what you\u2019d do and what it costs.",
    "example": "A one-page PDF outlining a website redesign project.",
    "why": "Sets clear expectations before any work or money changes hands.",
    "related": ["Scope of Work"],
    "learn": [{
      "label": "Freelance Proposal Structure",
      "href": "/pages/templates.html#proposal"
    }]
  },
  {
    "term": "Invoice",
    "category": "Freelancing",
    "def": "A formal request for payment for completed work.",
    "girlie": 'The official "please pay me now" document.',
    "example": "Invoice #004, due in 7 days, sent via email.",
    "why": "A professional record protects both you and the client.",
    "related": ["Deposit", "Milestone"],
    "learn": [{
      "label": "How to Get Paid as a Freelancer",
      "id": "how-to-get-paid-as-a-freelancer"
    }]
  },
  {
    "term": "Deposit",
    "category": "Freelancing",
    "def": "An upfront partial payment made before work begins.",
    "girlie": 'The "I\u2019m serious" payment a client makes before you start.',
    "example": "A 50% deposit due before the project timeline starts.",
    "why": "Protects your time investment and filters out non-serious inquiries.",
    "related": ["Invoice", "Milestone"],
    "learn": []
  },
  {
    "term": "Milestone",
    "category": "Freelancing",
    "def": "A specific checkpoint in a project, often tied to a partial payment.",
    "girlie": 'A "we\u2019re halfway there" moment, usually with a payment attached.',
    "example": "Payment released after the first draft is approved.",
    "why": "Breaks risk into smaller, safer chunks for both sides.",
    "related": ["Deposit"],
    "learn": []
  },
  {
    "term": "Revision",
    "category": "Freelancing",
    "def": "A requested change to completed work.",
    "girlie": 'A "can you tweak this" request after you\u2019ve delivered something.',
    "example": '"2 rounds of revisions included" in a proposal.',
    "why": "Setting a limit upfront prevents endless, unpaid back-and-forth.",
    "related": ["Scope of Work"],
    "learn": []
  },
  {
    "term": "Client Acquisition",
    "category": "Freelancing",
    "def": "The process of finding and winning new clients.",
    "girlie": 'How you actually go from "no clients" to "paying clients."',
    "example": "Cold outreach, referrals, and a visible portfolio combined.",
    "why": "The skill that keeps a freelance business fed with work.",
    "related": ["Freelancer"],
    "learn": [{
      "label": "How to Get Your First Freelance Client",
      "id": "how-to-get-your-first-freelance-client"
    }]
  },
  {
    "term": "UGC",
    "category": "Creator Economy",
    "def": "User-Generated Content \u2014 content created by everyday people rather than a brand itself.",
    "girlie": "Real-feeling content made by a normal person, not a polished brand ad.",
    "example": 'A short "review" video made for a brand to use in their own ads.',
    "why": "Feels more authentic to audiences than traditional advertising, and can be a paid service.",
    "related": ["Content Creator", "Brand Deal"],
    "learn": []
  },
  {
    "term": "Content Creator",
    "category": "Creator Economy",
    "def": "Someone who produces content, often across social platforms, as their main or side work.",
    "girlie": "Someone who makes the internet stuff you actually enjoy watching.",
    "example": "A creator posting daily short-form videos in a specific niche.",
    "why": "A legitimate career path with multiple monetization routes.",
    "related": ["Influencer", "Monetization"],
    "learn": [{
      "label": "The Soft Girl\u2019s Guide to Becoming a Full-Time YouTube Creator",
      "id": "soft-girl-youtube-creator"
    }]
  },
  {
    "term": "Influencer",
    "category": "Creator Economy",
    "def": "A content creator with an audience large or engaged enough to influence purchasing decisions.",
    "girlie": "A creator brands pay because their audience actually listens to them.",
    "example": "A beauty influencer partnering with a skincare brand.",
    "why": "Reach and trust with an audience are what brands are actually paying for.",
    "related": ["Brand Deal", "Sponsorship"],
    "learn": []
  },
  {
    "term": "Brand Deal",
    "category": "Creator Economy",
    "def": "A paid partnership between a creator and a brand.",
    "girlie": "Getting paid to feature or talk about a brand\u2019s product.",
    "example": "A sponsored post featuring a specific product, disclosed as an ad.",
    "why": "A major income source for many creators.",
    "related": ["Sponsorship"],
    "learn": []
  },
  {
    "term": "Sponsorship",
    "category": "Creator Economy",
    "def": "Financial support from a brand in exchange for promotion or association.",
    "girlie": "A brand backing your content in exchange for exposure to your audience.",
    "example": "A brand sponsoring a video in exchange for a mention.",
    "why": "Similar to a brand deal, often used interchangeably.",
    "related": ["Brand Deal"],
    "learn": []
  },
  {
    "term": "Affiliate Link",
    "category": "Creator Economy",
    "def": "A trackable link that earns a commission when someone makes a purchase through it.",
    "girlie": 'Your special link that tells a company "this sale came from me."',
    "example": 'A "shop my favorites" link in a creator\u2019s bio.',
    "why": "Lets creators earn from recommending products they already use.",
    "related": ["Affiliate Marketing"],
    "learn": []
  },
  {
    "term": "Monetization",
    "category": "Creator Economy",
    "def": "The process of turning an audience, skill, or platform into income.",
    "girlie": "Turning your following, skill, or content into actual money.",
    "example": "Ad revenue, brand deals, and digital products together.",
    "why": "The overall goal for most creators building a sustainable income.",
    "related": ["Content Creator"],
    "learn": []
  },
  {
    "term": "Domain",
    "category": "Website / Tech",
    "def": "The address people type to find a website (e.g., herdigitalplaybook.com).",
    "girlie": "Your website\u2019s actual name on the internet.",
    "example": "herdigitalplaybook.com",
    "why": "A key part of a professional online presence.",
    "related": ["Hosting", "Website"],
    "learn": []
  },
  {
    "term": "Hosting",
    "category": "Website / Tech",
    "def": "The service that stores a website\u2019s files and makes it accessible online.",
    "girlie": "The storage space that keeps your website actually live on the internet.",
    "example": "Vercel hosting a static website.",
    "why": "Without hosting, a domain has nowhere to actually point.",
    "related": ["Domain"],
    "learn": []
  },
  {
    "term": "Website",
    "category": "Website / Tech",
    "def": "A collection of linked web pages accessible via a single domain.",
    "girlie": "Your actual online home base.",
    "example": "A 5-page portfolio site.",
    "why": "Gives you a professional presence you fully control, unlike a social profile.",
    "related": ["Domain", "Landing Page"],
    "learn": []
  },
  {
    "term": "Landing Page",
    "category": "Website / Tech",
    "def": "A single, focused web page designed to drive one specific action.",
    "girlie": "A one-job page \u2014 usually to get a sale or an email signup.",
    "example": "A page built only to sell one digital product.",
    "why": "Focus tends to convert better than a busy, multi-purpose page.",
    "related": ["CTA", "Conversion Rate"],
    "learn": []
  },
  {
    "term": "CMS",
    "category": "Website / Tech",
    "def": "Content Management System \u2014 software used to create and manage website content without coding.",
    "girlie": "A tool that lets you update your website without touching code.",
    "example": "WordPress or Webflow.",
    "why": "Makes ongoing website updates accessible to non-developers.",
    "related": ["Website"],
    "learn": []
  },
  {
    "term": "HTML",
    "category": "Website / Tech",
    "def": "HyperText Markup Language \u2014 the structural code that builds web pages.",
    "girlie": 'The skeleton of every webpage \u2014 the "what goes where."',
    "example": "A heading tag marking the title of a page.",
    "why": "The foundational building block of the entire web.",
    "related": ["CSS", "JavaScript"],
    "learn": [{
      "label": "Digital Skills for Beginners",
      "id": "digital-skills-for-beginners"
    }]
  },
  {
    "term": "CSS",
    "category": "Website / Tech",
    "def": "Cascading Style Sheets \u2014 the code that styles how a webpage looks.",
    "girlie": "What makes a webpage look pretty instead of plain black text.",
    "example": "Code that sets a button\u2019s color to pink.",
    "why": "Separates a page\u2019s structure from its visual design.",
    "related": ["HTML"],
    "learn": []
  },
  {
    "term": "JavaScript",
    "category": "Website / Tech",
    "def": "A programming language that adds interactivity and logic to web pages.",
    "girlie": "What makes a website actually do things, not just sit there.",
    "example": "Code that makes a quiz calculate and show your result.",
    "why": "Powers nearly every interactive feature on the modern web.",
    "related": ["HTML", "CSS"],
    "learn": []
  },
  {
    "term": "API",
    "category": "Website / Tech",
    "def": "Application Programming Interface \u2014 a way for two systems to communicate with each other.",
    "girlie": 'How two different apps or services "talk" to each other behind the scenes.',
    "example": "A newsletter signup form sending data to an email service through its API.",
    "why": "Lets websites connect to outside tools instead of building everything from scratch.",
    "related": ["Automation"],
    "learn": []
  },
  {
    "term": "Database",
    "category": "Website / Tech",
    "def": "An organized system for storing and retrieving data.",
    "girlie": "Where all the actual information behind an app or website lives.",
    "example": "A list of newsletter subscribers stored in a database.",
    "why": "Powers anything that needs to remember information over time.",
    "related": ["CMS"],
    "learn": []
  },
  {
    "term": "Responsive Design",
    "category": "Website / Tech",
    "def": "Web design that adapts to different screen sizes and devices.",
    "girlie": "A website that actually looks good on your phone, not just a desktop.",
    "example": "A navigation menu that becomes a hamburger icon on mobile.",
    "why": "Most web traffic today happens on phones.",
    "related": ["UX", "UI"],
    "learn": []
  },
  {
    "term": "UX",
    "category": "Website / Tech",
    "def": "User Experience \u2014 how a product feels and functions for the person using it.",
    "girlie": "How easy and pleasant something is to actually use.",
    "example": "A checkout process that takes 2 steps instead of 8.",
    "why": "Good UX keeps people from giving up and leaving.",
    "related": ["UI", "Responsive Design"],
    "learn": []
  },
  {
    "term": "UI",
    "category": "Website / Tech",
    "def": "User Interface \u2014 the visual elements a person interacts with.",
    "girlie": "What a product actually looks like \u2014 buttons, colors, layout.",
    "example": "A clean, pink, easy-to-read button design.",
    "why": "The first impression of how trustworthy and professional something feels.",
    "related": ["UX"],
    "learn": []
  },
  {
    "term": "Revenue",
    "category": "Money",
    "def": "The total amount of money a business brings in before expenses.",
    "girlie": "All the money coming in, before anything gets subtracted.",
    "example": "$5,000 in total sales this month.",
    "why": "Often confused with profit \u2014 revenue isn\u2019t what you actually keep.",
    "related": ["Profit", "Gross Income"],
    "learn": []
  },
  {
    "term": "Profit",
    "category": "Money",
    "def": "What remains after subtracting expenses from revenue.",
    "girlie": "What you actually keep after paying for everything the business needed.",
    "example": "$5,000 revenue minus $1,200 expenses = $3,800 profit.",
    "why": "The number that actually reflects how well a business is doing.",
    "related": ["Revenue", "Expense"],
    "learn": []
  },
  {
    "term": "Expense",
    "category": "Money",
    "def": "Money spent to run a business or maintain a lifestyle.",
    "girlie": "Money going out \u2014 tools, subscriptions, supplies, bills.",
    "example": "A monthly software subscription.",
    "why": "Tracking expenses is essential to knowing real profit.",
    "related": ["Profit", "Cash Flow"],
    "learn": []
  },
  {
    "term": "Cash Flow",
    "category": "Money",
    "def": "The movement of money in and out of a business or budget over time.",
    "girlie": "The timing of money coming in versus going out \u2014 not just the totals.",
    "example": "Being profitable on paper but short on cash because clients pay late.",
    "why": "A business can be profitable and still run into trouble if cash flow is poor.",
    "related": ["Revenue", "Expense"],
    "learn": []
  },
  {
    "term": "Passive Income",
    "category": "Money",
    "def": "Income that requires little to no ongoing active effort to maintain.",
    "girlie": "Money that keeps coming in without you actively trading time for it every time.",
    "example": "Ongoing sales of a digital product made once.",
    "why": "Often misunderstood \u2014 most passive income requires real upfront work to build.",
    "related": ["Active Income"],
    "learn": [{
      "label": "The Soft Girl\u2019s Guide to Passive Income",
      "id": "soft-girl-passive-income"
    }]
  },
  {
    "term": "Active Income",
    "category": "Money",
    "def": "Income earned in direct exchange for time or active work.",
    "girlie": "Money you earn by actively doing the work, hour by hour or project by project.",
    "example": "Freelance client work billed hourly.",
    "why": "The most common starting point before building any passive income.",
    "related": ["Passive Income"],
    "learn": []
  },
  {
    "term": "Gross Income",
    "category": "Money",
    "def": "Total income before taxes or deductions.",
    "girlie": "The full number before anything gets taken out.",
    "example": "A $60,000 gross salary before taxes.",
    "why": "Often different \u2014 sometimes very different \u2014 from what actually lands in your account.",
    "related": ["Net Income"],
    "learn": []
  },
  {
    "term": "Net Income",
    "category": "Money",
    "def": "Income remaining after taxes and deductions.",
    "girlie": "What actually lands in your account after everything\u2019s taken out.",
    "example": "Take-home pay after taxes.",
    "why": "The realistic number to budget from.",
    "related": ["Gross Income"],
    "learn": []
  },
  {
    "term": "Budget",
    "category": "Money",
    "def": "A plan for how income will be spent, saved, or invested.",
    "girlie": "Giving every dollar a job before the month starts.",
    "example": "Splitting income into needs, savings, and guilt-free spending.",
    "why": "Prevents money from quietly disappearing with nothing to show for it.",
    "related": ["Cash Flow"],
    "learn": [{
      "label": "Budget Like a Queen",
      "id": "budget-like-a-queen"
    }]
  },
  {
    "term": "Emergency Fund",
    "category": "Money",
    "def": "Money set aside specifically for unexpected expenses or income gaps.",
    "girlie": 'Your "just in case life happens" cushion.',
    "example": "3 months of essential expenses saved separately.",
    "why": "Especially important for freelancers with irregular income.",
    "related": ["Budget"],
    "learn": []
  },
  {
    "term": "Personal Branding",
    "category": "Career",
    "def": "The intentional, consistent impression you build across your professional presence.",
    "girlie": "Being known, specifically and consistently, for something real about how you work.",
    "example": "A consistent name, photo, and bio across every platform.",
    "why": "Helps people remember and refer you.",
    "related": ["Portfolio", "Networking"],
    "learn": [{
      "label": "Personal Branding for Beginners",
      "id": "personal-branding-for-beginners"
    }]
  },
  {
    "term": "Transferable Skills",
    "category": "Career",
    "def": "Skills that apply across multiple roles or industries.",
    "girlie": "Skills you keep no matter what direction you switch to.",
    "example": "Communication, organization, and problem-solving.",
    "why": "Makes a career pivot far less risky than it feels.",
    "related": [],
    "learn": [{
      "label": "How to Choose a Career",
      "id": "how-to-choose-a-career"
    }]
  },
  {
    "term": "Networking",
    "category": "Career",
    "def": "Building and maintaining professional relationships.",
    "girlie": "Making real connections instead of only applying into the void.",
    "example": "A genuine LinkedIn conversation that leads to a referral.",
    "why": "Many opportunities come through people, not just applications.",
    "related": ["Personal Branding"],
    "learn": [{
      "label": "Babe, Your Next International Opportunity Is On LinkedIn",
      "id": "linkedin-international-opportunity"
    }]
  },
  {
    "term": "Portfolio",
    "category": "Career",
    "def": "A curated collection of work samples showcasing skill and experience.",
    "girlie": "Proof you can actually do the thing, not just say you can.",
    "example": "3 focused design samples in one specific style.",
    "why": "Often more persuasive than a resume alone.",
    "related": ["Personal Branding"],
    "learn": []
  },
  {
    "term": "Resume/CV",
    "category": "Career",
    "def": "A formal document summarizing work history, skills, and education.",
    "girlie": "Your professional highlight reel on paper.",
    "example": "A one-page resume tailored to a specific role.",
    "why": "Still a key first filter in most hiring processes.",
    "related": ["Applicant Tracking System"],
    "learn": [{
      "label": "Resume Review Checklist",
      "href": "/tools/resume-review-checklist.html"
    }]
  },
  {
    "term": "Applicant Tracking System",
    "category": "Career",
    "def": "Software that scans and filters resumes before a human sees them.",
    "girlie": "The robot that reads your resume before an actual person does.",
    "example": "A system that filters out resumes missing certain keywords.",
    "why": "Explains why keyword-matching your resume to a job post actually matters.",
    "related": ["Resume/CV"],
    "learn": []
  },
  {
    "term": "Remote Work",
    "category": "Career",
    "def": "Work performed outside of a traditional office, often from home.",
    "girlie": "A job you can do from literally anywhere with a laptop and wifi.",
    "example": "A fully remote virtual assistant role.",
    "why": "Opens up opportunities beyond your immediate location.",
    "related": [],
    "learn": []
  },
  {
    "term": "Soft Skills",
    "category": "Career",
    "def": "Interpersonal and behavioral skills like communication and adaptability.",
    "girlie": 'The "how you work with people" skills, not the technical ones.',
    "example": "Clear communication under a tight deadline.",
    "why": "Often the deciding factor between two similarly qualified candidates.",
    "related": ["Transferable Skills"],
    "learn": []
  },
  {
    "term": "Generative AI",
    "category": "AI",
    "def": "AI systems that create new content \u2014 text, images, audio \u2014 based on prompts.",
    "girlie": "AI that makes new stuff for you based on what you ask it.",
    "example": "An AI tool writing a first draft of a caption.",
    "why": "Increasingly used across content, business, and technical work.",
    "related": ["Prompt", "AI Model"],
    "learn": [{
      "label": "AI Prompt Builder",
      "href": "/tools/ai-prompt-builder.html"
    }]
  },
  {
    "term": "Prompt",
    "category": "AI",
    "def": "The instruction or question given to an AI tool to get a specific response.",
    "girlie": "What you type to actually get the AI to do the thing you want.",
    "example": '"Write 3 Instagram captions for a bakery launch, playful tone."',
    "why": "A clear, specific prompt gets a far more useful answer than a vague one.",
    "related": ["Generative AI"],
    "learn": []
  },
  {
    "term": "AI Model",
    "category": "AI",
    "def": "The underlying system trained to perform a specific AI task.",
    "girlie": 'The "brain" behind an AI tool that actually does the thinking.',
    "example": "The model powering a chatbot\u2019s responses.",
    "why": "Different models have different strengths, costs, and limitations.",
    "related": ["Generative AI"],
    "learn": []
  },
  {
    "term": "Automation",
    "category": "AI",
    "def": "Using technology to perform tasks with minimal ongoing human effort.",
    "girlie": "Setting something up once so it just keeps happening on its own.",
    "example": "An email that automatically sends when someone joins a newsletter.",
    "why": "Frees up time for work that actually needs a human.",
    "related": ["AI-Assisted Workflow", "API"],
    "learn": []
  },
  {
    "term": "AI-Assisted Workflow",
    "category": "AI",
    "def": "A work process that incorporates AI tools to speed up or improve tasks.",
    "girlie": "Using AI as a genuine helper in how you actually get work done.",
    "example": "Drafting with AI, then editing it in your own voice.",
    "why": "A practical, realistic way to use AI without losing your own voice or judgment.",
    "related": ["Generative AI", "Automation"],
    "learn": []
  },
  {
    "term": "Discovery Call",
    "category": "Freelancing",
    "def": "A short first conversation to understand a client's needs before quoting.",
    "girlie": "A free chat where you ask questions so your quote is accurate.",
    "example": "A 20-minute video call to ask what the client wants, by when, and what budget they have.",
    "why": "It prevents under-pricing and scope surprises.",
    "related": ["Scope of Work", "Proposal"],
    "learn": [{
      "label": "How to Get Your First Freelance Client",
      "id": "how-to-get-your-first-freelance-client"
    }]
  },
  {
    "term": "Cold Pitch",
    "category": "Freelancing",
    "def": "A first message to someone who does not know you, offering a specific service.",
    "girlie": 'A polite message that says "I noticed this, and I can help with that."',
    "example": "A short DM to a bakery offering a free sample week of posts.",
    "why": "It is the fastest way to find clients when you have no network yet.",
    "related": ["Client Acquisition", "Offer"],
    "learn": [{
      "label": "How to Get Your First Freelance Client",
      "id": "how-to-get-your-first-freelance-client"
    }]
  },
  {
    "term": "Rate Card",
    "category": "Freelancing",
    "def": "A document listing your services and prices.",
    "girlie": "A simple price list you can send in seconds.",
    "example": "A one-page PDF: logo $300, social pack $250, brand kit $900.",
    "why": "It saves time and makes you look organised.",
    "related": ["Proposal", "Hourly Rate"],
    "learn": []
  },
  {
    "term": "Hourly Rate",
    "category": "Freelancing",
    "def": "What you charge for each hour of work.",
    "girlie": "Your price per hour, which should include time you are not billing.",
    "example": "$30 an hour, but only 60% of your hours are billable.",
    "why": "A low hourly rate that ignores admin time quietly lowers your real pay.",
    "related": ["Value-Based Pricing", "Rate Card"],
    "learn": [{
      "label": "Freelance Rate Calculator",
      "id": "freelance-rate-calculator"
    }]
  },
  {
    "term": "Value-Based Pricing",
    "category": "Freelancing",
    "def": "Pricing based on the value of the result to the client rather than your time.",
    "girlie": "Charging for the outcome, not the hours.",
    "example": "A $1,500 sales page that could bring in $10,000 in new customers.",
    "why": "It lets you earn more as you get faster.",
    "related": ["Hourly Rate", "Offer"],
    "learn": []
  },
  {
    "term": "Net Terms",
    "category": "Freelancing",
    "def": "The number of days a client has to pay an invoice, such as net-14 or net-30.",
    "girlie": '"Net-14" means pay within 14 days.',
    "example": "Invoice dated 1 June with net-14 terms is due on 15 June.",
    "why": "Short terms protect your cash flow.",
    "related": ["Invoice", "Deposit"],
    "learn": []
  },
  {
    "term": "Late Fee",
    "category": "Freelancing",
    "def": "An extra charge for invoices paid after the due date.",
    "girlie": "A small penalty that is written in your agreement up front.",
    "example": "Late payments incur 2% per week after the due date.",
    "why": "It encourages on-time payment and gives you a polite reason to chase.",
    "related": ["Invoice", "Net Terms"],
    "learn": []
  },
  {
    "term": "Kill Fee",
    "category": "Freelancing",
    "def": "A fee paid if a client cancels a project after you have started.",
    "girlie": "Payment for the work you already did if they change their mind.",
    "example": "A 25% fee if the project is cancelled once drafts are delivered.",
    "why": "It protects you when plans change.",
    "related": ["Deposit", "Milestone"],
    "learn": []
  },
  {
    "term": "Usage Rights",
    "category": "Freelancing",
    "def": "Permission about where, how long and how a piece of work may be used.",
    "girlie": "Who can use your work, where and for how long.",
    "example": "A video licensed for 3 months of paid ads on one platform.",
    "why": "Wider usage is worth more, so it should change the price.",
    "related": ["Licence", "Intellectual Property"],
    "learn": []
  },
  {
    "term": "Licence",
    "category": "Freelancing",
    "def": "A legal permission to use work without owning it.",
    "girlie": "Renting your work out, rather than selling it forever.",
    "example": "A brand pays $450 to use your photo for a year.",
    "why": "It lets you keep ownership and earn from repeat use.",
    "related": ["Usage Rights", "Intellectual Property"],
    "learn": []
  },
  {
    "term": "Intellectual Property",
    "category": "Freelancing",
    "def": "Creations such as designs, writing and ideas that can be owned and protected.",
    "girlie": "The things your mind makes that belong to someone.",
    "example": "A logo you design is your IP until you assign it in a contract.",
    "why": "Knowing who owns what avoids painful disputes later.",
    "related": ["Licence", "Usage Rights"],
    "learn": []
  },
  {
    "term": "NDA",
    "category": "Freelancing",
    "def": "A non-disclosure agreement: a contract promising to keep information private.",
    "girlie": "A promise not to share what you learn about the client.",
    "example": "A founder asks you to sign an NDA before showing you her launch plan.",
    "why": "NDAs are common. Read them for how long they last and what is covered.",
    "related": ["Contract"],
    "learn": []
  },
  {
    "term": "Contract",
    "category": "Freelancing",
    "def": "A written agreement that sets out what each side will do.",
    "girlie": 'The paper version of "this is what we agreed".',
    "example": "A two-page agreement with scope, price, deadline and revision limits.",
    "why": "A clear contract is the cheapest insurance a freelancer has.",
    "related": ["Scope of Work", "Proposal"],
    "learn": [{
      "label": "How to Get Paid as a Freelancer",
      "id": "how-to-get-paid-as-a-freelancer"
    }]
  },
  {
    "term": "Upsell",
    "category": "Marketing",
    "def": "Offering a higher-value or extra service to an existing customer.",
    "girlie": '"Would you like the bigger version?"',
    "example": "A client who orders a logo also buys a brand guide.",
    "why": "It grows income without having to find new clients.",
    "related": ["Offer", "Retainer"],
    "learn": []
  },
  {
    "term": "Testimonial",
    "category": "Marketing",
    "def": "A statement from a customer about their experience with you.",
    "girlie": "A happy client saying nice things in their own words.",
    "example": '"She delivered early and the instructions were so clear."',
    "why": "Social proof builds trust faster than anything you say about yourself.",
    "related": ["Case Study", "Portfolio"],
    "learn": []
  },
  {
    "term": "Case Study",
    "category": "Marketing",
    "def": "A short story of a project: the problem, your approach and the result.",
    "girlie": "Proof of what you can do, told like a mini story.",
    "example": "How a bakery grew its bookings 30% after a simple content plan.",
    "why": "It is the best portfolio format for services.",
    "related": ["Portfolio", "Testimonial"],
    "learn": []
  },
  {
    "term": "Hook",
    "category": "Marketing",
    "def": "The opening line or visual of content designed to make people stop scrolling.",
    "girlie": "The first two seconds that decide if anyone stays.",
    "example": '"I made $200 from one template. Here is how." in the first line of a reel.',
    "why": "If the hook fails, the rest of your content is not seen.",
    "related": ["Content Marketing", "Engagement Rate"],
    "learn": []
  },
  {
    "term": "Content Pillar",
    "category": "Marketing",
    "def": "A core topic you regularly create content about.",
    "girlie": "The 3 or 4 themes your content keeps returning to.",
    "example": "A creator's pillars: freelancing tips, tool reviews, money habits.",
    "why": "Pillars give you ideas and make your audience know what you are about.",
    "related": ["Content Marketing", "Niche"],
    "learn": []
  },
  {
    "term": "Content Calendar",
    "category": "Marketing",
    "def": "A schedule of what you will publish and when.",
    "girlie": "A plan so you are not inventing posts at 11pm.",
    "example": "A spreadsheet with day, topic, format and status.",
    "why": "Planning makes consistency much easier.",
    "related": ["Content Pillar", "Batching"],
    "learn": []
  },
  {
    "term": "Batching",
    "category": "Marketing",
    "def": "Doing similar tasks together in one session.",
    "girlie": "Filming a week of videos in a single afternoon.",
    "example": "Writing four captions and designing four graphics in one sitting.",
    "why": "It cuts the time it takes to switch between tasks.",
    "related": ["Content Calendar"],
    "learn": []
  },
  {
    "term": "Algorithm",
    "category": "Marketing",
    "def": "The rules a platform uses to decide what to show to whom.",
    "girlie": "The invisible system that decides who sees your post.",
    "example": "A video watched to the end gets shown to more people.",
    "why": "Understanding what the algorithm rewards helps you create for it, without chasing every trend.",
    "related": ["Reach", "Engagement Rate"],
    "learn": []
  },
  {
    "term": "Reach",
    "category": "Marketing",
    "def": "The number of different people who saw your content.",
    "girlie": "How many people saw it at least once.",
    "example": "A reel reached 8,000 accounts.",
    "why": "Reach shows awareness. It does not tell you if people took action.",
    "related": ["Impressions", "Engagement Rate"],
    "learn": []
  },
  {
    "term": "Impressions",
    "category": "Marketing",
    "def": "The total number of times content was displayed, including repeat views.",
    "girlie": "How many times it appeared on screens.",
    "example": "10,000 impressions from 6,000 people.",
    "why": "It is useful together with reach to see repeat exposure.",
    "related": ["Reach"],
    "learn": []
  },
  {
    "term": "Click-Through Rate",
    "category": "Marketing",
    "def": "The percentage of people who clicked after seeing something.",
    "girlie": "Out of everyone who saw it, how many clicked.",
    "example": "100 clicks from 5,000 views is a 2% click-through rate.",
    "why": "A low rate tells you the message or visual is not compelling.",
    "related": ["Conversion Rate", "CTA"],
    "learn": []
  },
  {
    "term": "Analytics",
    "category": "Marketing",
    "def": "Data that shows how people use your site, content or product.",
    "girlie": "The scoreboard that shows what is working.",
    "example": "Google Analytics showing which blog posts get visitors.",
    "why": "Decisions based on data beat guesses.",
    "related": ["Conversion Rate", "Engagement Rate"],
    "learn": []
  },
  {
    "term": "A/B Test",
    "category": "Marketing",
    "def": "Comparing two versions to see which performs better.",
    "girlie": "Trying version A and version B, then keeping the winner.",
    "example": "Two email subject lines, sent to half the list each.",
    "why": "It replaces opinions with evidence.",
    "related": ["Conversion Rate", "Click-Through Rate"],
    "learn": []
  },
  {
    "term": "Keyword",
    "category": "Marketing",
    "def": "A word or phrase people type into a search engine.",
    "girlie": "What people are actually searching for.",
    "example": '"how to start freelancing" or "budget planner template".',
    "why": "Writing around real searches helps the right people find you.",
    "related": ["SEO", "Search Intent"],
    "learn": []
  },
  {
    "term": "Search Intent",
    "category": "Marketing",
    "def": "The reason behind a search: to learn, compare, buy or find something.",
    "girlie": "What the person really wants when they type it.",
    "example": '"best laptop for students" means they want to compare before buying.',
    "why": "Matching intent is the difference between a page that ranks and a page that does not.",
    "related": ["Keyword", "SEO"],
    "learn": []
  },
  {
    "term": "Backlink",
    "category": "Marketing",
    "def": "A link to your site from another website.",
    "girlie": "Another site vouching for yours with a link.",
    "example": "A popular blog linking to your guide.",
    "why": "Quality backlinks help search engines trust your site.",
    "related": ["SEO"],
    "learn": []
  },
  {
    "term": "Newsletter",
    "category": "Marketing",
    "def": "A regular email sent to subscribers.",
    "girlie": "A friendly email you send to people who asked for it.",
    "example": "A weekly email with one tip and one link.",
    "why": "Your list belongs to you, unlike social followers.",
    "related": ["Email Marketing", "Lead Magnet"],
    "learn": []
  },
  {
    "term": "Open Rate",
    "category": "Marketing",
    "def": "The percentage of recipients who opened an email.",
    "girlie": "How many people opened your email.",
    "example": "40 opens from 100 sent is a 40% open rate.",
    "why": "It tells you if your subject lines and sender name get attention. Privacy changes make it less exact.",
    "related": ["Email Marketing", "Click-Through Rate"],
    "learn": []
  },
  {
    "term": "Segmentation",
    "category": "Marketing",
    "def": "Dividing an audience into groups so you can send more relevant messages.",
    "girlie": "Sending different messages to different people.",
    "example": "Separate emails for beginners and advanced readers.",
    "why": "Relevance increases engagement and reduces unsubscribes.",
    "related": ["Email Marketing", "Target Audience"],
    "learn": []
  },
  {
    "term": "Workflow",
    "category": "Digital Business",
    "def": "A repeatable series of steps to finish a task.",
    "girlie": "The order you do things in, written down.",
    "example": "Brief, draft, feedback, final, invoice.",
    "why": "A good workflow saves time and reduces mistakes.",
    "related": ["SOP", "Automation"],
    "learn": []
  },
  {
    "term": "SOP",
    "category": "Digital Business",
    "def": "A standard operating procedure: written steps for doing a task the same way each time.",
    "girlie": "A how-to guide for your own business.",
    "example": "A one-page checklist for onboarding a new client.",
    "why": "It lets you work faster and hand tasks over easily.",
    "related": ["Workflow", "Automation"],
    "learn": []
  },
  {
    "term": "Template",
    "category": "Digital Business",
    "def": "A ready-made structure you can reuse.",
    "girlie": "A starting point so you are not starting from scratch.",
    "example": "A proposal template you fill in for each client.",
    "why": "Templates save hours and keep quality consistent.",
    "related": ["SOP", "Digital Product"],
    "learn": []
  },
  {
    "term": "Virtual Assistant",
    "category": "Digital Business",
    "def": "Someone who provides remote administrative or creative support.",
    "girlie": "A remote helper for a busy person or business.",
    "example": "Managing inbox, calendar and bookings for a coach.",
    "why": "One of the quickest ways to start earning online.",
    "related": ["Retainer", "Freelancer"],
    "learn": [{
      "label": "Pretty, Paid and Booked",
      "id": "virtual-assistant-pretty-paid-booked"
    }]
  },
  {
    "term": "Project Management",
    "category": "Digital Business",
    "def": "Planning and tracking work so it finishes on time and on scope.",
    "girlie": "Making sure things actually get done, in order.",
    "example": "A task board with columns for To do, Doing and Done.",
    "why": "Even a solo freelancer needs a system.",
    "related": ["Workflow", "Milestone"],
    "learn": []
  },
  {
    "term": "Kanban",
    "category": "Digital Business",
    "def": "A visual board that moves tasks through columns.",
    "girlie": 'Sticky notes that move from "to do" to "done".',
    "example": "A Trello board with client projects as cards.",
    "why": "Seeing your workload helps you avoid overcommitting.",
    "related": ["Project Management"],
    "learn": []
  },
  {
    "term": "No-Code",
    "category": "Website / Tech",
    "def": "Tools that let you build websites or apps without programming.",
    "girlie": "Drag, drop and publish.",
    "example": "Building a landing page in Carrd or Framer.",
    "why": "It lowers the barrier to building real things.",
    "related": ["Landing Page", "Automation"],
    "learn": []
  },
  {
    "term": "MVP",
    "category": "Digital Business",
    "def": "A minimum viable product: the simplest version that tests an idea.",
    "girlie": "The smallest thing you can launch to see if people care.",
    "example": "A one-page PDF guide sold before building a full course.",
    "why": "It lets you learn before you invest.",
    "related": ["Digital Product", "Niche"],
    "learn": []
  },
  {
    "term": "Pivot",
    "category": "Digital Business",
    "def": "A change in direction based on what you have learned.",
    "girlie": "Changing your plan because the evidence says so.",
    "example": "Switching from selling logos to selling brand kits.",
    "why": "Pivoting is a normal and healthy part of a business.",
    "related": ["MVP"],
    "learn": []
  },
  {
    "term": "Side Hustle",
    "category": "Digital Business",
    "def": "Work you do for income alongside a main job or studies.",
    "girlie": "Extra income built on the side.",
    "example": "Freelance design on weekends.",
    "why": "It lets you test ideas with a safety net.",
    "related": ["Active Income", "Passive Income"],
    "learn": [{
      "label": "How to Make Your First $1,000 Online",
      "id": "how-to-make-your-first-1000-online"
    }]
  },
  {
    "term": "Burnout",
    "category": "Career",
    "def": "A state of exhaustion from prolonged stress and overwork.",
    "girlie": "What happens when you run on empty for too long.",
    "example": "Working evenings and weekends for months without a break.",
    "why": "Boundaries, rest and realistic scopes are business tools, not luxuries.",
    "related": ["Soft Skills", "Scope of Work"],
    "learn": []
  },
  {
    "term": "Imposter Syndrome",
    "category": "Career",
    "def": "Feeling that you are not as capable as others think, despite evidence.",
    "girlie": 'That "everyone will find out I do not know what I am doing" feeling.',
    "example": "A freelancer with ten happy clients still feeling unqualified.",
    "why": "Almost everyone feels it. Evidence and small wins help.",
    "related": ["Soft Skills", "Portfolio"],
    "learn": []
  },
  {
    "term": "Hourly Billable Rate",
    "category": "Money",
    "def": "The share of your working hours you can actually charge for.",
    "girlie": "Not every hour you work is an hour you can bill.",
    "example": "Working 30 hours but billing 18.",
    "why": "It explains why your real hourly pay is lower than your quoted rate.",
    "related": ["Hourly Rate", "Revenue"],
    "learn": []
  },
  {
    "term": "Profit Margin",
    "category": "Money",
    "def": "The percentage of revenue left after costs.",
    "girlie": "How much of each dollar you keep.",
    "example": "$1,000 income with $300 costs is a 70% margin.",
    "why": "It shows if your pricing is actually sustainable.",
    "related": ["Revenue", "Profit", "Expense"],
    "learn": []
  },
  {
    "term": "Overhead",
    "category": "Money",
    "def": "Ongoing business costs not tied to one project.",
    "girlie": "The costs of simply being in business.",
    "example": "Software subscriptions, domain, insurance.",
    "why": "Overhead must be covered by your prices.",
    "related": ["Expense", "Profit Margin"],
    "learn": []
  },
  {
    "term": "Break-Even",
    "category": "Money",
    "def": "The point where income equals costs.",
    "girlie": "The moment you stop losing money.",
    "example": "Selling 30 templates at $10 to cover $300 of costs.",
    "why": "Knowing it tells you how much you need to sell.",
    "related": ["Profit", "Expense"],
    "learn": []
  },
  {
    "term": "Sinking Fund",
    "category": "Money",
    "def": "Money set aside regularly for a known future cost.",
    "girlie": "A little each month for something you know is coming.",
    "example": "$50 a month for a new laptop next year.",
    "why": "It turns big expenses into small, manageable ones.",
    "related": ["Emergency Fund", "Budget"],
    "learn": []
  },
  {
    "term": "Tax Set-Aside",
    "category": "Money",
    "def": "Money you put aside from each payment to cover taxes.",
    "girlie": "A separate pot so tax time is not a shock.",
    "example": "Moving a fixed share of every payment into a savings pot.",
    "why": "Freelance income often has no tax taken at source. The right share depends on where you live, so check locally.",
    "related": ["Net Income", "Budget"],
    "learn": []
  },
  {
    "term": "Phishing",
    "category": "Digital Safety",
    "def": "A scam where someone pretends to be a trusted source to steal information.",
    "girlie": "A fake message designed to make you click or share details.",
    "example": 'An email saying "your account is locked" with a fake login link.',
    "why": "Knowing the signs protects your accounts and money.",
    "related": ["Two-Factor Authentication"],
    "learn": []
  },
  {
    "term": "Two-Factor Authentication",
    "category": "Digital Safety",
    "def": "An extra step to log in, such as a code sent to your phone.",
    "girlie": "A second lock on your accounts.",
    "example": "Entering a code from an app after your password.",
    "why": "It protects you even if your password leaks.",
    "related": ["Phishing"],
    "learn": []
  },
  {
    "term": "Overpayment Scam",
    "category": "Digital Safety",
    "def": "A scam where someone overpays and asks you to send back the difference.",
    "girlie": "They send too much and ask for a refund before their payment bounces.",
    "example": 'A "client" pays $1,800 for a $600 job and asks for $1,200 back.',
    "why": "Never send money back until payment has fully cleared.",
    "related": ["Phishing", "Invoice"],
    "learn": []
  },
  {
    "term": "Escrow",
    "category": "Digital Safety",
    "def": "Holding money with a third party until both sides have done their part.",
    "girlie": "A safe middle step that releases payment when work is delivered.",
    "example": "A freelance platform holds the client's payment until you deliver.",
    "why": "It protects both sides on new relationships.",
    "related": ["Milestone", "Deposit"],
    "learn": []
  }
];

// data/pg/start-here.js
var START_QUESTIONS = [
  { id: "stage", title: "Where are you right now?", type: "single", options: [
    { value: "zero", label: "Starting from zero", hint: "No idea or skill yet" },
    { value: "skill", label: "I have a skill, no clients", hint: "Ready to sell it" },
    { value: "freelancing", label: "I already have clients", hint: "Want to do it better" },
    { value: "job", label: "I am employed or job hunting", hint: "Career focus" },
    { value: "business", label: "I have a business or product idea", hint: "Time to test it" }
  ] },
  { id: "goal", title: "What do you most want right now?", type: "single", options: [
    { value: "income", label: "Earn some extra money", hint: "A first or better income stream" },
    { value: "clients", label: "Handle clients with confidence", hint: "Pricing, scope, payment" },
    { value: "career", label: "Move forward in my career", hint: "CV, interview, pay" },
    { value: "learn", label: "Understand the digital world", hint: "Terms, tools, skills" },
    { value: "build", label: "Launch something of my own", hint: "A product or business" }
  ] },
  { id: "time", title: "How much time can you give each week?", type: "single", options: [
    { value: "tiny", label: "Under 2 hours", hint: "Small steps" },
    { value: "some", label: "2 to 5 hours", hint: "A steady routine" },
    { value: "lots", label: "More than 5 hours", hint: "I can really go for it" }
  ] },
  { id: "blockers", title: "What is in your way? Pick up to two.", help: "Nothing in the way? Just continue.", type: "multi", optional: true, max: 2, options: [
    { value: "idea", label: "I do not know what to do", hint: "" },
    { value: "confidence", label: "I am scared to pitch or charge", hint: "" },
    { value: "scams", label: "I worry about scams", hint: "" },
    { value: "jargon", label: "Everyone uses words I do not know", hint: "" },
    { value: "money", label: "My budget is tiny", hint: "" },
    { value: "consistency", label: "I struggle to stay consistent", hint: "" }
  ] },
  { id: "style", title: "How do you like to learn?", type: "single", options: [
    { value: "play", label: "By playing and trying", hint: "Games and simulations" },
    { value: "do", label: "By filling things in", hint: "Templates and worksheets" },
    { value: "read", label: "By reading first", hint: "Explanations and examples" }
  ] }
];
var ROUTE_RULES = [
  // Money Path
  { when: { goal: ["income", "build"] }, exp: "money-path", points: 3, why: "You want income, and Money Path compares directions against your hours, budget and strengths." },
  { when: { stage: ["zero"] }, exp: "money-path", points: 2, why: "Starting from zero is exactly when a ranked shortlist beats guessing." },
  { when: { blockers: ["idea"] }, exp: "money-path", points: 3, why: "You are unsure what to do, so choosing one direction comes first." },
  { when: { goal: ["career"], stage: ["job"] }, exp: "money-path", points: 1, why: "It can also show which remote or side directions could grow alongside your job." },
  // Client Simulator
  { when: { stage: ["skill", "freelancing"] }, exp: "client-sim", points: 3, why: "You will deal with real clients, and practising the hard conversations first costs nothing." },
  { when: { goal: ["clients"] }, exp: "client-sim", points: 4, why: "You want client confidence, which is what this practises, with consequences." },
  { when: { blockers: ["confidence"] }, exp: "client-sim", points: 3, why: "Fear of pitching and charging gets smaller when you have rehearsed it." },
  // Game Room
  { when: { style: ["play"] }, exp: "game-room", points: 3, why: "You learn by trying, and the games turn money and client decisions into quick rounds." },
  { when: { blockers: ["scams"] }, exp: "game-room", points: 4, why: "Spot the Scam and Red Flag Radar train your eye for warning signs." },
  { when: { blockers: ["consistency"] }, exp: "game-room", points: 2, why: "The daily challenge is a five-minute habit you can keep." },
  { when: { stage: ["freelancing"], goal: ["clients", "income"] }, exp: "game-room", points: 1, why: "Price This sharpens how you quote work." },
  // Templates
  { when: { style: ["do"] }, exp: "templates", points: 4, why: "You prefer filling things in, so ready-to-use scripts and trackers fit you best." },
  { when: { goal: ["career"] }, exp: "templates", points: 3, why: "There is a CV bullet rewriter, interview prep and a salary script." },
  { when: { goal: ["clients", "income"], stage: ["skill", "freelancing"] }, exp: "templates", points: 2, why: "Proposal, outreach and payment-reminder templates save hours." },
  { when: { blockers: ["consistency", "money"] }, exp: "templates", points: 2, why: "Trackers and planners make consistency and money visible." },
  { when: { goal: ["build"] }, exp: "templates", points: 2, why: "The Offer Builder and Business Idea Check help you shape and test your idea." },
  // Glossary
  { when: { goal: ["learn"] }, exp: "glossary", points: 4, why: "You want to understand the digital world, and the glossary explains it plainly." },
  { when: { blockers: ["jargon"] }, exp: "glossary", points: 4, why: "You are tired of unfamiliar words, so keep the glossary open while you read." },
  { when: { style: ["read"] }, exp: "glossary", points: 2, why: "You like reading first, and every term has an example and further reading." },
  { when: { stage: ["zero"] }, exp: "glossary", points: 1, why: "A few key terms will make everything else easier to follow." }
];
var ROUTE_EXTRAS = {
  income: {
    week: ["Take Money Path and pick one direction (30 minutes).", "Write your one-line offer using the Offer Builder.", "Send five short messages to people who could use it."],
    templates: ["offer-builder", "client-outreach", "income-tracker"],
    terms: ["Offer", "Niche", "Cold Pitch"],
    articles: ["how-to-make-your-first-1000-online", "best-money-making-skills-2026", "first-2000-online"]
  },
  clients: {
    week: ["Play one Client Simulator case and read the debrief.", "Write your own scope and payment terms using the proposal template.", "Save a payment-reminder script so you are ready before you need it."],
    templates: ["proposal", "scope-change", "invoice-chase"],
    terms: ["Scope of Work", "Deposit", "Revision"],
    articles: ["how-to-get-paid-as-a-freelancer", "how-to-get-your-first-freelance-client", "virtual-assistant-pretty-paid-booked"]
  },
  career: {
    week: ["Rewrite three CV bullets with the action + outcome formula.", "Tidy your LinkedIn profile with the checklist.", "Practise your salary script out loud once."],
    templates: ["resume-bullets", "linkedin-checklist", "salary-script"],
    terms: ["Transferable Skills", "Resume/CV", "Networking"],
    articles: ["how-to-choose-a-career", "linkedin-international-opportunity", "what-to-build-before-quitting-your-9-to-5"]
  },
  learn: {
    week: ["Browse the glossary and save five terms you did not know.", "Use the flashcard mode for five minutes on two days.", "Play Skill Match to see how the terms show up in real work."],
    templates: ["business-idea-worksheet", "customer-research"],
    terms: ["Digital Product", "Freelancer", "SEO"],
    articles: ["digital-skills-for-beginners", "21-online-skills-that-can-change-your-income", "30-day-digital-skills-challenge"]
  },
  build: {
    week: ["Fill in the Business Idea Check for your best idea.", "Talk to three possible customers using the interview worksheet.", "Decide the smallest version you could sell and write it as an offer."],
    templates: ["business-idea-worksheet", "customer-research", "offer-builder"],
    terms: ["MVP", "Target Audience", "Lead Magnet"],
    articles: ["how-to-create-and-sell-a-digital-product", "profitable-digital-product-business", "build-your-first-3000-month-online-income-system"]
  }
};

// data/playground.js
var EXPERIENCES = [
  {
    id: "money-path",
    title: "Money Path",
    tone: "rose",
    href: "/pages/money-path.html",
    icon: "\u{1F4B8}",
    minutes: 6,
    short: "Explore income directions that fit your time, skills and budget, and get a practical first step.",
    why: "it compares income directions against your time, budget and skills, and gives you a practical first step.",
    keywords: ["income", "money", "earn", "earning", "side hustle", "hustle", "career", "job", "skills", "skill", "direction", "roadmap", "path", "explore", "online", "business", "extra", "cash", "pay", "paid", "work from home", "remote", "passive"]
  },
  {
    id: "client-sim",
    title: "Client Simulator",
    tone: "peach",
    href: "/pages/client-simulator.html",
    icon: "\u{1F4BC}",
    minutes: 10,
    short: "Practise real freelance moments: scope, pricing, payment and difficult conversations.",
    why: "it lets you practise client conversations, with real consequences, before they happen for real.",
    keywords: ["client", "clients", "freelance", "freelancing", "freelancer", "negotiate", "negotiation", "scope", "revision", "revisions", "invoice", "payment", "boundaries", "boundary", "proposal", "difficult", "rude", "late", "ghost", "ghosted", "raise", "rate", "rates", "charge", "underpaid", "say no", "confidence"]
  },
  {
    id: "game-room",
    title: "Game Room",
    tone: "lilac",
    href: "/pages/game-room.html",
    icon: "\u{1F3AE}",
    minutes: 8,
    short: "Six mini-games for money decisions, client judgement, pricing and spotting scams.",
    why: "it turns money, pricing and scam-spotting decisions into short games with explanations.",
    keywords: ["game", "games", "play", "fun", "quiz", "scam", "scams", "fake", "pricing", "price", "red flag", "challenge", "bored", "practice", "practise", "daily", "streak", "test myself", "compete", "score"]
  },
  {
    id: "start-here",
    title: "Start Here",
    tone: "pink",
    href: "/pages/start-here.html",
    icon: "\u{1F9ED}",
    minutes: 3,
    short: "Not sure where to begin? Answer a few questions and get a route through the Playground.",
    why: "it asks a few questions about your goal and time, then gives you a route through the Playground.",
    keywords: ["start", "begin", "beginner", "beginning", "lost", "unsure", "not sure", "confused", "new", "zero", "guide", "where", "overwhelmed", "first", "help", "plan", "route", "stuck", "dont know", "don't know"]
  },
  {
    id: "templates",
    title: "Free Girlie Templates",
    tone: "blue",
    href: "/pages/templates.html",
    icon: "\u{1F380}",
    minutes: 5,
    short: "Trackers, worksheets, checklists and scripts you can fill in, copy or download.",
    why: "it has trackers, worksheets, checklists and scripts you can fill in and use straight away.",
    keywords: ["template", "templates", "tracker", "worksheet", "checklist", "download", "script", "planner", "resume", "cv", "interview", "copy", "ready made", "email", "message", "dm", "pitch", "budget", "printable", "pdf", "fill"]
  },
  {
    id: "glossary",
    title: "Digital Girl Glossary",
    tone: "gold",
    href: "/pages/glossary.html",
    icon: "\u{1F50E}",
    minutes: 4,
    short: "Digital and business terms in plain language, with examples you can use.",
    why: "it explains digital and business terms in plain language, with examples you can use.",
    keywords: ["glossary", "term", "terms", "meaning", "mean", "define", "definition", "explain", "jargon", "word", "words", "seo", "niche", "funnel", "what is", "understand", "dictionary", "vocabulary", "flashcards", "learn"]
  }
];
var PLAYGROUND_PAGES = [
  { id: "playground-hub", title: "Her Digital Playground", category: "Playground", icon: "\u{1F380}", url: "/pages/playground.html" },
  { id: "playground-start-here", title: "Start Here, Girl", category: "Playground", icon: "\u{1F9ED}", url: "/pages/start-here.html" },
  { id: "playground-money-path", title: "Find Your Money Path", category: "Playground", icon: "\u{1F4B8}", url: "/pages/money-path.html" },
  { id: "playground-game-room", title: "The Digital Girl Game Room", category: "Playground", icon: "\u{1F3AE}", url: "/pages/game-room.html" },
  { id: "playground-client-simulator", title: "Client Simulator", category: "Playground", icon: "\u{1F4BC}", url: "/pages/client-simulator.html" },
  { id: "playground-templates", title: "Free Girlie Templates", category: "Playground", icon: "\u{1F380}", url: "/pages/templates.html" },
  { id: "playground-glossary", title: "The Digital Girl Glossary", category: "Playground", icon: "\u{1F50E}", url: "/pages/glossary.html" }
];
export {
  CASES,
  EXPERIENCES,
  GAMES,
  GLOSSARY,
  GLOSSARY_CATEGORIES,
  INBOX_ACTIONS,
  METERS,
  QUESTIONS as MONEY_QUESTIONS,
  PATHS,
  PLAYGROUND_PAGES,
  ROUTE_EXTRAS,
  ROUTE_RULES,
  SKILLS,
  SKILL_LABELS,
  START_QUESTIONS,
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  TIMELINE_WEEKS,
  dailyPool
};
