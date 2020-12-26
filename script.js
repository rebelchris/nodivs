const output = document.getElementById("output");
const cssBody = document.getElementById("cssBody");
const cssBefore = document.getElementById("cssBefore");
const cssAfter = document.getElementById("cssAfter");
const iFrame = document.getElementById("iFrame").contentWindow.document;

document.addEventListener("keyup", (event) => {
  console.log(event.target);
  console.log(cssBody);
  if (
    event.target !== cssBody &&
    event.target !== cssBefore &&
    event.target !== cssAfter
  ) {
    console.log("not good");
    return;
  }
  console.log(cssBody.value);
  iFrame.open();
  iFrame.writeln(`
    <style>
    body { ${cssBody.value} }
    body:before { ${cssBefore.value} }
    body:after { ${cssAfter.value} }
    </style>`);
  iFrame.close();
});
