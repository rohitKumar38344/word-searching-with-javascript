const paragraphEl = document.querySelector(".para");
const divEl = document.querySelector("div");
const buttonEl = document.querySelector("button");
const userInputEl = document.getElementById("wordSize");

let wordsPosition = [];
let wordsToHighlight = [];
// constructing words array from paragraph text
const paraText = paragraphEl.innerText.split(" ");

// finding the position and the words to extract from paragraph text
const extractWords = function (wordSize) {
  wordsPosition.length = 0;
  wordsToHighlight.length = 0;
  paraText.forEach((el, index) => {
    if (el.length === wordSize) {
      wordsPosition.push(index);
      wordsToHighlight.push(el);
    }
  });
};

const display = function (content, wordSize) {
  const headingEl = document.createElement("h2");
  headingEl.innerText = `Highlight's ${wordsToHighlight.length} words of length: ${wordSize}`;
  let p = document.createElement("p");
  // content array containing words converted to string sepearting
  // each word with space to render it as html content
  p.innerHTML = content.join(" ");
  divEl.innerHTML = "";
  divEl.appendChild(headingEl);
  divEl.appendChild(p);
};

const highlightText = function () {
  // accessing user input value
  const wordSize = Number(userInputEl.value);
  extractWords(wordSize);
  // copying the content from paraText array to new array
  // such that previous result doesn't affect the current operation
  // for eg if we constructed the final output to have words highlighted
  // with length 2, now if we want to construct the final output to have words of len 3
  // to be highlighted the words with length 2 should not be included in this
  // array if we do so the words with len 2(previous result) and len 3 also
  // gets highlighted because now both contains the text with class (highlight)
  const contentCopy = paraText.slice(0, paraText.length);
  for (let i = 0; i < wordsPosition.length; i++) {
    contentCopy[
      wordsPosition[i]
    ] = `<span class="highlight">${wordsToHighlight[i]}</span>`;
  }
  display(contentCopy, wordSize);
};

buttonEl.addEventListener("click", highlightText);
