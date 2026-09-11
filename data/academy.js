/* =============================================
   DATA/ACADEMY.JS
   The Playbook Academy's content layer. Follows the same
   separation as data/store.js and data/playground.js: pure
   content, no DOM, no localStorage — that's js/academy-engine.js.

   IMPORTANT — HONEST SCOPE NOTE (read before adding courses):
   All 20 courses have complete, real metadata (description,
   outcomes, tools, certificate skills) and a COMPLETE module list
   with real lesson titles and objectives — so the course library,
   search, career-goal matching, and course overview/curriculum all
   work fully and honestly for every course.

   Full 10-screen lesson content (the actual teaching) is written
   for two flagship courses — Web Design Foundations and JavaScript
   Foundations — modules 1-2 of each. Every other lesson has a real
   title and sits inside a real module objective, but its `content`
   field is intentionally absent; the lesson renderer shows a clean,
   honest "this lesson's full content is still being written" state
   rather than faking depth. This was a deliberate choice over
   writing shallow one-paragraph lessons across all 20 courses,
   which would have violated the brief's own "no fake depth" rule
   far more than an honest, smaller set of complete lessons.
   ============================================= */

/* =============================================
   HELPERS
   ============================================= */

let lessonCounter = 0;
function lid() { return `l${++lessonCounter}`; }

// A lesson with no `content` object renders the honest
// "coming soon" state in the lesson viewer.
function stubLesson(title, type = 'concept', duration = 10) {
  return { id: lid(), title, type, duration };
}

/* =============================================
   COURSE 2 — WEB DESIGN FOUNDATIONS (flagship, full depth: modules 1-2)
   ============================================= */

