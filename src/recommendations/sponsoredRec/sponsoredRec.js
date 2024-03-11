import "./SponsoredRec.css";
import Heading from "../Components/Heading/Heading";
import Grid from "../Components/Grid/grid";
import Card from "../Components/Card/Card";

function SponsoredRec(data) {
  const sponsoredWrapper = document.createElement("div");
  sponsoredWrapper.classList.add("sponsored-wrapper");

  const sponsoredHeading = Heading("AD CONTENT", "sponsored");
  sponsoredWrapper.appendChild(sponsoredHeading);

  const grid = Grid();
  data.forEach((card) => grid.appendChild(Card(card), "sponsored"));
  sponsoredWrapper.appendChild(grid);

  return sponsoredWrapper;
}

export default SponsoredRec;
