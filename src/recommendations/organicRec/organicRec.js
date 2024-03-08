import './organicRec.css'

function createOrganicRec(data) {
    //init origin wrapper
    const organicWrapper = document.createElement('div');
    organicWrapper.classList.add('organic-wrapper');

    //init main heading
    const organicdHeading = document.createElement('h1');
    organicdHeading.textContent = 'MORE FOR YOU';
    organicdHeading.classList.add('heading');
    organicWrapper.appendChild(organicdHeading);

    //init cards
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    data.forEach(card => cardsWrapper.appendChild(createOrganicCard(card)));
    organicWrapper.appendChild(cardsWrapper);
    
    return organicWrapper;
}

function createOrganicCard(data) {
    //init container
    const cardContainer = document.createElement('a');
    cardContainer.href = data.url;
    cardContainer.rel = 'noopener noreferrer';
    cardContainer.classList.add('card-container', 'organic-card-container');

    //init image
    const thumbnail = document.createElement('img');
    thumbnail.src = data.thumbnail[0].url;
    thumbnail.alt = data.name;
    thumbnail.classList.add('organic-img');
    thumbnail.onload = (e) => cardContainer.insertBefore(thumbnail, cardContainer.firstChild);
    thumbnail.onerror = (e) => cardContainer.classList.add('organic-no-image-layout');
    // cardContainer.appendChild(thumbnail);

    //init caption
    const caption = document.createElement('span');
    caption.textContent = data.name;
    caption.classList.add('caption', 'organic-caption');
    cardContainer.appendChild(caption);

    return cardContainer;
}

export default createOrganicRec;
