const output = document.getElementById("output");
const cssBody = document.getElementById("cssBody");
const cssBefore = document.getElementById("cssBefore");
const cssAfter = document.getElementById("cssAfter");
const iFrame = document.getElementById("iFrame").contentWindow.document;

document.addEventListener("keyup", (event) => {
  if (
    event.target !== cssBody &&
    event.target !== cssBefore &&
    event.target !== cssAfter
  ) {
    return;
  }
  iFrame.open();
  iFrame.writeln(`
    <style>
    body { ${cssBody.value} }
    body:before { ${cssBefore.value} }
    body:after { ${cssAfter.value} }
    </style>`);
  iFrame.close();
});

const save = () => {
  var person = prompt("Please enter your Twitter handle", "DailyDevTips1");
  const uuid = Date.now().toString(36) + Math.random().toString(36).substr(2);
  firebase.database().ref(uuid).set({
    person: person,
    body: cssBody.value,
    before: cssBefore.value,
    after: cssAfter.value,
  });
  window.location.replace(`https://nodivs.com/view/?id=${uuid}`);
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBYF9riAviUU37U89OO-b-oLHq5ES5DBTw",
  authDomain: "nodivs-6d4ce.firebaseapp.com",
  databaseURL: "https://nodivs-6d4ce-default-rtdb.firebaseio.com",
  projectId: "nodivs-6d4ce",
  storageBucket: "nodivs-6d4ce.appspot.com",
  messagingSenderId: "277226508761",
  appId: "1:277226508761:web:017ff9f00bc1647fae09c8",
  measurementId: "G-4W0PJ5FHWD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();

const currentURL = window.location.search;
const search = new URLSearchParams(currentURL);
const searchId = search.get("id");
if (searchId.length >= 1) {
  let twitter = document.getElementById("twitter");
  var noDivRef = firebase.database().ref(searchId);
  noDivRef.once("value", function (data) {
    let divData = data.val();
    if (divData === null) {
      divData = {
        person: "Unkown",
        body: "background: red;",
        before: 'content: "Sorry, couldn\'t find this one"',
      };
    }

    twitter.href = `https://twitter.com/${divData.person}`;
    twitter.innerHTML = divData.person;

    iFrame.open();
    iFrame.writeln(`
    <style>
    body { ${divData.body} }
    body:before { ${divData.before} }
    body:after { ${divData.after} }
    </style>`);
    iFrame.close();
  });
}
