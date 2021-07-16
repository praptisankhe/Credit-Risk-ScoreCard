
var scoreMap = {}
var workMap = {}
var finalScore = 0
var visa = ''
var threshold = ''


  
console.log("ppppppppppp")
// Score the test and render output to DOM
function scoreTest() {
    finalScore = 0;
    var scoreArr = Object.values(scoreMap)
    for (var i = 0; i < scoreArr.length; i++) {
        if (scoreArr[i] === "Not Met") {
            finalScore = 0
            break

        } else {
            finalScore += parseInt(scoreArr[i])
        }
    }
    document.getElementById('final-score').innerHTML = '<h1 class="pp"> Your Score : ' + finalScore + '</h1>';
    ff(); 
    var passMsg = 'As the pass mark for the ' + visa + ' is ' + threshold + ', '
    if (finalScore >= threshold) {
        passMsg += ' you would appear to meet the criteria for this type of visa.'
    } else {
        passMsg += ' you would <b>not</b> appear to meet the criteria for this type of visa.'
    }
    document.getElementById('pass').innerHTML = passMsg
}

// Score an individual radio element
function scoreRadio(el) {
    scoreMap[el.name] = el.value;
    var x = document.getElementById(el.name);
    var a = el.value;
    var p = el.name;
    var myimg = x.getElementsByTagName('img')[0];
    var mysrc = myimg.src;
  x.innerHTML= `  <div class="card visible" style="width: 10rem;">
  <img class="card-img-top" src="`+mysrc+`"
      alt="Card image cap">
  
  <div class="card-body px-2 py-4 text-center">
      <h6 class="card-title">`+p+`</h6>

      <span id='`+p+`'>`+a+`</span>
  </div>
  
</div>`

    scoreTest()
}

// Score an individual checkbox element
function scoreCheck(el) {
    var group = el.name
    var sum = 0
    var els = document.getElementsByName(group)
    for (var i = 0; i < els.length; i++) {
        sum += parseInt(els[i].value)
    }
    scoreMap[group] = sum
    document.getElementById(group).innerText = sum
    scoreTest()
}

// Show education questions and score them
function showEducationQuestions(bool) {
    showClass('edu_question', bool)

    // zero or reapply out all checked questions
    els = document.querySelectorAll('[name=region], [name=specialist], [name=prof-year]')
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
            scoreMap[els[i].name] = bool ? els[i].value : 0
        }
    }
    scoreTest()
}

function showResidentQuestion(bool) {
    showClass('partner_resident', bool)
    if (bool) {
        var el = document.querySelector('input[name="partner-residence"]:checked')
        if (el !== null) {
            var value = document.querySelector('input[name="partner-residence"]:checked').value
            setPartnerScore(value)
            if (value === '0') {
                showQualityQuestions(true)
            }
        }
    }
}

function showQualityQuestions(bool) {
    showClass('partner_qualities', bool)
    if (bool) {
        scorePartnerQualities()
    }
}

function setPartnerScore(value) {
    scoreMap[el.name] = el.value;
    var x = document.getElementById(el.name);
    var a = el.value;
    var p = el.name;
    var myimg = x.getElementsByTagName('img')[0];
    var mysrc = myimg.src;
  x.innerHTML= `  <div class="card visible" style="width: 10rem;">
  <img class="card-img-top" src="`+mysrc+`"
      alt="Card image cap">
  
  <div class="card-body px-2 py-4 text-center">
      <h6 class="card-title">`+p+`</h6>

      <span id='`+p+`'>`+a+`</span>
  </div>
  
</div>`

    scoreTest()
}

function scorePartnerQualities() {
    var age = document.getElementById('partner-age')
    var eng = document.getElementById('partner-eng')
    var skill = document.getElementById('partner-skill')

    if (eng.checked) {
        if (age.checked && skill.checked) {
            setPartnerScore('10')
        } else {
            setPartnerScore('5')
        }
    } else {
        setPartnerScore('0')
    }
}

function scoreWorkRadio(el) {
    workMap[el.name] = el.value
    scoreWorkExp()
}

function scoreWorkExp() {
    var totalExp = 0
    var workArr = Object.values(workMap)

    for (var i = 0; i < workArr.length; i++) {
        totalExp += parseInt(workArr[i])
    }
    if (totalExp > 20) {
        totalExp = 20
    }
    scoreMap['work-experience'] = totalExp
    document.getElementById('total-experience').innerText = totalExp
    scoreTest()
}

// Set visa global variables on user selection
function setVisa(v, t) {
    visa = v
    threshold = t
}

function showClass(name, bool) {
    var els = document.getElementsByClassName(name)
    for (var i = 0; i < els.length; i++) {
        els[i].hidden = !bool
    }
}

// Load test view after page refresh
function loadTest() {
    var els = document.getElementsByTagName("input")
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
            els[i].click()
        }
    }
    els = document.getElementsByTagName("select")
    for (var i = 0; i < els.length; i++) {
        els[i].onchange()
    }
}


  