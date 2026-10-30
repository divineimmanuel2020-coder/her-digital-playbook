/* =============================================
   COURSE: DIGITAL MARKETING FOUNDATIONS
   Full-depth rewrite. Every lesson has objectives, a multi-part
   explanation, key terms, a step-by-step task, a worked example,
   a practice task, and a 4-question check with explanations.
   Lesson ids from the earlier version are unchanged so saved
   learner progress still lines up. Case studies are illustrative
   composites, not real people or real company data.
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
    id: 'dmf-m1', title: 'Understanding Digital Marketing',
    objective: 'Understand what digital marketing actually is, how it differs from advertising, and the ecosystem of channels it covers.',
    lessons: [
      L('dmf-m1-l1', 'Digital Marketing vs. Advertising', 'concept', 22, {
        objectives: ['Explain the difference between marketing and advertising in your own words', 'Name the main digital marketing channels and what each is best at', 'Spot a business that is over-relying on a single channel'],
        concept: `Advertising is paying for attention. You pay a platform, and in return your message is placed in front of people. Digital marketing is much bigger: it is everything you do online to attract the right people, turn them into customers, and keep them coming back. Paid advertising is one tool inside that bigger toolbox.

The other tools include content (blog posts, videos, guides), search engine optimization or SEO (being found when people search), email (a direct line to people who gave you permission), social media (public conversation and community), and partnerships (other people recommending you). A good marketer chooses the mix on purpose rather than defaulting to whatever is trending.`,
        whyItMatters: `Beginners often say "I need to run ads" when what they actually need is customers. Ads are the fastest channel but also the only one that stops the moment you stop paying. Understanding the full toolbox lets you build marketing that keeps working while you sleep, and protects you if a platform changes its rules or your budget gets tight.`,
        sections: [
          { title: 'The four jobs marketing does', body: `Every piece of marketing does one of four jobs. It attracts attention from people who do not know you. It builds trust so they believe you can help. It converts that trust into an action such as a purchase, a booking or a signup. And it retains customers so they buy again and tell others.\nWhen a business struggles, it is almost always because one of the four jobs is missing. A shop with lots of followers but no sales is attracting without converting. A shop with great reviews but no visitors is converting without attracting. Diagnosing which job is broken is the beginning of every good strategy.` },
          { title: 'Owned, earned and paid media', body: `Marketers sort channels into three groups.\n- **Owned media** is what you control: your website, your email list, your blog. Nobody can take it away with an algorithm change.\n- **Earned media** is attention other people give you for free: reviews, shares, press mentions, word of mouth, someone tagging you.\n- **Paid media** is attention you buy: social ads, search ads, sponsored posts.\nStrong brands use all three. A common pattern is to use paid media to reach new people, earned media to build credibility, and owned media to keep the relationship long term.` },
        ],
        keyTerms: [{ term: 'Digital marketing', def: 'All online activity that attracts, converts and retains customers.' }, { term: 'Channel', def: 'A specific route to your audience, such as email, search or Instagram.' }, { term: 'Owned media', def: 'Channels you control, like your website and email list.' }],
        howTo: ['Pick a small business you know well (a salon, a bakery, a freelancer, a course creator).', 'Write down every way you can see them marketing online right now.', 'Label each one as owned, earned or paid.', 'Count how many of the four jobs (attract, build trust, convert, retain) each channel is doing.', 'Circle the job that looks weakest or missing.', 'Write one sentence recommending the single channel you would add first, and why.'],
        example: `Take a home baker called Ada. She posts cake photos on Instagram and runs a small paid boost each month. Labelled: Instagram posts are owned-ish (she controls content but not the platform), the boost is paid, and customers tagging her are earned. Jobs: the posts attract, the boost attracts, but nothing retains. She has no email list or customer WhatsApp broadcast to bring birthday customers back next year. Recommendation: add a simple "order reminder" list (owned, retain) because her best customers are repeat birthdays and weddings.`,
        caseStudy: { title: 'The shop that lived on one platform', situation: 'A skincare seller built 20,000 followers on one social platform and made nearly all her sales from there. One week her reach dropped sharply after an algorithm change.', moves: ['She admitted that she had no way to contact her customers outside the platform.', 'She added a simple signup offer (a free skincare routine guide) to her bio link and packaging.', 'She started a short weekly email and posted a link to it in her content.'], result: 'Within a few months a meaningful share of her repeat sales came from email, which no algorithm could throttle. Her social reach recovered unevenly, but her business no longer depended on it.', lesson: 'Rented attention can disappear overnight. Always be moving people toward something you own.' },
        practice: `Choose a real business. Make a three-column table (Owned, Earned, Paid) and place at least six real marketing activities in it. Then write two sentences naming the job that is weakest and the first channel you would add.`,
        stretch: `Repeat the exercise for your own business or a business you would like to start, and be honest about which column is empty.`,
        successCriteria: 'You sorted at least six real activities correctly and named a specific, justified next channel.',
        commonMistakes: 'Treating a social media following as an owned asset. You do not control the platform, so followers there are on loan.',
        takeaways: ['Marketing is the whole system. Advertising is one paid tool inside it.', 'Every piece of marketing attracts, builds trust, converts or retains.', 'Healthy brands mix owned, earned and paid media, and move people toward owned channels.'],
        knowledgeCheck: [
          Q('Digital marketing is best described as:', ['Only paid advertising', 'Only posting on social media', 'All online activity that attracts, converts and retains customers', 'A synonym for sales'], 2, 'Advertising is one channel inside digital marketing, which covers the whole customer journey.'),
          Q('Your email list is an example of:', ['Earned media', 'Owned media', 'Paid media', 'None of these'], 1, 'You control the list and can contact subscribers directly, so it is owned media.'),
          Q('A business has many followers but few sales. Which job is probably broken?', ['Attracting', 'Converting', 'Neither', 'Both are fine'], 1, 'They are attracting attention but not turning it into purchases, so conversion is the gap.'),
          Q('Why is relying only on one social platform risky?', ['Social media is illegal', 'The platform can change reach or rules and you cannot contact followers elsewhere', 'It is always too expensive', 'Followers do not buy'], 1, 'You do not own the audience there, so a change you cannot control can cut off your access.'),
        ],
      }),

      L('dmf-m1-l2', 'The Marketing Funnel', 'concept', 24, {
        objectives: ['Describe the four funnel stages and what a customer is thinking at each', 'Match tactics to the right stage', 'Explain why asking cold audiences to buy immediately usually fails'],
        concept: `The marketing funnel is a simple picture of how strangers become customers. At the top is Awareness: people discover you exist. Next is Consideration: they compare you with alternatives and decide whether to trust you. Then Conversion: they take the action you want, usually buying. Finally Retention: they come back, refer others and become advocates.

It is called a funnel because many people enter at the top and fewer make it to the bottom. Real journeys are messier than a neat funnel, since people jump around and leave and return, but the model is useful because each stage needs a different message. What persuades a stranger is very different from what persuades someone who is ready to buy.`,
        whyItMatters: `Most wasted marketing money comes from a mismatch between the message and the stage. Showing a "50% off, buy now" ad to someone who has never heard of you is like proposing on a first date. Matching the message to the stage is one of the cheapest ways to improve results.`,
        sections: [
          { title: 'What the customer is thinking at each stage', body: `Awareness: "I have a problem, or I am bored and scrolling." They are not looking for you, so content must earn attention quickly.\nConsideration: "Is this any good? How is it different from the others?" They want proof: reviews, comparisons, demos, FAQs.\nConversion: "Is it worth it, and is it safe to buy?" They want clarity on price, delivery, guarantees and an easy checkout.\nRetention: "Did I make the right choice?" They want help getting results, a reason to return, and a nudge to recommend you.` },
          { title: 'Tactics that fit each stage', body: `- **Awareness:** educational short videos, SEO articles, collaborations, helpful posts.\n- **Consideration:** case studies, comparison guides, testimonials, free samples, email sequences, live Q&As.\n- **Conversion:** a clear offer, limited-time bonuses, a simple sales page, objection-handling FAQs.\n- **Retention:** onboarding emails, loyalty perks, check-ins, referral rewards, community.\nThe same piece of content can serve different stages, but you should know which stage you are aiming at before you create it.` },
          { title: 'The leaky funnel', body: `A funnel leaks when people drop out between stages. If people visit your page but do not buy, the leak is between consideration and conversion: the page may lack proof or clarity. If almost nobody visits, the leak is at the top. Finding the biggest leak tells you where to spend your effort. Fixing a leak near the bottom often pays back faster because those people were already interested.` },
        ],
        keyTerms: [{ term: 'Funnel', def: 'The staged journey from stranger to repeat customer.' }, { term: 'Cold audience', def: 'People who do not know your brand yet.' }, { term: 'Conversion', def: 'The moment someone takes the action you wanted, such as buying or signing up.' }],
        howTo: ['Choose a product or service (real or imagined).', 'Write what a customer is thinking at each of the four stages.', 'List one tactic per stage that answers that thought.', 'Check you have not used the same tactic twice.', 'Mark where you think most people would drop out and why.', 'Write the single message you would show a cold audience, and how it differs from your message to a ready buyer.'],
        example: `A freelance photographer. Awareness: a short video "3 mistakes that ruin family photos" for parents scrolling. Consideration: a gallery of real client sessions plus three testimonials. Conversion: a clear booking page with packages, a calendar and a small deposit. Retention: a "see you next year" reminder email and a referral discount for friends. Her cold-audience message is "learn something useful". Her ready-buyer message is "pick a date and secure your session".`,
        caseStudy: { title: 'Ads to strangers, silence for customers', situation: 'A new course creator spent her whole small ad budget on a "buy now, limited seats" ad shown to people who had never heard of her. Clicks were cheap but nobody bought.', moves: ['She paused the ad and looked at where the journey broke.', 'She made a free mini lesson as a top-of-funnel offer and sent the ads there instead.', 'She emailed everyone who took the lesson with a story and the paid course.'], result: 'The same budget now produced email subscribers at a steady cost, and a share of them bought over the next weeks.', lesson: 'Do not ask for the sale before you have earned the right to. Match the ask to the stage.' },
        practice: `Pick a business. For each funnel stage write what the customer is thinking, one tactic that fits, and where you think the biggest leak is. Use a different tactic at every stage.`,
        stretch: `Find a real ad on a social platform and decide which funnel stage it targets, and whether the message matches that stage.`,
        successCriteria: 'You gave a distinct, appropriate tactic for each of the four stages and identified a likely leak with a reason.',
        commonMistakes: 'Pushing hard "buy now" messaging at cold audiences who do not know the brand yet.',
        takeaways: ['Awareness, Consideration, Conversion, Retention each need a different message.', 'Find the biggest leak in the funnel and fix that first.', 'Never ask a stranger for the sale before earning trust.'],
        knowledgeCheck: [
          Q('The four stages of the funnel are:', ['Like, comment, share, follow', 'Awareness, Consideration, Conversion, Retention', 'Post, boost, sell, repeat', 'Reach, impressions, clicks, views'], 1, 'These four stages describe the move from stranger to repeat customer.'),
          Q('Which tactic best fits the Consideration stage?', ['A viral meme with no link', 'A customer case study', 'A thank-you email after purchase', 'A random giveaway'], 1, 'Considerers want proof that you are the right choice, and case studies provide it.'),
          Q('People visit your sales page but rarely buy. The leak is most likely:', ['At the top of the funnel', 'Between consideration and conversion', 'In retention', 'Nowhere'], 1, 'They found you but something on the page (proof, clarity, price) stopped them acting.'),
          Q('Why did a "buy now" ad to strangers underperform?', ['Strangers hate ads', 'The ask did not match their stage of awareness', 'Buy buttons are banned', 'It was too cheap'], 1, 'People who do not know you need value and trust before they will buy.'),
        ],
      }),

      L('dmf-m1-l3', 'Organic vs. Paid Marketing', 'concept', 22, {
        objectives: ['Define organic and paid marketing and give examples of each', 'Explain the trade-offs between speed, cost and durability', 'Design a simple plan that uses both in sequence'],
        concept: `Organic marketing earns attention without paying for placement. Think of helpful posts, search rankings, newsletters, community engagement and word of mouth. Paid marketing buys placement directly: you pay a platform to show your message to chosen people.

Neither is better. Organic is slower but compounds, because a good article or video can keep bringing people for months or years. Paid is fast and controllable, but it stops the moment the budget stops. The skill is knowing when to use which.`,
        whyItMatters: `A business relying only on paid media has growth that is as temporary as its budget, and rising ad costs can quietly wipe out its profit. A business relying only on organic may grow too slowly to survive. Combining them gives you speed now and strength later.`,
        sections: [
          { title: 'Speed, cost, durability', body: `Think of three dials. Speed: how quickly do results appear? Paid is fast, organic is slow. Cost: paid costs money every time, organic costs time and skill up front. Durability: organic assets keep working, paid results end when spending ends.\nThere is no free option. "Free" organic marketing costs your time, and time is a real cost, especially when you are the only person in the business.` },
          { title: 'Using them together', body: `A sensible beginner sequence: start organic to learn what your audience responds to and to build proof. Once you know which message and offer already work, put a small paid budget behind your best-performing content to reach more people faster. Paid then amplifies what organic has already validated, instead of gambling money on untested ideas.` },
          { title: 'When paid comes first', body: `Sometimes paid comes first: you have a time-limited launch, you already know your offer converts, or you need quick data. Even then, make sure there is somewhere good for people to land, and a way to capture their contact details so you can reach them again without paying again.` },
        ],
        keyTerms: [{ term: 'Organic', def: 'Attention earned without directly paying for placement.' }, { term: 'Paid', def: 'Attention bought through ads or sponsored placement.' }, { term: 'Compounding', def: 'Results that build on earlier work, like an article that keeps bringing visitors.' }],
        howTo: ['Choose a business and a goal for the next 90 days.', 'List three organic tactics and what each would cost in time per week.', 'List two paid tactics and a realistic monthly budget range.', 'Decide which comes first and write the reason in one sentence.', 'Define what organic result would tell you it is time to add paid.', 'Write what you would do if the paid budget had to stop tomorrow.'],
        example: `A new digital product creator posts three helpful short videos a week for eight weeks. She notices one video on "how to price a template" gets far more saves and comments than the others. That is her signal. She puts a small budget behind that video, pointing to a free checklist, and collects emails. If the ad budget stopped, the video and the email list would still be there.`,
        practice: `For a business of your choice, write a two-phase plan: an organic phase with the signal that tells you it is working, and a paid phase with a small budget and one clear goal. Explain why the order makes sense.`,
        stretch: `List what would break in your plan if the biggest platform changed its rules next month.`,
        successCriteria: 'Your plan has both phases, a specific signal for moving from one to the other, and a fallback if the paid budget stops.',
        commonMistakes: 'Treating organic and paid as rivals instead of a system, or believing organic is free.',
        takeaways: ['Organic is slower but compounds. Paid is fast but ends when spending ends.', 'Use organic to find what works, then use paid to amplify it.', 'Organic marketing costs time, not nothing.'],
        knowledgeCheck: [
          Q('The main risk of relying only on paid marketing is:', ['It is always illegal', 'Growth stops when the budget stops', 'It never works', 'It cannot be measured'], 1, 'Paid results end when spending ends, so there is no lasting asset.'),
          Q('A sensible beginner sequence is usually:', ['Spend big on ads first', 'Learn from organic content, then amplify winners with paid', 'Never use paid', 'Only copy competitors'], 1, 'Organic reveals what resonates, so paid money is spent on proven ideas.'),
          Q('Why is organic marketing not truly free?', ['Platforms charge a hidden fee', 'It costs time and skill', 'It is illegal otherwise', 'It always needs a designer'], 1, 'Your time has a cost, especially when you are the only person working.'),
          Q('Which is an example of a compounding organic asset?', ['A one-day ad', 'A well-ranking helpful article', 'A single story post that expires', 'A paid boost'], 1, 'A ranking article keeps bringing visitors long after it is published.'),
        ],
      }),

      L('dmf-m1-l4', 'The Digital Marketing Landscape: Choosing Your Channels', 'concept', 24, {
        objectives: ['Describe what the main digital channels are good and bad at', 'Understand why you cannot do every channel at once', 'Make a first-pass shortlist of channels for a business'],
        concept: `There are many channels, and they are not interchangeable. Search (SEO and search ads) catches people who already want something. Social media creates discovery and community. Email builds a direct, long-term relationship. Content (blogs, video, podcasts) builds trust and fuels the other channels. Partnerships and influencers borrow someone else's audience. Paid ads buy reach quickly.

Each channel has a different audience mindset. Someone searching "plumber near me" is ready to act. Someone scrolling Instagram is entertained and open to discovery but not yet shopping. A good marketer matches the channel to the customer's mindset and the business goal.`,
        whyItMatters: `Beginners often try every channel at once and do all of them badly. Doing two or three channels well beats doing eight poorly, because each channel takes learning and consistency. Choosing is a strategic act, and it protects your time and energy.`,
        sections: [
          { title: 'Channel strengths and weaknesses', body: `- **SEO and search:** catches high-intent people, compounds over time, but slow to build.\n- **Social media:** great for discovery, personality and community, but attention is rented and reach is unpredictable.\n- **Email:** high control and strong for selling and retention, but you need permission and a way to grow the list.\n- **Content:** builds authority and gives you material for every other channel, but demands consistency.\n- **Paid ads:** fast and scalable, but expensive without a good offer and landing page.\n- **Partnerships and referrals:** borrow trust from others, but depend on relationships.` },
          { title: 'Fit: audience, goal, capacity', body: `Pick channels using three questions. Where does my audience already spend time and pay attention? Which channel best supports my current goal? And what can I realistically sustain with the time and money I have? A channel that fits the first two but not the third will collapse within a month.` },
        ],
        keyTerms: [{ term: 'Intent', def: 'How ready a person is to act, such as searching to buy versus idly scrolling.' }, { term: 'Capacity', def: 'The time, money and skill you can sustain.' }],
        howTo: ['Write your business, audience and a goal for the next 90 days.', 'List four channels that could reach this audience.', 'Score each one from 1 to 5 for audience fit, goal fit and capacity.', 'Add the scores and pick the top two.', 'Write one sentence for each of the others on why you are saying no for now.', 'Set a date to review your choice.'],
        example: `A freelance bookkeeper for small shops. Scores: search (fit 5, goal 5, capacity 3), LinkedIn (4, 4, 4), email (4, 4, 4), TikTok (2, 2, 2), paid ads (3, 3, 1). She picks LinkedIn and email, and sets search as a later project. Her note on TikTok: "My buyers are not there and I do not enjoy making video, so no."`,
        practice: `Run the scoring exercise for a business of your choice with at least five channels and justify your top two and what you are saying no to.`,
        successCriteria: 'You scored at least five channels on three criteria, chose two, and explained what you deferred.',
        commonMistakes: 'Choosing channels because they are popular rather than because the audience is there and you can sustain them.',
        takeaways: ['Channels attract different mindsets and have different strengths.', 'Fewer channels done well beats many done badly.', 'Choose using audience, goal and capacity.'],
        knowledgeCheck: [
          Q('Someone searching "buy running shoes size 6" shows:', ['Low intent', 'High intent to act', 'No intent', 'Only curiosity'], 1, 'Specific buying searches signal strong readiness to act.'),
          Q('Why not use every channel at once?', ['Rules forbid it', 'Each takes learning and consistency, so you would do all of them badly', 'They conflict technically', 'Customers dislike variety'], 1, 'Spreading thin means no channel gets enough attention to work.'),
          Q('Which three questions guide channel choice?', ['Colour, price, size', 'Audience fit, goal fit, capacity', 'Followers, likes, shares', 'Trend, memes, speed'], 1, 'Fit with audience and goal, plus what you can sustain, decide a good channel.'),
          Q('Email is strong mainly because:', ['It is trending', 'You own the relationship and can contact people directly', 'It is free of work', 'It needs no permission'], 1, 'An email list is owned media with permission-based direct access.'),
        ],
      }),

      A('dmf-m1-a', [
        Q('Digital marketing is best defined as:', ['Only running paid ads', 'All online activity that attracts, converts and retains customers', 'A synonym for social media', 'Print advertising moved online'], 1, 'It covers the full customer journey, not just ads.'),
        Q('The four funnel stages, in order, are:', ['Conversion, Retention, Awareness, Consideration', 'Awareness, Consideration, Conversion, Retention', 'Retention, Awareness, Conversion, Consideration', 'Consideration, Conversion, Awareness, Retention'], 1, 'Strangers become aware, consider, convert, then are retained.'),
        Q('A common beginner mistake is:', ['Using organic and paid together', 'Running "buy now" ads to cold, unaware audiences', 'Building an email list', 'Posting educational content'], 1, 'Cold audiences need value and trust before a sales ask.'),
        Q('Organic marketing mainly refers to:', ['Paid placements', 'Earning attention without directly paying for placement', 'Only influencer deals', 'TV commercials'], 1, 'Organic earns attention through value, search, community and word of mouth.'),
        Q('Relying only on paid marketing risks:', ['Nothing', 'Growth halting once the budget stops', 'Being illegal', 'Guaranteed loyalty'], 1, 'Paid results end when spending ends.'),
        Q('Your email list is best described as:', ['Earned media', 'Owned media', 'Paid media', 'Rented media'], 1, 'You control the list and can contact subscribers directly.'),
        Q('A shop has many visitors but few sales. The likely leak is:', ['At the top of the funnel', 'Between consideration and conversion', 'In retention only', 'Nowhere'], 1, 'People arrive but something stops them acting, such as weak proof or unclear offer.'),
        Q('Which is the best reason to limit the number of channels?', ['Rules require it', 'Each channel needs consistent learning and effort', 'More channels cost less', 'Customers dislike variety'], 1, 'Focus lets you do a few channels well.'),
        Q('Which is a typical high-intent behaviour?', ['Idly scrolling a feed', 'Searching for a specific product to buy', 'Liking a meme', 'Watching a trailer'], 1, 'Specific search queries show readiness to act.'),
        Q('Paid media is best used to:', ['Replace all strategy', 'Amplify what organic has already shown to work', 'Avoid learning the audience', 'Guarantee sales'], 1, 'Paid works best behind proven messages and offers.'),
      ]),
    ],
  },

  /* ---------------- MODULE 2 ---------------- */
  {
    id: 'dmf-m2', title: 'Customers, Audiences & Buyer Personas',
    objective: 'Learn to define a specific target audience and build a usable buyer persona instead of marketing to "everyone."',
    lessons: [
      L('dmf-m2-l1', 'Why "Everyone" Is Not a Target Audience', 'concept', 22, {
        objectives: ['Define a target audience in terms of needs and behaviour', 'Explain why specific messages outperform broad ones', 'Narrow a vague audience into a specific one'],
        concept: `A target audience is a specific group of people who share a problem, a goal or a set of behaviours that your product helps with. "Everyone who might want this" is not a target audience, because it gives you nothing to base decisions on. You cannot choose the right words, platforms or offers for everyone.

Narrowing feels risky because it seems you are losing customers. In practice the opposite happens. When a message speaks clearly to one kind of person, that person feels seen and acts, and others who are similar often act too. A vague message speaks to nobody, so nobody acts.`,
        whyItMatters: `Specific audiences make every other marketing decision easier: which words to use, where to show up, what to offer and what to charge. It also makes your marketing cheaper, because you stop paying to reach people who were never going to buy.`,
        sections: [
          { title: 'Needs, behaviours and situations beat demographics', body: `Many beginners define audience by age and gender: "women 25 to 40". That is a start, but it describes lots of very different people. Better definitions use a shared situation or problem: "first-time mums returning to work who want flexible side income". Situation tells you what they worry about, what they search for and what they will pay for.` },
          { title: 'The narrowing ladder', body: `Start broad and add one filter at a time until the message gets sharp: "people who want to lose weight" becomes "busy women over 40 who want to lose weight" becomes "busy women over 40 who want to lose weight without giving up family meals". Stop when you can picture a real person and write a sentence that would make her stop scrolling.` },
          { title: 'Niching is not forever', body: `A narrow start is a starting point, not a prison. Many successful brands began with a tightly defined audience, won loyalty, and widened later. It is much easier to expand from a group that loves you than to build love among a group that barely notices you.` },
        ],
        keyTerms: [{ term: 'Target audience', def: 'The specific group of people your marketing is built to reach.' }, { term: 'Niche', def: 'A focused segment of a larger market.' }],
        howTo: ['Write your offer or business in one sentence.', 'Write the broad audience you first thought of.', 'Add a situation or problem filter and rewrite the audience.', 'Add one more filter, such as constraint or goal.', 'Write the one sentence that would make this person stop scrolling.', 'Check you could find 20 such people online.'],
        example: `"Skincare for everyone" becomes "skincare for women with sensitive skin" becomes "gentle skincare for women whose skin changed after pregnancy". The last version tells you what content to make (postpartum skin changes), where to find them (parenting communities), and what words to use (gentle, hormonal, new mum routine).`,
        caseStudy: { title: 'From "everyone" to a waiting list', situation: 'A new fitness coach advertised "workouts for everyone" and got nearly no signups.', moves: ['She listed her past clients and noticed most were busy mums with 20 minutes a day.', 'She rewrote her offer for that group, naming their exact constraint.', 'She posted content answering their real questions in their language.'], result: 'Her posts started getting saved and shared inside mum communities, and enquiries became steady.', lesson: 'Specific messages make the right people stop scrolling.' },
        practice: `Take a business idea and walk it down the narrowing ladder through at least three filters. Write the final one-sentence audience and the scroll-stopping line.`,
        successCriteria: 'Your final audience names a shared situation or problem and you can describe where to find those people.',
        commonMistakes: 'Defining the audience as "everyone" or only by age and gender.',
        takeaways: ['A target audience shares a problem or situation, not just demographics.', 'Narrow messages are more persuasive and cheaper to run.', 'You can widen later after winning a loyal group.'],
        knowledgeCheck: [
          Q('Which is the best audience definition?', ['Everyone who might like it', 'Women 18 to 65', 'Busy first-time mums returning to work who want flexible income', 'People online'], 2, 'It names a specific situation and need that guides messaging and channels.'),
          Q('Why do specific messages outperform broad ones?', ['They are longer', 'The right person feels directly spoken to', 'Platforms prefer them', 'They are cheaper to write'], 1, 'People act when they feel a message was made for them.'),
          Q('Narrowing your audience at the start:', ['Is permanent', 'Is a starting point you can widen later', 'Always reduces sales', 'Is only for large firms'], 1, 'Start tight, win loyalty, then expand.'),
          Q('A good sign your audience is narrow enough is:', ['It sounds impressive', 'You can find about 20 real examples online', 'It includes everyone nearby', 'It has no problem attached'], 1, 'If you can find real people, you can reach and research them.'),
        ],
      }),

      L('dmf-m2-l2', 'Building a Buyer Persona', 'how-to', 28, {
        objectives: ['Build a one-page persona grounded in research rather than guesses', 'Include goals, frustrations, objections and where they spend time', 'Use a persona to make a marketing decision'],
        concept: `A buyer persona is a short profile of a representative customer, built from real information, that helps you make marketing decisions. It gives the audience a name, a situation, goals, frustrations and habits, so that when you write a post or pick a channel you can ask: would Amara respond to this?

A persona is a tool, not a work of fiction. Its value depends entirely on how much of it comes from real evidence such as customer conversations, reviews and comments, rather than from your assumptions. A persona made up at your desk is just a flattering portrait of your own guesses.`,
        whyItMatters: `Without a persona, marketing drifts toward what you personally like. With one, you can test every idea against a real person's needs. It also helps others who work with you, such as a designer or virtual assistant, make choices that fit the audience.`,
        sections: [
          { title: 'The parts of a useful persona', body: `- **Name and snapshot:** a first name, life stage and situation.\n- **Goals:** what they are trying to achieve, in their words.\n- **Frustrations:** what stands in the way today.\n- **Objections:** why they might hesitate to buy from you.\n- **Where they spend time:** platforms, communities, search habits.\n- **Triggers:** the moment that makes them decide to act.\n- **Real phrases:** exact words pulled from reviews, comments and forums.` },
          { title: 'Objections and triggers do the heavy lifting', body: `Goals and frustrations are obvious. The most useful parts are objections and triggers. An objection such as "I do not have time" tells you what your sales page must answer. A trigger such as "a wedding invitation arrived" tells you when to show up. Marketing that answers objections and appears at the trigger moment outperforms generic messaging.` },
          { title: 'One persona is enough to start', body: `Do not build six personas. Start with the one customer who is most likely to buy and benefit. You can add a second later if your research shows a different group clearly matters.` },
        ],
        keyTerms: [{ term: 'Persona', def: 'A research-based profile of a representative customer.' }, { term: 'Objection', def: 'A reason a customer hesitates to buy.' }, { term: 'Trigger', def: 'The event that pushes someone from thinking to acting.' }],
        howTo: ['Choose the audience you defined in the previous lesson.', 'Gather at least ten real data points (reviews, comments, forum posts, or short conversations).', 'Name the persona and write her situation in two sentences.', 'Write three goals and three frustrations using her own phrases.', 'List her top three objections to buying.', 'Write the trigger moment, and where she looks for help.', 'Write one marketing decision this persona changes for you.'],
        template: { title: 'One-page persona template', intro: 'Copy this into a document and fill it in using real research.', body: `PERSONA: [first name], [age range], [situation in one line]\n\nGOALS (in her words)\n1.\n2.\n3.\n\nFRUSTRATIONS (in her words)\n1.\n2.\n3.\n\nOBJECTIONS TO BUYING FROM US\n1.\n2.\n3.\n\nTRIGGER MOMENT (what makes her act now)\n\nWHERE SHE SPENDS TIME ONLINE\n\nREAL PHRASES I FOUND (copy exactly, note the source)\n1.\n2.\n3.\n\nWHAT THIS CHANGES IN OUR MARKETING\n` },
        example: `Persona: Tola, 29, a bank worker in Lagos who wants a side income without quitting her job. Goals: "earn in dollars", "something I can do after work". Frustrations: "too many courses, I do not know what is real", "I do not want to show my face". Objections: "Will it work from Nigeria?", "I cannot afford to waste money." Trigger: a coworker mentions her first international client. Where: Instagram, YouTube, WhatsApp groups. Change: her sales page must answer "will it work from Nigeria?" in the first screen and show faceless options.`,
        practice: `Build a one-page persona for a real or realistic business using the template. Include at least three real phrases from real sources and note where each came from.`,
        stretch: `Write the single homepage headline you would test for this persona, using her own words.`,
        successCriteria: 'The persona has goals, frustrations, objections, a trigger, platforms, and at least three real researched phrases.',
        commonMistakes: 'Inventing a persona from assumptions and filling it with flattering guesses instead of evidence.',
        takeaways: ['A persona is only as good as the research behind it.', 'Objections and triggers shape both your message and your timing.', 'Start with one persona.'],
        knowledgeCheck: [
          Q('What makes a persona useful rather than fictional?', ['A stock photo', 'Real research and real customer language', 'A long backstory', 'Fashionable job titles'], 1, 'Evidence from real people keeps the persona honest.'),
          Q('An objection is:', ['A customer complaint after purchase', 'A reason someone hesitates to buy', 'A type of ad', 'A competitor'], 1, 'Knowing objections shows what your marketing must answer.'),
          Q('A trigger is:', ['An angry reply', 'The event that moves someone from thinking to acting', 'A kind of keyword', 'A deadline for you'], 1, 'Triggers tell you when your marketing is most likely to be heard.'),
          Q('How many personas should a beginner start with?', ['Ten', 'As many as possible', 'One strong one', 'None'], 2, 'One clear persona is easier to research and act on.'),
        ],
      }),

      L('dmf-m2-l3', 'Researching Your Real Audience', 'how-to', 28, {
        objectives: ['Use free methods to find out what your audience actually thinks and says', 'Collect customer language you can reuse in your copy', 'Avoid the most common research mistakes'],
        concept: `Audience research is the habit of listening before you speak. You do not need a budget. Reviews of competing products, comments under popular posts, questions in forums and groups, search suggestions, and short conversations with real people will teach you more than any guess.

The goal is two things: understanding (what problems, goals and fears are real) and language (the exact words people use). Customers rarely use your industry jargon. When your copy uses their words, people feel understood and trust you faster.`,
        whyItMatters: `Most marketing fails not because of poor design but because it speaks about things the customer does not care about, in words they would never use. Ten honest hours of research can save months of posting into silence.`,
        sections: [
          { title: 'Where to listen for free', body: `- **Reviews:** read three-star and four-star reviews of competing products; they are the most honest.\n- **Comments:** read the replies under popular posts in your niche, especially questions.\n- **Communities:** Facebook groups, Reddit threads, WhatsApp groups, forums.\n- **Search:** type a topic into a search box and note the suggestions and "people also ask" questions.\n- **Conversations:** five short, friendly chats with real people in your audience.` },
          { title: 'How to capture what you find', body: `Make a simple sheet with columns for source, exact words, what it tells you, and a theme. After about 30 entries, patterns appear. The themes that repeat are the real problems. The phrases that repeat are your best headline material. Always copy words exactly rather than tidying them.` },
          { title: 'Research mistakes to avoid', body: `Asking leading questions ("Wouldn't you love a course on this?") gets polite lies. Better: "Tell me about the last time you tried to solve this." Do not rely only on friends and family, who want to be kind. And do not stop at one source: a pattern across several places is far more reliable than a single comment.` },
        ],
        keyTerms: [{ term: 'Voice of customer', def: 'The exact words customers use to describe their problems and goals.' }, { term: 'Theme', def: 'A pattern that repeats across many pieces of research.' }],
        howTo: ['Pick the audience from your persona.', 'Choose three places to listen and set a 30-minute timer for each.', 'Record at least 30 entries in a sheet with source, exact words and theme.', 'Highlight phrases that appear more than once.', 'Group entries into three to five themes and rank them.', 'Write five headline ideas using real phrases.', 'Plan one short conversation with a real person and write three non-leading questions.'],
        template: { title: 'Research capture sheet', intro: 'Set these up as columns in a spreadsheet.', body: `Source (link or place) | Exact words | What it tells me | Theme | Emotion (worry, hope, frustration)\n\nQuestions for a short conversation (non-leading):\n1. Tell me about the last time you tried to [solve this problem].\n2. What was the hardest part?\n3. What did you try before, and what happened?\n4. What would a great result look like for you?` },
        example: `A researcher reading reviews of a budgeting app notices many people say "I start strong then give up after a week". The theme is "motivation fades". A headline using it: "Built for the week-two slump." That headline came from customers, not a brainstorm.`,
        practice: `Collect at least 30 real entries about your chosen audience from at least three sources. Identify three themes and write five headline ideas using exact customer phrases.`,
        successCriteria: 'You have 30 sourced entries, three ranked themes, and headlines that use real customer wording.',
        commonMistakes: 'Researching only with friends, asking leading questions, and rewriting customers\' words into marketing jargon.',
        takeaways: ['Listen before you write; customers will hand you your messaging.', 'Copy words exactly. Repeated phrases are headline gold.', 'Ask open, non-leading questions.'],
        knowledgeCheck: [
          Q('Which review ratings are often the most honest?', ['Only five-star', 'Three and four-star', 'Only one-star', 'Reviews are never useful'], 1, 'Mid-range reviews tend to balance praise and real problems.'),
          Q('Which question is least leading?', ['Wouldn\'t you love this?', 'Tell me about the last time you tried to solve this.', 'You would pay for this, right?', 'Do you agree it is great?'], 1, 'Open questions about real past behaviour give honest answers.'),
          Q('Why copy customer words exactly?', ['To avoid typing', 'Their wording becomes persuasive copy and shows real understanding', 'It is required by law', 'To hide research'], 1, 'People trust messages that sound like their own thoughts.'),
          Q('A theme is:', ['One comment', 'A pattern repeated across many pieces of research', 'A colour scheme', 'A competitor\'s slogan'], 1, 'Repeated patterns point to real problems.'),
        ],
      }),

      L('dmf-m2-l4', 'Mapping the Customer Journey', 'how-to', 26, {
        objectives: ['Map the steps a customer takes from first noticing a problem to buying', 'Find the moments where you can help or where they drop out', 'Turn the map into a list of marketing actions'],
        concept: `A customer journey map is a simple timeline of what a person does, thinks and feels from the moment they notice a problem until they buy, and afterwards. It looks at your business through the customer's eyes instead of your own.

Journeys are rarely tidy. A person might notice a problem, ask a friend, search online, watch videos, forget about it for a month, see an ad, read reviews, and finally buy. Each of those steps is a touchpoint, a moment where you could help, or lose them.`,
        whyItMatters: `Most businesses only think about the buying moment. But customers spend most of their time before it, thinking, comparing and doubting. If you are absent during that time, a competitor fills the gap. Mapping the journey shows where to show up and what to say.`,
        sections: [
          { title: 'The stages and touchpoints', body: `List the stages: trigger, searching, comparing, deciding, buying, using, recommending. Under each, write the touchpoints (where they are), thoughts (what they wonder), feelings (hopeful, anxious, confused) and the help you could offer. Feelings matter: an anxious buyer needs reassurance, not features.` },
          { title: 'Finding moments of truth and friction', body: `Mark the moments where a decision is made, and the points where people get stuck, such as an unclear price or a confusing checkout. Removing a point of friction often increases sales more than any new campaign.` },
        ],
        keyTerms: [{ term: 'Touchpoint', def: 'Any interaction between a customer and your business.' }, { term: 'Friction', def: 'Anything that makes it harder for a customer to move forward.' }],
        howTo: ['Use your persona and write her trigger moment.', 'Write six to eight stages from trigger to recommending.', 'Under each stage, write touchpoints, thoughts and feelings.', 'Mark the two biggest friction points.', 'Write one marketing action for each stage.', 'Choose the single action that would help the most this month.'],
        example: `For a freelance wedding makeup artist: trigger (engagement), searching (Instagram and search for "bridal makeup Lagos"), comparing (looking at before-and-after photos), deciding (worried about trial costs), buying (WhatsApp booking), using (the day), recommending (bridesmaids ask who did it). Friction: no clear prices. Action: publish a price guide and add a trial-booking button.`,
        practice: `Draw a journey map for your persona with at least six stages. Mark two friction points and write one action for each stage.`,
        successCriteria: 'Your map covers before, during and after the purchase and ends in specific actions.',
        commonMistakes: 'Mapping only the buying moment and ignoring everything before and after it.',
        takeaways: ['Most of the journey happens before the customer talks to you.', 'Feelings drive decisions; map them.', 'Remove friction before adding campaigns.'],
        knowledgeCheck: [
          Q('A touchpoint is:', ['A type of ad', 'Any interaction between customer and business', 'A competitor', 'A pricing tier'], 1, 'Touchpoints are moments you can help or lose a customer.'),
          Q('Why map feelings as well as actions?', ['To make a prettier chart', 'Emotions like anxiety shape decisions and tell you what to say', 'It is required', 'They do not matter'], 1, 'An anxious buyer needs reassurance, not just features.'),
          Q('Friction is:', ['A kind of discount', 'Anything that makes progress harder for the customer', 'Paid reach', 'A marketing channel'], 1, 'Removing friction often lifts sales quickly.'),
          Q('Most of a customer\'s journey happens:', ['After buying', 'Before they contact you', 'Only on your website', 'Only on social media'], 1, 'People research and doubt long before reaching out.'),
        ],
      }),

      A('dmf-m2-a', [
        Q('Which is the best target audience definition?', ['Everyone', 'Women aged 18 to 65', 'Busy first-time mums returning to work who want flexible income', 'People with phones'], 2, 'A shared situation and need guides decisions.'),
        Q('Why do specific messages outperform broad ones?', ['They are longer', 'The right person feels directly spoken to', 'They cost less to print', 'Platforms require them'], 1, 'People act on messages that feel made for them.'),
        Q('A good persona is built from:', ['Imagination', 'Real research and customer language', 'Celebrity profiles', 'Competitor logos'], 1, 'Evidence prevents flattering guesses.'),
        Q('An objection is:', ['A refund', 'A reason a customer hesitates to buy', 'A search term', 'A platform'], 1, 'Your marketing must answer the main objections.'),
        Q('Which research question is least leading?', ['You would buy this, right?', 'Tell me about the last time you tried to solve this.', 'Do you love our idea?', 'Isn\'t it great?'], 1, 'Open questions about past behaviour give honest answers.'),
        Q('How many entries did the lesson suggest collecting before looking for themes?', ['About 3', 'About 30', 'About 3000', 'None'], 1, 'Around 30 entries is enough for patterns to appear.'),
        Q('Which is a free way to research your audience?', ['Buying a report only', 'Reading reviews, comments, forums and holding short chats', 'Guessing', 'Asking only family'], 1, 'Free sources are rich if you listen carefully.'),
        Q('A trigger moment is:', ['An ad format', 'The event that pushes someone to act', 'A refund policy', 'A hashtag'], 1, 'Showing up at the trigger moment increases relevance.'),
        Q('Mapping the customer journey helps you find:', ['Only competitors', 'Friction points and moments to help', 'Tax rules', 'Only new platforms'], 1, 'Maps show where customers get stuck and where to show up.'),
        Q('Narrowing your audience at the start is:', ['Permanent', 'A starting point you can widen later', 'Illegal', 'Only for big brands'], 1, 'You can expand after winning a loyal group.'),
      ]),
    ],
  },

  /* ---------------- MODULE 3 ---------------- */
  {
    id: 'dmf-m3', title: 'Marketing Strategy & Goals',
    objective: 'Set specific, measurable marketing goals and understand how strategy connects channels to those goals.',
    lessons: [
      L('dmf-m3-l1', 'Strategy vs. Tactics', 'concept', 22, {
        objectives: ['Tell strategy and tactics apart', 'Write a one-sentence strategy statement', 'Test whether a tactic supports the strategy'],
        concept: `Strategy is the plan for how you will win: who you are serving, what you will say to them, and which routes you will use to reach them. Tactics are the individual actions that carry out the plan: a post, an email, an ad, a webinar.

Without strategy, tactics become random activity. You post because others post, try a new platform because it is trending, and cannot tell whether any of it is working. With strategy, each tactic has a reason, and you can say no to the things that do not fit.`,
        whyItMatters: `Beginners often jump straight to tactics because they are visible and feel like progress. But ten great-looking posts aimed at the wrong audience produce nothing. A short strategy written before you start saves weeks of effort.`,
        sections: [
          { title: 'A simple strategy statement', body: `Use this sentence: "We will help [specific audience] achieve [specific outcome] by [main approach], measured by [one metric]." For example: "We will help busy mums in Lagos start a side income by teaching faceless freelance skills through short videos and a weekly email, measured by email signups." Every tactic should either serve this sentence or be dropped.` },
          { title: 'The tactic test', body: `Before doing any tactic, ask three questions. Which part of the strategy does this serve? Which funnel stage? How will I know if it worked? If you cannot answer all three, the tactic is probably a distraction, however appealing.` },
        ],
        keyTerms: [{ term: 'Strategy', def: 'The plan for who you serve, what you say and which routes you use.' }, { term: 'Tactic', def: 'A specific action that carries out the strategy.' }],
        howTo: ['Write your audience and one outcome they want.', 'Write your main approach in plain words.', 'Choose one metric that shows progress.', 'Combine them into the strategy sentence.', 'List five tactics you were planning.', 'Run each tactic through the three-question test and cross out those that fail.'],
        example: `A bookkeeper's strategy: "We will help small shop owners avoid tax surprises by sharing simple monthly money tips on LinkedIn and a short email, measured by consultation bookings." Planned tactics: LinkedIn tip posts (passes), monthly email (passes), a TikTok dance (fails), a tax calendar download (passes).`,
        practice: `Write a strategy sentence for a business and list five tactics. Apply the three-question test and show which survive.`,
        successCriteria: 'Your strategy sentence names audience, outcome, approach and metric, and at least one tactic is dropped for a stated reason.',
        commonMistakes: 'Starting with tactics ("I need to post daily") and never writing down the strategy they serve.',
        takeaways: ['Strategy is the plan; tactics are the actions.', 'A strategy sentence lets you say no.', 'Every tactic needs a purpose, a funnel stage and a measure.'],
        knowledgeCheck: [
          Q('A tactic is:', ['The overall plan', 'A specific action carrying out the plan', 'A goal', 'A budget'], 1, 'Posts, emails and ads are tactics.'),
          Q('Which belongs in a strategy sentence?', ['A hashtag list', 'Audience, outcome, approach and metric', 'Fonts', 'A competitor\'s name'], 1, 'These four elements make the plan clear and testable.'),
          Q('A tactic that cannot be tied to the strategy should be:', ['Done anyway', 'Reconsidered or dropped', 'Doubled', 'Hidden'], 1, 'Unconnected tactics are distractions.'),
          Q('Why do beginners jump to tactics?', ['They are visible and feel like progress', 'They are required', 'They are cheap', 'They are always effective'], 0, 'Action feels productive even when it is aimed wrongly.'),
        ],
      }),

      L('dmf-m3-l2', 'Setting SMART Marketing Goals', 'how-to', 26, {
        objectives: ['Turn a vague wish into a SMART goal', 'Choose goals that match the funnel stage', 'Distinguish goals from vanity metrics'],
        concept: `"Get more followers" is a wish, not a goal. A SMART goal is Specific, Measurable, Achievable, Relevant and Time-bound. For example: "Collect 300 email subscribers from Instagram in the next 60 days using a free guide."

Good goals tie to business results. Followers and likes are easy to count but often do not pay the bills. Better goals count things closer to money: leads, bookings, sales, repeat purchases.`,
        whyItMatters: `Without a measurable goal you cannot tell whether your marketing is working, and you tend to quit too soon or continue too long. A clear goal also lets you choose the right tactics and decide what to stop doing.`,
        sections: [
          { title: 'Breaking down SMART', body: `- **Specific:** what exactly, for whom?\n- **Measurable:** what number proves it?\n- **Achievable:** is it realistic with your time, money and current starting point?\n- **Relevant:** does it help the business, not just look good?\n- **Time-bound:** by when?\nThe achievable part matters. A goal of 10,000 subscribers in a month from a standing start will feel impossible and discourage you. Start from your current baseline and aim for a stretch that is still believable.` },
          { title: 'Vanity metrics vs. business metrics', body: `Vanity metrics (followers, likes, impressions) feel good but do not guarantee income. Business metrics (email signups, enquiries, bookings, sales, revenue) show whether marketing is helping the business. Use vanity metrics as supporting signals, not as the goal itself.` },
          { title: 'Working backward from revenue', body: `Start with the money you want and work backward. If you need 10 sales and about 1 in 20 enquiries buys, you need around 200 enquiries. If about 1 in 10 visitors enquires, you need around 2,000 visitors. Rough numbers like these turn a vague ambition into a plan, and show whether the goal is realistic. Use your own data when you have it; early on, treat the ratios as guesses to test.` },
        ],
        keyTerms: [{ term: 'SMART goal', def: 'A goal that is Specific, Measurable, Achievable, Relevant and Time-bound.' }, { term: 'Vanity metric', def: 'A number that looks impressive but does not show business results.' }, { term: 'Baseline', def: 'Where you are starting from today.' }],
        howTo: ['Write the vague goal you currently have.', 'Note your baseline numbers today.', 'Choose a business metric (signups, bookings, sales).', 'Pick a number that is a believable stretch.', 'Add a deadline.', 'Write the goal as one sentence and check each SMART letter.', 'Work backward to estimate the traffic or leads needed.'],
        template: { title: 'SMART goal template', intro: 'Fill in the brackets.', body: `In the next [number] days, we will [action] to achieve [number + metric] from [channel], measured by [where you will check it].\n\nBaseline today: [number]\nWhy this number is believable: [reason]\nWhy it matters to the business: [reason]\nBackward maths: need [sales] -> about [enquiries] -> about [visitors]` },
        example: `Vague: "Grow my Instagram." SMART: "In the next 60 days, collect 300 email subscribers from Instagram using a free styling checklist, measured in my email tool. Baseline: 40 subscribers. Relevant because email buyers purchase more often than followers." Backward maths: she wants 15 sales, about 1 in 20 subscribers buys, so she needs about 300 subscribers.`,
        practice: `Write a SMART goal for a business with a baseline, a believable target, a deadline and a backward calculation. Check each letter.`,
        successCriteria: 'Your goal uses a business metric, has a baseline and deadline, and includes a rough backward calculation.',
        commonMistakes: 'Choosing follower counts as the goal and setting targets with no baseline.',
        takeaways: ['A goal needs a number, a deadline and a baseline.', 'Prefer business metrics over vanity metrics.', 'Work backward from revenue to see what is realistic.'],
        knowledgeCheck: [
          Q('Which is a SMART goal?', ['Get more followers', 'Collect 300 email subscribers in 60 days using a free guide', 'Be popular', 'Post often'], 1, 'It is specific, measurable and time-bound.'),
          Q('Which is a vanity metric?', ['Sales', 'Bookings', 'Likes', 'Revenue'], 2, 'Likes look good but do not prove business results.'),
          Q('Why include your baseline?', ['To look professional', 'It shows whether the target is realistic', 'Platforms require it', 'It lowers costs'], 1, 'Without a starting point you cannot judge how big the jump is.'),
          Q('If 1 in 20 enquiries buys and you want 10 sales, you need about:', ['20 enquiries', '100 enquiries', '200 enquiries', '2,000 enquiries'], 2, '10 sales times 20 enquiries per sale equals 200.'),
        ],
      }),

      L('dmf-m3-l3', 'Choosing the Right Channels for Your Goal', 'concept', 22, {
        objectives: ['Match channels to specific goals', 'Explain why one channel can serve different goals differently', 'Build a simple channel plan with reasons'],
        concept: `Different goals call for different channels. If the goal is to be discovered by strangers, search and short-form video help. If the goal is to sell to people who already know you, email and direct messages work well. If the goal is trust, content, reviews and partnerships do the heavy lifting.

Channel choice also depends on your audience's habits and your capacity. The right channel is the one where your audience pays attention, that fits your goal, and that you can sustain for at least 90 days.`,
        whyItMatters: `A channel that suits one goal may be useless for another. Posting daily on a platform will not help if the goal is to get bookings from corporate clients who never use it. Matching channel to goal turns effort into results.`,
        sections: [
          { title: 'A goal-to-channel map', body: `- **Be found:** SEO, YouTube, short-form video, directories.\n- **Build trust:** blog or video content, testimonials, partnerships, community.\n- **Capture leads:** lead magnets, landing pages, email signups.\n- **Sell:** email, direct messages, sales pages, retargeting.\n- **Retain:** email, community, loyalty offers.` },
          { title: 'The primary and supporting channel rule', body: `Choose one primary channel where you will go deep, and one or two supporting channels that feed it. For example, a primary channel of email supported by short videos that point to the signup page. This keeps your effort focused and your results measurable.` },
        ],
        keyTerms: [{ term: 'Primary channel', def: 'The main channel where you invest most effort.' }, { term: 'Supporting channel', def: 'A channel that feeds the primary one.' }],
        howTo: ['State your goal from the previous lesson.', 'List the funnel stage it sits in.', 'List channels that suit that stage.', 'Pick one primary and up to two supporting channels.', 'Write why each fits the audience.', 'Write what you will not do for now.'],
        example: `Goal: 300 email subscribers in 60 days. Stage: lead capture. Primary: email with a free guide. Supporting: Instagram reels teasing the guide, and a pinned link. Not now: paid ads and TikTok.`,
        practice: `Write a channel plan for your SMART goal with one primary channel, up to two supporting channels, reasons, and what you are saying no to.`,
        successCriteria: 'Your plan links each channel to the goal and audience and names what is deferred.',
        commonMistakes: 'Using the same channels for every goal regardless of fit.',
        takeaways: ['Match channels to goals and funnel stages.', 'One primary channel, one or two supporting.', 'Say no to the rest for now.'],
        knowledgeCheck: [
          Q('To be found by strangers, a good channel is:', ['Email to existing subscribers', 'Search or short-form video', 'A referral only', 'A closed group'], 1, 'Search and video surface you to people who do not know you.'),
          Q('A primary channel is:', ['The cheapest one', 'The main one where you go deepest', 'A random choice', 'A paid ad'], 1, 'Focusing effort makes results measurable.'),
          Q('To sell to people who already know you, which works well?', ['Email', 'Cold billboards', 'Random hashtags', 'Press release'], 0, 'Email reaches known people directly.'),
          Q('Why say no to channels?', ['It is a rule', 'Focus protects your time and quality', 'Others are banned', 'It saves nothing'], 1, 'Fewer channels done well beat many done poorly.'),
        ],
      }),

      L('dmf-m3-l4', 'Positioning: Saying Who You Are For and Why You', 'how-to', 26, {
        objectives: ['Explain what positioning is', 'Write a one-sentence positioning statement', 'Test your positioning against competitors'],
        concept: `Positioning is the place your business holds in the customer's mind compared with the alternatives. It answers: who is this for, what does it do for them, and why is it different from the other options?

Without positioning, businesses sound the same: "high quality, affordable, great service". Everyone says it, so nobody believes it. Strong positioning is specific. It makes a clear claim to a clear audience and, importantly, it is what you choose not to be.`,
        whyItMatters: `Positioning is what makes people choose you over a competitor when they look similar. It shapes your messaging, your visuals, your pricing and your channels. It is also required in the capstone for this course, so this lesson is the foundation.`,
        sections: [
          { title: 'The positioning statement', body: `Use: "For [target audience] who [need or situation], [brand] is the [category] that [key benefit], unlike [alternative] which [weakness]." Example: "For busy mums who want a flexible income, Her Skills is the beginner course that teaches faceless freelance skills in 20-minute lessons, unlike long generic courses that assume you have hours a day."` },
          { title: 'Finding your difference', body: `List your competitors and what each is known for. Look for a gap that matters to your audience and that you can honestly claim. Differences can be about audience (who you serve), approach (how you do it), outcome (what result), or experience (how it feels). A difference nobody cares about is not positioning.` },
          { title: 'Proof makes positioning believable', body: `A claim without proof is just a slogan. Back it up with evidence: testimonials, results, demonstrations, credentials, or a guarantee. If you are new and have no proof yet, start with demonstrations such as sample work.` },
        ],
        keyTerms: [{ term: 'Positioning', def: 'The distinct place a brand holds in the customer\'s mind versus alternatives.' }, { term: 'Differentiation', def: 'A real difference customers care about.' }],
        howTo: ['List three competitors or alternatives your audience considers.', 'Write what each is known for.', 'Find one gap that matters to your persona.', 'Write the positioning statement using the formula.', 'List two pieces of proof you have or could create.', 'Read it aloud to someone and ask what they understood.'],
        template: { title: 'Positioning statement template', intro: 'Copy and complete.', body: `For [target audience]\nwho [need or situation],\n[brand] is the [category]\nthat [key benefit],\nunlike [alternative]\nwhich [weakness of alternative].\n\nProof I can show: 1)  2)\nWhat we are NOT: ` },
        example: `A freelance bookkeeper: "For small shop owners who dread tax season, Ngozi Books is the monthly bookkeeping service that keeps your records tax-ready all year, unlike once-a-year accountants who only appear when the deadline looms." Proof: three client testimonials and a sample monthly report.`,
        practice: `Write a positioning statement for a business, compare it to three alternatives, and list two pieces of proof.`,
        successCriteria: 'Your statement has a specific audience, benefit and contrast, and names real proof.',
        commonMistakes: 'Using generic claims like "high quality and affordable" that every competitor also makes.',
        takeaways: ['Positioning is who you are for and why you, versus alternatives.', 'Differences must matter to the audience and be provable.', 'It shapes every later marketing choice.'],
        knowledgeCheck: [
          Q('Positioning answers:', ['Only your price', 'Who it is for, what it does for them, and why it is different', 'Which colour to use', 'How many posts to make'], 1, 'It is the distinct place you hold in the customer\'s mind.'),
          Q('Which is weak positioning?', ['"The budgeting course for freelancers with irregular income"', '"High quality and affordable"', '"Meal prep for busy night-shift nurses"', '"Tax-ready books for small shops"'], 1, 'Generic claims are shared by every competitor.'),
          Q('Why include proof?', ['It is decoration', 'A claim without proof is only a slogan', 'It lowers prices', 'It is required by platforms'], 1, 'Evidence makes the difference believable.'),
          Q('A useful difference is one that:', ['You like', 'Matters to your audience and you can honestly claim', 'Nobody can verify', 'Competitors already do'], 1, 'Differences must be relevant and truthful.'),
        ],
      }),

      A('dmf-m3-a', [
        Q('Strategy differs from tactics because strategy is:', ['A single post', 'The plan for who you serve, what you say and which routes you use', 'An ad format', 'A tool'], 1, 'Tactics are the actions that carry out the plan.'),
        Q('Which is the best SMART goal?', ['Be famous', 'Grow my page', 'Collect 300 email subscribers in 60 days using a free guide', 'Get likes'], 2, 'It is specific, measurable and time-bound.'),
        Q('Which is a vanity metric?', ['Sales', 'Bookings', 'Impressions', 'Email signups'], 2, 'Impressions do not prove business results.'),
        Q('Why record a baseline?', ['It looks neat', 'To judge whether a target is realistic', 'It is legally required', 'To avoid measuring'], 1, 'Targets only make sense from a starting point.'),
        Q('If 1 in 10 visitors enquires and you want 50 enquiries, you need about:', ['50 visitors', '500 visitors', '5,000 visitors', '10 visitors'], 1, '50 enquiries times 10 visitors per enquiry equals 500.'),
        Q('A good channel plan includes:', ['Every channel', 'One primary and one or two supporting channels with reasons', 'Only paid ads', 'No reasons'], 1, 'Focus makes results measurable.'),
        Q('For lead capture, which pairing fits best?', ['A free guide and an email signup page', 'A billboard only', 'A random hashtag', 'A logo change'], 0, 'Lead magnets and signup pages capture contact details.'),
        Q('Positioning is:', ['A slogan', 'The distinct place you hold in the customer\'s mind compared with alternatives', 'A colour palette', 'A price list'], 1, 'It clarifies who it is for and why you.'),
        Q('Which is the strongest positioning claim?', ['Great service', 'Affordable quality', 'The meal-prep plan for night-shift nurses who have 20 minutes', 'Best in town'], 2, 'It is specific to an audience and a need.'),
        Q('A tactic that cannot be tied to the strategy should be:', ['Done anyway', 'Reconsidered or dropped', 'Copied', 'Doubled'], 1, 'Unconnected tactics are distractions.'),
      ]),
    ],
  },

  /* ---------------- MODULE 4 ---------------- */
  {
    id: 'dmf-m4', title: 'Content Marketing',
    objective: 'Understand content marketing as a trust-building system, and plan content around real audience value.',
    lessons: [
      L('dmf-m4-l1', 'What Content Marketing Actually Does', 'concept', 22, {
        objectives: ['Explain how content builds trust and drives sales over time', 'Describe the difference between content that informs and content that sells', 'Define the role of content in the funnel'],
        concept: `Content marketing means creating and sharing genuinely useful material, such as articles, videos, guides, podcasts and posts, so that the right people find you, trust you and eventually buy from you. Instead of interrupting people with ads, you earn attention by helping.

Content works by answering questions at the moments when people are asking them. If you consistently give good answers, people begin to see you as the expert and the obvious choice when they are ready to buy.`,
        whyItMatters: `Trust is the hardest thing to buy and the most valuable thing to earn. Content builds it at scale: a single helpful video can introduce you to thousands of people, and keeps working long after it is posted.`,
        sections: [
          { title: 'Give before you ask', body: `Strong content solves a small, real problem completely. The reader should be able to use it without buying anything. That generosity is what creates trust, and trust is what makes a later offer feel natural rather than pushy.` },
          { title: 'Content across the funnel', body: `Awareness content attracts strangers through topics they search or care about. Consideration content shows how you think and proves you work, such as case studies and comparisons. Conversion content removes doubts, such as FAQs and demos. Retention content helps customers succeed and come back.` },
          { title: 'Consistency beats bursts', body: `Content compounds over time. Publishing steadily, even weekly, beats a flurry of posts followed by silence. Choose a rhythm you can keep for at least three months.` },
        ],
        keyTerms: [{ term: 'Content marketing', def: 'Creating useful material to attract and build trust with an audience.' }, { term: 'Lead magnet', def: 'A free resource offered in exchange for contact details.' }],
        howTo: ['Write ten real questions your audience asks.', 'Mark which funnel stage each question belongs to.', 'Choose three to answer first.', 'Choose a format for each (post, video, guide).', 'Decide the weekly rhythm you can sustain.', 'Write where each piece will lead the reader next.'],
        example: `A nutritionist collects questions: "Can I eat rice at night?", "How do I meal prep on a budget?" She answers the first as a short video (awareness), the second as a downloadable guide (lead capture), and then emails guide subscribers an offer for a consultation (conversion).`,
        practice: `List ten real audience questions, tag the funnel stage, and choose your first three pieces with format and next step.`,
        successCriteria: 'Your questions are real, staged, and each chosen piece leads somewhere.',
        commonMistakes: 'Creating content about what you want to talk about rather than what your audience asks.',
        takeaways: ['Content earns trust by helping first.', 'Different funnel stages need different content.', 'Consistency compounds.'],
        knowledgeCheck: [
          Q('Content marketing builds results mainly by:', ['Interrupting people', 'Earning trust through useful material', 'Hiding the offer', 'Copying competitors'], 1, 'Helpfulness builds trust, which supports later sales.'),
          Q('A case study mainly serves which stage?', ['Awareness', 'Consideration', 'Retention only', 'None'], 1, 'It shows proof to people comparing options.'),
          Q('Where should content ideas come from?', ['Your mood', 'Real audience questions', 'Competitor logos', 'Random trends'], 1, 'Real questions mean real demand.'),
          Q('Why publish consistently?', ['Platforms demand it', 'Content compounds over time', 'It is cheaper', 'It avoids research'], 1, 'Regular output builds an asset that grows.'),
        ],
      }),

      L('dmf-m4-l2', 'The Three Content Types', 'concept', 22, {
        objectives: ['Distinguish educational, entertaining and inspirational content', 'Balance the three in a plan', 'Know which job each type does best'],
        concept: `Most useful content falls into three types. Educational content teaches something: how-tos, tips, explainers. Entertaining content delights or amuses: stories, humour, behind-the-scenes, trends adapted to your niche. Inspirational content motivates: success stories, transformations, values and vision.

Each type works differently. Educational builds authority and saves, entertaining builds reach and personality, inspirational builds emotional connection and belief. A healthy mix keeps an audience learning, smiling and believing.`,
        whyItMatters: `A feed of only educational content can feel dry. Only entertaining content brings attention without trust. Only inspirational content can feel empty without substance. Balancing them gives you reach, credibility and loyalty.`,
        sections: [
          { title: 'What each type is best at', body: `- **Educational:** earns trust and saves, often found through search.\n- **Entertaining:** spreads widely, shows personality.\n- **Inspirational:** creates belief and community, supports premium offers.\nIn many niches a rough starting split of educational-heavy, with smaller shares of the others, works well, but adjust with your own results.` },
          { title: 'Combining types in one piece', body: `The best pieces blend types. A tutorial told as a funny story is both educational and entertaining. A transformation story that teaches the steps is inspirational and educational. Try to give every piece at least one clear job.` },
        ],
        keyTerms: [{ term: 'Educational content', def: 'Content that teaches or explains.' }, { term: 'Entertaining content', def: 'Content that delights or amuses.' }, { term: 'Inspirational content', def: 'Content that motivates or builds belief.' }],
        howTo: ['Write three topics your audience cares about.', 'For each, draft one educational, one entertaining and one inspirational angle.', 'Mark the funnel stage for each.', 'Pick the best five angles.', 'Check you have a mix of types.', 'Note which one you expect to perform best, then test it.'],
        example: `Topic: budgeting for freelancers. Educational: "3 ways to smooth irregular income". Entertaining: "Things freelancers say on payday vs day 25". Inspirational: "How one freelancer built a six-month cushion".`,
        practice: `Create a table of three topics with three angles each, and select five pieces with a balanced mix.`,
        successCriteria: 'You wrote nine distinct angles and selected a balanced five.',
        commonMistakes: 'Posting only one type because it is the easiest to make.',
        takeaways: ['Educational, entertaining and inspirational each do a different job.', 'Balance builds reach, trust and loyalty.', 'Blend types for stronger pieces.'],
        knowledgeCheck: [
          Q('Which type mainly builds authority and saves?', ['Entertaining', 'Educational', 'Inspirational', 'None'], 1, 'Teaching content proves expertise.'),
          Q('A funny story that teaches a tip is:', ['Educational only', 'A blend of types', 'Irrelevant', 'Spam'], 1, 'Pieces can blend types.'),
          Q('Only posting entertaining content risks:', ['Too much trust', 'Attention without trust', 'No reach', 'Higher cost'], 1, 'It can attract people who do not take you seriously as an expert.'),
          Q('Inspirational content mainly builds:', ['Search ranking', 'Emotional connection and belief', 'Technical skill', 'Ad reach'], 1, 'It strengthens belief and loyalty.'),
        ],
      }),

      L('dmf-m4-l3', 'Content Planning Basics', 'how-to', 28, {
        objectives: ['Create content pillars', 'Build a two-week content calendar', 'Tie every piece to a funnel stage and a next step'],
        concept: `Content planning turns good intentions into a repeatable routine. The basic tools are content pillars (three or four recurring themes), a calendar (what, where and when), and a call to action for each piece (what the reader should do next).

Pillars keep you from running out of ideas and keep your feed coherent. A calendar makes consistency possible, because decisions are made once instead of every morning.`,
        whyItMatters: `Most people stop creating content not because of lack of talent but because of decision fatigue and no plan. A simple plan removes the daily question "what do I post?" and lets you focus on making good content.`,
        sections: [
          { title: 'Choosing pillars', body: `Pillars are themes where your expertise meets your audience's needs. For a freelance designer: portfolio breakdowns, design tips, client stories, and behind-the-scenes. Three to four is enough. Each pillar should connect to something you sell.` },
          { title: 'Building the calendar', body: `Decide your rhythm (for example three pieces per week), pick days, and assign a pillar and funnel stage to each slot. Batch the work: write or film several pieces in one session. Leave a slot or two flexible for timely topics.` },
          { title: 'Every piece needs a next step', body: `End each piece with a clear, small call to action: save this, join the list, book a call, read the guide. Without a next step, attention evaporates.` },
        ],
        keyTerms: [{ term: 'Content pillar', def: 'A recurring theme your content returns to.' }, { term: 'Batching', def: 'Creating several pieces in one working session.' }, { term: 'Call to action', def: 'A clear next step for the audience.' }],
        howTo: ['Write three or four pillars tied to what you sell.', 'Choose your weekly rhythm.', 'List ten ideas across the pillars.', 'Assign each to a date, channel and funnel stage.', 'Add a call to action to every piece.', 'Block time to batch the first week.', 'Review after two weeks and adjust.'],
        template: { title: 'Two-week content calendar', intro: 'Copy into a sheet.', body: `Date | Channel | Pillar | Funnel stage | Format | Topic / hook | Call to action | Done?\n\nExample row:\nMon 3 | Instagram | Design tips | Awareness | Reel | 3 spacing mistakes that make logos look cheap | Save this for later\n\nMy strategy sentence (every piece must serve it):\n` },
        example: `A makeup artist plans pillars: bridal tips, skin prep, client stories, and kit essentials. Her calendar has three pieces a week. Monday reel (skin prep, awareness, "save this"), Wednesday carousel (kit essentials, consideration, "comment your skin type"), Friday story (client story, conversion, "book your trial").`,
        practice: `Build a two-week calendar with three or four pillars and at least eight pieces, each tied to a funnel stage and a call to action.`,
        successCriteria: 'Your calendar has pillars, dates, channels, funnel stages and calls to action, and all serve one strategy sentence.',
        commonMistakes: 'Filling the calendar with topics you like instead of problems your audience has.',
        takeaways: ['Pillars keep content focused and ideas flowing.', 'A calendar makes consistency possible.', 'Every piece needs a funnel stage and a next step.'],
        knowledgeCheck: [
          Q('A content pillar is:', ['A single post', 'A recurring theme', 'A paid ad', 'A hashtag'], 1, 'Pillars organise your content ideas.'),
          Q('Batching means:', ['Posting at midnight', 'Creating several pieces in one session', 'Deleting posts', 'Buying ads'], 1, 'Batching saves time and protects consistency.'),
          Q('Why add a call to action?', ['To make posts longer', 'To give the audience a next step', 'It is mandatory', 'To avoid analytics'], 1, 'A next step turns attention into progress.'),
          Q('How many pillars are usually enough?', ['One', 'Three or four', 'Twenty', 'None'], 1, 'Three to four give variety without losing focus.'),
        ],
      }),

      L('dmf-m4-l4', 'Hooks, Formats and Repurposing', 'how-to', 26, {
        objectives: ['Write strong hooks for different formats', 'Turn one idea into several pieces', 'Build a simple weekly content workflow'],
        concept: `A hook is the first line or moment that makes someone stop and keep going. Online, you have about a second or two to win attention, so the hook often matters more than the rest of the piece. Good hooks promise a clear benefit, spark curiosity, or call out a specific person.

Repurposing means turning one core idea into several formats. A single idea can become a short video, a carousel, a newsletter section, a tweet thread and a blog post. This multiplies the value of your research and effort.`,
        whyItMatters: `Creating from scratch every day is exhausting. Repurposing lets you do deep work once and share it many ways, reaching people who prefer different formats and giving the idea more chances to land.`,
        sections: [
          { title: 'Hook formulas that work', body: `- **Call out:** "If you are a new freelancer who keeps undercharging, watch this."\n- **Curiosity gap:** "The pricing mistake I made for two years."\n- **Number and promise:** "3 ways to get your first client this month."\n- **Contrarian:** "You do not need a big following to sell."\nWrite five hook options for each piece and pick the strongest. Never promise something the piece does not deliver.` },
          { title: 'The repurposing ladder', body: `Start with one core idea and research. Make the long version first (a guide or video). Then cut it into a short video, a carousel of the key steps, a quote graphic, an email and a few text posts. Each version points back to the core piece or the next step.` },
        ],
        keyTerms: [{ term: 'Hook', def: 'The opening that makes someone stop and keep going.' }, { term: 'Repurposing', def: 'Turning one idea into several formats.' }],
        howTo: ['Choose one core idea your audience cares about.', 'Write five hooks using different formulas.', 'Pick the strongest and check you can deliver on it.', 'Create the long version first.', 'List four shorter formats you can cut from it.', 'Schedule them across a week with calls to action.'],
        example: `Core idea: "How to price your first freelance project." Long version: a ten-minute video. Repurposed: a 30-second reel with a hook "I charged too little for two years", a carousel of the three-step formula, a newsletter paragraph with a template, and two text posts.`,
        practice: `Write five hooks for one idea, choose the best, and map out four repurposed formats with dates.`,
        successCriteria: 'You wrote five distinct hooks and mapped four formats from one core idea.',
        commonMistakes: 'Clickbait hooks the content cannot deliver, which damage trust.',
        takeaways: ['Hooks decide whether anyone sees the rest.', 'Write several hooks and pick the best.', 'Repurpose one idea into many formats.'],
        knowledgeCheck: [
          Q('A hook is:', ['The last line', 'The opening that wins attention', 'A hashtag', 'An ad budget'], 1, 'It decides whether people keep watching or reading.'),
          Q('Which is a call-out hook?', ['"If you are a new freelancer who undercharges, watch this."', '"Hello everyone"', '"Today I will talk"', '"Please like"'], 0, 'It names a specific person.'),
          Q('Repurposing means:', ['Reposting identical content everywhere', 'Turning one idea into several formats', 'Deleting old posts', 'Copying others'], 1, 'One idea is adapted across formats.'),
          Q('Why avoid clickbait hooks?', ['They are illegal', 'They damage trust when the content does not deliver', 'They are too short', 'They are costly'], 1, 'Broken promises cost credibility.'),
        ],
      }),

      A('dmf-m4-a', [
        Q('Content marketing mainly builds:', ['Interruptions', 'Trust by helping first', 'Ad spend', 'Followers only'], 1, 'Helpful content earns trust.'),
        Q('A case study mainly serves which funnel stage?', ['Awareness', 'Consideration', 'None', 'Retention only'], 1, 'It gives proof to people comparing options.'),
        Q('The three content types are:', ['Long, short, medium', 'Educational, entertaining, inspirational', 'Paid, owned, earned', 'Text, image, audio'], 1, 'Each type does a different job.'),
        Q('Only posting entertaining content risks:', ['Trust overload', 'Attention without trust', 'No reach', 'Higher ad cost'], 1, 'You may attract people who do not see you as an expert.'),
        Q('A content pillar is:', ['A single post', 'A recurring theme', 'A paid ad', 'A tool'], 1, 'Pillars organise ideas.'),
        Q('Why add a call to action?', ['To lengthen posts', 'To give the audience a next step', 'Platforms require it', 'It hides analytics'], 1, 'Attention without a next step evaporates.'),
        Q('Batching helps because it:', ['Reduces quality', 'Creates several pieces in one session, supporting consistency', 'Removes strategy', 'Avoids research'], 1, 'It protects your time and rhythm.'),
        Q('A strong hook usually:', ['Starts with "Hello"', 'Calls out a person or promises a clear benefit', 'Is hidden', 'Is the longest line'], 1, 'Hooks win the first second of attention.'),
        Q('Repurposing is:', ['Copying competitors', 'Turning one idea into several formats', 'Deleting content', 'Posting identical content everywhere'], 1, 'It multiplies the value of one idea.'),
        Q('Content ideas should come from:', ['Your mood', 'Real audience questions', 'Random trends only', 'Competitor logos'], 1, 'Real questions mean real demand.'),
      ]),
    ],
  },

  /* ---------------- MODULE 5 ---------------- */
  {
    id: 'dmf-m5', title: 'Social Media Marketing',
    objective: 'Understand how to choose platforms strategically and use social media as part of a broader marketing system.',
    lessons: [
      L('dmf-m5-l1', 'Choosing the Right Platforms', 'concept', 22, {
        objectives: ['Compare platforms by audience, format and purpose', 'Choose one or two platforms using evidence', 'Avoid choosing platforms by hype'],
        concept: `Each social platform has its own culture, formats and audience habits. Short-video platforms reward entertaining, fast-paced content and discovery. Professional networks reward expertise and business stories. Visual platforms reward strong imagery and aesthetics. Messaging apps and groups reward conversation and trust.

The best platform for you is not the biggest one. It is the one where your specific audience already spends time, in a format you can produce consistently, and that supports your business goal.`,
        whyItMatters: `Time is your scarcest resource. Spreading it over five platforms means doing none of them well. Choosing one or two and committing for three months gives you real data and real skill.`,
        sections: [
          { title: 'Platform fit check', body: `Score each candidate platform on four questions. Does my persona use it regularly? Does its main format suit what I can make? Does it support my goal (discovery, trust, sales)? Can I post there consistently for 90 days? Prefer evidence over assumption: look at whether real people in your niche are active there and getting engagement.` },
          { title: 'Platforms change', body: `Features, algorithms and popularity shift. Treat your platform choice as a test with a review date, not a lifelong commitment. Meanwhile, keep moving people to owned channels such as email so you are not stranded by changes.` },
        ],
        keyTerms: [{ term: 'Platform fit', def: 'How well a platform matches your audience, format and goal.' }, { term: 'Algorithm', def: 'The system a platform uses to decide what content to show.' }],
        howTo: ['List three platforms you are considering.', 'Search your niche on each and note how active and engaged it is.', 'Score each on audience, format, goal and sustainability.', 'Choose one primary and optionally one secondary platform.', 'Set a 90-day test with a review date.', 'Write the owned channel you will send people to.'],
        example: `A freelance accountant targeting small business owners finds LinkedIn full of active owners discussing finances, Instagram less so, and TikTok mostly younger audiences. She picks LinkedIn as primary and a newsletter as owned channel.`,
        practice: `Score three platforms for your business on four criteria, select one or two, and set a 90-day review date.`,
        successCriteria: 'You scored platforms with evidence from your niche and set a review date.',
        commonMistakes: 'Picking a platform because it is trending rather than because your audience is there.',
        takeaways: ['Choose platforms by audience, format, goal and sustainability.', 'One or two platforms done well beats many done badly.', 'Treat the choice as a test with a review date.'],
        knowledgeCheck: [
          Q('The best platform for your business is the one where:', ['Everyone is', 'Your audience spends time and you can post sustainably', 'Celebrities post', 'It is newest'], 1, 'Fit with audience and capacity matters more than size.'),
          Q('Why set a review date?', ['Platforms change', 'It is required', 'To avoid analytics', 'It lowers costs'], 0, 'Platforms and audiences shift, so test and review.'),
          Q('What should you still build while on social platforms?', ['Nothing', 'An owned channel like email', 'More platforms', 'A rented audience only'], 1, 'Owned channels protect you from platform changes.'),
          Q('Choosing by hype means:', ['Evidence-based choice', 'Following trends without checking your audience', 'Careful research', 'Using analytics'], 1, 'Hype ignores whether your audience is there.'),
        ],
      }),

      L('dmf-m5-l2', 'Social Media as Part of the Funnel', 'concept', 22, {
        objectives: ['Place social content at the right funnel stage', 'Connect social posts to an owned next step', 'Explain why social alone rarely closes sales'],
        concept: `Social media works best at the top and middle of the funnel: getting discovered, showing personality, and building trust. It can close sales, especially with direct messages, but it is often more effective when it moves people toward a place you own, like an email list or a booking page.

Think of social posts as signposts. Each should lead somewhere: a free guide, a booking page, a product page. A post with no destination is entertainment, not marketing.`,
        whyItMatters: `Many businesses have lively social accounts but little revenue because there is no path from attention to action. Designing the path is what turns followers into customers.`,
        sections: [
          { title: 'Designing the path', body: `A simple path: a post attracts attention, the profile explains who you help, the link goes to a lead magnet or offer page, an email follows up. Check each link in the chain. A confusing profile or a broken link loses people quietly.` },
          { title: 'Direct messages as a sales channel', body: `Many sales happen in messages, especially for services. Be helpful and human: ask about their situation, answer questions, and make a clear offer. Avoid copy-pasted pitches. Save common answers so you can respond quickly without sounding robotic.` },
        ],
        keyTerms: [{ term: 'Social path', def: 'The route from a post to an action.' }, { term: 'Link in bio', def: 'The single clickable link on a profile, used to direct visitors.' }],
        howTo: ['Open your profile as a stranger and write what it tells them.', 'Check the bio says who you help and what to do next.', 'Make the link lead to one clear action.', 'Plan three posts that each point to that action.', 'Write a follow-up email or message for people who take the action.', 'Test the whole path on your phone.'],
        example: `A fitness coach's bio says "Helping busy mums build strength in 20 minutes. Free starter plan below". Reels point to the free plan. The plan page collects an email. An email sequence follows with success stories and an invitation to join her programme.`,
        practice: `Audit a real profile (yours or another) and write what is unclear, then design a better path from post to action.`,
        successCriteria: 'Your audit names specific issues and your new path has a post, profile, link and follow-up.',
        commonMistakes: 'Posting regularly with no link or next step.',
        takeaways: ['Social is strongest for discovery and trust.', 'Every post should lead somewhere.', 'Move people toward owned channels.'],
        knowledgeCheck: [
          Q('Social media is strongest at which funnel stages?', ['Only retention', 'Top and middle', 'Only conversion', 'None'], 1, 'It excels at discovery and trust building.'),
          Q('A post with no next step is:', ['Ideal marketing', 'Entertainment rather than marketing', 'Illegal', 'Paid'], 1, 'Without a path it does not lead to action.'),
          Q('Why direct people to an email list?', ['It is required', 'It is owned and not subject to algorithms', 'It is cheaper to write', 'It increases followers'], 1, 'Owned channels protect the relationship.'),
          Q('A good bio does what?', ['Lists every detail', 'Says who you help and what to do next', 'Hides your offer', 'Only has emojis'], 1, 'Clarity guides visitors to act.'),
        ],
      }),

      L('dmf-m5-l3', 'Basics of Engagement & Community', 'how-to', 24, {
        objectives: ['Describe what healthy engagement looks like', 'Build a daily or weekly engagement routine', 'Respond to comments and messages in a way that builds trust'],
        concept: `Engagement is a conversation, not a scoreboard. Replying to comments, asking questions, thanking people and interacting with your community's content tells the platform and people that your account is alive and welcoming. Community forms when people feel seen and connected to each other, not only to you.

Quality beats volume. Ten thoughtful replies build more trust than a hundred generic ones. Engagement is also research: the questions people ask are your next pieces of content.`,
        whyItMatters: `Followers who feel noticed become loyal customers and advocates. Silent accounts feel like billboards. A small, active community often outsells a large passive audience.`,
        sections: [
          { title: 'A simple engagement routine', body: `Spend a fixed time each day (even 15 minutes). Reply to every genuine comment and message on your own posts. Leave thoughtful comments on a handful of posts by people in your audience or by potential partners. Save the best questions in a list for content ideas.` },
          { title: 'Comments as content', body: `When someone asks a good question, answer it publicly and then consider turning it into a post. This shows responsiveness and demonstrates your expertise to everyone reading.` },
          { title: 'Handling criticism and spam', body: `Reply to genuine criticism calmly, thank people, correct facts without defensiveness, and move complex issues to private messages. Ignore or remove spam and abuse. Never argue publicly in anger: others are watching how you behave.` },
        ],
        keyTerms: [{ term: 'Engagement', def: 'Two-way interaction with your audience.' }, { term: 'Community', def: 'People who feel connected to your brand and each other.' }],
        howTo: ['Set a daily engagement window.', 'Reply to all genuine comments within a day.', 'Leave five thoughtful comments elsewhere.', 'Keep a running list of questions.', 'Write response templates you can personalise.', 'Decide how you will handle criticism and spam.'],
        template: { title: 'Reply starters you can personalise', intro: 'Always add a specific detail so it does not sound robotic.', body: `Thank-you: "Thank you [name]! I'm glad the [specific thing] helped. Are you working on [related thing] too?"\n\nQuestion: "Great question. Short answer: [answer]. I'll cover this in more detail on [day]."\n\nCriticism: "Thanks for raising this, [name]. You're right that [fair point]. Here is how I look at it: [calm explanation]. I'd welcome your thoughts."\n\nPrice question (move to DM): "Happy to help. I'll message you the details so you can see what fits." ` },
        example: `A baker gets the comment "Can I freeze these cupcakes?" She replies with a short answer, makes a 20-second video answering it properly, and pins it. That video becomes her best performer that month.`,
        practice: `Write a 15-minute engagement routine, five response templates, and a plan for criticism, then list five audience questions you could turn into posts.`,
        successCriteria: 'Your routine is realistic, your templates are personalisable, and you have five question-based content ideas.',
        commonMistakes: 'Posting and disappearing, or replying with generic one-word comments.',
        takeaways: ['Engagement is conversation, not a scoreboard.', 'Questions are free content ideas.', 'Handle criticism calmly and publicly watched.'],
        knowledgeCheck: [
          Q('Engagement is best described as:', ['A follower count', 'Two-way interaction with your audience', 'Posting daily', 'Buying likes'], 1, 'It is conversation, not just numbers.'),
          Q('A good response to genuine criticism is:', ['Delete and ignore always', 'Reply calmly, correct facts and move complex issues to DM', 'Argue publicly', 'Attack the commenter'], 1, 'Calm, respectful replies show professionalism to everyone watching.'),
          Q('Audience questions are useful because they:', ['Waste time', 'Give you content ideas and research', 'Increase costs', 'Replace strategy'], 1, 'They reveal what people want to know.'),
          Q('Which builds more trust?', ['A hundred generic replies', 'Ten thoughtful replies', 'No replies', 'Only emojis'], 1, 'Quality shows you listened.'),
        ],
      }),

      L('dmf-m5-l4', 'Collaborations, Social Proof and Creator Partnerships', 'concept', 22, {
        objectives: ['Explain how social proof influences buying decisions', 'Plan a simple collaboration with another creator or business', 'Collect and display testimonials ethically'],
        concept: `People trust other people more than they trust brands. Social proof is evidence that others have chosen and enjoyed you: reviews, testimonials, user-generated content, case studies, follower stories, and mentions by trusted people.

Collaborations borrow that trust. When a creator or business your audience already trusts shares or works with you, some of their credibility transfers to you. Good collaborations are mutually beneficial: both sides gain audience, content or credibility.`,
        whyItMatters: `For a new brand, social proof is often the missing ingredient between interest and purchase. Collaborations are a low-cost way to reach new audiences who already have a reason to trust you.`,
        sections: [
          { title: 'Collecting social proof ethically', body: `Ask satisfied customers for a short testimonial and permission to share it. Make it easy with two or three guiding questions. Never fake reviews or exaggerate results; it is dishonest, can break platform rules and in many places breaks advertising or consumer protection laws. Share real results with context.` },
          { title: 'Planning a collaboration', body: `Find partners whose audience overlaps with yours but who are not direct competitors. Propose something specific: a joint live session, a guest post, a giveaway, or a bundle. Explain the benefit to them, agree on what each side does, and review results afterwards.` },
          { title: 'Disclosure matters', body: `If you are paid or given a free product to promote something, you must disclose it clearly. Many countries have rules on this, and audiences value honesty.` },
        ],
        keyTerms: [{ term: 'Social proof', def: 'Evidence that others have chosen and benefited from you.' }, { term: 'Testimonial', def: 'A customer\'s own words about their experience.' }, { term: 'Disclosure', def: 'Clearly stating a paid or gifted relationship.' }],
        howTo: ['List three happy customers or people you have helped.', 'Write two or three easy questions to get a testimonial.', 'Ask for permission to share.', 'List three potential collaboration partners with overlapping audiences.', 'Write a specific proposal explaining their benefit.', 'Plan how to measure the result.'],
        template: { title: 'Testimonial request and collaboration pitch', intro: 'Personalise before sending.', body: `TESTIMONIAL REQUEST\nHi [name], I'm so glad [specific result]. Would you be willing to share a few words I could use on my page? A few prompts: 1) What was the problem before? 2) What changed after working together? 3) What would you tell someone considering it? May I share it with your first name?\n\nCOLLABORATION PITCH\nHi [name], I love your [specific content]. Our audiences overlap but we don't compete. I'd love to suggest [specific idea, e.g. a joint live Q&A]. You'd get [benefit]; I'd handle [tasks]. Would you be open to a quick chat?` },
        example: `A freelance copywriter and a freelance designer serve the same small-business owners. They host a joint live session called "Fix your homepage in 60 minutes", and each shares it with their own audience. Both gain leads and credibility.`,
        practice: `Draft a testimonial request, a collaboration pitch to a real potential partner, and a way to measure the outcome.`,
        successCriteria: 'Your pitch names a specific idea and a benefit for the partner, and your measure is concrete.',
        commonMistakes: 'Faking reviews, or pitching vague collaborations that offer the partner nothing.',
        takeaways: ['Social proof turns interest into trust.', 'Collaborations borrow credibility; make them mutual.', 'Be honest and disclose paid or gifted partnerships.'],
        knowledgeCheck: [
          Q('Social proof is:', ['A type of ad', 'Evidence others chose and benefited from you', 'A hashtag', 'A budget'], 1, 'Reviews and testimonials show others trust you.'),
          Q('A good collaboration partner has:', ['An identical offer', 'Overlapping audience but is not a direct competitor', 'No audience', 'A hidden agenda'], 1, 'Overlap offers reach without direct rivalry.'),
          Q('Faking reviews is:', ['Smart', 'Dishonest and may break rules and laws', 'Harmless', 'Required'], 1, 'It damages trust and can be illegal.'),
          Q('If you are paid to promote a product you should:', ['Hide it', 'Disclose it clearly', 'Avoid mentioning', 'Delete comments'], 1, 'Disclosure is often legally required and respected by audiences.'),
        ],
      }),

      A('dmf-m5-a', [
        Q('The best platform for your business is the one where:', ['Everyone is', 'Your audience is active and you can post sustainably', 'Celebrities post', 'It is newest'], 1, 'Fit matters more than size.'),
        Q('Social media is strongest at which funnel stages?', ['Only retention', 'Top and middle', 'Only conversion', 'None'], 1, 'Discovery and trust building.'),
        Q('A post with no next step is:', ['Ideal', 'Entertainment rather than marketing', 'Paid', 'Illegal'], 1, 'Without a path, there is no action.'),
        Q('Why move followers to an email list?', ['Required', 'It is owned and not controlled by an algorithm', 'It is cheaper to write', 'It adds followers'], 1, 'Owned channels protect the relationship.'),
        Q('Engagement is best described as:', ['A follower count', 'Two-way interaction', 'Posting daily', 'Buying likes'], 1, 'It is conversation.'),
        Q('A good response to genuine criticism is:', ['Delete everything', 'Reply calmly and move complex issues to DM', 'Argue in public', 'Ignore always'], 1, 'Calm replies show professionalism.'),
        Q('Audience questions are useful because they:', ['Waste time', 'Give you content ideas', 'Increase costs', 'Replace strategy'], 1, 'They reveal what people want.'),
        Q('Social proof is:', ['An ad type', 'Evidence others chose you and benefited', 'A hashtag', 'A budget'], 1, 'Reviews and testimonials build trust.'),
        Q('If a brand gives you a free product to promote, you should:', ['Hide it', 'Disclose it clearly', 'Delete comments', 'Avoid mention'], 1, 'Disclosure is often legally required.'),
        Q('Treating a platform choice as a test means:', ['Never changing', 'Setting a review date and checking results', 'Using every platform', 'Ignoring data'], 1, 'Platforms and audiences change.'),
      ]),
    ],
  },

  /* ---------------- MODULE 6 ---------------- */
  {
    id: 'dmf-m6', title: 'Search Marketing & SEO Basics',
    objective: 'Understand the basics of how search engines work and how SEO fits into a marketing plan.',
    lessons: [
      L('dmf-m6-l1', 'How Search Engines Decide What to Show', 'concept', 22, {
        objectives: ['Describe crawling, indexing and ranking in simple terms', 'Name the main factors that influence rankings', 'Explain why SEO is a long-term channel'],
        concept: `A search engine works in three steps. Crawling: automated programs follow links to discover pages. Indexing: the engine stores and organises what it finds. Ranking: when someone searches, it chooses the pages it believes will best satisfy that search and orders them.

Rankings depend on many signals, but the core idea is simple: the engine wants to show the most helpful, trustworthy and relevant result for each search. SEO (search engine optimization) is the practice of making your pages easy to find and genuinely worth showing.`,
        whyItMatters: `Search catches people at the exact moment they want something. Unlike social posts that disappear in days, a good page can keep bringing visitors for years. SEO is slow, but it compounds.`,
        sections: [
          { title: 'The big factors', body: `- **Relevance:** does the page match what the person is looking for?\n- **Quality and usefulness:** is it original, accurate and complete?\n- **Authority:** do other trusted sites link to or mention you?\n- **Experience:** is the page fast, easy to read and mobile-friendly?\nNobody outside the search engines knows the exact formula, and it changes. Be wary of anyone promising guaranteed number-one rankings.` },
          { title: 'Why SEO takes time', body: `New sites have little history or authority, so it commonly takes months to see meaningful traffic. That is normal. The reward for patience is steady, relatively low-cost visits from people with clear intent.` },
        ],
        keyTerms: [{ term: 'Crawling', def: 'Discovering pages by following links.' }, { term: 'Indexing', def: 'Storing and organising discovered pages.' }, { term: 'Ranking', def: 'Ordering pages in response to a search.' }],
        howTo: ['Search a phrase your audience would use.', 'Open the top three results and note what they have in common.', 'Note what questions they answer and what format they use.', 'Write what is missing or could be done better.', 'Write the main promise of a page you could create.', 'Note how long you will give it before reviewing.'],
        example: `Searching "how to price freelance design work" shows three guides that each include a step-by-step formula, examples and a template. A new page that includes those elements plus a real example from a Lagos-based freelancer could stand out.`,
        practice: `Analyse the top three results for a search your audience uses, and write what a better page would include.`,
        successCriteria: 'Your analysis names common elements and at least two ways to add more value.',
        commonMistakes: 'Believing SEO is a trick rather than being genuinely helpful and well structured.',
        takeaways: ['Search engines crawl, index and rank.', 'They aim to show the most helpful result.', 'SEO is slow but compounds.'],
        knowledgeCheck: [
          Q('Which is the correct order?', ['Rank, crawl, index', 'Crawl, index, rank', 'Index, rank, crawl', 'Crawl, rank, index'], 1, 'Pages are discovered, stored, then ordered for searches.'),
          Q('Search engines mainly want to show:', ['The newest page', 'The most helpful, relevant and trustworthy result', 'The longest page', 'The paid page only'], 1, 'Satisfying the searcher is their goal.'),
          Q('Why does SEO take time?', ['Rules forbid speed', 'New sites have little authority or history', 'Search is random', 'Costs are high'], 1, 'Authority and trust build gradually.'),
          Q('Someone promises guaranteed number-one rankings. You should:', ['Hire immediately', 'Be cautious', 'Pay upfront', 'Assume it is easy'], 1, 'No one outside the search engine can guarantee rankings.'),
        ],
      }),

      L('dmf-m6-l2', 'Search Intent', 'concept', 22, {
        objectives: ['Identify the four main types of search intent', 'Match a page to the intent behind a keyword', 'Explain why intent mismatch kills rankings'],
        concept: `Search intent is the reason behind a search. People are rarely just typing words; they want something. The four common types are: informational (learn something), navigational (find a specific site), commercial investigation (compare options before buying) and transactional (ready to act or buy).

Search engines study what people click and stay on, so they learn the intent behind each query. If your page does not match that intent, it will struggle however well it is written.`,
        whyItMatters: `A sales page will not rank for "how to" searches, and a long article will not rank for "buy now" searches. Matching intent saves you from creating the right content for the wrong query.`,
        sections: [
          { title: 'Reading the intent signals', body: `Words give clues. "How to", "what is", "why" suggest informational. "Best", "vs", "review" suggest commercial investigation. "Buy", "price", "near me", "book" suggest transactional. Brand names suggest navigational. Then check the results page: if it shows mostly guides, the intent is informational; if it shows product pages, it is transactional.` },
          { title: 'Matching content to intent', body: `Informational: guides, tutorials, explainers. Commercial: comparisons, reviews, "best of" lists. Transactional: product or service pages with clear prices and calls to action. You can build a journey: an informational article that leads gently to a commercial comparison and then to a transactional page.` },
        ],
        keyTerms: [{ term: 'Search intent', def: 'The goal behind a search query.' }, { term: 'Informational', def: 'Searching to learn.' }, { term: 'Transactional', def: 'Searching to buy or act.' }],
        howTo: ['Pick five keywords related to your business.', 'Label the intent of each.', 'Search each and look at the type of results shown.', 'Decide what type of page you would need.', 'Check whether you already have such a page.', 'Plan a path from informational to transactional pages.'],
        example: `"best budgeting app for freelancers" is commercial investigation. The results are comparison lists. A single product sales page would not rank. A comparison article with honest pros and cons would fit.`,
        practice: `Label the intent of ten keywords and match each to the type of page that would satisfy it.`,
        successCriteria: 'Your labels are supported by what the search results actually show.',
        commonMistakes: 'Writing a sales page for a keyword where searchers want information.',
        takeaways: ['Four intents: informational, navigational, commercial, transactional.', 'The results page reveals the intent.', 'Match page type to intent.'],
        knowledgeCheck: [
          Q('"Best laptop for students" is mostly:', ['Navigational', 'Commercial investigation', 'Informational only', 'Transactional'], 1, '"Best" signals comparison before buying.'),
          Q('"Buy running shoes size 6" is:', ['Informational', 'Transactional', 'Navigational', 'Commercial investigation'], 1, 'The person is ready to purchase.'),
          Q('Why check the results page?', ['It shows what kind of content satisfies searchers', 'It is required', 'It shows ad prices only', 'It avoids research'], 0, 'Search engines show the page types that satisfy people.'),
          Q('A sales page targeting "how to" searches is:', ['Ideal', 'Likely a mismatch', 'Always ranked first', 'Required'], 1, 'Searchers want guidance, not a sales page.'),
        ],
      }),

      L('dmf-m6-l3', 'Basic Keyword Research', 'how-to', 28, {
        objectives: ['Find keyword ideas using free methods', 'Judge a keyword by relevance, intent and competition', 'Build a small, realistic keyword list'],
        concept: `Keyword research means finding the words and phrases real people use when searching for what you offer, and deciding which ones are worth targeting. You do not need paid tools to start. Search suggestions, "people also ask" boxes, forums, and Google Search Console (once your site has data) show what people really search.

New sites should usually target longer, more specific phrases ("long-tail" keywords) because they have less competition and clearer intent than short, broad terms.`,
        whyItMatters: `Writing content nobody searches for is a waste of effort. Keyword research confirms demand before you invest hours, and gives you the exact language your audience uses.`,
        sections: [
          { title: 'Free ways to find ideas', body: `- Type your topic into a search box and note the auto-suggestions.\n- Scroll to "people also ask" and "related searches".\n- Read forum and group questions.\n- Check the headings of top-ranking pages.\n- Use your own customer questions from research.` },
          { title: 'Judging a keyword', body: `Ask: is it relevant to what I offer? Is the intent one I can satisfy? Can I realistically compete, or is the first page full of huge established sites? For a new site, a specific phrase with smaller sites ranking on page one is a good sign.` },
          { title: 'Keyword tools and their limits', body: `Tools give estimated search volumes, which are rough guides rather than exact figures. Treat numbers as relative, not precise, and always combine them with your judgement about intent and relevance.` },
        ],
        keyTerms: [{ term: 'Keyword', def: 'A word or phrase people type into a search engine.' }, { term: 'Long-tail keyword', def: 'A longer, more specific phrase with lower competition.' }, { term: 'Search volume', def: 'An estimate of how often a phrase is searched.' }],
        howTo: ['Write the main topic of your business.', 'Collect 30 phrase ideas using suggestions and related searches.', 'Label the intent of each.', 'Remove irrelevant phrases.', 'For the remainder, look at who ranks and judge how competitive it is.', 'Pick five realistic target phrases.', 'Match each to a page you will create or improve.'],
        template: { title: 'Keyword list sheet', intro: 'Set these as columns.', body: `Keyword | Intent | Relevance (1-5) | Competition (low/med/high) | Page to create or improve | Priority\n\nExample:\nhow to price freelance design work | informational | 5 | medium | New guide | High` },
        example: `Instead of "marketing", a new consultant targets "social media plan for small bakery". The results are mostly small blogs, the intent is clear, and the phrase matches her service. She plans a guide and a service page.`,
        practice: `Collect at least 30 phrases, label intent, filter to five realistic targets and map each to a page.`,
        successCriteria: 'Your five targets are relevant, intent-labelled and realistic for a new site.',
        commonMistakes: 'Targeting huge, broad keywords with no chance of ranking.',
        takeaways: ['Free tools are enough to start.', 'Long-tail phrases suit new sites.', 'Judge relevance, intent and competition together.'],
        knowledgeCheck: [
          Q('Long-tail keywords are:', ['Short broad words', 'Longer, more specific phrases', 'Brand names only', 'Paid terms'], 1, 'They are specific and usually less competitive.'),
          Q('Search volume numbers are best treated as:', ['Exact truth', 'Rough relative guides', 'Irrelevant', 'Guaranteed traffic'], 1, 'Tool estimates are approximate.'),
          Q('Which is a free source of keyword ideas?', ['Auto-suggestions and "people also ask"', 'Only paid software', 'Guessing', 'Nothing'], 0, 'Search engines show what people ask.'),
          Q('A new site should usually target:', ['The most competitive terms', 'Specific, achievable phrases', 'Random words', 'Only brand names'], 1, 'Specific phrases give a better chance of ranking.'),
        ],
      }),

      L('dmf-m6-l4', 'On-Page SEO: Making a Page Easy to Find and Worth Clicking', 'how-to', 26, {
        objectives: ['Write a clear title tag and meta description', 'Structure a page with headings and internal links', 'Run a basic on-page SEO checklist'],
        concept: `On-page SEO means the things you control on the page itself. The most important are: a clear title that includes the main phrase and promises a benefit, headings that organise the content, content that fully answers the searcher's question, descriptive image text (alt text), and links to other relevant pages on your site (internal links).

The aim is twofold: help search engines understand what the page is about, and help people decide to click and stay.`,
        whyItMatters: `Even great content can be missed if its title is vague or its structure is confusing. Small on-page improvements are cheap and often have a quick effect.`,
        sections: [
          { title: 'Title tag and meta description', body: `The title tag is the clickable headline in search results. Put the main phrase near the start, keep it under about 60 characters so it is not cut off, and make it appealing. The meta description is the short summary beneath it. It does not directly decide rankings but influences clicks, so write a clear sentence of about 150 characters with a reason to click.` },
          { title: 'Headings, content and internal links', body: `Use one main heading (H1) that matches the topic, then subheadings (H2, H3) for sections. Answer the main question early and completely. Link to related pages on your site using descriptive words ("our guide to pricing") rather than "click here". This helps readers and spreads authority.` },
          { title: 'Images and speed', body: `Add short, descriptive alt text to images for accessibility and search. Compress images so pages load quickly, especially on mobile where many people browse.` },
        ],
        keyTerms: [{ term: 'Title tag', def: 'The clickable headline shown in search results.' }, { term: 'Meta description', def: 'The short summary beneath the title in search results.' }, { term: 'Internal link', def: 'A link from one page of your site to another.' }, { term: 'Alt text', def: 'A text description of an image.' }],
        howTo: ['Choose one page and its target phrase.', 'Write a title under 60 characters with the phrase near the start.', 'Write a meta description of about 150 characters.', 'Check the H1 and subheadings are clear.', 'Add two or three descriptive internal links.', 'Write alt text for each image.', 'Check the page loads quickly on mobile.'],
        template: { title: 'On-page SEO checklist', intro: 'Tick each item for every page.', body: `[ ] Target phrase chosen\n[ ] Title under ~60 characters, phrase near start, appealing\n[ ] Meta description ~150 characters, clear reason to click\n[ ] One H1 that matches the topic\n[ ] Subheadings organise the page\n[ ] Question answered early and completely\n[ ] 2-3 internal links with descriptive text\n[ ] Alt text on every image\n[ ] Images compressed; page fast on mobile\n[ ] Clear next step for the reader` },
        example: `Before: title "Home". After: "How to Price Freelance Design Work (Simple Formula)". The meta description says "A step-by-step pricing formula with examples and a free template." Clicks improve because the promise is clear.`,
        practice: `Choose a real page and rewrite its title, meta description and headings, add internal links and alt text, then run the checklist.`,
        successCriteria: 'Your new title and description are clear and appealing and every checklist item is addressed.',
        commonMistakes: 'Stuffing the same keyword repeatedly instead of writing naturally and helpfully.',
        takeaways: ['Clear titles and descriptions earn clicks.', 'Headings and internal links help people and search engines.', 'Write for humans first.'],
        knowledgeCheck: [
          Q('A title tag should usually:', ['Be extremely long', 'Include the main phrase and promise a benefit', 'Be left blank', 'Repeat the keyword ten times'], 1, 'Clear, appealing titles improve clicks.'),
          Q('Internal links should use:', ['"Click here"', 'Descriptive words', 'No words', 'Random text'], 1, 'Descriptive link text helps readers and search engines.'),
          Q('Alt text is for:', ['Decoration', 'Describing images for accessibility and search', 'Hiding content', 'Paying for ads'], 1, 'It helps screen readers and image understanding.'),
          Q('Keyword stuffing is:', ['Recommended', 'Repeating a phrase unnaturally and should be avoided', 'Required', 'Always safe'], 1, 'It harms readability and can hurt performance.'),
        ],
      }),

      A('dmf-m6-a', [
        Q('The correct order of search engine steps is:', ['Rank, crawl, index', 'Crawl, index, rank', 'Index, rank, crawl', 'Rank, index, crawl'], 1, 'Pages are discovered, stored and then ordered.'),
        Q('Search engines mainly want to show:', ['The longest page', 'The most helpful, relevant result', 'The paid page only', 'The oldest page'], 1, 'Satisfying the searcher is the goal.'),
        Q('"Best laptop for students" is mostly which intent?', ['Navigational', 'Commercial investigation', 'Transactional', 'None'], 1, '"Best" signals comparison.'),
        Q('A "buy now" search is mostly:', ['Informational', 'Transactional', 'Navigational', 'Random'], 1, 'The searcher is ready to buy.'),
        Q('Why do new sites target long-tail keywords?', ['They are banned from others', 'Less competition and clearer intent', 'They cost more', 'They have no intent'], 1, 'Specific phrases are easier to rank for.'),
        Q('Search volume figures from tools are:', ['Exact', 'Rough estimates', 'Guaranteed', 'Irrelevant'], 1, 'Treat them as relative guides.'),
        Q('A good title tag:', ['Is blank', 'Includes the main phrase and promises a benefit', 'Repeats keywords', 'Is very long'], 1, 'Clarity earns clicks.'),
        Q('Internal links help by:', ['Hiding pages', 'Guiding readers and spreading authority', 'Slowing the site', 'Replacing content'], 1, 'They connect related pages.'),
        Q('Which statement about SEO is true?', ['It guarantees page one in a week', 'It is slow but compounds', 'It needs no content', 'It is only for big sites'], 1, 'It is a long-term channel.'),
        Q('Keyword stuffing:', ['Is best practice', 'Should be avoided', 'Is required', 'Guarantees ranking'], 1, 'Write naturally for people.'),
      ]),
    ],
  },

  /* ---------------- MODULE 7 ---------------- */
  {
    id: 'dmf-m7', title: 'Email Marketing Basics',
    objective: 'Understand email as an owned marketing channel and write a basic effective email.',
    lessons: [
      L('dmf-m7-l1', 'Why Email Is an "Owned" Channel', 'concept', 22, {
        objectives: ['Explain why an email list is more durable than a social following', 'Describe permission-based marketing', 'Name the main parts of a simple email system'],
        concept: `An email list is a group of people who have given you permission to contact them directly. Unlike social media, no algorithm decides whether your message is shown: it lands in the inbox. That makes email one of the most reliable ways to sell, retain customers and build a long-term relationship.

The key idea is permission. People join because they want what you offer, often in exchange for a free resource. Sending only to people who asked is both more ethical and more effective than blasting strangers.`,
        whyItMatters: `Platforms change rules and reach without warning. A list you own travels with you. For many small businesses, email produces a large share of sales precisely because subscribers have already shown interest.`,
        sections: [
          { title: 'The basic email system', body: `Four parts: a signup form or landing page, a lead magnet that gives people a reason to join, an email tool to store contacts and send messages, and a sequence of emails that welcomes and guides new subscribers. Many tools have free tiers that are enough to start.` },
          { title: 'Permission and trust', body: `Only email people who opted in. Tell them what to expect and how often. Always include an easy unsubscribe link. A smaller engaged list is worth more than a large unengaged one.` },
        ],
        keyTerms: [{ term: 'Email list', def: 'People who gave permission to receive your emails.' }, { term: 'Opt-in', def: 'An action where someone agrees to join your list.' }, { term: 'Email service provider (ESP)', def: 'A tool used to store contacts and send emails.' }],
        howTo: ['Choose a free email tool.', 'Write what subscribers will receive and how often.', 'Create a simple signup form.', 'Decide on a lead magnet idea.', 'Place the form where your audience will see it.', 'Write the sentence that tells people what they get by joining.'],
        example: `A freelance planner offers a free weekly planning template in exchange for an email. New subscribers get a welcome email and then a short weekly tip. When she launches a paid planner, she emails her list and makes sales without ads.`,
        practice: `Design your email system on one page: tool, form, lead magnet idea, promise, and where the form will live.`,
        successCriteria: 'Your design has all four parts and a clear promise to subscribers.',
        commonMistakes: 'Adding people without permission, or having no reason for people to join.',
        takeaways: ['Email is owned and permission-based.', 'You need a form, a lead magnet, a tool and a sequence.', 'A small engaged list beats a large cold one.'],
        knowledgeCheck: [
          Q('Email is called an owned channel because:', ['It is free', 'You control the list and can contact subscribers directly', 'Platforms run it', 'It needs no tool'], 1, 'No algorithm decides whether your message is shown.'),
          Q('Permission-based marketing means:', ['Emailing anyone', 'Emailing only people who opted in', 'Buying lists', 'Hiding unsubscribe links'], 1, 'People joined because they wanted to hear from you.'),
          Q('A lead magnet is:', ['A type of ad', 'A free resource offered in exchange for contact details', 'A competitor', 'A discount code only'], 1, 'It gives people a reason to join.'),
          Q('Which is more valuable?', ['A large unengaged list', 'A smaller engaged list', 'Neither', 'A bought list'], 1, 'Engagement drives results.'),
        ],
      }),

      L('dmf-m7-l2', 'Lead Magnets: Getting People to Subscribe', 'concept', 24, {
        objectives: ['Define what makes a good lead magnet', 'Choose a lead magnet format that fits your audience', 'Write a clear signup promise'],
        concept: `A lead magnet is a small, valuable free resource that people receive in exchange for their email address. Good ones solve one specific problem quickly, such as a checklist, template, mini-guide, short video lesson, or discount.

The best lead magnets are specific, quick to use, and closely related to what you eventually sell. "A free ebook about marketing" is vague. "A 5-day plan to get your first 10 followers who actually buy" is specific and tempting.`,
        whyItMatters: `A weak lead magnet attracts the wrong people or none at all. A strong one attracts exactly the people who are likely to buy later, and starts the relationship with a useful win.`,
        sections: [
          { title: 'What makes a lead magnet work', body: `- **Specific:** one problem, one result.\n- **Quick win:** the person gets value in minutes.\n- **Relevant:** attracts your ideal buyer, not freebie hunters.\n- **Easy to deliver:** you can create it without weeks of work.\n- **Natural next step:** leads logically to your paid offer.` },
          { title: 'Formats to consider', body: `Checklists, templates, swipe files, short email courses, quizzes, mini-guides, video tutorials, free trials or samples. Choose the format your audience will actually use. A busy audience may prefer a one-page checklist over a 40-page guide.` },
          { title: 'The signup promise', body: `Write a short promise: who it is for, what they get, and how fast. "Get the one-page checklist that helps new freelancers price their first project in 10 minutes." Place it beside the form.` },
        ],
        keyTerms: [{ term: 'Lead magnet', def: 'A free resource exchanged for an email address.' }, { term: 'Quick win', def: 'A small result the person can achieve right away.' }],
        howTo: ['List three problems your audience has that you can solve quickly.', 'Pick the one most connected to your paid offer.', 'Choose a format your audience will use.', 'Outline the content in five points.', 'Write the signup promise.', 'Plan where to place the form.'],
        template: { title: 'Lead magnet planner', intro: 'Fill in each line.', body: `Audience: \nProblem: \nQuick win they get: \nFormat: \nTitle: \nSignup promise (who, what, how fast): \nHow it connects to my paid offer: \nWhere I will place the form: ` },
        example: `A makeup artist offers "The 10-minute bridal skin prep checklist". It is specific, quick, and leads naturally to her bridal packages.`,
        practice: `Design one lead magnet with title, format, five-point outline and signup promise.`,
        successCriteria: 'Your lead magnet is specific, quick to use, and linked to a paid offer.',
        commonMistakes: 'Offering something vague or unrelated, which attracts the wrong subscribers.',
        takeaways: ['Specific beats broad.', 'A quick win builds trust.', 'Connect it to what you sell.'],
        knowledgeCheck: [
          Q('A good lead magnet is:', ['Vague and long', 'Specific and quick to use', 'Unrelated to your offer', 'Expensive'], 1, 'It solves a specific problem fast.'),
          Q('Which is stronger?', ['"Free marketing ebook"', '"5-day plan to get your first 10 buyers"', '"Free stuff"', '"Newsletter"'], 1, 'It is specific and promises a result.'),
          Q('Why connect the lead magnet to your paid offer?', ['It looks neat', 'It attracts likely buyers', 'It is a rule', 'It saves money'], 1, 'Relevant freebies attract relevant people.'),
          Q('A signup promise should state:', ['Nothing', 'Who it is for, what they get and how fast', 'Your life story', 'Just a logo'], 1, 'A clear promise improves signups.'),
        ],
      }),

      L('dmf-m7-l3', 'Writing a Basic Welcome Email', 'how-to', 26, {
        objectives: ['Write a clear subject line', 'Structure a short welcome email', 'Set expectations and invite one action'],
        concept: `The welcome email is the most-read email you will send, because new subscribers are most interested right after joining. It should deliver the promised resource, introduce you briefly, set expectations about what and when you will send, and invite one simple action such as replying with a question.

Keep it short, warm and clear. One purpose, one call to action. Write as if you are writing to one person.`,
        whyItMatters: `A good welcome email builds trust and engagement from the start and trains subscribers to open your emails. A poor or missing one wastes the moment of highest interest.`,
        sections: [
          { title: 'Subject lines that get opened', body: `Be clear and specific. "Your checklist is here" is better than a clever line nobody understands. Keep it short, avoid ALL CAPS and misleading promises. Test two options over time.` },
          { title: 'The structure', body: `1) Thank them and deliver the resource right away. 2) Introduce yourself in two or three sentences. 3) Say what they will receive and how often. 4) Ask one easy question or invite one action. 5) Sign off warmly.` },
        ],
        keyTerms: [{ term: 'Subject line', def: 'The headline of an email shown in the inbox.' }, { term: 'Call to action', def: 'The one thing you invite the reader to do.' }],
        howTo: ['Write three subject line options and choose the clearest.', 'Open by thanking them and linking the resource.', 'Add a two-sentence introduction.', 'State what you will send and how often.', 'Add one easy question or action.', 'Read it aloud and cut anything unnecessary.', 'Send a test to yourself and check the link works.'],
        template: { title: 'Welcome email template', intro: 'Personalise every bracket.', body: `Subject: Your [resource name] is here\n\nHi [first name],\n\nThank you for joining! Here is your [resource name]: [link]\n\nI'm [name], and I help [audience] [outcome]. I created this because [short reason].\n\nEach [day], I'll send you [what and how often].\n\nOne quick question: what is your biggest challenge with [topic] right now? Just hit reply. I read every message.\n\n[Warm sign-off],\n[Name]` },
        example: `A planner creator's welcome email delivers the checklist, introduces herself in two lines, promises a weekly Friday tip, and asks "What are you planning for next month?" Replies tell her what to create next.`,
        practice: `Write a complete welcome email with three subject options, using the structure. Test the link and read it aloud.`,
        successCriteria: 'Your email delivers the resource, introduces you, sets expectations and invites one action.',
        commonMistakes: 'Writing a long email with several different asks, or forgetting to deliver the promised resource.',
        takeaways: ['Welcome emails get the highest attention.', 'Deliver, introduce, set expectations, invite one action.', 'Clarity beats cleverness.'],
        knowledgeCheck: [
          Q('A welcome email should:', ['Include many different asks', 'Deliver the resource and invite one action', 'Be very long', 'Avoid introducing you'], 1, 'One purpose and one call to action keep it clear.'),
          Q('A good subject line is:', ['Clear and specific', 'Misleading', 'All capitals', 'Blank'], 0, 'Clarity builds trust and opens.'),
          Q('Why is the welcome email important?', ['Subscribers are most interested right after joining', 'It is legally required', 'It is the only email', 'It avoids sending others'], 0, 'Attention is highest at that moment.'),
          Q('Setting expectations means:', ['Hiding frequency', 'Telling subscribers what and how often you will send', 'Sending daily without notice', 'Avoiding promises'], 1, 'Clear expectations reduce unsubscribes.'),
        ],
      }),

      L('dmf-m7-l4', 'Deliverability, Compliance and Email Metrics', 'concept', 24, {
        objectives: ['Explain what affects whether emails reach the inbox', 'Describe basic legal obligations for email marketing', 'Read open rate, click rate and unsubscribe rate sensibly'],
        concept: `Sending an email does not guarantee it reaches the inbox. Deliverability is how likely your messages are to arrive there rather than in spam. It depends on sender reputation, whether people open and engage, whether they mark you as spam, and technical setup done by your email tool.

Email is also regulated. Laws differ by country, but common requirements include getting consent, identifying who you are, including a working unsubscribe option, and honouring unsubscribes promptly. Examples include the CAN-SPAM Act in the United States, GDPR in Europe, and Nigeria's Data Protection Act. This is general information, not legal advice; check the rules that apply to your audience.`,
        whyItMatters: `Ignoring compliance risks fines, complaints and a damaged reputation. Ignoring deliverability means your best work sits unseen in spam. Good habits protect both.`,
        sections: [
          { title: 'Habits that protect deliverability', body: `- Email only people who opted in.\n- Make unsubscribing easy.\n- Send consistently and set expectations.\n- Remove people who never engage after a long period.\n- Avoid spammy tricks like misleading subjects.\n- Use a reputable email tool and follow its setup guidance.` },
          { title: 'Reading email metrics', body: `Open rate: the share who opened. Click rate: the share who clicked a link. Unsubscribe rate: the share who left. Treat benchmarks as rough guides because they vary widely by industry and audience. Also note that privacy features on some devices can inflate open rates, so click rates and replies are often more reliable signals of real interest.` },
        ],
        keyTerms: [{ term: 'Deliverability', def: 'How likely your emails are to reach the inbox.' }, { term: 'Open rate', def: 'The share of recipients who opened an email.' }, { term: 'Click rate', def: 'The share of recipients who clicked a link.' }],
        howTo: ['Check your signup form clearly states what people get.', 'Confirm every email has a working unsubscribe link.', 'Add your business identity and contact details as required where you operate.', 'Record baseline open, click and unsubscribe rates after three sends.', 'Note which email had the highest clicks.', 'Decide one change to test next.'],
        example: `A shop sends three emails. Email two has the best click rate because it features a clear single link to a popular product. She tests a similar single-link structure in the next email.`,
        practice: `Write a short compliance and deliverability checklist for your list and describe how you would read three metrics after a send.`,
        successCriteria: 'Your checklist covers consent, unsubscribe and identity, and your metric plan treats open rates cautiously.',
        commonMistakes: 'Treating open rate as the only measure of success, or ignoring unsubscribe and consent rules.',
        takeaways: ['Deliverability depends on permission, engagement and good habits.', 'Check the rules that apply to your audience.', 'Clicks and replies are often more reliable than opens.'],
        knowledgeCheck: [
          Q('Deliverability is:', ['The speed of typing', 'How likely emails are to reach the inbox', 'A discount', 'A subject line type'], 1, 'It determines whether messages land in the inbox or spam.'),
          Q('Which habit helps deliverability?', ['Buying lists', 'Emailing only people who opted in', 'Hiding unsubscribe', 'Misleading subjects'], 1, 'Permission-based sending protects reputation.'),
          Q('Why can open rates mislead?', ['They are always exact', 'Privacy features can inflate them', 'They are illegal', 'They are secret'], 1, 'Clicks and replies show more reliable interest.'),
          Q('A working unsubscribe link is:', ['Optional everywhere', 'A common legal and trust requirement', 'Harmful', 'Banned'], 1, 'Most regions require an easy way to opt out.'),
        ],
      }),

      A('dmf-m7-a', [
        Q('Email is an owned channel because:', ['It is free', 'You control the list and contact people directly', 'Platforms decide reach', 'It needs no tool'], 1, 'No algorithm decides whether it is shown.'),
        Q('Permission-based marketing means:', ['Emailing anyone', 'Emailing only people who opted in', 'Buying lists', 'Hiding unsubscribes'], 1, 'People joined because they wanted to.'),
        Q('A good lead magnet is:', ['Vague and long', 'Specific with a quick win', 'Unrelated to your offer', 'Expensive'], 1, 'It solves one problem quickly.'),
        Q('Which is the stronger lead magnet title?', ['Free ebook', '5-day plan to get your first 10 paying clients', 'Newsletter', 'Free stuff'], 1, 'It is specific and promises a result.'),
        Q('A welcome email should:', ['Include many asks', 'Deliver the resource and invite one action', 'Be extremely long', 'Hide who you are'], 1, 'One purpose keeps it clear.'),
        Q('Why is the welcome email important?', ['Interest is highest right after joining', 'It is the only email', 'It is required by tools', 'It replaces others'], 0, 'Attention peaks at signup.'),
        Q('Deliverability means:', ['Typing speed', 'Likelihood of reaching the inbox', 'A discount', 'Design quality'], 1, 'Spam folders are the risk.'),
        Q('Which metric is often more reliable than open rate?', ['Click rate and replies', 'Logo size', 'Font choice', 'Send time only'], 0, 'Opens can be inflated by privacy features.'),
        Q('A working unsubscribe link is:', ['Banned', 'A common legal and trust requirement', 'Harmful', 'Optional everywhere'], 1, 'Most regions require it.'),
        Q('A smaller engaged list is:', ['Worthless', 'Often more valuable than a large cold list', 'Illegal', 'Impossible'], 1, 'Engagement drives results.'),
      ]),
    ],
  },

  /* ---------------- MODULE 8 ---------------- */
  {
    id: 'dmf-m8', title: 'Paid Advertising Fundamentals',
    objective: 'Understand the basics of how paid advertising works and how to think about budget and targeting as a beginner.',
    lessons: [
      L('dmf-m8-l1', 'How Paid Ads Actually Work', 'concept', 24, {
        objectives: ['Explain how ad platforms charge and decide what to show', 'Describe the main ad objectives', 'Understand why testing is essential'],
        concept: `Ad platforms run auctions. Advertisers bid or set budgets to reach chosen audiences, and the platform decides which ad to show based on how much you are willing to pay and how relevant and engaging the platform expects your ad to be. A relevant, engaging ad can win attention at a lower cost than a poor one.

Common pricing models: pay per click (CPC), pay per thousand impressions (CPM), or pay per result such as a lead or a purchase. Platforms also ask you to choose an objective such as awareness, traffic, leads or sales. The objective tells the platform what outcome to optimise for.`,
        whyItMatters: `Beginners often lose money by choosing the wrong objective or launching without testing. Understanding the basics helps you spend small amounts to learn, rather than large amounts to guess.`,
        sections: [
          { title: 'The parts of an ad campaign', body: `Most platforms organise ads in layers: a campaign (the objective), ad sets or groups (audience, budget, placement) and ads (creative: image or video, text, link). Change one thing at a time so you can tell what made a difference.` },
          { title: 'Matching objective to stage', body: `Awareness objectives suit top-of-funnel reach. Traffic and engagement suit consideration. Lead and sales objectives suit conversion, but they work best when the platform has enough conversion data and you have a good offer and page. Do not use a sales objective with nothing for people to buy.` },
          { title: 'Ads amplify, they do not fix', body: `Ads multiply what you already have. A strong offer and clear page become more profitable. A confusing offer simply loses money faster. Fix the basics first.` },
        ],
        keyTerms: [{ term: 'CPC', def: 'Cost per click.' }, { term: 'CPM', def: 'Cost per thousand impressions.' }, { term: 'Objective', def: 'The outcome the platform optimises your ads for.' }, { term: 'Creative', def: 'The image, video and text of an ad.' }],
        howTo: ['Choose a single goal for one test campaign.', 'Select the matching objective.', 'Check the landing page has one clear action.', 'Create two versions of one element only (for example the image).', 'Set a small daily budget and a test length.', 'Write what result will count as success before you start.'],
        example: `A course creator wants email signups. She picks a lead objective, sends traffic to a simple signup page, and tests two images with the same text. After a week, she compares cost per signup and keeps the cheaper one.`,
        practice: `Design a test campaign on paper: goal, objective, audience, budget, two creative versions and a success measure.`,
        successCriteria: 'Your plan tests one variable and defines success before spending.',
        commonMistakes: 'Using a sales objective with a weak page, and changing many things at once.',
        takeaways: ['Ads run on auctions; relevance and engagement can lower cost.', 'Choose the objective that matches your goal.', 'Ads amplify what you already have; fix the basics first.'],
        knowledgeCheck: [
          Q('CPC stands for:', ['Cost per click', 'Cost per campaign', 'Click per cost', 'Content per channel'], 0, 'It is the price paid each time someone clicks.'),
          Q('Ads mainly:', ['Fix a weak offer', 'Amplify what you already have', 'Replace strategy', 'Guarantee sales'], 1, 'A weak offer just loses money faster.'),
          Q('Why change only one element per test?', ['It is cheaper', 'You can tell what caused the difference', 'Platforms require it', 'It is faster'], 1, 'Single-variable tests give clear learning.'),
          Q('An objective tells the platform:', ['Your name', 'What outcome to optimise for', 'Your colour palette', 'Nothing'], 1, 'It steers delivery toward your goal.'),
        ],
      }),

      L('dmf-m8-l2', 'Setting a Realistic Beginner Ad Budget', 'concept', 22, {
        objectives: ['Set a test budget you can afford to lose', 'Calculate a break-even cost per sale', 'Know when to stop, adjust or scale'],
        concept: `Your first ad budget is a learning budget. Treat it as the price of finding out what works, and only spend money you can afford to lose. A small daily budget over several days often teaches more than a large one-off burst.

Before spending, know your numbers: how much profit do you make per sale? That tells you the most you can pay to get a customer and still break even.`,
        whyItMatters: `Many beginners spend their savings hoping ads will rescue a weak offer. Setting a limit and knowing your break-even point protects you and helps you decide objectively.`,
        sections: [
          { title: 'Break-even maths', body: `Break-even cost per sale = profit per sale before ad costs. If a product sells for 20,000 and your costs are 12,000, profit is 8,000, so you can pay up to 8,000 per sale to break even. Paying less is profit; paying more is a loss unless repeat purchases make up for it. Use your own currency and real costs.` },
          { title: 'A simple test plan', body: `Choose a small daily budget, a test period (such as 5 to 7 days), and one clear success measure. Do not judge after one day: results fluctuate. At the end, decide: stop, adjust one thing, or continue and slowly increase. Increase gradually rather than doubling suddenly.` },
          { title: 'Know your limits', body: `Set a maximum total for the test and stick to it. Never use money needed for rent, food or business essentials. If the test does not hit your measure, treat what you learned as the return on the budget.` },
        ],
        keyTerms: [{ term: 'Break-even', def: 'The point where income equals cost.' }, { term: 'Profit per sale', def: 'Selling price minus the costs of making and delivering it.' }, { term: 'Scaling', def: 'Gradually increasing spend on something that works.' }],
        howTo: ['Write the selling price and all costs per sale.', 'Calculate profit per sale.', 'Set the most you will spend on the test in total.', 'Divide it into a daily budget over 5 to 7 days.', 'Define the success measure.', 'Write your decision rules: stop, adjust, or scale.'],
        template: { title: 'Ad test budget sheet', intro: 'Fill in with your own numbers.', body: `Selling price: \nCosts per sale: \nProfit per sale (break-even cost per sale): \nMaximum total test budget (money I can afford to lose): \nTest length (days): \nDaily budget: \nSuccess measure: \nIf result is better than target: \nIf result is close: \nIf result is worse: ` },
        example: `A seller earns 8,000 profit per sale and sets a test of 35,000 over 7 days (5,000 a day). Success: cost per sale under 8,000. After the test her cost per sale is 6,500 so she increases the budget slowly while watching the number.`,
        practice: `Complete the budget sheet for a real or imagined product, including break-even and decision rules.`,
        successCriteria: 'Your budget has a limit, a break-even number and clear decision rules.',
        commonMistakes: 'Spending money you cannot afford to lose, or judging results after one day.',
        takeaways: ['Your first budget is a learning budget.', 'Know your break-even cost per sale.', 'Decide rules before you spend.'],
        knowledgeCheck: [
          Q('Break-even cost per sale equals:', ['Selling price', 'Profit per sale before ad costs', 'Number of followers', 'Total budget'], 1, 'It is the most you can pay per sale without losing money.'),
          Q('A first ad budget should be:', ['Rent money', 'Money you can afford to lose', 'Borrowed money', 'Unlimited'], 1, 'It is a learning budget.'),
          Q('Why not judge a test after one day?', ['Results fluctuate', 'It is illegal', 'Ads need a year', 'Platforms forbid it'], 0, 'Short windows are noisy.'),
          Q('Scaling should be:', ['Sudden and huge', 'Gradual while watching results', 'Random', 'Avoided forever'], 1, 'Sudden jumps can disrupt delivery and costs.'),
        ],
      }),

      L('dmf-m8-l3', 'Targeting Basics', 'concept', 22, {
        objectives: ['Describe the main targeting options', 'Choose a starting audience from your persona', 'Avoid targeting too broadly or too narrowly'],
        concept: `Targeting is choosing who sees your ads. Common options include location, age range, interests and behaviours (on social platforms), search keywords (on search platforms), custom audiences (such as your own email list or website visitors) and lookalike audiences (people similar to your best customers).

Your persona research tells you where to start. Targeting should reflect the real situation and interests of your customer, not just broad demographics.`,
        whyItMatters: `Good targeting means your budget reaches people likely to care. Too broad wastes money; too narrow can make delivery expensive or impossible. A thoughtful start plus testing finds the balance.`,
        sections: [
          { title: 'Cold, warm and hot audiences', body: `Cold audiences do not know you; use awareness content. Warm audiences have engaged, such as video viewers or website visitors; show them proof and offers. Hot audiences are subscribers or past customers; ask them to buy or return. Match message to temperature.` },
          { title: 'Respect privacy and platform rules', body: `Platforms restrict some targeting, especially around sensitive topics, and privacy laws limit how data can be used. Follow each platform's advertising policies and be honest in your ads.` },
        ],
        keyTerms: [{ term: 'Custom audience', def: 'A group built from your own contacts or visitors.' }, { term: 'Lookalike audience', def: 'People similar to an existing group of customers.' }, { term: 'Retargeting', def: 'Showing ads to people who already engaged with you.' }],
        howTo: ['Write your persona\'s location, interests and situation.', 'Choose two or three targeting options that match.', 'Decide the audience temperature and matching message.', 'Create one cold and one warm audience idea.', 'Check platform policies for your category.', 'Plan to compare results between audiences.'],
        example: `A fitness coach targets women in her city interested in home workouts (cold) with a free starter plan ad, and shows people who watched her videos (warm) a testimonial ad with a programme offer.`,
        practice: `Design two audiences (one cold, one warm) with messages matched to each temperature.`,
        successCriteria: 'Your audiences reflect your persona and your messages differ by temperature.',
        commonMistakes: 'Targeting everyone, or showing sales messages to cold audiences.',
        takeaways: ['Start from your persona.', 'Match message to audience temperature.', 'Follow platform policies and privacy rules.'],
        knowledgeCheck: [
          Q('Retargeting means:', ['Targeting strangers only', 'Showing ads to people who already engaged with you', 'Deleting ads', 'Changing platforms'], 1, 'It focuses on warm audiences.'),
          Q('A cold audience should usually see:', ['A hard sell', 'Value-led awareness content', 'Nothing', 'Only discounts'], 1, 'They do not know you yet.'),
          Q('A lookalike audience is:', ['Your competitors', 'People similar to your best customers', 'A random group', 'Your followers only'], 1, 'Platforms find similar people.'),
          Q('Targeting should start from:', ['Guesswork', 'Your persona research', 'Competitor budgets', 'Your mood'], 1, 'Research guides sensible starting points.'),
        ],
      }),

      L('dmf-m8-l4', 'Writing and Testing a Simple Ad', 'how-to', 26, {
        objectives: ['Write an ad with a hook, benefit and call to action', 'Choose creative that stops the scroll honestly', 'Plan a simple two-version test'],
        concept: `A good ad does three things quickly: it stops the right person (hook), tells them what is in it for them (benefit), and says what to do next (call to action). Visuals matter, but the message to the right person matters most.

Testing is how you improve. Run two versions that differ in one way (headline, image or offer), give them a fair chance, and keep the better one. Small improvements compound.`,
        whyItMatters: `Most ads fail because they are vague or speak to everybody. A clear, specific ad aimed at one persona typically costs less per result.`,
        sections: [
          { title: 'Ad anatomy', body: `- **Hook:** names the person or problem in the first line or second of video.\n- **Benefit:** the result they get, not just the features.\n- **Proof:** a testimonial, number or demonstration if you have it.\n- **Call to action:** one clear next step.\n- **Destination:** a page that matches the promise of the ad.` },
          { title: 'Message match', body: `The landing page should repeat the promise made in the ad, using the same words and look. A mismatch makes people leave. Keep the page focused on one action.` },
          { title: 'Honesty rules', body: `Do not exaggerate results or make claims you cannot support. Platforms and consumer protection laws restrict misleading advertising, and honesty protects your reputation.` },
        ],
        keyTerms: [{ term: 'Hook', def: 'The opening that stops the right person.' }, { term: 'Message match', def: 'Consistency between an ad and the page it leads to.' }, { term: 'A/B test', def: 'Comparing two versions that differ in one way.' }],
        howTo: ['Write the persona and the one problem the ad addresses.', 'Draft three hooks and pick one.', 'Write the benefit and a proof line.', 'Add one call to action.', 'Check the landing page matches the promise.', 'Create a second version changing one element only.', 'Define how long and how you will compare.'],
        template: { title: 'Simple ad template', intro: 'Write two versions changing only one element.', body: `HOOK (names the person or problem):\n\nBENEFIT (the result):\n\nPROOF (testimonial, number, demo):\n\nCALL TO ACTION (one step):\n\nLANDING PAGE MATCHES? yes / no\n\nVERSION B - the one thing I changed: ` },
        example: `Version A hook: "New freelancers: stop undercharging." Version B hook: "I charged too little for two years." Same text and image otherwise. After a week, B has a cheaper cost per signup, so it becomes the new baseline.`,
        practice: `Write two versions of a short ad using the template and describe how you would compare them.`,
        successCriteria: 'Your versions differ by one element and your ad has a hook, benefit, proof and call to action.',
        commonMistakes: 'Making vague ads, or changing everything between versions so you cannot learn.',
        takeaways: ['Hook, benefit, proof, call to action.', 'Match the page to the ad promise.', 'Test one change at a time and stay honest.'],
        knowledgeCheck: [
          Q('Message match means:', ['The ad and page are consistent', 'Using the same emojis', 'Matching your competitor', 'A discount'], 0, 'Consistency reduces drop-off.'),
          Q('An A/B test changes:', ['Everything', 'One element at a time', 'Nothing', 'The platform'], 1, 'One change reveals what made the difference.'),
          Q('A strong hook:', ['Names the person or problem', 'Starts with "Hello"', 'Is hidden', 'Is long'], 0, 'It stops the right person.'),
          Q('Exaggerating results in an ad is:', ['Smart', 'Risky and potentially against rules and laws', 'Required', 'Harmless'], 1, 'Misleading ads harm trust and may be prohibited.'),
        ],
      }),

      A('dmf-m8-a', [
        Q('Ad platforms decide which ad to show using:', ['Only the highest bid', 'An auction considering bids and expected relevance', 'Random choice', 'Alphabetical order'], 1, 'Relevant, engaging ads can win at lower cost.'),
        Q('CPC stands for:', ['Cost per click', 'Cost per campaign', 'Click per cost', 'Cost per channel'], 0, 'It is the price per click.'),
        Q('Ads mainly:', ['Fix a weak offer', 'Amplify what already exists', 'Replace strategy', 'Guarantee sales'], 1, 'Weak offers simply lose money faster.'),
        Q('Break-even cost per sale equals:', ['Selling price', 'Profit per sale before ad costs', 'Followers', 'Total budget'], 1, 'It is the most you can pay without losing money.'),
        Q('A first ad budget should be:', ['Rent money', 'Money you can afford to lose', 'Borrowed', 'Unlimited'], 1, 'It is a learning budget.'),
        Q('Why not judge a test after one day?', ['Results fluctuate', 'It is illegal', 'Ads need a year', 'Platforms forbid it'], 0, 'Short windows are noisy.'),
        Q('Retargeting means:', ['Showing ads to strangers only', 'Showing ads to people who already engaged', 'Removing ads', 'Changing prices'], 1, 'It targets warm audiences.'),
        Q('A cold audience should usually see:', ['A hard sell', 'Value-led awareness content', 'Nothing', 'Only discounts'], 1, 'They do not know you yet.'),
        Q('An A/B test changes:', ['Everything', 'One element at a time', 'Nothing', 'Platforms'], 1, 'One change gives clear learning.'),
        Q('Message match means:', ['Ad and landing page are consistent', 'Using the same emoji', 'Copying competitors', 'A discount'], 0, 'Consistency reduces drop-off.'),
      ]),
    ],
  },

  /* ---------------- MODULE 9 ---------------- */
  {
    id: 'dmf-m9', title: 'Analytics, Metrics & Optimization',
    objective: 'Read basic marketing metrics and use them to improve campaigns, instead of guessing what\u2019s working.',
    lessons: [
      L('dmf-m9-l1', 'The Core Metrics That Matter', 'concept', 24, {
        objectives: ['Name the core metrics for each funnel stage', 'Calculate conversion rate and cost per acquisition', 'Separate useful metrics from vanity metrics'],
        concept: `Metrics are numbers that tell you what is happening. The trick is picking the few that connect to your goal. Reach and impressions show how many people saw you. Engagement shows whether they cared. Click-through rate (CTR) shows how many clicked. Conversion rate shows how many took the action you wanted. Cost per acquisition (CPA) shows what each customer or lead cost. Revenue and return on ad spend (ROAS) show whether marketing paid off.

Metrics are most useful in pairs and over time. A single number means little. Comparing it to last week, to another channel or to your target gives it meaning.`,
        whyItMatters: `High reach with low conversion points to a problem after the view, such as message, offer or page. Low reach points to a visibility problem. The right metric tells you which problem you actually have so you fix the right thing.`,
        sections: [
          { title: 'Key formulas', body: `- **CTR** = clicks divided by impressions.\n- **Conversion rate** = conversions divided by visitors (or clicks).\n- **CPA** = total spend divided by number of conversions.\n- **ROAS** = revenue from ads divided by ad spend.\nExample: 2,000 visitors, 60 signups: conversion rate 3%. Spend 30,000 for 60 signups: CPA 500.` },
          { title: 'Metrics by funnel stage', body: `Awareness: reach, impressions, video views. Consideration: clicks, time on page, saves, replies. Conversion: conversion rate, CPA, sales. Retention: repeat purchase rate, unsubscribe rate, referrals. Choose one primary metric per stage.` },
          { title: 'Beware vanity and noise', body: `Large numbers feel good but may not matter. Small samples are noisy: 3 sales out of 20 visitors tells you little. Wait for enough data before reacting, and look at trends rather than single days.` },
        ],
        keyTerms: [{ term: 'CTR', def: 'Click-through rate: clicks divided by impressions.' }, { term: 'Conversion rate', def: 'The share of people who take the desired action.' }, { term: 'CPA', def: 'Cost per acquisition: spend divided by conversions.' }, { term: 'ROAS', def: 'Return on ad spend: revenue divided by ad spend.' }],
        howTo: ['Choose the goal you set earlier.', 'List one primary metric for each funnel stage.', 'Write the formula for any calculated metric.', 'Compute the metrics for a sample set of numbers.', 'Note which number points to the biggest problem.', 'Write one question each number answers.'],
        example: `A page gets 1,000 visitors and 20 signups: conversion rate 2%. After rewriting the headline, it gets 1,000 visitors and 35 signups: 3.5%. The change made a measurable difference.`,
        practice: `Given: 5,000 impressions, 150 clicks, 6 sales, 12,000 spent, 60,000 revenue. Calculate CTR, conversion rate (clicks to sales), CPA and ROAS, and say where the biggest problem seems to be.`,
        stretch: `Find one real set of numbers from your own page or a friend's and repeat the calculations.`,
        successCriteria: 'Your four calculations are correct (CTR 3%, conversion 4%, CPA 2,000, ROAS 5) and your diagnosis is justified.',
        commonMistakes: 'Judging performance by reach alone, or reacting to tiny samples.',
        takeaways: ['Choose a few metrics tied to your goal.', 'Know the formulas for CTR, conversion rate, CPA and ROAS.', 'Look at trends and wait for enough data.'],
        knowledgeCheck: [
          Q('CTR is:', ['Clicks divided by impressions', 'Cost divided by revenue', 'Sales divided by reach', 'Followers divided by posts'], 0, 'It shows what share of viewers clicked.'),
          Q('If 2,000 visitors produce 60 signups, the conversion rate is:', ['3%', '30%', '0.3%', '6%'], 0, '60 divided by 2,000 equals 0.03, or 3%.'),
          Q('CPA equals:', ['Spend divided by conversions', 'Revenue divided by spend', 'Clicks divided by views', 'Sales divided by days'], 0, 'It shows what each acquisition cost.'),
          Q('High reach and low conversion mainly points to a problem with:', ['Reach itself', 'What happens after the view: message, offer or page', 'Nothing', 'The audience being too large'], 1, 'People saw you but did not act.'),
        ],
      }),

      L('dmf-m9-l2', 'Reading Google Analytics / GA4 Basics', 'how-to', 28, {
        objectives: ['Find traffic sources and top pages in Google Analytics', 'Understand sessions, engagement and key events', 'Answer three practical questions with the data'],
        concept: `Google Analytics (GA4) is a free tool that shows how people find and use your website. It reports users and sessions (visits), where visitors come from (traffic sources such as search, social, email, direct), which pages they view, how engaged they are, and which important actions they take, called key events (called conversions in older versions and some reports).

You do not need to master every report. For beginners, three questions cover most needs: where are visitors coming from, which pages perform best, and are visitors taking the actions I care about?`,
        whyItMatters: `Without analytics you are guessing which channel brings visitors and which pages persuade them. With it you can double down on what works and fix what does not. Menu names and layouts change over time, so use the current interface and Google's help pages alongside this lesson.`,
        sections: [
          { title: 'The three beginner questions', body: `1) Where do visitors come from? Look at traffic acquisition reports by source or channel. 2) Which pages do people view? Look at pages and screens by views and engagement. 3) Are they taking key actions? Mark actions such as signups or purchases as key events and check how often they happen and from which sources.` },
          { title: 'Setting up properly', body: `Install the GA4 tag on your site (or add it through your website builder), confirm data is arriving, and mark your most important action as a key event. Respect privacy laws: tell visitors you use analytics and follow cookie or consent rules that apply to your audience.` },
          { title: 'Tracking campaigns with UTM tags', body: `UTM tags are short pieces of text added to links so analytics knows which campaign a visit came from, such as a source (instagram), medium (social) and campaign name (spring-guide). Use consistent, lower-case names, and keep a simple sheet of your tags.` },
        ],
        keyTerms: [{ term: 'Session', def: 'A visit to your site.' }, { term: 'Traffic source', def: 'Where a visit came from.' }, { term: 'Key event', def: 'An important action you mark to track, such as a signup.' }, { term: 'UTM tag', def: 'Text added to a link to identify the campaign behind a visit.' }],
        howTo: ['Confirm Analytics is installed and receiving data.', 'Mark your main action as a key event.', 'Find the report showing visits by source or channel.', 'Find the top five pages by views.', 'Check how many key events occurred and from which sources.', 'Create UTM links for two campaigns.', 'Write three findings and one action.'],
        template: { title: 'UTM naming sheet', intro: 'Keep names consistent and lower-case.', body: `Link destination | utm_source | utm_medium | utm_campaign | Full tagged link\nhttps://example.com/guide | instagram | social | spring-guide | (build it)\nhttps://example.com/guide | newsletter | email | spring-guide | (build it)\n\nRule: same spelling every time (instagram, not Instagram or IG).` },
        example: `A freelancer sees most visits come from search, but most signups come from her newsletter links. She decides to feature the signup offer more prominently on her top search-visited page and keeps sending newsletter traffic to it.`,
        practice: `If you have a site, answer the three beginner questions from your data and create two UTM links. If not, use a demo or sample report and write the findings you would look for.`,
        successCriteria: 'You wrote three specific findings, one action based on them, and correct UTM links.',
        commonMistakes: 'Never checking analytics, or using inconsistent UTM spellings that split your data.',
        takeaways: ['Ask where visitors come from, what they view and what they do.', 'Mark key events so success is measurable.', 'Use consistent UTM tags.'],
        knowledgeCheck: [
          Q('A core beginner use of analytics is to see:', ['Nothing important', 'Traffic sources and top pages', 'Competitor budgets', 'Only design'], 1, 'These show where visitors come from and what they view.'),
          Q('A key event is:', ['A random click', 'An important action you mark to track', 'A kind of ad', 'A spam message'], 1, 'It lets you measure what matters.'),
          Q('Why keep UTM names consistent?', ['It looks neat', 'Inconsistent names split your data', 'It is a legal rule', 'It speeds sites'], 1, '"Instagram" and "instagram" would be counted separately.'),
          Q('Respecting privacy with analytics means:', ['Hiding it', 'Following consent and disclosure rules that apply', 'Ignoring laws', 'Never using it'], 1, 'Transparency and compliance matter.'),
        ],
      }),

      L('dmf-m9-l3', 'Turning Data Into a Change', 'concept', 24, {
        objectives: ['Use the insight, change, test pattern', 'Prioritise improvements by impact and effort', 'Run a fair test and record learning'],
        concept: `Optimization means using a specific insight to make one specific change, then checking whether it worked. The pattern is: what the data showed, what change it suggests, and what you will test next. Vague plans such as "do better next time" teach nothing.

Not every idea deserves testing now. Prioritise by likely impact and effort. A quick change to a high-traffic page often beats a big redesign of a low-traffic one.`,
        whyItMatters: `Data without action is just numbers on a screen. The value of tracking is entirely in the decisions it informs. A habit of small, recorded tests compounds into big improvements.`,
        sections: [
          { title: 'Insight, change, test', body: `Insight: "Our ad has a low click-through rate." Change: "Test a version with a person using the product instead of a plain product shot." Test: "Compare CTR over seven days with equal budgets." Write all three before acting.` },
          { title: 'Prioritising with impact and effort', body: `List ideas, score each from 1 to 5 for impact and for ease, and start with high impact, easy ideas. Keep a backlog of the rest.` },
          { title: 'Fair tests and learning logs', body: `Change one thing, run the test long enough to get meaningful data, and avoid stopping early because of one lucky day. Record each test: the idea, the result and what you learned, whether it won or lost. Losing tests still teach.` },
        ],
        keyTerms: [{ term: 'Optimization', def: 'Using data to make targeted improvements.' }, { term: 'Backlog', def: 'A list of ideas to test later.' }, { term: 'Learning log', def: 'A record of tests and what you learned.' }],
        howTo: ['Pick one metric that is below target.', 'Write the insight it suggests.', 'List three possible changes.', 'Score each by impact and ease.', 'Choose one and define the test.', 'Run it for a fair period.', 'Record the result and next step.'],
        template: { title: 'Optimization log', intro: 'One row per test.', body: `Date | Metric | Insight | Change tested | Test length | Result | What I learned | Next test\n\nExample:\n12 Mar | Ad CTR | Plain product photo gets few clicks | Lifestyle photo with a person | 7 days | CTR up | People respond to faces | Test headline` },
        example: `Data shows low CTR on an ad with a plain product photo. Change: test a lifestyle image with a person using the product. Next test: compare CTR between the two versions for seven days.`,
        practice: `Take a real or hypothetical metric problem and write the insight, three possible changes with impact/ease scores, the chosen test and how long you would run it.`,
        successCriteria: 'Your answer follows insight, change, test, with scored options and a fair test design.',
        commonMistakes: 'Looking at numbers but never translating them into a specific change, or changing many things at once.',
        takeaways: ['Insight, specific change, test.', 'Prioritise by impact and effort.', 'Record every test, including losses.'],
        knowledgeCheck: [
          Q('Good optimization follows:', ['Random guessing', 'Insight, specific change, test', 'Repeating the same thing', 'Changing everything at once'], 1, 'It turns data into learning.'),
          Q('Why prioritise by impact and effort?', ['It is a rule', 'To start with changes likely to matter and easy to do', 'To avoid testing', 'To save paper'], 1, 'High-impact easy changes pay back fastest.'),
          Q('A losing test is:', ['Useless', 'Still valuable learning', 'A mistake to hide', 'Illegal'], 1, 'Knowing what does not work saves future effort.'),
          Q('Why avoid stopping a test after one lucky day?', ['It is illegal', 'Short windows are noisy and misleading', 'Platforms forbid it', 'It costs more'], 1, 'Wait for enough data to trust the result.'),
        ],
      }),

      L('dmf-m9-l4', 'Attribution, Testing Discipline and Reporting Results', 'concept', 24, {
        objectives: ['Explain why attribution is imperfect', 'Design a basic test with a clear hypothesis', 'Write a one-page marketing report that leads to decisions'],
        concept: `Attribution is the question of which marketing activity deserves credit for a sale. In real life customers see many touchpoints: a video, a search, an email, a recommendation. No tool can perfectly assign credit, and different tools use different rules. Treat attribution as useful evidence, not absolute truth.

Good reporting turns numbers into decisions. A useful report is short: what we set out to do, what happened, why we think it happened, and what we will do next.`,
        whyItMatters: `Clients and bosses rarely want a screen of numbers. They want to know whether it is working and what to do next. Being able to explain results honestly, including uncertainty, builds credibility.`,
        sections: [
          { title: 'Why attribution is imperfect', body: `A customer might discover you on social media, search your name later, and buy after an email. A "last click" view credits the email; a "first click" view credits social media. Both are partial. Use multiple signals, such as asking customers "How did you hear about us?" on checkout or booking forms.` },
          { title: 'Writing a hypothesis', body: `A hypothesis states what you expect and why: "If we add a testimonial near the signup button, conversion rate will rise because visitors will trust us more." It makes the test clear and the learning explicit.` },
          { title: 'The one-page report', body: `Structure: goal and baseline, what we did, results (three key numbers with comparison), what we learned, and next steps. Be honest about sample size and uncertainty. Use plain words.` },
        ],
        keyTerms: [{ term: 'Attribution', def: 'Assigning credit for a result to marketing activities.' }, { term: 'Hypothesis', def: 'A testable statement of what you expect and why.' }, { term: 'Sample size', def: 'The number of observations behind a result.' }],
        howTo: ['Write a hypothesis for one change.', 'Define the metric and test length.', 'Add a "How did you hear about us?" question to a form.', 'Collect results.', 'Write the one-page report using the structure.', 'State one thing you are unsure about.', 'Write the next step.'],
        template: { title: 'One-page marketing report', intro: 'Keep it short and plain.', body: `GOAL AND BASELINE:\n\nWHAT WE DID:\n\nRESULTS (3 key numbers, with comparison to baseline or target):\n1.\n2.\n3.\n\nWHAT WE THINK HAPPENED AND WHY:\n\nWHAT WE ARE UNSURE ABOUT (sample size, other factors):\n\nNEXT STEPS (max 3):\n` },
        example: `A report says: goal 300 signups in 60 days from a baseline of 40. Result: 340 signups, a CPA of 450, with most from short videos. Unsure: some signups may have come from word of mouth. Next: make more videos like the top three, and add "How did you hear about us?" to the welcome email.`,
        practice: `Write a hypothesis and a one-page report using sample numbers, including one uncertainty and three next steps.`,
        successCriteria: 'Your report is short, compares results to a goal, admits uncertainty and ends with decisions.',
        commonMistakes: 'Presenting numbers with no interpretation, or claiming certainty about what caused a result.',
        takeaways: ['Attribution is imperfect; use several signals.', 'A hypothesis makes tests clear.', 'Reports should lead to decisions.'],
        knowledgeCheck: [
          Q('Attribution is:', ['A type of ad', 'Assigning credit for results to marketing activities', 'A hashtag', 'A discount'], 1, 'It asks which activity deserves credit.'),
          Q('Why ask "How did you hear about us?"', ['It is required', 'It adds a human signal that tools may miss', 'It slows checkout', 'It replaces analytics'], 1, 'Customers often know where they first heard of you.'),
          Q('A good hypothesis includes:', ['A guess with no reason', 'What you expect and why', 'Only a metric', 'A deadline only'], 1, 'The reason makes the learning explicit.'),
          Q('A good report:', ['Lists numbers only', 'Leads to decisions and admits uncertainty', 'Hides weak results', 'Is very long'], 1, 'Decisions and honesty build credibility.'),
        ],
      }),

      A('dmf-m9-a', [
        Q('High reach with low conversion mainly points to a problem with:', ['Reach itself', 'What happens after the view: message, offer or page', 'Nothing', 'The audience being too large'], 1, 'People saw you but did not act.'),
        Q('CTR equals:', ['Clicks divided by impressions', 'Revenue divided by spend', 'Sales divided by days', 'Followers divided by posts'], 0, 'It shows the share of viewers who clicked.'),
        Q('If 2,000 visitors give 60 signups, conversion rate is:', ['3%', '30%', '0.3%', '6%'], 0, '60 divided by 2,000 is 3%.'),
        Q('CPA equals:', ['Spend divided by conversions', 'Conversions divided by spend', 'Clicks divided by sales', 'Revenue divided by clicks'], 0, 'It shows the cost of each acquisition.'),
        Q('A core beginner use of GA4 is to see:', ['Nothing', 'Traffic sources and top pages', 'Competitor budgets', 'Only design'], 1, 'These reveal where visitors come from and what they view.'),
        Q('Why keep UTM names consistent?', ['Looks neat', 'Inconsistent names split data', 'Legal rule', 'Speeds sites'], 1, 'Spellings are counted separately.'),
        Q('Good optimization follows:', ['Random guessing', 'Insight, specific change, test', 'Repetition', 'Changing everything at once'], 1, 'It turns data into learning.'),
        Q('Why record losing tests?', ['They are useless', 'They show what does not work and save effort', 'It is required', 'To hide them'], 1, 'Knowing what fails is valuable.'),
        Q('Attribution is imperfect because:', ['Tools are illegal', 'Customers have many touchpoints and credit is hard to assign', 'Data is secret', 'Ads do not work'], 1, 'No tool assigns perfect credit.'),
        Q('A useful marketing report ends with:', ['A wall of numbers', 'Decisions and next steps', 'Excuses', 'A longer report'], 1, 'Reports exist to drive action.'),
      ]),
    ],
  },

  /* ---------------- MODULE 10 ---------------- */
  {
    id: 'dmf-m10', title: 'Campaign Planning & Final Capstone',
    objective: 'Combine strategy, audience, content, channels, and metrics into one complete campaign plan.',
    isCapstoneModule: true,
    lessons: [
      L('dmf-m10-l1', 'Assembling a Campaign Plan', 'how-to', 30, {
        objectives: ['Combine audience, goal, channels, content and measurement into one plan', 'Check every section for consistency', 'Create a realistic timeline'],
        concept: `A campaign is a focused push toward one goal, over a set period, aimed at one audience, using a defined mix of channels and content. Everything you have learned comes together here: persona, positioning, a SMART goal, channel choices, content plan, budget and measurement.

The most common failure in campaign plans is inconsistency: the audience in one section is not the audience in another, or the content does not serve the goal. Great plans read like one story from start to finish.`,
        whyItMatters: `Clients and employers pay for plans that are coherent, realistic and measurable. Being able to assemble all the parts into a clear plan is the core professional skill of a beginner marketer.`,
        sections: [
          { title: 'The eight parts of a campaign plan', body: `1) Business and campaign goal (SMART). 2) Target audience persona. 3) Positioning and core message. 4) Channels (primary and supporting) with reasons. 5) Content plan tied to funnel stages. 6) Budget and resources. 7) Timeline. 8) Measurement plan and review points.` },
          { title: 'The consistency check', body: `Read your plan and ask: does every section serve the same audience and goal? Could someone else execute it from this document? Does each channel and content piece appear for a stated reason? Fix any gaps before presenting.` },
          { title: 'Risks and assumptions', body: `Every plan rests on assumptions, such as "our audience uses this platform" or "about 3% of visitors will sign up". List the top three assumptions and how you would check them early. Honest planning builds trust.` },
        ],
        keyTerms: [{ term: 'Campaign', def: 'A focused marketing push with one goal, audience and timeframe.' }, { term: 'Assumption', def: 'Something you believe is true but have not yet verified.' }],
        howTo: ['Write the campaign goal and timeframe.', 'Summarise the persona and positioning.', 'List channels with reasons.', 'Outline the content plan by funnel stage.', 'Set the budget and resources.', 'Build a week-by-week timeline.', 'Write the measurement plan with review dates.', 'List three assumptions and how to check them.'],
        template: { title: 'Campaign plan skeleton', intro: 'Complete each section in one or two short paragraphs.', body: `1. GOAL (SMART) and timeframe:\n2. AUDIENCE (persona summary):\n3. POSITIONING and core message:\n4. CHANNELS (primary + supporting, with reasons):\n5. CONTENT PLAN (pieces by funnel stage and date):\n6. BUDGET and resources:\n7. TIMELINE (week by week):\n8. MEASUREMENT (metrics, targets, review dates):\n9. TOP 3 ASSUMPTIONS and how to check them:\n10. CONSISTENCY CHECK (same audience and goal throughout? yes/no)` },
        example: `A bakery's six-week campaign: goal 60 pre-orders for a holiday box; audience busy office workers buying gifts; channels Instagram plus WhatsApp broadcast; content three pieces per week moving from awareness to a pre-order link; budget 25,000; measurement tracks link clicks and orders by source.`,
        practice: `Assemble a complete campaign plan using the skeleton for a business of your choice and perform the consistency check.`,
        successCriteria: 'All sections exist, are consistent, and the plan could be executed by someone else.',
        commonMistakes: 'Changing the audience or goal between sections, or leaving out measurement.',
        takeaways: ['A campaign has one goal, audience and timeframe.', 'Consistency across sections is the quality test.', 'List assumptions and check them early.'],
        knowledgeCheck: [
          Q('A campaign is:', ['A random post', 'A focused push toward one goal over a set period', 'A logo', 'A budget'], 1, 'It combines audience, goal, channels and timeframe.'),
          Q('The most common campaign plan failure is:', ['Too much detail', 'Inconsistency between sections', 'Too many colours', 'Short length'], 1, 'The plan should tell one coherent story.'),
          Q('An assumption is:', ['A proven fact', 'A belief not yet verified', 'A metric', 'A budget'], 1, 'Identify and test the risky ones early.'),
          Q('A good plan can be:', ['Understood only by its author', 'Executed by someone else from the document', 'Hidden', 'Verbal only'], 1, 'Clarity makes plans usable.'),
        ],
      }),

      L('dmf-m10-l2', 'Planning Budget, Timeline and Risk', 'how-to', 26, {
        objectives: ['Build a realistic timeline with milestones', 'Allocate a small budget across activities', 'Plan for what could go wrong'],
        concept: `Plans fail when they ignore time, money and risk. A realistic timeline breaks the campaign into weeks with specific deliverables and deadlines. A budget allocates limited money across activities, including the unglamorous ones such as tools, design time and a reserve. A risk plan asks "what could go wrong, and what will we do?"

Beginners often underestimate how long content takes to create and how many revisions a client needs. Add a buffer.`,
        whyItMatters: `A plan that looks great but cannot be delivered damages trust. Realistic scheduling and a reserve protect you and your client.`,
        sections: [
          { title: 'Timeline with milestones', body: `Work backward from the launch date. Mark milestones: research complete, content created, content scheduled, launch, mid-campaign review, final report. Add a buffer of 10 to 20 percent.` },
          { title: 'Budget allocation', body: `List activities (tools, design, paid tests, collaborations, your time if charged). Assign amounts, and keep a reserve of roughly 10 percent for surprises or doubling down on what works. If you have no money budget, your budget is time; list hours per week.` },
          { title: 'Risk plan', body: `List three risks, such as low early response, a platform change or falling behind schedule, and write a response for each. For instance: "If clicks are low after week one, test a new hook and a new image."` },
        ],
        keyTerms: [{ term: 'Milestone', def: 'A checkpoint marking progress.' }, { term: 'Buffer', def: 'Extra time or money added for the unexpected.' }, { term: 'Reserve', def: 'Money held back for surprises or opportunities.' }],
        howTo: ['Set the launch date and work backward.', 'Write six milestones with dates.', 'Add a buffer.', 'List activities and costs, or hours.', 'Hold back a reserve.', 'Write three risks with responses.'],
        example: `A six-week plan: week 1 research and persona, week 2 content creation, week 3 scheduling and launch, weeks 4 and 5 run and engage with a mid review, week 6 report. Budget 25,000: 5,000 tools, 10,000 paid test, 7,500 design, 2,500 reserve. Risk: low response in week one, response: new hook test.`,
        practice: `Create a timeline with milestones, a budget or hours plan with a reserve, and three risks with responses for your campaign.`,
        successCriteria: 'Your timeline has dates and buffer, your budget has a reserve, and each risk has a response.',
        commonMistakes: 'Planning with no buffer, no reserve and no risk responses.',
        takeaways: ['Work backward from the launch date.', 'Keep a buffer and a reserve.', 'Plan responses to risks in advance.'],
        knowledgeCheck: [
          Q('A buffer is:', ['A type of ad', 'Extra time or money for the unexpected', 'A competitor', 'A metric'], 1, 'It absorbs surprises.'),
          Q('Why include a reserve?', ['It looks good', 'For surprises or doubling down on what works', 'Required by law', 'To avoid planning'], 1, 'Plans rarely go exactly as expected.'),
          Q('A milestone is:', ['A checkpoint marking progress', 'A discount', 'A hashtag', 'A report'], 0, 'Milestones keep work on track.'),
          Q('A risk plan states:', ['Only the risks', 'The risk and what you will do about it', 'Nothing', 'Excuses'], 1, 'Responses make risks manageable.'),
        ],
      }),

      L('dmf-m10-l3', 'Presenting and Pitching Your Strategy', 'how-to', 26, {
        objectives: ['Structure a short strategy presentation', 'Explain choices in plain language', 'Handle common client questions and objections'],
        concept: `A great strategy can fall flat if it is presented badly. A good pitch is short, clear and focused on the client's goal. Lead with the problem and the goal, then your insight, then the plan, then the expected results and the next step. Use plain words and avoid jargon.

Expect questions. Prepare simple, honest answers to "why this channel?", "how much will it cost?", "how long until results?" and "what if it does not work?". Never promise guaranteed results.`,
        whyItMatters: `Marketing recommendations only matter if people understand and agree to act on them. Presenting well is what turns a document into a project and a beginner into a trusted adviser.`,
        sections: [
          { title: 'A five-part structure', body: `1) The goal and the problem in one slide or paragraph. 2) What we learned about the audience. 3) The strategy in one sentence. 4) The plan: channels, content, timeline, budget. 5) How we will measure and the next step. Aim for 10 minutes or fewer.` },
          { title: 'Handling objections', body: `Listen fully, restate the concern, answer honestly, and link back to the goal. If you do not know, say so and explain how you will find out. Admitting limits builds trust.` },
          { title: 'Honest expectations', body: `Use ranges and conditions instead of promises: "Based on similar tests, we aim for X, but we will check after two weeks and adjust." Overpromising is the quickest way to lose a client.` },
        ],
        keyTerms: [{ term: 'Pitch', def: 'A short presentation of your recommendation.' }, { term: 'Objection', def: 'A concern or reason for hesitation.' }],
        howTo: ['Write the goal and problem in two sentences.', 'Summarise three audience insights.', 'State the strategy sentence.', 'Outline the plan on one page.', 'Prepare answers to four likely questions.', 'Practise aloud and time yourself.', 'Write the single next step you will ask for.'],
        template: { title: 'Pitch outline and Q&A prep', intro: 'Use as speaking notes.', body: `1. GOAL AND PROBLEM (2 sentences):\n2. WHAT WE LEARNED ABOUT THE AUDIENCE (3 points):\n3. STRATEGY (1 sentence):\n4. THE PLAN (channels, content, timeline, budget):\n5. HOW WE WILL MEASURE + NEXT STEP:\n\nLIKELY QUESTIONS\nWhy this channel? \nHow much will it cost? \nHow long until results? \nWhat if it does not work? ` },
        example: `When asked "What if it does not work?", a marketer answers: "We will review after two weeks. If signups are below target, we test a new hook and a different audience before spending more. We never put the whole budget in at once."`,
        practice: `Write and rehearse a five-minute pitch for your campaign plan, plus honest answers to four likely questions.`,
        successCriteria: 'Your pitch follows the five parts and your answers avoid guarantees.',
        commonMistakes: 'Using jargon, promising guaranteed results, or presenting every detail instead of the key story.',
        takeaways: ['Lead with the client\'s goal.', 'Use plain language and honest expectations.', 'Prepare for questions.'],
        knowledgeCheck: [
          Q('A good pitch begins with:', ['Your credentials only', 'The client\'s goal and problem', 'A long history', 'Jargon'], 1, 'Focus on what the client wants.'),
          Q('Which is the best way to set expectations?', ['Guarantee results', 'Use honest ranges and review points', 'Say nothing', 'Promise the moon'], 1, 'Honest expectations build trust.'),
          Q('If you do not know an answer you should:', ['Invent one', 'Say so and explain how you will find out', 'Change the subject', 'End the meeting'], 1, 'Honesty builds credibility.'),
          Q('Presentations should be:', ['As long as possible', 'Short, clear and focused', 'Technical', 'Unplanned'], 1, 'Clarity helps decisions.'),
        ],
      }),

      A('dmf-m10-a', [
        Q('A campaign is best defined as:', ['A random post', 'A focused push toward one goal, audience and timeframe', 'A logo', 'A budget'], 1, 'It combines all the parts into one plan.'),
        Q('The most common campaign plan failure is:', ['Too much detail', 'Inconsistency between sections', 'Too many colours', 'Short length'], 1, 'The plan must tell one coherent story.'),
        Q('An assumption is:', ['A proven fact', 'A belief not yet verified', 'A metric', 'A discount'], 1, 'Test risky assumptions early.'),
        Q('A buffer in a timeline is for:', ['Decoration', 'Absorbing delays and surprises', 'Reducing quality', 'Avoiding milestones'], 1, 'Things usually take longer than expected.'),
        Q('Why keep a budget reserve?', ['It looks good', 'For surprises or doubling down on what works', 'Required by law', 'To avoid planning'], 1, 'Plans rarely go exactly as expected.'),
        Q('A risk plan includes:', ['Only the risks', 'Each risk and your planned response', 'Nothing', 'Blame'], 1, 'Responses make risks manageable.'),
        Q('A good pitch starts with:', ['Your life story', 'The client\'s goal and problem', 'Jargon', 'A long history'], 1, 'Focus on what matters to the client.'),
        Q('Best way to set expectations:', ['Guarantee results', 'Honest ranges and review points', 'Say nothing', 'Over-promise'], 1, 'Honesty builds trust.'),
        Q('If you cannot answer a client question you should:', ['Invent something', 'Say so and explain how you will find out', 'Ignore it', 'End the meeting'], 1, 'Honesty builds credibility.'),
        Q('A strong plan is one that:', ['Only its author understands', 'Someone else could execute from the document', 'Is verbal only', 'Has no measures'], 1, 'Clarity makes plans usable.'),
      ]),

      { id: 'dmf-capstone-lesson', title: 'Capstone Briefing', type: 'capstone', duration: 20 },
    ],
  },
];

