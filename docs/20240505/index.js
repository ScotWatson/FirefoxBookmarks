/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadInterface = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/20240316/interface.mjs");
});

Promise.all( [ loadInterface ] ).then(start, fail);

function fail() {
  console.log("Fail");
}

const DOM_PARSER = new DOMParser();
function start([ Interface ]) {
  try {
    document.body.style.fontSize = "48pt";
    document.body.append("Click to Start");
    document.body.addEventListener("click", function () {
      (async function () {
        const file = await Interface.modalSingleFile({
          parameters: {},
        });
        const fileContents = await file.text();
        const fileDocument = DOM_PARSER.parseFromString(fileContents, "text/html");
        const bookmarksBody = fileDocument.documentElement.getElementsByTagName("body")[0];
        for (const childDL of bookmarksBody.children) {
          if (childDL.nodeName === "DL") {
            console.log(childDL);
            for (const childDT of childDL.children) {
              // P is empty
              if (childDT.nodeName === "DT") {
                console.log(childDT);
                for (const child of childDT.children) {
                  console.log(child);
                }            
              }
            }            
          }
        }
      })();
    });
  } catch (e) {
    console.error(e);
  }
}
