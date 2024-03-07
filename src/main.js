import './widget.css';

const cardDict = {
    'sponsored' : createSponsoredCard,
    'organic': createOrganicCard
};

async function app() {
    const data = await fetchData() || [];
    const parent = document.getElementById("my-widget-container");
    const wrapper = document.createElement('div');
    wrapper.classList.add('cards-wrapper');
    data.forEach(el => wrapper.appendChild(cardDict[el.origin] && cardDict[el.origin](el)));
    parent.appendChild(wrapper);
}

async function fetchData() {
    try {
        let url = new URL('http://api.taboola.com/1.0/json/taboola-templates/recommendations.get');
        const params = {
            'publisher id': 'taboola-templates',
            'app.type': 'desktop',
            'app.apikey': 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
            'source.id': '214321562187',
            'source.type': 'video',
            'count': '20'
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`response was not ok, res code: ${res.status}, ${res.statusText}`);
        }
        const resJson = await res.json();
        if(!resJson || !resJson.list) {
            throw new Error('wrong data recieved');
        }
        return resJson.list;
    } catch (err) {
        console.log(err);
    }
}

function createSponsoredCard(data) {
    //init container
    const cardContainer = document.createElement("a");
    cardContainer.href = data.url;
    cardContainer.target= "_blank";
    cardContainer.rel = "noopener noreferrer"
    cardContainer.classList.add('card-container');

    //init image
    const thumbnail = document.createElement('img');
    thumbnail.src = data.thumbnail[0].url;
    thumbnail.alt = data.name;
    thumbnail.classList.add('sponsored-img');
    cardContainer.appendChild(thumbnail);

    //init source
    const sourceName = document.createElement('span');
    sourceName.textContent = data.branding;
    sourceName.classList.add('source-name');
    cardContainer.appendChild(sourceName);

    //init caption
    const caption = document.createElement('span');
    caption.textContent = data.name;
    caption.classList.add('caption');
    cardContainer.appendChild(caption);

    return cardContainer;
}

function createOrganicCard(data) {
    //init container
    const cardContainer = document.createElement("a");
    cardContainer.href = data.url;
    cardContainer.rel = "noopener noreferrer"
    cardContainer.classList.add('card-container', 'organic-card-container');

    //init image
    const thumbnail = document.createElement('img');
    thumbnail.src = data.thumbnail[0].url;
    thumbnail.alt = data.name;
    thumbnail.classList.add('organic-img');
    cardContainer.appendChild(thumbnail);

    //init caption
    const caption = document.createElement('span');
    caption.textContent = data.name;
    caption.classList.add('caption', 'organic-caption');
    cardContainer.appendChild(caption);

    return cardContainer;
}

app();