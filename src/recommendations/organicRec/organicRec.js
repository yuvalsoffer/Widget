import "./OrganicRec.css";
import Heading from "../Components/Heading/Heading";
import Grid from "../Components/Grid/grid";
import Card from "../Components/Card/Card";

function OrganicRec(data) {
  const organicWrapper = document.createElement("div");
  organicWrapper.classList.add("organic-wrapper");

  const organicdHeading = Heading("MORE FOR YOU", "organic");
  organicWrapper.appendChild(organicdHeading);

  const grid = Grid();
  data.forEach((card) => grid.appendChild(Card(card, "organic")));
  organicWrapper.appendChild(grid);

  return organicWrapper;
}

export default OrganicRec;