export const projects = [
  {
    id: 'dmf-p1', title: 'Build a Target Audience Profile',
    brief: 'Create a complete, research-backed buyer persona for a fictional or real small business.',
    scenario: 'A small business owner has asked you to help her understand exactly who she\u2019s marketing to. She has been guessing, and her posts get little response.',
    requirements: [
      'A named persona with life stage and situation',
      'At least 3 goals and 3 frustrations written in the persona\u2019s own words',
      'At least 3 objections to buying and 1 trigger moment',
      'Notes on where this audience spends time online',
      'At least 30 research entries recorded in a sheet, from at least 3 sources',
      'At least 3 real phrases pulled from actual reviews, comments, or forum research, each with its source',
      'A customer journey map with at least 6 stages and 2 friction points',
    ],
    constraints: ['Must be grounded in real or realistic research, not pure guesswork', 'Do not copy a competitor\u2019s persona; build your own from your research'],
    deliverable: 'A one-page persona document plus a research sheet and a simple journey map.',
    tools: ['Google Docs', 'Google Sheets', 'Any public reviews, comments or forums for research'],
    successCriteria: [
      'Persona includes goals, frustrations, objections, trigger and online behaviour',
      'Includes real researched language with sources, not assumptions',
      'Is specific enough to write content or ads for',
      'The journey map shows where the business could help or reduce friction',
    ],
  },
  {
    id: 'dmf-p2', title: 'Create a 2-Week Content & Channel Plan',
    brief: 'Build a realistic, strategy-driven content and channel plan for a business.',
    scenario: 'That same business owner now wants a concrete plan for the next two weeks, with a clear reason for every post.',
    requirements: [
      'A one-sentence strategy statement (audience, outcome, approach, metric)',
      'A SMART goal with a baseline and deadline',
      'One primary channel and up to two supporting channels, with reasons',
      '3-4 content pillars',
      '8-10 specific content pieces mapped to dates and channels',
      'A note on which funnel stage each piece primarily serves',
      'A call to action on every piece',
      'One idea repurposed into at least 3 formats',
    ],
    constraints: ['Every piece must tie back to the stated strategy', 'Must use at least 2 different content types (educational, entertaining, inspirational)', 'The plan must be sustainable for one person'],
    deliverable: 'A simple content calendar document or spreadsheet.',
    tools: ['Google Sheets or Docs'],
    successCriteria: [
      'Plan is grounded in a clear strategy statement and SMART goal',
      'Content pillars are specific to the niche',
      'Funnel stages are correctly identified per piece',
      'Every piece has a next step',
    ],
  },
  {
    id: 'dmf-p3', title: 'Design a Lead Magnet and Welcome Email',
    brief: 'Plan the first step of an email system: a lead magnet, a signup promise and a welcome email.',
    scenario: 'The business owner wants an email list she owns, so she is not dependent on one social platform.',
    requirements: [
      'A lead magnet that solves one specific problem, with title, format and five-point outline',
      'A one-sentence signup promise (who, what, how fast)',
      'A welcome email with three subject line options',
      'The welcome email delivers the resource, introduces the sender, sets expectations and invites one action',
      'A short compliance and consent checklist for the list',
    ],
    constraints: ['The lead magnet must connect to a paid offer', 'Email must be short enough to read in under a minute'],
    deliverable: 'A one- or two-page document containing the lead magnet plan and the welcome email.',
    tools: ['Google Docs', 'A free email tool (optional for testing)'],
    successCriteria: [
      'The lead magnet is specific and quick to use',
      'The welcome email has one clear call to action',
      'Consent, unsubscribe and identity requirements are addressed',
    ],
  },
  {
    id: 'dmf-p4', title: 'Plan a Paid Ad Test and a Measurement Sheet',
    brief: 'Design a small, safe paid advertising test with a budget, two ad versions and a way to measure results.',
    scenario: 'The business owner is curious about ads but nervous about wasting money. She wants a careful test plan.',
    requirements: [
      'A break-even calculation using price and costs',
      'A maximum test budget and daily budget',
      'A cold and a warm audience idea with matching messages',
      'Two versions of an ad that differ by one element',
      'A landing page checklist showing message match',
      'A measurement sheet with CTR, conversion rate and CPA, plus UTM links',
      'Decision rules: stop, adjust or scale',
    ],
    constraints: ['The budget must be money the owner can afford to lose', 'Claims in ads must be honest and supportable'],
    deliverable: 'A test plan document and a simple tracking spreadsheet.',
    tools: ['Google Sheets', 'Google Docs'],
    successCriteria: [
      'Break-even and budget numbers are correct and realistic',
      'Only one element differs between ad versions',
      'Decision rules are written before spending',
    ],
  },
];

