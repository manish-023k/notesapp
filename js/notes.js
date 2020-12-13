// console.log("this is the project");
display();
let addbtn=document.getElementById('addbtn');
addbtn.addEventListener('click',function()
{
    let addtxt=document.getElementById('addtxt');
    let titletxt=document.getElementById('titletxt');
    let title=localStorage.getItem("title");
    let notes=localStorage.getItem("notes");
    if(notes==null && title==null)
    {
        arr=[];
        tarr=[];
    }
    else
    {
      arr=JSON.parse(notes);
      tarr=JSON.parse(title);
    }
    arr.push(addtxt.value);
    tarr.push(titletxt.value);
    localStorage.setItem("notes",JSON.stringify(arr));
    localStorage.setItem("title",JSON.stringify(tarr));

    addtxt.value="";
    titletxt.value="";
    // console.log(arr);
    display();
})
//function to display the content from the localstorage
function display()
{
    let notes=localStorage.getItem("notes");
    let title=localStorage.getItem("title");
    if(notes==null && title==null)
    {
        arr=[];
        tarr=[];
    }
    else
    {
      arr=JSON.parse(notes);
      tarr=JSON.parse(title);
    }
    let html="";
    
    arr.forEach(function(element,index) {
        let t=new Date();
        let time=t.toDateString();
            let telement=tarr[index];
        html+=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> ${telement}</h5>
            <p class="card-text"> ${element}</p>
            <p class="card-text"> ${time}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
        
    });
    let notem=document.getElementById('notes');
    if(arr.length==0 && tarr.length==0)
    {
        notem.innerHTML=`please add the notes through the notes section above!`;
    }
    else
    {
      notem.innerHTML=html;
    }
}
//function to delete the node
function deleteNote(index)
{
    let notes=localStorage.getItem("notes");
    let title=localStorage.getItem("title");
    if(notes==null && title==null )
    {
        arr=[];
        tarr=[];
    }
    else
    {
      arr=JSON.parse(notes);
      tarr=JSON.parse(title);
    }
    arr.splice(index,1);
    tarr.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(arr)); //after delete the note from the given index again pushthe arr
    localStorage.setItem("title",JSON.stringify(tarr)); 
    display();
}
let search=document.getElementById('searchtxt');
search.addEventListener('input',function()
{
    let searchtxt=search.value.toLowerCase();
    let card=document.getElementsByClassName('noteCard');
    Array.from(card).forEach(function(element)
    {
        let cardtxt=element.getElementsByTagName('p')[0].innerText;
        let tfortxt=element.getElementsByTagName('h5')[0].innerText;
        if(cardtxt.includes(searchtxt) || tfortxt.includes(searchtxt))
        {
            element.style.display='block';
        }
        else
        {
            element.style.display='none';
        }
    })
})