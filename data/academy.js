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

   UPDATE: courses are being completed to full real depth one at a
   time. Completed courses are built in their own file under
   data/academy-courses/ and imported below, then wired into the
   course entry in place of the old `moduleTitles`-only stub.
   ============================================= */

import { modules as dmfModules, projects as dmfProjects, capstone as dmfCapstone } from './academy-courses/digital-marketing-foundations.js';
import { modules as smmModules, projects as smmProjects, capstone as smmCapstone } from './academy-courses/social-media-management.js';
import { modules as copyModules, projects as copyProjects, capstone as copyCapstone } from './academy-courses/copywriting.js';
import { modules as vaModules, projects as vaProjects, capstone as vaCapstone } from './academy-courses/virtual-assistance.js';
import { modules as ffModules, projects as ffProjects, capstone as ffCapstone } from './academy-courses/freelancing-foundations.js';
import { modules as pbModules, projects as pbProjects, capstone as pbCapstone } from './academy-courses/personal-branding.js';
import { modules as ccModules, projects as ccProjects, capstone as ccCapstone } from './academy-courses/content-creation.js';
import { modules as gdfModules, projects as gdfProjects, capstone as gdfCapstone } from './academy-courses/graphic-design-foundations.js';
import { modules as emModules, projects as emProjects, capstone as emCapstone } from './academy-courses/email-marketing.js';
import { modules as ugcModules, projects as ugcProjects, capstone as ugcCapstone } from './academy-courses/ugc-content-creation.js';
import { modules as csModules, projects as csProjects, capstone as csCapstone } from './academy-courses/customer-support.js';
import { modules as pmfModules, projects as pmfProjects, capstone as pmfCapstone } from './academy-courses/project-management-foundations.js';
import { modules as dpbModules, projects as dpbProjects, capstone as dpbCapstone } from './academy-courses/digital-product-business.js';
import { modules as ecfModules, projects as ecfProjects, capstone as ecfCapstone } from './academy-courses/ecommerce-foundations.js';
import { modules as bafModules, projects as bafProjects, capstone as bafCapstone } from './academy-courses/business-analytics-foundations.js';
import { modules as efModules, projects as efProjects, capstone as efCapstone } from './academy-courses/entrepreneurship-foundations.js';
import { modules as seofModules, projects as seofProjects, capstone as seofCapstone } from './academy-courses/seo-foundations.js';
import { modules as veModules, projects as veProjects, capstone as veCapstone } from './academy-courses/video-editing.js';

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

