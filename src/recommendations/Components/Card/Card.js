import "./Card.css";
import Thumbnail from "./Thumbnail/Thumbnail";
import Caption from "./Caption/Caption";
import Source from "./Source/Source";

const cardClassDict = {
  sponsored: "sponsored-card-container",
  organic: "organic-card-container",
};

const cardTargetDict = {
  sponsored: "_blank",
};

function Card(data, type = "sponsored") {
  const card = document.createElement("a");
  card.href = data.url;
  card.rel = "noopener noreferrer";
  card.target = cardTargetDict[type] || "";
  card.classList.add("card-container", cardClassDict[type]);

  const thumbnail = Thumbnail(type, data.thumbnail[0].url, data.name);
  card.appendChild(thumbnail);

  const source = Source(type, data.branding);
  card.append(source || "");

  const caption = Caption(data.name, type);
  card.appendChild(caption);

  return card;
}

export default Card;
