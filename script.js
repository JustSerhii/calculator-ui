const prev = document.querySelector('.previous');
const cur = document.querySelector('.current');

function putPrev(option) {
  prev.textContent = cur.textContent + option;
  cur.textContent = '';
}

function putCur(option) {
  cur.textContent += option.textContent;
}

function clearAll() {
  prev.textContent = '';
  cur.textContent = '';
}

function del() {
  cur.textContent = cur.textContent.slice(0, -1);
}

function equal() {
  const op = prev.textContent.slice(-1);
  const previousOperand = +(prev.textContent.slice(0, -1));
  const currentOperand = +(cur.textContent);
  if (op === '-') return (previousOperand * 10 - currentOperand * 10) / 10;
  else if (op === '+') return (previousOperand * 10 + currentOperand * 10) / 10;
  else if (op === '/') return (previousOperand * 10 / currentOperand * 10) / 100;
  else if (op === '×') return previousOperand * currentOperand;
  else if (op === '%') return previousOperand % currentOperand;
}

const options = document.querySelectorAll('.option');
options.forEach(option => {
  option.addEventListener('click', () => {
    if (option.hasAttribute('data-clear')) {
      clearAll();
    }
    else if (option.hasAttribute('data-del')) {
      del();
    }
    else if (option.hasAttribute('data-operator')) {
      if (prev.textContent != '') {
        cur.textContent = equal().toString();
        prev.textContent = '';
      }
      putCur(option);
      prev.textContent = cur.textContent;
      cur.textContent = '';
    }
    else if (option.hasAttribute('data-equal')) {
      cur.textContent = equal().toString();
      prev.textContent = '';
    }
    else if (cur.textContent === '0' && option.hasAttribute('data-number')) {
      cur.textContent = option.textContent;
    }
    else if (option.hasAttribute('data-dot')) {
      if (cur.textContent.length === 25) return;
      if (cur.textContent.includes('.')) return;
      else cur.textContent += '.';
    }
    else {
      if (cur.textContent.length === 25) return;
      putCur(option);
    }
  })
})