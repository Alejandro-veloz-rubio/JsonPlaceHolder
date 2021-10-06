let options=function(json){
    let res='';
    for(let i=0;i<json.length;i++){
        res+=`<option value=${json[i].id}>${json[i].username}</option>`;
    };
    return res;

};

let divusers=function(json){
    let res="";
    for(let i=0;i<json.length;i++){
        res+=`
        <div class="divs">
        <h3>${json[i].title}</h3>
        <p>${json[i].body}</p>
        <button>Ver Comentarios</button>
        <div id='coments${json[i].id}'></div>
        </div>`;
    };
    return res;
};

let btncargar=document.getElementById('btncargar');
btncargar.addEventListener('click',()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
          //console.log(json);
          let select=document.getElementById('users');
          select.innerHTML=options(json);
      });
});


let Obselect=document.getElementById('users');
Obselect.addEventListener('change',()=>{
    let selectvalue=document.getElementById('users').value;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectvalue}`)
      .then((response) => response.json())
      .then((json) => {
          //console.log(json);
          let finaldiv=document.getElementById('posts');
          finaldiv.innerHTML=divusers(json);
      });
});



