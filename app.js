const apiKey = "090eba518e7f4092afcba3bcf9877632";
const newsList = document.querySelector('.news-list');
const selectSources = document.querySelector('#sources');
const defaultSource = 'hacker-news';

window.addEventListener('load', async e => {
     updateNews();
     await updateSources();
     selectSources.value = defaultSource;

     selectSources.addEventListener('change', e => {
         updateNews(e.target.value);
     });

     if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => {console.log(`ServiceWroker registered!`);})
            .catch((error) => {console.log(`ServiceWroker reg failed! Error: ${error}`);});
     } else {
        console.log(`ServiceWroker is not supported!`);
     }
});

async function updateNews(source = defaultSource) {
    const result = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&category=technology&apiKey=${apiKey}`);
    const json = await result.json();

    newsList.innerHTML = json.articles.map(buildArticlesList).join('\n');
}

async function updateSources() {
    const result = await fetch(`https://newsapi.org/v2/sources?category=technology&apiKey=${apiKey}`);
    const json = await result.json();

    selectSources.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

function buildArticlesList(article) {
    return `
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
        </div>
        ${(article.urlToImage != null)? '<img style="width: 100%; display: block;" src="'+ article.urlToImage +'" alt="'+ article.title +'">' : '<img style="width: 100%; display: block;" src="./assets/images/noimage.jpg" alt="No image - '+ article.title +'">'}
        <div class="card-body">
            ${(article.description != null)? '<p class="card-text">' + article.description + '</p>' : ''}
            <a target="_blank" href="${article.url}" class="btn btn-info">Read More</a>
        </div>
    </div>
    `;
}