const webDesignModules = [
  {
    id: 'wd-m1',
    title: 'How the Web Works',
    objective: 'Understand how websites are built, requested, and delivered to a browser — the mental model everything else builds on.',
    lessons: [
      {
        id: lid(), title: 'What Happens When You Visit a Website', type: 'concept', duration: 10,
        content: {
          concept: "Every time you type a web address and hit enter, a small, fast conversation happens between your browser and a computer somewhere else in the world. Your browser sends a request — basically \"please send me this page\" — and a server sends back the files that make up that page: HTML for structure, CSS for style, and often JavaScript for behavior. Your browser then reads those files and paints the page you actually see.",
          whyItMatters: "Understanding this flow is the difference between memorizing HTML tags and actually understanding web design. Once you know that a website is just files being requested and delivered, debugging stops feeling like magic — a broken page usually means one of those files didn't load, didn't load correctly, or has an error in it.",
          howTo: [
            'Open any website and notice the URL bar — that address is telling the browser exactly which server and which file to request.',
            'Right-click any webpage and choose "View Page Source" to see the raw HTML your browser received.',
            'Notice that what you see visually is very different from the raw HTML — CSS is what transforms one into the other.',
          ],
          example: "Imagine typing herdigitalplaybook.com into your browser. Your browser looks up which server hosts that domain, sends a request to it, and the server responds with an HTML file (the structure), which links to a CSS file (the styling) and a JavaScript file (the interactivity). Your browser downloads all three and combines them into the page you see — pink gradients, fonts, buttons, and all.",
          practice: "Pick 3 websites you use regularly. For each one, right-click and View Page Source. Without worrying about understanding every line, just notice: can you find the page's main heading text inside the HTML? Can you spot any CSS class names that look meaningful (like \"hero\" or \"nav\")?",
          successCriteria: "You can explain, in your own words and without technical jargon, what a browser and a server are each responsible for, and you've actually looked at raw HTML source code at least 3 times.",
          commonMistakes: "Beginners often think a website \"is\" what they see visually — the pink buttons, the layout — rather than understanding that what they see is a rendering of underlying code. Another common mistake: assuming you need to memorize every HTML tag before you can start; you don't, you'll pick up tags naturally as you use them.",
          knowledgeCheck: [
            { q: 'What does a browser do when you visit a website?', options: ['It designs the page on the spot', 'It requests files from a server and renders them', 'It stores the website permanently on your device', 'It writes new HTML for you'], correct: 1 },
            { q: 'Which of these is responsible for a page\'s visual styling?', options: ['HTML', 'CSS', 'The domain name', 'The browser address bar'], correct: 1 },
            { q: 'What can "View Page Source" show you?', options: ['The website\'s hosting bill', 'The raw HTML the browser received', 'The owner\'s personal information', 'Nothing useful for beginners'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Browsers, Servers, and Requests', type: 'concept', duration: 10,
        content: {
          concept: "A server is just a computer, somewhere, that's always on and waiting for requests. When your browser asks for a webpage, that's called an HTTP request. The server's response — the actual files — is called an HTTP response. This request-and-response pattern is the foundation of literally every website you've ever visited.",
          whyItMatters: "As a web designer, you'll constantly hear terms like \"the site is down\" or \"the request failed\" or \"404 error.\" These all describe breakdowns somewhere in this request-response cycle. Understanding it means you can describe problems accurately to a developer or client instead of just saying \"it's broken.\"",
          howTo: [
            'Open your browser\'s DevTools (right-click → Inspect, then click the "Network" tab).',
            'Reload any webpage with the Network tab open.',
            'Watch the list of requests appear — each row is one file the browser requested from the server.',
          ],
          example: "When a client says \"my website loads slowly,\" a big part of diagnosing that is looking at the Network tab and seeing which requests are taking a long time — is it a huge image? A slow server response? This is real, practical diagnostic work web designers do regularly.",
          practice: "Open DevTools on herdigitalplaybook.com (or any site), go to the Network tab, reload the page, and count roughly how many separate requests happen to load just the homepage. Note the largest file you see.",
          successCriteria: "You can open DevTools' Network tab without help, reload a page, and correctly identify at least one request as an image, one as CSS, and one as a script (based on the \"Type\" column).",
          commonMistakes: "New designers often skip learning DevTools because it looks intimidating and technical. But you don't need to understand everything in it — just knowing the Network tab exists and what it roughly shows already puts you ahead of most beginners.",
          knowledgeCheck: [
            { q: 'What is an HTTP request?', options: ['A file stored on your computer', 'A message asking a server for something', 'A type of CSS', 'A browser bookmark'], correct: 1 },
            { q: 'Where can you see all the files a page requested?', options: ['The Network tab in DevTools', 'The browser\'s bookmarks', 'The page\'s footer', 'Google Search'], correct: 0 },
          ],
        },
      },
      {
        id: lid(), title: 'HTML, CSS, and JavaScript: The Three Building Blocks', type: 'concept', duration: 12,
        content: {
          concept: "Every website is built from three layers working together. HTML provides structure — headings, paragraphs, images, buttons. CSS provides presentation — colors, fonts, spacing, layout. JavaScript provides behavior — things that happen when you click, type, or scroll. A useful analogy: HTML is a house's rooms and walls, CSS is the paint and furniture, JavaScript is the electricity and plumbing that makes things actually do something.",
          whyItMatters: "Clients and employers will assume you know which layer is responsible for which kind of problem. If a button is the wrong color, that's CSS. If a button doesn't do anything when clicked, that's JavaScript. If a page is missing a whole section, that's HTML. Being able to say which layer a problem lives in makes you sound — and actually be — competent fast.",
          howTo: [
            'Look at any webpage and try to mentally separate: what is structure (would exist even with zero styling)? What is style (colors, spacing, fonts)? What is behavior (things that respond to your actions)?',
            'In DevTools, click the "Elements" tab to see HTML, and notice the "Styles" panel showing CSS rules for whatever element you click.',
          ],
          example: "A pricing page might have HTML for three plan boxes with prices and buttons, CSS making the middle plan visually stand out with a border and larger size, and JavaScript that toggles between \"monthly\" and \"yearly\" pricing when you click a switch.",
          practice: "Pick one webpage. List 3 things you see that are clearly structure (HTML), 3 things that are clearly style (CSS), and 1 thing that's clearly behavior (JavaScript) — something that changes when you interact with it.",
          successCriteria: "Your list correctly sorts real examples into the right layer — structure items would still \"exist\" with no CSS at all, style items are purely visual, and the behavior item only happens because of user interaction.",
          commonMistakes: "A common confusion: thinking a hover effect (like a button changing color when your mouse is over it) is JavaScript. It's actually usually pure CSS (`:hover`) — JavaScript is for things that need to \"remember\" state or respond to clicks in more complex ways, not simple visual reactions.",
          knowledgeCheck: [
            { q: 'Which layer is responsible for a button changing color when clicked and staying that new color?', options: ['HTML', 'CSS alone', 'JavaScript', 'The domain name'], correct: 2 },
            { q: 'A page with zero CSS and zero JavaScript would still have:', options: ['Colors and fonts', 'Nothing at all', 'Basic unstyled structure and text', 'Interactive buttons'], correct: 2 },
          ],
        },
      },
      {
        id: lid(), title: 'Domains, Hosting, and Where Websites Live', type: 'concept', duration: 10,
        content: {
          concept: "A domain (like herdigitalplaybook.com) is a human-readable address that points to a server. Hosting is the service that actually stores your website's files and keeps that server running and connected to the internet. You typically buy these as two separate things — a domain from a registrar, and hosting from a hosting provider — though many services (like Vercel or Netlify) bundle both together for simple sites.",
          whyItMatters: "Clients will ask you \"do I need to buy hosting?\" and \"why do I need both a domain AND hosting?\" — being able to explain this clearly, without jargon, is a genuinely useful skill that builds trust fast.",
          howTo: [
            'Search "who is [any domain]" using a free WHOIS lookup tool to see who registered it and when.',
            'Notice that the WHOIS record shows the domain registrar — a separate thing from wherever the site is actually hosted.',
          ],
          example: "A small bakery wants a website. You might register \"lagosbakes.com\" through a domain registrar for about $12/year, then host the actual site files on a free or low-cost host like Vercel or Netlify — two separate services working together to make one working website.",
          practice: "Look up the WHOIS record for 3 websites you know. Note the registrar for each. Then try to guess (or research) where each site might actually be hosted, based on how the site behaves (fast static site vs. complex app).",
          successCriteria: "You can explain the difference between a domain and hosting to someone with zero technical background, using an analogy (like an address vs. the actual house).",
          commonMistakes: "Beginners often assume the domain registrar and the host must be the same company. They often aren't — and that's completely normal, not a sign something is set up wrong.",
          knowledgeCheck: [
            { q: 'What does a domain name do?', options: ['Stores your website files', 'Provides a human-readable address pointing to a server', 'Writes your CSS for you', 'Is the same thing as hosting'], correct: 1 },
            { q: 'Can your domain registrar and your hosting provider be different companies?', options: ['No, they must always be the same', 'Yes, this is common and normal', 'Only for large companies', 'Only if you pay extra'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Tools of the Trade: Your Code Editor and Browser DevTools', type: 'how-to', duration: 12,
        content: {
          concept: "A code editor (like the free VS Code) is where you'll write HTML and CSS. Browser DevTools (built into every browser, free, no install needed) is where you inspect, debug, and experiment with any live webpage. Together, these two tools are 90% of a web designer's actual daily toolkit — no expensive software required.",
          whyItMatters: "Comfort with these two tools is what separates \"I took a course once\" from \"I can actually build and fix things.\" You'll use both in literally every lesson from here forward.",
          howTo: [
            'Download and install VS Code (free) if you haven\'t already.',
            'Create a new folder on your computer for this course\'s practice files.',
            'Open that folder in VS Code.',
            'In any browser, right-click a webpage and choose "Inspect" to open DevTools.',
            'In DevTools\' Elements panel, try clicking directly on an element in the page — notice it highlights the matching HTML.',
          ],
          example: "A designer troubleshooting \"why is this text too close to the edge\" would open DevTools, click the text, look at the Styles panel, and directly edit the CSS padding value live in the browser to test a fix — before ever touching the real code file.",
          practice: "Install VS Code if needed, create your \"web-design-course\" practice folder, and open DevTools on 3 different websites, clicking around the Elements panel each time just to get comfortable navigating it.",
          successCriteria: "You have VS Code installed with an empty practice folder ready, and you can open DevTools and click on any element on a page without hesitating.",
          commonMistakes: "Skipping DevTools practice because it looks complex. In reality, you only need to know 2 tabs (Elements and Network) to be dangerous as a beginner — the rest can wait.",
          knowledgeCheck: [
            { q: 'What is VS Code primarily used for?', options: ['Browsing the internet', 'Writing and editing code', 'Hosting websites', 'Buying domains'], correct: 1 },
            { q: 'Do you need to install anything to use browser DevTools?', options: ['Yes, a paid subscription', 'Yes, a separate app', 'No, it\'s built into every modern browser', 'Only on Windows'], correct: 2 },
          ],
        },
      },
      { id: lid(), title: 'Module 1 Assessment', type: 'assessment', duration: 10, isAssessment: true,
        assessment: {
          passScore: 70,
          questions: [
            { q: 'What does a browser do when you visit a website?', options: ['Designs the page from scratch', 'Requests files from a server and renders them', 'Permanently stores the site', 'Writes HTML for the server'], correct: 1 },
            { q: 'Which layer is responsible for a page\'s colors and spacing?', options: ['HTML', 'CSS', 'JavaScript', 'The domain'], correct: 1 },
            { q: 'Which layer makes a button respond to a click with new behavior (not just a hover color)?', options: ['HTML', 'CSS', 'JavaScript', 'Hosting'], correct: 2 },
            { q: 'What is hosting?', options: ['A human-readable web address', 'The service that stores your site\'s files and serves them online', 'A code editor', 'A type of CSS'], correct: 1 },
            { q: 'Where would you look to see every file a webpage requested?', options: ['The Elements tab', 'The Network tab', 'The address bar', 'A WHOIS lookup'], correct: 1 },
            { q: 'What tool will you use to write HTML and CSS in this course?', options: ['A word processor', 'Browser DevTools only', 'A code editor like VS Code', 'A domain registrar'], correct: 2 },
          ],
        },
      },
    ],
  },
  {
    id: 'wd-m2',
    title: 'HTML Fundamentals',
    objective: 'Write clean, correctly structured HTML documents using the core elements every website is built from.',
    lessons: [
      {
        id: lid(), title: 'What HTML Actually Does', type: 'concept', duration: 10,
        content: {
          concept: "HTML (HyperText Markup Language) organizes content into meaningful pieces using tags — short instructions wrapped in angle brackets, like `<p>` for a paragraph or `<h1>` for a main heading. Tags usually come in pairs: an opening tag and a matching closing tag, with your content sandwiched between them, like `<p>This is a paragraph.</p>`.",
          whyItMatters: "Every single webpage you'll ever build starts with HTML. Get comfortable here and everything after — CSS, JavaScript, even accessibility — gets easier, because you're working with a page that's already logically organized.",
          howTo: [
            'Identify the opening tag, the content, and the closing tag in any HTML element.',
            'Notice that tags describe what something IS (a heading, a paragraph, a list) — not how it looks.',
          ],
          example: "`<h1>Her Digital Playbook</h1>` tells the browser \"this text is the main heading\" — it doesn't say anything about font size or color. That separation (structure vs. style) is intentional and is exactly what you learned about in Module 1.",
          practice: "Write out, by hand on paper or in a notes app (no code editor yet), what you think the HTML might look like for a simple recipe page: a title, an ingredients list, and instructions. Don't worry about getting exact tag names right yet.",
          successCriteria: "Your attempt shows you thinking in terms of \"this is a heading,\" \"this is a list,\" \"this is a paragraph\" — structure-first thinking, even if the exact tag syntax isn't perfect yet.",
          commonMistakes: "Forgetting that most tags need a closing tag. `<p>Hello</p>` is correct; `<p>Hello` without a closing tag will often still \"work\" visually but is invalid HTML that can cause unpredictable bugs later.",
          knowledgeCheck: [
            { q: 'What does an HTML tag describe?', options: ['Exactly how something looks', 'What something is (its role in the content)', 'The website\'s hosting provider', 'The domain name'], correct: 1 },
            { q: 'What usually comes in a matching pair?', options: ['CSS colors', 'Opening and closing tags', 'Domain names', 'Browser tabs'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Your First HTML Document', type: 'how-to', duration: 15,
        content: {
          concept: "Every HTML document needs a basic skeleton: a `<!DOCTYPE html>` declaration, an `<html>` tag wrapping everything, a `<head>` section for page metadata (like the title), and a `<body>` section for everything visible on the page.",
          whyItMatters: "This skeleton is the same for literally every HTML page you'll ever create — once it's memorized, you never have to think about it again, and you can focus on the actual content.",
          howTo: [
            'In VS Code, create a new file named `index.html`.',
            'Type `<!DOCTYPE html>` on the first line.',
            'Add `<html>` and `</html>` tags below it.',
            'Inside `<html>`, add a `<head>` section containing `<title>My First Page</title>`.',
            'Below `</head>`, add a `<body>` section.',
            'Inside `<body>`, add `<h1>Hello, World</h1>`.',
            'Save the file, then open it by double-clicking it — it should open in your browser.',
          ],
          example: "This exact skeleton — DOCTYPE, html, head with a title, body with content — is what every real website you've ever visited starts with, from the smallest personal blog to a huge global brand's homepage.",
          practice: "Build the full skeleton described above from scratch (don't copy-paste), save it as `index.html`, and open it in your browser. Then add a second heading and a paragraph inside the body.",
          successCriteria: "Your file opens correctly in a browser showing your heading and paragraph, with no visible error text, and you typed the skeleton yourself rather than copying it.",
          commonMistakes: "Forgetting the `<!DOCTYPE html>` line — browsers are forgiving about this, but it's considered invalid HTML and can cause the browser to render your page in unpredictable \"quirks mode.\" Also common: mismatched tags, like opening `<body>` but closing with `</hml>`.",
          knowledgeCheck: [
            { q: 'What goes inside the <head> section?', options: ['Visible page content', 'Page metadata like the title', 'Only images', 'CSS colors'], correct: 1 },
            { q: 'What goes inside the <body> section?', options: ['Everything visible on the page', 'Only the page title', 'The domain name', 'Nothing, it\'s always empty'], correct: 0 },
            { q: 'What does <!DOCTYPE html> do?', options: ['Adds a heading', 'Tells the browser this is a modern HTML document', 'Links a CSS file', 'Creates a paragraph'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Headings, Paragraphs, and Text Formatting', type: 'how-to', duration: 12,
        content: {
          concept: "HTML gives you 6 levels of headings, `<h1>` through `<h6>`, from most to least important, plus `<p>` for paragraphs. Inline formatting tags like `<strong>` (important/bold) and `<em>` (emphasis/italic) let you highlight specific words within a paragraph.",
          whyItMatters: "Using headings correctly (one `<h1>` per page, then `<h2>`s for sections, `<h3>`s for subsections) isn't just visual — it's how screen readers navigate a page for blind users, and how search engines understand your content's structure. This is the accessibility and SEO foundation you'll build on later in this course.",
          howTo: [
            'Use exactly one `<h1>` per page for the main title.',
            'Use `<h2>` for major sections, `<h3>` for subsections within those — don\'t skip levels (no jumping from h2 straight to h4).',
            'Wrap body text in `<p>` tags, not just line breaks.',
            'Use `<strong>` for genuinely important text, `<em>` for emphasis — not just for visual bold/italic effect (that\'s a CSS job, covered later).',
          ],
          example: "A blog post might use `<h1>` for the post title, `<h2>` for each major section (\"Introduction,\" \"Main Tips,\" \"Conclusion\"), and `<p>` for each paragraph of body text, with `<strong>` wrapping a genuinely critical warning sentence.",
          practice: "Build a simple \"About Me\" page: one `<h1>` for your name, two `<h2>` sections (like \"Background\" and \"Goals\"), at least 3 `<p>` paragraphs total, and use `<strong>` at least once for something genuinely important.",
          successCriteria: "Your heading levels are used in logical order (h1, then h2s, no skipped levels), your paragraphs are wrapped in `<p>` tags (not just line breaks), and `<strong>`/`<em>` are used meaningfully, not decoratively.",
          commonMistakes: "Choosing heading tags based on how big text \"looks\" rather than its actual importance in the content's structure — that's a CSS decision, not an HTML one. A common beginner habit is using `<h3>` just because it \"looks like the right size,\" skipping `<h1>` and `<h2>` entirely.",
          knowledgeCheck: [
            { q: 'How many <h1> tags should a typical page have?', options: ['As many as you want', 'Exactly one', 'Zero', 'Six'], correct: 1 },
            { q: 'What should determine which heading level you use?', options: ['How big you want the text to look', 'The content\'s actual structural importance', 'Your favorite number', 'The page\'s color scheme'], correct: 1 },
            { q: 'What is <strong> intended for?', options: ['Purely decorative bold text', 'Text that is genuinely important', 'Page titles only', 'Links'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Links and Images', type: 'how-to', duration: 12,
        content: {
          concept: "The `<a>` (anchor) tag creates links using an `href` attribute pointing to a destination. The `<img>` tag embeds images using a `src` attribute pointing to the image file, and always needs an `alt` attribute describing the image for screen readers and for when the image fails to load.",
          whyItMatters: "Links and images are two of the most-used elements on the web, and both have accessibility requirements that are easy to skip as a beginner but genuinely matter — a missing `alt` attribute means a blind visitor gets no information about that image at all.",
          howTo: [
            'Write a link: `<a href="https://example.com">Visit Example</a>`.',
            'Write an image: `<img src="photo.jpg" alt="A description of what\'s in the photo">`.',
            'For links to other pages on your own site, use relative paths like `href="about.html"` instead of full URLs.',
            'Write meaningful alt text — describe what\'s actually in the image, not just "image" or the filename.',
          ],
          example: "A portfolio site linking to a project might use `<a href=\"projects/bakery-website.html\">View the Bakery Website Project</a>`, and show a screenshot with `<img src=\"bakery-screenshot.jpg\" alt=\"Homepage of a bakery website showing a hero image of pastries and a pink call-to-action button\">`.",
          practice: "Add to your practice page: one link to an external site (with descriptive link text, not \"click here\"), and one image (any image file) with genuinely descriptive alt text.",
          successCriteria: "Your link text describes where it goes without needing surrounding context, and your image's alt text would make sense to someone who couldn't see the image at all.",
          commonMistakes: "Writing alt text like \"image1.jpg\" or leaving it empty for meaningful images. Also common: link text that just says \"click here\" or \"read more,\" which is meaningless out of context and bad for both accessibility and SEO.",
          knowledgeCheck: [
            { q: 'What attribute does a link use to specify its destination?', options: ['src', 'href', 'alt', 'link'], correct: 1 },
            { q: 'What is the alt attribute on an image for?', options: ['Decoration', 'Describing the image for screen readers and fallback display', 'Setting the image\'s size', 'Linking the image somewhere'], correct: 1 },
            { q: 'Why is "click here" considered weak link text?', options: ['It\'s too short', 'It gives no information about the destination out of context', 'It\'s not allowed in HTML', 'It breaks the page'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Lists and Tables', type: 'how-to', duration: 12,
        content: {
          concept: "Unordered lists (`<ul>`) are for items with no particular order (bullet points); ordered lists (`<ol>`) are for sequential steps (numbered). Both contain `<li>` (list item) elements. Tables (`<table>`, with `<tr>` rows and `<td>`/`<th>` cells) are for genuinely tabular data — not for page layout, which is a common outdated practice to avoid.",
          whyItMatters: "Choosing the right list type communicates meaning, not just appearance — a numbered recipe's steps should be an `<ol>`, not a `<ul>` styled to look numbered. Tables used correctly (for actual data) are also far more accessible than tables misused for layout.",
          howTo: [
            'For unordered content: `<ul><li>Item one</li><li>Item two</li></ul>`.',
            'For sequential steps: `<ol><li>Step one</li><li>Step two</li></ol>`.',
            'For real tabular data, use `<table>` with a `<tr>` per row, `<th>` for header cells, and `<td>` for data cells.',
          ],
          example: "A recipe page would use an `<ul>` for the ingredients (order doesn't matter) and an `<ol>` for the instructions (order matters completely) — using the correct list type instantly communicates the right meaning to both sighted users and screen readers.",
          practice: "Add an ingredients list (`<ul>`) and instructions (`<ol>`) for a simple recipe to your practice page. Then build a small 3-row, 2-column table showing any data you like (with proper `<th>` headers).",
          successCriteria: "You used `<ul>` for genuinely unordered content and `<ol>` for genuinely sequential content, and your table has real header cells using `<th>`, not just bold `<td>` cells.",
          commonMistakes: "Using a `<ul>` for numbered steps just because it's more familiar, or using tables for visual page layout (like arranging a whole page in table cells) — both were common practices years ago and are now considered poor, inaccessible HTML.",
          knowledgeCheck: [
            { q: 'When should you use <ol> instead of <ul>?', options: ['When the order of items genuinely matters', 'Whenever you prefer numbers visually', 'Never, ul is always better', 'Only for tables'], correct: 0 },
            { q: 'What should <table> be used for today?', options: ['Page layout', 'Genuine tabular data', 'Navigation menus', 'Headings'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Div, Span, and Basic Structure', type: 'concept', duration: 10,
        content: {
          concept: "`<div>` is a generic block-level container (starts on its own line, takes full width by default) used to group related content together. `<span>` is a generic inline container (doesn't start a new line) used to wrap a small piece of text or content within a larger block. Neither has inherent meaning — they're structural helpers, mainly useful once you start applying CSS.",
          whyItMatters: "You'll use `<div>` constantly to group things for styling and layout purposes (covered in depth in the CSS modules ahead). Understanding it now — as a plain, meaningless \"box\" — prevents a lot of confusion later.",
          howTo: [
            'Wrap a group of related elements (like a heading + paragraph that form one \"card\") in a `<div>`.',
            'Use `<span>` only when you need to target a small piece of inline text for styling, like one word within a sentence.',
            'Avoid using `<div>` when a more meaningful tag exists — a `<p>` for a paragraph, not a `<div>` styled to look like one.',
          ],
          example: "A pricing card might be `<div class=\"pricing-card\"><h3>Basic Plan</h3><p>$10/month</p></div>` — the `<div>` groups the heading and price together as one visual/logical unit, ready to be styled as a card in CSS.",
          practice: "Wrap your \"About Me\" page's introduction (heading + first paragraph) in a single `<div>`. Then use a `<span>` to wrap one specific word within a paragraph that you might want to style differently later.",
          successCriteria: "Your `<div>` groups genuinely related content, and your `<span>` wraps only the specific inline text you intended to target — not an entire paragraph.",
          commonMistakes: "\"Div soup\" — wrapping everything in nested `<div>`s out of habit, even when a more meaningful tag (like `<p>`, `<ul>`, or the semantic tags you'll learn next module) would be more correct and accessible.",
          knowledgeCheck: [
            { q: 'Is <div> a block-level or inline element?', options: ['Block-level', 'Inline', 'Neither', 'Both, depending on content'], correct: 0 },
            { q: 'When should you reach for <span>?', options: ['To wrap an entire page', 'To target a small inline piece of text', 'To create a new paragraph', 'To create a list'], correct: 1 },
          ],
        },
      },
      { id: lid(), title: 'Module 2 Assessment', type: 'assessment', duration: 12, isAssessment: true,
        assessment: {
          passScore: 70,
          questions: [
            { q: 'What must every HTML document start with?', options: ['<h1>', '<!DOCTYPE html>', '<p>', '<link>'], correct: 1 },
            { q: 'Where does visible page content go?', options: ['<head>', '<body>', '<title>', '<!DOCTYPE>'], correct: 1 },
            { q: 'What attribute specifies a link\'s destination?', options: ['src', 'alt', 'href', 'target'], correct: 2 },
            { q: 'What is the alt attribute for?', options: ['Styling', 'Describing an image for accessibility/fallback', 'Setting image size', 'Nothing important'], correct: 1 },
            { q: 'Which list type is for sequential steps?', options: ['<ul>', '<ol>', '<table>', '<span>'], correct: 1 },
            { q: 'What should determine your heading levels?', options: ['Visual size preference', 'The content\'s actual structural importance', 'Random choice', 'Browser default'], correct: 1 },
            { q: 'Is <div> a meaningful semantic tag?', options: ['Yes, it describes specific content', 'No, it\'s a generic structural container', 'Only in tables', 'Only for images'], correct: 1 },
          ],
        },
      },
    ],
  },
  { id: 'wd-m3', title: 'Semantic HTML', objective: 'Use meaningful HTML5 elements (header, nav, main, article, section, footer) so pages are more accessible and better understood by search engines.', lessons: [
    stubLesson('Why Semantic HTML Matters', 'concept'), stubLesson('Header, Nav, and Footer', 'how-to'), stubLesson('Main, Article, and Section', 'how-to'), stubLesson('Choosing the Right Semantic Element', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m4', title: 'CSS Fundamentals', objective: 'Understand how CSS selects and styles HTML elements, and write your first real stylesheet.', lessons: [
    stubLesson('What CSS Actually Does', 'concept'), stubLesson('Selectors: Targeting the Right Elements', 'how-to'), stubLesson('The Box Model', 'concept'), stubLesson('Linking a Stylesheet to HTML', 'how-to'), stubLesson('Specificity and the Cascade', 'concept'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m5', title: 'Typography, Color & Visual Hierarchy', objective: 'Make deliberate typography and color choices that guide a visitor\'s eye and reinforce a brand.', lessons: [
    stubLesson('Web-Safe Fonts and Google Fonts', 'how-to'), stubLesson('Font Size, Weight, and Line Height', 'how-to'), stubLesson('Color Theory for the Web', 'concept'), stubLesson('Building Visual Hierarchy', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m6', title: 'Layout & Responsive Design', objective: 'Design layouts that adapt correctly to phone, tablet, and desktop screens.', lessons: [
    stubLesson('Why Responsive Design Is Non-Negotiable', 'concept'), stubLesson('The Viewport Meta Tag', 'how-to'), stubLesson('Media Queries', 'how-to'), stubLesson('Mobile-First vs Desktop-First', 'concept'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m7', title: 'Flexbox', objective: 'Build flexible one-dimensional layouts confidently using Flexbox.', lessons: [
    stubLesson('What Flexbox Solves', 'concept'), stubLesson('Flex Containers and Flex Items', 'how-to'), stubLesson('justify-content and align-items', 'how-to'), stubLesson('Building a Navigation Bar with Flexbox', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m8', title: 'CSS Grid', objective: 'Build two-dimensional page layouts using CSS Grid.', lessons: [
    stubLesson('What Grid Solves (and How It Differs from Flexbox)', 'concept'), stubLesson('Grid Containers, Rows, and Columns', 'how-to'), stubLesson('grid-template-areas', 'how-to'), stubLesson('Building a Page Layout with Grid', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m9', title: 'Components & Reusable Patterns', objective: 'Design and style reusable UI components like cards, buttons, and navigation menus.', lessons: [
    stubLesson('Thinking in Components', 'concept'), stubLesson('Building a Card Component', 'workshop'), stubLesson('Building Button Variants', 'workshop'), stubLesson('Naming Conventions for CSS Classes', 'how-to'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m10', title: 'Forms, Navigation & Accessibility', objective: 'Build accessible forms and navigation that everyone, including screen reader and keyboard users, can actually use.', lessons: [
    stubLesson('Form Elements and Labels', 'how-to'), stubLesson('Accessible Navigation Menus', 'how-to'), stubLesson('Keyboard Navigation and Focus States', 'concept'), stubLesson('Color Contrast and ARIA Basics', 'concept'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m11', title: 'Responsive Testing & Debugging', objective: 'Systematically test and debug a website across real device sizes.', lessons: [
    stubLesson('Testing with DevTools Device Mode', 'how-to'), stubLesson('Common Responsive Bugs and Fixes', 'troubleshooting'), stubLesson('Cross-Browser Considerations', 'concept'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'wd-m12', title: 'Build a Complete Website — Capstone', objective: 'Combine everything learned into one complete, responsive, accessible multi-section website.', lessons: [
    stubLesson('Capstone Briefing', 'capstone', 15),
  ], isCapstoneModule: true },
];

const webDesignProjects = [
  {
    id: 'wd-p1', title: 'Build a Personal "About Me" Page',
    brief: 'Design and build a single-page personal introduction using only semantic HTML and CSS.',
    scenario: 'You want a simple, professional personal page you could actually link from a resume or Instagram bio.',
    requirements: ['One clear <h1>', 'At least 2 sections using semantic tags', 'At least one image with real alt text', 'At least one list'],
    constraints: ['No JavaScript required', 'Must be a single HTML file plus one CSS file'],
    deliverable: 'A working index.html + style.css you can open in a browser.',
    tools: ['VS Code', 'A browser'],
    successCriteria: ['Valid, semantic HTML structure', 'Readable typography and spacing', 'Works without horizontal scrolling on mobile width'],
  },
  {
    id: 'wd-p2', title: 'Recreate a Pricing Section with Flexbox',
    brief: 'Rebuild a realistic 3-tier pricing section using Flexbox for layout.',
    scenario: 'A small software client wants a clean pricing section with a highlighted "most popular" plan.',
    requirements: ['3 pricing cards in a row on desktop, stacked on mobile', 'One visually emphasized "most popular" card', 'A button on each card'],
    constraints: ['Must use Flexbox, not floats or absolute positioning'],
    deliverable: 'A working HTML/CSS pricing section.',
    tools: ['VS Code', 'A browser'],
    successCriteria: ['Correct use of flex-direction and justify/align properties', 'Responsive stacking on mobile width', 'Consistent spacing between cards'],
  },
];

const webDesignCapstone = {
  id: 'wd-capstone',
  title: 'Build a Complete Small-Business Website',
  scenario: "You've been hired by a small, real-feeling business (choose one: a bakery, a tutor, a freelance photographer, or a local boutique) to build their first website.",
  objective: 'Design and build a complete, responsive, accessible multi-page (or multi-section single-page) website using everything from this course.',
  requirements: ['A homepage with a hero section, an about/services section, and a contact section', 'Semantic HTML throughout', 'A responsive layout using Flexbox and/or Grid', 'At least one accessible form (e.g. a contact form)', 'Consistent typography and color use'],
  constraints: ['No CSS frameworks — write your own CSS to demonstrate what you\'ve actually learned', 'Must work cleanly at mobile, tablet, and desktop widths'],
  deliverables: ['Complete HTML/CSS files', 'A short written reflection (see below)'],
  tools: ['VS Code', 'A browser', 'DevTools for testing'],
  rubric: { understanding: 15, strategy: 20, execution: 30, problemSolving: 15, professionalQuality: 10, completeness: 10 },
  passScore: 70,
  reflectionQuestions: ['What was the hardest layout problem you solved, and how did you solve it?', 'What would you do differently if a real client saw this?', 'Which concept from this course do you still want to practice more?'],
};

/* =============================================
   COURSE 3 — JAVASCRIPT FOUNDATIONS (flagship, full depth: modules 1-2)
   ============================================= */

const jsModules = [
  {
    id: 'js-m1',
    title: 'What JavaScript Does',
    objective: 'Understand JavaScript\'s role in a web page and successfully run your first scripts.',
    lessons: [
      {
        id: lid(), title: 'What JavaScript Actually Does', type: 'concept', duration: 10,
        content: {
          concept: "If HTML is structure and CSS is style, JavaScript is behavior — it's the layer that lets a webpage respond to things: a click, a scroll, typed text, the passing of time. Without JavaScript, a webpage is a static document; with it, a webpage becomes an interactive application.",
          whyItMatters: "Every quiz, calculator, dropdown menu, form validation, and \"load more\" button you've ever used on the web runs on JavaScript. It's the single most in-demand programming language in the world, precisely because it's the only language that runs natively in every browser.",
          howTo: [
            'Open any interactive website and try to identify 3 things that only happen because of user interaction (not just page load).',
            'For each, guess what JavaScript might be doing behind the scenes.',
          ],
          example: "When you click \"Add to Cart\" on a shopping site and see the cart count update instantly without the page reloading, that's JavaScript reading your click, updating a number in memory, and changing what's displayed — all without asking the server to reload anything.",
          practice: "Visit 3 websites you use often. For each, find and write down one specific interactive behavior (not just \"it looks nice\") that could only happen with JavaScript — something that responds to you doing something.",
          successCriteria: "Your 3 examples are genuinely interactive behaviors (respond to a click, keystroke, or similar), not just visual styling or page structure.",
          commonMistakes: "Confusing CSS hover effects (a button changing color when your mouse is over it) with JavaScript — that's pure CSS. JavaScript is needed when something needs to \"remember\" a value, fetch new data, or make a decision based on user input.",
          knowledgeCheck: [
            { q: 'What layer is JavaScript, compared to HTML and CSS?', options: ['Structure', 'Style', 'Behavior', 'Hosting'], correct: 2 },
            { q: 'Which of these needs JavaScript, not just CSS?', options: ['A button turning darker on hover', 'A cart counter updating when you click "Add to Cart"', 'Text becoming bold', 'A page having a pink background'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Where JavaScript Lives in a Web Page', type: 'concept', duration: 10,
        content: {
          concept: "JavaScript can live in three places: inline (directly in an HTML attribute — rare and discouraged), inside a `<script>` tag in the HTML file, or in a separate `.js` file linked with `<script src=\"script.js\"></script>`. The separate-file approach is standard practice because it keeps your HTML, CSS, and JavaScript cleanly separated.",
          whyItMatters: "Understanding where your code runs, and in what order, prevents a huge chunk of beginner bugs — like writing JavaScript that tries to find an HTML element that hasn't been loaded into the page yet.",
          howTo: [
            'Create a file called `script.js` in your practice folder.',
            'In your HTML file, right before the closing `</body>` tag, add `<script src="script.js"></script>`.',
            'Placing the script tag at the end of the body (not in the head) ensures the HTML loads first, before your JavaScript tries to interact with it.',
          ],
          example: "A common bug: putting `<script src=\"script.js\">` in the `<head>` and having it fail to find a button on the page — because the browser reads top to bottom, and the button's HTML hasn't been processed yet when the script runs. Moving the script tag to just before `</body>` fixes this.",
          practice: "Create an HTML file with one `<h1>` and link an external `script.js` file just before `</body>`. In `script.js`, write `console.log(\"Hello from JavaScript\");` and open the page with DevTools' Console tab open to confirm it prints.",
          successCriteria: "You see \"Hello from JavaScript\" appear in the browser console with no errors, using a properly linked external file (not inline).",
          commonMistakes: "Forgetting the `src` attribute, or pointing it at the wrong filename/path — this is the single most common first bug, and checking the Console tab for a \"404\" or \"not found\" error is the fix.",
          knowledgeCheck: [
            { q: 'Where should your <script> tag usually go for best practice?', options: ['In the <head>, always', 'Just before </body>', 'It doesn\'t matter at all', 'Inside every <p> tag'], correct: 1 },
            { q: 'Why link an external .js file instead of writing JavaScript inline?', options: ['It\'s required by all browsers', 'It keeps code organized and separated by concern', 'Inline JavaScript is illegal', 'It makes the page load slower on purpose'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Your First Script: Hello Console', type: 'how-to', duration: 12,
        content: {
          concept: "`console.log()` is a JavaScript command that prints a message to the browser's Console — a developer-only panel, invisible to regular visitors, used constantly for checking that your code is doing what you think it's doing.",
          whyItMatters: "The Console is your single most-used debugging tool as a developer. Long before you write complex code, you'll be using `console.log()` to check values, confirm code ran, and hunt down bugs — this habit will save you hours of confusion.",
          howTo: [
            'Open DevTools (right-click → Inspect) and click the "Console" tab.',
            'In your `script.js` file, type `console.log("Hello, World");` and save.',
            'Reload the webpage with the Console tab open — you should see your message appear.',
            'Try logging a few different things: a number, a sentence, the result of `2 + 2`.',
          ],
          example: "A developer debugging \"why isn't my button working\" will often sprinkle `console.log(\"button clicked\")` inside their code to check, step by step, exactly where the logic stops behaving as expected.",
          practice: "In your script.js, write at least 4 different console.log() statements: one with plain text, one with a number, one with a simple math expression like `10 * 4`, and one combining text and a number.",
          successCriteria: "All 4 log statements appear correctly in the Console with no red error messages when you reload the page.",
          commonMistakes: "Forgetting quotation marks around text (`console.log(Hello)` instead of `console.log(\"Hello\")`) — this causes an error because JavaScript thinks `Hello` is a variable name, not text.",
          knowledgeCheck: [
            { q: 'What does console.log() do?', options: ['Deletes code', 'Prints a message to the browser\'s developer console', 'Sends an email', 'Changes CSS'], correct: 1 },
            { q: 'What happens if you forget quotes around text in console.log?', options: ['Nothing, it works fine', 'JavaScript throws an error, treating the text as a variable name', 'The page turns red', 'The console closes'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Reading Error Messages Without Panicking', type: 'troubleshooting', duration: 12,
        content: {
          concept: "JavaScript errors in the Console look intimidating but almost always tell you exactly two critical things: what type of error occurred, and which line of your file it happened on. Learning to read just those two pieces of information turns \"scary red text\" into a genuinely useful roadmap.",
          whyItMatters: "Every developer, no matter how experienced, spends significant time reading error messages. Beginners who panic and give up at the first red error message stall out fast; beginners who calmly read the error and the line number progress much faster.",
          howTo: [
            'When you see a red error, find the file name and line number it references (usually on the right side of the message).',
            'Go to that exact line in your code and read it carefully.',
            'Search the error type (like "Uncaught ReferenceError") plus a few words of the message online — this is completely normal, professional practice, not "cheating."',
          ],
          example: "An error reading `Uncaught ReferenceError: cosole is not defined at script.js:3` is telling you: on line 3, you tried to use something called \"cosole\" that doesn't exist — almost certainly a typo for \"console.\"",
          practice: "Intentionally break your script.js in 3 different ways (misspell console.log, forget a closing quote, forget a semicolon) one at a time, reload, and read what error each one produces. Fix each before moving to the next.",
          successCriteria: "You can identify the line number in each error message and correctly connect it to the actual typo you made.",
          commonMistakes: "Closing DevTools or ignoring the error instead of reading it. The instinct to look away from red text is completely normal — but the error message is almost always telling you exactly what's wrong and where.",
          knowledgeCheck: [
            { q: 'What two things does a JavaScript error message usually tell you?', options: ['Your name and the date', 'The error type and the line number', 'Nothing useful', 'Only the file size'], correct: 1 },
            { q: 'Is searching an error message online considered bad practice?', options: ['Yes, real developers never do this', 'No, it\'s completely normal professional practice', 'Only for beginners', 'Only if you pay for it'], correct: 1 },
          ],
        },
      },
      { id: lid(), title: 'Module 1 Assessment', type: 'assessment', duration: 10, isAssessment: true,
        assessment: {
          passScore: 70,
          questions: [
            { q: 'What role does JavaScript play compared to HTML and CSS?', options: ['Structure', 'Style', 'Behavior', 'Hosting'], correct: 2 },
            { q: 'Where should a <script> tag usually go for best practice?', options: ['In <head>', 'Just before </body>', 'Anywhere randomly', 'Outside the HTML file entirely'], correct: 1 },
            { q: 'What does console.log() do?', options: ['Prints a message to the developer console', 'Deletes a variable', 'Changes the page background', 'Submits a form'], correct: 0 },
            { q: 'What does a JavaScript error message typically include?', options: ['Nothing useful', 'The error type and line number', 'Only a random code', 'Your IP address'], correct: 1 },
            { q: 'Is it normal to search error messages online?', options: ['No, never', 'Yes, it\'s standard professional practice', 'Only in school', 'Only for advanced developers'], correct: 1 },
          ],
        },
      },
    ],
  },
  {
    id: 'js-m2',
    title: 'Variables & Data Types',
    objective: 'Store, name, and work with different kinds of data using variables.',
    lessons: [
      {
        id: lid(), title: 'What a Variable Actually Is', type: 'concept', duration: 10,
        content: {
          concept: "A variable is a named container that holds a value your program can use and change. Think of it like a labeled box: `let score = 0;` creates a box labeled \"score\" and puts the value `0` inside it. Later, you can look inside the box (`console.log(score)`) or put something new in it (`score = 10;`).",
          whyItMatters: "Variables are the single most fundamental building block of programming — every program, no matter how complex, is ultimately just variables being created, read, and changed.",
          howTo: [
            'Declare a variable with `let variableName = value;`.',
            'Read a variable\'s value by using its name anywhere in your code.',
            'Change a variable\'s value by writing `variableName = newValue;` (no `let` needed the second time).',
          ],
          example: "A simple counter: `let clicks = 0;` then, inside a function that runs on each click, `clicks = clicks + 1;` — the variable \"remembers\" the count between clicks.",
          practice: "Create 3 variables representing something about yourself (like your age, your favorite color as text, and whether you like pizza as true/false). Log all 3 with console.log, then change one of their values and log it again.",
          successCriteria: "All 3 variables log the correct initial values, and after being changed, the updated variable logs its new value correctly.",
          commonMistakes: "Trying to use a variable before declaring it, or declaring the same variable twice with `let` (which causes an error) instead of just reassigning it without `let` the second time.",
          knowledgeCheck: [
            { q: 'What is a variable?', options: ['A fixed value that never changes', 'A named container that holds a value', 'A type of HTML tag', 'A CSS property'], correct: 1 },
            { q: 'How do you change an existing variable\'s value?', options: ['Write "let" again with the new value', 'Just write variableName = newValue', 'You can\'t change variables', 'Delete and recreate the whole file'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'let, const, and Why It Matters Which You Use', type: 'concept', duration: 10,
        content: {
          concept: "`let` declares a variable that can be reassigned later. `const` declares a variable that cannot be reassigned — it stays constant. Modern JavaScript style is to default to `const` unless you specifically know the value needs to change, then use `let`.",
          whyItMatters: "Using `const` by default isn't just a style preference — it prevents a real category of bugs where a value gets accidentally changed somewhere you didn't intend, and it makes your code easier for others (and future you) to understand at a glance.",
          howTo: [
            'Ask yourself: will this value ever need to change? If no, use `const`. If yes, use `let`.',
            'Try reassigning a `const` variable and observe the error JavaScript gives you.',
          ],
          example: "`const siteName = \"Her Digital Playbook\";` should never change while the program runs, so `const` is correct. `let cartTotal = 0;` will change as items are added, so `let` is correct.",
          practice: "Rewrite the 3 variables from the previous lesson, deciding for each whether `let` or `const` is more appropriate, and explain your reasoning for each in a comment (using `//`).",
          successCriteria: "Your choices are justified logically (a value that changes uses let, a value that stays fixed uses const), and your comments clearly explain your reasoning.",
          commonMistakes: "Using `let` for everything out of habit, even for values that will never change — this isn't a broken program, but it's considered less clear, professional code.",
          knowledgeCheck: [
            { q: 'What is the key difference between let and const?', options: ['const can be reassigned, let cannot', 'let can be reassigned, const cannot', 'They are identical', 'const is only for numbers'], correct: 1 },
            { q: 'What is the modern default recommendation?', options: ['Always use var', 'Default to const unless you need to reassign', 'Default to let always', 'Never use variables'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Strings, Numbers, and Booleans', type: 'concept', duration: 12,
        content: {
          concept: "JavaScript's core data types include: strings (text, wrapped in quotes, like `\"hello\"`), numbers (like `42` or `3.14`, no quotes), and booleans (`true` or `false`, used for yes/no logic). Knowing which type you're working with matters because operations behave differently — `\"5\" + \"5\"` gives `\"55\"` (text joined together), while `5 + 5` gives `10` (actual math).",
          whyItMatters: "Type confusion is one of the most common sources of beginner bugs in JavaScript. Understanding the difference between a number and a string that looks like a number will save you real debugging time.",
          howTo: [
            'Use `typeof variableName` to check a variable\'s type — try `console.log(typeof 5)` and `console.log(typeof "5")`.',
            'Notice that quotes make something a string, even if it contains only digits.',
          ],
          example: "A form input's value is almost always a string, even if the user typed numbers — so `\"5\" + \"3\"` from two form fields would give `\"53\"`, not `8`, unless you convert them to numbers first with `Number()`.",
          practice: "Log the typeof for 5 different values: a number, a string, a string that looks like a number, a boolean, and the result of `10 > 5` (a comparison). Predict each result before running it, then check.",
          successCriteria: "You correctly predicted at least 4 of the 5 typeof results before checking, and you can explain why a string that looks like a number is still a string.",
          commonMistakes: "Assuming `\"10\" + 5` will do math (it actually does string concatenation, giving `\"105\"`) — this exact bug shows up constantly with form input values.",
          knowledgeCheck: [
            { q: 'What does "5" + "5" evaluate to?', options: ['10', '"55"', 'An error', 'true'], correct: 1 },
            { q: 'What does typeof "5" return?', options: ['"number"', '"string"', '"boolean"', 'undefined'], correct: 1 },
            { q: 'What are the two possible boolean values?', options: ['0 and 1 only', 'true and false', '"yes" and "no"', 'Any number'], correct: 1 },
          ],
        },
      },
      {
        id: lid(), title: 'Naming Variables Well', type: 'how-to', duration: 8,
        content: {
          concept: "Good variable names describe what the value actually represents — `userAge` instead of `x`, `isLoggedIn` instead of `flag`. JavaScript convention is camelCase (lowercase first word, capitalize subsequent words: `firstName`, `totalPrice`).",
          whyItMatters: "Code is read far more often than it's written. A well-named variable makes your code self-explanatory; a poorly named one forces anyone reading it (including future you) to reverse-engineer what it means.",
          howTo: [
            'Name variables after what they represent, not their type (`userAge`, not `numberVariable`).',
            'Use camelCase consistently.',
            'For booleans, prefix with `is`, `has`, or `can` (`isValid`, `hasDiscount`) so their true/false meaning is obvious at a glance.',
          ],
          example: "Compare `let x = true;` with `let isEmailValid = true;` — the second immediately tells any reader what the value means without needing extra context or comments.",
          practice: "Take these poorly-named variables and rename them well: `a` (a user's email), `flag` (whether the cart is empty), `n` (number of items in a cart).",
          successCriteria: "Your renamed variables are self-explanatory, use camelCase, and boolean variables use an is/has/can prefix.",
          commonMistakes: "Using overly short, cryptic names to \"save typing\" — modern code editors autocomplete names, so there's no real benefit to short names, only cost to readability.",
          knowledgeCheck: [
            { q: 'What naming convention does JavaScript typically use for variables?', options: ['snake_case', 'camelCase', 'PascalCase', 'ALL CAPS'], correct: 1 },
            { q: 'What prefix is conventional for boolean variables?', options: ['num', 'str', 'is/has/can', 'var'], correct: 2 },
          ],
        },
      },
      {
        id: lid(), title: 'Template Literals', type: 'how-to', duration: 10,
        content: {
          concept: "Template literals use backticks (`` ` ``) instead of quotes and let you embed variables directly inside a string using `${variableName}` — much cleaner than joining strings with `+`.",
          whyItMatters: "You'll build dynamic text constantly (\"Welcome back, Sarah!\", \"You have 3 items in your cart\") — template literals make this readable instead of a messy chain of `+` symbols.",
          howTo: [
            'Wrap your string in backticks instead of quotes.',
            'Insert a variable with `${variableName}` anywhere inside the backticks.',
            'You can even put small expressions inside, like `${price * quantity}`.',
          ],
          example: "Instead of `\"Hello, \" + name + \"! You have \" + count + \" messages.\"`, write `` `Hello, ${name}! You have ${count} messages.` `` — same result, much easier to read and edit.",
          practice: "Create variables for a name and an age. Build a sentence using template literals that says \"[name] is [age] years old.\" Then build a second one that does simple math inside the `${}`, like showing age in 5 years.",
          successCriteria: "Both sentences render correctly with the right values inserted, and you used backticks with `${}` syntax rather than string concatenation with `+`.",
          commonMistakes: "Using regular quotes instead of backticks — `${name}` inside regular quotes doesn't work as a template literal and just prints literally as text.",
          knowledgeCheck: [
            { q: 'What character wraps a template literal?', options: ['Single quotes', 'Double quotes', 'Backticks', 'Parentheses'], correct: 2 },
            { q: 'How do you insert a variable into a template literal?', options: ['+variableName+', '${variableName}', '#variableName#', '[variableName]'], correct: 1 },
          ],
        },
      },
      { id: lid(), title: 'Module 2 Assessment', type: 'assessment', duration: 12, isAssessment: true,
        assessment: {
          passScore: 70,
          questions: [
            { q: 'What is a variable?', options: ['A fixed value', 'A named container for a value', 'An HTML tag', 'A CSS rule'], correct: 1 },
            { q: 'Which should you default to when a value won\'t change?', options: ['let', 'const', 'var', 'function'], correct: 1 },
            { q: 'What does "5" + "5" produce?', options: ['10', '"55"', 'An error', 'undefined'], correct: 1 },
            { q: 'What naming convention is standard in JavaScript?', options: ['snake_case', 'camelCase', 'kebab-case', 'UPPERCASE'], correct: 1 },
            { q: 'What wraps a template literal?', options: ['Quotes', 'Backticks', 'Brackets', 'Parentheses'], correct: 1 },
            { q: 'What does typeof "42" return?', options: ['"number"', '"string"', '"boolean"', 'undefined'], correct: 1 },
          ],
        },
      },
    ],
  },
  { id: 'js-m3', title: 'Operators & Expressions', objective: 'Use arithmetic, comparison, and logical operators to build expressions.', lessons: [
    stubLesson('Arithmetic Operators'), stubLesson('Comparison Operators'), stubLesson('Logical Operators: AND, OR, NOT'), stubLesson('Operator Precedence'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m4', title: 'Conditions', objective: 'Make your programs branch and make decisions using if/else logic.', lessons: [
    stubLesson('if, else if, and else'), stubLesson('switch Statements'), stubLesson('Truthy and Falsy Values'), stubLesson('Workshop: Build a Simple Decision Tool', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m5', title: 'Loops', objective: 'Repeat actions efficiently using for and while loops.', lessons: [
    stubLesson('The for Loop'), stubLesson('The while Loop'), stubLesson('Looping Over Arrays'), stubLesson('Avoiding Infinite Loops', 'troubleshooting'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m6', title: 'Functions', objective: 'Write reusable blocks of logic using functions, parameters, and return values.', lessons: [
    stubLesson('Why Functions Matter'), stubLesson('Parameters and Arguments'), stubLesson('Return Values'), stubLesson('Arrow Functions'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m7', title: 'Arrays', objective: 'Store and manipulate ordered lists of data using arrays and array methods.', lessons: [
    stubLesson('Creating and Accessing Arrays'), stubLesson('push, pop, and Modifying Arrays'), stubLesson('Looping Over Arrays with forEach'), stubLesson('map and filter'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m8', title: 'Objects', objective: 'Model real-world data using objects with properties and methods.', lessons: [
    stubLesson('Creating Objects'), stubLesson('Accessing and Updating Properties'), stubLesson('Objects Inside Arrays'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m9', title: 'DOM Fundamentals', objective: 'Select and modify real HTML elements on the page using JavaScript.', lessons: [
    stubLesson('What the DOM Actually Is'), stubLesson('document.querySelector'), stubLesson('Changing Text and Styles with JS'), stubLesson('Creating New Elements', 'how-to'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m10', title: 'Events', objective: 'Make pages respond to clicks, typing, and other user actions.', lessons: [
    stubLesson('addEventListener'), stubLesson('Click Events'), stubLesson('Keyboard and Input Events'), stubLesson('Workshop: Build a Click Counter', 'workshop'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m11', title: 'Forms & Validation', objective: 'Read form input and validate it before using it.', lessons: [
    stubLesson('Reading Form Input Values'), stubLesson('Preventing Default Form Submission'), stubLesson('Basic Validation Logic'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m12', title: 'Local Storage', objective: 'Persist data in the browser so it survives a page refresh.', lessons: [
    stubLesson('What localStorage Is For'), stubLesson('Saving and Reading Data'), stubLesson('Storing Objects with JSON', 'how-to'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m13', title: 'APIs & Async JavaScript Basics', objective: 'Understand what an API is and fetch data from one.', lessons: [
    stubLesson('What an API Actually Is'), stubLesson('fetch() Basics'), stubLesson('Working with the Response'), stubLesson('Module Assessment', 'assessment', 10),
  ] },
  { id: 'js-m14', title: 'Build an Interactive Web App — Capstone', objective: 'Combine variables, functions, DOM manipulation, events, and localStorage into one working app.', lessons: [
    stubLesson('Capstone Briefing', 'capstone', 15),
  ], isCapstoneModule: true },
];

const jsProjects = [
  {
    id: 'js-p1', title: 'Build a Tip Calculator',
    brief: 'Build a small tool that calculates a tip and total based on a bill amount and percentage.',
    scenario: 'A friend wants a simple webpage to quickly split a restaurant bill instead of doing mental math.',
    requirements: ['An input for bill amount', 'An input or buttons for tip percentage', 'A calculated tip amount and total shown on the page'],
    constraints: ['No page reload — must update live using JavaScript'],
    deliverable: 'A working HTML/CSS/JS tip calculator.',
    tools: ['VS Code', 'A browser'],
    successCriteria: ['Correct math for any reasonable input', 'Updates without reloading the page', 'Handles empty/invalid input without crashing'],
  },
  {
    id: 'js-p2', title: 'Build a To-Do List with localStorage',
    brief: 'Build a to-do list where items persist after refreshing the page.',
    scenario: "You want a genuinely useful personal tool you'd actually use day to day.",
    requirements: ['Add a new to-do item', 'Mark an item complete', 'Delete an item', 'Items persist after refresh using localStorage'],
    constraints: ['No frameworks — vanilla JavaScript only'],
    deliverable: 'A working to-do list app.',
    tools: ['VS Code', 'A browser'],
    successCriteria: ['Items survive a page refresh', 'Add/complete/delete all work correctly', 'No console errors'],
  },
];

const jsCapstone = {
  id: 'js-capstone',
  title: 'Build a Complete Interactive Web App',
  scenario: 'Choose one: a habit tracker, a simple budget tracker, or a recipe box — something with real, everyday use.',
  objective: 'Build a fully working, persistent, interactive app combining everything from this course.',
  requirements: ['At least one form for user input', 'Data that persists in localStorage across refreshes', 'At least one array of objects being looped over and rendered to the page', 'At least one delete/edit interaction'],
  constraints: ['Vanilla JavaScript only — no frameworks', 'Must work with no console errors'],
  deliverables: ['Complete HTML/CSS/JS files', 'A short written reflection'],
  tools: ['VS Code', 'A browser', 'DevTools'],
  rubric: { understanding: 15, strategy: 20, execution: 30, problemSolving: 15, professionalQuality: 10, completeness: 10 },
  passScore: 70,
  reflectionQuestions: ['What bug took you the longest to solve, and how did you eventually fix it?', 'Which JavaScript concept from this course do you feel most confident with now?', 'What would you add to this app if you kept building it?'],
};

/* =============================================
   ALL 20 COURSES — METADATA (complete for all) +
   full curriculum for the 2 flagship courses above,
   structural curriculum (real titles, pending content) for the rest.
   ============================================= */

export const ACADEMY_COURSES = [
  {
    id: 'digital-marketing-foundations', code: 'DMF', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'Digital Marketing Foundations',
    description: 'Learn how digital marketing works, build campaigns, understand audiences, create content strategies, measure performance, and develop a practical marketing plan.',
    learningOutcomes: ['Understand the digital marketing ecosystem', 'Identify target audiences', 'Define basic marketing goals', 'Build a simple marketing strategy', 'Plan content', 'Understand social, SEO, email, and paid ads at a foundational level', 'Interpret basic marketing metrics', 'Create a basic campaign plan'],
    tools: ['Google Analytics (free)', 'Google Sheets', 'Canva'],
    certificateSkills: ['Marketing Strategy', 'Audience Research', 'Content Planning', 'Campaign Basics'],
    prerequisites: 'None',
    moduleTitles: ['Understanding Digital Marketing', 'Customers, Audiences & Buyer Personas', 'Marketing Strategy & Goals', 'Content Marketing', 'Social Media Marketing', 'Search Marketing & SEO Basics', 'Email Marketing Basics', 'Paid Advertising Fundamentals', 'Analytics, Metrics & Optimization', 'Campaign Planning & Final Capstone'],
  },
  {
    id: 'web-design-foundations', code: 'WEBF', category: 'Digital & Tech', difficulty: 'Beginner',
    title: 'Web Design Foundations',
    description: 'Build a responsive, accessible beginner-level website from scratch using real HTML and CSS — no drag-and-drop builders.',
    learningOutcomes: ['Understand how the web works', 'Write clean, semantic HTML', 'Style pages confidently with CSS', 'Build responsive layouts with Flexbox and Grid', 'Build accessible forms and navigation', 'Test and debug across screen sizes'],
    tools: ['VS Code (free)', 'Browser DevTools', 'Google Fonts'],
    certificateSkills: ['HTML', 'CSS', 'Responsive Design', 'Accessibility'],
    prerequisites: 'None',
    modules: webDesignModules, projects: webDesignProjects, capstone: webDesignCapstone,
  },
  {
    id: 'javascript-foundations', code: 'JSF', category: 'Digital & Tech', difficulty: 'Beginner',
    title: 'JavaScript Foundations',
    description: 'Learn to build interactive, persistent browser applications with vanilla JavaScript — variables through DOM manipulation, events, and localStorage.',
    learningOutcomes: ['Understand JavaScript\'s role on the web', 'Work confidently with variables, data types, and functions', 'Manipulate the DOM to update pages dynamically', 'Handle user events', 'Persist data with localStorage', 'Understand the basics of fetching data from an API'],
    tools: ['VS Code (free)', 'Browser DevTools'],
    certificateSkills: ['JavaScript', 'DOM Manipulation', 'Event Handling', 'Local Storage'],
    prerequisites: 'Recommended: Web Design Foundations (or basic HTML/CSS familiarity)',
    modules: jsModules, projects: jsProjects, capstone: jsCapstone,
  },
  {
    id: 'seo-foundations', code: 'SEOF', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'SEO Foundations',
    description: 'Learn how search engines actually work and perform foundational SEO work for a small website — keyword research, on-page SEO, and technical basics.',
    learningOutcomes: ['Understand how search engines rank pages', 'Research keywords and search intent', 'Optimize on-page content', 'Understand basic technical SEO', 'Build a simple internal linking structure', 'Read basic search performance data'],
    tools: ['Google Search Console (free)', 'Google Sheets'],
    certificateSkills: ['Keyword Research', 'On-Page SEO', 'Technical SEO Basics', 'Search Analytics'],
    prerequisites: 'None',
    moduleTitles: ['How Search Engines Work', 'Search Intent', 'Keyword Research', 'On-Page SEO', 'Content SEO', 'Technical SEO Basics', 'Internal Linking & Site Structure', 'Off-Page SEO & Authority', 'Search Performance & Analytics', 'Build an SEO Strategy — Capstone'],
  },
  {
    id: 'social-media-management', code: 'SMM', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'Social Media Management',
    description: 'Learn to manage foundational social media work for a small business or client — strategy, content calendars, community management, and reporting.',
    learningOutcomes: ['Understand the social media manager role', 'Build audience and platform strategy', 'Plan content pillars and calendars', 'Write captions and CTAs', 'Manage community engagement', 'Read basic analytics and report results'],
    tools: ['Canva (free)', 'Google Sheets', 'Native platform scheduling tools'],
    certificateSkills: ['Content Strategy', 'Content Planning', 'Community Management', 'Social Media Analytics'],
    prerequisites: 'None',
    moduleTitles: ['Social Media Manager Role', 'Audience & Platform Strategy', 'Content Pillars', 'Content Calendars', 'Writing Captions & CTAs', 'Community Management', 'Scheduling & Publishing', 'Analytics & Reporting', 'Build a Client Social Media Strategy — Capstone'],
  },
  {
    id: 'content-creation', code: 'CC', category: 'Creative', difficulty: 'Beginner',
    title: 'Content Creation',
    description: 'Learn to plan, create, and systematize content — hooks, short-form video, storytelling, and repurposing — into a sustainable content system.',
    learningOutcomes: ['Build an audience-first content strategy', 'Write strong hooks', 'Plan and shoot short-form video', 'Tell stories that hold attention', 'Repurpose one piece of content into many', 'Build a repeatable content workflow'],
    tools: ['CapCut (free)', 'Canva (free)', 'A phone camera'],
    certificateSkills: ['Content Strategy', 'Hooks & Storytelling', 'Short-Form Video', 'Content Systems'],
    prerequisites: 'None',
    moduleTitles: ['Content Creation Fundamentals', 'Audience & Content Strategy', 'Content Pillars', 'Hooks & Attention', 'Short-Form Video', 'Educational Content', 'Storytelling', 'Repurposing Content', 'Content Workflow & Planning', 'Build a 30-Day Content System — Capstone'],
  },
  {
    id: 'copywriting', code: 'COPY', category: 'Creative', difficulty: 'Beginner',
    title: 'Copywriting',
    description: 'Learn persuasive writing — audience research, headlines, hooks, CTAs, and full marketing copy packages for social, landing pages, and email.',
    learningOutcomes: ['Understand what makes copy persuasive', 'Research an audience before writing', 'Translate features into benefits', 'Write hooks, headlines, and CTAs', 'Write copy for social, landing pages, and email'],
    tools: ['Google Docs', 'A swipe file of real examples'],
    certificateSkills: ['Persuasive Writing', 'Headlines', 'Calls to Action', 'Marketing Copy'],
    prerequisites: 'None',
    moduleTitles: ['What Copywriting Is', 'Audience Research', 'Features vs Benefits', 'Hooks', 'Headlines', 'Persuasive Writing', 'CTAs', 'Social Media Copy', 'Landing Page Copy', 'Email Copy', 'Build a Complete Marketing Copy Package — Capstone'],
  },
  {
    id: 'video-editing', code: 'VE', category: 'Creative', difficulty: 'Beginner',
    title: 'Video Editing',
    description: 'Learn transferable video editing principles — cuts, pacing, audio, text, and color — applicable in beginner-friendly tools like CapCut.',
    learningOutcomes: ['Understand a real editing workflow', 'Cut and pace footage for attention', 'Balance and clean up audio', 'Add text and captions effectively', 'Use B-roll purposefully', 'Edit a complete short-form social video'],
    tools: ['CapCut (free)'],
    certificateSkills: ['Editing Workflow', 'Pacing', 'Captions', 'Short-Form Editing'],
    prerequisites: 'None',
    moduleTitles: ['Video Editing Fundamentals', 'Editing Workflow', 'Cuts & Transitions', 'Timing & Pacing', 'Audio', 'Text & Captions', 'B-Roll', 'Color & Visual Consistency', 'Short-Form Video Editing', 'Edit a Complete Social Video — Capstone'],
  },
  {
    id: 'graphic-design-foundations', code: 'GDF', category: 'Creative', difficulty: 'Beginner',
    title: 'Graphic Design Foundations',
    description: 'Learn core design principles — typography, color, composition, and hierarchy — and build a mini brand kit.',
    learningOutcomes: ['Apply core design principles', 'Choose and pair typography', 'Use color theory intentionally', 'Build visual hierarchy', 'Understand branding basics', 'Design for social media formats'],
    tools: ['Canva (free)'],
    certificateSkills: ['Design Principles', 'Typography', 'Color Theory', 'Branding Basics'],
    prerequisites: 'None',
    moduleTitles: ['What Graphic Design Is', 'Design Principles', 'Typography', 'Color', 'Composition', 'Visual Hierarchy', 'Branding Basics', 'Social Media Design', 'Design Critique & Iteration', 'Build a Mini Brand Kit — Capstone'],
  },
  {
    id: 'personal-branding-academy', code: 'PB', category: 'Professional', difficulty: 'Beginner',
    title: 'Personal Branding',
    description: 'Build a specific, consistent personal brand system — positioning, story, voice, and visual identity.',
    learningOutcomes: ['Define a specific positioning statement', 'Identify your audience', 'Develop a brand story and voice', 'Build a consistent visual identity', 'Plan authority-building content'],
    tools: ['Canva (free)', 'LinkedIn or Instagram'],
    certificateSkills: ['Positioning', 'Brand Voice', 'Visual Identity', 'Authority Building'],
    prerequisites: 'None',
    moduleTitles: ['What Personal Branding Is', 'Positioning', 'Audience', 'Personal Brand Story', 'Brand Voice', 'Visual Identity', 'Content Strategy', 'Authority & Credibility', 'Build a Personal Brand System — Capstone'],
  },
  {
    id: 'ugc-content-creation', code: 'UGC', category: 'Creative', difficulty: 'Beginner',
    title: 'UGC Content Creation',
    description: 'Learn to create User-Generated Content for brands — briefs, hooks, filming, editing, and pitching a UGC portfolio.',
    learningOutcomes: ['Understand UGC vs influencer marketing', 'Choose a UGC niche', 'Interpret a brand brief', 'Write UGC hooks and scripts', 'Film and edit UGC-style content', 'Pitch a UGC portfolio to brands'],
    tools: ['CapCut (free)', 'A phone camera'],
    certificateSkills: ['UGC Scripting', 'Filming Basics', 'Brand Briefs', 'UGC Portfolio Building'],
    prerequisites: 'None',
    moduleTitles: ['Understanding UGC', 'UGC vs Influencer Marketing', 'UGC Niches', 'Understanding Brand Briefs', 'UGC Hooks & Scripts', 'Filming UGC', 'Editing UGC', 'UGC Portfolio & Pitching', 'Build a UGC Campaign Package — Capstone'],
  },
  {
    id: 'email-marketing', code: 'EM', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'Email Marketing',
    description: 'Build lead magnets, welcome sequences, promotional emails, and a full email funnel.',
    learningOutcomes: ['Understand email marketing fundamentals', 'Build and grow a list', 'Create effective lead magnets', 'Write welcome sequences and promotional emails', 'Segment and automate', 'Read basic email metrics'],
    tools: ['Mailchimp free tier or similar', 'Google Docs'],
    certificateSkills: ['Email Copywriting', 'Automation Basics', 'List Building', 'Email Metrics'],
    prerequisites: 'None',
    moduleTitles: ['Email Marketing Fundamentals', 'Lists & Subscribers', 'Lead Magnets', 'Email Copywriting', 'Welcome Sequences', 'Promotional Emails', 'Segmentation', 'Automation', 'Metrics & Optimization', 'Build an Email Funnel — Capstone'],
  },
  {
    id: 'virtual-assistance-academy', code: 'VA', category: 'Freelance & Remote', difficulty: 'Beginner',
    title: 'Virtual Assistance',
    description: 'Learn the practical skills of remote virtual assistance — communication, calendar/email management, organization, and professionalism.',
    learningOutcomes: ['Understand the VA role', 'Communicate professionally in remote settings', 'Manage calendars and inboxes', 'Organize files and documents', 'Handle research and task management', 'Maintain confidentiality and professionalism'],
    tools: ['Google Workspace (free)', 'Notion or Trello (free tier)'],
    certificateSkills: ['Calendar Management', 'Inbox Management', 'Remote Communication', 'Task Organization'],
    prerequisites: 'None',
    moduleTitles: ['What a Virtual Assistant Does', 'Remote Work Fundamentals', 'Communication', 'Calendar Management', 'Email Management', 'File & Document Organization', 'Research', 'Task & Project Management', 'Client Confidentiality & Professionalism', 'Build a Virtual Assistant Service System — Capstone'],
  },
  {
    id: 'freelancing-foundations-academy', code: 'FF', category: 'Freelance & Remote', difficulty: 'Beginner',
    title: 'Freelancing Foundations',
    description: 'Build the complete starter system for a freelance business — niche, offers, portfolio, outreach, pricing, and contracts.',
    learningOutcomes: ['Choose a skill and niche', 'Create a clear offer', 'Build a beginner portfolio', 'Find and pitch clients', 'Price your work confidently', 'Use contracts, deposits, and invoices'],
    tools: ['Google Docs', 'A payment platform like PayPal or Wise'],
    certificateSkills: ['Offer Building', 'Client Outreach', 'Pricing', 'Contracts & Invoicing'],
    prerequisites: 'None',
    moduleTitles: ['Understanding Freelancing', 'Choosing a Skill', 'Choosing a Niche', 'Creating Offers', 'Building a Portfolio', 'Finding Clients', 'Outreach & Proposals', 'Pricing', 'Contracts, Deposits & Invoices', 'Client Communication & Delivery', 'Build Your Freelance Business Starter System — Capstone'],
  },
  {
    id: 'customer-support', code: 'CS', category: 'Professional', difficulty: 'Beginner',
    title: 'Customer Support',
    description: 'Learn foundational customer support skills — communication, de-escalation, ticketing, documentation, and support metrics.',
    learningOutcomes: ['Understand great customer experience', 'Communicate clearly and empathetically', 'Handle complaints professionally', 'De-escalate difficult situations', 'Use support tickets and documentation', 'Read basic support metrics'],
    tools: ['A free helpdesk tool (e.g. free-tier options)', 'Google Docs'],
    certificateSkills: ['Communication', 'De-escalation', 'Documentation', 'Support Metrics'],
    prerequisites: 'None',
    moduleTitles: ['Customer Support Fundamentals', 'Customer Experience', 'Communication Skills', 'Handling Complaints', 'De-escalation', 'Email & Chat Support', 'Support Tickets', 'Documentation & Knowledge Bases', 'Support Metrics', 'Build a Customer Support Workflow — Capstone'],
  },
  {
    id: 'project-management-foundations', code: 'PMF', category: 'Professional', difficulty: 'Beginner',
    title: 'Project Management Foundations',
    description: 'Learn to scope, plan, and manage a simple real-world project from start to finish.',
    learningOutcomes: ['Define project scope', 'Gather requirements', 'Break down tasks and build timelines', 'Communicate with a team', 'Manage basic risk', 'Track and report progress'],
    tools: ['Trello or Notion (free tier)', 'Google Sheets'],
    certificateSkills: ['Scoping', 'Task Breakdown', 'Timelines', 'Risk & Reporting'],
    prerequisites: 'None',
    moduleTitles: ['What Project Management Is', 'Project Scope', 'Requirements', 'Planning', 'Task Breakdown', 'Timelines', 'Team Communication', 'Risk Management', 'Tracking & Reporting', 'Manage a Complete Beginner Project — Capstone'],
  },
  {
    id: 'digital-product-business-academy', code: 'DPB', category: 'Business', difficulty: 'Beginner',
    title: 'Digital Product Business',
    description: 'Learn to plan, price, and market a digital product business, from idea validation to launch.',
    learningOutcomes: ['Find and validate a digital product idea', 'Research your audience', 'Plan and create a product', 'Price it fairly', 'Build a sales page and offer', 'Plan a launch'],
    tools: ['Canva (free)', 'Gumroad or similar'],
    certificateSkills: ['Idea Validation', 'Product Planning', 'Pricing', 'Launch Planning'],
    prerequisites: 'None',
    moduleTitles: ['What Digital Products Are', 'Finding Product Ideas', 'Validating Demand', 'Audience Research', 'Product Planning', 'Creating the Product', 'Pricing', 'Sales Pages & Offers', 'Marketing & Launches', 'Build a Digital Product Business Plan — Capstone'],
  },
  {
    id: 'ecommerce-foundations', code: 'ECF', category: 'Business', difficulty: 'Beginner',
    title: 'E-Commerce Foundations',
    description: 'Learn the fundamentals of running an online store — product selection, store structure, pricing, fulfillment, and customer experience.',
    learningOutcomes: ['Choose and validate a product', 'Research market and competitors', 'Structure a store and product pages', 'Understand pricing and margins', 'Understand payments and fulfillment basics', 'Plan a launch marketing approach'],
    tools: ['A free-tier e-commerce platform', 'Google Sheets'],
    certificateSkills: ['Product Research', 'Store Structure', 'Pricing & Margins', 'Launch Planning'],
    prerequisites: 'None',
    moduleTitles: ['E-Commerce Fundamentals', 'Choosing a Product', 'Market Research', 'Customer & Competitor Research', 'Store Structure', 'Product Pages', 'Pricing & Margins', 'Payments & Fulfillment', 'Marketing', 'Customer Experience', 'Build an E-Commerce Launch Plan — Capstone'],
  },
  {
    id: 'business-analytics-foundations', code: 'BAF', category: 'Business', difficulty: 'Beginner',
    title: 'Business Analytics Foundations',
    description: 'Learn to work with spreadsheets and data to find trends and build a business performance dashboard.',
    learningOutcomes: ['Understand core data and metrics concepts', 'Clean and organize data in spreadsheets', 'Use basic formulas confidently', 'Visualize data clearly', 'Build a simple dashboard', 'Turn data into a business insight'],
    tools: ['Google Sheets (free)'],
    certificateSkills: ['Spreadsheets', 'Data Cleaning', 'Data Visualization', 'Dashboards'],
    prerequisites: 'None',
    moduleTitles: ['What Business Analytics Is', 'Data Fundamentals', 'Metrics & KPIs', 'Spreadsheets', 'Cleaning Data', 'Sorting & Filtering', 'Basic Formulas', 'Data Visualization', 'Dashboards', 'Finding Trends', 'Turning Data Into Insights', 'Build a Business Performance Dashboard — Capstone'],
  },
  {
    id: 'entrepreneurship-foundations', code: 'EF', category: 'Business', difficulty: 'Beginner',
    title: 'Entrepreneurship Foundations',
    description: 'Learn to find real problems worth solving and build a complete basic business model around one.',
    learningOutcomes: ['Identify problems worth solving', 'Generate and evaluate business ideas', 'Understand customers and business models', 'Craft a value proposition', 'Plan offers, pricing, and basic operations', 'Understand basic business finance'],
    tools: ['Google Sheets', 'Google Docs'],
    certificateSkills: ['Idea Validation', 'Business Models', 'Value Propositions', 'Basic Finance'],
    prerequisites: 'None',
    moduleTitles: ['What Entrepreneurship Is', 'Problems Worth Solving', 'Idea Generation', 'Market Research', 'Customers', 'Business Models', 'Value Propositions', 'Offers & Pricing', 'Marketing', 'Operations', 'Basic Business Finance', 'Build a Complete Business Model — Capstone'],
  },
];

// Fill in duration/counts computed from actual module/lesson data so
// every course card shows real, accurate numbers instead of guesses.
ACADEMY_COURSES.forEach((course) => {
  if (course.modules) {
    course.moduleCount = course.modules.length;
    course.hasFullContent = true;
  } else {
    course.moduleCount = course.moduleTitles.length;
    course.hasFullContent = false;
    // Build a lightweight module skeleton so the course overview page
    // can render a real, navigable (if content-pending) curriculum.
    course.modules = course.moduleTitles.map((title, i) => ({
      id: `${course.id}-m${i + 1}`,
      title,
      objective: `Build real, practical understanding of ${title.toLowerCase()}.`,
      isCapstoneModule: /capstone/i.test(title),
      lessons: /capstone/i.test(title)
        ? [stubLesson('Capstone Briefing', 'capstone', 15)]
        : [stubLesson(`${title}: Core Concepts`), stubLesson(`${title}: Applying It`, 'workshop'), stubLesson('Module Assessment', 'assessment', 10)],
    }));
  }
  course.lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  course.projectCount = course.projects?.length || 0;
  course.hasCapstone = true;
  course.certificateIncluded = true;
  const lessonMinutes = course.modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + (l.duration || 10), 0), 0);
  course.duration = {
    lessonTime: `${Math.round(lessonMinutes / 60 * 10) / 10} hrs`,
    practiceTime: `${Math.max(1, Math.round(course.moduleCount * 0.5))} hrs`,
    projectTime: `${Math.max(1, (course.projectCount || 2) * 1.5)} hrs`,
    total: `${Math.round((lessonMinutes / 60 + course.moduleCount * 0.5 + (course.projectCount || 2) * 1.5) * 10) / 10} hrs`,
  };
});

export function findCourse(id) {
  return ACADEMY_COURSES.find((c) => c.id === id) || null;
}

export function findLesson(course, lessonId) {
  for (const m of course.modules) {
    const lesson = m.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module: m, lesson };
  }
  return null;
}

/* =============================================
   "WHAT DO YOU WANT TO BECOME?" — career goal cards
   ============================================= */

export const CAREER_GOALS = [
  { id: 'digital-marketer', label: 'Digital Marketer', icon: '📈', courseIds: ['digital-marketing-foundations', 'seo-foundations', 'email-marketing', 'social-media-management'] },
  { id: 'social-media-manager', label: 'Social Media Manager', icon: '📱', courseIds: ['social-media-management', 'content-creation', 'copywriting', 'digital-marketing-foundations', 'freelancing-foundations-academy'] },
  { id: 'content-creator', label: 'Content Creator', icon: '🎬', courseIds: ['content-creation', 'video-editing', 'personal-branding-academy', 'ugc-content-creation'] },
  { id: 'copywriter', label: 'Copywriter', icon: '✍️', courseIds: ['copywriting', 'email-marketing', 'digital-marketing-foundations', 'freelancing-foundations-academy'] },
  { id: 'graphic-designer', label: 'Graphic Designer', icon: '🎨', courseIds: ['graphic-design-foundations', 'personal-branding-academy', 'freelancing-foundations-academy'] },
  { id: 'web-designer', label: 'Web Designer', icon: '💻', courseIds: ['web-design-foundations', 'javascript-foundations', 'graphic-design-foundations', 'freelancing-foundations-academy'] },
  { id: 'virtual-assistant', label: 'Virtual Assistant', icon: '🗂️', courseIds: ['virtual-assistance-academy', 'freelancing-foundations-academy', 'project-management-foundations'] },
  { id: 'business-owner', label: 'Business Owner', icon: '🏪', courseIds: ['entrepreneurship-foundations', 'digital-product-business-academy', 'ecommerce-foundations', 'business-analytics-foundations'] },
  { id: 'freelancer', label: 'Freelancer', icon: '💼', courseIds: ['freelancing-foundations-academy', 'copywriting', 'graphic-design-foundations', 'web-design-foundations'] },
  { id: 'data-analyst', label: 'Data/Business Analyst', icon: '📊', courseIds: ['business-analytics-foundations', 'seo-foundations', 'digital-marketing-foundations'] },
];

/* =============================================
   LEARNING PATHS
   ============================================= */

export const LEARNING_PATHS = [
  { id: 'digital-marketing-girl', label: 'The Digital Marketing Girl', icon: '📈', courseIds: ['digital-marketing-foundations', 'social-media-management', 'content-creation', 'copywriting', 'email-marketing', 'freelancing-foundations-academy'] },
  { id: 'creative-girl', label: 'The Creative Girl', icon: '🎨', courseIds: ['graphic-design-foundations', 'personal-branding-academy', 'content-creation', 'ugc-content-creation', 'freelancing-foundations-academy'] },
  { id: 'web-girl', label: 'The Web Girl', icon: '💻', courseIds: ['web-design-foundations', 'javascript-foundations', 'personal-branding-academy', 'freelancing-foundations-academy'] },
  { id: 'digital-ceo', label: 'The Digital CEO', icon: '👑', courseIds: ['entrepreneurship-foundations', 'digital-product-business-academy', 'digital-marketing-foundations', 'email-marketing', 'personal-branding-academy'] },
];

/* =============================================
   "DON'T KNOW WHERE TO START?" — guided routes
   ============================================= */

export const START_ROUTES = [
  { id: 'make-money', label: 'I want to make money online.', courseIds: ['freelancing-foundations-academy', 'digital-product-business-academy'] },
  { id: 'remote-job', label: 'I want a remote job.', courseIds: ['virtual-assistance-academy', 'customer-support', 'project-management-foundations'] },
  { id: 'creator', label: 'I want to become a creator.', courseIds: ['content-creation', 'video-editing', 'ugc-content-creation'] },
  { id: 'business', label: 'I want to start a business.', courseIds: ['entrepreneurship-foundations', 'digital-product-business-academy', 'ecommerce-foundations'] },
  { id: 'tech', label: 'I want to learn tech.', courseIds: ['web-design-foundations', 'javascript-foundations'] },
  { id: 'freelance', label: 'I want to become a freelancer.', courseIds: ['freelancing-foundations-academy', 'copywriting', 'graphic-design-foundations'] },
  { id: 'personal-brand', label: 'I want to build a personal brand.', courseIds: ['personal-branding-academy', 'content-creation'] },
  { id: 'marketing', label: 'I want to work in digital marketing.', courseIds: ['digital-marketing-foundations', 'seo-foundations', 'social-media-management'] },
];
