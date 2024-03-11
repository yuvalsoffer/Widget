import "./Thumbnail.css";

const thumbnailClassDict = {
  sponsored: "sponsored-thumbnail",
  organic: "organic-thumbnail",
};

const noThumbnailParentClassDict = {
  sponsored: "sponsored-no-image-layout",
  organic: "organic-no-image-layout",
};

function Thumbnail(type, url, alt = "") {
  const thumbnail = document.createElement("img");
  thumbnail.src = url;
  thumbnail.alt = alt;
  thumbnail.classList.add(thumbnailClassDict[type], "skeleton-img");
  thumbnail.addEventListener("error", () => {
    thumbnail.parentNode.classList.add(noThumbnailParentClassDict[type]);
    thumbnail.parentNode.removeChild(thumbnail);
  });

  return thumbnail;
}

export default Thumbnail;
