const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const beg = document.getElementById("beg");
const pro = document.getElementById("pro");

var wordNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var timer = 30;
var flag = 0;
var factor = 2;
var seconds;
var difficulty = 1;

displayTest(difficulty);

//on Input
inputItem.addEventListener("input", function (event) {
  if (flag === 0) {
    flag = 1;
    timeStart();
  }
  var charEntered = event.data;
  if (/\s/g.test(charEntered)) {
    //check if the character entered is a whitespace
    checkWord();
  } else {
    currentWord();
  }
});

//time selection
thirty.addEventListener("click", function () {
  timer = 30;
  factor = 2;
  limitColor(thirty, sixty);
  time.innerText = timer;
});
sixty.addEventListener("click", function () {
  timer = 60;
  factor = 1;
  limitColor(sixty, thirty);
  time.innerText = timer;
});

//difficulty Selection
beg.addEventListener("click", function () {
  difficulty = 1;
  displayTest(difficulty);
  limitColor(beg, pro);
});
pro.addEventListener("click", function () {
  difficulty = 2;
  displayTest(difficulty);
  limitColor(pro, beg);
});

//set the color of time and difficulty
function limitColor(itema, itemr) {
  itema.classList.add("yellow");
  itemr.classList.remove("yellow");
}

//restart the Test
restartBtn.addEventListener("click", function () {
  wordsSubmitted = 0;
  wordsCorrect = 0;
  flag = 0;

  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = "";
  inputItem.focus();

  displayTest(difficulty);
  clearInterval(seconds);
  limitVisible();
});

//start the timer countdown
function timeStart() {
  limitInvisible();
  seconds = setInterval(function () {
    time.innerText--;
    if (time.innerText == "-1") {
      timeOver();
      clearInterval(seconds);
    }
  }, 1000);
}

//diable textarea and wait for restart
function timeOver() {
  inputItem.disabled = true;
  restartBtn.focus();

  displayScore();
}

//set Limit visibility
function limitVisible() {
  thirty.style.visibility = "visible";
  sixty.style.visibility = "visible";
  beg.style.visibility = "visible";
  pro.style.visibility = "visible";
}
function limitInvisible() {
  thirty.style.visibility = "hidden";
  sixty.style.visibility = "hidden";
  beg.style.visibility = "hidden";
  pro.style.visibility = "hidden";
}

//display the score
function displayScore() {
  let percentageAcc = 0;
  if (wordsSubmitted !== 0) {
    percentageAcc = Math.floor((wordsCorrect / wordsSubmitted) * 100);
  }

  time.classList.add("current");
  cw.classList.add("current");

  time.innerText = percentageAcc + "%";
  timeName.innerText = "PA";

  cw.innerText = factor * wordsCorrect;
  cwName.innerText = "WPM";
}

//check if the user is entering correcrt word
function currentWord() {
  const wordEntered = inputItem.value;
  const currentID = "word " + wordNo;
  const currentSpan = document.getElementById(currentID);
  const curSpanWord = currentSpan.innerText;

  if (wordEntered == curSpanWord.substring(0, wordEntered.length)) {
    colorSpan(currentID, 2);
  } else {
    colorSpan(currentID, 3);
  }
}
//checks word entered
function checkWord() {
  const wordEntered = inputItem.value;
  inputItem.value = "";

  const wordID = "word " + wordNo;
  const checkSpan = document.getElementById(wordID);
  wordNo++;
  wordsSubmitted++;

  if (checkSpan.innerText === wordEntered) {
    colorSpan(wordID, 1);
    wordsCorrect++;
    cw.innerText = wordsCorrect;
  } else {
    colorSpan(wordID, 3);
  }

  if (wordNo > 40) {
    displayTest(difficulty);
  } else {
    const nextID = "word " + wordNo;
    colorSpan(nextID, 2);
  }
}

//color the words
function colorSpan(id, color) {
  const span = document.getElementById(id);
  if (color === 1) {
    span.classList.remove("wrong");
    span.classList.remove("current");
    span.classList.add("correct");
  } else if (color === 2) {
    span.classList.remove("correct");
    span.classList.remove("wrong");
    span.classList.add("current");
  } else {
    span.classList.remove("correct");
    span.classList.remove("current");
    span.classList.add("wrong");
  }
}