export const capstone = {
  id: 'dmf-capstone',
  title: 'Develop a Complete Digital Marketing Strategy',
  scenario: 'You\u2019ve been hired as a consultant by a small, realistic fictional business (choose one: an online skincare brand, a local bakery, a freelance service provider, or a digital course creator) to build their first real digital marketing strategy and present it to the owner.',
  objective: 'Produce a complete, consistent strategy covering audience, positioning, goal, channels, content, a sample campaign, budget, timeline, measurement and risks, and be ready to present it.',
  requirements: [
    'A defined target audience and persona backed by research',
    'A one-sentence positioning statement with proof',
    'A SMART marketing goal with a baseline and deadline',
    'A channel strategy naming 2-3 channels with reasoning',
    'A 2-week content plan tied to funnel stages, with calls to action',
    'One sample campaign concept (could include paid or organic)',
    'A budget (or time plan), a timeline with milestones and 3 risks with responses',
    'A short measurement plan naming which metrics you\u2019d track, formulas used, and review dates',
    'A five-minute pitch outline with answers to four likely client questions',
  ],
  constraints: [
    'Every section must connect logically to the others (same audience and goal throughout)',
    'No generic filler: every choice must be justified for this specific business',
    'Do not promise guaranteed results; use honest ranges and review points',
  ],
  deliverables: ['One combined strategy document covering all required sections', 'A one-page pitch outline'],
  tools: ['Google Docs/Sheets'],
  rubric: { understanding: 15, strategy: 25, execution: 25, problemSolving: 15, professionalQuality: 10, completeness: 10 },
  passScore: 70,
  reflectionQuestions: [
    'Which part of this strategy do you feel most confident presenting to a real client, and why?',
    'What would you want to test or learn first if this campaign actually launched?',
    'What is one assumption in your plan you\u2019d want to validate with real audience research before spending money?',
    'If the owner could only do one part of your plan this month, which would you tell her to do, and why?',
  ],
};

