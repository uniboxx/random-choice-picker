const tagsEl = document.querySelector(`#tags`);
const textarea = document.querySelector(`#textarea`);

function createTags(input) {
  const tags = input
    .split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => tag.trim());
  tagsEl.innerHTML = '';

  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.textContent = tag;
    tagsEl?.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(`.tag`);
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag?.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag?.classList.remove('highlight');
}

textarea.focus();

textarea.addEventListener('keyup', e => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    e.target.value = '';
    setTimeout(() => {}, 10);

    randomSelect();
  }
});
