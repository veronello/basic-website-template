/* Reuse this shell by changing SITE_NAME, sections, and the CSS color tokens.
   Add a children array to any section to give it a secondary menu. */
const SITE_NAME = 'My Site';
const sections = {
  home: {
    title: 'Section Home',
    description: 'Welcome to your site. Your introduction can be here: give visitors a short overview of what they can find and where they might like to begin.',
    heading: 'About this site',
    paragraphs: [
      'Tell visitors what your site is about, who it is for, and why you created it. You can introduce yourself, describe your project, or share any background you would like people to know.',
      'Add your own description here. You might explain what each section contains, how the information is organised, or anything else that helps visitors find their way.'
    ]
  },
  a: { title: 'Section A', children: [
    { id: 'a1', title: 'Subsection A 1', description: 'Your text for subsection A 1 can be here. Introduce the first topic within section A and explain what visitors can expect to find on this page.' },
    { id: 'a2', title: 'Subsection A 2', description: 'Your text for subsection A 2 can be here. Introduce another topic within section A and provide a short description of the information on this page.' },
    { id: 'a3', title: 'Subsection A 3', description: 'Your text for subsection A 3 can be here. Give visitors an overview of this topic and explain how it connects to the other information in section A.' },
    { id: 'a4', title: 'Subsection A 4', description: 'Your text for subsection A 4 can be here. Use this space to introduce a further topic or bring together related information within section A.' }
  ] },
  b: { title: 'Section B', description: 'Your text for section B can be here. Describe what this section covers and introduce the information you would like to share with your visitors.' },
  c: { title: 'Section C', description: 'Your text for section C can be here. Use this introduction to explain the purpose of the page and give readers some context for the details below.' },
  d: { title: 'Section D', description: 'Your text for section D can be here. Introduce the subject of this section and give visitors a short overview of what they will find on this page.' }
};

const footerPages = {
  privacy: { title: 'Privacy Policy', description: 'Add your Privacy Policy here.' },
  terms: { title: 'Terms of Use', description: 'Add your Terms of Use here.' },
  cookies: { title: 'Cookie Policy', description: 'Add your Cookie Policy here.' },
  contact: { title: 'Contact', description: 'Add your contact details here.' }
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function render({ focus = false } = {}) {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const sectionId = parts[0] || 'home';
  const section = sections[sectionId] || footerPages[sectionId];
  if (!section || parts.length > 2 || (parts[1] && !section.children)) {
    location.replace('#/');
    return;
  }
  let page = section;
  if (section.children) {
    page = section.children.find(child => child.id === parts[1]);
    if (!page) {
      location.replace(`#/${sectionId}/${section.children[0].id}`);
      return;
    }
  }
  document.title = `${page.title} | ${SITE_NAME}`;
  document.getElementById('page-title').textContent = page.title;
  document.getElementById('page-description').textContent = page.description;

  document.querySelectorAll('[data-section]').forEach(link => {
    if (link.dataset.section === sectionId) link.setAttribute('aria-current', section.children ? 'location' : 'page');
    else link.removeAttribute('aria-current');
  });
  const secondary = document.getElementById('secondary');
  secondary.replaceChildren();
  document.getElementById('secondary-region').hidden = !section.children;
  if (section.children) {
    secondary.setAttribute('aria-label', `${section.title} navigation`);
    section.children.forEach(child => {
      const link = element('a', '', child.title);
      link.href = `#/${sectionId}/${child.id}`;
      if (child.id === page.id) link.setAttribute('aria-current', 'page');
      secondary.append(link);
    });
  }

  const content = document.getElementById('page-content');
  content.replaceChildren();
  if (!footerPages[sectionId]) {
    const copy = element('section', 'page-copy');
    copy.append(element('h2', '', page.heading || 'Your heading can be here'));
    const paragraphs = page.paragraphs || [
      `Add the main content for ${page.title} here. You can expand on the introduction, explain an idea, or include any details that belong in this part of your site.`,
      'Use another paragraph for supporting information, examples, or useful links. Replace these suggestions with your own text, and add or remove paragraphs to suit what you want to share.'
    ];
    paragraphs.forEach(text => copy.append(element('p', '', text)));
    content.append(copy);
  }
  if (page.cards) {
    const cards = element('div', 'cards');
    page.cards.forEach(item => {
      const card = element('article', 'card');
      card.append(element('h2', '', item.title), element('p', '', item.text));
      cards.append(card);
    });
    content.append(cards);
  }
  if (focus) {
    document.getElementById('content').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', () => render({ focus: true }));
render();
