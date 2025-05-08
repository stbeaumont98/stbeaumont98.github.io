let mDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function numLY(date) {
    const dateArray = date.split("-");
    let year = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]);
    
    if (month <= 2)
        year--;

    return Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400); 
}

function getDiff(date1, date2) {
    const date1Array = date1.split("-");
    let y1 = date1Array[0], m1 = date1Array[1], d1 = date1Array[2];
    const date2Array = date2.split("-");
    let y2 = date2Array[0], m2 = date2Array[1], d2 = date2Array[2];

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

function calcMatch(dogBirthday, userBirthday) {
    let offset = getDiff(dogBirthday, userBirthday);
    if (offset == 0)
        return 0;
    
    let i = 0;
    while (i * 7 < offset + i)
        i++;

    return i;
}

function submitForm() {
    let dogBirthday = document.getElementById("dogs-birthday").value;
    let userBirthday = document.getElementById("user-birthday").value;

    document.getElementById("result").innerHTML = calcMatch(dogBirthday, userBirthday);
}