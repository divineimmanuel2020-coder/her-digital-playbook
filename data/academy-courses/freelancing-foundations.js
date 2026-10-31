/* =============================================
   COURSE: FREELANCING FOUNDATIONS
   Full-depth rewrite. Every lesson has objectives, a multi-part
   explanation, key terms, a step-by-step task, a worked example,
   a practice task and a 4-question check with explanations.
   Lesson ids from the earlier version are unchanged so saved
   learner progress still lines up. Case studies are illustrative
   composites, not real people. Legal, tax and payment content is
   general information, not professional advice.
   ============================================= */

function L(id, title, type, duration, c) {
  return { id, title, type, duration, content: c };
}
function A(id, questions) {
  return { id, title: 'Module Assessment', type: 'assessment', duration: 15, isAssessment: true, assessment: { passScore: 70, questions } };
}
const Q = (q, options, correct, explain) => ({ q, options, correct, explain });

export const modules = [
  /* ---------------- MODULE 1 ---------------- */
  {
    id: 'ff-m1', title: 'Understanding Freelancing',
    objective: 'Understand what freelancing actually is as a business model, and separate the realistic version from the "make $10k/month overnight" hype.',
    lessons: [
      L('ff-m1-l1', 'What Freelancing Actually Is', 'concept', 22, {
        objectives: ['Define freelancing as a small service business, not a job without a boss', 'List the four things every freelancer must do besides the skilled work', 'Decide honestly whether you are ready for the trade-offs'],
        concept: `Freelancing means selling a specific skill directly to clients as an independent contractor instead of an employer. You are not "self-employed in general". You are running a very small service business with one employee: you. Clients pay you for a result, such as a designed logo, an edited video, a written article or a managed inbox, and you decide how, when and where the work is done.

That freedom has a price. An employee is paid to do the skilled work. A freelancer is paid for the skilled work but must also find clients, sell, price, handle paperwork, chase payments and manage her own time. In most freelance businesses, the skill is only about half the job.`,
        whyItMatters: `Many beginners quit within weeks because they believed freelancing meant "my skill, but with flexibility". When no client appears on day one, they decide it does not work. Understanding that selling and admin are part of the job lets you plan for them and not be shocked by them.`,
        sections: [
          { title: 'The five jobs of a freelancer', body: `Every freelancer wears five hats whether she likes it or not.\n- **Specialist:** doing the skilled work well.\n- **Marketer:** making sure the right people know you exist.\n- **Salesperson:** turning interest into agreed projects.\n- **Operations manager:** contracts, invoices, schedules and files.\n- **Finance officer:** pricing, getting paid, saving for taxes and slow months.\nA useful habit is to block weekly time for each hat, not only the specialist one.` },
          { title: 'Trade-offs to accept', body: `Freelancing usually offers more control over your schedule, who you work with and what you charge. It usually removes a guaranteed monthly salary, paid leave, employer-provided equipment and benefits. Income can swing from month to month, especially early. Neither side is good or bad; the question is whether the trade suits your life right now.` },
          { title: 'Freelancing can start small and alongside a job', body: `Most successful freelancers did not quit anything on day one. They started part-time, in evenings and weekends, while a salary covered the basics. A side start lets you test whether you enjoy the work and whether clients will pay, before you depend on it.` },
        ],
        keyTerms: [{ term: 'Freelancer', def: 'An independent contractor who sells a skill directly to clients.' }, { term: 'Client', def: 'A person or business that pays you for a result.' }, { term: 'Independent contractor', def: 'Someone who works for clients under their own terms, not as an employee.' }],
        howTo: ['Write the skill you might sell, in one line.', 'Under each of the five hats, write one task you will have to do.', 'Rate yourself 1 to 5 on comfort with each hat.', 'Circle the lowest-rated hat.', 'Write one small step to practise that hat this week.', 'Write whether you will start alongside a job, and why.'],
        example: `Ngozi wants to freelance as a social media manager. Her five hats: Specialist (writing captions, planning content), Marketer (posting her own work to attract clients), Salesperson (replying to enquiries and proposing packages), Operations (scheduling calls, sending contracts), Finance (invoicing and saving for slow months). She rates Salesperson 2 out of 5, so her step this week is to send three friendly messages to people who might need help, to practise sounding confident.`,
        caseStudy: { title: 'The designer who was great at design only', situation: 'A talented graphic designer left her job to freelance full-time. Her work was excellent, but after two months she had only one client.', moves: ['She tracked her week and found she spent 90 percent of her time designing and almost none finding clients.', 'She set aside two mornings a week for outreach and follow-ups.', 'She created a simple tracking sheet for leads and invoices.'], result: 'Within three months, she had a steady pipeline and three regular clients. Her design time dropped but her income rose.', lesson: 'The skill gets you hired once. The five hats keep you hired.' },
        practice: `Complete the five-hats table for your own planned freelance skill. Write one task and one self-rating for each hat, then choose your weakest and a first step.`,
        stretch: `Ask someone who already freelances which hat surprised them most, and write down what they said.`,
        successCriteria: 'You described all five hats with a real task each and picked a specific first step for your weakest one.',
        commonMistakes: 'Believing freelancing is only the skilled work and ignoring marketing, sales, admin and finance.',
        takeaways: ['Freelancing is a one-person service business.', 'The skill is about half the job.', 'You can start small and alongside other income.'],
        knowledgeCheck: [
          Q('Freelancing is best described as:', ['A job with no boss and no work', 'A small service business with one employee', 'A guaranteed income stream', 'A hobby'], 1, 'You sell a skill and run the business around it.'),
          Q('Which is NOT one of a freelancer\'s five hats?', ['Marketer', 'Salesperson', 'Employer\'s HR manager', 'Finance officer'], 2, 'You have no employer HR; you do marketing, sales, operations and finance yourself.'),
          Q('Why do many beginners quit early?', ['The skill is too hard', 'They expected only skilled work and are shocked by selling and admin', 'Clients never exist', 'It is illegal'], 1, 'Unrealistic expectations make normal early struggles feel like failure.'),
          Q('A sensible way to start is often:', ['Quit everything immediately', 'Start part-time alongside other income', 'Wait ten years', 'Borrow heavily'], 1, 'A side start lets you test with less risk.'),
        ],
      }),

      L('ff-m1-l2', 'Freelancing vs. Employment vs. Entrepreneurship', 'concept', 22, {
        objectives: ['Compare freelancing, employment and entrepreneurship on risk, control and income', 'Explain where freelancing sits between them', 'Describe how freelancing can lead to a bigger business'],
        concept: `Employment means you trade your time for a regular salary, and your employer carries most of the business risk. Freelancing means you trade your skill for project or retainer payments and carry that risk yourself. Entrepreneurship usually means building a business that can earn without your hands doing every task, by hiring people, creating products or building systems.

Freelancing sits in the middle. It gives you more control than a job and a faster route to income than building a company from scratch, because you can sell your skill immediately. But it still trades time for money, so your income is limited by the hours you have.`,
        whyItMatters: `Understanding the differences helps you set honest expectations. If you want maximum stability, a job may fit. If you want control and are willing to carry risk, freelancing fits. If you want to build something that grows beyond your own hours, freelancing can be a stepping stone rather than the end point.`,
        sections: [
          { title: 'Comparing them side by side', body: `- **Income:** employment is steady; freelancing varies but can grow; entrepreneurship is uncertain at first and can scale.\n- **Risk:** the employer carries it in a job; you carry it as a freelancer or founder.\n- **Control:** limited in a job; high as a freelancer; highest as a founder.\n- **Speed to first income:** immediate in a job; weeks or months for freelancing; often longer for a business.\n- **Ceiling:** a job is set by the salary band; freelancing by your hours and rates; a business by its systems and team.` },
          { title: 'The freelance ladder', body: `Many freelancers grow in stages: trade time for money, raise rates, specialise, add a simple productised service, bring in a subcontractor or turn knowledge into a course or template. You do not need to climb the ladder, but knowing it exists helps you see where you might go.` },
          { title: 'Mixing models', body: `These are not strict boxes. Many people hold a job and freelance, or freelance and sell a digital product. Choose the mix that fits your season of life.` },
        ],
        keyTerms: [{ term: 'Retainer', def: 'A regular payment for ongoing availability or monthly work.' }, { term: 'Productised service', def: 'A service sold as a fixed package with a fixed scope and price.' }, { term: 'Scale', def: 'Grow income without growing your hours at the same rate.' }],
        howTo: ['Draw a table with Job, Freelance and Business.', 'Fill in income stability, risk, control, speed and ceiling for each.', 'Mark which one fits your life right now and why.', 'Mark which one you may want in three years.', 'Write the first step that connects where you are to where you want to be.'],
        example: `Ada works in a bank and wants more income. She chooses "freelance alongside a job" for the next year because she needs stability. Her three-year idea is a small digital product business, so she plans to use freelance client conversations to learn what people struggle with.`,
        practice: `Make the comparison table and write a short paragraph (4 to 6 sentences) saying which model fits you now, which you may want later, and your first connecting step.`,
        successCriteria: 'Your table is complete and your paragraph connects your present situation to a specific next step.',
        commonMistakes: 'Treating the models as all-or-nothing, or assuming freelancing has no ceiling.',
        takeaways: ['Freelancing trades skill for pay and carries its own risk.', 'It offers control but still depends on your hours.', 'It can be a stepping stone to a bigger business.'],
        knowledgeCheck: [
          Q('A freelancer\'s income ceiling is mainly limited by:', ['Her employer', 'Her hours and rates', 'The government', 'Nothing'], 1, 'Trading time for money limits earnings unless you raise rates or add leverage.'),
          Q('Who carries the business risk in a job?', ['The employee mostly', 'The employer mostly', 'Nobody', 'The customers'], 1, 'Employees are paid regardless of whether the business wins each client.'),
          Q('A productised service is:', ['A free sample', 'A service sold as a fixed package and price', 'A physical product', 'A refund policy'], 1, 'Fixed scope and price makes selling and delivering simpler.'),
          Q('Which statement is true?', ['You must choose only one model forever', 'You can combine models, such as a job plus freelancing', 'Freelancing has no risk', 'Entrepreneurship is risk-free'], 1, 'Many people mix models at different stages.'),
        ],
      }),

      L('ff-m1-l3', 'The Realistic Freelance Income Curve', 'concept', 24, {
        objectives: ['Describe the typical early stages of freelance income', 'Plan a runway so a slow start does not force you to quit', 'Avoid believing overnight-success stories'],
        concept: `Online, you will see screenshots of huge months. What you rarely see is the slow beginning. A realistic freelance start often looks like this: the first weeks involve learning, building samples and sending outreach with little or no income. The first client may take weeks or months and may pay a low beginner rate. As proof builds, referrals appear, prices rise and income becomes steadier.

There is no promised timeline. It depends on your skill, niche, effort, network and luck. Anyone who guarantees a specific income by a specific date is selling hope, not information.`,
        whyItMatters: `Expecting income immediately turns a normal slow start into a sense of failure. Knowing the usual shape of the curve helps you stay in the game long enough to benefit from compounding proof and referrals.`,
        sections: [
          { title: 'Four stages', body: `1) Setup: choosing a skill, niche, offer and building samples. 2) First clients: usually modest pay and lots of learning. 3) Momentum: testimonials, referrals and repeat work make selling easier. 4) Selectivity: you can choose better clients and raise prices. Many people quit at the end of stage one or two, just before things get easier.` },
          { title: 'Runway: how long can you keep going?', body: `Runway is how many months you can keep going if income is low. If you have a job, your runway is long. If you do not, work out your minimum monthly costs and how many months of them you can cover. Plan to keep going for at least three to six months of effort before judging results.` },
          { title: 'Metrics to watch early', body: `Early on, do not only watch income. Watch activity and leading signs: outreach messages sent, replies received, calls booked, proposals sent, samples completed. These numbers predict future income and you control them.` },
        ],
        keyTerms: [{ term: 'Runway', def: 'How long you can keep going on your savings or other income.' }, { term: 'Leading indicator', def: 'An early signal, like outreach sent, that predicts later results.' }, { term: 'Momentum', def: 'Growing ease of winning work as proof and referrals accumulate.' }],
        howTo: ['List your monthly minimum costs.', 'Write your savings or other income that can cover them.', 'Divide to estimate your runway in months.', 'Choose a review date three months out.', 'Set weekly targets for outreach, calls and samples.', 'Write what result at the review date would make you continue.'],
        template: { title: 'Runway and activity plan', intro: 'Fill in with your own numbers.', body: `Monthly minimum costs: \nSavings or other income available each month: \nEstimated runway (months): \n\nWEEKLY TARGETS\nOutreach messages sent: \nReplies hoped for: \nCalls booked: \nProposals sent: \nSample pieces completed: \n\nReview date: \nContinue if: ` },
        example: `Tola works full-time and freelances in the evenings, so her runway is long. She sets weekly targets: 10 outreach messages, 2 calls, 1 sample piece. After eight weeks she has had 6 calls, sent 3 proposals and won a small first project. Income is tiny, but her activity numbers show she is on track.`,
        caseStudy: { title: 'Quitting at month two', situation: 'A new writer sent a few pitches, heard little back, and decided freelancing did not work after eight weeks.', moves: ['A friend asked how many pitches she had sent: only 14 in two months.', 'She set a goal of 15 per week for the next six weeks and refined her message each week.', 'She followed up with everyone who had not replied.'], result: 'By week five she had booked several calls and landed a paid trial article. Her results changed because her activity changed.', lesson: 'Judge early results by the work you have actually done, not by hope or by one slow month.' },
        practice: `Fill in the runway and activity plan with real numbers and set a review date. Write what you would need to see to continue.`,
        successCriteria: 'You have a runway estimate, weekly activity targets, a review date and a clear continue condition.',
        commonMistakes: 'Judging freelancing only by income in the first month, or quitting before enough outreach has been done.',
        takeaways: ['The early curve is slow and then steadier.', 'Plan a runway and review date.', 'Track activity as well as income.'],
        knowledgeCheck: [
          Q('Runway means:', ['A race track', 'How long you can keep going on savings or other income', 'A pricing model', 'A portfolio type'], 1, 'It tells you how long you can keep trying.'),
          Q('Which is a leading indicator early on?', ['Annual income', 'Outreach messages sent', 'Retirement savings', 'Number of cars'], 1, 'Activity predicts later income and is under your control.'),
          Q('A promise of guaranteed income by a certain date is:', ['Reliable', 'Likely hype, not information', 'Required', 'A contract'], 1, 'Outcomes depend on many factors, so guarantees are suspicious.'),
          Q('Many freelancers quit:', ['After years of steady income', 'Just before momentum builds', 'Only when they win clients', 'Never'], 1, 'The slow early stages are where many give up.'),
        ],
      }),

      L('ff-m1-l4', 'The Freelance Business Loop: Skill, Niche, Offer, Proof, Pipeline, Delivery', 'concept', 22, {
        objectives: ['Describe the six-part loop that runs a freelance business', 'See how this course maps onto the loop', 'Identify the part of the loop that is currently your bottleneck'],
        concept: `A freelance business can be understood as a loop of six parts. Skill: what you can do. Niche: who you do it for. Offer: the specific, priced package you sell. Proof: evidence that you can deliver. Pipeline: a steady flow of potential clients. Delivery: doing the work well so that clients return and refer you, which feeds the pipeline again.

If any part is weak, the whole loop slows. A strong skill with no niche is hard to sell. A great offer with no proof is hard to trust. Good proof with no pipeline sits unseen. This course walks you through each part in order.`,
        whyItMatters: `When income is not growing, most beginners work harder at the part they like best. Seeing the whole loop helps you find the actual bottleneck and fix that part first.`,
        sections: [
          { title: 'Finding your bottleneck', body: `Ask: Can I describe who I help in one sentence? (niche) Can I tell a stranger exactly what they get and what it costs? (offer) Can I show real examples? (proof) Do I talk to new potential clients every week? (pipeline) Do clients leave happy and refer others? (delivery) Your first "no" is the bottleneck.` },
          { title: 'How the course maps to the loop', body: `Modules 2 and 3 cover skill and niche. Module 4 covers offers. Module 5 covers proof. Modules 6 and 7 cover the pipeline. Module 8 covers pricing. Modules 9 and 10 cover contracts, payments and delivery. The capstone brings it all into one starter system.` },
        ],
        keyTerms: [{ term: 'Pipeline', def: 'A steady flow of potential clients at different stages.' }, { term: 'Bottleneck', def: 'The weakest part that limits the whole system.' }, { term: 'Proof', def: 'Evidence you can deliver results.' }],
        howTo: ['Write the six parts in a row.', 'Next to each, write a yes or no using the questions above.', 'Circle the first no.', 'Write why it is weak.', 'Choose the course module that addresses it.', 'Commit to working on that module first.'],
        example: `Ada can design well (skill: yes), but when asked who she helps, she says "everyone" (niche: no). She decides to work on niche first, even though portfolio-building feels more fun, because without a niche her proof and outreach will stay vague.`,
        practice: `Run the six-part check on your planned freelance business, circle your first bottleneck and write your plan to address it.`,
        successCriteria: 'You answered all six parts honestly and chose one bottleneck with a specific next step.',
        commonMistakes: 'Polishing the part you enjoy (like the portfolio) while the real bottleneck is elsewhere.',
        takeaways: ['A freelance business is a loop of six parts.', 'The weakest part limits everything.', 'Fix the first "no" before polishing the rest.'],
        knowledgeCheck: [
          Q('Which is the correct set of loop parts?', ['Skill, niche, offer, proof, pipeline, delivery', 'Logo, website, colours, fonts, hashtags, posts', 'Price, price, price', 'Idea, hope, luck'], 0, 'These six parts form the freelance business loop.'),
          Q('A great offer but no proof mainly causes:', ['Too many clients', 'Difficulty building trust', 'Higher taxes', 'No problem'], 1, 'Without evidence, clients have to take your word for it.'),
          Q('Your bottleneck is:', ['The part you like most', 'The weakest part that limits the system', 'The newest tool', 'Your hobbies'], 1, 'Fixing the weakest part moves the system most.'),
          Q('Delivery feeds the loop because happy clients:', ['Are free', 'Repeat and refer, filling your pipeline', 'Never leave', 'Pay taxes'], 1, 'Referrals and repeat work reduce selling effort.'),
        ],
      }),

      A('ff-m1-a', [
        Q('Freelancing is best described as:', ['A job with no boss', 'A small service business with one employee', 'A guaranteed income stream', 'A hobby'], 1, 'You run the business around your skill.'),
        Q('The skilled work is usually:', ['The whole job', 'About half the job', 'None of the job', 'Irrelevant'], 1, 'Selling, admin and finance take the rest.'),
        Q('Who carries the business risk in a normal job?', ['The employee mostly', 'The employer mostly', 'Nobody', 'Customers'], 1, 'Employees are paid regardless of each client win.'),
        Q('A freelancer\'s income ceiling is mainly limited by:', ['Her employer', 'Her hours and rates', 'The weather', 'Nothing'], 1, 'Time-for-money limits earnings without leverage.'),
        Q('Runway means:', ['A race track', 'How long you can keep going on savings or other income', 'A pricing model', 'A portfolio type'], 1, 'It tells you how long you can keep trying.'),
        Q('A good early metric you control is:', ['Annual income', 'Outreach messages sent', 'Competitor revenue', 'Luck'], 1, 'Activity predicts later results.'),
        Q('Promises of guaranteed income by a date are:', ['Reliable', 'Likely hype', 'Required', 'Contracts'], 1, 'Outcomes depend on many factors.'),
        Q('The six-part loop includes:', ['Skill, niche, offer, proof, pipeline, delivery', 'Logo, fonts, colours', 'Hope, luck, time', 'Posts only'], 0, 'These parts work together.'),
        Q('Your bottleneck is:', ['The part you like most', 'The weakest part limiting the system', 'The newest tool', 'Your hobbies'], 1, 'Fix it first.'),
        Q('Many freelancers quit:', ['After years of success', 'Just before momentum builds', 'Only when they win clients', 'Never'], 1, 'The slow early stages are where many give up.'),
      ]),
    ],
  },

  /* ---------------- MODULE 2 ---------------- */
  {
    id: 'ff-m2', title: 'Choosing a Skill',
    objective: 'Pick one sellable skill to lead with, based on real market demand and your actual starting ability \u2014 not just interest.',
    lessons: [
      L('ff-m2-l1', 'What Makes a Skill Sellable', 'concept', 22, {
        objectives: ['List the four tests of a sellable skill', 'Distinguish a skill from an interest', 'Score a skill against the four tests'],
        concept: `A sellable skill is one that businesses or individuals will pay for because it solves a problem or creates a result they value. Interest alone does not make a skill sellable. You may love journaling, but that is only a service if someone pays for the outcome.

Four tests help. Demand: do people actively pay for this? Ability: can you deliver a decent result now, or within a few weeks of practice? Clarity: can the result be described in one sentence a buyer understands? Reachability: can you find the people who need it?`,
        whyItMatters: `Choosing a skill with no demand means you may work for months and find nobody to buy. Choosing a skill you cannot yet deliver leads to bad first projects and damaged confidence. The four tests guide a smart choice.`,
        sections: [
          { title: 'The four tests', body: `- **Demand:** look at job boards, freelance platforms and social posts: are people asking for this and paying?\n- **Ability:** are you at least at a beginner-delivering level, or close with focused practice?\n- **Clarity:** "I turn long videos into short clips for coaches" is clear; "I do creative stuff" is not.\n- **Reachability:** can you name where these buyers spend time?` },
          { title: 'Skills that sell tend to affect money or time', body: `Skills linked to revenue (marketing, sales support, design for ads), saving time (virtual assistance, admin, bookkeeping) or reducing stress (customer support, scheduling) usually have steady demand. Ask: what does the buyer gain or avoid?` },
          { title: 'Common categories', body: `Writing and copywriting, design and video editing, social media management, virtual assistance, customer support, bookkeeping, web building, translation, tutoring, and research. These are examples, not a complete list. The best choice depends on your starting point.` },
        ],
        keyTerms: [{ term: 'Sellable skill', def: 'A skill people pay for because it produces a valued result.' }, { term: 'Demand', def: 'Evidence that people actively pay for something.' }, { term: 'Reachability', def: 'How easily you can find and contact buyers.' }],
        howTo: ['List five skills you could sell.', 'Score each 1 to 5 on demand, ability, clarity and reachability.', 'Add the scores.', 'Circle the top two.', 'Write why they scored well.', 'Note what evidence you used for demand.'],
        template: { title: 'Skill scoring table', intro: 'Copy into a sheet.', body: `Skill | Demand (1-5) | Ability now (1-5) | Clarity (1-5) | Reachability (1-5) | Total | Evidence for demand\n\nExample:\nShort-form video editing | 5 | 3 | 5 | 4 | 17 | Many creator job posts mention editing` },
        example: `Amara scores five skills. Bookkeeping: demand 4, ability 2, clarity 5, reachability 3, total 14. Social media management: demand 5, ability 4, clarity 4, reachability 5, total 18. Virtual assistance: demand 5, ability 4, clarity 4, reachability 4, total 17. She picks social media management first.`,
        practice: `Complete the skill scoring table with at least five skills and write one sentence of evidence for the demand of your top two.`,
        successCriteria: 'You scored with real evidence for demand, not hunches, and chose your top two.',
        commonMistakes: 'Choosing a skill only because it is trendy or because you enjoy it, without checking demand.',
        takeaways: ['A sellable skill passes demand, ability, clarity and reachability.', 'Interest alone is not enough.', 'Back demand with evidence.'],
        knowledgeCheck: [
          Q('Which is NOT one of the four tests?', ['Demand', 'Ability', 'Clarity', 'Favourite colour'], 3, 'Colour has nothing to do with whether a skill sells.'),
          Q('Reachability means:', ['How tall you are', 'Whether you can find and contact buyers', 'How fast you type', 'Your location'], 1, 'If you cannot reach buyers, demand does not help you.'),
          Q('Why check demand with evidence?', ['It is a rule', 'To avoid working on something nobody pays for', 'To impress friends', 'It is free'], 1, 'Evidence reduces the risk of wasted effort.'),
          Q('Which is clearer?', ['"I do creative stuff"', '"I turn long videos into short clips for coaches"', '"I help"', '"Many things"'], 1, 'A specific result is easy for buyers to understand.'),
        ],
      }),

      L('ff-m2-l2', 'Auditing What You Already Have', 'workshop', 28, {
        objectives: ['Inventory your skills, experience and resources', 'Find hidden strengths from work, school and life', 'Turn the audit into a short list of sellable options'],
        concept: `You probably have more sellable material than you think. A skills audit lists what you can already do, what you have done before, what people ask you for help with, what tools you know, and what resources you have such as time, equipment and contacts.

Do not dismiss everyday abilities. Organising an event, managing a family business, answering customer complaints at a shop, or editing videos for fun are all real experience that can become a service for the right client.`,
        whyItMatters: `Starting from what you already have shortens the time to your first paid project. It also gives you credible stories to tell clients, which is better than starting from zero.`,
        sections: [
          { title: 'Five audit questions', body: `1) What have I been paid or thanked for? 2) What do friends and colleagues ask me for help with? 3) What tools or software can I already use? 4) What did I do in past jobs, school or volunteering that others found hard? 5) What could I learn to a useful level in four to six weeks?` },
          { title: 'Resources and constraints', body: `List your time per week, equipment (phone, laptop, internet reliability), budget, languages, time zone and contacts. Constraints are not failures; they simply shape which services are realistic. For example, unreliable power or internet may mean choosing work with flexible deadlines and building in buffers.` },
          { title: 'From audit to options', body: `Look for overlaps between what you can do, what you enjoy tolerating, and what people pay for. Choose three promising options to carry into the next lesson.` },
        ],
        keyTerms: [{ term: 'Skills audit', def: 'A structured list of your abilities, experience and resources.' }, { term: 'Transferable skill', def: 'A skill from one setting that is useful in another.' }],
        howTo: ['Answer the five audit questions in writing.', 'List your weekly time and equipment.', 'List languages, time zone and contacts.', 'Underline anything that appears in more than one answer.', 'Turn the underlined items into three service ideas.', 'Write one sentence of proof for each idea.'],
        template: { title: 'Skills audit sheet', intro: 'Answer in bullet points.', body: `1. Things I've been paid or thanked for:\n2. Things people ask me for help with:\n3. Tools and software I can use:\n4. Past experience others found hard:\n5. What I could learn to a useful level in 4-6 weeks:\n\nRESOURCES\nHours per week: \nEquipment and internet reliability: \nLanguages: \nTime zone: \nContacts who might need help: \n\nTHREE SERVICE IDEAS (with one sentence of proof each):\n1.\n2.\n3.` },
        example: `Tola listed: managed a church social media page for two years, organises family events, uses Canva daily, speaks English and Yoruba, free evenings. Overlap: social media, organisation, design basics. Service ideas: social media management for small businesses, event content design, and virtual assistance for event planners.`,
        practice: `Complete the audit sheet fully and write three service ideas with proof for each.`,
        successCriteria: 'Your audit has real entries in every section and your three ideas each have proof from your own life.',
        commonMistakes: 'Dismissing everyday experience as "not real" and starting from zero when you do not need to.',
        takeaways: ['You likely have more to offer than you think.', 'Constraints shape options; they do not end them.', 'Look for overlaps to find ideas.'],
        knowledgeCheck: [
          Q('A skills audit is:', ['A tax inspection', 'A structured list of abilities, experience and resources', 'A job interview', 'A contract'], 1, 'It maps what you already have.'),
          Q('Everyday experience like managing a page:', ['Does not count', 'Can be valid proof for a service', 'Is illegal', 'Is irrelevant'], 1, 'Real experience can support a service.'),
          Q('Constraints such as unreliable internet should:', ['End your plans', 'Shape which services and deadlines are realistic', 'Be hidden', 'Be ignored'], 1, 'Plan around constraints with buffers.'),
          Q('Overlaps across audit answers point to:', ['Mistakes', 'Strong candidate services', 'Nothing', 'Taxes'], 1, 'Repeated themes show real strengths.'),
        ],
      }),

      L('ff-m2-l3', 'Choosing One Skill to Lead With (Not Five)', 'concept', 22, {
        objectives: ['Explain why leading with one skill speeds up results', 'Choose a lead skill with a decision rule', 'Plan how to add other skills later'],
        concept: `Beginners often list five services: "I do design, writing, social media, video editing and virtual assistance." It feels safe, but it confuses buyers and weakens your marketing. A client wants to know exactly what you do for them. One clear lead skill is easier to explain, easier to refer and easier to get good at.

You can add other skills later. In fact, once you have a happy client for your lead skill, adding related services is usually simple because the trust is already there.`,
        whyItMatters: `A narrow focus builds expertise faster, makes your outreach clearer and makes it easier for others to remember and recommend you. Spreading across five skills spreads your learning, your samples and your attention too thin.`,
        sections: [
          { title: 'A decision rule', body: `Use your scoring table. Prefer the skill with the highest total. If two are tied, choose the one with the fastest path to a paid first project, or the one where you can create samples quickest. Commit to your lead skill for at least 90 days before reconsidering.` },
          { title: 'The "and later" list', body: `Keep other ideas on a list called "later". Writing them down removes the pressure to do everything now. Review the list after 90 days or after you have a few clients.` },
          { title: 'Related add-ons', body: `Natural add-ons grow from your lead skill. A video editor can add thumbnails or captions. A social media manager can add content design or email newsletters. Offer add-ons to existing clients first.` },
        ],
        keyTerms: [{ term: 'Lead skill', def: 'The single skill you sell first and most clearly.' }, { term: 'Add-on', def: 'A related service offered after trust is built.' }],
        howTo: ['Review your skill scoring table.', 'Pick the highest-scoring skill or apply the tie-break rule.', 'Write a one-line description of your lead skill and its result.', 'Move other ideas onto your "later" list.', 'List two natural add-ons for the future.', 'Set a date 90 days from now to review.'],
        example: `Amara chooses social media management as her lead skill. "Later" list: copywriting, email newsletters, virtual assistance. Add-on ideas: content design in Canva, monthly analytics reports. Review date: 90 days from today.`,
        practice: `Choose your lead skill, write its one-line result, create your "later" list and set your review date.`,
        successCriteria: 'You committed to one lead skill, with a clear one-line result and a 90-day review date.',
        commonMistakes: 'Offering five services at once and attracting none.',
        takeaways: ['One lead skill is clearer and faster.', 'Keep a "later" list.', 'Add related services after trust is built.'],
        knowledgeCheck: [
          Q('Why lead with one skill?', ['It is cheaper', 'It is clearer for buyers and faster to master', 'Platforms require it', 'It avoids work'], 1, 'Focus helps both selling and learning.'),
          Q('The "later" list is for:', ['Deleting ideas', 'Parking other ideas without losing them', 'Hiding mistakes', 'Tracking money'], 1, 'It reduces pressure to do everything now.'),
          Q('Natural add-ons usually come:', ['Before your first client', 'After trust is built with your lead skill', 'Never', 'From unrelated fields'], 1, 'Existing clients are the easiest to sell related services to.'),
          Q('How long should you commit before reconsidering?', ['One day', 'About 90 days', 'Ten years', 'Never'], 1, 'Give a fair test period.'),
        ],
      }),

      L('ff-m2-l4', 'Researching Real Market Demand and Price Ranges', 'how-to', 26, {
        objectives: ['Use free sources to confirm demand for your chosen skill', 'Collect real price ranges from the market', 'Write a short demand summary you can act on'],
        concept: `Before you commit to a skill, check that real people are paying for it. You can do this for free. Read freelance platform job posts and listings, search social media and groups for people asking for help, look at what established freelancers charge and how they describe their services, and read job descriptions for related roles.

You are looking for three things: how many requests there are, what exactly buyers ask for (and in what words), and what they pay. Record them in a sheet so you can see patterns rather than relying on memory.`,
        whyItMatters: `Evidence stops you from building on hope. It also gives you the exact language buyers use, which you can reuse in your offers and pitches, and an honest sense of beginner price ranges.`,
        sections: [
          { title: 'Where to look', body: `- Freelance platforms and job boards: read recent posts for your skill.\n- Social groups and communities: look for "Can anyone recommend someone to..." posts.\n- Competitor and peer websites: how do they describe services and packages?\n- Job listings for employees in the same field: they reveal which tasks businesses value.` },
          { title: 'What to record', body: `For at least 30 listings or posts, note the task requested, the industry of the buyer, the wording used, the budget if shown, the time frame, and any tools required. After 30 entries, patterns will be clear.` },
          { title: 'Reading price information carefully', body: `Prices vary a lot by country, experience and client type. Treat ranges as rough signals. Note that some listings are low-paying or unrealistic, and some clients target freelancers from certain countries with lower budgets. You choose which market to aim for, and that choice shapes your pricing.` },
        ],
        keyTerms: [{ term: 'Demand evidence', def: 'Real examples of people asking for or paying for a service.' }, { term: 'Price range', def: 'The spread of prices seen in the market.' }],
        howTo: ['Choose your lead skill.', 'Collect 30 real listings or requests from at least three sources.', 'Record task, buyer type, wording, budget and tools in a sheet.', 'Highlight the three most common tasks.', 'Note the lowest, middle and highest budgets you saw.', 'Write a three-sentence demand summary.'],
        template: { title: 'Demand research sheet', intro: 'One row per listing or request.', body: `Source | Task requested | Buyer type | Exact wording | Budget (if shown) | Timeframe | Tools needed\n\nDEMAND SUMMARY\nMost common tasks: \nTypical buyers: \nPrice range seen (low / middle / high): \nWords buyers use that I can reuse: \nMy conclusion (go, adjust or reconsider): ` },
        example: `A researcher collects 32 posts for social media management. Most requests are for weekly content planning and captions for small shops. Budgets range widely. Buyers repeatedly say "consistent posting" and "someone who understands our brand". She concludes demand is strong, and plans to describe her service in those words.`,
        practice: `Collect at least 30 real examples for your lead skill, complete the sheet and write your demand summary with a go, adjust or reconsider decision.`,
        successCriteria: 'Your sheet has 30 sourced entries, three common tasks, a price range and a clear conclusion.',
        commonMistakes: 'Basing the choice on one impressive listing or on opinions instead of a pattern of evidence.',
        takeaways: ['Check demand with real listings.', 'Record exact wording and budgets.', 'Treat prices as rough signals and choose your target market.'],
        knowledgeCheck: [
          Q('How many examples did the lesson suggest collecting?', ['About 3', 'About 30', 'About 3,000', 'None'], 1, 'Thirty entries are enough for patterns to show.'),
          Q('Why record buyer wording?', ['To copy their grammar errors', 'To reuse their language in your offers and pitches', 'It is required', 'To avoid reading'], 1, 'Matching buyer language builds trust.'),
          Q('Price ranges in listings should be treated as:', ['Exact', 'Rough signals', 'Irrelevant', 'Guarantees'], 1, 'Prices vary by market, experience and client.'),
          Q('If research shows little demand you should:', ['Ignore it', 'Adjust or reconsider the skill or niche', 'Quit forever', 'Lower all prices'], 1, 'Evidence is meant to guide decisions.'),
        ],
      }),

      A('ff-m2-a', [
        Q('Which is NOT one of the four tests of a sellable skill?', ['Demand', 'Ability', 'Clarity', 'Favourite colour'], 3, 'Colour does not decide whether a skill sells.'),
        Q('Reachability means:', ['How tall you are', 'Whether you can find and contact buyers', 'Typing speed', 'Your age'], 1, 'Without reach, demand does not help you.'),
        Q('A skills audit is:', ['A tax inspection', 'A structured inventory of abilities, experience and resources', 'A contract', 'A job interview'], 1, 'It shows what you already have.'),
        Q('Everyday experience such as running a page:', ['Does not count', 'Can be valid proof for a service', 'Is illegal', 'Is irrelevant'], 1, 'Real experience can support a service.'),
        Q('Why lead with one skill?', ['It is cheaper', 'It is clearer and faster to master', 'Platforms require it', 'It avoids work'], 1, 'Focus helps selling and learning.'),
        Q('A "later" list is for:', ['Deleting ideas', 'Parking other ideas', 'Hiding mistakes', 'Tracking money'], 1, 'It reduces pressure to do everything now.'),
        Q('How long should you commit to a lead skill before reconsidering?', ['One day', 'About 90 days', 'Ten years', 'Never'], 1, 'Give a fair test period.'),
        Q('Demand research should collect about:', ['3 examples', '30 examples from several sources', 'No examples', 'Only one platform'], 1, 'Patterns need enough data.'),
        Q('Prices seen in listings should be treated as:', ['Exact', 'Rough signals', 'Guarantees', 'Irrelevant'], 1, 'They vary by market and client.'),
        Q('A clear skill statement is:', ['"I do creative stuff"', '"I turn long videos into short clips for coaches"', '"I help"', '"Many things"'], 1, 'A specific result is easy to understand.'),
      ]),
    ],
  },

  /* ---------------- MODULE 3 ---------------- */
  {
    id: 'ff-m3', title: 'Choosing a Niche',
    objective: 'Narrow from "a skill" to "a skill for a specific type of client" so your marketing, pricing, and referrals all get easier.',
    lessons: [
      L('ff-m3-l1', 'Why Niching Down Feels Risky But Isn\u2019t', 'concept', 22, {
        objectives: ['Explain what a niche is and why it helps beginners', 'Answer the fear that niching loses clients', 'Describe how a niche can widen over time'],
        concept: `A niche is the specific type of client or problem you focus on. "Social media management" is a skill. "Social media management for independent beauty salons" is a skill plus a niche. The second is easier to explain, easier to market to and easier to remember.

Niching feels risky because it seems like you are turning people away. In practice, a general message speaks to nobody in particular, while a specific message makes the right person think, "This is for me." Referrals also work better: it is easy to say "she is the one who helps salons with Instagram", but hard to refer someone who does "a bit of everything".`,
        whyItMatters: `Specialists are usually trusted more and can charge more than generalists, because they appear to understand the buyer's world. A niche also makes learning faster, since you see the same problems repeatedly and build reusable templates.`,
        sections: [
          { title: 'What a niche can be built on', body: `A niche can be an industry (restaurants, fitness coaches, real estate agents), a type of client (solo founders, nonprofits, busy professionals), a specific problem (late invoices, low website conversions) or a platform or tool (Shopify stores, Notion setups). Pick the angle you can explain in one clear phrase.` },
          { title: 'Answering the fear', body: `"If I choose salons, I will miss everyone else." You will, but you were not winning those clients anyway with a vague message. A niche does not forbid other work. If a barber messages you, you can still help. The niche simply decides who you market to first.` },
          { title: 'Niches can evolve', body: `Most freelancers refine their niche over time. You might start with salons, then discover you enjoy and succeed with wellness businesses in general, and widen. Treat your first niche as a hypothesis to test, not a life sentence.` },
        ],
        keyTerms: [{ term: 'Niche', def: 'The specific type of client or problem you focus on.' }, { term: 'Generalist', def: 'Someone who offers a broad range of services to many types of clients.' }, { term: 'Specialist', def: 'Someone known for solving one type of problem for one type of client.' }],
        howTo: ['Write your lead skill.', 'List three possible client types for it.', 'For each, write the problem they pay to solve.', 'Write one sentence you could say to each that would make them think "that is me".', 'Circle the most promising.', 'Write one fear about narrowing and your answer to it.'],
        example: `Amara's lead skill is social media management. Client types: independent salons, restaurants, online fashion brands. Her salon sentence: "I help independent salons fill their appointment books with Instagram content." She circles salons because she knows several salon owners and understands their problems.`,
        caseStudy: { title: 'From "everything" to "salons"', situation: 'A new freelancer posted that she did "social media, design, writing and admin for anyone". After two months she had no clients.', moves: ['She chose one skill, social media, and one client type, salons, based on people she already knew.', 'She rewrote her profile: "I help salons get booked through Instagram."', 'She messaged ten salon owners offering a free audit of their page.'], result: 'Three owners replied. One became her first paid client, and that client referred her to two friends.', lesson: 'A specific message gets replies where a general one gets silence.' },
        practice: `List three possible niches for your lead skill with the problem each pays to solve, write a "that is me" sentence for each, and circle the best.`,
        stretch: `Say your niche sentence aloud to a friend and ask what they think you do.`,
        successCriteria: 'You have three niche options, each tied to a real problem, and one chosen with a clear sentence.',
        commonMistakes: 'Refusing to choose a niche because of fear of missing out.',
        takeaways: ['A niche is a skill plus a specific client or problem.', 'Specific messages and referrals work better.', 'Niches can widen later.'],
        knowledgeCheck: [
          Q('A niche is:', ['A broad market', 'The specific type of client or problem you focus on', 'A kind of tool', 'A price list'], 1, 'It narrows who you serve and what problem you solve.'),
          Q('Why are specific messages stronger?', ['They are longer', 'The right person thinks "this is for me"', 'Platforms prefer them', 'They are cheaper'], 1, 'Relevance prompts replies.'),
          Q('Choosing a niche means:', ['You can never work with others', 'You decide who you market to first', 'You must quit other work', 'You cannot raise prices'], 1, 'Niches focus marketing; they do not forbid other work.'),
          Q('A good way to treat your first niche is:', ['As a life sentence', 'As a hypothesis to test and refine', 'As irrelevant', 'As a secret'], 1, 'Most freelancers refine over time.'),
        ],
      }),

      L('ff-m3-l2', 'How to Choose a Niche', 'how-to', 26, {
        objectives: ['Use a scoring method to compare niche options', 'Weigh your own knowledge, buyer budget and access', 'Make a decision and set a test period'],
        concept: `Choosing a niche does not need to be mysterious. Score your options on four factors: Problem (do they have an urgent, costly or annoying problem you can solve?), Budget (do they have money and a habit of paying for help?), Access (can you reach them, and do you already know someone in that world?), and Interest (can you tolerate learning about their world for a year?).

The best beginner niche is rarely the most glamorous. It is often one where you have some insider knowledge or contacts, because that cuts the time to your first client.`,
        whyItMatters: `A niche with a painful problem and available budget makes selling easier and pricing healthier. A niche with no budget leaves you working for little, however skilled you are.`,
        sections: [
          { title: 'The four-factor score', body: `- **Problem:** urgent, expensive or frustrating for them.\n- **Budget:** they already pay for help in this area.\n- **Access:** you can reach them or know someone who can introduce you.\n- **Interest:** you do not mind learning their language.\nScore each 1 to 5 and add them up. A niche that scores high on problem and budget but low on interest may still work if you treat it as a business. A niche that scores low on budget usually does not.` },
          { title: 'Signs of a budget', body: `Businesses that sell high-value products, those that compete heavily for customers online, or those that already hire freelancers show a habit of paying. Hobby projects and tiny budgets can be wonderful but should not be your only niche unless the income truly matches your needs.` },
          { title: 'Start where you have access', body: `If you know three bakers, bakery owners are a faster first niche than an industry you have never met. Access shortens the sales cycle because warm introductions beat cold messages.` },
        ],
        keyTerms: [{ term: 'Access', def: 'Your ability to reach and be introduced to buyers in a niche.' }, { term: 'Budget', def: 'Money a group of buyers already spend on help like yours.' }],
        howTo: ['List five possible niches.', 'Score each 1 to 5 on problem, budget, access and interest.', 'Add the totals.', 'Rank them.', 'Check the top choice for budget evidence.', 'Set a 90-day test with a success measure.'],
        template: { title: 'Niche scoring table', intro: 'Copy into a sheet.', body: `Niche | Problem (1-5) | Budget (1-5) | Access (1-5) | Interest (1-5) | Total | Evidence of budget\n\nExample:\nIndependent salons | 4 | 3 | 5 | 4 | 16 | Many already pay for ads and photography\n\nMY CHOSEN NICHE: \n90-DAY TEST: I will contact __ people and aim for __ paid projects by ______.` },
        example: `Tola scores salons (16), online fashion brands (15) and fitness coaches (14). She chooses salons because she scored highest on access. Her 90-day test: contact 30 salon owners and aim for two paid projects.`,
        practice: `Complete the niche scoring table, rank at least five niches, choose one, and write your 90-day test.`,
        successCriteria: 'Your table has evidence of budget for the top choice and a measurable 90-day test.',
        commonMistakes: 'Choosing a niche with no budget because it sounds exciting.',
        takeaways: ['Score problem, budget, access and interest.', 'Access shortens the path to a first client.', 'Test for 90 days with a measure.'],
        knowledgeCheck: [
          Q('Which factor means "can you reach them"?', ['Problem', 'Budget', 'Access', 'Interest'], 2, 'Access is your ability to reach and be introduced to buyers.'),
          Q('A niche with low budget will usually:', ['Pay well', 'Make decent income difficult', 'Have no problems', 'Be easy to sell'], 1, 'Buyers who do not pay for help limit your income.'),
          Q('A strong sign of budget is that buyers:', ['Have a hobby', 'Already pay for help in this area', 'Like your photos', 'Live nearby'], 1, 'Existing spending shows willingness to pay.'),
          Q('Why start where you have access?', ['It is cheaper', 'Warm introductions beat cold messages', 'It is required', 'It avoids research'], 1, 'Warm leads convert more easily.'),
        ],
      }),

      L('ff-m3-l3', 'Writing Your Niche Statement', 'workshop', 28, {
        objectives: ['Write a one-sentence niche statement with a clear client, problem and result', 'Test it with real people', 'Use it on your profile and in outreach'],
        concept: `A niche statement is a short sentence that says who you help, with what, and what result they get. A classic formula: "I help [specific client] [achieve specific result] through [your service]." For example: "I help independent salons fill their appointment books through consistent Instagram content."

A good statement passes the "stranger test": someone who does not know you can read it and tell you what you do, for whom. If they cannot, it is too vague.`,
        whyItMatters: `Your niche statement is the seed for your profile bio, your portfolio headline, your outreach message and your elevator pitch. Writing it once and testing it saves effort everywhere else.`,
        sections: [
          { title: 'The formula and variations', body: `Formula: "I help [client] [result] through [service]." Variation with problem: "Salon owners struggling to get bookings hire me to run their Instagram." Keep it free of jargon and specific about the result. Avoid empty words like "passionate", "creative" and "solutions".` },
          { title: 'The stranger test', body: `Read your statement to three people who do not know your work. Ask: "What do I do, and who do I do it for?" If their answer is wrong or vague, revise. This takes ten minutes and prevents months of confusing messaging.` },
          { title: 'Where to use it', body: `Use it as the headline of your portfolio, the first line of your social bio, the opening of your outreach messages and the answer when someone asks, "So what do you do?"` },
        ],
        keyTerms: [{ term: 'Niche statement', def: 'A one-sentence description of who you help and the result you deliver.' }, { term: 'Stranger test', def: 'Checking whether someone unfamiliar can correctly say what you do.' }],
        howTo: ['Write the formula with your niche.', 'Write three versions with different wording.', 'Remove jargon and filler words.', 'Run the stranger test on three people.', 'Revise using their answers.', 'Write the final version in your bio and portfolio headline.'],
        template: { title: 'Niche statement workshop', intro: 'Draft three versions then test.', body: `Formula: I help [specific client] [specific result] through [service].\n\nVersion 1:\nVersion 2:\nVersion 3:\n\nSTRANGER TEST\nPerson 1 said I do: \nPerson 2 said I do: \nPerson 3 said I do: \n\nFINAL STATEMENT:\nWhere I will use it (bio, portfolio headline, outreach): ` },
        example: `Version 1: "I am a passionate creative who does social media." (vague). Version 2: "I help salons with social media." (better). Version 3: "I help independent salons fill their appointment books through Instagram content." Strangers repeat Version 3 correctly, so it wins.`,
        practice: `Write three versions, test with three people, choose a final and place it in a bio and headline.`,
        successCriteria: 'Three strangers could correctly say who you help and how, and your final version is used in your bio.',
        commonMistakes: 'Using vague words like "passionate" and "creative" instead of a concrete result.',
        takeaways: ['A niche statement names client, result and service.', 'Test it on strangers.', 'Use it everywhere you introduce yourself.'],
        knowledgeCheck: [
          Q('A niche statement should include:', ['Client, result and service', 'Only your name', 'Only your price', 'A long story'], 0, 'It says who you help and what they get.'),
          Q('The stranger test checks whether:', ['Strangers like you', 'Someone unfamiliar can correctly say what you do', 'You are famous', 'You are cheap'], 1, 'Clarity is the goal.'),
          Q('Which is stronger?', ['"Passionate creative"', '"I help independent salons fill their appointment books through Instagram"', '"Many solutions"', '"Whatever you need"'], 1, 'It is specific with a clear result.'),
          Q('Where should you use your niche statement?', ['Nowhere', 'Bio, portfolio headline and outreach', 'Only on invoices', 'Only in private'], 1, 'Consistency builds recognition.'),
        ],
      }),

      L('ff-m3-l4', 'Validating Your Niche With Real Conversations', 'how-to', 26, {
        objectives: ['Plan five short conversations with people in your niche', 'Ask questions that reveal real problems and budgets', 'Decide whether to keep, adjust or change the niche'],
        concept: `Scoring tables are guesses until you speak to real people. A short, friendly conversation with five people in your niche will teach you more than hours of research. You are not selling. You are learning how they think, what frustrates them, what they have tried and what they spend.

Ask about the past, not the future. "Would you hire someone to do this?" invites polite lies. "Tell me about the last time you tried to solve this" invites facts.`,
        whyItMatters: `Validation protects you from spending months preparing for a market that does not want your service. It also gives you real words and real objections you can use in your offer and outreach, and often turns into your first leads.`,
        sections: [
          { title: 'Good questions', body: `- "Walk me through how you handle [task] today."\n- "What is the most frustrating part?"\n- "Have you ever paid someone to help? What happened?"\n- "What would a great result look like?"\n- "What did you try that did not work?"\nAvoid questions that suggest the answer or pitch your service. Listen more than you talk.` },
          { title: 'Reading the answers', body: `Look for repeated frustrations, evidence that they have paid for help before, and clear descriptions of a good result. If nobody has ever paid for help and nobody seems bothered by the problem, the niche may be weak. If several people describe the same costly problem, you have found something.` },
          { title: 'Being respectful', body: `Ask for ten minutes, say clearly that you are researching and not selling, and thank people. Offer to share what you learn. Kindness opens doors and creates goodwill that may turn into referrals later.` },
        ],
        keyTerms: [{ term: 'Validation', def: 'Checking with real people that a problem and a budget exist.' }, { term: 'Leading question', def: 'A question that hints at the answer you want.' }],
        howTo: ['List five people in your niche you can reach or be introduced to.', 'Write a short, respectful request for ten minutes.', 'Prepare five open questions.', 'Hold the conversations and take notes in their exact words.', 'Highlight repeated frustrations and budget signals.', 'Decide: keep, adjust or change the niche, and write why.'],
        template: { title: 'Conversation request and notes sheet', intro: 'Personalise the message.', body: `REQUEST\nHi [name], I'm researching how [type of business] handle [task]. Could I ask you a few questions for ten minutes? I'm not selling anything, and I'd be happy to share what I learn. Thank you!\n\nQUESTIONS\n1. Walk me through how you handle [task] today.\n2. What is the most frustrating part?\n3. Have you paid anyone to help? What happened?\n4. What would a great result look like?\n5. What have you tried that did not work?\n\nNOTES (exact words)\nPerson | Frustration | Paid before? | Great result | Quote\n\nDECISION: keep / adjust / change, because ` },
        example: `After five conversations with salon owners, four mention that posting consistently is their biggest struggle, and three have paid someone before with mixed results. The niche is validated. A common phrase: "I do not have time to post". She will use that in her outreach.`,
        practice: `Hold at least three real conversations (five if you can) using the template and write your decision with the evidence.`,
        successCriteria: 'You recorded real quotes and made a keep, adjust or change decision based on them.',
        commonMistakes: 'Pitching during the conversation or asking leading questions that produce polite lies.',
        takeaways: ['Talk to real people before committing.', 'Ask about the past, not hypotheticals.', 'Repeated frustrations and past spending signal a real market.'],
        knowledgeCheck: [
          Q('Which question is least leading?', ['Would you hire me?', 'Tell me about the last time you handled this task.', 'You would love this, right?', 'Do you agree it is great?'], 1, 'Questions about past behaviour reveal facts.'),
          Q('Validation means:', ['Guessing', 'Checking with real people that a problem and budget exist', 'Buying ads', 'Copying a competitor'], 1, 'It replaces assumptions with evidence.'),
          Q('Which is a good sign?', ['Nobody cares about the problem', 'Several people describe the same costly problem', 'Everyone changes the subject', 'Nobody has time'], 1, 'Repeated, costly problems indicate demand.'),
          Q('During validation conversations you should:', ['Pitch hard', 'Listen more than you talk and say you are not selling', 'Record without asking', 'Argue'], 1, 'Learning, not selling, is the goal.'),
        ],
      }),

      A('ff-m3-a', [
        Q('A niche is:', ['A broad market', 'The specific type of client or problem you focus on', 'A kind of tool', 'A price list'], 1, 'It narrows who you serve.'),
        Q('Why are specific messages stronger?', ['They are longer', 'The right person thinks "this is for me"', 'Platforms prefer them', 'They are cheaper'], 1, 'Relevance prompts replies.'),
        Q('Which is NOT a way to build a niche?', ['Industry', 'Client type', 'Specific problem', 'Random guess with no research'], 3, 'Niches should be grounded in real problems and clients.'),
        Q('Which factor means "can you reach them"?', ['Problem', 'Budget', 'Access', 'Interest'], 2, 'Access shortens your path to clients.'),
        Q('A niche with low budget will usually:', ['Pay well', 'Make decent income difficult', 'Have no problems', 'Sell itself'], 1, 'Buyers who do not pay limit income.'),
        Q('A niche statement names:', ['Client, result and service', 'Only your name', 'Only your price', 'A long story'], 0, 'It says who you help and what they get.'),
        Q('The stranger test checks:', ['Whether strangers like you', 'Whether someone unfamiliar can correctly say what you do', 'Whether you are famous', 'Your price'], 1, 'Clarity is the goal.'),
        Q('Which question is least leading?', ['Would you hire me?', 'Tell me about the last time you handled this.', 'You would love this, right?', 'Do you agree it is great?'], 1, 'Past behaviour gives facts.'),
        Q('A good sign during validation is:', ['Nobody cares', 'Several people describe the same costly problem', 'Everyone changes subject', 'No answers'], 1, 'Repeated costly problems show demand.'),
        Q('A first niche should be treated as:', ['A life sentence', 'A hypothesis to test and refine', 'Irrelevant', 'A secret'], 1, 'Most freelancers refine over time.'),
      ]),
    ],
  },

  /* ---------------- MODULE 4 ---------------- */
  {
    id: 'ff-m4', title: 'Creating Offers',
    objective: 'Turn a skill + niche into a specific, priced offer a client can say yes to without needing it explained twice.',
    lessons: [
      L('ff-m4-l1', 'Skill vs. Offer', 'concept', 22, {
        objectives: ['Explain the difference between a skill and an offer', 'Rewrite a skill as a result-based offer', 'Describe why clients buy outcomes, not hours'],
        concept: `A skill is what you can do: "I can edit videos." An offer is a specific package with a clear result, scope and price that a client can say yes to: "I turn one long video into five short clips with captions, delivered in five days, for a fixed price." Clients rarely buy skills. They buy outcomes: more bookings, fewer hours spent, a cleaner brand, a problem gone.

Offers lower the effort for the buyer. They do not need to work out what to ask for, how long it will take or what it costs. That clarity makes a yes much easier.`,
        whyItMatters: `A freelancer who only says "I do video editing, message me for a quote" makes the client do the thinking. A freelancer with a clear offer makes the decision simple. That is often the difference between a reply and silence.`,
        sections: [
          { title: 'Features and outcomes', body: `Features describe what you do (editing, captions, scheduling). Outcomes describe what the client gets (more views, more time, consistent posts). Lead with the outcome and mention the features as proof. "Consistent weekly posts so your salon stays visible, including captions and scheduling" beats "social media management services".` },
          { title: 'Why vague offers fail', body: `"Contact me for rates" implies uncertainty and forces a long conversation. A defined package communicates confidence and respects the client's time. You can still customise for special cases, but start with a clear default.` },
        ],
        keyTerms: [{ term: 'Offer', def: 'A specific package with a clear result, scope and price.' }, { term: 'Outcome', def: 'The result the client actually wants.' }, { term: 'Deliverable', def: 'A concrete thing you hand over.' }],
        howTo: ['Write your lead skill.', 'Write three outcomes clients in your niche want.', 'Choose one outcome to build around.', 'Write a one-sentence result-based offer.', 'List the deliverables.', 'Write the timeframe.'],
        example: `Skill: "I can manage Instagram." Offer: "Four posts a week, captions and scheduling for salons, so your page stays active and attracts bookings, delivered monthly." Outcome: a steady, professional presence. Deliverables: 16 posts, captions, schedule.`,
        practice: `Turn your lead skill into a one-sentence offer with outcome, deliverables and timeframe.`,
        successCriteria: 'Your offer names a result, concrete deliverables and a timeframe.',
        commonMistakes: 'Selling features and hours instead of outcomes.',
        takeaways: ['Clients buy outcomes, not skills.', 'An offer has result, scope and price.', 'Clear offers make yes easier.'],
        knowledgeCheck: [
          Q('An offer differs from a skill because it:', ['Is longer', 'Has a clear result, scope and price', 'Is free', 'Has no deliverables'], 1, 'It is a package a client can say yes to.'),
          Q('Clients usually buy:', ['Hours', 'Outcomes', 'Tools', 'Slogans'], 1, 'They want a result.'),
          Q('"Contact me for rates" often:', ['Builds confidence', 'Makes the client do extra work and may lose them', 'Is required', 'Raises prices'], 1, 'Clarity reduces friction.'),
          Q('A deliverable is:', ['A feeling', 'A concrete thing you hand over', 'A discount', 'A metric'], 1, 'Deliverables define what the client receives.'),
        ],
      }),

      L('ff-m4-l2', 'Structuring a Clear Offer', 'how-to', 28, {
        objectives: ['Build an offer with result, deliverables, timeline, process and price', 'Write an offer description a stranger can understand in 30 seconds', 'Check your offer for gaps'], 
        concept: `A clear offer has six parts: who it is for, the result, what is included (deliverables), how it works (process), how long it takes (timeline) and what it costs (price). When all six are visible, a client can decide without a long back-and-forth.

Keep it simple. Your first offer does not need to be perfect. It needs to be clear enough to test.`,
        whyItMatters: `A clear offer speeds up sales and prevents misunderstandings during the project. Many disputes later come from vague promises at the start.`,
        sections: [
          { title: 'The six parts', body: `1) **For:** the specific client. 2) **Result:** the outcome. 3) **Included:** the exact deliverables. 4) **Process:** the steps from start to finish. 5) **Timeline:** how long. 6) **Price:** a clear number or starting price. Add one line about what is not included to avoid scope confusion.` },
          { title: 'What is not included', body: `State exclusions: "Does not include paid ad management" or "Additional revisions are charged separately." Boundaries protect your time and help clients understand the scope.` },
          { title: 'Plain language test', body: `Read your offer to someone outside your field. If they cannot repeat what you do and what they get, simplify it.` },
        ],
        keyTerms: [{ term: 'Scope', def: 'The exact boundaries of what you will and will not do.' }, { term: 'Process', def: 'The steps from agreement to delivery.' }],
        howTo: ['Write who it is for.', 'Write the result in one sentence.', 'List deliverables.', 'Write the process in three to five steps.', 'Set the timeline.', 'Set the price.', 'Write two things not included.', 'Run the plain language test.'],
        template: { title: 'Offer builder', intro: 'Fill in every line.', body: `OFFER NAME: \nFOR: \nRESULT: \nINCLUDED (deliverables): \nPROCESS (3-5 steps): \nTIMELINE: \nPRICE: \nNOT INCLUDED: \nREVISIONS INCLUDED: \nHOW TO START (the one next step): ` },
        example: `OFFER: "Salon Social Starter". FOR: independent salons. RESULT: a consistent, professional Instagram presence that attracts bookings. INCLUDED: 12 posts per month with captions, scheduling, monthly summary. PROCESS: onboarding call, content plan, approval, posting, summary. TIMELINE: first posts within 7 days. PRICE: fixed monthly fee. NOT INCLUDED: paid ads or photography. REVISIONS: two rounds per batch.`,
        practice: `Complete the offer builder for your first offer and run the plain language test with one person.`,
        successCriteria: 'All six parts plus exclusions are filled, and a stranger can explain your offer back to you.',
        commonMistakes: 'Leaving out what is not included, which invites scope creep later.',
        takeaways: ['Six parts make a clear offer.', 'State what is not included.', 'Test it in plain language.'],
        knowledgeCheck: [
          Q('Which is NOT one of the six parts?', ['Who it is for', 'Timeline', 'Price', 'Your favourite colour'], 3, 'Colour is not part of an offer structure.'),
          Q('Why state exclusions?', ['To look strict', 'To prevent scope confusion', 'To lower the price', 'It is required'], 1, 'Boundaries prevent disputes.'),
          Q('Scope means:', ['The weather', 'The boundaries of what you will and will not do', 'Your location', 'Your fee'], 1, 'It defines the work.'),
          Q('The plain language test checks whether:', ['You use big words', 'An outsider can repeat what you do and what they get', 'You are famous', 'You are fast'], 1, 'Clarity is the aim.'),
        ],
      }),

      L('ff-m4-l3', 'Tiered Offers (Beginner-Friendly)', 'concept', 22, {
        objectives: ['Explain why offering three tiers can help buyers decide', 'Design a simple good-better-best structure', 'Avoid overcomplicating your first tiers'],
        concept: `A tiered offer presents the same service at three levels, for example Basic, Standard and Premium. Buyers often compare the options and pick the middle one, and sometimes pick the top option when it has clear extras. Tiers also help you meet different budgets without discounting.

For beginners, keep tiers simple. The difference between tiers should be easy to see: more deliverables, faster delivery or extra support.`,
        whyItMatters: `A single price asks the buyer to say yes or no. Three options turn the question into "which one?", which often improves the chance of a yes and increases average sale size.`,
        sections: [
          { title: 'How to design three tiers', body: `Start with your standard offer. Create a lighter version with fewer deliverables for tighter budgets, and a fuller version with more deliverables, faster turnaround or added support. Make the middle tier the one you most want to sell. Keep differences concrete, such as number of posts or revisions.` },
          { title: 'Avoid common mistakes', body: `Do not create too many options, since choice overload makes decisions harder. Do not make the cheapest tier so thin it is useless or the top tier so expensive that it looks silly. Make sure you can deliver every tier profitably.` },
        ],
        keyTerms: [{ term: 'Tiered offer', def: 'The same service sold at several levels.' }, { term: 'Anchor', def: 'A higher-priced option that makes others seem reasonable.' }],
        howTo: ['Take your standard offer.', 'Create a lighter version with fewer deliverables.', 'Create a fuller version with extras.', 'Price each so you are profitable at every level.', 'Write the differences in a simple table.', 'Choose which tier you want to be the most popular.'],
        template: { title: 'Three-tier table', intro: 'Fill in concrete differences.', body: `Tier | Basic | Standard | Premium\nPrice | | | \nDeliverables | | | \nTurnaround | | | \nRevisions | | | \nSupport | | | \nBest for | | | ` },
        example: `Basic: 8 posts per month, captions only. Standard: 12 posts, captions, scheduling and a monthly summary. Premium: 16 posts, plus stories, a strategy call and priority replies. Most salon owners choose Standard.`,
        practice: `Build your three-tier table with concrete differences and profitable pricing at each level.`,
        successCriteria: 'The differences between tiers are obvious and each tier is profitable for you.',
        commonMistakes: 'Making tiers confusing or unprofitable at the lowest level.',
        takeaways: ['Three tiers turn yes/no into which one.', 'Keep differences concrete.', 'Every tier must be profitable.'],
        knowledgeCheck: [
          Q('Tiered offers help because they:', ['Confuse buyers', 'Turn the decision into "which one?"', 'Lower prices', 'Avoid scope'], 1, 'Choice among options often improves yes rates.'),
          Q('The differences between tiers should be:', ['Vague', 'Concrete and easy to see', 'Hidden', 'Random'], 1, 'Clarity makes choosing easy.'),
          Q('You should make sure each tier is:', ['Unprofitable', 'Profitable for you', 'Free', 'Identical'], 1, 'Underpriced tiers harm your business.'),
          Q('Too many options can:', ['Help', 'Cause choice overload', 'Increase trust', 'Reduce costs'], 1, 'Simple choices are easier.'),
        ],
      }),

      L('ff-m4-l4', 'Scope, Revisions and Boundaries', 'concept', 24, {
        objectives: ['Define scope and explain scope creep', 'Set a clear revision policy', 'Write polite boundary language for your offer'],
        concept: `Scope is the agreed list of what you will deliver. Scope creep happens when a project slowly grows beyond that list without a matching increase in time or pay: "Could you also just add..." again and again. It is one of the biggest sources of stress and unpaid work in freelancing.

The solution is not to be rude. It is to be clear at the start, and kind but firm during the project. Your offer should state what is included, how many rounds of revisions are included, and what happens when requests go beyond that.`,
        whyItMatters: `Without boundaries, a profitable project can turn into low pay per hour. Clear scope also protects the client relationship, because both sides know what to expect.`,
        sections: [
          { title: 'A revision policy', body: `Decide how many revision rounds are included (often one to three). Define a round: one consolidated set of feedback, not scattered requests. State the price or hourly rate for extra rounds. Example: "Two rounds of revisions are included. Additional rounds are charged at a fixed rate."` },
          { title: 'Kind, firm boundary phrases', body: `- "I'd be glad to add that. It's outside the current scope, so here's a quick quote."\n- "That's a great idea. I can include it in a second phase."\n- "To keep the timeline on track, we'll handle that after delivery."\nUse a friendly tone and always offer a path forward, not just a no.` },
          { title: 'Change requests', body: `Treat extra requests as small change orders: describe the addition, the cost and the timeline impact, and ask for approval before starting. A written yes protects both sides.` },
        ],
        keyTerms: [{ term: 'Scope creep', def: 'Gradual growth of the project beyond the agreed scope without extra pay.' }, { term: 'Revision round', def: 'One consolidated set of feedback and changes.' }, { term: 'Change order', def: 'A written agreement to add work with a new price and timeline.' }],
        howTo: ['Decide how many revision rounds you include.', 'Write your definition of a round.', 'Set the price for extra work.', 'Write three boundary phrases in your own voice.', 'Write a change-request message template.', 'Add all of this to your offer and contract.'],
        template: { title: 'Revision policy and change request wording', intro: 'Adapt to your voice.', body: `REVISION POLICY\nIncluded: [number] rounds of revisions. A round means one consolidated set of feedback. Additional rounds: [price].\n\nCHANGE REQUEST MESSAGE\nHi [name], thanks for the idea! It's outside our current scope, which covers [list]. I can add it for [price] and it would add [time] to the timeline. Would you like me to go ahead? I'll start once you confirm.` },
        example: `A client asks for "just one more" logo variation after approving the design. The designer replies kindly: "Happy to explore another direction. It's outside the two rounds included, so it would be [price] and take two days. Shall I go ahead?" The client agrees to the extra fee.`,
        practice: `Write your revision policy, three boundary phrases and a change request template, and add them to your offer.`,
        successCriteria: 'Your policy defines rounds and extra costs, and your phrases are polite and offer a path forward.',
        commonMistakes: 'Agreeing to every small request and discovering later that the project was unprofitable.',
        takeaways: ['Define scope and revisions up front.', 'Use kind, firm language with a path forward.', 'Treat extra work as a priced change order.'],
        knowledgeCheck: [
          Q('Scope creep is:', ['A kind of insect', 'Gradual growth of the project beyond the agreed scope without extra pay', 'A discount', 'A contract type'], 1, 'Unpaid additions erode profit.'),
          Q('A revision round usually means:', ['Any message', 'One consolidated set of feedback', 'Unlimited changes', 'A refund'], 1, 'Consolidated feedback keeps the process manageable.'),
          Q('A good boundary phrase:', ['Is rude', 'Is kind, clear and offers a path forward', 'Avoids price', 'Ignores the client'], 1, 'Warm firmness keeps relationships healthy.'),
          Q('A change order is:', ['A refund', 'A written agreement to add work with new price and timeline', 'A complaint', 'A discount'], 1, 'It documents extra work and cost.'),
        ],
      }),

      A('ff-m4-a', [
        Q('An offer differs from a skill because it:', ['Is longer', 'Has a clear result, scope and price', 'Is free', 'Has no deliverables'], 1, 'It is a package a client can say yes to.'),
        Q('Clients usually buy:', ['Hours', 'Outcomes', 'Tools', 'Slogans'], 1, 'They want a result.'),
        Q('A deliverable is:', ['A feeling', 'A concrete thing you hand over', 'A discount', 'A metric'], 1, 'It defines what the client receives.'),
        Q('Why state what is NOT included?', ['To look strict', 'To prevent scope confusion', 'To lower the price', 'It is required'], 1, 'Boundaries prevent disputes.'),
        Q('The plain language test checks:', ['Big words', 'Whether an outsider can repeat what you do and what they get', 'Fame', 'Speed'], 1, 'Clarity is the aim.'),
        Q('Tiered offers help because they:', ['Confuse buyers', 'Turn the decision into "which one?"', 'Lower prices', 'Avoid scope'], 1, 'Choice among options often improves yes rates.'),
        Q('Each tier must be:', ['Unprofitable', 'Profitable for you', 'Free', 'Identical'], 1, 'Underpriced tiers harm your business.'),
        Q('Scope creep is:', ['An insect', 'Project growth beyond scope without extra pay', 'A discount', 'A contract type'], 1, 'It erodes profit and goodwill.'),
        Q('A good boundary phrase:', ['Is rude', 'Is kind, clear and offers a path forward', 'Avoids price', 'Ignores the client'], 1, 'Warm firmness keeps relationships healthy.'),
        Q('A change order is:', ['A refund', 'A written agreement to add work with new price and timeline', 'A complaint', 'A discount'], 1, 'It documents extra work.'),
      ]),
    ],
  },

  /* ---------------- MODULE 5 ---------------- */
  {
    id: 'ff-m5', title: 'Building a Portfolio',
    objective: 'Build believable proof of your skill even with zero paid clients, so you can start pitching immediately.',
    lessons: [
      L('ff-m5-l1', 'You Don\u2019t Need Paid Clients to Start a Portfolio', 'concept', 22, {
        objectives: ['List ways to create credible proof without paid clients', 'Explain the difference between spec work and unpaid work for clients', 'Plan your first three portfolio pieces'],
        concept: `Beginners often feel stuck in a loop: "I need clients to have a portfolio, and I need a portfolio to get clients." The way out is to create proof yourself. You can complete spec projects (realistic projects you invent for a made-up or real business, clearly labelled), redesign or improve something that already exists, volunteer for a cause or small business you know, or document a personal project that demonstrates your skill.

What matters to a buyer is not whether someone paid you, but whether you can show a clear problem, your process and a good result.`,
        whyItMatters: `Waiting for the perfect first client delays your start. A small set of well-presented pieces lets you begin outreach now, and gives your pitches something concrete to point to.`,
        sections: [
          { title: 'Four ways to create proof', body: `- **Spec project:** a realistic project in your niche, labelled as a sample.\n- **Improvement project:** show before-and-after on something that already exists (for example, a real page you reorganise), without claiming it was a client job. Share it respectfully, and never imply the business hired you.\n- **Volunteer or friendly project:** a small business, church or nonprofit you know, with their permission to show the work.\n- **Personal project:** something you build for yourself that proves the skill.` },
          { title: 'Honesty is non-negotiable', body: `Label spec work as spec work. Never present fake clients, fake testimonials or someone else's work as yours. Honesty protects your reputation, and clients often appreciate seeing your thinking even when the project is a sample.` },
          { title: 'How many pieces do you need?', body: `Three strong pieces beat ten weak ones. Aim for three pieces in your niche that show your range: perhaps one simple, one more complex and one that tells a clear before-and-after story.` },
        ],
        keyTerms: [{ term: 'Spec project', def: 'A sample project you create to demonstrate skill, clearly labelled as a sample.' }, { term: 'Before and after', def: 'A comparison that shows the improvement your work makes.' }],
        howTo: ['Write your niche and lead skill.', 'List three project ideas that a client in your niche would value.', 'Choose the type of proof for each (spec, improvement, volunteer, personal).', 'Decide the order to create them.', 'Set a deadline for each.', 'Note how you will label each honestly.'],
        example: `Amara plans three pieces for salon social media: (1) a spec month of posts for a fictional salon, labelled as a sample, (2) a content calendar and caption set for a friend's salon with her permission, (3) a before-and-after of a salon's bio and highlights layout she redesigns as a concept, clearly labelled as a concept.`,
        practice: `Plan three portfolio pieces in your niche, the type of proof for each, deadlines and how you will label each honestly.`,
        successCriteria: 'You have three planned pieces with types, deadlines and honest labels.',
        commonMistakes: 'Waiting for a paid client before starting, or faking client work.',
        takeaways: ['You can create proof yourself.', 'Label spec work honestly.', 'Three strong pieces beat many weak ones.'],
        knowledgeCheck: [
          Q('A spec project is:', ['A fake client claim', 'A sample project clearly labelled as a sample', 'A refund', 'A contract'], 1, 'It demonstrates skill honestly.'),
          Q('Which is dishonest?', ['Labelling a spec piece as a sample', 'Presenting a made-up client with fake testimonials', 'Volunteering with permission', 'Showing a personal project'], 1, 'Fake clients and testimonials break trust and may break rules.'),
          Q('How many portfolio pieces to start?', ['100', 'About three strong ones', 'None', 'One hundred and one'], 1, 'Quality beats quantity.'),
          Q('Buyers mainly want to see:', ['That someone paid you', 'A clear problem, your process and a good result', 'Your age', 'Your location'], 1, 'Evidence of ability matters most.'),
        ],
      }),

      L('ff-m5-l2', 'What a Strong Portfolio Piece Includes', 'how-to', 28, {
        objectives: ['Structure a portfolio piece as a short story', 'Include the problem, process, result and your role', 'Write a clear piece you can reuse in outreach'],
        concept: `A strong portfolio piece is not just a finished image or file. It is a short story with five parts: the context (who it was for and what they needed), the problem (what was not working), your approach (what you did and why), the result (what changed or what the deliverable looks like), and your role (what you personally did).

Clients hire you to solve their problems. A piece that shows your thinking proves you can do that, not just make something pretty.`,
        whyItMatters: `Two freelancers can produce equally nice work, but the one who explains the problem and process looks more professional and is easier to trust. It also gives you something to talk about in calls.`,
        sections: [
          { title: 'The five-part structure', body: `1) **Context:** one or two lines on the client and goal. 2) **Problem:** what was holding them back. 3) **Approach:** your steps and key decisions. 4) **Result:** the final work, plus any measurable outcome if real. 5) **Your role and tools:** what you did and used. Keep it to a page of scannable content with visuals.` },
          { title: 'Results without invented numbers', body: `Only state numbers you can support. For a spec project, describe the intended outcome and how you would measure it, such as "designed to increase booking enquiries; success would be measured by profile visits and messages." Avoid fake statistics.` },
          { title: 'Make it easy to scan', body: `Use headings, short paragraphs and a few strong visuals. Put the best piece first. Link to the full piece if needed. Assume a busy buyer will give you less than a minute.` },
        ],
        keyTerms: [{ term: 'Portfolio piece', def: 'A presented example of your work with its context and results.' }, { term: 'Process', def: 'The steps and decisions behind the finished work.' }],
        howTo: ['Choose one project.', 'Write the context in two lines.', 'Write the problem in one or two sentences.', 'List three key steps you took and why.', 'Show the result with visuals.', 'State your role and tools.', 'Check there are no unsupported numbers.', 'Ask someone to scan it in 60 seconds and tell you what they understood.'],
        template: { title: 'Portfolio piece template', intro: 'Use this structure for every piece.', body: `TITLE: [Clear name, e.g. "Instagram content system for a hair salon (sample project)"]\n\nCONTEXT: Who it was for and what they wanted.\n\nPROBLEM: What was not working.\n\nMY APPROACH: Step 1 ... Step 2 ... Step 3 ... (and why)\n\nRESULT: What was delivered (add visuals). Intended or measured outcome (only real numbers).\n\nMY ROLE AND TOOLS: \n\nWANT SOMETHING SIMILAR? [One clear call to action with your contact]` },
        example: `Title: "Content system for a salon (sample project)". Context: a fictional salon wanting more bookings. Problem: irregular posting and unclear offers. Approach: audit, three content pillars, a monthly calendar, branded templates. Result: 12 sample posts and a calendar; intended to raise enquiries, to be measured by profile visits and messages. Role: strategy, design, copy. Tools: Canva, a scheduling tool.`,
        practice: `Create one complete portfolio piece using the template and have a friend scan it for 60 seconds and report what they understood.`,
        stretch: `Create a second piece in a different style within your niche and compare which one the friend prefers.`,
        successCriteria: 'Your piece has all five parts, honest labelling, and a friend correctly summarises it after a quick scan.',
        commonMistakes: 'Showing only finished visuals with no context, or inventing results.',
        takeaways: ['A piece is a short story: context, problem, approach, result, role.', 'Use only real numbers.', 'Make it scannable in a minute.'],
        knowledgeCheck: [
          Q('Which part shows your thinking?', ['Logo', 'Approach', 'Footer', 'Hashtags'], 1, 'The approach shows how you solve problems.'),
          Q('If a project is a sample, results should be:', ['Invented statistics', 'Described as intended outcomes with a measurement plan', 'Hidden', 'Exaggerated'], 1, 'Honesty keeps trust.'),
          Q('A busy buyer will likely:', ['Read everything slowly', 'Skim for under a minute', 'Ignore portfolios', 'Print them'], 1, 'Scannable layouts matter.'),
          Q('Why include your role?', ['To brag', 'Clients need to know what you personally did', 'It is required by law', 'To fill space'], 1, 'It clarifies your contribution.'),
        ],
      }),

      L('ff-m5-l3', 'Where to Host a Beginner Portfolio', 'concept', 22, {
        objectives: ['Compare simple hosting options for a first portfolio', 'Choose an option based on your skill and time', 'Check a portfolio page for clarity and contact details'],
        concept: `Your portfolio needs a home that is easy to share. For beginners, simple beats fancy. Options include a one-page website built on a free or low-cost website builder, a public document or Notion page, a presentation or PDF, a profile on a portfolio platform for your field (such as one for designers or writers), or a clear social profile with highlights.

Choose the option you can finish this week. A published simple portfolio beats a perfect one that never launches.`,
        whyItMatters: `Clients make quick judgments. A tidy, easy-to-open portfolio shows professionalism. A broken link or confusing page can cost you a project.`,
        sections: [
          { title: 'Comparing options', body: `- **One-page website:** most professional and flexible; takes a little setup.\n- **Notion or document page:** very quick; good for starters, less polished.\n- **PDF or slides:** easy to attach in a proposal; not searchable.\n- **Platform profiles:** built-in audience in some fields; you follow their rules.\nMany freelancers use a simple website as the main home and a PDF as a proposal attachment.` },
          { title: 'What every portfolio page needs', body: `A clear headline (your niche statement), three portfolio pieces, a short about section with a photo or friendly introduction, what you offer, how to start (one clear contact method) and working links. Check it on a phone: many buyers will open it there.` },
          { title: 'Using your own name and domain', body: `A custom address with your name looks more professional and is easy to remember. If a domain is not affordable yet, a free address is fine to start. Upgrade later.` },
        ],
        keyTerms: [{ term: 'Portfolio site', def: 'A web page or set of pages showing your work and how to hire you.' }, { term: 'Call to action', def: 'The single next step you want a visitor to take.' }],
        howTo: ['Choose one hosting option you can finish this week.', 'Write your headline using your niche statement.', 'Add three pieces in the five-part structure.', 'Write a short about section.', 'Add your offer and one contact method.', 'Open it on a phone and fix anything unclear or broken.', 'Send the link to two people for feedback.'],
        template: { title: 'Portfolio page checklist', intro: 'Tick each item before you share the link.', body: `[ ] Headline = niche statement\n[ ] Three portfolio pieces (five-part structure)\n[ ] Short about section (friendly, specific)\n[ ] My offer and starting price or "how pricing works"\n[ ] One clear contact method / booking link\n[ ] Works and reads well on a phone\n[ ] No broken links\n[ ] Spec work labelled honestly\n[ ] Link tested by two other people` },
        example: `Amara builds a one-page site on a free builder: headline "I help independent salons fill their appointment books through Instagram", three sample pieces, a short bio, her offer, and a button to message her on WhatsApp. She tests it on her phone and two friends.`,
        practice: `Publish a portfolio page with all checklist items and share the link with two people to review.`,
        successCriteria: 'Your page is live, passes the checklist, and two people can open it and understand what you do.',
        commonMistakes: 'Spending weeks on design and never publishing.',
        takeaways: ['Simple and published beats perfect and hidden.', 'Include headline, pieces, offer and one contact method.', 'Check it on a phone.'],
        knowledgeCheck: [
          Q('For a beginner, the best portfolio home is:', ['The most complex one', 'The one you can finish this week', 'None', 'A paid billboard'], 1, 'Done and shared beats perfect and unpublished.'),
          Q('A portfolio page should include:', ['Only a logo', 'Headline, pieces, offer and a clear contact method', 'Only your age', 'Only prices'], 1, 'Buyers need proof and a next step.'),
          Q('Why check on a phone?', ['Buyers often open it there', 'It is required', 'Phones are cheaper', 'No reason'], 0, 'Many people browse on mobile.'),
          Q('A custom domain with your name:', ['Is illegal', 'Looks professional and is easy to remember', 'Is required', 'Costs nothing ever'], 1, 'It supports credibility.'),
        ],
      }),

      L('ff-m5-l4', 'Case Studies and Testimonials That Sell', 'how-to', 26, {
        objectives: ['Turn a finished project into a short case study', 'Ask clients for useful testimonials', 'Use proof honestly across your profiles'],
        concept: `Once you have completed a few real projects, even small or discounted ones, turn them into case studies and collect testimonials. A case study expands a portfolio piece with real context and results. A testimonial is a client's own words about working with you. Together they are the strongest proof a new freelancer can have.

Most happy clients are willing to say a few words if you ask at the right moment and make it easy.`,
        whyItMatters: `Buyers trust other clients more than they trust you. A specific testimonial such as "she delivered early and my bookings went up" persuades far more than "great work".`,
        sections: [
          { title: 'Asking at the right moment', body: `Ask right after delivering, when the client is happiest. Make it easy: send three guiding questions and offer to write a draft they can edit. Always ask permission to publish their name, business and photo or logo.` },
          { title: 'Questions that produce useful testimonials', body: `1) What problem were you facing before? 2) What was it like working together? 3) What result did you get? 4) Would you recommend me, and to whom? Specifics and results make testimonials believable.` },
          { title: 'Using proof honestly', body: `Only publish real testimonials with permission. Do not edit them to change the meaning. If a client shares a measurable result, ask whether you can quote the number and how it was measured.` },
        ],
        keyTerms: [{ term: 'Case study', def: 'A short story of a project with context, actions and results.' }, { term: 'Testimonial', def: 'A client\'s own words about your work.' }],
        howTo: ['Pick a completed project.', 'Write the context, problem, approach and result.', 'Send the client the four testimonial questions.', 'Ask for permission to publish.', 'Edit lightly for clarity only.', 'Add the proof to your portfolio and profiles.', 'Set a reminder to ask after every project.'],
        template: { title: 'Testimonial request message', intro: 'Send within a day of delivery.', body: `Hi [name], thank you again for trusting me with [project]. I'd love to share a few words from you on my portfolio. If you're open to it, could you answer these in a sentence or two?\n\n1. What problem were you facing before we started?\n2. What was it like working together?\n3. What result did you see?\n4. Would you recommend me, and to whom?\n\nMay I use your name and business with it? If it's easier, I can draft something from your answers for you to approve. Thank you!` },
        example: `A salon owner replies: "Before, I posted once a month and had no idea what to say. Now my page looks consistent, and I get booking messages from it. She delivered on time and made it easy." The freelancer adds it with permission beside her case study.`,
        practice: `Write a case study from a real or sample project and draft a testimonial request message you will actually send.`,
        successCriteria: 'Your case study has context, actions and results, and your request message asks specific questions and permission.',
        commonMistakes: 'Waiting too long to ask, or writing fake testimonials.',
        takeaways: ['Ask right after delivery.', 'Specific testimonials persuade most.', 'Only publish real proof with permission.'],
        knowledgeCheck: [
          Q('When is the best time to ask for a testimonial?', ['Months later', 'Right after delivering, when the client is happiest', 'Never', 'Before starting'], 1, 'Satisfaction is highest at delivery.'),
          Q('A strong testimonial is:', ['Vague praise', 'Specific about the problem and result', 'Invented', 'Anonymous only'], 1, 'Specifics make it believable.'),
          Q('Using fake testimonials is:', ['Smart', 'Dishonest and risky', 'Required', 'Harmless'], 1, 'It breaks trust and may break rules.'),
          Q('Before publishing a testimonial you should:', ['Hide it', 'Get permission', 'Edit its meaning', 'Add numbers'], 1, 'Always get consent and keep the meaning intact.'),
        ],
      }),

      A('ff-m5-a', [
        Q('A spec project is:', ['A fake client claim', 'A sample project clearly labelled as a sample', 'A refund', 'A contract'], 1, 'It demonstrates skill honestly.'),
        Q('Which is dishonest?', ['Labelling a spec piece as a sample', 'Presenting fake clients and testimonials', 'Volunteering with permission', 'Showing a personal project'], 1, 'Fake proof breaks trust.'),
        Q('A good number of portfolio pieces to start is:', ['100', 'About three strong ones', 'None', 'One hundred and one'], 1, 'Quality beats quantity.'),
        Q('A portfolio piece\'s five parts are:', ['Context, problem, approach, result, role', 'Logo, font, colour, price, hashtag', 'Idea, hope, wait, luck, rest', 'None'], 0, 'This structure tells a story.'),
        Q('For a sample project, results should be:', ['Invented statistics', 'Intended outcomes with a measurement plan', 'Hidden', 'Exaggerated'], 1, 'Be honest about what is real.'),
        Q('The best beginner portfolio home is:', ['The most complex one', 'The one you can finish this week', 'None', 'A billboard'], 1, 'Publishing matters.'),
        Q('Why check your portfolio on a phone?', ['Buyers often open it there', 'It is required', 'Phones are cheaper', 'No reason'], 0, 'Many browse on mobile.'),
        Q('When should you ask for a testimonial?', ['Months later', 'Right after delivery', 'Never', 'Before starting'], 1, 'Satisfaction is highest then.'),
        Q('A strong testimonial is:', ['Vague praise', 'Specific about the problem and result', 'Invented', 'Anonymous only'], 1, 'Specifics persuade.'),
        Q('Before publishing a testimonial you should:', ['Hide it', 'Get permission', 'Edit its meaning', 'Add numbers'], 1, 'Always get consent.'),
      ]),
    ],
  },

  /* ---------------- MODULE 6 ---------------- */
  {
    id: 'ff-m6', title: 'Finding Clients',
    objective: 'Identify realistic, repeatable channels for finding freelance clients as a total beginner.',
    lessons: [
      L('ff-m6-l1', 'The Three Realistic Client Channels', 'concept', 22, {
        objectives: ['Name the three main channels for finding clients', 'Compare their speed, control and competition', 'Choose a primary channel and a backup'],
        concept: `Beginners can find clients through three realistic channels. Warm outreach means contacting people you already know or who are one step away, and asking whether they or someone they know needs help. Cold outreach means contacting strangers who fit your niche with a thoughtful, relevant message. Inbound and marketplaces mean being found: through platforms, content, referrals and directories.

Each has trade-offs. Warm is fastest and most trusted but limited by your network. Cold is scalable and under your control but takes skill and persistence. Inbound builds slowly but can become steady.`,
        whyItMatters: `Waiting to be discovered rarely works at the beginning. Choosing a primary channel and doing it consistently is what gets you your first clients, and a second channel protects you when one slows down.`,
        sections: [
          { title: 'Comparing the three', body: `- **Warm:** fastest, highest trust, limited reach.\n- **Cold:** scalable, you control the pace, lower reply rates, needs a good message.\n- **Inbound and marketplaces:** can bring ongoing leads, but heavy competition on platforms and slow to build through content.\nMost beginners should start with warm, add cold within the first month and build inbound in the background.` },
          { title: 'The weekly pipeline habit', body: `Pick fixed weekly targets, such as ten warm messages, ten cold messages and one piece of content. Track them in a simple sheet with columns for name, date, status and next step.` },
          { title: 'Do not rely on a single source', body: `One client, one platform or one referral source is fragile. Aim for at least two channels working at once as you grow.` },
        ],
        keyTerms: [{ term: 'Warm outreach', def: 'Contacting people you know or are one step from.' }, { term: 'Cold outreach', def: 'Contacting strangers who fit your niche.' }, { term: 'Inbound', def: 'Leads that find you.' }],
        howTo: ['Write your niche.', 'List five warm contacts and five types of cold prospects.', 'Choose a primary and backup channel.', 'Set weekly targets for each.', 'Create a simple tracking sheet.', 'Block time in your calendar.'],
        template: { title: 'Pipeline tracker', intro: 'Set these as columns in a sheet.', body: `Name | Channel (warm/cold/inbound) | Date contacted | Message sent | Status (no reply / replied / call / proposal / won / lost) | Next step | Next step date\n\nWeekly targets:\nWarm messages: \nCold messages: \nContent pieces: \nCalls booked: ` },
        example: `Tola chooses warm outreach as primary and cold as backup. Weekly: 10 warm messages, 10 cold, one post. She tracks everything. In week three a friend introduces her to a salon owner who becomes her first client.`,
        practice: `Choose a primary and backup channel, set weekly targets, and build your pipeline tracker.`,
        successCriteria: 'Your plan names two channels, has weekly numbers and a working tracker.',
        commonMistakes: 'Waiting to be discovered instead of reaching out.',
        takeaways: ['Warm, cold and inbound each have trade-offs.', 'Start with warm, add cold early.', 'Track activity weekly.'],
        knowledgeCheck: [
          Q('Which channel is usually fastest for a beginner?', ['Cold', 'Warm', 'Inbound content', 'Ads'], 1, 'People who know you trust you faster.'),
          Q('Cold outreach means contacting:', ['Friends only', 'Strangers who fit your niche', 'Nobody', 'Only family'], 1, 'It is reaching out to relevant strangers.'),
          Q('A pipeline tracker helps you:', ['Look busy', 'Know who you contacted and what to do next', 'Avoid follow-ups', 'Reduce income'], 1, 'Tracking prevents leads from slipping away.'),
          Q('Relying on one client source is:', ['Safe', 'Fragile', 'Required', 'Ideal'], 1, 'Diversifying protects your income.'),
        ],
      }),

      L('ff-m6-l2', 'Warm Outreach: Your Existing Network', 'how-to', 26, {
        objectives: ['Build a list of warm contacts', 'Write a clear, low-pressure message', 'Ask for introductions, not just jobs'],
        concept: `Your network is bigger than you think: friends, family, former colleagues, classmates, neighbours, people you follow, community members and customers of businesses you use. You do not need them to be buyers. They may know someone who needs your service.

The best warm message is short, clear and makes it easy to help. Tell them what you now do, who it is for, and ask whether they know anyone who fits. Avoid begging for work or sending a vague "hi, are you free?" message.`,
        whyItMatters: `Warm introductions carry built-in trust and convert much more easily than cold messages. Many first clients come from someone's friend or acquaintance.`,
        sections: [
          { title: 'Building the list', body: `Write 30 names in five groups: family and friends, current or past colleagues, school or church or community contacts, small businesses you use as a customer, and online contacts you have genuinely interacted with. Mark who owns or works in your niche, or knows someone who does.` },
          { title: 'A message that makes it easy', body: `State what you do in one line, who you help, one example, and a specific ask: "Do you know anyone who runs a salon and struggles to post consistently? I'd love an intro." Do not pressure. Make it easy to forward your message.` },
          { title: 'Following up and thanking', body: `If someone introduces you, thank them and update them on what happens. A grateful, professional follow-up makes people want to refer you again.` },
        ],
        keyTerms: [{ term: 'Warm contact', def: 'Someone who already knows you or is one step away.' }, { term: 'Introduction', def: 'A recommendation connecting you with a potential client.' }],
        howTo: ['Write 30 warm names in five groups.', 'Mark those in or near your niche.', 'Draft your message with what you do, who for and a specific ask.', 'Send 10 messages this week.', 'Record replies in your tracker.', 'Thank everyone who responds, whatever the answer.'],
        template: { title: 'Warm outreach message', intro: 'Personalise before sending.', body: `Hi [name]! I've started helping [type of client] with [result], for example [one short example]. I'm looking to work with a few more [type of client]. Do you know anyone who runs one or who struggles with [problem]? If so, I'd really appreciate an intro. And if it's ever useful for you, I'm happy to share what I do. Thank you!` },
        example: `Tola messages a cousin: "I've started helping salons fill their appointment books with Instagram content. Do you know any salon owners who struggle to post consistently?" The cousin introduces her to a salon owner she visits monthly.`,
        practice: `Build your 30-name list, draft your message and send at least 10 messages, then record the results.`,
        stretch: `Offer a small free audit to one warm contact in your niche.`,
        successCriteria: 'You sent real messages with a clear, low-pressure ask and logged replies.',
        commonMistakes: 'Sending vague messages like "do you need anything?" or never asking for introductions.',
        takeaways: ['Your network is larger than you think.', 'Ask for introductions, not pity.', 'Thank and update people who help.'],
        knowledgeCheck: [
          Q('A warm contact is:', ['A stranger', 'Someone who knows you or is one step away', 'A competitor', 'A bot'], 1, 'Warm contacts carry built-in trust.'),
          Q('A strong warm message:', ['Is vague', 'States what you do, who for, and a specific ask', 'Begs', 'Is very long'], 1, 'Clarity makes it easy to help.'),
          Q('Why ask for introductions?', ['Contacts may know your ideal clients', 'It is required', 'It is cheaper', 'It avoids work'], 0, 'Referrals carry trust.'),
          Q('After an introduction you should:', ['Ignore', 'Thank and update the person', 'Complain', 'Delete messages'], 1, 'Gratitude encourages more referrals.'),
        ],
      }),

      L('ff-m6-l3', 'Cold Outreach Basics', 'concept', 24, {
        objectives: ['Define cold outreach and why personalisation matters', 'Find and qualify prospects in your niche', 'Write a short cold message that gets replies'],
        concept: `Cold outreach means contacting people who do not know you. Done well, it is respectful and relevant. Done badly, it is spam. The difference is research and personalisation: you contact people who clearly fit your niche, mention something specific about them, and offer a small, relevant observation or help.

Expect low reply rates at first. That is normal. Your job is to keep your message short, specific and about their problem, and to send enough messages to learn what works.`,
        whyItMatters: `Cold outreach is the one channel you control completely. You do not depend on anyone else's introduction or on a platform's algorithm. It is how many freelancers fill their pipeline.`,
        sections: [
          { title: 'Finding and qualifying prospects', body: `Search your niche on social platforms, directories and maps. Build a list of 30 businesses or people who fit. Qualify each: Are they active? Do they seem to need your service? Can you reach the decision maker? Note one specific observation about each, such as "posts irregularly" or "no booking link in bio".` },
          { title: 'A short, personal message', body: `Structure: 1) a genuine specific observation, 2) the problem it can cause, 3) a one-line offer of help, 4) a low-pressure question. Keep it under 100 words. Avoid attachments and long pitches in the first message.` },
          { title: 'Respect and compliance', body: `Respect people's time and platforms' rules. Do not send repeated mass copy-paste messages, do not scrape private data, and stop if someone says no. Where email is used, follow the rules of the country you are contacting, such as providing an easy way to opt out.` },
        ],
        keyTerms: [{ term: 'Cold outreach', def: 'Contacting potential clients who do not know you.' }, { term: 'Qualify', def: 'Check that a prospect fits your niche and likely needs your service.' }, { term: 'Personalisation', def: 'Including specific details about the person or business.' }],
        howTo: ['Build a list of 30 prospects who fit your niche.', 'Qualify each with one specific observation.', 'Write a short message using the four-part structure.', 'Send 10 to start.', 'Record replies and refine the message.', 'Send 10 more with the improved version.'],
        template: { title: 'Cold message formula', intro: 'Keep under 100 words and personalise each one.', body: `Hi [name], I came across [business] and noticed [specific observation, e.g. you post a few times a month and there's no booking link in your bio]. That can mean people who like your work don't know how to book. I help [niche] with [result]. Would it be helpful if I sent two quick ideas for your page? No pressure either way. [Your name]` },
        example: `A freelancer messages a salon: "Hi Chioma, I came across your salon and noticed your last post was three weeks ago and your bio has no booking link. I help salons stay visible and get more bookings through Instagram. Would two quick ideas for your page be helpful?" The owner replies and a call follows.`,
        practice: `Build a list of 30 prospects, write your message, send 10 and record the replies.`,
        successCriteria: 'Your messages are personalised, short and respectful, and you tracked responses.',
        commonMistakes: 'Sending long generic copy-paste messages that talk about yourself.',
        takeaways: ['Research and personalise.', 'Keep it short and about their problem.', 'Expect low reply rates and improve with data.'],
        knowledgeCheck: [
          Q('Cold outreach works best when:', ['Generic', 'Specific, relevant and respectful', 'Long', 'Aggressive'], 1, 'Relevance earns replies.'),
          Q('To qualify a prospect you check that:', ['They live nearby', 'They fit your niche and likely need your service', 'They are famous', 'They follow you'], 1, 'Qualification avoids wasted messages.'),
          Q('An ideal first message is:', ['Under about 100 words', 'Five pages', 'A resume', 'An invoice'], 0, 'Short messages are easier to answer.'),
          Q('If someone says no you should:', ['Keep messaging', 'Thank them and stop', 'Argue', 'Report them'], 1, 'Respect keeps your reputation.'),
        ],
      }),

      L('ff-m6-l4', 'Marketplaces, International Clients and Spotting Scams', 'concept', 28, {
        objectives: ['Weigh the pros and cons of freelance marketplaces', 'Understand what to consider when working with clients in other countries', 'Recognise common scam patterns and protect yourself'],
        concept: `Freelance marketplaces connect you with buyers but come with competition, fees and platform rules. They can be useful for a first client or proof, but many freelancers move toward direct clients over time to keep more of what they earn and control the relationship.

Working with international clients can raise your income potential, but it also brings practical considerations: time zones, language, currency, payment methods and sometimes tax or legal differences. And unfortunately, freelancers are targeted by scammers, especially newer ones. Learning the patterns protects you.`,
        whyItMatters: `One scam can cost you money, time and confidence. Knowing the warning signs and setting basic safeguards lets you pursue opportunities calmly.`,
        sections: [
          { title: 'Marketplace pros and cons', body: `Pros: ready-made demand, built-in payment protection on some platforms, easy to get started. Cons: many competitors, fees, rules about contact outside the platform, pressure to underprice. A sensible approach is to use a marketplace to gain early experience while building direct outreach alongside it.` },
          { title: 'Working across borders', body: `Consider time zones (agree overlap hours), language (write clearly and simply), currency (agree the currency in the contract), payment method (check availability and fees for both sides, since some tools are not available in every country), and local rules. Clear communication and written agreements matter even more across distance.` },
          { title: 'Common scam patterns', body: `- You are asked to pay a fee to get a job, training or equipment.\n- A "client" sends a cheque or payment for more than the agreed amount and asks you to send back the difference.\n- The offer is far above normal rates for little work.\n- The client insists on moving to a private chat immediately and avoids video calls or a clear company identity.\n- You are asked for sensitive details such as ID or bank login early on.\n- A "test task" is actually the full project, with no payment.\nWhen in doubt, pause, research the company, and ask a trusted person.` },
          { title: 'Basic safeguards', body: `Verify the client: company website, real people, a video call. Use a written agreement. Take a deposit before starting. Never pay to get work. Never share bank login details or passwords. Deliver watermarked or partial work for unpaid tests. Report scams to the platform.` },
        ],
        keyTerms: [{ term: 'Marketplace', def: 'A platform where buyers and freelancers connect.' }, { term: 'Overpayment scam', def: 'A scam where you are sent too much money and asked to return the difference before the original payment fails.' }, { term: 'Red flag', def: 'A warning sign that something may be wrong.' }],
        howTo: ['List two marketplaces and two direct-client methods you will try.', 'Write the time zone overlap you can offer.', 'Write your payment methods and currency preference.', 'Create a "verify a client" checklist.', 'List five scam red flags in your own words.', 'Decide your rule for unpaid test work.'],
        template: { title: 'Verify-a-client checklist', intro: 'Run through before accepting any new client.', body: `[ ] Real company website or professional profile\n[ ] Real names and roles I can check\n[ ] Video call completed\n[ ] Clear scope, price and timeline in writing\n[ ] Written agreement signed\n[ ] Deposit received before work starts\n[ ] Payment method confirmed and available to me\n[ ] No request for fees, ID or bank login\n[ ] Rate matches the work (not suspiciously high)\n[ ] I told someone I trust about this project\n\nIf two or more boxes are unchecked, pause and investigate.` },
        example: `A "client" offers an unusually high fee for a small task, insists on chatting only on a private app and sends a payment for more than agreed, asking the freelancer to return the difference. She recognises the overpayment pattern, declines, and reports the account.`,
        practice: `Write your verify-a-client checklist, your rule for test tasks, and your plan for time zones, currency and payment methods.`,
        successCriteria: 'Your checklist covers verification, written agreement, deposit and scam red flags, and your cross-border plan is specific.',
        commonMistakes: 'Rushing into a too-good-to-be-true offer, or doing a large unpaid "test".',
        takeaways: ['Marketplaces are a start, not the end.', 'Cross-border work needs clear agreements on time, currency and payment.', 'Know the red flags and verify clients.'],
        knowledgeCheck: [
          Q('Which is a scam red flag?', ['A deposit request from you to a client', 'Being asked to pay a fee to get a job', 'A clear written agreement', 'A video call'], 1, 'Real clients pay you; they do not charge you to work.'),
          Q('An overpayment scam asks you to:', ['Send back extra money', 'Sign a contract', 'Raise your price', 'Wait'], 0, 'The original payment often fails after you refund the difference.'),
          Q('For international clients, you should agree in writing:', ['Nothing', 'Currency, payment method, time zone overlap and scope', 'Only the colour', 'Only the logo'], 1, 'Written clarity prevents problems across distance.'),
          Q('A sensible rule for unpaid test tasks is:', ['Do the full project for free', 'Keep tests small and not usable as the real deliverable', 'Always refuse', 'Always accept'], 1, 'Protect your work while showing your skill.'),
        ],
      }),

      A('ff-m6-a', [
        Q('Which channel is usually fastest for a beginner?', ['Cold', 'Warm', 'Ads', 'None'], 1, 'People who know you trust you faster.'),
        Q('Cold outreach means contacting:', ['Friends only', 'Strangers who fit your niche', 'Nobody', 'Only family'], 1, 'It is relevant outreach to people who do not know you.'),
        Q('A pipeline tracker helps you:', ['Look busy', 'Know who you contacted and what comes next', 'Avoid follow-ups', 'Reduce income'], 1, 'Tracking prevents lost leads.'),
        Q('A strong warm message:', ['Is vague', 'States what you do, who for and a specific ask', 'Begs', 'Is very long'], 1, 'Clarity makes it easy to help.'),
        Q('Why ask warm contacts for introductions?', ['They may know your ideal clients', 'It is required', 'It is cheaper', 'It avoids work'], 0, 'Referrals carry trust.'),
        Q('Cold messages should be:', ['Long and generic', 'Short, personal and about their problem', 'Aggressive', 'Attachments only'], 1, 'Relevance earns replies.'),
        Q('Qualifying a prospect means:', ['Checking they fit your niche and likely need your service', 'Checking their age', 'Checking their followers only', 'Nothing'], 0, 'It avoids wasted messages.'),
        Q('Which is a scam red flag?', ['A written agreement', 'Being asked to pay a fee to get the job', 'A video call', 'A deposit from the client'], 1, 'Real clients pay you.'),
        Q('An overpayment scam asks you to:', ['Send back extra money', 'Sign a contract', 'Raise your price', 'Wait'], 0, 'The original payment may later fail.'),
        Q('For international clients you should agree in writing:', ['Nothing', 'Currency, payment method, time zone overlap and scope', 'Only the colour', 'Only the logo'], 1, 'Clarity prevents problems.'),
      ]),
    ],
  },

  /* ---------------- MODULE 7 ---------------- */
  {
    id: 'ff-m7', title: 'Outreach & Proposals',
    objective: 'Write proposals and pitches that get replies, by leading with the client\u2019s problem instead of your resume.',
    lessons: [
      L('ff-m7-l1', 'Why Most Proposals Get Ignored', 'concept', 22, {
        objectives: ['Identify the common reasons proposals fail', 'Shift from "about me" to "about you" writing', 'Audit a proposal for the client\'s point of view'],
        concept: `Most proposals are ignored because they are about the freelancer, not the client. They open with "Hello, I am a passionate expert with five years of experience", list skills, and ask for the job. The client, who is busy and reading many messages, learns nothing about whether you understand their problem.

Winning proposals reverse the order. They begin with the client's situation, show that you understood it, outline a simple path to the result and make the next step easy. They are short, specific and clear.`,
        whyItMatters: `You cannot control how many people you contact, but you can control how many respond. Small changes in how you write can double or triple your reply rate, which is the cheapest way to grow income.`,
        sections: [
          { title: 'Five common failures', body: `1) Generic, copy-pasted text. 2) Starting with your biography. 3) Talking about tools and features instead of results. 4) No clear next step. 5) Too long, with no structure. Each makes the client work harder, and busy clients rarely do.` },
          { title: 'Writing from the client\'s side', body: `Read the request or the client's page and note their exact words. Use those words back to them. Replace "I am skilled at X" with "You want X so that Y, and here is how I would get you there." The word "you" should appear more than the word "I".` },
          { title: 'The one-minute test', body: `Imagine reading your proposal in one minute on a phone between meetings. Within the first two lines, can you tell what the freelancer understood about your problem and what they propose? If not, rewrite the opening.` },
        ],
        keyTerms: [{ term: 'Proposal', def: 'A written pitch explaining how you would solve a client\'s problem.' }, { term: 'Reply rate', def: 'The share of messages that get a response.' }],
        howTo: ['Take a proposal or message you have sent or would send.', 'Count how many times "I" and "you" appear.', 'Underline anything that is about you but not useful to them.', 'Rewrite the first two lines to describe their situation.', 'Cut the length by a third.', 'Add one clear next step.'],
        example: `Before: "Hello, I am a passionate designer with 5 years of experience in Canva, Photoshop..." After: "Hi Chioma, I saw your salon posts irregularly and your bio has no booking link, so followers may not know how to book. I'd suggest a simple monthly content plan and a pinned booking highlight. Would you like a short sample for your page?"`,
        caseStudy: { title: 'Same skill, new opening', situation: 'A freelancer sent twenty proposals that started with her biography and received two replies.', moves: ['She rewrote the first two lines of every message to describe the client\'s problem.', 'She cut the length to under 100 words.', 'She ended with a single easy question.'], result: 'Her next twenty messages got noticeably more replies and several calls.', lesson: 'Starting with the client\'s problem is the highest-leverage change you can make.' },
        practice: `Rewrite one real or sample proposal from client-first, under 100 words, with a clear next step. Compare "I" and "you" counts before and after.`,
        successCriteria: 'Your rewrite starts with the client\'s situation, uses "you" more than "I" and ends with one clear step.',
        commonMistakes: 'Opening with your biography and listing tools.',
        takeaways: ['Proposals fail when they are about you.', 'Mirror the client\'s words.', 'Be short with one next step.'],
        knowledgeCheck: [
          Q('Most proposals fail because they are mostly about:', ['The client', 'The freelancer', 'The weather', 'Pricing'], 1, 'Clients want to know you understand their problem.'),
          Q('A better opening is:', ['Your biography', 'A description of the client\'s situation', 'A list of tools', 'A discount'], 1, 'It shows you understood them.'),
          Q('A good proposal should end with:', ['Nothing', 'One clear next step', 'Five options', 'An apology'], 1, 'Easy next steps increase replies.'),
          Q('"You" should appear:', ['Rarely', 'More often than "I"', 'Never', 'Only at the end'], 1, 'Client-focused writing builds interest.'),
        ],
      }),

      L('ff-m7-l2', 'The 4-Part Proposal Structure', 'how-to', 28, {
        objectives: ['Write a proposal using the four-part structure', 'Adapt it for a message, an email and a longer document', 'Include price and next step without pressure'],
        concept: `A simple four-part structure works for almost any proposal. Part one: their problem, described in their words. Part two: your solution, in the form of a short plan and the result they will get. Part three: proof, such as a relevant portfolio piece or testimonial. Part four: the next step, including timeline and price or an invitation to a call.

You can scale it. In a short message it may be four sentences. In an email it may be four short paragraphs. In a formal proposal document it may be a page or two.`,
        whyItMatters: `A fixed structure removes the blank-page problem and makes sure you never forget the parts that matter. It also makes your proposals easy for clients to read and compare.`,
        sections: [
          { title: 'The four parts in detail', body: `1) **Problem:** "You want [result], but [obstacle]." 2) **Solution:** "I would do [3 steps], so you get [deliverables] by [date]." 3) **Proof:** "Here is a similar piece [link]" or a short testimonial. 4) **Next step:** "The investment is [price]. If you'd like to go ahead, reply and I'll send a short agreement and invoice for the deposit." Keep each part to one to three sentences.` },
          { title: 'Where to put the price', body: `State it plainly in part four, with what it includes. If the project is unclear, offer a short call first or give a range with a note on what could change it. Never hide the price in a pile of text.` },
          { title: 'Customising quickly', body: `Keep a template, but always change the first two lines and the proof for each client. Ten minutes of personalisation is worth more than an hour of polishing a generic text.` },
        ],
        keyTerms: [{ term: 'Proof', def: 'Evidence such as a portfolio piece or testimonial.' }, { term: 'Investment', def: 'A client-friendly word for price.' }],
        howTo: ['Write their problem in one or two sentences using their words.', 'Write your solution as three steps and the result.', 'Choose the most relevant proof.', 'State timeline, price and what is included.', 'End with one next step.', 'Read it aloud and cut anything unnecessary.', 'Save it as a template.'],
        template: { title: '4-part proposal template', intro: 'Change the first two lines and the proof every time.', body: `Hi [name],\n\n1) THE PROBLEM\nYou want [result], but [obstacle in their words].\n\n2) MY SOLUTION\nI'd do three things: (a) [step], (b) [step], (c) [step]. You'd get [deliverables] by [date].\n\n3) PROOF\nHere's a similar project: [link]. [One-line result or testimonial.]\n\n4) NEXT STEP\nThe price is [amount], which includes [list] and [number] rounds of revisions. If you'd like to go ahead, reply "yes" and I'll send a short agreement and an invoice for the deposit. Happy to answer questions on a quick call first if you'd prefer.\n\n[Your name]` },
        example: `A freelancer writes to a salon: problem (irregular posting, no booking link), solution (monthly plan, 12 posts, pinned booking highlight, ready in 7 days), proof (a sample month link), next step (fixed monthly price, two revision rounds, reply "yes" for a short agreement).`,
        practice: `Write a complete four-part proposal for a real or realistic prospect in your niche, using your actual price and proof.`,
        successCriteria: 'All four parts are present, your price and inclusions are clear and the next step is one simple action.',
        commonMistakes: 'Hiding the price, leaving out proof or finishing with a vague "let me know".',
        takeaways: ['Problem, solution, proof, next step.', 'State price plainly with inclusions.', 'Personalise the opening each time.'],
        knowledgeCheck: [
          Q('The four parts are:', ['Problem, solution, proof, next step', 'Logo, font, colour, price', 'Hello, bye, thanks, sorry', 'None'], 0, 'This order puts the client first.'),
          Q('Where should the price appear?', ['Hidden', 'Plainly, with what it includes', 'Nowhere', 'Only after payment'], 1, 'Clarity builds trust.'),
          Q('What should you always customise?', ['The font', 'The first two lines and the proof', 'Your name', 'The signature'], 1, 'Personal relevance gets replies.'),
          Q('A strong next step is:', ['"Let me know"', 'A single clear action', 'A long list', 'Nothing'], 1, 'Easy actions increase responses.'),
        ],
      }),

      L('ff-m7-l3', 'Following Up Without Being Annoying', 'concept', 22, {
        objectives: ['Explain why follow-ups matter', 'Write a sequence of polite, useful follow-ups', 'Know when to stop'],
        concept: `Silence rarely means no. Busy people forget, get distracted or mean to reply later. A polite follow-up often produces the reply that the first message did not. Many deals are won on the second or third message.

The goal is to be helpful and professional, not pushy. Each follow-up should add something: a useful idea, a new example, a simple question or a clear closing line.`,
        whyItMatters: `Most freelancers give up after one message. Simply following up respectfully sets you apart and increases your chance of a reply without extra marketing cost.`,
        sections: [
          { title: 'A simple follow-up rhythm', body: `Follow up after about three to four days, again after about a week, and then a final gentle message after another week or so. Three touches in total is a common limit. Space them out and vary the content.` },
          { title: 'What to say', body: `Follow-up 1: a short reminder with a helpful idea. Follow-up 2: a relevant example or small piece of value. Final message: a polite close, such as "I'll assume now isn't the right time, but I'm happy to help in the future." The final message often prompts replies because it removes pressure.` },
          { title: 'When to stop and how to keep the door open', body: `If someone says no, thank them and stop. If you hear nothing after the sequence, mark the lead as "later" and perhaps reconnect after a few months with something useful. Respect is part of your reputation.` },
        ],
        keyTerms: [{ term: 'Follow-up', def: 'A polite message sent after no reply.' }, { term: 'Touch', def: 'A single point of contact with a lead.' }],
        howTo: ['Write three follow-up messages for a proposal.', 'Make each add something new.', 'Set reminders for the dates.', 'Send them on schedule.', 'Mark replies in your tracker.', 'Move non-responders to a "later" list.'],
        template: { title: 'Three follow-up messages', intro: 'Adapt tone to your voice.', body: `FOLLOW-UP 1 (day 3-4)\nHi [name], just checking you saw my note about [topic]. One quick idea: [useful tip]. Happy to share more if helpful!\n\nFOLLOW-UP 2 (about day 10)\nHi [name], here's a quick example of what this could look like for you: [link or short example]. Would a short call be useful?\n\nFINAL (about day 17-20)\nHi [name], I'll assume the timing isn't right, so I won't keep messaging. If [problem] becomes a priority, I'd be glad to help. Wishing you a great month!` },
        example: `A freelancer sends a proposal to a gym owner, hears nothing, shares a tip on day four, an example on day ten, and a polite final message on day nineteen. The final message gets a reply: "Sorry, it's been a busy month. Let's talk."`,
        practice: `Write your three-message follow-up sequence and schedule reminders for the next proposal you send.`,
        successCriteria: 'Each follow-up adds value, and your sequence ends with a polite close.',
        commonMistakes: 'Sending "just checking in" repeatedly with no value, or never following up at all.',
        takeaways: ['Silence is not a no.', 'Add value in each follow-up.', 'End politely and stop.'],
        knowledgeCheck: [
          Q('Silence after a proposal usually means:', ['A firm no', 'The person may be busy or forgot', 'You should delete the lead', 'Legal trouble'], 1, 'Follow-ups often revive the conversation.'),
          Q('Each follow-up should:', ['Repeat the same text', 'Add something new or useful', 'Be angry', 'Beg'], 1, 'Value makes follow-ups welcome.'),
          Q('A common limit is about:', ['Three touches', 'Thirty touches', 'One per hour', 'None'], 0, 'More than that becomes annoying.'),
          Q('If someone says no, you should:', ['Keep going', 'Thank them and stop', 'Argue', 'Block them'], 1, 'Respect protects your reputation.'),
        ],
      }),

      L('ff-m7-l4', 'Discovery Calls and Handling Objections', 'how-to', 28, {
        objectives: ['Run a structured 20-minute discovery call', 'Ask questions that reveal the real problem and budget', 'Respond calmly to common objections'],
        concept: `A discovery call is a short conversation, usually 15 to 30 minutes, where you learn about the client's needs and decide together whether to work together. It is not a sales performance. It is a diagnosis. The best calls are mostly the client talking.

Objections such as "it's too expensive", "I need to think about it" or "I can do it myself" are normal. They usually signal that the client needs more clarity, confidence or time, not that the conversation is over.`,
        whyItMatters: `Many projects are won or lost on the call. A calm, curious approach builds trust, reveals the true scope (which protects your pricing) and shows you are professional.`,
        sections: [
          { title: 'A 20-minute call structure', body: `1) **Open (2 min):** thank them, explain the plan for the call. 2) **Discover (10 min):** ask about goals, current situation, what they have tried, timeline, budget and who decides. 3) **Summarise (2 min):** repeat what you heard. 4) **Propose (4 min):** outline how you would help and the price range. 5) **Next step (2 min):** agree what happens next.` },
          { title: 'Questions that reveal what matters', body: `- "What would a great result look like in three months?"\n- "What have you tried so far?"\n- "What is the cost of this staying as it is?"\n- "Who else is involved in the decision?"\n- "Do you have a budget in mind?"\nLet silences happen. People often add the most useful detail after a pause.` },
          { title: 'Handling common objections', body: `**Too expensive:** ask what they were expecting and what they are comparing with; explain the value and offer a smaller scope or tier. **Need to think:** ask what questions would help them decide, and agree a follow-up date. **I can do it myself:** acknowledge that they can, and explain how your help saves them time or improves the result. Never argue; stay curious.` },
        ],
        keyTerms: [{ term: 'Discovery call', def: 'A short call to learn about a client\'s needs and fit.' }, { term: 'Objection', def: 'A concern or hesitation expressed by a client.' }],
        howTo: ['Write your five-part call plan.', 'Prepare six discovery questions.', 'Write responses to the three common objections.', 'Practise with a friend for 15 minutes.', 'Take notes during real calls.', 'Send a summary and next steps by message within a day.'],
        template: { title: 'Discovery call plan and notes', intro: 'Use as a one-page guide during calls.', body: `OPEN: Thank you, plan for the call, ask permission to take notes.\n\nDISCOVER\n- What would a great result look like?\n- What have you tried?\n- What's the cost of staying as is?\n- Timeline?\n- Budget in mind?\n- Who else decides?\n\nSUMMARISE: "So what I'm hearing is..."\n\nPROPOSE: How I'd help, price range, what's included.\n\nNEXT STEP: Who sends what, by when.\n\nOBJECTION NOTES\nToo expensive: \nNeed to think: \nI can do it myself: ` },
        example: `A client says "It's more than I expected." The freelancer replies: "Understandable. What were you expecting? ... I can offer a lighter package with 8 posts, or we can start with one month to see results." The client chooses the lighter package.`,
        practice: `Write your call plan, six questions and three objection responses, then practise a mock call with someone for 15 minutes.`,
        successCriteria: 'Your call plan has five parts, your questions are open, and your objection replies are calm and offer options.',
        commonMistakes: 'Talking more than listening, or arguing against objections.',
        takeaways: ['Calls are diagnosis, not performance.', 'Ask open questions and listen.', 'Meet objections with curiosity and options.'],
        knowledgeCheck: [
          Q('In a discovery call, who should talk most?', ['You', 'The client', 'Nobody', 'A third party'], 1, 'You learn by listening.'),
          Q('"Too expensive" is best met with:', ['Arguing', 'Curious questions and options such as a smaller scope', 'Hanging up', 'A bigger price'], 1, 'Understanding the concern allows better options.'),
          Q('After a call you should:', ['Wait weeks', 'Send a summary and next steps within a day', 'Delete notes', 'Ignore it'], 1, 'Clear follow-up builds trust.'),
          Q('A good discovery question is:', ['"You will buy, right?"', '"What would a great result look like?"', '"Why not?"', '"Is that all?"'], 1, 'Open questions reveal needs.'),
        ],
      }),

      A('ff-m7-a', [
        Q('Most proposals fail because they are mostly about:', ['The client', 'The freelancer', 'Weather', 'Pricing'], 1, 'Clients want to know you understood them.'),
        Q('A better opening is:', ['Your biography', 'The client\'s situation in their words', 'A tool list', 'A discount'], 1, 'It shows understanding.'),
        Q('The four parts of the proposal structure are:', ['Problem, solution, proof, next step', 'Logo, font, colour, price', 'Hello, bye, thanks, sorry', 'None'], 0, 'Client-first order.'),
        Q('Where should the price appear?', ['Hidden', 'Plainly, with inclusions', 'Nowhere', 'After payment'], 1, 'Clarity builds trust.'),
        Q('What should you customise every time?', ['The font', 'The opening lines and proof', 'Your name', 'The signature'], 1, 'Relevance gets replies.'),
        Q('Silence after a proposal usually means:', ['A firm no', 'The person may be busy or forgot', 'Delete the lead', 'Legal trouble'], 1, 'Follow-ups often revive the conversation.'),
        Q('Each follow-up should:', ['Repeat the same text', 'Add something new', 'Be angry', 'Beg'], 1, 'Value makes follow-ups welcome.'),
        Q('A discovery call is mostly:', ['You talking', 'The client talking', 'Silence', 'A contract'], 1, 'You are diagnosing, not performing.'),
        Q('"Too expensive" is best met with:', ['Arguing', 'Curiosity and options such as smaller scope', 'Hanging up', 'A bigger price'], 1, 'Understand then offer options.'),
        Q('If someone says no you should:', ['Keep messaging', 'Thank them and stop', 'Argue', 'Block them'], 1, 'Respect protects your reputation.'),
      ]),
    ],
  },

  /* ---------------- MODULE 8 ---------------- */
  {
    id: 'ff-m8', title: 'Pricing',
    objective: 'Set beginner-appropriate prices with confidence, and understand how to raise them as proof accumulates.',
    lessons: [
      L('ff-m8-l1', 'Why "Charge What You\u2019re Worth" Is Bad Beginner Advice', 'concept', 22, {
        objectives: ['Explain why "charge what you are worth" is unhelpful at the start', 'Use cost, market and value as three price anchors', 'Avoid both underpricing and overpricing traps'],
        concept: `"Charge what you are worth" sounds empowering, but it gives you nothing to calculate. Your worth as a person is not a price. A price is a number set by three things: what you need to earn (your costs and income goals), what the market pays for similar work, and the value the client receives.

Beginners tend to make one of two mistakes: pricing so low that the work is unsustainable and attracts difficult clients, or pricing so high, without proof, that nobody says yes. The goal is a fair, sustainable beginner price with a clear plan to raise it.`,
        whyItMatters: `Prices send signals. Extremely low prices can make buyers doubt quality and train you to resent your work. Prices with no logic make negotiation stressful. A simple, reasoned price lets you quote calmly.`,
        sections: [
          { title: 'The three anchors', body: `- **Cost anchor:** the minimum you need per hour or project to cover living costs, business costs, taxes and savings.\n- **Market anchor:** what comparable freelancers charge to similar clients.\n- **Value anchor:** what the result is worth to the client, such as extra bookings or saved time.\nYour price should sit above your cost anchor, be in a believable range for the market and be justified by value.` },
          { title: 'The underpricing trap', body: `Pricing far below the market can attract bargain hunters who negotiate hardest and value your work least. A small discount for a first client with clear conditions, such as a testimonial in return, is different from permanently cheap pricing.` },
          { title: 'The overpricing trap', body: `Charging premium prices before you have proof can slow sales. Raise prices as testimonials, case studies and results accumulate. Price rises are a sign of progress, not of greed.` },
        ],
        keyTerms: [{ term: 'Cost anchor', def: 'The minimum price you need to cover costs and goals.' }, { term: 'Market anchor', def: 'What similar freelancers charge.' }, { term: 'Value anchor', def: 'What the result is worth to the client.' }],
        howTo: ['Estimate your monthly living and business costs.', 'Estimate hours you can work on client projects each month.', 'Note three comparable prices in your niche from your research.', 'Write what a good result is worth to your client.', 'Choose a beginner price above your cost anchor and within the market range.', 'Write one sentence explaining the reasoning.'],
        example: `Amara's costs mean she needs about 6,600 per hour. Comparable freelancers charge 5,000 to 12,000 per hour equivalent. A salon booking pays for itself quickly, so she prices her first package at a fair mid-low market level, and plans to raise it after three testimonials.`,
        practice: `Write your three anchors, choose a beginner price and write the reasoning in two sentences.`,
        successCriteria: 'Your price is above your cost anchor, within a researched market range and has a clear reason.',
        commonMistakes: 'Picking a price from emotion rather than the three anchors.',
        takeaways: ['A price is built from cost, market and value.', 'Avoid extreme underpricing and unproven overpricing.', 'Plan to raise prices with proof.'],
        knowledgeCheck: [
          Q('Which is NOT one of the three price anchors?', ['Cost', 'Market', 'Value', 'Mood'], 3, 'Mood is not a price anchor.'),
          Q('Pricing far below market often:', ['Attracts ideal clients', 'Attracts bargain hunters and leads to burnout', 'Guarantees loyalty', 'Raises quality'], 1, 'Very low prices can attract difficult clients.'),
          Q('Your price should sit:', ['Below your costs', 'Above your cost anchor', 'At zero', 'At random'], 1, 'A sustainable price covers costs and goals.'),
          Q('Raising prices as proof grows is:', ['Greedy', 'A normal sign of progress', 'Illegal', 'Impossible'], 1, 'Proof supports higher prices.'),
        ],
      }),

      L('ff-m8-l2', 'Flat Fee vs. Hourly (Beginner Guidance)', 'concept', 22, {
        objectives: ['Compare flat-fee, hourly and retainer pricing', 'Choose a model for your service', 'Protect yourself under each model'],
        concept: `There are three common pricing models. Hourly: the client pays for time spent. Flat fee: the client pays one price for a defined result. Retainer: the client pays a regular monthly amount for ongoing work or availability.

For most beginners, flat fees for clearly defined projects work well, because clients prefer a known price and you can earn more as you get faster. Hourly works for uncertain or open-ended tasks. Retainers are ideal once you have a happy client with ongoing needs.`,
        whyItMatters: `The wrong model can quietly cost you. Hourly pricing punishes you for becoming faster. Flat fees without a clear scope punish you when the project grows. Understanding trade-offs helps you pick and protect your pricing.`,
        sections: [
          { title: 'Trade-offs', body: `- **Hourly:** simple and fair for uncertain work, but clients may worry about the final bill and your income is capped by hours.\n- **Flat fee:** clients like certainty; you benefit from efficiency; needs a clear scope and revision limits.\n- **Retainer:** steady income and easier planning; needs clear monthly deliverables so the work does not balloon.` },
          { title: 'Protecting yourself', body: `With flat fees, define scope and revision rounds and charge for extras. With hourly, keep honest time logs and share estimates. With retainers, state what is included each month and what happens to unused time.` },
          { title: 'A sensible beginner path', body: `Start with defined flat-fee packages. Use a small hourly rate for extra work outside scope. Offer a retainer to clients who love the first project.` },
        ],
        keyTerms: [{ term: 'Flat fee', def: 'One price for a defined result.' }, { term: 'Hourly rate', def: 'A price per hour of work.' }, { term: 'Retainer', def: 'A recurring monthly payment for ongoing work.' }],
        howTo: ['Write your service.', 'Decide whether it suits a flat fee, hourly rate or retainer.', 'Write why.', 'Write the protections you need (scope, revisions, time logs, monthly inclusions).', 'Set an hourly rate for out-of-scope extras.', 'Describe the retainer you could offer later.'],
        example: `A freelancer prices her main service as a flat monthly package (a retainer with clear deliverables), charges a separate hourly rate for extras, and provides a one-off flat-fee audit as an entry offer.`,
        practice: `Choose a pricing model for your service, write your protections and set an hourly rate for extras.`,
        successCriteria: 'Your model fits the service and includes written protections.',
        commonMistakes: 'Using hourly pricing for work you will get faster at, or flat fees with no scope.',
        takeaways: ['Hourly, flat fee and retainer each have uses.', 'Beginners often do well with defined flat fees.', 'Protect each model with clear boundaries.'],
        knowledgeCheck: [
          Q('Hourly pricing can:', ['Reward you for getting faster', 'Punish you for getting faster', 'Guarantee profit', 'Replace contracts'], 1, 'Faster work means fewer billable hours.'),
          Q('A retainer is:', ['One-off payment', 'A recurring payment for ongoing work', 'A refund', 'A discount'], 1, 'It gives steady income.'),
          Q('Flat fees need:', ['No scope', 'A clear scope and revision limits', 'No contract', 'Hourly logs only'], 1, 'Scope prevents unpaid extras.'),
          Q('A sensible beginner path often starts with:', ['Unlimited retainers', 'Defined flat-fee packages', 'Free work', 'No pricing'], 1, 'Clear packages are easier to sell.'),
        ],
      }),

      L('ff-m8-l3', 'Raising Your Prices Over Time', 'concept', 22, {
        objectives: ['Know when to raise prices', 'Plan a price rise for new and existing clients', 'Communicate increases calmly'],
        concept: `Your first prices are a starting point. As you gain experience, testimonials, results and demand, your prices should rise. Signs it is time: you are winning most proposals easily, you have a waiting list, your work has clearly improved, or your costs have increased.

Raise prices for new clients first. For existing clients, give notice and, where possible, explain the value they receive.`,
        whyItMatters: `If you never raise prices, inflation, rising costs and your own growth steadily reduce your real income. Planned increases keep your business healthy.`,
        sections: [
          { title: 'Signals and a simple schedule', body: `A common habit is to review prices every three to six months. If more than about two-thirds of your proposals are accepted without discussion, you are probably too cheap. Increase by a modest step, such as ten to twenty percent, and observe the effect.` },
          { title: 'Telling existing clients', body: `Give clear notice, such as 30 days. Thank them for their loyalty, state the new price and the date, and, if appropriate, offer to keep the current price for a short period or for a prepaid block. Keep the message kind and brief.` },
          { title: 'Using proof to justify', body: `Point to what has improved: more experience, better results, new deliverables. You do not need to over-explain or apologise.` },
        ],
        keyTerms: [{ term: 'Price review', def: 'A scheduled check on whether your prices still fit.' }, { term: 'Notice period', def: 'How much warning you give before a change.' }],
        howTo: ['Set a date to review prices every few months.', 'Check your win rate and workload.', 'Choose a modest increase for new clients.', 'Write a message for existing clients with a notice period.', 'Update your offers and proposals.', 'Record the effect on enquiries and wins.'],
        template: { title: 'Price increase message', intro: 'Keep it short and kind.', body: `Hi [name], thank you for being a great client. From [date, at least 30 days away], my [service] will be [new price]. This reflects [brief reason, e.g. the added deliverables and experience]. Until [date], you can continue at the current price. I really appreciate working with you and look forward to the next months!` },
        example: `A freelancer who wins nearly every proposal raises prices by fifteen percent for new clients, sends existing clients a 30-day notice, and watches that her win rate drops only slightly while income rises.`,
        practice: `Set your price review date, choose an increase and write your client notice message.`,
        successCriteria: 'You have a review date, a modest increase and a kind, clear notice message.',
        commonMistakes: 'Never raising prices, or raising them with no notice and no explanation.',
        takeaways: ['Review prices every few months.', 'Raise for new clients first.', 'Give existing clients notice.'],
        knowledgeCheck: [
          Q('A sign you may be too cheap is:', ['Winning nearly all proposals easily', 'Losing every proposal', 'No enquiries', 'No clients'], 0, 'Very high acceptance can mean you could charge more.'),
          Q('For existing clients you should:', ['Raise without notice', 'Give clear notice, such as 30 days', 'Hide it', 'Delete them'], 1, 'Notice respects the relationship.'),
          Q('A modest step is:', ['1,000 percent', 'Around ten to twenty percent', 'Zero', 'Random'], 1, 'Moderate increases limit risk.'),
          Q('You should explain increases:', ['With long apologies', 'Briefly and kindly', 'Never', 'Rudely'], 1, 'Be confident and clear.'),
        ],
      }),

      L('ff-m8-l4', 'Working Out Your Minimum Rate and Quoting a Project', 'how-to', 30, {
        objectives: ['Calculate a minimum hourly rate from your real costs and goals', 'Estimate a project and add a sensible buffer', 'Present a quote with confidence'],
        concept: `Your minimum rate is the lowest price per hour that still covers your living costs, business costs, tax and savings, given that you will not bill every hour you work. Much of your week goes on marketing, admin and calls that clients do not pay for, so billable hours are fewer than hours worked.

To quote a project, estimate the hours each step takes, multiply by your rate, add a buffer for surprises and revisions, then compare to the market and the value to the client.`,
        whyItMatters: `Quoting from a calculation means you can stand behind your price calmly. It also stops the common mistake of forgetting unpaid time, which turns "good-looking" prices into poor real earnings.`,
        sections: [
          { title: 'Minimum rate formula', body: `1) Take-home income you want per month. 2) Add monthly business costs (tools, data, equipment). 3) Divide by (1 minus your tax and savings reserve percentage). 4) Divide by realistic billable hours per month.\nExample: want 400,000 take-home, 50,000 costs, 15 percent reserve, 80 billable hours. (400,000 + 50,000) = 450,000. 450,000 divided by 0.85 is about 529,400. 529,400 divided by 80 is about 6,620 per hour. Use your own currency and numbers, and check local tax rules.` },
          { title: 'Estimating a project', body: `Break the project into steps and estimate hours for each, including communication and revisions. Add a buffer of 15 to 25 percent for the unexpected. Hours times rate plus buffer gives your cost-based quote. Example: 10 hours at 6,620 is 66,200; add 20 percent for a buffer, about 79,400.` },
          { title: 'Presenting the quote', body: `State the price plainly with what is included and the timeline. Do not apologise or over-explain. If the client pushes back, adjust scope, not your hourly logic: offer a lighter package rather than a discount for the same work.` },
        ],
        keyTerms: [{ term: 'Billable hours', def: 'Hours you can actually charge clients for.' }, { term: 'Buffer', def: 'Extra time or money added to cover surprises.' }, { term: 'Reserve', def: 'A percentage set aside for tax and savings.' }],
        howTo: ['Write your target monthly take-home.', 'Add monthly business costs.', 'Choose a tax and savings reserve percentage.', 'Estimate realistic billable hours.', 'Compute your minimum hourly rate.', 'Estimate a sample project in steps and add a buffer.', 'Compare with market and value, then set a final quote.'],
        template: { title: 'Rate and quote calculator', intro: 'Fill in with your own numbers.', body: `RATE\nTarget monthly take-home: \n+ Monthly business costs: \n= Subtotal: \nTax and savings reserve (%): \nSubtotal / (1 - reserve) = Needed income: \nRealistic billable hours per month: \nMINIMUM HOURLY RATE = Needed income / billable hours: \n\nQUOTE\nStep | Hours\n\nTotal hours: \nx Rate = \n+ Buffer (15-25%) = \nQUOTE: \nMarket check: \nValue check: ` },
        example: `Using the numbers in the lesson, the minimum rate is about 6,620 per hour. A 10-hour project is 66,200, and with a 20 percent buffer about 79,400. She quotes 79,000 including two revision rounds, and a lighter package at 55,000 if the budget is tight.`,
        practice: `Complete the rate and quote calculator with your real numbers and prepare a main quote and a lighter option.`,
        successCriteria: 'Your rate is calculated step by step, your project estimate has a buffer and you have a lighter alternative.',
        commonMistakes: 'Forgetting unpaid time and tax when setting your rate, or discounting the same work instead of reducing scope.',
        takeaways: ['Billable hours are fewer than hours worked.', 'Estimate, then add a buffer.', 'Adjust scope, not your logic, when budgets are tight.'],
        knowledgeCheck: [
          Q('Why are billable hours fewer than hours worked?', ['Clients refuse to pay', 'Marketing, admin and calls are not billed', 'Law forbids it', 'Time stops'], 1, 'Unbilled tasks take real time.'),
          Q('If 450,000 is needed after costs and you reserve 15 percent, the needed income is about:', ['450,000', '529,400', '382,500', '600,000'], 1, '450,000 divided by 0.85 is about 529,400.'),
          Q('A buffer in a quote covers:', ['Your hobbies', 'Surprises and revisions', 'Taxes only', 'Nothing'], 1, 'Projects rarely go exactly to plan.'),
          Q('If a client says the price is too high you should first:', ['Cut the price for the same work', 'Offer a lighter scope or tier', 'Argue', 'Stop replying'], 1, 'Scope changes protect your rate.'),
        ],
      }),

      A('ff-m8-a', [
        Q('Which is NOT a price anchor?', ['Cost', 'Market', 'Value', 'Mood'], 3, 'Mood does not set a price.'),
        Q('Pricing far below market often:', ['Attracts ideal clients', 'Attracts bargain hunters and leads to burnout', 'Guarantees loyalty', 'Raises quality'], 1, 'Very low prices attract difficult clients.'),
        Q('Hourly pricing can:', ['Reward you for getting faster', 'Punish you for getting faster', 'Guarantee profit', 'Replace contracts'], 1, 'Faster work means fewer billable hours.'),
        Q('A retainer is:', ['A one-off payment', 'A recurring payment for ongoing work', 'A refund', 'A discount'], 1, 'It brings steady income.'),
        Q('Flat fees need:', ['No scope', 'A clear scope and revision limits', 'No contract', 'Hourly logs only'], 1, 'Scope prevents unpaid extras.'),
        Q('A sign you may be too cheap is:', ['Winning nearly all proposals easily', 'Losing every proposal', 'No enquiries', 'No clients'], 0, 'Very high acceptance suggests room to charge more.'),
        Q('For existing clients, a price rise needs:', ['No notice', 'Clear notice such as 30 days', 'Secrecy', 'Rudeness'], 1, 'Notice respects relationships.'),
        Q('Billable hours are fewer than hours worked because:', ['Clients refuse to pay', 'Marketing, admin and calls are not billed', 'Law forbids it', 'Time stops'], 1, 'Unbilled tasks take time.'),
        Q('If 450,000 is needed and you reserve 15 percent, the needed income is about:', ['450,000', '529,400', '382,500', '600,000'], 1, '450,000 divided by 0.85.'),
        Q('If a client says the price is too high, first:', ['Cut the price for the same work', 'Offer lighter scope or tier', 'Argue', 'Stop replying'], 1, 'Change scope, not your logic.'),
      ]),
    ],
  },

  /* ---------------- MODULE 9 ---------------- */
  {
    id: 'ff-m9', title: 'Contracts, Deposits & Invoices',
    objective: 'Protect your time and money with the basic paperwork every freelancer needs, even for small projects.',
    lessons: [
      L('ff-m9-l1', 'Why Even Small Projects Need a Contract', 'concept', 24, {
        objectives: ['Explain what a freelance contract does for both sides', 'List the essential clauses of a simple contract', 'Know when to seek professional legal advice'],
        concept: `A contract is a written agreement about what will be done, for how much, by when and under what conditions. It is not an insult to the client. It is a shared reference that prevents misunderstandings. Most freelance disputes come from different memories of what was promised, and a short written agreement removes that risk.

Contracts do not have to be long or scary. For small projects, a clear one or two page agreement signed by both sides, or accepted by a clear written "yes", is a huge improvement over nothing. This is general information, not legal advice. Laws differ by country, and for large or complex projects you should consider advice from a qualified professional.`,
        whyItMatters: `A contract protects your pay, defines the work and sets expectations for revisions, deadlines and ownership. It also signals professionalism, which often makes clients take your time and terms more seriously.`,
        sections: [
          { title: 'Clauses every simple contract should include', body: `- **Parties:** who is the client and who is the freelancer.\n- **Scope and deliverables:** exactly what you will do.\n- **Timeline:** start date, milestones, delivery date, and what the client must provide on time.\n- **Price and payment terms:** amount, currency, deposit, due dates and late payment terms.\n- **Revisions:** how many rounds are included and the price of extras.\n- **Ownership:** usually the client owns the final work once fully paid, and you may show it in your portfolio unless agreed otherwise.\n- **Confidentiality:** if needed.\n- **Cancellation:** what happens if either side stops, including payment for work done.\n- **Contact and agreement:** how changes are agreed and how each side signs.` },
          { title: 'Electronic signatures and written acceptance', body: `Many freelancers use free or low-cost electronic signature tools, or a clearly worded email acceptance. Check what is accepted where you and your client are located. Save a copy of every signed agreement.` },
          { title: 'Templates and professional advice', body: `Templates are a good starting point, but adapt them to your service and location. For higher-value or complicated work, a short review by a lawyer is often a worthwhile investment.` },
        ],
        keyTerms: [{ term: 'Contract', def: 'A written agreement on scope, price, timing and terms.' }, { term: 'Clause', def: 'One specific term in a contract.' }, { term: 'Kill fee', def: 'A fee payable if the client cancels after work has started.' }],
        howTo: ['List the clauses above for your own service.', 'Write each in one or two plain sentences.', 'Add your payment terms and revision policy.', 'Add a cancellation and ownership clause.', 'Ask a friend to read it for clarity.', 'Decide how you will collect signatures.', 'Note when you would seek professional advice.'],
        template: { title: 'Simple freelance agreement outline', intro: 'A starting structure. Adapt it and consider professional advice for larger projects; this is not legal advice.', body: `FREELANCE SERVICES AGREEMENT\n\n1. Parties: [Client name and contact] and [Your name and contact]\n2. Services: [Description of work and deliverables]\n3. Timeline: Start [date]; delivery [date]. The client will provide [materials] by [date]. Delays in materials may move the timeline.\n4. Fees: [Total price and currency]. A deposit of [%] is due before work starts. Balance due [date or milestone].\n5. Late payment: [Your terms, e.g. work pauses until payment is received].\n6. Revisions: [Number] rounds included. Extra rounds or new requests are priced separately and agreed in writing.\n7. Ownership: On full payment, the client owns the final deliverables. The freelancer may display the work in a portfolio unless otherwise agreed.\n8. Confidentiality: [If needed].\n9. Cancellation: If the client cancels, the deposit is non-refundable and work completed to date is payable. If the freelancer cancels, [terms].\n10. Agreement: Agreed by both parties by signature or written acceptance.\n\nClient: ________ Date: ____\nFreelancer: ________ Date: ____` },
        example: `A freelancer is asked to "add a few more posts" after delivery. Because the contract lists 12 posts and two revision rounds, she replies politely, quotes the extra posts, and the client agrees. Without the contract, this could have become an argument.`,
        caseStudy: { title: 'The project with nothing in writing', situation: 'A freelancer agreed verbally to design a set of graphics for a client. Midway, the client said the price had been much lower and wanted twice as many designs.', moves: ['She realised nothing was written, so she could not show the original agreement.', 'She negotiated a compromise but earned much less than planned.', 'From then on she used a one-page agreement and a deposit for every project.'], result: 'Later projects had fewer disputes, and clients commented that it made her look more professional.', lesson: 'A short written agreement is cheaper than a long argument.' },
        practice: `Adapt the agreement outline to your own service, fill in real terms and have one person read it for clarity.`,
        successCriteria: 'Your agreement covers scope, timeline, price, deposit, revisions, ownership and cancellation in plain language.',
        commonMistakes: 'Starting work on a verbal agreement.',
        takeaways: ['A contract prevents misunderstandings.', 'Include scope, timing, payment, revisions, ownership and cancellation.', 'Consider professional advice for larger work.'],
        knowledgeCheck: [
          Q('A contract mainly:', ['Insults clients', 'Prevents misunderstandings by writing down the agreement', 'Is only for big firms', 'Replaces invoices'], 1, 'It is a shared reference for both sides.'),
          Q('Which clause protects you from endless changes?', ['Revisions', 'Weather', 'Colour', 'Nothing'], 0, 'Defined revision rounds limit unpaid work.'),
          Q('A kill fee is:', ['A bonus', 'A fee payable if the client cancels after work has begun', 'A refund', 'A tax'], 1, 'It compensates you for time reserved or work done.'),
          Q('For large or complicated projects you should:', ['Skip contracts', 'Consider professional legal advice', 'Use no template', 'Rely on memory'], 1, 'Higher stakes justify a professional review.'),
        ],
      }),

      L('ff-m9-l2', 'Deposits: Protecting Your Time', 'how-to', 24, {
        objectives: ['Explain why deposits protect both sides', 'Choose a deposit structure for your service', 'Write clear payment terms and handle pushback'],
        concept: `A deposit is a portion of the total fee paid before work starts. It confirms that the client is committed, covers your first hours of effort and reserves your time. Common structures include 30 to 50 percent upfront with the balance on delivery, or payments split into milestones.

Deposits also filter out time-wasters. Serious clients are used to paying a deposit, because it is standard practice in many industries.`,
        whyItMatters: `Without a deposit, you carry all the risk: you invest time and the client can disappear. A deposit shifts the relationship to a more balanced and professional footing.`,
        sections: [
          { title: 'Choosing a structure', body: `For short projects: 50 percent upfront and 50 percent on delivery (before final files are released). For longer projects: deposit, a milestone payment and a final payment. For monthly services: payment in advance each month. Release final files after the final payment is received.` },
          { title: 'Writing the terms clearly', body: `State the amounts, the due dates and what happens if payment is late (for example, work pauses). Include whether the deposit is refundable, and under what conditions. Put it in the proposal, the contract and the invoice.` },
          { title: 'Handling pushback', body: `If a client hesitates, explain calmly: "The deposit reserves my time and lets me start. It's standard for my projects." You may offer a smaller deposit or milestone payments, but avoid starting large work with no commitment.` },
        ],
        keyTerms: [{ term: 'Deposit', def: 'A portion of the fee paid before work begins.' }, { term: 'Milestone payment', def: 'A payment due when a stage of the project is complete.' }],
        howTo: ['Choose a deposit percentage and structure.', 'Write the payment schedule with dates.', 'Decide what triggers each payment.', 'Write the late payment rule.', 'State refund conditions.', 'Prepare a calm reply for pushback.', 'Add the terms to your offer and contract.'],
        template: { title: 'Payment terms and pushback reply', intro: 'Adapt amounts and wording.', body: `PAYMENT TERMS\nA [50]% deposit is due before work begins. The remaining [50]% is due on delivery, before final files are released. If a payment is more than [7] days late, work pauses until it is received. The deposit is non-refundable once work has started, as it reserves my time.\n\nREPLY TO PUSHBACK\n"Totally understand. The deposit reserves your slot and lets me start straight away. It's standard in my projects. If it helps, I can split the balance into two payments tied to milestones."` },
        example: `A freelancer quoted 80,000 with a 50 percent deposit. The client asks to pay after delivery. She replies politely with her standard terms and offers two milestone payments instead, and the client agrees.`,
        practice: `Write your deposit structure, payment terms and a pushback reply, and add them to your offer.`,
        successCriteria: 'Your terms specify amounts, due dates, late rules and refund conditions.',
        commonMistakes: 'Starting work with no payment commitment.',
        takeaways: ['Deposits protect both sides.', 'State terms in proposal, contract and invoice.', 'Release final files after final payment.'],
        knowledgeCheck: [
          Q('A common deposit range is:', ['0 percent', 'About 30 to 50 percent', '500 percent', 'None'], 1, 'Many freelancers ask for roughly a third to a half upfront.'),
          Q('Why release final files after final payment?', ['Spite', 'It protects your payment', 'Law demands it', 'Clients prefer waiting'], 1, 'It aligns delivery with payment.'),
          Q('If a client resists a deposit you should:', ['Start anyway with no terms', 'Explain calmly and consider milestones', 'Disappear', 'Raise the price'], 1, 'Professional flexibility within boundaries.'),
          Q('Payment terms belong in:', ['Only your head', 'Your proposal, contract and invoice', 'Nowhere', 'A diary'], 1, 'Consistent written terms avoid confusion.'),
        ],
      }),

      L('ff-m9-l3', 'Sending a Simple, Professional Invoice', 'how-to', 24, {
        objectives: ['List what a professional invoice includes', 'Create an invoice from a template', 'Send reminders for late payments politely'],
        concept: `An invoice is a formal request for payment. A clear invoice includes: your name and contact details, the client's name, a unique invoice number, the date, a description of the work, the amount (and currency), any deposit already paid, the amount due, the due date and how to pay.

Send invoices promptly, state the due date clearly, and make it easy to pay. Clients are more likely to pay quickly when the invoice is clear and arrives at the right time.`,
        whyItMatters: `Late payments are a major stress for freelancers. A professional, timely invoice with clear terms reduces delays and gives you a record for your own bookkeeping.`,
        sections: [
          { title: 'Invoice essentials', body: `Invoice number and date; your details; client details; itemised description and amounts; subtotal, deposit paid and balance due; due date; payment instructions; late payment terms. Keep numbering consistent (for example, INV-001, INV-002).` },
          { title: 'Reminders', body: `Send a friendly reminder a couple of days before the due date, one on the due date if unpaid, and a firmer one a week later. Keep the tone professional and refer to the agreed terms. Pause or hold the work according to your contract if payment stays late.` },
          { title: 'Records', body: `Keep copies of all invoices, payments and agreements in one organised folder. You will need them for your own tracking and for any tax filings.` },
        ],
        keyTerms: [{ term: 'Invoice', def: 'A formal request for payment.' }, { term: 'Due date', def: 'The date by which payment should be received.' }, { term: 'Itemised', def: 'Listed line by line.' }],
        howTo: ['Create an invoice template.', 'Add your details and a numbering system.', 'Fill in the client and itemised work.', 'Show deposit paid and balance due.', 'Add due date and payment instructions.', 'Send promptly with a short friendly message.', 'Schedule reminders.'],
        template: { title: 'Invoice template and reminder messages', intro: 'Copy into a document or invoicing tool.', body: `INVOICE\nInvoice no: INV-001   Date: [date]   Due date: [date]\nFrom: [Your name, contact]\nTo: [Client name, contact]\n\nDescription | Amount\n[Item 1] | \n[Item 2] | \nSubtotal: \nDeposit paid: \nBALANCE DUE: [amount and currency]\n\nHow to pay: [instructions]\nLate payment: [terms]\nThank you!\n\nREMINDER 1 (before due): "Hi [name], a friendly reminder that invoice INV-001 is due on [date]. Let me know if you need anything from me."\nREMINDER 2 (a week late): "Hi [name], invoice INV-001 was due on [date]. Could you let me know when I can expect payment? As per our agreement, work is paused until it is received."` },
        example: `A freelancer sends an invoice the same day she delivers, due in seven days. She sends a reminder the day before the due date. The client pays on time and thanks her for the clear instructions.`,
        practice: `Create an invoice template, fill it in for a sample project and write your two reminder messages.`,
        successCriteria: 'Your invoice has all essentials and your reminders are polite and refer to agreed terms.',
        commonMistakes: 'Sending vague invoices late, or never sending reminders.',
        takeaways: ['Invoices should be clear, numbered and prompt.', 'State due date and payment instructions.', 'Remind politely and keep records.'],
        knowledgeCheck: [
          Q('Which is essential on an invoice?', ['A joke', 'Invoice number, amounts, due date and payment instructions', 'A selfie', 'Nothing'], 1, 'Clarity helps you get paid.'),
          Q('Itemised means:', ['Hidden', 'Listed line by line', 'Rounded', 'Free'], 1, 'It shows what the client is paying for.'),
          Q('A good time to send the invoice is:', ['Months later', 'Promptly after delivery or at the agreed milestone', 'Never', 'Before meeting'], 1, 'Prompt invoices get paid faster.'),
          Q('You should keep invoices and payment records:', ['Nowhere', 'In an organised folder', 'In a bin', 'On a napkin'], 1, 'Records support bookkeeping and tax.'),
        ],
      }),

      L('ff-m9-l4', 'Getting Paid Across Borders and Tax Basics', 'concept', 28, {
        objectives: ['Compare common ways to receive international payments', 'List the questions to ask before choosing a payment method', 'Understand the basics of tracking income and why to learn your local tax rules'],
        concept: `If you work with clients abroad, payment becomes a practical question. Common options include bank transfers, payment platforms and money-transfer services, and invoicing tools that let clients pay by card. Availability, fees, exchange rates and limits vary by country and change over time, and some tools are not available in every country.

Before agreeing a method with a client, check what works for both sides. Also, remember that income is usually taxable. This lesson gives general information only. Rules differ widely, so check with your local tax authority or a qualified professional for what applies to you.`,
        whyItMatters: `High fees, delays or an unavailable payment method can cost you real money or even a project. Agreeing the method and currency early prevents unpleasant surprises, and good records make tax time much easier.`,
        sections: [
          { title: 'Questions to ask about any payment method', body: `- Is it available in my country and the client's?\n- What are the fees, and who pays them?\n- What exchange rate is used?\n- How long does it take to arrive?\n- Are there limits or verification steps?\n- Is there protection if something goes wrong?\nCompare two or three options with a small test payment before relying on one for a large project.` },
          { title: 'Agreeing currency and fees in writing', body: `State the currency in your contract and who covers transfer fees. Invoicing in the client's currency may make accepting easier for them, but check how conversion affects what you receive. Keep your own currency risk in mind when quoting.` },
          { title: 'Tax basics: keep records and set money aside', body: `In most places, freelance income must be declared, and you may need to register or file returns. Keep records of every invoice, payment and business expense. Set aside a percentage of each payment in a separate account for tax and slow months. Learn your local rules, ask your tax authority or a qualified accountant, and revisit them each year as laws change.` },
          { title: 'Staying safe with payments', body: `Never share bank login details or passwords. Be careful with payments that look too large, arrive from unrelated parties or require you to send money back. Use official apps and websites for your payment tools.` },
        ],
        keyTerms: [{ term: 'Exchange rate', def: 'The price of one currency in another.' }, { term: 'Transfer fee', def: 'A charge for sending or receiving money.' }, { term: 'Expense record', def: 'A saved receipt or note of a business cost.' }],
        howTo: ['List two or three payment methods you could use.', 'Answer the six questions for each using official information.', 'Choose a primary and a backup method.', 'Decide your preferred invoicing currency.', 'Open or set aside a separate account or pot for tax and savings.', 'Create a simple income and expense sheet.', 'Find your local tax authority\'s guidance for freelancers and note the deadlines.'],
        template: { title: 'Payment method comparison and income tracker', intro: 'Use official sources for fees and rules.', body: `PAYMENT METHOD COMPARISON\nMethod | Available to me? | Available to client? | Fees (who pays) | Exchange rate | Speed | Limits / verification | Protection\n\nMy primary method: \nMy backup method: \nInvoice currency: \nWho covers fees: \n\nINCOME AND EXPENSE TRACKER\nDate | Client | Invoice no | Amount (currency) | Fees | Amount received | Expense type | Expense amount | Notes\n\nTAX RESERVE\nPercentage I set aside from each payment: \nWhere it is kept: \nMy local tax authority and filing dates (to confirm): ` },
        example: `A freelancer in Lagos compares two ways to receive dollars from a UK client, checks fees and speed, sends a small test payment, and decides on a primary and a backup. She sets aside a fixed percentage of every payment, and keeps a simple sheet of invoices and expenses.`,
        practice: `Complete the comparison table using official information, choose a primary and backup method, set your tax reserve percentage, and start your tracker.`,
        successCriteria: 'You compared methods using official sources, chose primary and backup options, and have a working tracker and reserve plan.',
        commonMistakes: 'Choosing a payment method after the project starts, or ignoring tax until the deadline.',
        takeaways: ['Agree currency, method and fees in writing.', 'Test with a small payment first.', 'Keep records, set money aside and learn your local tax rules.'],
        knowledgeCheck: [
          Q('Before choosing a payment method you should check:', ['Only the logo', 'Availability, fees, exchange rate, speed and protection', 'Nothing', 'The weather'], 1, 'These factors decide what you actually receive.'),
          Q('Why send a small test payment?', ['It is required', 'To check the process and costs before a large project', 'To avoid contracts', 'To lower fees'], 1, 'Testing reduces surprises.'),
          Q('Setting aside a percentage of every payment helps with:', ['Parties', 'Tax and slow months', 'Marketing', 'Design'], 1, 'A reserve prevents shortfalls.'),
          Q('For tax rules you should:', ['Guess', 'Check your local authority or a qualified professional', 'Ignore them', 'Copy a friend in another country'], 1, 'Rules vary by place and change over time.'),
        ],
      }),

      A('ff-m9-a', [
        Q('A contract mainly:', ['Insults clients', 'Prevents misunderstandings by writing down the agreement', 'Is only for big firms', 'Replaces invoices'], 1, 'It is a shared reference.'),
        Q('Which clause limits endless changes?', ['Revisions', 'Weather', 'Colour', 'None'], 0, 'Defined rounds limit unpaid work.'),
        Q('A kill fee is:', ['A bonus', 'A fee if the client cancels after work has begun', 'A refund', 'A tax'], 1, 'It compensates reserved time or work done.'),
        Q('A typical deposit range is about:', ['0 percent', '30 to 50 percent', '500 percent', 'None'], 1, 'Many freelancers ask for a third to a half.'),
        Q('Why release final files after final payment?', ['Spite', 'It protects your payment', 'Law demands it', 'Clients prefer waiting'], 1, 'It aligns delivery and payment.'),
        Q('Which is essential on an invoice?', ['A joke', 'Invoice number, amounts, due date and payment instructions', 'A selfie', 'Nothing'], 1, 'Clarity gets you paid.'),
        Q('A good time to invoice is:', ['Months later', 'Promptly at delivery or the agreed milestone', 'Never', 'Before meeting'], 1, 'Prompt invoices are paid faster.'),
        Q('Before choosing a payment method check:', ['Only the logo', 'Availability, fees, exchange rate, speed and protection', 'Nothing', 'The weather'], 1, 'These decide what you receive.'),
        Q('Why send a small test payment first?', ['It is required', 'To check the process and costs', 'To avoid contracts', 'To lower fees'], 1, 'Testing reduces surprises.'),
        Q('For tax rules you should:', ['Guess', 'Check your local authority or a qualified professional', 'Ignore them', 'Copy a friend abroad'], 1, 'Rules vary by place.'),
      ]),
    ],
  },

  /* ---------------- MODULE 10 ---------------- */
  {
    id: 'ff-m10', title: 'Client Communication & Delivery',
    objective: 'Deliver work professionally and communicate in a way that earns repeat clients and referrals.',
    lessons: [
      L('ff-m10-l1', 'Setting Expectations Early', 'concept', 22, {
        objectives: ['Run a kickoff that sets clear expectations', 'Agree communication channels, response times and approval steps', 'Prevent the most common sources of friction'],
        concept: `Most client problems are expectation problems. The client expected something different, faster, cheaper or with more involvement from you than you planned. Setting expectations in the first days of a project prevents most of that.

A kickoff message or call covers: the goal and success criteria, the timeline and milestones, what you need from the client and by when, how you will communicate (channel and typical response times), how feedback and approval work, and what happens if things change.`,
        whyItMatters: `Clear expectations reduce stress for both sides, speed up approvals and make clients feel they are in capable hands, which leads to repeat work and referrals.`,
        sections: [
          { title: 'The kickoff checklist', body: `Goal and success criteria. Deliverables and scope. Milestones and dates. What you need from the client (assets, access, approvals) and by when. Communication channel and response times (for example, within one business day). Feedback process (consolidated, one decision-maker). Payment schedule. How changes are handled.` },
          { title: 'Response times and boundaries', body: `Tell clients when you work and how quickly you reply. Being reachable at all hours teaches clients to expect it. Clear working hours protect your focus and your health.` },
          { title: 'One decision-maker', body: `Ask who gives final approval. Feedback from many people with different opinions can derail a project. Agree that feedback will be consolidated into a single set of comments.` },
        ],
        keyTerms: [{ term: 'Kickoff', def: 'The first conversation or message that starts a project properly.' }, { term: 'Milestone', def: 'A checkpoint with a date and a deliverable.' }, { term: 'Approval', def: 'Written agreement that a stage is complete.' }],
        howTo: ['Write the kickoff checklist items for your service.', 'Draft a kickoff message with timeline, needs and communication rules.', 'Define your working hours and reply times.', 'Ask who the single decision-maker is.', 'Send the message on day one.', 'Save it as a template.'],
        template: { title: 'Kickoff message', intro: 'Send within a day of the deposit.', body: `Hi [name], I'm excited to start! Here's how we'll work together:\n\nGOAL: [goal and success criteria]\nDELIVERABLES: [list]\nTIMELINE: [milestones and dates]\nWHAT I NEED FROM YOU: [assets/access] by [date]\nCOMMUNICATION: We'll use [channel]. I reply within [one business day], [days/hours].\nFEEDBACK: Please send one consolidated set of comments per round, from [decision-maker].\nREVISIONS: [number] rounds included.\nPAYMENT: [schedule].\n\nIf anything changes, we'll agree it in writing first. Thank you! [Name]` },
        example: `After the deposit, a freelancer sends her kickoff message. The client replies with the missing materials the same day and confirms one person will give feedback. The project runs smoothly with no confusion about timing.`,
        practice: `Write your kickoff checklist and kickoff message and note your working hours and reply times.`,
        successCriteria: 'Your message covers goal, timeline, needs, communication, feedback, revisions and payment.',
        commonMistakes: 'Starting work with no agreed timeline or communication rules.',
        takeaways: ['Most friction is an expectation problem.', 'A kickoff covers goals, dates, needs and communication.', 'Agree one decision-maker.'],
        knowledgeCheck: [
          Q('Most client problems come from:', ['Weather', 'Different expectations', 'Fonts', 'Bad luck'], 1, 'Unclear expectations cause friction.'),
          Q('A kickoff should include:', ['Only your price', 'Goal, timeline, needs, communication and feedback process', 'Only a greeting', 'Nothing'], 1, 'These items prevent surprises.'),
          Q('Why tell clients your reply times?', ['To show off', 'To set boundaries and expectations', 'It is required', 'To avoid replying'], 1, 'Clear response times reduce pressure and anxiety.'),
          Q('Why ask for one decision-maker?', ['To avoid conflicting feedback', 'To cut your pay', 'It is a rule', 'To skip approvals'], 0, 'Many opinions can derail a project.'),
        ],
      }),

      L('ff-m10-l2', 'Delivering Work Professionally', 'how-to', 24, {
        objectives: ['Prepare a delivery that is complete and easy to use', 'Present the work with context and clear next steps', 'Handle feedback and approvals smoothly'],
        concept: `Delivery is more than sending files. A professional delivery includes the finished work, in the right formats, organised clearly, with a short note explaining what is included, how to use it and what happens next. It is also the best time to ask for feedback, a testimonial and future work.

Check your work against the original brief before delivering. Fixing errors before the client sees them is the cheapest form of quality control.`,
        whyItMatters: `The delivery is the last thing the client experiences, and it colours how they remember the whole project. A tidy, thoughtful delivery encourages repeat work and referrals.`,
        sections: [
          { title: 'Pre-delivery checklist', body: `Compare against the brief. Proofread and test (links, files, formats). Name files clearly and organise them in folders. Prepare a short delivery note. Check that payment terms are met before releasing final files.` },
          { title: 'The delivery note', body: `Say what is included, how to open or use it, any decisions you made and why, what revisions are included and the deadline for feedback, and the next step. Keep it short, warm and clear.` },
          { title: 'Handling feedback', body: `Thank the client and ask for consolidated feedback. Respond to each point, make changes within your agreed rounds, and confirm when you consider the project complete. Keep a record of final approval.` },
        ],
        keyTerms: [{ term: 'Delivery note', def: 'A short message explaining what you are handing over and what happens next.' }, { term: 'Sign-off', def: 'The client\'s confirmation that the work is complete.' }],
        howTo: ['Check the work against the brief.', 'Proofread and test everything.', 'Organise and name the files.', 'Write the delivery note.', 'Confirm payment terms before releasing final files.', 'Send and set a feedback deadline.', 'Request sign-off and a testimonial after approval.'],
        template: { title: 'Delivery note and pre-delivery checklist', intro: 'Adapt for your service.', body: `PRE-DELIVERY CHECKLIST\n[ ] Matches the brief and scope\n[ ] Proofread / tested (links, files, formats)\n[ ] Files named and organised\n[ ] Payment terms met for final files\n[ ] Delivery note written\n\nDELIVERY NOTE\nHi [name], your [project] is ready! Here's what's included: [list]. You can access it here: [link]. Notes: [key decisions]. As agreed, you have [number] rounds of revisions, so please send one set of consolidated feedback by [date]. Once you're happy, I'll send the final files and invoice/receipt. Thank you for trusting me with this!` },
        example: `A freelancer delivers a month of content in a tidy folder, with a note explaining the themes and a feedback deadline. The client approves with two small changes and later says the clarity of the delivery made her feel taken care of.`,
        practice: `Create your pre-delivery checklist and write a delivery note for a real or sample project.`,
        successCriteria: 'Your checklist covers quality and payment, and your delivery note is clear, warm and includes next steps.',
        commonMistakes: 'Sending files with no explanation or checking.',
        takeaways: ['Check against the brief first.', 'Send a clear delivery note.', 'Ask for sign-off and a testimonial.'],
        knowledgeCheck: [
          Q('Before delivering you should:', ['Skip checks', 'Compare to the brief and proofread', 'Hide the files', 'Wait for the client to find errors'], 1, 'Catching errors yourself builds trust.'),
          Q('A delivery note explains:', ['Nothing', 'What is included, how to use it and next steps', 'Your life story', 'Only price'], 1, 'It guides the client.'),
          Q('Why get sign-off?', ['To ignore the client', 'To confirm the work is complete', 'To increase revisions', 'To avoid payment'], 1, 'It prevents later disputes.'),
          Q('Delivery is a good time to ask for:', ['Nothing', 'A testimonial and future work', 'A refund', 'Silence'], 1, 'Satisfaction is high at delivery.'),
        ],
      }),

      L('ff-m10-l3', 'Turning One Client Into Repeat Work and Referrals', 'concept', 22, {
        objectives: ['Explain why existing clients are your cheapest source of work', 'Plan follow-ups that lead to repeat projects', 'Ask for referrals politely'],
        concept: `Winning a new client costs time and effort. Winning more work from a happy existing client costs far less. Repeat work and referrals are the most efficient parts of a freelance business, and both come from the same habit: doing good work and staying in touch with care.

After delivery, check in, share a small result or idea, suggest a natural next step, and ask for a referral when the client is clearly happy.`,
        whyItMatters: `A stable base of repeat clients smooths out the ups and downs of freelancing and reduces the amount of cold outreach you need.`,
        sections: [
          { title: 'A simple follow-up plan', body: `One week after delivery: ask how it is going. One month later: share a useful idea or a small result. Three months later: suggest a next project or a retainer. Put reminders in your calendar so it happens.` },
          { title: 'Asking for referrals', body: `Ask when the client is happy, in a specific way: "Do you know another salon owner who might like help with posting? I'd be grateful for an intro." Make it easy by offering a short message they can forward.` },
          { title: 'Thank and reward', body: `Thank people who refer you, and consider a small thank-you gesture. Keep them updated on what happens. Gratitude encourages more referrals.` },
        ],
        keyTerms: [{ term: 'Repeat client', def: 'A client who hires you again.' }, { term: 'Referral', def: 'A recommendation that connects you with a new client.' }],
        howTo: ['List current and past clients.', 'Set follow-up reminders at one week, one month and three months.', 'Write a check-in message.', 'Write a referral request message.', 'Decide how you will thank referrers.', 'Track repeat work and referrals in your sheet.'],
        template: { title: 'Check-in and referral request', intro: 'Personalise each one.', body: `CHECK-IN (1 week)\nHi [name], how are the new [deliverables] working for you? Anything you'd like tweaked?\n\nNEXT STEP (3 months)\nHi [name], it's been a few months since [project]. I had an idea for [next project] that could help with [goal]. Want me to send a quick outline?\n\nREFERRAL REQUEST\nHi [name], I'm glad you're happy with [result]! If you know anyone who runs [type of business] and could use similar help, I'd be grateful for an intro. Happy to send a short note you can forward.` },
        example: `A freelancer checks in a month after finishing a project, shares a small idea, and the client hires her for a second phase. When asked, the client introduces her to a friend who also becomes a client.`,
        practice: `Set reminders for your follow-up plan and write your check-in and referral messages.`,
        successCriteria: 'You have a follow-up schedule and personalised messages for repeat work and referrals.',
        commonMistakes: 'Delivering and disappearing, then starting from zero for every project.',
        takeaways: ['Existing clients are the cheapest source of work.', 'Follow up on a schedule.', 'Ask for referrals specifically and thank people.'],
        knowledgeCheck: [
          Q('Which costs less?', ['Winning a new client', 'Winning more work from a happy client', 'They cost the same', 'Neither'], 1, 'Existing relationships already have trust.'),
          Q('A good time to ask for a referral is when the client is:', ['Unhappy', 'Clearly happy with your work', 'Silent', 'Angry'], 1, 'Satisfaction makes referrals natural.'),
          Q('A follow-up plan should be:', ['Random', 'Scheduled with reminders', 'Never done', 'Only once'], 1, 'Reminders make it a habit.'),
          Q('Thanking referrers:', ['Is unnecessary', 'Encourages more referrals', 'Is harmful', 'Is illegal'], 1, 'Gratitude builds goodwill.'),
        ],
      }),

      L('ff-m10-l4', 'Difficult Clients, Late Feedback and Ending Projects Gracefully', 'how-to', 26, {
        objectives: ['Recognise common difficult-client patterns early', 'Use calm scripts to reset expectations', 'End or pause a project professionally when needed'],
        concept: `Even with good systems, you will sometimes meet difficult situations: a client who disappears for weeks, keeps changing the brief, pays late, or becomes rude. Having a plan lets you respond calmly instead of emotionally.

The principles are simple: refer to what was agreed in writing, stay polite and factual, offer a clear way forward, and protect your payment and wellbeing. If a relationship is not workable, it is acceptable to pause or end the project professionally according to your contract.`,
        whyItMatters: `One bad client can drain time, money and confidence. Handling problems early and professionally often saves the project, and when it does not, it protects you from bigger losses.`,
        sections: [
          { title: 'Common patterns and responses', body: `- **Disappears:** send a polite reminder referencing the timeline, and explain that delays may move the delivery date.\n- **Changes the brief repeatedly:** pause and reference the scope, offer a change order.\n- **Pays late:** remind politely, refer to terms, pause work if allowed.\n- **Rude or disrespectful:** state calmly that you want to keep working together respectfully, and end the project if it continues.\n- **Vague feedback:** ask specific questions, such as "Which part feels off: the colours, the tone or the layout?"` },
          { title: 'Calm scripts', body: `- "To keep us on schedule, I need [item] by [date]. If it arrives later, the delivery date will move by the same number of days."\n- "Happy to explore that. It's beyond the agreed scope, so here's a quick quote."\n- "I want this to work well for both of us. Let's keep our messages respectful so I can do my best work."` },
          { title: 'Ending gracefully', body: `If you must end, follow your cancellation clause. Be polite, state the reason briefly, deliver or hand over work completed to the agreed point, invoice for work done and keep a record. Do not argue publicly or badmouth the client. If you feel unsafe or harassed, you are entitled to stop and disengage.` },
        ],
        keyTerms: [{ term: 'Pause clause', def: 'A term allowing you to stop work until payment or materials arrive.' }, { term: 'Offboarding', def: 'Ending a project in an organised, professional way.' }],
        howTo: ['List the five patterns above that worry you most.', 'Write a calm script for each.', 'Check your contract has pause and cancellation terms.', 'Decide your personal limits for rude behaviour.', 'Practise the scripts aloud.', 'Plan who you will talk to for support if a project goes badly.'],
        template: { title: 'Difficult situation scripts', intro: 'Adapt to your voice.', body: `MISSING MATERIALS\n"Hi [name], to stay on schedule I need [item] by [date]. If it arrives later, delivery moves by the same number of days."\n\nSCOPE CHANGE\n"Happy to explore that! It's beyond what we agreed, so here's a quick quote and timeline. Shall I go ahead?"\n\nLATE PAYMENT\n"Hi [name], invoice [no] was due on [date]. As per our agreement, work is paused until payment is received. Please let me know when I can expect it."\n\nDISRESPECT\n"I want this to work well for both of us. Let's keep our messages respectful so I can do my best work."\n\nENDING A PROJECT\n"After our recent conversations, I don't think I'm the right fit to continue. As per our agreement, I'll deliver work completed to date and invoice for it. Thank you for the opportunity."` },
        example: `A client changes the brief for the third time. The freelancer pauses, writes the scripted reply with a change-order quote, and the client agrees to pay for the extra work. The project continues in a healthier way.`,
        practice: `Write scripts for five difficult situations and check your contract supports them.`,
        successCriteria: 'Your scripts are polite, factual and refer to agreed terms, and your contract has pause and cancellation clauses.',
        commonMistakes: 'Replying angrily or ignoring problems until they are huge.',
        takeaways: ['Refer to what was agreed in writing.', 'Stay calm, factual and offer a way forward.', 'It is acceptable to pause or end a project professionally.'],
        knowledgeCheck: [
          Q('When a client keeps changing the brief you should:', ['Accept silently', 'Reference scope and offer a change order', 'Quit without a word', 'Raise your voice'], 1, 'Extra work should be agreed and priced.'),
          Q('A calm script should:', ['Insult', 'Be polite, factual and offer a path forward', 'Threaten', 'Be vague'], 1, 'Professional tone protects relationships and your position.'),
          Q('If a client is persistently rude you may:', ['Accept it forever', 'End the project professionally under your contract', 'Respond rudely', 'Hide'], 1, 'Boundaries protect your wellbeing.'),
          Q('Why have a pause clause?', ['To annoy clients', 'To stop work until payment or materials arrive', 'To raise prices', 'To avoid contracts'], 1, 'It protects your time and money.'),
        ],
      }),

      A('ff-m10-a', [
        Q('Most client problems come from:', ['Weather', 'Different expectations', 'Fonts', 'Bad luck'], 1, 'Clear expectations prevent friction.'),
        Q('A kickoff should include:', ['Only your price', 'Goal, timeline, needs, communication and feedback process', 'Only a greeting', 'Nothing'], 1, 'These prevent surprises.'),
        Q('Why ask for one decision-maker?', ['To avoid conflicting feedback', 'To cut your pay', 'It is a rule', 'To skip approvals'], 0, 'Many opinions can derail a project.'),
        Q('Before delivering you should:', ['Skip checks', 'Compare to the brief and proofread', 'Hide files', 'Wait for the client to find errors'], 1, 'Check your own work.'),
        Q('A delivery note explains:', ['Nothing', 'What is included, how to use it and next steps', 'Your life story', 'Only price'], 1, 'It guides the client.'),
        Q('Which costs less?', ['Winning a new client', 'More work from a happy client', 'They cost the same', 'Neither'], 1, 'Trust already exists.'),
        Q('A good time to ask for a referral is:', ['When unhappy', 'When the client is clearly happy', 'When silent', 'When angry'], 1, 'Satisfaction makes referrals natural.'),
        Q('When a client keeps changing the brief:', ['Accept silently', 'Reference scope and offer a change order', 'Quit without a word', 'Raise your voice'], 1, 'Extra work should be priced.'),
        Q('A calm script should be:', ['Insulting', 'Polite, factual and offer a way forward', 'Threatening', 'Vague'], 1, 'Professional tone protects you.'),
        Q('A pause clause lets you:', ['Annoy clients', 'Stop work until payment or materials arrive', 'Raise prices', 'Avoid contracts'], 1, 'It protects time and money.'),
      ]),
    ],
  },

  /* ---------------- MODULE 11 ---------------- */
  {
    id: 'ff-m11', title: 'Build Your Freelance Business Starter System \u2014 Capstone',
    objective: 'Combine everything from the course into one complete, ready-to-use freelance business starter system.',
    isCapstoneModule: true,
    lessons: [
      L('ff-m11-l1', 'Running Your Business Weekly: Pipeline, Time and Money Systems', 'how-to', 28, {
        objectives: ['Design a simple weekly routine that covers all five freelancer hats', 'Set up a one-page dashboard for pipeline, income and tasks', 'Plan your first 30 days'],
        concept: `A freelance business runs on small, repeated habits. A weekly routine makes sure you do the unglamorous work that creates future income: outreach, follow-ups, invoicing, admin and learning, alongside client delivery. A simple dashboard shows you the state of your pipeline, your money and your tasks at a glance.

Without a system, freelancers drift into feast and famine: busy with client work, then suddenly without leads. A routine keeps the pipeline filled even when you are busy.`,
        whyItMatters: `This lesson turns everything you learned into a weekly operating rhythm. It is the bridge between knowing and doing, and it forms the heart of your capstone.`,
        sections: [
          { title: 'A sample weekly rhythm', body: `Monday: review dashboard, plan the week, send outreach. Tuesday to Thursday: client delivery blocks, with a short daily outreach or follow-up slot. Friday: invoices, admin, content for your portfolio and a weekly review. Adjust to your hours and energy, but keep every hat in the week.` },
          { title: 'The one-page dashboard', body: `Track: leads by stage (contacted, replied, call, proposal, won, lost), active projects and deadlines, invoices sent and paid, income this month versus target, and your weekly activity numbers. A simple spreadsheet is enough.` },
          { title: 'Your first 30 days', body: `Week 1: finalise niche statement and offer, publish a simple portfolio page. Week 2: complete two portfolio pieces and send warm outreach. Week 3: start cold outreach and discovery calls. Week 4: send proposals, follow up, set up contract, deposit and invoice templates, and review results.` },
        ],
        keyTerms: [{ term: 'Weekly review', def: 'A short regular check of numbers, tasks and lessons learned.' }, { term: 'Dashboard', def: 'A one-page view of key numbers.' }],
        howTo: ['Write your weekly rhythm by day and hat.', 'Set up the dashboard sheet.', 'Set weekly activity targets.', 'Write your 30-day plan by week.', 'Block the time in your calendar.', 'Schedule a weekly review.'],
        template: { title: 'Weekly rhythm, dashboard and 30-day plan', intro: 'Copy into a document or sheet.', body: `WEEKLY RHYTHM\nMon: \nTue: \nWed: \nThu: \nFri: \n\nDASHBOARD (update weekly)\nLeads: contacted __ replied __ calls __ proposals __ won __ lost __\nActive projects and deadlines: \nInvoices sent / paid / overdue: \nIncome this month vs target: \nActivity this week: outreach __ follow-ups __ portfolio pieces __\n\n30-DAY PLAN\nWeek 1: \nWeek 2: \nWeek 3: \nWeek 4: \n\nWEEKLY REVIEW QUESTIONS\nWhat worked? What did not? What will I change next week?` },
        example: `A freelancer blocks Monday mornings for planning and outreach, Fridays for admin and a review. Her dashboard shows that proposals are being sent but calls are low, so she adds a short follow-up slot each day.`,
        practice: `Build your weekly rhythm, dashboard and 30-day plan, and schedule your first weekly review.`,
        successCriteria: 'Your plan covers all five hats, has numbers to track and has dates for the next 30 days.',
        commonMistakes: 'Only doing client work and letting the pipeline dry up.',
        takeaways: ['A weekly rhythm covers all five hats.', 'A one-page dashboard shows what to fix.', 'Plan your first 30 days in weeks.'],
        knowledgeCheck: [
          Q('A weekly review is for:', ['Avoiding work', 'Checking numbers, tasks and lessons', 'Posting online', 'Deleting leads'], 1, 'It keeps the business on track.'),
          Q('Feast and famine happens when freelancers:', ['Keep outreach going while busy', 'Stop outreach while doing client work', 'Use dashboards', 'Raise prices'], 1, 'The pipeline needs steady attention.'),
          Q('A dashboard should show:', ['Only your age', 'Pipeline, projects, invoices and income', 'Nothing', 'Only likes'], 1, 'It is a snapshot of key numbers.'),
          Q('Your weekly rhythm should include:', ['Only client work', 'All five hats', 'Only marketing', 'No admin'], 1, 'Every hat matters.'),
        ],
      }),

      A('ff-m11-a', [
        Q('A freelancer wears these hats:', ['Specialist, marketer, salesperson, operations, finance', 'Only specialist', 'Only marketer', 'None'], 0, 'Every freelancer does all five jobs.'),
        Q('The six-part loop includes:', ['Skill, niche, offer, proof, pipeline, delivery', 'Logo, fonts, colour', 'Hope, luck, time', 'Posts only'], 0, 'These parts work together.'),
        Q('A strong niche statement names:', ['Client, result and service', 'Only your name', 'Only price', 'A story'], 0, 'It states who you help and how.'),
        Q('A good offer has:', ['Result, deliverables, timeline, price and exclusions', 'Only a logo', 'Only a slogan', 'No price'], 0, 'Clarity makes yes easier.'),
        Q('Client-first proposals begin with:', ['Your biography', 'The client\'s problem', 'A discount', 'Tools'], 1, 'They show you understood.'),
        Q('Billable hours are fewer than hours worked because:', ['Marketing, admin and calls are unbilled', 'Clients refuse', 'Law forbids', 'Time stops'], 0, 'Unbilled tasks take real time.'),
        Q('A contract should include:', ['Scope, timeline, price, revisions, ownership, cancellation', 'Only a greeting', 'Nothing', 'A joke'], 0, 'These protect both sides.'),
        Q('Deposits protect:', ['Both sides', 'Nobody', 'Only the client', 'Only taxes'], 0, 'They show commitment and reserve your time.'),
        Q('A good delivery includes:', ['A delivery note and organised files', 'Random files', 'No explanation', 'Hidden links'], 0, 'It guides the client.'),
        Q('Which habit keeps the pipeline filled?', ['A weekly rhythm with outreach and follow-ups', 'Waiting', 'Hoping', 'Deleting leads'], 0, 'Consistent activity creates future income.'),
      ]),

      { id: 'ff-capstone-lesson', title: 'Capstone Briefing', type: 'capstone', duration: 20 },
    ],
  },
];

