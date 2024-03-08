import './sponsoredRec.css'

function createSponsoredRec(data) {

    //init origin wrapper
    const sponsoredWrapper = document.createElement('div');
    sponsoredWrapper.classList.add('sponsored-wrapper');

    //init main heading
    const sponsoredHeading = document.createElement('h1');
    sponsoredHeading.textContent = 'AD CONTENT';
    sponsoredHeading.classList.add('heading');
    sponsoredWrapper.appendChild(sponsoredHeading);

    //init cards
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    data.forEach(card => cardsWrapper.appendChild(createSponsoredCard(card)));
    sponsoredWrapper.appendChild(cardsWrapper);

    return sponsoredWrapper;
}

function createSponsoredCard(data) {
    //init container
    const cardContainer = document.createElement('a');
    cardContainer.href = data.url;
    cardContainer.target= '_blank';
    cardContainer.rel = 'noopener noreferrer';
    cardContainer.classList.add('card-container');

    //init image
    const thumbnail = document.createElement('img');
    thumbnail.src = data.thumbnail[0].url;
    thumbnail.alt = data.name;
    thumbnail.classList.add('sponsored-img');
    thumbnail.onload = (e) => cardContainer.insertBefore(thumbnail, cardContainer.firstChild);
    thumbnail.onerror = (e) => cardContainer.classList.add('sponsored-no-image-layout');

    //init source
    const sourceName = document.createElement('span');
    sourceName.textContent = data.branding;
    sourceName.classList.add('sponsored-source-name');
    cardContainer.appendChild(sourceName);

    //init caption
    const caption = document.createElement('span');
    caption.textContent = data.name;
    caption.classList.add('caption');
    cardContainer.appendChild(caption);

    return cardContainer;
}

export default createSponsoredRec;