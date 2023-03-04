let main=document.getElementById("main");
let addUser=document.getElementById("add-user");
let double=document.getElementById("double");
let millionaires=document.getElementById("show-millionaires");
let sort=document.getElementById("sort");
let calculate=document.getElementById("calculate-wealth");

let mainArray=[]

addUser.addEventListener("click",addPerson);
double.addEventListener("click",doubleMap);
millionaires.addEventListener("click",filterMilion);
sort.addEventListener("click",sortRish);
calculate.addEventListener("click",allValues);

async function fetchApi(){
    let myResponse= await fetch("https://randomuser.me/api");
    let data=await myResponse.json();
    let dataresult=data.results;
    let personName=dataresult[0].name;
    let fullName=`${personName.first} ${personName.last}`;
    
    let objPerson={
        name:fullName,
        money:Math.floor(Math.random()*1000000)
    }
    addObjs(objPerson)
    addElements(mainArray)
}

function defaultTree(){
    fetchApi()
    fetchApi()
    fetchApi()
}
defaultTree()
function addObjs(obj){
    mainArray.push(obj);
}
function addElements(arr){
    main.innerHTML=`<h2><strong>Person</strong> Wealth</h2>`;
    arr.map((ele)=>{
        let div=document.createElement("div");
        let strong=document.createElement("strong");
        div.className="newPerson";
        strong.innerHTML=`${ele.name}`;
        div.append(strong,`$${(ele.money).toLocaleString()}`);
        main.append(div);
    })
}

function addPerson(){
    fetchApi();
}

function doubleMap(){
    mainArray.map((ele)=>{
        ele.money*=2;
    })
    addElements(mainArray)
}

function filterMilion(){
    mainArray=mainArray.filter((ele)=>{
        return ele.money>1000000;
    })
    addElements(mainArray)
}

function sortRish(){
    mainArray=mainArray.sort((a,b)=>{return b.money - a.money})
    addElements(mainArray);
}

function allValues(){
    let sum=mainArray.reduce((acc,ele)=>{
        return acc+ele.money
    },0)
    let div=document.createElement("div");
    let strong=document.createElement("strong");
    div.className="sumall";

    strong.innerHTML=`$${sum.toLocaleString()}`
    div.append(`Total Wealth:`,strong)
    main.appendChild(div)
}