export const projects = [
  {
    id: 'ff-p1', title: 'Build Your First Sample Portfolio Piece',
    brief: 'Create one complete, realistic spec project in your chosen niche and skill, presented as a short story.',
    scenario: 'You have chosen a lead skill and niche but have no paid clients yet. A prospect will ask to see proof of your work, so you will create it.',
    requirements: [
      'A project built for a realistic, clearly labelled sample client in your niche',
      'The five parts: context, problem, approach, result, your role and tools',
      'At least 2 visuals or file examples of the finished work',
      'Honest labelling as a sample or spec project',
      'Intended outcome and how it would be measured, with no invented statistics',
      'A clear call to action with a contact method',
    ],
    constraints: ['Do not present the project as real client work', 'Do not use someone else\u2019s work as your own'],
    deliverable: 'A portfolio piece published on your portfolio page or as a shareable document.',
    tools: ['Your portfolio host (website, Notion or document)', 'The tools for your skill'],
    successCriteria: [
      'The piece tells a clear problem-to-result story',
      'It is honestly labelled',
      'A stranger can understand what you did in one minute',
      'It is relevant to your niche statement',
    ],
  },
  {
    id: 'ff-p2', title: 'Write and Send 5 Real Outreach Messages',
    brief: 'Apply the outreach lessons by writing and actually sending 5 personalised pitches (warm or cold) to real prospects.',
    scenario: 'You have a niche, an offer and a portfolio. Now you start the conversations that create clients.',
    requirements: [
      'A list of at least 20 prospects or warm contacts who fit your niche',
      'Five personalised messages, each with a specific observation or reason',
      'Each message follows the client-first structure and is under about 100 words',
      'Messages actually sent through real channels',
      'A tracker with date, channel, status and next step for each',
      'A three-message follow-up sequence prepared for non-responders',
      'A short reflection on replies and what you will change',
    ],
    constraints: ['Do not send spam or misleading claims', 'Respect anyone who says no and follow platform rules'],
    deliverable: 'Your message drafts, tracker and a one-paragraph reflection.',
    tools: ['Google Sheets or Docs', 'Your outreach channels'],
    successCriteria: [
      'Messages are personalised, short and client-focused',
      'You tracked results honestly',
      'Your reflection names one change based on real replies',
    ],
  },
  {
    id: 'ff-p3', title: 'Create Your Offer Page and Pricing',
    brief: 'Turn your skill and niche into a clear, priced offer with tiers, scope boundaries and a calculated minimum rate.',
    scenario: 'A prospect says, "Sounds interesting. What exactly do you offer and how much is it?" You need a ready answer.',
    requirements: [
      'A niche statement tested on three people',
      'A complete offer using the six parts plus exclusions and revision policy',
      'A three-tier table with concrete differences',
      'A minimum hourly rate calculation with your real numbers',
      'One sample quote with a buffer and a lighter alternative',
    ],
    constraints: ['Every tier must be profitable at your minimum rate', 'Use plain language a stranger can understand'],
    deliverable: 'A one- or two-page offer and pricing document.',
    tools: ['Google Docs', 'Google Sheets'],
    successCriteria: [
      'Offer parts are complete and clear',
      'Tiers differ in concrete ways',
      'Rate and quote calculations are correct',
    ],
  },
  {
    id: 'ff-p4', title: 'Assemble Your Client Paperwork Pack',
    brief: 'Prepare the contract, payment terms, invoice and kickoff message you would use for your first real client.',
    scenario: 'A client says yes. Within a day, you need to send an agreement, deposit request and kickoff message that look professional.',
    requirements: [
      'A simple agreement covering scope, timeline, price, deposit, revisions, ownership and cancellation',
      'Payment terms and a calm reply to deposit pushback',
      'An invoice template and two reminder messages',
      'A payment method comparison with a primary and backup method (using official information)',
      'A kickoff message and a delivery note template',
    ],
    constraints: ['State clearly that templates are general information, not legal advice', 'Check local rules for contracts, payments and tax'],
    deliverable: 'A single paperwork pack document with all templates.',
    tools: ['Google Docs', 'An invoicing or e-signature tool (optional)'],
    successCriteria: [
      'All documents are consistent with each other (scope, price, terms)',
      'Language is plain and professional',
      'You could send the pack to a client today',
    ],
  },
];

