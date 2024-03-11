import "./Caption.css";

const captionClassDict = {
  sponsored: "sponsored-caption",
  organic: "organic-caption",
};

function Caption(text, type) {
  const caption = document.createElement("span");
  caption.textContent = text;
  caption.classList.add("caption", captionClassDict[type]);

  return caption;
}

export default Caption;
