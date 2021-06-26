
// https://imgur.com/a/7QiQOed

const fs = require("fs");
const prismjs = require("prismjs");

const badges = {
  "Masked Avenger": {
    name: "Masked Avenger",
    verified: false,
    status: "not sure",
    description: "Choose: 12-14 Options 1",
    progress: [
      { genre: 1, choice: 1 },{ genre: 2, choice: 1 },{ genre: 3, choice: 1 },
      { genre: 4, choice: 1 },{ genre: 5, choice: 1 },{ genre: 6, choice: 1 },
      { genre: 7, choice: 1 },{ genre: 8, choice: 1 },{ genre: 9, choice: 1 },
      { genre: 10, choice: 1 },{ genre: 11, choice: 1 },{ genre: 12, choice: 1 },
      { genre: 13, choice: 2 },{ genre: 14, choice: 2 },
    ]
  },
  "Trailblazing Explorer": {
    name: "Trailblazing Explorer",
    verified: true,
    status: "verified",
    description: "Choose: 9-11 Options 1",
    progress: [
      { genre: 1, choice: 1 },{ genre: 2, choice: 1 },{ genre: 3, choice: 1 },
      { genre: 4, choice: 1 },{ genre: 5, choice: 1 },{ genre: 6, choice: 1 },
      { genre: 7, choice: 1 },{ genre: 8, choice: 1 },{ genre: 9, choice: 1 },
      { genre: 10, choice: 2 },{ genre: 11, choice: 2 },{ genre: 12, choice: 2 },
      { genre: 13, choice: 2 },{ genre: 14, choice: 2 },
    ]
  },
  "Gorilla Scientist": {
    name: "Gorilla Scientist",
    verified: false,
    status: "unknown",
    description: "Choose: 7-8 of any option"
  },
  "The Paranormal Professor": {
    name: "The Paranormal Professor",
    verified: true,
    status: "verified",
    description: "Choose: 9-11 Options 2",
    progress: [
      { genre: 1, choice: 1 },{ genre: 2, choice: 1 },{ genre: 3, choice: 1 },
      { genre: 4, choice: 2 },{ genre: 5, choice: 2 },{ genre: 6, choice: 1 },
      { genre: 7, choice: 2 },{ genre: 8, choice: 2 },{ genre: 9, choice: 2 },
      { genre: 10, choice: 2 },{ genre: 11, choice: 1 },{ genre: 12, choice: 2 },
      { genre: 13, choice: 2 },{ genre: 14, choice: 2 },
    ]
  },
  "Ghost Detective": {
    name: "Ghost Detective",
    status: "not sure",
    verified: false,
    description: "Choose: 12-14 Options 2",
    progress: [
      { genre: 1, choice: 2 },{ genre: 2, choice: 2 },{ genre: 3, choice: 2 },
      { genre: 4, choice: 2 },{ genre: 5, choice: 2 },{ genre: 6, choice: 2 },
      { genre: 7, choice: 2 },{ genre: 8, choice: 2 },{ genre: 9, choice: 2 },
      { genre: 10, choice: 2 },{ genre: 11, choice: 2 },{ genre: 12, choice: 2 },
      { genre: 13, choice: 1 },{ genre: 14, choice: 1 },
    ]
  }
}

function getBadge(name) {
  return Object.values(badges)
    .reduce((acc, item) => ({...acc, [item.name]: item }), {})[name];
}

function badgeAction(name) {
  try {
    const badge = getBadge(name);

    if (!badge) {
      return {
        status: 400,
        data: {
          success: false,
          message: "No badge found"
        }  
      }
    }

    const script = fs.readFileSync("static/public/js/script.js", "utf-8");
    const badgeString = JSON.stringify(badge).replace(/"/g, "'");
    const code = script.replace("{{ json }}", badgeString);
    const html = prismjs.highlight(code, prismjs.languages.javascript, "javascript");

    return {
      status: 200,
      data: { 
        success: true, 
        badge, 
        code, 
        html 
      }
    }
  }
  catch(error) {
    return {
      status: 500,
      data: {
        success: false,
        message: error.message,
      }
    }
  }
}

module.exports = { badges, badgeAction };