export const capstone = {
  id: 'ff-capstone',
  title: 'Build Your Complete Freelance Business Starter System',
  scenario: 'You are launching a freelance business as a beginner. You will assemble one complete starter system that you could use this month to pitch, win and deliver your first client project.',
  objective: 'Produce a coherent, honest and usable freelance starter system covering skill, niche, offer, pricing, proof, outreach, paperwork and a weekly operating plan.',
  requirements: [
    'A lead skill and niche chosen with evidence (scoring tables and research or conversations)',
    'A tested niche statement',
    'A clear offer with tiers, scope, exclusions and a revision policy',
    'A minimum rate calculation and a sample quote',
    'A portfolio plan or published portfolio with at least one complete piece',
    'A client-finding plan with warm and cold outreach, at least 5 real or drafted messages and a follow-up sequence',
    'A 4-part proposal for a realistic prospect',
    'A paperwork pack: agreement, deposit terms, invoice and kickoff message',
    'A weekly rhythm, dashboard and 30-day plan',
  ],
  constraints: [
    'Every part must connect to the same skill, niche and offer',
    'No fake clients, testimonials or statistics',
    'Do not promise guaranteed results; use honest ranges and conditions',
  ],
  deliverables: ['One combined starter system document with all required sections', 'Your portfolio link (or document)', 'A one-page 30-day plan'],
  tools: ['Google Docs/Sheets', 'Your portfolio host'],
  rubric: { understanding: 15, strategy: 20, execution: 30, problemSolving: 15, professionalQuality: 10, completeness: 10 },
  passScore: 70,
  reflectionQuestions: [
    'Which part of your starter system are you most confident in, and which part still feels uncertain?',
    'What is the first thing you will do in the next seven days, and what number will tell you it worked?',
    'Which red flags or boundaries are you committing to, based on this course?',
    'If you only had time to do three things this month, which three would you choose and why?',
  ],
};

