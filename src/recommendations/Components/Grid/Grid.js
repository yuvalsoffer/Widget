import "./Grid.css";

function Grid(classes = []) {
  const grid = document.createElement("div");
  grid.classList.add("grid-wrapper", ...classes);

  return grid;
}

export default Grid;
