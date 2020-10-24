
 function consultar(){
    nombre = $('#txtNombre').val();
    alert(nombre);

    var API_KEY = '16214558-f6b970016255961287754d201';
    var dir = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(nombre);

    $.ajax({
        url:dir,
        error:function(err){
            alert("No hay coincidencias");
            console.log(err);
        },
        beforeSend:function(){
            $("#divCargando").show();
        }
    }).done(function(data){
        $("#divCargando").hide();
        console.log('Iniciar la busqueda');
        const api = new XMLHttpRequest();
        api.open('GET', dir, true)
        api.send();
        api.onreadystatechange = function(){

            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.hits);
                let resultado = document.querySelector('#resultado')
                resultado.innerHTML = '';
                for(let item of datos.hits){
                    console.log(item.previewURL)
                    resultado.innerHTML += `<a class="black-text" href="${(item.pageURL)}"><img src="${(item.previewURL)}"/><h5>Tags:${(item.tags)}</h5><h5>Type:${(item.type)}</h5><h5>Author:${(item.user)}</h5></a>`;
                }
            }
        }
    });
            
}

app.initialize();