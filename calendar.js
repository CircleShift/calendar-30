var calbase = null;
var mmmbase = null;

var dtm = {
    y: 1,
    m: 1,
    d: 1
}

var og = {
    y: 1,
    m: 1,
    d: 1
}

function isLeap(year) {
    if (year % 400 == 0)
        return true;
    else if (year % 100 == 0)
        return false;
    return year % 4 == 0;
}


function clearCal () {
    while (calbase.firstElementChild) {
        calbase.firstElementChild.remove();
    }
}

dayName = ["One day", "Two day", "Three day", "Four day", "Five day"];
extraDayName = "Six day";

function genMonth (d) {
    let year = d.y, month = d.m, day = d.d;
    clearCal();

    let weeks = month == 12 ? 7 : 6;
    let extraDay = month == 12 && isLeap(year);

    for (let i = 0; i < weeks; i++) {
        let row = document.createElement("div");

        for (let j = 0; j < 5; j++) {
            let de = document.createElement("div");
            
            de.innerText = `${i * 5 + j + 1}/${dtm.m}/${dtm.y}`;
            de.className = "day";
            
            if (day == (i * 5 + j + 1))
                de.classList.add("today");

            row.appendChild(de);
        }
        
        calbase.appendChild(row);
    }

    if (extraDay) {
        let row = document.createElement("div");
        let de = document.createElement("div");

        de.className = "day";
            
        if (day == 36)
            de.classList.add("today");

        de.innerText = `36/${dtm.m}/${dtm.y}`;
        
        row.appendChild(de);
        calbase.appendChild(row);
    }
}


function showMonthTxt() {
    mmmbase.innerText = `Month ${dtm.m} of ${dtm.y}`; 
}

function setupDTM(d) {
    dtm.y = d.getFullYear() + 10000;

    let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let gm = d.getMonth() + 1;
    let days = d.getDate();

    for (let i = 1; i < gm; i++) {
        if (isLeap(d.getFullYear()) && i == 2)
            days += 1;
        days += daysInMonths[i - 1];
    }

    if (days > 330) {
        dtm.m = 12;
        dtm.d = days - 330;
    } else {
        dtm.m = Math.ceil(days / 30);
        dtm.d = ((days - 1) % 30) + 1;
    }

    console.log(dtm);

    showMonthTxt();
}


window.onload = (e) => {
    calbase = document.getElementById("cal");
    mmmbase = document.getElementById("mtxt");
    
    setupDTM(new Date());

    genMonth(dtm);
}


function nextMonth() {
    if (dtm.m == 12) {
        dtm.m = 1;
        dtm.y++;
    } else {
        dtm.m++;
    }

    genMonth(dtm);
    showMonthTxt();

    return;
}

function prevMonth() {
    if (dtm.m == 1) {
        dtm.m = 12;
        dtm.y--;
    } else {
        dtm.m--;
    }

    genMonth(dtm);
    showMonthTxt();

    return;
}