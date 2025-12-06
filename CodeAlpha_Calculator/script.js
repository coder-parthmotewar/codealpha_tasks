const display = document.getElementById('display');
const historyBox = document.getElementById('history');

function append(value) {
  if (display.innerText === '0') display.innerText = '';
  display.innerText += value;
}

function clearDisplay() {
  display.innerText = '0';
}

function deleteLast() {
  if (display.innerText.length === 1) display.innerText = '0';
  else display.innerText = display.innerText.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.innerText;
    const result = eval(expression
      .replace('÷','/')
      .replace('×','*')
    );
    
    display.innerText = result;
    historyBox.innerHTML += `${expression} = ${result}<br>`;
  } 
  catch {
    display.innerText = 'Error';
  }
}

/* Themes */
function setTheme(theme) {
  document.body.className = theme;
}

/* Keyboard Support */
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+','-','*','/','.','%'].includes(key))
    append(key);

  if (key === 'Enter') calculate();
  if (key === 'Backspace') deleteLast();
  if (key === 'Escape') clearDisplay();
});

/* Clear History */
function clearHistory() {
  historyBox.innerHTML = `History:<br><br>
  <button class="clear-btn" onclick="clearHistory()">Clear History</button>
  <br><br>`;
}