// Real lesson / assessment helpers (used to complete modules 3+ of the
// flagship courses with full, non-stub content).
function rl(title, type, c, duration = 12) {
  return {
    id: lid(), title, type, duration,
    content: {
      concept: c.concept, whyItMatters: c.why, howTo: c.howTo, example: c.example,
      practice: c.practice, successCriteria: c.success, commonMistakes: c.mistake,
      knowledgeCheck: c.checks,
    },
  };
}
function ra(questions, title = 'Module Assessment') {
  return { id: lid(), title, type: 'assessment', duration: 10, isAssessment: true, assessment: { passScore: 70, questions } };
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
    rl('Why Semantic HTML Matters', 'concept', {
      concept: "Semantic HTML means using tags that describe the actual meaning of content (like <nav>, <article>, <button>) instead of generic <div>s for everything — the browser, screen readers, and search engines all use these meanings, not just visual styling.",
      why: "A page built entirely from unlabeled <div>s might look fine visually but is far harder for screen readers to navigate and for search engines to understand, hurting both accessibility and SEO.",
      example: "<div class=\"nav\"> tells nothing to a screen reader about its purpose; <nav> immediately identifies it as navigation, letting assistive tech announce it correctly.",
      practice: "List 3 div-based patterns you've seen (a nav bar, an article, a footer) and name the semantic tag that should replace each.",
      success: "Your 3 answers correctly match semantic tags to their real-world use case.",
      mistake: "Using <div> for everything because it's visually flexible, ignoring the meaning a semantic tag would communicate.",
      checks: [{ q: 'Semantic HTML tags mainly help because they:', options: ['Look different visually by default', 'Communicate real meaning to browsers, screen readers, and search engines', 'Are required for CSS to work at all', 'Replace the need for CSS entirely'], correct: 1 }],
    }),
    rl('Header, Nav, and Footer', 'how-to', {
      concept: "<header> wraps introductory/branding content (often a logo and site title), <nav> wraps primary navigation links, and <footer> wraps closing content (copyright, secondary links) — each has a clear, standard role on a page.",
      why: "Using these three consistently gives every page a predictable, recognizable structure that both users and assistive technology can rely on.",
      howTo: [
        'Wrap the top branding/logo area in <header>.',
        'Wrap the primary navigation links in <nav>, usually inside or near the header.',
        'Wrap the bottom closing content in <footer>.',
      ],
      example: "<header><h1>My Site</h1><nav><a href=\"/\">Home</a><a href=\"/about\">About</a></nav></header> ... <footer>&copy; 2026</footer>",
      practice: "Write the HTML skeleton for a header (with a site title and 2 nav links) and a footer (with a copyright line).",
      success: "Your markup correctly nests the nav links inside <nav>, itself inside or near <header>, with a separate <footer>.",
      mistake: "Wrapping navigation links in a generic <div> instead of <nav>.",
      checks: [{ q: '<nav> should be used to wrap:', options: ['Any block of content', 'The primary navigation links of a page', 'Only footer content', 'Only images'], correct: 1 }],
    }),
    rl('Main, Article, and Section', 'how-to', {
      concept: "<main> wraps the primary unique content of a page (used once per page), <article> wraps a self-contained piece of content that could stand alone (like a blog post), and <section> groups related content within a larger page or article.",
      why: "Choosing the right one of these three prevents both under-structuring (everything in one giant <div>) and over-structuring (using <article> for something that isn't actually standalone content).",
      example: "A blog page might have one <main>, containing multiple <article> elements (one per post), each possibly split into <section>s (introduction, body, conclusion).",
      practice: "Decide whether a 'testimonials block' on a homepage should be a <section> or an <article>, and explain why.",
      success: "You correctly reason that testimonials are usually a <section> (related content within the page) unless each testimonial could meaningfully stand alone.",
      mistake: "Using <article> for content that isn't actually self-contained or standalone, like a simple content block within a larger page.",
      checks: [{ q: '<article> is meant for content that:', options: ['Is never meant to stand alone', 'Could meaningfully stand alone (like a blog post)', 'Is only used for navigation', 'Replaces the need for <main>'], correct: 1 }],
    }),
    rl('Choosing the Right Semantic Element', 'workshop', {
      concept: "When unsure which semantic element fits, ask: does this describe navigation (<nav>), a standalone piece of content (<article>), a related grouping within a page (<section>), or does it genuinely have no more specific meaning (only then, <div>)?",
      why: "This decision process prevents both extremes: forcing semantic tags where they don't fit, and defaulting to <div> out of uncertainty when a real semantic tag exists.",
      example: "A sidebar widget showing 'related articles' is a <section> (related grouping), not an <article> itself, since the widget as a whole isn't one standalone piece of content.",
      practice: "Walk through this decision process for 3 elements on a hypothetical page (a hero banner, a pricing table, a comment box) and choose the best-fitting tag for each.",
      success: "Your 3 choices are reasoned through the decision process, not guessed.",
      mistake: "Defaulting to <div> immediately without considering whether a more meaningful semantic tag actually fits.",
      checks: [{ q: 'When no more specific semantic element genuinely fits, it\u2019s appropriate to use:', options: ['<article> by default', 'A generic <div>', '<nav> by default', 'No tag at all'], correct: 1 }],
    }),
    ra([
      { q: 'Semantic HTML tags mainly help because they:', options: ['Change default visual styling', 'Communicate real meaning to browsers, screen readers, and search engines', 'Are required for CSS', 'Replace the need for JavaScript'], correct: 1 },
      { q: '<nav> should wrap:', options: ['Any content block', 'Primary navigation links', 'Only images', 'Only footer content'], correct: 1 },
      { q: '<article> is meant for content that:', options: ['Can never stand alone', 'Could meaningfully stand alone', 'Is only for navigation', 'Replaces <main>'], correct: 1 },
      { q: '<section> is best used for:', options: ['A standalone blog post', 'A related grouping of content within a page', 'Only the page footer', 'Only forms'], correct: 1 },
      { q: 'Using <div> for everything instead of semantic tags mainly risks:', options: ['Improved accessibility', 'Harder navigation for screen readers and weaker SEO signal', 'No real downside', 'Faster page load automatically'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m4', title: 'CSS Fundamentals', objective: 'Understand how CSS selects and styles HTML elements, and write your first real stylesheet.', lessons: [
    rl('What CSS Actually Does', 'concept', {
      concept: "CSS (Cascading Style Sheets) controls the visual presentation of HTML — colors, spacing, layout, fonts — separating what content IS (HTML) from how it LOOKS (CSS), which keeps both easier to maintain independently.",
      why: "Mixing styling directly into HTML (inline styles everywhere) makes a site much harder to update consistently later, since a color change might need editing dozens of individual elements instead of one CSS rule.",
      example: "Instead of adding style=\"color: blue;\" to every heading individually, one CSS rule (h2 { color: blue; }) styles every h2 on the page consistently from a single place.",
      practice: "Write one sentence explaining why separating HTML content from CSS styling makes a site easier to maintain.",
      success: "Your explanation references single-point-of-change vs. repeated inline edits.",
      mistake: "Styling elements with repeated inline styles instead of centralized CSS rules.",
      checks: [{ q: 'CSS is primarily responsible for:', options: ['The meaning/structure of content', 'The visual presentation of HTML content', 'Server-side logic', 'Database storage'], correct: 1 }],
    }),
    rl('Selectors: Targeting the Right Elements', 'how-to', {
      concept: "CSS selectors determine which HTML elements a rule applies to — element selectors (p), class selectors (.card), and ID selectors (#header) are the three most common, each with different scope and reusability.",
      why: "Classes are reusable across multiple elements (ideal for repeated components); IDs are meant to be unique per page — using the wrong one can make CSS harder to reuse or maintain.",
      howTo: [
        'Use an element selector (e.g. p) for broad, page-wide styling.',
        'Use a class selector (.card) for a reusable style applied to multiple elements.',
        'Use an ID selector (#header) sparingly, only for a single unique element.',
      ],
      example: ".card { border: 1px solid gray; } can style many card elements consistently; #main-header { } should only ever match one specific element on the page.",
      practice: "Write a class selector rule and an ID selector rule for a hypothetical page, explaining when you'd use each.",
      success: "Your example correctly uses the class for something reusable and the ID for something unique.",
      mistake: "Using ID selectors for styles meant to be reused across multiple elements, when a class would be more appropriate.",
      checks: [{ q: 'Class selectors are best used for:', options: ['A single unique element only', 'Styles reused across multiple elements', 'Server-side logic', 'HTML structure itself'], correct: 1 }],
    }),
    rl('The Box Model', 'concept', {
      concept: "Every HTML element is a box made of content, padding (space inside the border), border, and margin (space outside the border) — understanding this model explains why elements have the spacing and size they do.",
      why: "Unexpected spacing or sizing issues in CSS are very often a box model misunderstanding (confusing margin with padding, or not accounting for border width in total size).",
      example: "A button with 200px width, 20px padding, and a 2px border actually takes up 244px total by default (200 + 20+20 padding + 2+2 border) unless box-sizing: border-box is used to simplify this.",
      practice: "Calculate the total rendered width of an element with width: 100px, padding: 10px, and border: 1px (default box-sizing).",
      success: "Your calculation correctly adds padding and border on both sides to the base width (122px).",
      mistake: "Forgetting that padding and border add to an element's total size by default, causing unexpected layout issues.",
      checks: [{ q: 'The CSS box model consists of, from inside out:', options: ['Margin, border, padding, content', 'Content, padding, border, margin', 'Border, content, margin, padding', 'Padding, margin, content, border'], correct: 1 }],
    }),
    rl('Linking a Stylesheet to HTML', 'how-to', {
      concept: "CSS connects to HTML via a <link> tag in the <head> (external stylesheet, the recommended approach for real projects), a <style> tag (internal, page-specific), or inline style attributes (least maintainable, used sparingly).",
      why: "External stylesheets let one CSS file style an entire multi-page site consistently, which inline or internal styles can't do without duplication.",
      howTo: [
        'Create a separate .css file (e.g. styles.css).',
        'In the HTML <head>, add <link rel=\"stylesheet\" href=\"styles.css\">.',
        'Write CSS rules in the external file, applied automatically to matching HTML elements.',
      ],
      example: "<link rel=\"stylesheet\" href=\"styles.css\"> in the head of every page on a site lets one shared file control the look of the entire site.",
      practice: "Write the exact <link> tag you'd add to connect an HTML page to a file named main.css.",
      success: "Your tag correctly uses rel=\"stylesheet\" and the correct href path.",
      mistake: "Relying on inline styles throughout a multi-page site instead of one shared external stylesheet.",
      checks: [{ q: 'The recommended way to style a real multi-page site is:', options: ['Inline styles on every element', 'One external stylesheet linked via <link>', 'A <style> tag repeated on every page', 'CSS cannot be reused across pages'], correct: 1 }],
    }),
    rl('Specificity and the Cascade', 'concept', {
      concept: "When multiple CSS rules could apply to the same element, specificity (ID > class > element) and source order (later rules override earlier ones of equal specificity) determine which rule actually wins — understanding this explains why a style \"isn't working\" even though it looks correctly written.",
      why: "A common beginner frustration (\"my CSS isn't applying!\") is very often a specificity conflict where a more specific or later rule is overriding the intended one.",
      example: "A rule using #header { color: blue; } will override .header { color: red; } even if the class rule comes later in the file, because ID selectors have higher specificity.",
      practice: "Given two conflicting rules (one class-based, one ID-based) targeting the same element's color, predict which one wins and why.",
      success: "You correctly identify the ID selector as winning due to higher specificity, regardless of order.",
      mistake: "Assuming CSS rules always apply in the order written, without accounting for selector specificity differences.",
      checks: [{ q: 'When CSS rules conflict, specificity generally follows the order:', options: ['Element beats class beats ID', 'ID beats class beats element', 'Order written is the only factor, always', 'Specificity does not exist in CSS'], correct: 1 }],
    }),
    ra([
      { q: 'CSS is primarily responsible for:', options: ['Content meaning/structure', 'Visual presentation of HTML', 'Server logic', 'Database storage'], correct: 1 },
      { q: 'Class selectors are best used for:', options: ['A single unique element', 'Styles reused across multiple elements', 'Server logic', 'HTML structure'], correct: 1 },
      { q: 'The box model, from inside out, is:', options: ['Margin, border, padding, content', 'Content, padding, border, margin', 'Border, content, margin, padding', 'Padding, margin, border, content'], correct: 1 },
      { q: 'The recommended way to style a multi-page site is:', options: ['Inline styles everywhere', 'One external stylesheet linked via <link>', 'Repeated <style> tags per page', 'CSS can\u2019t be shared across pages'], correct: 1 },
      { q: 'When rules conflict, specificity generally follows:', options: ['Element beats class beats ID', 'ID beats class beats element', 'Only write order matters', 'Specificity doesn\u2019t exist'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m5', title: 'Typography, Color & Visual Hierarchy', objective: 'Make deliberate typography and color choices that guide a visitor\'s eye and reinforce a brand.', lessons: [
    rl('Web-Safe Fonts and Google Fonts', 'how-to', {
      concept: "\"Web-safe\" fonts are pre-installed on most devices (Arial, Georgia); Google Fonts is a free library of additional fonts loaded from the web — either way, always specify a fallback font stack in case the primary choice fails to load.",
      why: "Relying on a single custom font with no fallback risks an ugly default browser font appearing if that font fails to load for any reason.",
      howTo: [
        'Choose a font from Google Fonts (or a web-safe default).',
        'Add the Google Fonts <link> tag to the HTML head, or import it in CSS.',
        'Set font-family with a fallback stack, e.g. font-family: \"Poppins\", Arial, sans-serif;',
      ],
      example: "font-family: \"Poppins\", Arial, sans-serif; uses Poppins if it loads, falling back to Arial, then any generic sans-serif font.",
      practice: "Write a font-family declaration for a hypothetical Google Font, including a 2-level fallback.",
      success: "Your declaration includes the custom font plus at least one fallback and a generic family.",
      mistake: "Specifying only a single custom font with no fallback in case it fails to load.",
      checks: [{ q: 'A font-family declaration should generally include:', options: ['Only the custom font name', 'The custom font plus fallback options', 'No font specification, letting the browser choose randomly', 'Only a generic family with no custom font'], correct: 1 }],
    }),
    rl('Font Size, Weight, and Line Height', 'how-to', {
      concept: "Font size controls text scale, font-weight controls boldness (400 normal, 700 bold, etc.), and line-height controls vertical spacing between lines — all three together determine how readable a block of text actually feels.",
      why: "Text with too-tight line-height feels cramped and hard to read; text with too much weight variation feels chaotic — these settings matter as much as font choice itself for readability.",
      example: "line-height: 1.5; on body text gives comfortable breathing room between lines, versus line-height: 1; which can feel cramped for paragraphs.",
      practice: "Write CSS setting font-size, font-weight, and line-height for a hypothetical paragraph of body text.",
      success: "Your values are reasonable for body text readability (e.g. 16px+, normal weight, 1.4-1.6 line-height).",
      mistake: "Using a very tight line-height on paragraph text, making it feel cramped and harder to read.",
      checks: [{ q: 'Line-height mainly controls:', options: ['Text color', 'Vertical spacing between lines of text', 'Font boldness', 'Horizontal letter spacing'], correct: 1 }],
    }),
    rl('Color Theory for the Web', 'concept', {
      concept: "Web color is specified via hex codes (#RRGGBB), RGB, or named colors — beyond syntax, choosing colors with adequate contrast (especially text against background) is essential for both readability and accessibility.",
      why: "Low-contrast color combinations (light gray text on white) can look stylish but fail real-world readability, especially for users with low vision or in bright lighting.",
      example: "#333333 text on a #FFFFFF background has strong, accessible contrast; #CCCCCC text on #FFFFFF does not and would fail accessibility contrast checks.",
      practice: "Check (or estimate) whether a hypothetical text/background color pair would have sufficient contrast, and adjust if not.",
      success: "Your reasoning correctly favors darker text on light backgrounds (or vice versa) for real contrast.",
      mistake: "Choosing a trendy but low-contrast color combination without checking real accessibility/readability.",
      checks: [{ q: 'Web color accessibility mainly concerns:', options: ['Using as many colors as possible', 'Sufficient contrast between text and background', 'Avoiding hex codes entirely', 'Using only named colors'], correct: 1 }],
    }),
    rl('Building Visual Hierarchy', 'workshop', {
      concept: "Visual hierarchy in web typography combines size, weight, and color to show what's most important on a page first — a page where every text element looks the same weight/size gives the reader no guidance on where to look.",
      why: "Without hierarchy, users have to work harder to figure out what matters on a page, which increases bounce rates and reduces comprehension.",
      example: "A hero heading at 48px bold, a subheading at 24px normal, and body text at 16px creates clear, scannable hierarchy guiding the eye top to bottom by importance.",
      practice: "Assign font-size and font-weight values to 3 hierarchy levels (heading, subheading, body) for a hypothetical page.",
      success: "Your 3 levels show clear, distinguishable size/weight differences.",
      mistake: "Using the same or very similar font-size/weight across headings and body text, leaving no clear hierarchy.",
      checks: [{ q: 'Visual hierarchy in typography is created mainly through:', options: ['Using identical size/weight everywhere', 'Combining size, weight, and color to show importance', 'Using as many fonts as possible', 'Random styling'], correct: 1 }],
    }),
    ra([
      { q: 'A font-family declaration should include:', options: ['Only the custom font', 'The custom font plus fallback options', 'No specification', 'Only a generic family'], correct: 1 },
      { q: 'Line-height mainly controls:', options: ['Text color', 'Vertical spacing between lines', 'Font boldness', 'Letter spacing'], correct: 1 },
      { q: 'Web color accessibility mainly concerns:', options: ['Maximum colors used', 'Sufficient text/background contrast', 'Avoiding hex codes', 'Only named colors'], correct: 1 },
      { q: 'Visual hierarchy in typography is created through:', options: ['Identical size/weight everywhere', 'Combining size, weight, and color to show importance', 'Maximum font variety', 'Random styling'], correct: 1 },
      { q: 'Specifying only one custom font with no fallback risks:', options: ['No real issue', 'An ugly default font appearing if it fails to load', 'Faster load times always', 'Improved consistency'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m6', title: 'Layout & Responsive Design', objective: 'Design layouts that adapt correctly to phone, tablet, and desktop screens.', lessons: [
    rl('Why Responsive Design Is Non-Negotiable', 'concept', {
      concept: "Responsive design means a site automatically adapts its layout to different screen sizes (phone, tablet, desktop) — since the majority of web traffic today is mobile, a non-responsive site fails a large share of visitors immediately.",
      why: "A site that looks great on desktop but is broken or unusable on mobile is effectively broken for most of its actual visitors today.",
      example: "A non-responsive 3-column layout squeezed onto a phone screen becomes tiny, unreadable text requiring constant zooming and horizontal scrolling.",
      practice: "Write one sentence explaining why responsive design is now a baseline requirement, not an optional nice-to-have.",
      success: "Your explanation references majority-mobile traffic specifically.",
      mistake: "Designing and testing a site only on desktop, treating mobile responsiveness as an afterthought.",
      checks: [{ q: 'Responsive design is best understood as:', options: ['An optional visual extra', 'A baseline requirement given majority-mobile web traffic', 'Only relevant for large companies', 'Something only needed for e-commerce sites'], correct: 1 }],
    }),
    rl('The Viewport Meta Tag', 'how-to', {
      concept: "The viewport meta tag (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">) tells mobile browsers to render the page at the device's actual width instead of a default desktop-width assumption — without it, responsive CSS often won't work correctly on mobile at all.",
      why: "Without this tag, mobile browsers may render the page as if on a wide desktop screen and then shrink it to fit, making text tiny and responsive breakpoints behave incorrectly.",
      howTo: [
        'Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> inside the HTML <head>.',
        'Include it on every page of the site.',
        'Test on an actual mobile device or browser device-emulation mode to confirm correct scaling.',
      ],
      example: "A page missing this tag might render tiny, zoomed-out text on mobile even if the CSS media queries are technically correct.",
      practice: "Write the exact viewport meta tag you'd include in every page's head.",
      success: "Your tag exactly matches the standard, correct syntax.",
      mistake: "Forgetting the viewport meta tag, causing responsive CSS to behave incorrectly on real mobile devices.",
      checks: [{ q: 'The viewport meta tag is necessary because:', options: ['It\u2019s purely decorative', 'Without it, mobile browsers may render at an incorrect assumed width', 'It replaces the need for media queries entirely', 'It only affects desktop browsers'], correct: 1 }],
    }),
    rl('Media Queries', 'how-to', {
      concept: "Media queries (@media (max-width: 768px) { ... }) apply CSS rules only when specific conditions (like screen width) are met — this is the core mechanism that lets a layout change at different breakpoints.",
      why: "Without media queries, a page has one fixed layout regardless of screen size, which can't adapt to phones, tablets, and desktops differently.",
      howTo: [
        'Decide the breakpoint width where the layout should change (e.g. 768px for tablet).',
        'Write @media (max-width: 768px) { ... } wrapping the CSS rules that should apply below that width.',
        'Test by resizing the browser or using device emulation across the breakpoint.',
      ],
      example: "@media (max-width: 600px) { .nav { flex-direction: column; } } stacks a navigation bar vertically only on small screens.",
      practice: "Write a media query that changes a container's font-size to 14px on screens narrower than 500px.",
      success: "Your media query uses correct syntax and a reasonable breakpoint value.",
      mistake: "Writing one fixed layout with no media queries, unable to adapt to different screen sizes.",
      checks: [{ q: 'Media queries are used to:', options: ['Apply CSS unconditionally everywhere', 'Apply CSS rules only when specific conditions like screen width are met', 'Replace HTML structure', 'Only affect JavaScript behavior'], correct: 1 }],
    }),
    rl('Mobile-First vs Desktop-First', 'concept', {
      concept: "Mobile-first CSS writes base styles for small screens first, then uses media queries to add complexity for larger screens (min-width queries); desktop-first does the reverse — mobile-first is generally recommended since it matches the majority-mobile traffic and tends to produce leaner CSS.",
      why: "Starting from the more constrained mobile layout and progressively enhancing for larger screens tends to produce simpler, more maintainable CSS than starting complex and stripping down.",
      example: "Mobile-first: .card { width: 100%; } then @media (min-width: 768px) { .card { width: 50%; } } adds complexity only as screen size grows.",
      practice: "Write one sentence explaining why mobile-first CSS is generally recommended over desktop-first.",
      success: "Your explanation references matching majority traffic and/or simpler progressive enhancement.",
      mistake: "Building complex desktop layouts first and only later trying to strip them down for mobile, often producing messier CSS.",
      checks: [{ q: 'Mobile-first CSS generally means:', options: ['Writing desktop styles first, then adapting down', 'Writing base styles for small screens first, then enhancing for larger ones', 'Ignoring mobile entirely', 'Using only fixed pixel widths'], correct: 1 }],
    }),
    ra([
      { q: 'Responsive design is best understood as:', options: ['An optional extra', 'A baseline requirement given majority-mobile traffic', 'Only for large companies', 'Only needed for e-commerce'], correct: 1 },
      { q: 'The viewport meta tag is necessary because:', options: ['It\u2019s decorative', 'Without it mobile browsers may render at an incorrect width', 'It replaces media queries', 'It only affects desktop'], correct: 1 },
      { q: 'Media queries are used to:', options: ['Apply CSS unconditionally', 'Apply CSS only when conditions like screen width are met', 'Replace HTML', 'Only affect JavaScript'], correct: 1 },
      { q: 'Mobile-first CSS means:', options: ['Desktop styles first', 'Base styles for small screens first, then enhancing up', 'Ignoring mobile', 'Only fixed widths'], correct: 1 },
      { q: 'A non-responsive site today typically:', options: ['Serves the majority of visitors well', 'Fails a large share of visitors given majority-mobile traffic', 'Has no real downside', 'Is sufficient for all use cases'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m7', title: 'Flexbox', objective: 'Build flexible one-dimensional layouts confidently using Flexbox.', lessons: [
    rl('What Flexbox Solves', 'concept', {
      concept: "Flexbox is a CSS layout system designed for arranging items in a single row or column, handling alignment, spacing, and distribution automatically — it solves problems (vertical centering, evenly distributing items) that were notoriously difficult with older CSS techniques.",
      why: "Before flexbox, simple tasks like vertically centering content required awkward workarounds; flexbox makes these common layout needs straightforward.",
      example: "Centering a single div both horizontally and vertically inside its parent takes just 2 flexbox properties, versus multiple older hacks previously required.",
      practice: "Write one sentence describing a layout problem flexbox solves that used to be difficult in CSS.",
      success: "Your example is a real, common layout challenge (centering, even distribution, equal-height columns).",
      mistake: "Using older, more complex layout hacks for problems flexbox now solves simply.",
      checks: [{ q: 'Flexbox is primarily designed for:', options: ['Complex 2D grid layouts', 'Arranging items in a single row or column with automatic alignment', 'Adding animations', 'Styling text only'], correct: 1 }],
    }),
    rl('Flex Containers and Flex Items', 'how-to', {
      concept: "Setting display: flex; on a parent element makes it a \"flex container,\" and its direct children automatically become \"flex items\" that can be aligned/distributed using flex properties — this parent/child relationship is fundamental to how flexbox works.",
      why: "Flex properties like justify-content only work when applied to the flex container, not the items themselves — a common beginner confusion.",
      howTo: [
        'Apply display: flex; to the parent element.',
        'Its direct children automatically become flex items.',
        'Apply container-level properties (justify-content, align-items) to the parent.',
        'Apply item-level properties (flex-grow, align-self) to individual items if needed.',
      ],
      example: ".container { display: flex; } makes all direct children of .container flex items that can now be aligned using flex properties on .container.",
      practice: "Write the CSS to make a div with class .row a flex container.",
      success: "Your CSS correctly applies display: flex; to the container class.",
      mistake: "Applying flex container properties (like justify-content) to a flex item instead of the container itself.",
      checks: [{ q: 'Setting display: flex on an element makes it a:', options: ['Flex item', 'Flex container, with its direct children becoming flex items', 'Grid container', 'Nothing changes'], correct: 1 }],
    }),
    rl('justify-content and align-items', 'how-to', {
      concept: "justify-content controls alignment along the main axis (horizontal, by default), while align-items controls alignment along the cross axis (vertical, by default) — together they control both horizontal and vertical positioning of flex items.",
      why: "Confusing which axis each property controls is a very common beginner mistake, leading to items aligning in an unexpected direction.",
      example: "justify-content: center; align-items: center; together perfectly centers flex items both horizontally and vertically within their container.",
      practice: "Write the CSS to center flex items both horizontally and vertically within a flex container.",
      success: "Your CSS correctly uses both justify-content: center and align-items: center.",
      mistake: "Confusing justify-content and align-items, expecting one property to control both axes.",
      checks: [{ q: 'justify-content controls alignment along the:', options: ['Cross (vertical, by default) axis', 'Main (horizontal, by default) axis', 'Neither axis', 'Only the z-axis'], correct: 1 }],
    }),
    rl('Building a Navigation Bar with Flexbox', 'workshop', {
      concept: "A typical flexbox nav bar uses display: flex; on the container, justify-content: space-between; to push the logo and links apart, and align-items: center; to vertically center everything — a very common, practical real-world flexbox pattern.",
      why: "This exact pattern (logo left, links right, vertically centered) appears on a huge share of real websites, making it one of the most practically useful flexbox skills to master.",
      example: ".navbar { display: flex; justify-content: space-between; align-items: center; } creates the classic logo-left, links-right, vertically-centered nav layout.",
      practice: "Write the CSS for a .navbar class implementing this classic pattern.",
      success: "Your CSS includes display: flex, justify-content: space-between, and align-items: center.",
      mistake: "Trying to achieve this layout with older positioning techniques (floats, absolute positioning) instead of the simpler flexbox approach.",
      checks: [{ q: 'A classic logo-left, links-right nav bar pattern typically uses:', options: ['justify-content: center only', 'justify-content: space-between with align-items: center', 'No flexbox properties at all', 'display: block'], correct: 1 }],
    }),
    ra([
      { q: 'Flexbox is primarily designed for:', options: ['Complex 2D grids', 'Arranging items in a row/column with automatic alignment', 'Animations only', 'Text styling only'], correct: 1 },
      { q: 'display: flex on an element makes it a:', options: ['Flex item', 'Flex container', 'Grid container', 'No change occurs'], correct: 1 },
      { q: 'justify-content controls alignment along the:', options: ['Cross axis', 'Main axis', 'Neither axis', 'Z-axis'], correct: 1 },
      { q: 'A classic nav bar pattern uses:', options: ['justify-content: center alone', 'justify-content: space-between with align-items: center', 'No flex properties', 'display: block'], correct: 1 },
      { q: 'Confusing justify-content and align-items typically results in:', options: ['Correct alignment regardless', 'Items aligning in an unexpected direction', 'No visible effect', 'Improved layout automatically'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m8', title: 'CSS Grid', objective: 'Build two-dimensional page layouts using CSS Grid.', lessons: [
    rl('What Grid Solves (and How It Differs from Flexbox)', 'concept', {
      concept: "CSS Grid is designed for two-dimensional layouts (rows AND columns simultaneously), while flexbox is designed for one-dimensional layouts (a single row or column) — Grid is the better tool for full-page layouts; flexbox often wins for smaller components like a nav bar.",
      why: "Choosing the wrong tool (fighting flexbox into a complex 2D layout, or overcomplicating a simple row with Grid) makes CSS harder to write and maintain than necessary.",
      example: "A full page layout with a header, sidebar, main content, and footer is naturally a Grid use case (2D); a simple horizontal row of nav links is naturally a flexbox use case (1D).",
      practice: "Decide whether flexbox or Grid better fits a hypothetical layout (a 3-column pricing table vs. a full page layout with sidebar), with reasoning.",
      success: "Your choice correctly matches Grid to 2D layouts and flexbox to 1D layouts.",
      mistake: "Trying to force flexbox into a complex 2D layout that would be much simpler with Grid.",
      checks: [{ q: 'CSS Grid is primarily designed for:', options: ['One-dimensional layouts only', 'Two-dimensional layouts (rows and columns together)', 'Text styling', 'Animations'], correct: 1 }],
    }),
    rl('Grid Containers, Rows, and Columns', 'how-to', {
      concept: "Setting display: grid; on a container, combined with grid-template-columns and grid-template-rows, defines the grid's structure — e.g. grid-template-columns: 1fr 2fr; creates two columns where the second is twice as wide as the first.",
      why: "The fr unit (fractional unit) makes flexible, proportional column/row sizing straightforward without needing to calculate exact pixel or percentage widths.",
      howTo: [
        'Apply display: grid; to the container.',
        'Define columns with grid-template-columns (e.g. 1fr 1fr 1fr for 3 equal columns).',
        'Define rows with grid-template-rows if needed.',
        'Direct children automatically become grid items placed into the defined structure.',
      ],
      example: "grid-template-columns: 1fr 1fr 1fr; creates 3 equal-width columns that automatically adjust as the container resizes.",
      practice: "Write CSS creating a grid container with 2 equal columns.",
      success: "Your CSS correctly uses display: grid and grid-template-columns: 1fr 1fr.",
      mistake: "Using fixed pixel widths for grid columns when flexible fr units would adapt better to different screen sizes.",
      checks: [{ q: 'The fr unit in CSS Grid is used to:', options: ['Set a fixed pixel width', 'Define flexible, proportional column/row sizing', 'Add a border', 'Set text color'], correct: 1 }],
    }),
    rl('grid-template-areas', 'how-to', {
      concept: "grid-template-areas lets you name and visually lay out grid regions (\"header,\" \"sidebar,\" \"main,\" \"footer\") directly in the CSS, then assign elements to those named areas — a highly readable way to define full-page layouts.",
      why: "This approach makes complex page layouts easier to read and understand at a glance compared to only using row/column numbers.",
      example: "grid-template-areas: \"header header\" \"sidebar main\" \"footer footer\"; visually represents the layout directly in the CSS, then .header { grid-area: header; } assigns an element to that region.",
      practice: "Sketch a grid-template-areas value for a layout with a header, sidebar, main content, and footer.",
      success: "Your value correctly represents the described layout structure using named areas.",
      mistake: "Using only numbered row/column placement for a complex layout when named grid-template-areas would be more readable.",
      checks: [{ q: 'grid-template-areas is used to:', options: ['Add colors to a grid', 'Name and visually lay out grid regions for easier readability', 'Replace the need for grid-template-columns entirely', 'Only work with flexbox'], correct: 1 }],
    }),
    rl('Building a Page Layout with Grid', 'workshop', {
      concept: "A classic Grid page layout combines grid-template-columns/rows with grid-template-areas to build a header, sidebar, main content, and footer structure that adapts cleanly, often adjusted further with media queries for smaller screens.",
      why: "This pattern demonstrates Grid's real practical value: a full page layout that would require complex nested flexbox or floats becomes clean and readable with Grid.",
      example: "A full desktop layout with a sidebar might collapse the sidebar to full width above the main content on mobile, by redefining grid-template-areas inside a media query.",
      practice: "Describe how you'd adjust a grid-template-areas layout for mobile, where the sidebar should stack above the main content instead of beside it.",
      success: "Your description correctly identifies redefining grid-template-areas within a media query for the mobile breakpoint.",
      mistake: "Building a Grid layout without considering how it needs to adapt at smaller screen sizes.",
      checks: [{ q: 'Adapting a Grid layout for mobile is typically done by:', options: ['Deleting the grid entirely on mobile', 'Redefining grid-template-areas/columns within a media query', 'Grid cannot be made responsive', 'Switching to a table element'], correct: 1 }],
    }),
    ra([
      { q: 'CSS Grid is primarily designed for:', options: ['One-dimensional layouts', 'Two-dimensional layouts (rows and columns together)', 'Text styling', 'Animations'], correct: 1 },
      { q: 'The fr unit is used to:', options: ['Set a fixed pixel width', 'Define flexible, proportional sizing', 'Add borders', 'Set colors'], correct: 1 },
      { q: 'grid-template-areas is used to:', options: ['Add colors', 'Name and visually lay out grid regions', 'Replace grid-template-columns entirely', 'Only work with flexbox'], correct: 1 },
      { q: 'Adapting a Grid layout for mobile is typically done by:', options: ['Deleting the grid', 'Redefining the grid structure within a media query', 'Grid cannot adapt', 'Switching to tables'], correct: 1 },
      { q: 'Forcing flexbox into a complex 2D layout instead of using Grid typically:', options: ['Simplifies the CSS', 'Makes the CSS more complex than necessary', 'Has no real downside', 'Is always the better choice'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m9', title: 'Components & Reusable Patterns', objective: 'Design and style reusable UI components like cards, buttons, and navigation menus.', lessons: [
    rl('Thinking in Components', 'concept', {
      concept: "Thinking in components means designing reusable, self-contained UI pieces (a card, a button, a nav item) with consistent styling, rather than styling every individual instance uniquely — a mindset shift from \"page-by-page\" to \"reusable building blocks.\"",
      why: "A component-based approach means a style change (e.g. updating a button's look) happens once, in one place, and automatically applies everywhere that component is used.",
      example: "A .btn class styled once and reused for every button on a site (rather than styling each button instance individually) means updating the button style project-wide takes one CSS change.",
      practice: "Write one sentence explaining why a component-based approach is more maintainable than styling every element uniquely.",
      success: "Your explanation references single-point-of-change/reusability specifically.",
      mistake: "Writing unique, one-off CSS for every individual button/card instead of a single reusable component class.",
      checks: [{ q: 'A component-based CSS approach mainly helps by:', options: ['Requiring more unique CSS per element', 'Making style updates apply consistently everywhere a component is reused', 'Being unnecessary for small sites', 'Replacing the need for any CSS'], correct: 1 }],
    }),
    rl('Building a Card Component', 'workshop', {
      concept: "A typical card component combines a container with padding/border/shadow, an image or heading area, and body text — built once as a reusable class (.card) so any content can be dropped into the same consistent visual container.",
      why: "Cards are one of the most common reusable UI patterns (products, blog previews, team members) — mastering this one component pattern covers a huge share of real-world layout needs.",
      example: ".card { border: 1px solid #eee; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); } creates a reusable card container applied to any content.",
      practice: "Write the CSS for a basic .card class with padding, a border, and rounded corners.",
      success: "Your CSS includes padding, border/border-radius as a cohesive reusable style.",
      mistake: "Styling each individual card instance separately instead of building one reusable .card class.",
      checks: [{ q: 'A reusable card component is typically built as:', options: ['A uniquely styled element every time it\u2019s used', 'One reusable class applied consistently to any card content', 'Something that can\u2019t be reused', 'Only usable once per page'], correct: 1 }],
    }),
    rl('Building Button Variants', 'workshop', {
      concept: "Button variants (primary, secondary, danger) share a common base class (.btn) for shared properties (padding, border-radius, font) plus a modifier class (.btn-primary, .btn-secondary) for variant-specific properties (color) — combining base + modifier classes is a common, scalable pattern.",
      why: "This pattern avoids duplicating all the shared button properties in every variant, while still allowing each variant's unique styling.",
      example: "<button class=\"btn btn-primary\"> combines the shared .btn base styles with the .btn-primary color/variant styles.",
      practice: "Write CSS for a base .btn class and a .btn-primary modifier class that only changes the background color.",
      success: "Your .btn class has shared properties (padding, border-radius); your .btn-primary only adds the color-specific difference.",
      mistake: "Duplicating all button properties in every variant class instead of sharing a common base class.",
      checks: [{ q: 'A base class + modifier class pattern for buttons is used to:', options: ['Duplicate all properties in each variant', 'Share common properties while allowing variant-specific differences', 'Avoid ever having button variants', 'Replace the need for any CSS classes'], correct: 1 }],
    }),
    rl('Naming Conventions for CSS Classes', 'how-to', {
      concept: "A consistent naming convention (like BEM: Block__Element--Modifier, e.g. card__title--large) makes class names predictable and self-documenting, preventing confusion as a project's CSS grows larger.",
      why: "Without a consistent convention, class names can become inconsistent and confusing across a growing project, making it hard to tell what a class does or where it's used.",
      example: "card (block), card__title (element within the card), card--featured (a modifier variant of the whole card) follows a predictable, readable BEM-style pattern.",
      practice: "Using a BEM-style pattern, name a class for a 'button' block, its 'icon' element, and a 'disabled' modifier.",
      success: "Your names follow the block__element--modifier pattern correctly (e.g. button, button__icon, button--disabled).",
      mistake: "Using inconsistent, ad-hoc class names with no naming convention, making a growing project's CSS confusing to navigate.",
      checks: [{ q: 'A consistent CSS naming convention mainly helps by:', options: ['Making class names random and inconsistent', 'Making class names predictable and self-documenting as a project grows', 'Being unnecessary for any project size', 'Replacing the need for CSS classes'], correct: 1 }],
    }),
    ra([
      { q: 'A component-based CSS approach mainly helps by:', options: ['Requiring more unique CSS', 'Making updates apply consistently everywhere reused', 'Being unnecessary', 'Replacing all CSS'], correct: 1 },
      { q: 'A reusable card component is built as:', options: ['A unique style each time', 'One reusable class applied consistently', 'Unreusable', 'Only usable once'], correct: 1 },
      { q: 'A base + modifier class pattern is used to:', options: ['Duplicate properties in each variant', 'Share common properties while allowing variant differences', 'Avoid variants entirely', 'Replace CSS classes'], correct: 1 },
      { q: 'A consistent naming convention mainly helps by:', options: ['Making names random', 'Making names predictable and self-documenting', 'Being unnecessary', 'Replacing CSS classes'], correct: 1 },
      { q: 'Styling each individual instance of a repeated element uniquely instead of using a shared component class typically:', options: ['Improves maintainability', 'Makes updates harder to apply consistently', 'Has no real downside', 'Is the recommended approach'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m10', title: 'Forms, Navigation & Accessibility', objective: 'Build accessible forms and navigation that everyone, including screen reader and keyboard users, can actually use.', lessons: [
    rl('Form Elements and Labels', 'how-to', {
      concept: "Every form input should have an associated <label> (connected via the for attribute matching the input's id) — this lets screen reader users understand what each field is for, and lets sighted users click the label to focus the input.",
      why: "A form with placeholder text but no real <label> elements is a common accessibility failure — placeholder text disappears once typing starts and isn't reliably announced by screen readers.",
      example: "<label for=\"email\">Email</label><input id=\"email\" type=\"email\"> correctly associates the label with the input via matching for/id values.",
      practice: "Write a properly labeled input for a 'Full Name' field.",
      success: "Your markup correctly matches the label's for attribute to the input's id.",
      mistake: "Relying only on placeholder text instead of a real, properly associated <label> element.",
      checks: [{ q: 'Form inputs should generally have:', options: ['Only placeholder text, no label needed', 'A properly associated <label> element', 'No labeling at all', 'Labels with no connection to the input'], correct: 1 }],
    }),
    rl('Accessible Navigation Menus', 'how-to', {
      concept: "Accessible navigation uses real <nav> and <a> elements (not <div>s with click handlers), ensures links have descriptive text (not just \"click here\"), and works correctly via keyboard alone, not just mouse/touch.",
      why: "A nav built from non-semantic elements or requiring mouse-only interaction excludes keyboard-only users and screen reader users entirely.",
      example: "A dropdown menu built with real <button> and <a> elements can be operated via keyboard Tab/Enter; one built entirely from <div>s with only click handlers often cannot.",
      practice: "Write one sentence explaining why using real <a> and <button> elements matters for keyboard accessibility.",
      success: "Your explanation references native keyboard interactivity that semantic elements provide by default.",
      mistake: "Building interactive navigation from non-semantic <div>s with only mouse click handlers, excluding keyboard users.",
      checks: [{ q: 'Accessible navigation should generally:', options: ['Work only via mouse/touch', 'Use real semantic elements and work via keyboard alone too', 'Avoid descriptive link text', 'Use only <div> elements'], correct: 1 }],
    }),
    rl('Keyboard Navigation and Focus States', 'concept', {
      concept: "Keyboard users navigate a page using Tab (and Shift+Tab) to move between interactive elements — a visible \"focus state\" (usually an outline) shows which element is currently selected, and removing this outline without a clear alternative breaks usability for keyboard users.",
      why: "A common but harmful practice is adding * { outline: none; } to remove the default focus outline for aesthetic reasons, leaving keyboard users with no visual indication of where they are on the page.",
      example: "A button styled with outline: none and no alternative focus style becomes invisible to a keyboard user tabbing through the page, even though it still technically receives focus.",
      practice: "Write one sentence explaining why removing focus outlines without an alternative harms accessibility.",
      success: "Your explanation references keyboard users losing visual indication of their current position.",
      mistake: "Removing default focus outlines purely for aesthetics with no accessible alternative focus style provided.",
      checks: [{ q: 'Removing focus outlines with no alternative style mainly harms:', options: ['Mouse users only', 'Keyboard users, who lose visual indication of their position', 'No one, it\u2019s purely cosmetic', 'Only screen reader users'], correct: 1 }],
    }),
    rl('Color Contrast and ARIA Basics', 'concept', {
      concept: "Sufficient color contrast (checked via free tools) ensures text is readable for users with low vision, and ARIA attributes (like aria-label) provide additional context to screen readers when semantic HTML alone isn't enough — though real semantic HTML should always be tried first before reaching for ARIA.",
      why: "ARIA is a supplement to semantic HTML, not a replacement — misusing ARIA (or using it where a native semantic element would work) can sometimes make accessibility worse, not better.",
      example: "An icon-only button (no visible text) should include aria-label=\"Close menu\" so a screen reader announces its purpose, since there's no visible text to read.",
      practice: "Write an example of an icon-only button with an appropriate aria-label.",
      success: "Your example includes a clear, descriptive aria-label matching the button's actual function.",
      mistake: "Reaching for ARIA attributes as a first solution instead of trying proper semantic HTML first.",
      checks: [{ q: 'ARIA attributes should generally be used:', options: ['Instead of semantic HTML always', 'As a supplement when semantic HTML alone isn\u2019t sufficient', 'Never, under any circumstances', 'Only for visual styling'], correct: 1 }],
    }),
    ra([
      { q: 'Form inputs should generally have:', options: ['Only placeholder text', 'A properly associated <label>', 'No labeling', 'Unconnected labels'], correct: 1 },
      { q: 'Accessible navigation should:', options: ['Work only via mouse', 'Use semantic elements and support keyboard use', 'Avoid descriptive link text', 'Use only <div>s'], correct: 1 },
      { q: 'Removing focus outlines with no alternative mainly harms:', options: ['Mouse users', 'Keyboard users', 'No one', 'Only screen readers'], correct: 1 },
      { q: 'ARIA attributes should generally be used:', options: ['Instead of semantic HTML', 'As a supplement when semantic HTML isn\u2019t sufficient', 'Never', 'Only for styling'], correct: 1 },
      { q: 'Relying only on placeholder text instead of real labels risks:', options: ['Full accessibility', 'Confusing or unusable forms for screen reader users', 'No real downside', 'Improved usability'], correct: 1 },
    ]),
  ] },
  { id: 'wd-m11', title: 'Responsive Testing & Debugging', objective: 'Systematically test and debug a website across real device sizes.', lessons: [
    rl('Testing with DevTools Device Mode', 'how-to', {
      concept: "Browser DevTools include a device emulation mode (toggled via a phone/tablet icon) that simulates various screen sizes without needing physical devices — an essential, free tool for testing responsive design during development.",
      why: "Relying only on resizing the desktop browser window is a rough approximation; device mode more accurately simulates real device viewports, including touch behavior in some cases.",
      howTo: [
        'Open browser DevTools (usually F12 or right-click \u2192 Inspect).',
        'Toggle device emulation mode (phone/tablet icon).',
        'Select or manually set different device screen sizes.',
        'Check layout, text readability, and interaction at each size.',
      ],
      example: "A developer catches a navigation menu overlapping content specifically at tablet width (768px) using device mode — a bug that wasn't visible at desktop or phone sizes.",
      practice: "Write one sentence explaining why device mode testing is more reliable than just resizing a desktop browser window.",
      success: "Your explanation references more accurate viewport/device simulation.",
      mistake: "Only testing a responsive design at desktop width and phone width, missing bugs that appear specifically at in-between tablet sizes.",
      checks: [{ q: 'Browser DevTools device mode is used to:', options: ['Edit live server code', 'Simulate various screen sizes for responsive testing', 'Only test animations', 'Replace the need for any testing'], correct: 1 }],
    }),
    rl('Common Responsive Bugs and Fixes', 'troubleshooting', {
      concept: "Common responsive bugs include text overflowing its container, images not scaling down, overlapping elements at specific breakpoints, and horizontal scrollbars appearing unexpectedly — each has a typical, learnable fix.",
      why: "Recognizing these patterns quickly speeds up debugging significantly compared to troubleshooting each issue from scratch every time.",
      example: "An unexpected horizontal scrollbar is very often caused by an element with a fixed width wider than its container, or negative margins pushing content outside the viewport.",
      practice: "For 2 of the common bugs listed, write the likely cause and typical fix.",
      success: "Your causes/fixes are realistic and technically sound for the stated bug types.",
      mistake: "Troubleshooting each responsive bug from scratch without recognizing common, recurring patterns and their typical fixes.",
      checks: [{ q: 'An unexpected horizontal scrollbar is often caused by:', options: ['Too much padding on the body only', 'An element wider than its container (fixed width or negative margin)', 'Using too many colors', 'Having too few media queries defined'], correct: 1 }],
    }),
    rl('Cross-Browser Considerations', 'concept', {
      concept: "Different browsers (Chrome, Safari, Firefox) can render some CSS features slightly differently or support newer features at different times — testing across multiple real browsers (not just one) before considering a site \"done\" catches these inconsistencies.",
      why: "A site that looks perfect in one browser but broken in another loses a meaningful share of visitors who happen to use the \"broken\" browser.",
      example: "A CSS feature working perfectly in Chrome might render differently or not at all in an older Safari version, only caught by actually testing in Safari specifically.",
      practice: "Write one sentence explaining why testing in only one browser is risky before considering a site complete.",
      success: "Your explanation references losing visitors on browsers that weren't actually tested.",
      mistake: "Testing a site only in one browser (usually the developer's default) and assuming it works identically everywhere.",
      checks: [{ q: 'Cross-browser testing mainly matters because:', options: ['All browsers render identically, always', 'Different browsers can render some features differently, risking visitor-facing bugs', 'It\u2019s irrelevant to modern web development', 'Only Internet Explorer ever had rendering differences'], correct: 1 }],
    }),
    ra([
      { q: 'DevTools device mode is used to:', options: ['Edit server code', 'Simulate various screen sizes for testing', 'Only test animations', 'Replace testing entirely'], correct: 1 },
      { q: 'An unexpected horizontal scrollbar is often caused by:', options: ['Too much body padding', 'An element wider than its container', 'Too many colors', 'Too few media queries'], correct: 1 },
      { q: 'Cross-browser testing mainly matters because:', options: ['All browsers are identical', 'Different browsers can render features differently', 'It\u2019s irrelevant today', 'Only old IE had issues'], correct: 1 },
      { q: 'Testing only at desktop and phone widths, skipping tablet, risks:', options: ['Catching all responsive bugs', 'Missing bugs that appear specifically at in-between breakpoints', 'No real risk', 'Improved coverage'], correct: 1 },
      { q: 'A site that works in only one browser typically:', options: ['Serves all visitors equally well', 'Loses visitors using other, untested browsers', 'Has no real downside', 'Is sufficient for launch'], correct: 1 },
    ]),
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
    rl('Arithmetic Operators', 'concept', {
      concept: "Arithmetic operators (+, -, *, /, % for remainder) perform math on numbers — the + operator also concatenates (joins) strings, which is a common source of beginner confusion (\"5\" + 5 produces \"55\", not 10).",
      why: "Mixing up when + adds numbers versus concatenates strings is one of the most common early JavaScript bugs, especially with values coming from user input (which are often strings).",
      example: "5 + 5 evaluates to 10 (number addition), but \"5\" + 5 evaluates to \"55\" (string concatenation) because one operand is already a string.",
      practice: "Predict the result of \"3\" + 4 and 3 + 4, and explain why they differ.",
      success: "You correctly identify \"34\" (string concatenation) versus 7 (number addition).",
      mistake: "Assuming + always performs numeric addition, without checking whether one of the values is actually a string.",
      checks: [{ q: 'In JavaScript, "5" + 5 evaluates to:', options: ['10', '"55" (string concatenation)', 'An error', '0'], correct: 1 }],
    }),
    rl('Comparison Operators', 'concept', {
      concept: "Comparison operators (===, !==, <, >, <=, >=) compare values and return true/false — === (strict equality) checks both value AND type, while == (loose equality) allows type coercion, which is why === is generally recommended to avoid unexpected behavior.",
      why: "== can produce surprising results (0 == \"0\" is true, and even 0 == false is true) because it converts types before comparing; === avoids this by requiring an exact type match too.",
      example: "5 === \"5\" is false (different types: number vs string), while 5 == \"5\" is true (loose equality converts types first) — === is the safer, more predictable default.",
      practice: "Predict whether 5 === \"5\" and 5 == \"5\" are each true or false.",
      success: "You correctly identify === as false and == as true, understanding the type-coercion difference.",
      mistake: "Defaulting to == instead of === and being surprised by unexpected type-coercion results.",
      checks: [{ q: 'The recommended default equality operator in JavaScript is generally:', options: ['== (loose equality)', '=== (strict equality)', 'Neither, comparisons should be avoided', '<> '], correct: 1 }],
    }),
    rl('Logical Operators: AND, OR, NOT', 'concept', {
      concept: "&& (AND) is true only if both sides are true, || (OR) is true if at least one side is true, and ! (NOT) inverts a boolean — these combine multiple conditions into a single true/false result, commonly used in if statements.",
      why: "Combining conditions with && and || lets code check multiple requirements at once instead of nesting many separate if statements.",
      example: "if (age >= 18 && hasID) { ... } only runs if BOTH conditions are true; if (isAdmin || isOwner) { ... } runs if EITHER condition is true.",
      practice: "Write an if condition using && that checks both isLoggedIn and hasPermission are true.",
      success: "Your condition correctly uses && to require both values to be true.",
      mistake: "Using || when && was actually needed (or vice versa), producing logic that runs in unintended cases.",
      checks: [{ q: 'The && (AND) operator evaluates to true when:', options: ['At least one side is true', 'Both sides are true', 'Neither side is true', 'Exactly one side is true'], correct: 1 }],
    }),
    rl('Operator Precedence', 'concept', {
      concept: "Operator precedence determines the order operations happen in when multiple operators appear in one expression (similar to math's \"order of operations\") — multiplication/division happen before addition/subtraction, and parentheses can be used to force a specific order explicitly.",
      why: "Not understanding precedence can produce results that don't match what a beginner expected the expression to calculate.",
      example: "2 + 3 * 4 evaluates to 14 (multiplication happens first: 3*4=12, then +2), not 20 — using (2 + 3) * 4 with parentheses would force 20 instead.",
      practice: "Predict the result of 10 - 2 * 3, then rewrite it with parentheses to force the subtraction to happen first.",
      success: "You correctly identify 4 as the default result, and (10 - 2) * 3 = 24 with forced parentheses.",
      mistake: "Assuming expressions always evaluate strictly left-to-right, ignoring operator precedence rules.",
      checks: [{ q: 'In JavaScript (and standard math), multiplication generally:', options: ['Happens after addition, always', 'Happens before addition unless parentheses force a different order', 'Has no defined precedence', 'Is identical in precedence to addition'], correct: 1 }],
    }),
    ra([
      { q: 'In JavaScript, "5" + 5 evaluates to:', options: ['10', '"55"', 'An error', '0'], correct: 1 },
      { q: 'The recommended default equality operator is:', options: ['==', '===', 'Neither', '<>'], correct: 1 },
      { q: 'The && operator is true when:', options: ['At least one side is true', 'Both sides are true', 'Neither is true', 'Exactly one is true'], correct: 1 },
      { q: 'Multiplication generally:', options: ['Happens after addition always', 'Happens before addition unless parentheses override', 'Has no precedence', 'Equals addition in precedence'], correct: 1 },
      { q: 'Defaulting to == instead of === risks:', options: ['More predictable comparisons', 'Surprising results from automatic type coercion', 'No real difference', 'Improved code safety'], correct: 1 },
    ]),
  ] },
  { id: 'js-m4', title: 'Conditions', objective: 'Make your programs branch and make decisions using if/else logic.', lessons: [
    rl('if, else if, and else', 'concept', {
      concept: "if runs a code block only when its condition is true; else if checks another condition if the previous ones were false; else runs as a fallback when none of the conditions matched — together they let a program branch its behavior based on different situations.",
      why: "Without conditionals, a program does the exact same thing every time regardless of the actual data or situation — conditionals are what let code make real decisions.",
      example: "if (score >= 90) { grade = 'A'; } else if (score >= 80) { grade = 'B'; } else { grade = 'C'; } assigns a grade based on which condition actually matches.",
      practice: "Write an if/else if/else chain assigning 'Adult' if age >= 18, 'Teen' if age >= 13, else 'Child'.",
      success: "Your chain correctly orders conditions from most to least restrictive and includes a final else fallback.",
      mistake: "Writing conditions in an order where an earlier, broader condition accidentally catches cases meant for a later, more specific one.",
      checks: [{ q: 'An else block runs when:', options: ['Every condition above it was true', 'None of the preceding if/else if conditions were true', 'The first if condition is true', 'Never, it\u2019s optional decoration'], correct: 1 }],
    }),
    rl('switch Statements', 'concept', {
      concept: "A switch statement checks one value against multiple possible exact matches (case) — a cleaner alternative to a long chain of else if statements when checking one variable against many specific possible values.",
      why: "A long else if chain checking the same variable repeatedly can become harder to read than the equivalent switch statement, especially with many possible values.",
      example: "switch (day) { case 'Mon': ...; case 'Tue': ...; default: ...; } checks the day variable against multiple specific values more readably than repeated else if (day === 'Mon') checks.",
      practice: "Rewrite a hypothetical long else-if chain checking a 'color' variable into an equivalent switch statement.",
      success: "Your switch statement correctly uses case for each value and includes a default fallback.",
      mistake: "Forgetting to include break after each case (in traditional switch usage), causing unintended \"fall-through\" to the next case.",
      checks: [{ q: 'A switch statement is generally most useful when:', options: ['Checking many different unrelated conditions', 'Checking one variable against many specific possible exact values', 'There is only one possible condition to check', 'Conditionals should never be used'], correct: 1 }],
    }),
    rl('Truthy and Falsy Values', 'concept', {
      concept: "In a boolean context (like an if condition), JavaScript treats certain values as \"falsy\" (false, 0, \"\", null, undefined, NaN) and everything else as \"truthy\" — this means non-boolean values can be used directly in conditions, which can either be convenient or a source of bugs if not understood.",
      why: "A beginner might write if (userInput) expecting it to check for a specific value, not realizing an empty string or 0 would also be treated as falsy and skip the block unexpectedly.",
      example: "if (0) { ... } never runs, since 0 is falsy; if (\"\") { ... } also never runs, since an empty string is falsy — both without ever comparing to a specific value.",
      practice: "List 3 values (other than false itself) that are falsy in JavaScript.",
      success: "Your list correctly includes values from: 0, \"\", null, undefined, NaN.",
      mistake: "Writing a condition expecting only 'false' to be falsy, not realizing 0, empty strings, null, and undefined are falsy too.",
      checks: [{ q: 'Which of these is considered "falsy" in JavaScript?', options: ['1', 'An empty string ""', 'A non-empty string "hello"', 'An object {}'], correct: 1 }],
    }),
    rl('Workshop: Build a Simple Decision Tool', 'workshop', {
      concept: "Combining if/else logic with variables and comparison operators can build a simple decision tool — e.g. a basic tip calculator that recommends a tip percentage based on service quality input.",
      why: "Building a small, complete decision-based tool reinforces how conditionals, variables, and operators work together in a real, if simple, program.",
      example: "A tool that takes a 'serviceRating' input and outputs a recommended tip percentage using if/else if branches for different rating ranges.",
      practice: "Outline the if/else if/else logic (in plain English or pseudocode) for a simple tool recommending a tip percentage based on a 1-5 service rating.",
      success: "Your logic correctly branches across the rating range with a sensible recommendation for each.",
      mistake: "Designing overlapping or gapped conditions that don't cleanly cover the full range of possible inputs.",
      checks: [{ q: 'A simple decision tool built with conditionals mainly demonstrates:', options: ['That conditionals are unnecessary for real programs', 'How variables, operators, and conditionals combine to produce different outputs', 'That switch statements are required for all logic', 'Nothing practical about JavaScript'], correct: 1 }],
    }),
    ra([
      { q: 'An else block runs when:', options: ['Every prior condition was true', 'None of the preceding conditions were true', 'The first if is true', 'It never runs'], correct: 1 },
      { q: 'A switch statement is most useful when:', options: ['Checking unrelated conditions', 'Checking one variable against many specific values', 'There\u2019s only one condition', 'Conditionals should be avoided'], correct: 1 },
      { q: 'Which is falsy in JavaScript?', options: ['1', 'An empty string ""', 'A non-empty string', 'An object {}'], correct: 1 },
      { q: 'A decision tool built with conditionals demonstrates:', options: ['Conditionals are unnecessary', 'How variables/operators/conditionals combine for different outputs', 'Switch is always required', 'Nothing practical'], correct: 1 },
      { q: 'Forgetting break in a traditional switch statement can cause:', options: ['No effect at all', 'Unintended fall-through to the next case', 'A syntax error always', 'Improved logic'], correct: 1 },
    ]),
  ] },
  { id: 'js-m5', title: 'Loops', objective: 'Repeat actions efficiently using for and while loops.', lessons: [
    rl('The for Loop', 'concept', {
      concept: "A for loop repeats a block of code a specific number of times, using three parts: initialization (starting value), condition (when to stop), and increment (how to change each time) — for (let i = 0; i < 5; i++) runs 5 times, with i going 0 through 4.",
      why: "The for loop is the most common way to repeat an action a known number of times, avoiding the need to write the same code manually 5, 10, or 100 times.",
      example: "for (let i = 0; i < 3; i++) { console.log(i); } prints 0, 1, 2 — running the block 3 times with i changing each time.",
      practice: "Write a for loop that prints the numbers 1 through 5.",
      success: "Your loop correctly starts at 1, runs while <= 5, and increments correctly.",
      mistake: "Writing a loop condition that runs one too many or too few times (an 'off-by-one' error), a very common beginner mistake.",
      checks: [{ q: 'A for loop\u2019s three parts are:', options: ['Only a condition', 'Initialization, condition, and increment', 'Only initialization and increment', 'A single combined statement with no parts'], correct: 1 }],
    }),
    rl('The while Loop', 'concept', {
      concept: "A while loop repeats a block of code as long as a condition remains true, checked before each iteration — useful when the number of repetitions isn't known in advance (unlike a for loop's typical fixed count).",
      why: "A while loop is the right tool when a loop should continue based on some changing condition (like user input or a game state) rather than a predetermined count.",
      example: "while (userWantsToContinue) { ... } keeps running as long as that condition stays true, however many iterations that ends up being.",
      practice: "Write a while loop that counts down from 5 to 1.",
      success: "Your loop correctly decrements a counter and stops once it goes below 1.",
      mistake: "Forgetting to update the condition variable inside the loop body, causing it to run forever.",
      checks: [{ q: 'A while loop is generally best suited for situations where:', options: ['The number of repetitions is always known in advance', 'The number of repetitions depends on a changing condition', 'No repetition is needed at all', 'Only arrays need to be processed'], correct: 1 }],
    }),
    rl('Looping Over Arrays', 'how-to', {
      concept: "Arrays are commonly looped over using a for loop with the array's length (for (let i = 0; i < arr.length; i++)) or the more modern, readable forEach method (arr.forEach(item => { ... })) — both visit every item in the array.",
      why: "Looping is essential for processing collections of data — checking or transforming every item in a list one at a time.",
      example: "['apple', 'banana', 'cherry'].forEach(fruit => console.log(fruit)); prints each fruit name, one per iteration.",
      practice: "Write code using forEach to print every item in an array called colors.",
      success: "Your code correctly uses .forEach with a callback function printing each item.",
      mistake: "Using arr.length incorrectly in a for loop (e.g. <= instead of <), causing an out-of-bounds error trying to access a non-existent array index.",
      checks: [{ q: 'The forEach method is used to:', options: ['Sort an array', 'Run a function once for each item in an array', 'Delete items from an array', 'Convert an array to a string'], correct: 1 }],
    }),
    rl('Avoiding Infinite Loops', 'troubleshooting', {
      concept: "An infinite loop occurs when a loop's stopping condition never becomes false (often because the loop variable is never updated correctly), causing the program to hang or crash — always double-check that a loop's condition will eventually be met.",
      why: "Infinite loops are a very common early bug, and recognizing the pattern (a condition that logically can never become false given how the code updates variables) helps debug them quickly.",
      example: "for (let i = 0; i < 5; i--) never stops, since i-- moves i further away from ever reaching 5 instead of closer — an easy typo (-- instead of ++) causing an infinite loop.",
      practice: "Identify the bug in this loop: let i = 0; while (i < 10) { console.log(i); } (missing an increment) and explain the fix.",
      success: "You correctly identify the missing i++ (or similar) as the cause and add it as the fix.",
      mistake: "Writing a loop condition or update step that can never actually cause the condition to become false.",
      checks: [{ q: 'An infinite loop typically occurs when:', options: ['The loop condition changes correctly each iteration', 'The loop\u2019s stopping condition never becomes false', 'A for loop has too many parts', 'Arrays are looped over with forEach'], correct: 1 }],
    }),
    ra([
      { q: 'A for loop\u2019s three parts are:', options: ['Only a condition', 'Initialization, condition, increment', 'Only init and increment', 'A single statement'], correct: 1 },
      { q: 'A while loop is best suited for:', options: ['Always-known repetition counts', 'Repetition depending on a changing condition', 'No repetition', 'Only array processing'], correct: 1 },
      { q: 'forEach is used to:', options: ['Sort an array', 'Run a function once per array item', 'Delete array items', 'Convert to a string'], correct: 1 },
      { q: 'An infinite loop typically occurs when:', options: ['The condition updates correctly', 'The stopping condition never becomes false', 'A loop has too many parts', 'forEach is used'], correct: 1 },
      { q: 'Forgetting to update a while loop\u2019s condition variable inside the loop body typically causes:', options: ['The loop to run the correct number of times', 'An infinite loop', 'A syntax error', 'No effect'], correct: 1 },
    ]),
  ] },
  { id: 'js-m6', title: 'Functions', objective: 'Write reusable blocks of logic using functions, parameters, and return values.', lessons: [
    rl('Why Functions Matter', 'concept', {
      concept: "A function is a reusable, named block of code that can be run (\"called\") whenever needed — functions prevent repeating the same code multiple times and let complex programs be broken into smaller, understandable, testable pieces.",
      why: "Without functions, repeated logic has to be copy-pasted everywhere it's needed, making updates require finding and changing every copy — a maintenance nightmare as programs grow.",
      example: "function greet(name) { console.log('Hello, ' + name); } can be called as greet('Amara') or greet('Chidi') without rewriting the greeting logic each time.",
      practice: "Write one sentence explaining why defining a function once and calling it many times is better than repeating the same code.",
      success: "Your explanation references maintainability/avoiding repetition specifically.",
      mistake: "Copy-pasting the same logic repeatedly throughout code instead of extracting it into a single reusable function.",
      checks: [{ q: 'A function is best described as:', options: ['A one-time-use block of code', 'A reusable, named block of code that can be called whenever needed', 'A type of variable', 'Something only used for math'], correct: 1 }],
    }),
    rl('Parameters and Arguments', 'concept', {
      concept: "Parameters are the named placeholders a function declares it accepts (function add(a, b)); arguments are the actual values passed in when calling it (add(3, 5)) — this distinction lets one function definition work with many different inputs.",
      why: "Understanding this distinction clarifies why the same function can produce different results depending on what's passed in each time it's called.",
      example: "function multiply(x, y) { return x * y; } has parameters x and y; calling multiply(4, 5) passes arguments 4 and 5, returning 20.",
      practice: "Write a function called subtract with two parameters that returns their difference, then call it with two specific arguments.",
      success: "Your function correctly defines 2 parameters and your call passes 2 matching arguments.",
      mistake: "Confusing parameters (the placeholder names in the function definition) with arguments (the actual values passed when calling).",
      checks: [{ q: 'Parameters and arguments differ in that:', options: ['They are identical terms', 'Parameters are placeholders in the definition; arguments are actual values passed in', 'Arguments are placeholders; parameters are actual values', 'Neither term is used in JavaScript'], correct: 1 }],
    }),
    rl('Return Values', 'concept', {
      concept: "The return keyword sends a value back out of a function to wherever it was called, allowing that value to be stored, used in further calculations, or passed elsewhere — a function with no return statement returns undefined by default.",
      why: "Without return, a function might perform useful work internally but can't hand back a usable result to the rest of the program.",
      example: "function square(n) { return n * n; } lets you write let result = square(4); capturing the returned value 16 for further use.",
      practice: "Write a function called double that takes a number and returns it multiplied by 2, then store the result of calling it with 7 in a variable.",
      success: "Your function correctly uses return, and your variable correctly captures the returned value.",
      mistake: "Forgetting the return statement, causing the function to always produce undefined when its result is expected to be used.",
      checks: [{ q: 'A function with no explicit return statement returns:', options: ['0', 'undefined', 'An error, always', 'The last parameter passed in'], correct: 1 }],
    }),
    rl('Arrow Functions', 'concept', {
      concept: "Arrow functions (const add = (a, b) => a + b;) are a shorter, more modern syntax for writing functions, especially useful for short functions passed as arguments (like in forEach or map) — they behave similarly to regular functions with a few technical differences beyond this course's scope.",
      why: "Arrow function syntax is extremely common in modern JavaScript code, so recognizing and being able to write it is essential for reading real-world code and using array methods effectively.",
      example: "numbers.forEach(n => console.log(n)); uses a concise arrow function instead of the longer function(n) { console.log(n); } syntax.",
      practice: "Rewrite function double(n) { return n * 2; } as an equivalent arrow function.",
      success: "Your arrow function is syntactically correct and behaves equivalently (e.g. const double = n => n * 2;).",
      mistake: "Being unable to read or write arrow function syntax, which appears extremely frequently in modern JavaScript code and tutorials.",
      checks: [{ q: 'Arrow functions are mainly used as:', options: ['A completely unrelated JavaScript feature', 'A shorter, modern syntax for writing functions', 'Something that only works with numbers', 'A replacement for variables'], correct: 1 }],
    }),
    ra([
      { q: 'A function is best described as:', options: ['A one-time-use block', 'A reusable, named, callable block of code', 'A type of variable', 'Only for math'], correct: 1 },
      { q: 'Parameters vs. arguments:', options: ['Identical terms', 'Parameters are placeholders; arguments are actual passed values', 'Arguments are placeholders; parameters are actual values', 'Neither exists in JS'], correct: 1 },
      { q: 'A function with no return statement returns:', options: ['0', 'undefined', 'Always an error', 'The last parameter'], correct: 1 },
      { q: 'Arrow functions are:', options: ['Unrelated to functions', 'A shorter, modern function syntax', 'Only for numbers', 'A replacement for variables'], correct: 1 },
      { q: 'Copy-pasting repeated logic instead of using a function typically:', options: ['Improves maintainability', 'Makes future updates harder (must fix every copy)', 'Has no downside', 'Is the recommended practice'], correct: 1 },
    ]),
  ] },
  { id: 'js-m7', title: 'Arrays', objective: 'Store and manipulate ordered lists of data using arrays and array methods.', lessons: [
    rl('Creating and Accessing Arrays', 'concept', {
      concept: "An array is an ordered list of values (const fruits = ['apple', 'banana', 'cherry'];) — individual items are accessed by their zero-based index (fruits[0] is 'apple', not 'banana'), which is a common early point of confusion.",
      why: "Zero-based indexing (starting count at 0, not 1) trips up many beginners at first, since it's different from how we count in everyday life.",
      example: "const colors = ['red', 'green', 'blue']; colors[0] is 'red', colors[2] is 'blue' — the index is always one less than the \"human count\" position.",
      practice: "Given const animals = ['cat', 'dog', 'bird'], write the expression to access 'dog'.",
      success: "You correctly identify animals[1] as accessing 'dog'.",
      mistake: "Assuming array indexing starts at 1 instead of 0, leading to off-by-one errors when accessing items.",
      checks: [{ q: 'Array indexing in JavaScript starts at:', options: ['1', '0', '-1', 'It varies by array'], correct: 1 }],
    }),
    rl('push, pop, and Modifying Arrays', 'how-to', {
      concept: "push() adds an item to the end of an array; pop() removes and returns the last item — these are two of the most common ways to modify an array's contents after it's created.",
      why: "Being able to dynamically add/remove items is essential for arrays that represent changing data, like a shopping cart or a to-do list.",
      example: "const list = ['a', 'b']; list.push('c'); now makes list ['a', 'b', 'c']; list.pop(); would then remove 'c', returning it and leaving ['a', 'b'].",
      practice: "Starting with const nums = [1, 2, 3], write code to push 4 onto the end, then pop the last item off.",
      success: "Your code correctly uses .push(4) and then .pop() in sequence.",
      mistake: "Confusing push (adds to end) with pop (removes from end), or expecting either to work on the beginning of the array instead.",
      checks: [{ q: 'The push() method:', options: ['Removes the first item', 'Adds an item to the end of the array', 'Removes the last item', 'Sorts the array'], correct: 1 }],
    }),
    rl('Looping Over Arrays with forEach', 'how-to', {
      concept: "The forEach method runs a provided function once for each item in an array, automatically handling the iteration — a cleaner, more readable alternative to manually writing a for loop with an index counter for simple iteration needs.",
      why: "forEach reads clearly as \"do this for each item\" and eliminates common indexing mistakes (off-by-one errors) that manual for loops can introduce.",
      example: "['a', 'b', 'c'].forEach(letter => console.log(letter)); automatically runs the function once per item, printing 'a', 'b', 'c' without manual index tracking.",
      practice: "Use forEach to print each number in an array called scores, doubled.",
      success: "Your code correctly uses .forEach with a callback that doubles and logs each score.",
      mistake: "Writing a manual for loop with index tracking when forEach would be simpler and less error-prone for the same task.",
      checks: [{ q: 'forEach automatically:', options: ['Sorts the array first', 'Handles the iteration, running a function once per item', 'Only works on arrays of numbers', 'Modifies the original array\u2019s order'], correct: 1 }],
    }),
    rl('map and filter', 'how-to', {
      concept: "map() creates a NEW array by transforming every item (e.g. doubling each number); filter() creates a NEW array containing only items that pass a test (e.g. only numbers greater than 10) — both leave the original array unchanged.",
      why: "Understanding that map/filter return new arrays (rather than modifying the original) prevents confusion about why the original data seems unchanged after using them.",
      example: "[1, 2, 3].map(n => n * 2) returns [2, 4, 6]; [1, 2, 3].filter(n => n > 1) returns [2, 3] — both without altering the original [1, 2, 3] array.",
      practice: "Use map to create a new array doubling every value in [1, 2, 3], and filter to create a new array with only values greater than 1 from the same array.",
      success: "Your map result is [2, 4, 6] and your filter result is [2, 3], with the original array unchanged.",
      mistake: "Expecting map or filter to modify the original array directly, rather than realizing they return a new array.",
      checks: [{ q: 'map() and filter() both:', options: ['Modify the original array directly', 'Return a new array, leaving the original unchanged', 'Only work on strings', 'Delete the original array'], correct: 1 }],
    }),
    ra([
      { q: 'Array indexing starts at:', options: ['1', '0', '-1', 'Varies'], correct: 1 },
      { q: 'push() adds an item:', options: ['To the beginning', 'To the end of the array', 'Nowhere, it removes items', 'Only to sorted arrays'], correct: 1 },
      { q: 'forEach automatically:', options: ['Sorts first', 'Handles iteration, running a function per item', 'Only works on numbers', 'Reorders the array'], correct: 1 },
      { q: 'map() and filter() both:', options: ['Modify the original array', 'Return a new array, original unchanged', 'Only work on strings', 'Delete the array'], correct: 1 },
      { q: 'Assuming array indexing starts at 1 typically causes:', options: ['Correct access every time', 'Off-by-one access errors', 'No real issue', 'Improved reliability'], correct: 1 },
    ]),
  ] },
  { id: 'js-m8', title: 'Objects', objective: 'Model real-world data using objects with properties and methods.', lessons: [
    rl('Creating Objects', 'concept', {
      concept: "An object stores data as key-value pairs (const user = { name: 'Amara', age: 28 };) — unlike arrays (ordered lists accessed by index), objects are accessed by named keys, making them ideal for representing a single \"thing\" with multiple named properties.",
      why: "Objects model real-world entities (a user, a product, a car) far more naturally than arrays, since each property has a meaningful name rather than just a position.",
      example: "const product = { name: 'Notebook', price: 5, inStock: true }; groups related information about one product under clearly named properties.",
      practice: "Create an object called car with properties for make, model, and year.",
      success: "Your object correctly uses key-value pairs with appropriate property names.",
      mistake: "Using an array when an object would better represent named, related properties of a single entity.",
      checks: [{ q: 'An object in JavaScript stores data as:', options: ['An ordered list accessed by index', 'Key-value pairs accessed by named keys', 'Only numbers', 'A single value only'], correct: 1 }],
    }),
    rl('Accessing and Updating Properties', 'how-to', {
      concept: "Object properties are accessed using dot notation (user.name) or bracket notation (user['name']) — and can be updated by simply assigning a new value to that property (user.age = 29;).",
      why: "Dot notation is more common and readable for known property names; bracket notation is needed when the property name is stored in a variable or contains special characters.",
      example: "const user = { name: 'Amara' }; console.log(user.name); logs 'Amara'; user.name = 'Chioma'; updates it.",
      practice: "Given const person = { name: 'Kofi', age: 30 }, write code to update age to 31 and log the new value.",
      success: "Your code correctly reassigns person.age = 31 and logs person.age.",
      mistake: "Trying to access a non-existent property and being confused by the resulting undefined instead of an error.",
      checks: [{ q: 'Object properties can be updated by:', options: ['Only recreating the whole object', 'Assigning a new value directly to that property', 'Objects cannot be updated once created', 'Only using bracket notation, never dot notation'], correct: 1 }],
    }),
    rl('Objects Inside Arrays', 'concept', {
      concept: "Arrays of objects (const users = [{name: 'Amara'}, {name: 'Chidi'}];) are an extremely common real-world data pattern — representing a list of multiple structured \"things,\" like a list of users, products, or blog posts.",
      why: "Almost all real applications deal with collections of structured data (many users, many products) — this pattern combines arrays (the collection) and objects (each item's structure).",
      example: "const products = [{ name: 'Pen', price: 1 }, { name: 'Notebook', price: 5 }]; represents a small product catalog, where products[0].name accesses 'Pen'.",
      practice: "Given the products array above, write the expression to access the price of the second product.",
      success: "You correctly identify products[1].price as accessing 5.",
      mistake: "Confusing array index access with object property access when combining the two, especially in deeply nested data.",
      checks: [{ q: 'An array of objects is commonly used to represent:', options: ['A single unrelated value', 'A list/collection of multiple structured items', 'Something JavaScript doesn\u2019t support', 'Only numeric data'], correct: 1 }],
    }),
    ra([
      { q: 'An object stores data as:', options: ['An ordered list by index', 'Key-value pairs by named keys', 'Only numbers', 'A single value'], correct: 1 },
      { q: 'Object properties can be updated by:', options: ['Recreating the whole object only', 'Assigning a new value directly', 'They cannot be updated', 'Only via bracket notation'], correct: 1 },
      { q: 'An array of objects commonly represents:', options: ['A single value', 'A list/collection of structured items', 'Something unsupported', 'Only numeric data'], correct: 1 },
      { q: 'Using an array instead of an object for named, related properties of one entity typically:', options: ['Models the data more naturally', 'Models the data less naturally than an object would', 'Has no real difference', 'Is always required'], correct: 1 },
      { q: 'Accessing a non-existent object property returns:', options: ['An error, always', 'undefined', '0', 'null, always'], correct: 1 },
    ]),
  ] },
  { id: 'js-m9', title: 'DOM Fundamentals', objective: 'Select and modify real HTML elements on the page using JavaScript.', lessons: [
    rl('What the DOM Actually Is', 'concept', {
      concept: "The DOM (Document Object Model) is the browser's live, in-memory representation of an HTML page as a tree of objects — JavaScript can read and modify this tree, which is what lets JS actually change what's visible on a page after it loads.",
      why: "Understanding the DOM as \"the page represented as objects JS can touch\" explains how JavaScript is able to dynamically update content without reloading the page.",
      example: "When JavaScript changes an element's text, it isn't editing the original HTML file — it's modifying the live DOM tree the browser is currently displaying.",
      practice: "Write one sentence explaining, in your own words, what the DOM represents.",
      success: "Your explanation captures the idea of a live, JS-accessible representation of the page's structure.",
      mistake: "Confusing the DOM with the original HTML source file, not realizing it's a separate, live, modifiable representation in the browser.",
      checks: [{ q: 'The DOM is best described as:', options: ['The original HTML source file, unchanged', 'The browser\u2019s live, in-memory, JS-modifiable representation of the page', 'A CSS-only feature', 'A server-side technology'], correct: 1 }],
    }),
    rl('document.querySelector', 'how-to', {
      concept: "document.querySelector(selector) finds and returns the FIRST element matching a CSS-style selector (like '.card' or '#header'); document.querySelectorAll returns ALL matching elements as a list — these are the primary ways JS finds elements to work with.",
      why: "Before JS can change or read anything about an element, it first needs to select/find that element in the DOM — querySelector is the most common, flexible way to do this.",
      example: "const heading = document.querySelector('h1'); selects the first <h1> on the page, storing a reference to it for further use.",
      practice: "Write the JS code to select an element with the class 'card' using querySelector.",
      success: "Your code correctly uses document.querySelector('.card').",
      mistake: "Using querySelector when multiple elements need to be selected, when querySelectorAll would be the correct choice for that case.",
      checks: [{ q: 'document.querySelector returns:', options: ['All matching elements as a list', 'Only the first matching element', 'Nothing, it only checks existence', 'A CSS stylesheet'], correct: 1 }],
    }),
    rl('Changing Text and Styles with JS', 'how-to', {
      concept: "Once an element is selected, its text content can be changed via .textContent, and its inline styles via .style (e.g. element.style.color = 'red';) — this is how JavaScript dynamically updates what a page shows and how it looks.",
      why: "This is one of the most fundamental, practical DOM skills — nearly every interactive webpage feature involves changing text or styles in response to something.",
      example: "const msg = document.querySelector('#message'); msg.textContent = 'Success!'; msg.style.color = 'green'; updates both the text and its color dynamically.",
      practice: "Write code selecting an element with id 'status' and setting its text to 'Loading...' and its color style to 'blue'.",
      success: "Your code correctly selects the element, then sets both .textContent and .style.color.",
      mistake: "Using .innerHTML when .textContent would be safer and sufficient, especially with any user-provided content (a security consideration beyond this lesson's depth, but worth flagging).",
      checks: [{ q: 'To change an element\u2019s displayed text via JavaScript, you\u2019d typically use:', options: ['.style', '.textContent', '.query', '.class'], correct: 1 }],
    }),
    rl('Creating New Elements', 'how-to', {
      concept: "New DOM elements can be created with document.createElement('tag'), configured (text, attributes), and then added to the page with appendChild() or append() — this lets JavaScript dynamically add entirely new content, not just modify existing elements.",
      why: "Many dynamic features (adding a new item to a list, generating content from data) require creating brand-new elements rather than just editing existing ones.",
      howTo: [
        'Create the element: const li = document.createElement(\"li\");',
        'Set its content: li.textContent = \"New item\";',
        'Select the parent element it should be added to.',
        'Append it: parentElement.appendChild(li);',
      ],
      example: "const newItem = document.createElement('li'); newItem.textContent = 'Milk'; document.querySelector('ul').appendChild(newItem); adds a new list item dynamically.",
      practice: "Write code creating a new <p> element with the text 'Hello!' and appending it to an element with id 'container'.",
      success: "Your code correctly creates the element, sets its text, and appends it to the correct parent.",
      mistake: "Forgetting the appendChild step, creating an element that exists in memory but never actually appears on the page.",
      checks: [{ q: 'A newly created element with document.createElement will appear on the page:', options: ['Automatically, with no further steps', 'Only after being appended to an existing element in the DOM', 'Immediately upon creation, always', 'Never, createElement is only for testing'], correct: 1 }],
    }),
    ra([
      { q: 'The DOM is best described as:', options: ['The unchanged HTML file', 'The browser\u2019s live, JS-modifiable page representation', 'A CSS-only feature', 'A server technology'], correct: 1 },
      { q: 'document.querySelector returns:', options: ['All matches as a list', 'Only the first match', 'Nothing measurable', 'A stylesheet'], correct: 1 },
      { q: 'To change displayed text via JS, you\u2019d use:', options: ['.style', '.textContent', '.query', '.class'], correct: 1 },
      { q: 'A newly created element appears on the page:', options: ['Automatically', 'Only after being appended to the DOM', 'Immediately always', 'Never'], correct: 1 },
      { q: 'Confusing the DOM with the original HTML source file risks:', options: ['No real confusion', 'Misunderstanding how JS dynamically updates a page without reloading', 'Improved understanding', 'Nothing relevant to learn here'], correct: 1 },
    ]),
  ] },
  { id: 'js-m10', title: 'Events', objective: 'Make pages respond to clicks, typing, and other user actions.', lessons: [
    rl('addEventListener', 'concept', {
      concept: "addEventListener(event, function) attaches a function to an element that runs automatically whenever a specific event (like a click) occurs — this is the standard, modern way to make elements interactive in response to user actions.",
      why: "Without event listeners, a webpage is static and can't respond to anything the user does (clicking, typing, scrolling).",
      example: "button.addEventListener('click', () => { alert('Clicked!'); }); runs the alert function every time that button is clicked, however many times that happens.",
      practice: "Write code adding a click event listener to an element with id 'submit-btn' that logs 'Submitted!' to the console.",
      success: "Your code correctly selects the element and uses addEventListener('click', ...) with the appropriate function.",
      mistake: "Forgetting to select the element first before trying to call addEventListener on it.",
      checks: [{ q: 'addEventListener is used to:', options: ['Permanently disable an element', 'Attach a function that runs automatically when a specific event occurs', 'Delete an element from the DOM', 'Style an element'], correct: 1 }],
    }),
    rl('Click Events', 'how-to', {
      concept: "The 'click' event is the most common interactive event, firing whenever a user clicks (or taps, on touch devices) an element — the event listener's function can access details about the click via an event object passed automatically as its argument.",
      why: "Click handling is the foundation of most interactive web features — buttons, menus, toggles, and more all rely on responding to clicks.",
      example: "button.addEventListener('click', (event) => { console.log('Button clicked!', event.target); }); logs a message and the specific element that was clicked.",
      practice: "Write a click event listener on an element with class 'toggle-btn' that changes its text to 'Clicked!' when clicked.",
      success: "Your code correctly attaches the listener and updates .textContent within the handler function.",
      mistake: "Writing event-handling logic that assumes the click event fires immediately on page load rather than only when actually clicked.",
      checks: [{ q: 'The \'click\' event fires:', options: ['Automatically when the page loads', 'Whenever the user clicks/taps the element', 'Only once per page, ever', 'Only on links, never buttons'], correct: 1 }],
    }),
    rl('Keyboard and Input Events', 'concept', {
      concept: "Beyond clicks, common events include 'keydown'/'keyup' (keyboard presses) and 'input' (fires whenever a text field's value changes) — these let JavaScript respond to typing in real time, not just after a form is submitted.",
      why: "Real-time input feedback (like a live character counter or instant search suggestions) relies on listening to input events as the user types, not waiting for a separate submit action.",
      example: "inputField.addEventListener('input', (e) => { console.log('Current value:', e.target.value); }); logs the field's current value on every keystroke.",
      practice: "Write an input event listener on a text field with id 'search' that logs the current value as the user types.",
      success: "Your code correctly listens for the 'input' event and accesses e.target.value.",
      mistake: "Using 'click' events to try to detect typing, when 'input' or keyboard events are the appropriate choice for that purpose.",
      checks: [{ q: 'The \'input\' event fires:', options: ['Only once, on page load', 'Whenever a text field\u2019s value changes', 'Only when a form is submitted', 'Only on button elements'], correct: 1 }],
    }),
    rl('Workshop: Build a Click Counter', 'workshop', {
      concept: "A click counter combines a variable (tracking the count), a click event listener (incrementing it), and DOM manipulation (displaying the updated count) — a small but complete demonstration of variables, events, and the DOM working together.",
      why: "Building this small, complete interactive feature reinforces how the pieces learned separately (variables, DOM selection, events) combine into a real, working interactive element.",
      example: "let count = 0; button.addEventListener('click', () => { count++; display.textContent = count; }); increments and displays the count on every click.",
      practice: "Outline (in pseudocode or real code) the logic for a click counter that also has a 'reset' button setting the count back to 0.",
      success: "Your logic correctly handles both the increment button and a separate reset button resetting the count and display.",
      mistake: "Forgetting to update the displayed count in the DOM after incrementing the variable, leaving the visual counter stuck even though the underlying value is changing.",
      checks: [{ q: 'A working click counter requires combining:', options: ['Only a variable, with no DOM update needed', 'A variable, an event listener, and a DOM update to display it', 'Only CSS, no JavaScript', 'Only an event listener, with no variable needed'], correct: 1 }],
    }),
    ra([
      { q: 'addEventListener is used to:', options: ['Disable an element', 'Attach a function that runs on a specific event', 'Delete an element', 'Style an element'], correct: 1 },
      { q: 'The click event fires:', options: ['On page load automatically', 'When the user clicks/taps the element', 'Only once ever', 'Only on links'], correct: 1 },
      { q: 'The input event fires:', options: ['Only on page load', 'Whenever a text field\u2019s value changes', 'Only on form submit', 'Only on buttons'], correct: 1 },
      { q: 'A working click counter requires:', options: ['Only a variable', 'A variable, event listener, and DOM update together', 'Only CSS', 'Only an event listener'], correct: 1 },
      { q: 'Forgetting to update the DOM after incrementing a counter variable typically results in:', options: ['The displayed count updating correctly', 'The displayed count appearing stuck despite the variable changing', 'No real issue', 'Improved performance'], correct: 1 },
    ]),
  ] },
  { id: 'js-m11', title: 'Forms & Validation', objective: 'Read form input and validate it before using it.', lessons: [
    rl('Reading Form Input Values', 'how-to', {
      concept: "An input element's current value is accessed via its .value property (inputElement.value) — this is how JavaScript reads what a user has typed into a form field.",
      why: "Almost any form-processing logic (validation, submission, live feedback) starts with reading the current value(s) a user has entered.",
      example: "const email = document.querySelector('#email').value; captures whatever the user has currently typed into the email field.",
      practice: "Write code reading the value of an input with id 'username' into a variable.",
      success: "Your code correctly selects the element and accesses its .value property.",
      mistake: "Trying to read .textContent instead of .value on an input element, which doesn't contain the typed value the same way.",
      checks: [{ q: 'An input element\u2019s current typed value is accessed via:', options: ['.textContent', '.value', '.innerHTML', '.class'], correct: 1 }],
    }),
    rl('Preventing Default Form Submission', 'how-to', {
      concept: "By default, submitting an HTML form reloads the page — calling event.preventDefault() inside a 'submit' event listener stops this default behavior, letting JavaScript handle the form data instead (common in modern single-page interactions).",
      why: "Without preventDefault(), any custom JavaScript form handling gets interrupted by the page reload before it can finish running.",
      example: "form.addEventListener('submit', (event) => { event.preventDefault(); console.log('Form handled by JS instead of reloading'); });",
      practice: "Write a submit event listener on a form that calls preventDefault() and logs 'Form submitted' without reloading the page.",
      success: "Your code correctly listens for 'submit', calls event.preventDefault(), and then runs custom logic.",
      mistake: "Forgetting event.preventDefault(), causing the page to reload and interrupt any custom JavaScript form handling.",
      checks: [{ q: 'event.preventDefault() in a form submit handler is used to:', options: ['Submit the form twice', 'Stop the default page reload so JS can handle the form instead', 'Delete the form', 'Clear all input values automatically'], correct: 1 }],
    }),
    rl('Basic Validation Logic', 'concept', {
      concept: "Basic client-side validation checks form input against simple rules (not empty, matches a pattern, meets a minimum length) before allowing submission — providing immediate feedback rather than waiting for a server round-trip to catch obvious errors.",
      why: "Immediate validation feedback improves user experience significantly compared to only finding out about an error after a full form submission and server response.",
      example: "if (emailInput.value === '') { alert('Email is required'); return; } stops the submission process and informs the user immediately if the field is empty.",
      practice: "Write validation logic checking that a 'password' input has at least 8 characters, showing an alert if it doesn't.",
      success: "Your code correctly checks .value.length against 8 and shows an appropriate message if too short.",
      mistake: "Relying only on server-side validation with no immediate client-side feedback, creating a slower, less pleasant user experience.",
      checks: [{ q: 'Client-side validation is mainly valuable because it:', options: ['Replaces the need for any server-side checks', 'Provides immediate feedback without waiting for a server round-trip', 'Is required for a form to function at all', 'Only matters for password fields'], correct: 1 }],
    }),
    ra([
      { q: 'An input\u2019s typed value is accessed via:', options: ['.textContent', '.value', '.innerHTML', '.class'], correct: 1 },
      { q: 'event.preventDefault() in a submit handler is used to:', options: ['Submit twice', 'Stop the default reload so JS can handle the form', 'Delete the form', 'Clear inputs'], correct: 1 },
      { q: 'Client-side validation is mainly valuable because it:', options: ['Replaces server-side checks entirely', 'Provides immediate feedback without a server round-trip', 'Is required for any form to work', 'Only applies to passwords'], correct: 1 },
      { q: 'Forgetting preventDefault() in a submit handler typically causes:', options: ['Smooth custom JS handling', 'The page to reload, interrupting custom JS logic', 'No real effect', 'Improved form behavior'], correct: 1 },
      { q: 'Relying only on server-side validation with no client-side checks typically:', options: ['Improves user experience', 'Creates a slower, less immediate user experience', 'Has no real tradeoff', 'Is the recommended sole approach'], correct: 1 },
    ]),
  ] },
  { id: 'js-m12', title: 'Local Storage', objective: 'Persist data in the browser so it survives a page refresh.', lessons: [
    rl('What localStorage Is For', 'concept', {
      concept: "localStorage lets a website save small amounts of data directly in the user's browser, persisting even after the page is closed and reopened — useful for things like remembering preferences or saving progress without needing a server/database.",
      why: "Without localStorage (or similar), any data would disappear the moment the page refreshes — localStorage gives simple, no-backend persistence for appropriate use cases.",
      example: "A to-do list app can save its tasks in localStorage so they're still there the next time the user opens the page, with no server required.",
      practice: "Write one sentence describing a realistic use case for localStorage in a simple web app.",
      success: "Your example describes something that reasonably benefits from persisting locally without needing a full backend.",
      mistake: "Assuming data needs a full server/database setup for even simple persistence needs that localStorage could handle.",
      checks: [{ q: 'localStorage is mainly used to:', options: ['Send data to a server', 'Save small amounts of data directly in the browser, persisting across sessions', 'Style a webpage', 'Only work while the page is open, then disappear'], correct: 1 }],
    }),
    rl('Saving and Reading Data', 'how-to', {
      concept: "Data is saved with localStorage.setItem(key, value) and read back with localStorage.getItem(key) — both key and value are stored as strings, which matters when saving non-string data (covered in the next lesson).",
      why: "This simple key-value API is all that's needed for basic persistence — no complex setup or external library required.",
      example: "localStorage.setItem('username', 'Amara'); saves the value; later, localStorage.getItem('username'); retrieves 'Amara' even after the page reloads.",
      practice: "Write code saving a value 'dark' under the key 'theme', then reading it back into a variable.",
      success: "Your code correctly uses setItem to save and getItem to retrieve the same key.",
      mistake: "Forgetting that localStorage keys/values are strings, and being confused when trying to store other data types directly.",
      checks: [{ q: 'localStorage.setItem and localStorage.getItem are used to:', options: ['Send data to a server', 'Save and retrieve data directly in the browser', 'Style elements', 'Delete a webpage'], correct: 1 }],
    }),
    rl('Storing Objects with JSON', 'how-to', {
      concept: "Since localStorage only stores strings, objects/arrays must be converted to a string with JSON.stringify() before saving, and converted back with JSON.parse() after retrieving — this round-trip is necessary for storing any structured data.",
      why: "Trying to save an object directly to localStorage without JSON.stringify results in it being stored as the unhelpful text \"[object Object]\" rather than the actual data.",
      example: "localStorage.setItem('user', JSON.stringify({name: 'Amara'})); saves the object correctly; const user = JSON.parse(localStorage.getItem('user')); correctly restores it as a usable object.",
      practice: "Write code saving an object { theme: 'dark', fontSize: 16 } to localStorage under the key 'settings', using JSON.stringify.",
      success: "Your code correctly wraps the object in JSON.stringify before calling setItem.",
      mistake: "Saving an object directly to localStorage without JSON.stringify, resulting in useless stored data.",
      checks: [{ q: 'To store an object in localStorage, it must first be:', options: ['Left as-is, objects store fine directly', 'Converted to a string using JSON.stringify', 'Converted to a number', 'Deleted first'], correct: 1 }],
    }),
    ra([
      { q: 'localStorage is mainly used to:', options: ['Send data to a server', 'Save small data directly in the browser, persisting across sessions', 'Style a page', 'Store data only while open'], correct: 1 },
      { q: 'setItem and getItem are used to:', options: ['Send data to a server', 'Save and retrieve data in the browser', 'Style elements', 'Delete a page'], correct: 1 },
      { q: 'To store an object in localStorage, it must first be:', options: ['Left as-is', 'Converted to a string with JSON.stringify', 'Converted to a number', 'Deleted'], correct: 1 },
      { q: 'Saving an object directly without JSON.stringify typically results in:', options: ['The object saving correctly', 'Useless stored data like "[object Object]"', 'An error preventing any save', 'Improved storage efficiency'], correct: 1 },
      { q: 'Without localStorage or similar persistence, page data would:', options: ['Persist automatically forever', 'Disappear on refresh unless otherwise saved', 'Save to a server automatically', 'Have no real limitation'], correct: 1 },
    ]),
  ] },
  { id: 'js-m13', title: 'APIs & Async JavaScript Basics', objective: 'Understand what an API is and fetch data from one.', lessons: [
    rl('What an API Actually Is', 'concept', {
      concept: "An API (Application Programming Interface), in this web context, is a way for one program to request data or functionality from another over the internet — a weather API, for example, lets your code request current weather data from a service that maintains it.",
      why: "Understanding APIs conceptually (a request for data/action, sent somewhere, with a response coming back) demystifies how websites pull in dynamic data like weather, maps, or payment processing from external services.",
      example: "A weather app's JavaScript sends a request to a weather API's URL, and receives back current weather data as a response, which it then displays on the page.",
      practice: "Write one sentence describing, in your own words, what an API lets one program do.",
      success: "Your explanation captures the request/response relationship between programs specifically.",
      mistake: "Thinking of an API as a mysterious, unapproachable concept rather than a straightforward request/response relationship between programs.",
      checks: [{ q: 'An API is best understood as:', options: ['A type of CSS framework', 'A way for one program to request data/functionality from another', 'A JavaScript syntax error', 'A database itself'], correct: 1 }],
    }),
    rl('fetch() Basics', 'how-to', {
      concept: "The fetch() function sends a request to a URL and returns a Promise (a placeholder for a future value) that eventually resolves with the response — fetch(url).then(response => ...) is the basic pattern for making a web request in JavaScript.",
      why: "fetch is the standard modern way to request data from an API directly in JavaScript, replacing older, clunkier techniques.",
      example: "fetch('https://api.example.com/data').then(response => response.json()).then(data => console.log(data)); requests data and logs it once received.",
      practice: "Write the basic fetch() call structure (without a real URL) to request data and log the parsed JSON response.",
      success: "Your structure correctly chains .then(response => response.json()) and a second .then to use the data.",
      mistake: "Trying to use the fetched data immediately after calling fetch(), not realizing the response arrives asynchronously via the Promise.",
      checks: [{ q: 'fetch() is used to:', options: ['Style a webpage', 'Send a request to a URL and handle the eventual response', 'Delete DOM elements', 'Only work with local files'], correct: 1 }],
    }),
    rl('Working with the Response', 'concept', {
      concept: "A fetch response typically needs to be converted from raw data into usable JavaScript with .json() (also returning a Promise) — the full pattern is fetch(url).then(res => res.json()).then(data => { /* use data here */ });",
      why: "Skipping the .json() conversion step leaves you with the raw response object rather than the actual usable data you requested.",
      example: "fetch('https://api.example.com/users').then(res => res.json()).then(users => { console.log(users[0].name); }); correctly converts and then uses the data.",
      practice: "Write a fetch chain that requests data from a URL, converts it with .json(), and logs the result.",
      success: "Your chain correctly includes both the .json() conversion step and a final step using the resulting data.",
      mistake: "Trying to directly use the raw fetch response without first calling .json() to parse it into usable data.",
      checks: [{ q: 'The .json() method on a fetch response is used to:', options: ['Delete the response', 'Convert the raw response into usable JavaScript data', 'Send a new request', 'Style the data'], correct: 1 }],
    }),
    ra([
      { q: 'An API is best understood as:', options: ['A CSS framework', 'A way for one program to request data/functionality from another', 'A syntax error', 'A database itself'], correct: 1 },
      { q: 'fetch() is used to:', options: ['Style a page', 'Send a request to a URL and handle the response', 'Delete elements', 'Only work with local files'], correct: 1 },
      { q: 'The .json() method converts:', options: ['Nothing, it deletes data', 'The raw response into usable JavaScript data', 'JS into JSON files', 'CSS into JSON'], correct: 1 },
      { q: 'Trying to use fetched data before it actually arrives typically results from:', options: ['Correctly understanding the Promise/async pattern', 'Not realizing the response arrives asynchronously via a Promise', 'A CSS error', 'No real issue'], correct: 1 },
      { q: 'Skipping .json() on a fetch response typically leaves you with:', options: ['The final usable data directly', 'The raw response object, not yet usable data', 'An error, always', 'Improved performance'], correct: 1 },
    ]),
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
    modules: dmfModules, projects: dmfProjects, capstone: dmfCapstone,
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
    modules: seofModules, projects: seofProjects, capstone: seofCapstone,
  },
  {
    id: 'social-media-management', code: 'SMM', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'Social Media Management',
    description: 'Learn to manage foundational social media work for a small business or client — strategy, content calendars, community management, and reporting.',
    learningOutcomes: ['Understand the social media manager role', 'Build audience and platform strategy', 'Plan content pillars and calendars', 'Write captions and CTAs', 'Manage community engagement', 'Read basic analytics and report results'],
    tools: ['Canva (free)', 'Google Sheets', 'Native platform scheduling tools'],
    certificateSkills: ['Content Strategy', 'Content Planning', 'Community Management', 'Social Media Analytics'],
    prerequisites: 'None',
    modules: smmModules, projects: smmProjects, capstone: smmCapstone,
  },
  {
    id: 'content-creation', code: 'CC', category: 'Creative', difficulty: 'Beginner',
    title: 'Content Creation',
    description: 'Learn to plan, create, and systematize content — hooks, short-form video, storytelling, and repurposing — into a sustainable content system.',
    learningOutcomes: ['Build an audience-first content strategy', 'Write strong hooks', 'Plan and shoot short-form video', 'Tell stories that hold attention', 'Repurpose one piece of content into many', 'Build a repeatable content workflow'],
    tools: ['CapCut (free)', 'Canva (free)', 'A phone camera'],
    certificateSkills: ['Content Strategy', 'Hooks & Storytelling', 'Short-Form Video', 'Content Systems'],
    prerequisites: 'None',
    modules: ccModules, projects: ccProjects, capstone: ccCapstone,
  },
  {
    id: 'copywriting', code: 'COPY', category: 'Creative', difficulty: 'Beginner',
    title: 'Copywriting',
    description: 'Learn persuasive writing — audience research, headlines, hooks, CTAs, and full marketing copy packages for social, landing pages, and email.',
    learningOutcomes: ['Understand what makes copy persuasive', 'Research an audience before writing', 'Translate features into benefits', 'Write hooks, headlines, and CTAs', 'Write copy for social, landing pages, and email'],
    tools: ['Google Docs', 'A swipe file of real examples'],
    certificateSkills: ['Persuasive Writing', 'Headlines', 'Calls to Action', 'Marketing Copy'],
    prerequisites: 'None',
    modules: copyModules, projects: copyProjects, capstone: copyCapstone,
  },
  {
    id: 'video-editing', code: 'VE', category: 'Creative', difficulty: 'Beginner',
    title: 'Video Editing',
    description: 'Learn transferable video editing principles — cuts, pacing, audio, text, and color — applicable in beginner-friendly tools like CapCut.',
    learningOutcomes: ['Understand a real editing workflow', 'Cut and pace footage for attention', 'Balance and clean up audio', 'Add text and captions effectively', 'Use B-roll purposefully', 'Edit a complete short-form social video'],
    tools: ['CapCut (free)'],
    certificateSkills: ['Editing Workflow', 'Pacing', 'Captions', 'Short-Form Editing'],
    prerequisites: 'None',
    modules: veModules, projects: veProjects, capstone: veCapstone,
  },
  {
    id: 'graphic-design-foundations', code: 'GDF', category: 'Creative', difficulty: 'Beginner',
    title: 'Graphic Design Foundations',
    description: 'Learn core design principles — typography, color, composition, and hierarchy — and build a mini brand kit.',
    learningOutcomes: ['Apply core design principles', 'Choose and pair typography', 'Use color theory intentionally', 'Build visual hierarchy', 'Understand branding basics', 'Design for social media formats'],
    tools: ['Canva (free)'],
    certificateSkills: ['Design Principles', 'Typography', 'Color Theory', 'Branding Basics'],
    prerequisites: 'None',
    modules: gdfModules, projects: gdfProjects, capstone: gdfCapstone,
  },
  {
    id: 'personal-branding-academy', code: 'PB', category: 'Professional', difficulty: 'Beginner',
    title: 'Personal Branding',
    description: 'Build a specific, consistent personal brand system — positioning, story, voice, and visual identity.',
    learningOutcomes: ['Define a specific positioning statement', 'Identify your audience', 'Develop a brand story and voice', 'Build a consistent visual identity', 'Plan authority-building content'],
    tools: ['Canva (free)', 'LinkedIn or Instagram'],
    certificateSkills: ['Positioning', 'Brand Voice', 'Visual Identity', 'Authority Building'],
    prerequisites: 'None',
    modules: pbModules, projects: pbProjects, capstone: pbCapstone,
  },
  {
    id: 'ugc-content-creation', code: 'UGC', category: 'Creative', difficulty: 'Beginner',
    title: 'UGC Content Creation',
    description: 'Learn to create User-Generated Content for brands — briefs, hooks, filming, editing, and pitching a UGC portfolio.',
    learningOutcomes: ['Understand UGC vs influencer marketing', 'Choose a UGC niche', 'Interpret a brand brief', 'Write UGC hooks and scripts', 'Film and edit UGC-style content', 'Pitch a UGC portfolio to brands'],
    tools: ['CapCut (free)', 'A phone camera'],
    certificateSkills: ['UGC Scripting', 'Filming Basics', 'Brand Briefs', 'UGC Portfolio Building'],
    prerequisites: 'None',
    modules: ugcModules, projects: ugcProjects, capstone: ugcCapstone,
  },
  {
    id: 'email-marketing', code: 'EM', category: 'Marketing & Media', difficulty: 'Beginner',
    title: 'Email Marketing',
    description: 'Build lead magnets, welcome sequences, promotional emails, and a full email funnel.',
    learningOutcomes: ['Understand email marketing fundamentals', 'Build and grow a list', 'Create effective lead magnets', 'Write welcome sequences and promotional emails', 'Segment and automate', 'Read basic email metrics'],
    tools: ['Mailchimp free tier or similar', 'Google Docs'],
    certificateSkills: ['Email Copywriting', 'Automation Basics', 'List Building', 'Email Metrics'],
    prerequisites: 'None',
    modules: emModules, projects: emProjects, capstone: emCapstone,
  },
  {
    id: 'virtual-assistance-academy', code: 'VA', category: 'Freelance & Remote', difficulty: 'Beginner',
    title: 'Virtual Assistance',
    description: 'Learn the practical skills of remote virtual assistance — communication, calendar/email management, organization, and professionalism.',
    learningOutcomes: ['Understand the VA role', 'Communicate professionally in remote settings', 'Manage calendars and inboxes', 'Organize files and documents', 'Handle research and task management', 'Maintain confidentiality and professionalism'],
    tools: ['Google Workspace (free)', 'Notion or Trello (free tier)'],
    certificateSkills: ['Calendar Management', 'Inbox Management', 'Remote Communication', 'Task Organization'],
    prerequisites: 'None',
    modules: vaModules, projects: vaProjects, capstone: vaCapstone,
  },
  {
    id: 'freelancing-foundations-academy', code: 'FF', category: 'Freelance & Remote', difficulty: 'Beginner',
    title: 'Freelancing Foundations',
    description: 'Build the complete starter system for a freelance business — niche, offers, portfolio, outreach, pricing, and contracts.',
    learningOutcomes: ['Choose a skill and niche', 'Create a clear offer', 'Build a beginner portfolio', 'Find and pitch clients', 'Price your work confidently', 'Use contracts, deposits, and invoices'],
    tools: ['Google Docs', 'A payment platform like PayPal or Wise'],
    certificateSkills: ['Offer Building', 'Client Outreach', 'Pricing', 'Contracts & Invoicing'],
    prerequisites: 'None',
    modules: ffModules, projects: ffProjects, capstone: ffCapstone,
  },
  {
    id: 'customer-support', code: 'CS', category: 'Professional', difficulty: 'Beginner',
    title: 'Customer Support',
    description: 'Learn foundational customer support skills — communication, de-escalation, ticketing, documentation, and support metrics.',
    learningOutcomes: ['Understand great customer experience', 'Communicate clearly and empathetically', 'Handle complaints professionally', 'De-escalate difficult situations', 'Use support tickets and documentation', 'Read basic support metrics'],
    tools: ['A free helpdesk tool (e.g. free-tier options)', 'Google Docs'],
    certificateSkills: ['Communication', 'De-escalation', 'Documentation', 'Support Metrics'],
    prerequisites: 'None',
    modules: csModules, projects: csProjects, capstone: csCapstone,
  },
  {
    id: 'project-management-foundations', code: 'PMF', category: 'Professional', difficulty: 'Beginner',
    title: 'Project Management Foundations',
    description: 'Learn to scope, plan, and manage a simple real-world project from start to finish.',
    learningOutcomes: ['Define project scope', 'Gather requirements', 'Break down tasks and build timelines', 'Communicate with a team', 'Manage basic risk', 'Track and report progress'],
    tools: ['Trello or Notion (free tier)', 'Google Sheets'],
    certificateSkills: ['Scoping', 'Task Breakdown', 'Timelines', 'Risk & Reporting'],
    prerequisites: 'None',
    modules: pmfModules, projects: pmfProjects, capstone: pmfCapstone,
  },
  {
    id: 'digital-product-business-academy', code: 'DPB', category: 'Business', difficulty: 'Beginner',
    title: 'Digital Product Business',
    description: 'Learn to plan, price, and market a digital product business, from idea validation to launch.',
    learningOutcomes: ['Find and validate a digital product idea', 'Research your audience', 'Plan and create a product', 'Price it fairly', 'Build a sales page and offer', 'Plan a launch'],
    tools: ['Canva (free)', 'Gumroad or similar'],
    certificateSkills: ['Idea Validation', 'Product Planning', 'Pricing', 'Launch Planning'],
    prerequisites: 'None',
    modules: dpbModules, projects: dpbProjects, capstone: dpbCapstone,
  },
  {
    id: 'ecommerce-foundations', code: 'ECF', category: 'Business', difficulty: 'Beginner',
    title: 'E-Commerce Foundations',
    description: 'Learn the fundamentals of running an online store — product selection, store structure, pricing, fulfillment, and customer experience.',
    learningOutcomes: ['Choose and validate a product', 'Research market and competitors', 'Structure a store and product pages', 'Understand pricing and margins', 'Understand payments and fulfillment basics', 'Plan a launch marketing approach'],
    tools: ['A free-tier e-commerce platform', 'Google Sheets'],
    certificateSkills: ['Product Research', 'Store Structure', 'Pricing & Margins', 'Launch Planning'],
    prerequisites: 'None',
    modules: ecfModules, projects: ecfProjects, capstone: ecfCapstone,
  },
  {
    id: 'business-analytics-foundations', code: 'BAF', category: 'Business', difficulty: 'Beginner',
    title: 'Business Analytics Foundations',
    description: 'Learn to work with spreadsheets and data to find trends and build a business performance dashboard.',
    learningOutcomes: ['Understand core data and metrics concepts', 'Clean and organize data in spreadsheets', 'Use basic formulas confidently', 'Visualize data clearly', 'Build a simple dashboard', 'Turn data into a business insight'],
    tools: ['Google Sheets (free)'],
    certificateSkills: ['Spreadsheets', 'Data Cleaning', 'Data Visualization', 'Dashboards'],
    prerequisites: 'None',
    modules: bafModules, projects: bafProjects, capstone: bafCapstone,
  },
  {
    id: 'entrepreneurship-foundations', code: 'EF', category: 'Business', difficulty: 'Beginner',
    title: 'Entrepreneurship Foundations',
    description: 'Learn to find real problems worth solving and build a complete basic business model around one.',
    learningOutcomes: ['Identify problems worth solving', 'Generate and evaluate business ideas', 'Understand customers and business models', 'Craft a value proposition', 'Plan offers, pricing, and basic operations', 'Understand basic business finance'],
    tools: ['Google Sheets', 'Google Docs'],
    certificateSkills: ['Idea Validation', 'Business Models', 'Value Propositions', 'Basic Finance'],
    prerequisites: 'None',
    modules: efModules, projects: efProjects, capstone: efCapstone,
  },
];

// Fill in duration/counts computed from actual module/lesson data so
// every course card shows real, accurate numbers instead of guesses.
//
// Every course now ships with real `modules` (no course relies on the
// old `moduleTitles`-only stub-generation path anymore), so this just
// computes stats directly from the real data.
ACADEMY_COURSES.forEach((course) => {
  course.moduleCount = course.modules.length;
  course.hasFullContent = true;
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
