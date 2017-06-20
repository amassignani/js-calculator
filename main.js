let number = 0;
let formula = [""];




document.addEventListener('DOMContentLoaded', function(evt) {
    let h = document.getElementById('history')
    let n = document.getElementById('number')
    let keypad = document.getElementById('keypad')
    
    // if wait for user to click = and then process the history, 
          // we need to split the history into numbers and operations
          // if we just create number as user click various button before
          // the = button, we don't have to split the history
          
    for (var i = 0; i < keypad.children.length; i++) {
      keypad.children[i].addEventListener('click', function(evt) {
        
        switch (evt.target.innerHTML) {
          
          case "+":
          case "-":
          case "*":
          case "/":
            h.innerHTML += evt.target.innerHTML
            let operationText = evt.target.innerHTML
            formula.push(getMathOperation(operationText))
            break
          case "=":
            // = is pressed
            let answer = Number(formula[0]); // assume first item in formula is a number
            let operation = null;
            for (var i = 1; i < formula.length; i++) {
              // if we have a string type item, we actually have a number to
              // operate on
              if (typeof(formula[i]) === "string") { // check we have a number
                // we have a number, now use the operation
                if (operation != null) { 
                  // the operation that precedes this number to be used 
                  // between answer and this number
                  answer = operation(answer, Number(formula[i]))
                  console.log("answer is now " + answer)
                }
              } else {
                operation = formula[i]
              }
            }
            n.innerHTML = "" + answer
            break
          default:
            h.innerHTML += evt.target.innerHTML
            let prev = formula[formula.length - 1] 
            if (typeof(prev) === "string") {
              // we have a number, concat and move on
              formula[formula.length-1] += evt.target.innerHTML
            } else {
              // we had an operation, start a new number
              formula.push(evt.target.innerHTML)
            }
        }
        
        console.log(formula)
        // n.innerHTML = formula
      }); 
    }
})

function coreMath(a, b, c) {
  return c(a, b);
}

function addMath(a, b) {
  return a + b;
}

function minusMath(a, b) {
  return a - b;
}

function divideMath(a, b) {
  return a / b;
}

function multiplyMath(a, b) {
  return a * b;
}

function getMathOperation(z) {
  switch (z) {
    case "+":
      return addMath;
    case "-":
      return minusMath;
    case "÷":
      return divideMath;
    case "x":
      return multiplyMath;
    case "=":
      return coreMath;
  }
}