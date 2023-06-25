'use strict';

const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const response = document.querySelector('#response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (titleInput.value === '') {
        response.textContent = 'You need to input the bookmark title/name.';
        return;
    }
    const results = await browser.bookmarks.search({ title: titleInput.value });
    if (results.length === 0) {
        response.textContent = 'No bookmark with this title found.';
        return;
    }
    response.textContent = results[0].id;
});
