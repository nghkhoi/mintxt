const txtEditor = document.querySelector('.textedit');
const statusBar = document.querySelector('.toolbar--status-bar');
const infoWordCount = document.querySelector('#infoWordCount');

// To add a new toolbar button:
// In HTML: add a new <button> element with id as 'btnFunction'.
// In JS: add a normal function with name as 'btnFunction_Action' and a parameter for <textarea> element.
// The code below will automatically bind the action function with corresponding function.

const toolbarButtonList = document.querySelectorAll("[id^='btn']");

for (const toolbarButton of toolbarButtonList) {
  let buttonActionName = toolbarButton.id + '_Action';
  toolbarButton.onclick = () => { window[buttonActionName](txtEditor) };
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/mintxt/sw.js');
}

// Auto-save functionality
if(localStorage.getItem('text_content'))
  txtEditor.value = localStorage.getItem('text_content');

setInterval(function() {
  localStorage.setItem('text_content', txtEditor.value);
}, 2000);

// Get shared text from other app if avaiable
window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location);
  let textParam = parsedUrl.searchParams.get('text');
  if (textParam)
    txtEditor.value = textParam;
});

// Dynamically update word count on text input
txtEditor.addEventListener('input', (e) => updateWordCount(txtEditor, infoWordCount));

function btnClear_Action(tx) {
  if (tx.value.trim().length > 0 && window.confirm("Do you really want to clear all content?"))
  {
    tx.value = '';
    updateWordCount(txtEditor, infoWordCount);
  }
  tx.focus();
}

function btnUndo_Action (tx) {
  document.execCommand('undo');
  updateWordCount(txtEditor, infoWordCount);
}

function btnRedo_Action (tx) {
  document.execCommand('redo');
  updateWordCount(txtEditor, infoWordCount);
}

function btnCopy_Action (tx) {
  if (tx.value.trim().length > 0)
    navigator.clipboard.writeText(tx.value);
}

function btnPaste_Action (tx) {
  navigator.clipboard.readText()
    .then((clip) => {
      let selStart = tx.selectionStart;
      let selEnd = tx.selectionEnd;
      let old = tx.value;
      tx.value = old.slice(0, selStart) + clip + old.slice(selEnd);
      tx.setSelectionRange(selStart, selStart !== selEnd ? selStart + clip.length : selEnd);
      tx.focus();
      updateWordCount(txtEditor, infoWordCount);
    });
}

function btnWrap_Action (tx) {
  tx.wrap = tx.wrap === 'off' ? 'soft' : 'off';
}

function btnStatusBar_Action (tx) {
  statusBar.style.display = (statusBar.style.display === 'none' ? 'flex' : 'none');
}

function btnQuote_Action(tx) {
  insertText (tx, '“', '”');
  updateWordCount(txtEditor, infoWordCount);
}

function btnEnDash_Action(tx) {
  insertText (tx, '–');
  updateWordCount(txtEditor, infoWordCount);
}

function btnEmDash_Action(tx) {
  insertText (tx, '—');
  updateWordCount(txtEditor, infoWordCount);
}

function btnJapaneseLongVowel_Action(tx) {
  let selStart = tx.selectionStart;
  let selEnd = tx.selectionEnd;
  let old = tx.value;

  if (selStart === selEnd && selStart > 0) selStart--;

  let selected = old.slice(selStart, selEnd);
  if (selected.length !== 1) return;

  switch (selected)
  {
    case 'a':
      selected = 'ā';
      break;
    case 'i':
      selected = 'ī';
      break
    case 'u':
      selected = 'ū';
      break;
    case 'e':
      selected = 'ē';
      break;
    case 'o':
      selected = 'ō';
      break;
    case 'A':
      selected = 'Ā';
      break;
    case 'I':
      selected = 'Ī';
      break
    case 'U':
      selected = 'Ū';
      break;
    case 'E':
      selected = 'Ē';
      break;
    case 'O':
      selected = 'Ō';
  }

  tx.value = old.slice(0, selStart) + selected + old.slice(selEnd);
  tx.setSelectionRange(selEnd, selEnd);
  tx.focus();
}

function btnUpperCase_Action(tx) {
  let selStart = tx.selectionStart;
  let selEnd = tx.selectionEnd;
  let old = tx.value;
  tx.value = old.slice(0, selStart) + old.slice(selStart, selEnd).toUpperCase() + old.slice(selEnd);
  tx.setSelectionRange(selStart, selEnd);
  tx.focus();
}

function btnLowerCase_Action(tx) {
  let selStart = tx.selectionStart;
  let selEnd = tx.selectionEnd;
  let old = tx.value;
  tx.value = old.slice(0, selStart) + old.slice(selStart, selEnd).toLowerCase() + old.slice(selEnd);
  tx.setSelectionRange(selStart, selEnd);
  tx.focus();
}

function updateWordCount (tx, info) {
  let text = tx.value;
  let noWord = text.match(/\S+/g)?.length || 0;  // Alternative: /\w+/g
  let noChar = text.length;
  info.innerHTML = `${noWord}w ${noChar}c`;
}

function insertText(tx, openText, closeText) {
  // If supplied just one: insert {openText}.
  // If supplied both: insert or wrap with both.
 
  let selStart = tx.selectionStart;
  let selEnd = tx.selectionEnd;
  let old = tx.value;
 
  if (closeText === undefined) closeText = '';
 
  tx.value = old.slice(0, selStart)
              + openText + old.slice(selStart, selEnd) + closeText
              + old.slice(selEnd);

  tx.setSelectionRange(selStart + openText.length, selEnd + openText.length);

  tx.focus();
}