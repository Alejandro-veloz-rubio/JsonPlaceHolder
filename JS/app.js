options=(json)=>{
    let res='';
    for(let i=0;i<json.length;i++){
        res+=`<option value=${json[i].id}>${json[i].username}</option>`;
    };
    return res;

};

cargarcom=(postid)=>{
    //console.log(`los comentarios del post ${postid}`)
    let coments=document.getElementById(`coments${postid}`);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
      .then(response => response.json())
      .then(json => {
          let lista=`
          <br>
          <button type='button' onclick='quitarcom(${postid})'>Quitar Comentarios</button>`;
          for(let i=0;i<json.length;i++){
              lista+=`
              <div class="divs2">
              <h3>Name: ${json[i].name}</h3>
              <h4>Email: ${json[i].email}</h4>
              <p>Coment: ${json[i].body}</p>
              </div>
              `;
            coments.innerHTML=lista;
          }

    })
}

quitarcom=(postid)=>{
    let coments=document.getElementById(`coments${postid}`);
    coments.innerHTML="";
}


divposts=(json)=>{
    let res="";
    for(let i=0;i<json.length;i++){
        res+=`
        <div class="divs">
        <h3>${json[i].title}</h3>
        <p>${json[i].body}</p>
        <button type='button' onclick='cargarcom(${json[i].id})'>Ver Comentarios</button>
        <div id='coments${json[i].id}'></div>
        </div>`;
    };
    return res;
};

llamarinfo=()=>{
    let iduser=document.getElementById('users').value;
    fetch(` https://jsonplaceholder.typicode.com/users/${iduser}`)
      .then(response => response.json())
      .then(json => {
          //console.log(json)
          let divinfouser=document.getElementById('infouser');
          divinfouser.innerHTML=`
          <div class="divs3">
          <h3>Name: ${json.name}</h3>
          <p>Username: ${json.username}</p>
          <p>Email: ${json.email}</p>
          <p>Phone: ${json.phone}</p>
          <p>Website: ${json.website}</p>
          <p>City: ${json.address.city}</p>
          <button type='button' onclick='quitarinfo()'>Cerrar</button>
          </div>
          `
        });
};

quitarinfo=()=>{
    let divvacio=document.getElementById('infouser');
    divvacio.innerHTML="";
};



let btncargar=document.getElementById('btncargar');
btncargar.addEventListener('click',()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
          //console.log(json);
          let select=document.getElementById('users');
          select.innerHTML=options(json);
        })
        .then(buttoncreate=>{
            let div=document.getElementById('body2');
            div.innerHTML=`
            <button type='button' id='btndatos' onclick='llamarinfo()'>Ver datos</button> `;
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
          finaldiv.innerHTML=divposts(json);
      });
});



