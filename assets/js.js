let used = [];
let selected =[];
let won = false;

function setup(){
    if (used.length <= 24){
        const phrase = game.phrases[Object.keys(game.phrases)[Object.keys(game.phrases).length * Math.random() << 0]];
        if (used.indexOf(phrase) == -1){
            used.push(phrase);
            setup();
        }else{
            setup();
        }
    }
}

setup();

function checkGame(x,y, s){
    //check diags
    let checkedDiagA=0;
    let checkedDiagB=0;
    
    checkedDiagA=selected[1][1]?checkedDiagA+1:checkedDiagA;
    checkedDiagA=selected[2][2]?checkedDiagA+1:checkedDiagA;
    checkedDiagA=selected[3][3]?checkedDiagA+1:checkedDiagA;
    checkedDiagA=selected[4][4]?checkedDiagA+1:checkedDiagA;
    checkedDiagA=selected[5][5]?checkedDiagA+1:checkedDiagA;

    checkedDiagB=selected[1][5]?checkedDiagB+1:checkedDiagB;
    checkedDiagB=selected[2][4]?checkedDiagB+1:checkedDiagB;
    checkedDiagB=selected[3][3]?checkedDiagB+1:checkedDiagB;
    checkedDiagB=selected[4][2]?checkedDiagB+1:checkedDiagB;
    checkedDiagB=selected[5][1]?checkedDiagB+1:checkedDiagB;
    //check x,y
    const updatedRow = selected[y];
    let checkedy = 0;
    for (y=1; y<7; y++){
        if (selected[y]){
            if (selected[y][x]){
                checkedy=checkedy+1;
            }
        }
    }

    let checkedx = 0;
    for (x=0; x<7; x++){
        if (updatedRow[x]){
            checkedx=checkedx+1;
        }
    }
    
    if (checkedDiagA >= 5 || checkedDiagB >= 5 || checkedx >= 5 || checkedy >= 5){
        let message = game.wining[Object.keys(game.wining)[Object.keys(game.wining).length * Math.random() << 0]];
        document.getElementById("msg").innerHTML=message;
        document.getElementById("won").classList.remove("hidden");
    }else{
        document.getElementById("won").classList.add("hidden");
    }
}

used[12] = "Free Space!";

let x=-1;
let y=0;
used.forEach((a, i) => {
    const id = Math.floor(Math.random()*10000);
    document.getElementById("buttons").insertAdjacentHTML('beforeend', `
    <button id="${id}">${a}</button>
    `)

    if (x >= 4){
        x=-1;
        y=y+1;
    }
    x=x+1;
    const thisx=x+1;
    const thisy=y+1;


    if (!selected[thisy]){
        selected[thisy]={};
    }
    selected[thisy][thisx]=false;

    const el = document.getElementById(id);

    el.addEventListener("click", () => {
        if (el.classList.contains("selected")){
            el.classList.remove("selected");
            selected[thisx][thisy]=false;
            checkGame(thisx, thisy, false);
        }else{
            el.classList.add("selected");
            selected[thisy][thisx]=true;
            checkGame(thisx, thisy, true);
        }
    })
})