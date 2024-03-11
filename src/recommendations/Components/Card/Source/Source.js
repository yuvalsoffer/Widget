import "./Source.css";

const sourceClassDict = {
  sponsored: "sponsored-source-name",
};
function Source(type, text) {
  if (sourceClassDict[type]) {
    const source = document.createElement("span");
    source.textContent = text;
    source.classList.add(sourceClassDict[type]);

    return source;
  }
}

export default Source;