/* Extra course-page information (read by data/academy.js and shown on the course page). */
export const meta = {
  description: 'Learn how digital marketing works end to end: understand customers, set measurable goals, choose channels, plan content, use social, search, email and paid ads, read analytics, and finish with a complete strategy you can show a client.',
  learningOutcomes: [
    'Explain the digital marketing ecosystem and the customer funnel',
    'Research an audience and build a persona from real customer language',
    'Write a positioning statement and a one-sentence strategy',
    'Set SMART goals and work backward from revenue',
    'Choose channels using audience, goal and capacity',
    'Plan a two-week content calendar with pillars, hooks and repurposing',
    'Understand social, search (SEO), email and paid advertising at a working level',
    'Calculate and read CTR, conversion rate, CPA and ROAS',
    'Run a simple test and write a one-page results report',
    'Assemble and pitch a complete campaign plan with budget, timeline and risks',
  ],
  certificateSkills: ['Marketing Strategy', 'Audience Research', 'Positioning', 'Content Planning', 'SEO Basics', 'Email Marketing', 'Paid Ads Basics', 'Analytics & Reporting', 'Campaign Planning'],
  about: `This is a practical, start-to-finish introduction to digital marketing. You will not just learn definitions. In every lesson you do something: research real customers, write a goal with numbers, build a content calendar, draft a welcome email, plan a safe ad test and read a set of metrics.

The course is built around one idea: good marketing starts with a specific person and a specific goal. Each module adds one piece, and the final capstone asks you to combine them all into a strategy you could present to a real small business.`,
  audience: [
    'Complete beginners who want a structured start in digital marketing',
    'Freelancers and small business owners who want to market themselves or a client properly',
    'Creators and course sellers who want to turn attention into customers',
    'Anyone preparing for roles such as social media manager, content marketer or marketing assistant',
  ],
  careerOutcomes: [
    { role: 'Social media or content assistant', note: 'Plan and schedule content tied to goals and funnel stages.' },
    { role: 'Junior digital marketer', note: 'Support campaigns across email, search and social with basic reporting.' },
    { role: 'Freelance marketing helper', note: 'Offer audience research, content planning or email setup to small businesses.' },
    { role: 'Business owner or creator', note: 'Market your own offer with a clear strategy instead of guessing.' },
  ],
  faq: [
    ['Will this course make me a hired marketer?', 'It gives you the foundations and a portfolio-ready strategy document. Most employers and clients also want real examples and experience, so use the projects and capstone as your first pieces of work and keep practising on real businesses.'],
    ['Do I need money for ads or tools?', 'No. Every lesson can be completed with free tools. The paid advertising module teaches you to plan a test on paper, so you only spend money if and when you choose to.'],
    ['Do I need my own business or website?', 'No. You can complete every task using a real small business you know or a realistic fictional one. Analytics exercises include a sample-data option.'],
    ['How is this course different from reading blog posts?', 'It is sequenced, every lesson has a task and a check with explanations, each module ends with an assessment, and you finish by producing a complete strategy that is scored against a rubric.'],
  ],
};
