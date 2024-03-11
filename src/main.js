import "./widget.css";
import SponsoredRec from "./Recommendations/SponsoredRec/SponsoredRec.js";
import OrganicRec from "./Recommendations/OrganicRec/OrganicRec.js";
import { groupBy } from "./utils";
import Grid from "./Recommendations/Components/Grid/grid";

let parent;

function startUp() {
  //init our widget as a global variable
  window["myWidget"] = widget;

  parent = document.getElementById("my-widget-container");
}

async function widget(params) {
  try {
    const recDict = {
      sponsored: SponsoredRec,
      organic: OrganicRec,
    };
    const data = (await fetchData(params)) || [];
    const wrapper = document.createElement("div");
    wrapper.classList.add("widget-wrapper");
    const groupedData = groupBy(data, "origin");

    // add all recommendations according to the types
    for (const key in groupedData) {
      wrapper.appendChild(recDict[key] && recDict[key](groupedData[key]));
    }
    parent.appendChild(wrapper);
  } catch (err) {
    parent.innerHTML = "";
    console.log(err);
  }
}

async function fetchData(params) {
  loadSkeletons();
  let url = new URL(
    "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get"
  );
  let neededParams = new Set([
    "publisher id",
    "app.type",
    "app.apikey",
    "source.id",
    "source.type",
    "count",
  ]);

  // make sure all required params are provided
  for (const key of neededParams) {
    if (neededParams.has(key)) {
      neededParams.delete(key);
    }
    url.searchParams.append(key, params[key]);
  }
  if (neededParams.size) {
    throw new Error(
      `widget did not recieve all needed params, missing: ${[
        ...neededParams,
      ].join(", ")}`
    );
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `response was not ok, res: ${res.status}, ${res.statusText}`
    );
  }
  const resJson = await res.json();
  if (!resJson || !resJson.list) {
    throw new Error("wrong data recieved");
  }
  parent.innerHTML = "";
  return resJson.list;
}

function loadSkeletons() {
  const grid = Grid(["skeleton-wrapper"]);
  for (let i = 0; i < 10; i++) {
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton");
    grid.appendChild(skeleton);
  }
  parent.appendChild(grid);
}

startUp();

export { fetchData };
