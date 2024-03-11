import "./Heading.css";

const headingClassDict = {
  sponsored: "sponsored-heading",
  organic: "organic-header",
};

function Heading(text, type) {
  const heading = document.createElement("h1");
  heading.textContent = text;
  heading.classList.add("heading", headingClassDict[type]);

  return heading;
}

export default Heading;
