import './widget.css';
import createSponsoredRec from './recommendations/sponsoredRec/sponsoredRec.js';
import createOrganicRec from './recommendations/organicRec/organicRec.js';
import { groupBy } from './utils';

//init our widget as a global variable
window['myWidget'] = widget;

const parent = document.getElementById('my-widget-container');

const cardDict = {
    'sponsored' : createSponsoredRec,
    'organic': createOrganicRec
};

async function widget(params) {
    const data = await fetchData(params) || [];
    const wrapper = document.createElement('div');
    wrapper.classList.add('widget-wrapper');
    const groupedData = groupBy(data, 'origin');
    for (const key in groupedData){
        wrapper.appendChild(cardDict[key] && cardDict[key](groupedData[key]));
    }
    parent.appendChild(wrapper);
}

async function fetchData(params) {
    try {
        let url = new URL('http://api.taboola.com/1.0/json/taboola-templates/recommendations.get');
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`response was not ok, res: ${res.status}, ${res.statusText}`);
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