/* Extra course-page information (read by data/academy.js and shown on the course page). */
export const meta = {
  description: 'Build a real freelance business step by step: choose a sellable skill and niche, create a clear priced offer, build proof, find clients, write proposals that get replies, price with confidence, handle contracts and international payments, and deliver work that earns repeat clients.',
  learningOutcomes: [
    'Explain freelancing as a small business and plan a realistic early income curve',
    'Choose a lead skill using demand evidence and a niche using real conversations',
    'Write a niche statement and a clear, tiered, priced offer with boundaries',
    'Build honest portfolio proof without paid clients, and turn early work into case studies',
    'Find clients through warm outreach, cold outreach and marketplaces while spotting scams',
    'Write client-first proposals, run discovery calls and follow up professionally',
    'Calculate a minimum rate, quote a project and raise prices over time',
    'Prepare contracts, deposits and invoices, and plan cross-border payments and tax records',
    'Set expectations, deliver professionally, handle difficult situations and earn referrals',
    'Run a weekly operating rhythm and a 30-day launch plan',
  ],
  certificateSkills: ['Niche Selection', 'Offer Design', 'Portfolio Building', 'Client Outreach', 'Proposal Writing', 'Pricing & Quoting', 'Contracts & Invoicing', 'Client Communication', 'Freelance Business Systems'],
  about: `This course treats freelancing as what it really is: a small service business. You will not only learn how to find work. You will build the whole system: a clear niche, a priced offer, honest proof of your skill, a steady stream of conversations, a simple contract and invoice pack, and the habits that keep clients coming back.

Every lesson ends with something you create, and every module builds the starter system you assemble in the capstone. Lessons include practical guidance for freelancers working with clients in other countries, such as agreeing currency and payments, spotting common scams and keeping tax records.`,
  audience: [
    'Complete beginners who want to start freelancing without guessing',
    'Employees who want to freelance on the side before leaving a job',
    'Students and graduates building their first client work',
    'Freelancers in emerging markets who want to attract international clients safely',
  ],
  careerOutcomes: [
    { role: 'Freelance specialist', note: 'Sell a focused service (for example design, writing, social media or virtual assistance) to a defined type of client.' },
    { role: 'Freelancer with international clients', note: 'Find, vet and work with clients across time zones, currencies and payment methods.' },
    { role: 'Side-income builder', note: 'Add a flexible income stream alongside a job or studies.' },
    { role: 'Future agency or product founder', note: 'Use freelancing to learn what clients need before building a bigger business.' },
  ],
  faq: [
    ['Will this guarantee clients or a certain income?', 'No. Nobody can honestly guarantee that. The course gives you a complete, tested method and weekly habits. Results depend on your skill, niche, effort and market.'],
    ['Do I need a portfolio or experience first?', 'No. Module 5 shows you how to build honest proof from scratch, using sample projects, improvements and volunteer work.'],
    ['Is the legal and tax content professional advice?', 'No. Contract, payment and tax content is general information. Laws differ by country, so check your local rules and consider advice from a qualified professional for larger projects.'],
    ['Which skills does it work for?', 'It works for most service skills, such as design, writing, video editing, social media, virtual assistance, bookkeeping and web building. The method is the same; you choose your own skill and niche.'],
  ],
};