//display the random words on screen
function displayTest(diff) {
  wordNo = 1;
  testItem.innerHTML = "";

  let newTest = randomWords(diff);
  newTest.forEach(function (word, i) {
    let wordSpan = document.createElement("span");
    wordSpan.innerText = word;
    wordSpan.setAttribute("id", "word " + (i + 1));
    testItem.appendChild(wordSpan);
  });

  const nextID = "word " + wordNo;
  colorSpan(nextID, 2);
}

//Generate an array of random 50 words
function randomWords(diff) {
  var topWords = [
    "ability",
    "able",
    "about",
    "above",
    "accept",
    "according",
    "account",
    "across",
    "action",
    "activity",
    "actually",
    "address",
    "administration",
    "admit",
    "adult",
    "affect",
    "after",
    "again",
    "against",
    "agency",
    "agent",
    "ago",
    "agree",
    "agreement",
    "ahead",
    "allow",
    "almost",
    "alone",
    "along",
    "already",
    "also",
    "although",
    "always",
    "American",
    "among",
    "amount",
    "analysis",
    "and",
    "animal",
    "another",
    "answer",
    "anyone",
    "anything",
    "appear",
    "apply",
    "approach",
    "area",
    "argue",
    "around",
    "arrive",
    "article",
    "artist",
    "assume",
    "attack",
    "attention",
    "attorney",
    "audience",
    "author",
    "authority",
    "available",
    "avoid",
    "away",
    "baby",
    "back",
    "ball",
    "bank",
    "beat",
    "beautiful",
    "because",
    "become",
    "before",
    "begin",
    "behavior",
    "behind",
    "believe",
    "benefit",
    "best",
    "better",
    "between",
    "beyond",
    "bill",
    "billion",
    "black",
    "blood",
    "blue",
    "board",
    "body",
    "book",
    "born",
    "both",
    "break",
    "bring",
    "brother",
    "budget",
    "build",
    "building",
    "business",
    "call",
    "camera",
    "campaign",
    "cancer",
    "candidate",
    "capital",
    "card",
    "care",
    "career",
    "carry",
    "case",
    "catch",
    "cause",
    "cell",
    "center",
    "central",
    "century",
    "certain",
    "certainly",
    "chair",
    "challenge",
    "chance",
    "change",
    "character",
    "charge",
    "check",
    "child",
    "choice",
    "choose",
    "church",
    "citizen",
    "city",
    "civil",
    "claim",
    "class",
    "clear",
    "clearly",
    "close",
    "coach",
    "cold",
    "collection",
    "college",
    "color",
    "come",
    "commercial",
    "common",
    "community",
    "company",
    "compare",
    "computer",
    "concern",
    "condition",
    "conference",
    "congress",
    "consider",
    "consumer",
    "contain",
    "continue",
    "control",
    "cost",
    "could",
    "country",
    "couple",
    "course",
    "court",
    "cover",
    "create",
    "crime",
    "cultural",
    "culture",
    "cup",
    "current",
    "customer",
    "dark",
    "data",
    "daughter",
    "dead",
    "deal",
    "death",
    "debate",
    "decade",
    "decide",
    "decision",
    "deep",
    "defense",
    "degree",
    "Democrat",
    "democratic",
    "describe",
    "design",
    "despite",
    "detail",
    "determine",
    "develop",
    "development",
    "difference",
    "different",
    "difficult",
    "dinner",
    "direction",
    "director",
    "discover",
    "discuss",
    "discussion",
    "disease",
    "doctor",
    "door",
    "down",
    "draw",
    "dream",
    "drive",
    "drop",
    "drug",
    "during",
    "each",
    "early",
    "east",
    "easy",
    "economic",
    "economy",
    "edge",
    "education",
    "effect",
    "effort",
    "eight",
    "either",
    "election",
    "else",
    "employee",
    "energy",
    "enjoy",
    "enough",
    "enter",
    "entire",
    "environment",
    "environmental",
    "especially",
    "establish",
    "even",
    "evening",
    "event",
    "ever",
    "every",
    "everybody",
    "everyone",
    "everything",
    "evidence",
    "exactly",
    "example",
    "executive",
    "exist",
    "expect",
    "experience",
    "expert",
    "explain",
    "eye",
    "face",
    "fact",
    "factor",
    "fail",
    "fall",
    "family",
    "far",
    "fast",
    "father",
    "fear",
    "federal",
    "feel",
    "feeling",
    "field",
    "fight",
    "figure",
    "fill",
    "film",
    "final",
    "finally",
    "financial",
    "find",
    "fine",
    "finger",
    "finish",
    "fire",
    "firm",
    "first",
    "fish",
    "five",
    "floor",
    "fly",
    "focus",
    "follow",
    "food",
    "foot",
    "force",
    "foreign",
    "forget",
    "form",
    "former",
    "forward",
    "four",
    "free",
    "friend",
    "from",
    "front",
    "full",
    "fund",
    "future",
    "game",
    "garden",
    "general",
    "generation",
    "girl",
    "give",
    "glass",
    "goal",
    "good",
    "government",
    "great",
    "green",
    "ground",
    "group",
    "grow",
    "growth",
    "guess",
    "guy",
    "hair",
    "half",
    "hand",
    "hang",
    "happen",
    "happy",
    "hard",
    "have",
    "head",
    "health",
    "hear",
    "heart",
    "heat",
    "heavy",
    "help",
    "here",
    "herself",
    "high",
    "him",
    "himself",
    "his",
    "history",
    "hold",
    "home",
    "hope",
    "hospital",
    "hot",
    "hotel",
    "hour",
    "house",
    "how",
    "however",
    "huge",
    "human",
    "hundred",
    "husband",
    "I",
    "idea",
    "identify",
    "if",
    "image",
    "imagine",
    "impact",
    "important",
    "improve",
    "include",
    "including",
    "increase",
    "indeed",
    "indicate",
    "individual",
    "industry",
    "information",
    "inside",
    "instead",
    "institution",
    "interest",
    "interesting",
    "international",
    "interview",
    "into",
    "investment",
    "involve",
    "issue",
    "item",
    "it's",
    "itself",
    "join",
    "just",
    "keep",
    "kill",
    "kind",
    "kitchen",
    "know",
    "knowledge",
    "land",
    "language",
    "large",
    "last",
    "late",
    "later",
    "laugh",
    "law",
    "lawyer",
    "lead",
    "leader",
    "learn",
    "least",
    "leave",
    "left",
    "legal",
    "less",
    "letter",
    "level",
    "life",
    "light",
    "like",
    "likely",
    "line",
    "list",
    "listen",
    "little",
    "live",
    "local",
    "long",
    "look",
    "lose",
    "loss",
    "love",
    "machine",
    "magazine",
    "main",
    "maintain",
    "major",
    "majority",
    "make",
    "man",
    "manage",
    "management",
    "manager",
    "many",
    "market",
    "marriage",
    "material",
    "matter",
    "maybe",
    "mean",
    "measure",
    "media",
    "medical",
    "meet",
    "meeting",
    "member",
    "memory",
    "mention",
    "message",
    "method",
    "middle",
    "might",
    "military",
    "million",
    "mind",
    "minute",
    "miss",
    "mission",
    "model",
    "modern",
    "moment",
    "money",
    "month",
    "more",
    "morning",
    "most",
    "mother",
    "mouth",
    "move",
    "movement",
    "movie",
    "Mr",
    "Mrs",
    "much",
    "music",
    "must",
    "my",
    "myself",
    "name",
    "nation",
    "national",
    "natural",
    "nature",
    "near",
    "nearly",
    "necessary",
    "need",
    "network",
    "never",
    "news",
    "newspaper",
    "next",
    "nice",
    "night",
    "none",
    "north",
    "note",
    "nothing",
    "notice",
    "number",
    "occur",
    "off",
    "offer",
    "office",
    "officer",
    "official",
    "often",
    "once",
    "only",
    "onto",
    "open",
    "operation",
    "opportunity",
    "option",
    "order",
    "organization",
    "other",
    "others",
    "outside",
    "over",
    "own",
    "owner",
    "page",
    "pain",
    "painting",
    "paper",
    "parent",
    "part",
    "participant",
    "particular",
    "particularly",
    "partner",
    "party",
    "pass",
    "past",
    "patient",
    "pattern",
    "peace",
    "people",
    "perform",
    "performance",
    "perhaps",
    "period",
    "person",
    "personal",
    "phone",
    "physical",
    "pick",
    "picture",
    "piece",
    "place",
    "plan",
    "plant",
    "play",
    "player",
    "PM",
    "point",
    "police",
    "policy",
    "political",
    "politics",
    "poor",
    "popular",
    "population",
    "position",
    "positive",
    "possible",
    "power",
    "practice",
    "prepare",
    "present",
    "president",
    "pressure",
    "pretty",
    "prevent",
    "price",
    "private",
    "probably",
    "problem",
    "process",
    "produce",
    "product",
    "production",
    "professional",
    "professor",
    "program",
    "project",
    "property",
    "protect",
    "prove",
    "provide",
    "public",
    "pull",
    "purpose",
    "push",
    "quality",
    "question",
    "quickly",
    "quite",
    "race",
    "radio",
    "raise",
    "range",
    "rate",
    "rather",
    "reach",
    "read",
    "ready",
    "real",
    "reality",
    "realize",
    "really",
    "reason",
    "receive",
    "recent",
    "recently",
    "recognize",
    "record",
    "red",
    "reduce",
    "reflect",
    "region",
    "relate",
    "relationship",
    "religious",
    "remain",
    "remember",
    "remove",
    "report",
    "represent",
    "republican",
    "require",
    "research",
    "resource",
    "respond",
    "response",
    "responsibility",
    "rest",
    "result",
    "return",
    "reveal",
    "rich",
    "right",
    "rise",
    "risk",
    "road",
    "rock",
    "role",
    "room",
    "rule",
    "safe",
    "same",
    "save",
    "scene",
    "school",
    "science",
    "scientist",
    "score",
    "sea",
    "season",
    "seat",
    "second",
    "section",
    "security",
    "see",
    "seek",
    "seem",
    "sell",
    "send",
    "senior",
    "sense",
    "series",
    "serious",
    "serve",
    "service",
    "set",
    "seven",
    "several",
    "sex",
    "sexual",
    "shake",
    "share",
    "she",
    "shoot",
    "short",
    "shot",
    "should",
    "shoulder",
    "show",
    "side",
    "sign",
    "significant",
    "similar",
    "simple",
    "simply",
    "since",
    "sing",
    "single",
    "sister",
    "situation",
    "size",
    "skill",
    "skin",
    "small",
    "smile",
    "social",
    "society",
    "soldier",
    "some",
    "somebody",
    "someone",
    "something",
    "sometimes",
    "song",
    "soon",
    "sort",
    "sound",
    "source",
    "south",
    "southern",
    "space",
    "speak",
    "special",
    "specific",
    "speech",
    "spend",
    "sport",
    "spring",
    "staff",
    "stage",
    "stand",
    "standard",
    "star",
    "start",
    "state",
    "statement",
    "station",
    "stay",
    "step",
    "still",
    "stock",
    "stop",
    "store",
    "story",
    "strategy",
    "street",
    "strong",
    "structure",
    "student",
    "study",
    "stuff",
    "style",
    "subject",
    "success",
    "successful",
    "such",
    "suddenly",
    "suffer",
    "suggest",
    "summer",
    "support",
    "sure",
    "surface",
    "system",
    "table",
    "take",
    "talk",
    "task",
    "tax",
    "teach",
    "teacher",
    "team",
    "technology",
    "television",
    "tell",
    "tend",
    "term",
    "test",
    "than",
    "thank",
    "that",
    "their",
    "them",
    "themselves",
    "then",
    "theory",
    "there",
    "these",
    "they",
    "thing",
    "think",
    "third",
    "this",
    "those",
    "though",
    "thought",
    "thousand",
    "threat",
    "three",
    "through",
    "throughout",
    "throw",
    "thus",
    "time",
    "today",
    "together",
    "tonight",
    "total",
    "tough",
    "toward",
    "town",
    "trade",
    "traditional",
    "training",
    "travel",
    "treat",
    "treatment",
    "tree",
    "trial",
    "trip",
    "trouble",
    "true",
    "truth",
    "try",
    "turn",
    "TV",
    "type",
    "under",
    "understand",
    "unit",
    "until",
    "usually",
    "value",
    "various",
    "very",
    "victim",
    "view",
    "violence",
    "visit",
    "voice",
    "vote",
    "wait",
    "walk",
    "wall",
    "want",
    "watch",
    "water",
    "weapon",
    "wear",
    "week",
    "weight",
    "well",
    "west",
    "western",
    "what",
    "whatever",
    "when",
    "where",
    "whether",
    "which",
    "while",
    "white",
    "whole",
    "whom",
    "whose",
    "wide",
    "wife",
    "will",
    "wind",
    "window",
