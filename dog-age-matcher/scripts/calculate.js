const smallYears = [15, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
const medYears = [15, 9, 4, 4, 4, 6, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4];
const largeYears = [15, 9, 4, 4, 4, 9, 5, 5, 6, 5, 6, 5, 5, 6, 5, 6];
const giantYears = [12, 10, 9, 7, 7, 4, 7, 8, 7, 8, 7, 7, 7, 7, 7, 7];

let mDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function numLY(date) {
    const dateArray = date.split("-");
    let year = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]);
    
    if (month <= 2)
        year--;

    return Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400); 
}

function countDays(y, m , d) {
    let n = y * 365 + d;

    for (let i = 0; i < m - 1; i++)
        n += mDays[i];

    n += numLY(date);

    return n;
}

function getDiff(date1, date2) {
    const date1Array = date1.split("-");
    let y1 = parseInt(date1Array[0]), m1 = parseInt(date1Array[1]), d1 = parseInt(date1Array[2]);
    const date2Array = date2.split("-");
    let y2 = parseInt(date2Array[0]), m2 = parseInt(date2Array[1]), d2 = parseInt(date2Array[2]);

    let n1 = y1 * 365 + d1;

    for (let i = 0; i < m1 - 1; i++)
        n1 += mDays[i];

    n1 += numLY(date1);

    let n2 = y2 * 365 + d2;

    for (let i = 0; i < m2 - 1; i++)
        n2 += mDays[i];

    n2 += numLY(date2);

    return n1 - n2;
}

// Algorithm: https://stackoverflow.com/a/454794
function getAge(date1, date2) {
    const date1Array = date1.split("-");
    let y1 = parseInt(date1Array[0]), m1 = parseInt(date1Array[1]), d1 = parseInt(date1Array[2]);
    const date2Array = date2.split("-");
    let y2 = parseInt(date2Array[0]), m2 = parseInt(date2Array[1]), d2 = parseInt(date2Array[2]);

    let yl = y2, ml = m2;
    if (m2 < m1 || m2 == m1 && d2 < d1)
        yl--;
    if (d2 < d1)
        ml--;
    let years = yl - y1;
    let months = ml + 12 * (y2 - yl) - m1;
    yl = y2;
    if (ml == 0) {
        ml = 12;
        yl--;
    }
    let days = countDays(y2, m2, d2) - countDays(yl, ml, d1);

    return [years, months, days];
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function calcMatch() {
    let dogBirthday = document.getElementById("dogs-birthday").value;
    let userBirthday = document.getElementById("user-birthday").value;
    let offset = getDiff(dogBirthday, userBirthday);

    let age = getAge(userBirthday, dogBirthday);
    
    let i = 0;
    while (i * 7 < offset + i)
        i++;

    document.getElementById("result").innerHTML = age.toString();//addDays(dogBirthday, i).toDateString();
}