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
    async function () {
      const file = await Interface.modalSingleFile({
        parameters: {},
      });
      const fileContents = await file.text();
      const fileDocument = DOM_PARSER.parseFromText(fileContents);
      for (const child of fileDocument.children) {
        console.log(child);
      }
    });
  } catch (e) {
    console.error(e);
  }
}
