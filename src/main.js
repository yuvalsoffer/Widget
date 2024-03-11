import "./main.css";
import SponsoredRec from "./Recommendations/SponsoredRec/SponsoredRec.js";
import OrganicRec from "./Recommendations/OrganicRec/OrganicRec.js";
import { groupBy } from "./utils";
import Grid from "./Recommendations/Components/Grid/grid";
import Skeleton from "./Recommendations/Components/Skeleton/Skeleton";
import { fetchData } from "./apiService.js";

let parent;

function startUp() {
  //init our widget as a global variable
  window["myWidget"] = widget;

  parent = document.getElementById("my-widget-container");
}

async function widget(params) {
  try {
    renderSkeletons(); // add loading ui
    const data = await fetchData(params) || [];
    parent.innerHTML = ""; // remove loading ui
    renderRecommendations(data);
  } catch (err) {
    parent.innerHTML = "";
    console.log(err);
  }
}

function renderRecommendations(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("widget-wrapper");
  const recDict = {
    sponsored: SponsoredRec,
    organic: OrganicRec,
  };
  const groupedData = groupBy(data, "origin");
  // add all recommendations according to the types
  for (const key in groupedData) {
    wrapper.appendChild(recDict[key] && recDict[key](groupedData[key]));
  }
  parent.appendChild(wrapper);
}

function renderSkeletons() {
  const grid = Grid(["skeleton-wrapper"]);
  for (let i = 0; i < 10; i++) {
    const skeleton = Skeleton();
    grid.appendChild(skeleton);
  }
  parent ? parent.appendChild(grid) : null;
}

startUp();
