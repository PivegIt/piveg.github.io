var y = document.getElementById("yes");
var n = document.getElementById("no");
var submit = document.getElementById("submit");
var newCoustumer = document.getElementById("newCoustumer");
var cancelar = document.getElementById("cancelar");
//funcion para obtener el id de un elemento
function getId(elId){
    var id = document.getElementById(elId);
    return id;
}
//crear nuevo usuario
newCoustumer.addEventListener("click", function(){
    var formulario = getId("formulario");
    var tablaPrincipal = getId("tablaPrincipal");

    tablaPrincipal.className = "oculto";
    formulario.className ="";
})
//Deshabilitar o habilitar el checkbox de la opcion NO
y.addEventListener("click", function(){
    if(y.checked == true){
       n.disabled = true
    }else{
        n.disabled = false
    }
});
//Deshabilitar o habilitar el checkbox de la opcion SI
n.addEventListener("click", function(){
    if(n.checked == true){
       y.disabled = true
    }else{
        y.disabled = false
    }
});


//recopilacion de la informacion del formulario
submit.addEventListener("click", function(e){
    e.preventDefault();
    var giro = getId("giro");
    var name_company = getId("name_company");
    var observations = getId("observations");
    var name = getId("name");
    var department = getId("department");
    var email = getId("email");
    var phone = getId("phone");
    var celular = getId("celular");
    //guardara la variable si o no conoce nuestro productos
    var knowOurProducts;
    var y = getId("yes");
    var n = getId("no");
    if(y == true){
        knowOurProducts = "yes"
    }else{
        knowOurProducts = "no"
    }
    //guardara la variable que Cual es la calidad de los productos de su interes, nacional o exportado 
    var national = getId("national");
    var exporta = getId("export");
    //console.log(national.checked)
    var productsInterestCalid = new Array()
    if(national.checked == true){
        productsInterestCalid.push("Nacional")
    }
    if(exporta.checked == true){
        productsInterestCalid.push("Exportacion")
    }

    //Craremos el array para guardar los productos que esta interesado el cliente
    var chile =getId("chile");
    var purees = getId("purees");
    var seasonings = getId("seasonings");
    var moles = getId("moles");
    var  productsInteresCostomer = new Array();

    if(chile.checked == true){
        productsInteresCostomer.push("Chile")
    }
    if(purees.checked == true){
        productsInteresCostomer.push("Pures")
    }
    if(seasonings.checked == true){
        productsInteresCostomer.push("Sazonadores")
    }
    if(moles.checked == true){
        productsInteresCostomer.push("Moles")
    }
 

    var datosDb = JSON.parse(localStorage.getItem("dbLocal"));
    var idUp = datosDb === null ? 1 : datosDb.length + 1 ;
    
    console.log(datosDb)
    console.log(idUp)
    //Se crea el objeto que sera guardado en la DB
    var cliente = new Array();
    //Validando los datos del formulario
    if(name_company.value === "" || giro.value === "" || name.value === "" || department.value === "" || email.value === "" || phone.value === "" || celular.value === ""){
        alert("Se requiere todos los campos")
        
    }else{
        cliente.push({
            id: idUp,
            name_company: name_company.value,
            giro: giro.value,
            name:name.value,
            department: department.value,
            email: email.value,
            phone: phone.value,
            celular: celular.value,
            knowOurProducts: knowOurProducts,
            productsInterestCalid: productsInterestCalid,
            productsInteresCostomer: productsInteresCostomer,
            observations: observations.value,
        })
    
        if(datosDb == null){
            localStorage.setItem('dbLocal', JSON.stringify(cliente))
        }else{
            datosDb.push(cliente);
            localStorage.setItem('dbLocal', JSON.stringify(datosDb))
        }
        var formulario = getId("formulario");
        var tablaPrincipal = getId("tablaPrincipal");

        tablaPrincipal.className = "";
        formulario.className ="oculto";
        location.reload();
    }
})
//Cancela el formulario y retorna a la primera vista
cancelar.addEventListener("click", function(){
    var formulario = getId("formulario");
    var tablaPrincipal = getId("tablaPrincipal");

    tablaPrincipal.className = "";
    formulario.className ="oculto";
});
//Mostrara los registros en una tabla
function tabla(){
    var tabla = getId("tabla")
    let tbody2 = document.querySelector(".tbody2");
    var datosDb = JSON.parse(localStorage.getItem("dbLocal"));
    console.log(datosDb)

    

    if(datosDb == null){
        var cliente = new Array();

    cliente.push({
        id: 1,
        name_company: "Compañia de prueba",
        giro: "Giro de prueba",
        name:"Nombre de prueba",
        department: "Departamento de prueba",
        email: "Email de prueba",
        phone: "Telefono de prueba",
        celular: "Celular de prueba",
        knowOurProducts: "Productos de prueba",
        productsInterestCalid: "Productos de prueba",
        productsInteresCostomer: "Productos de prueba",
        observations:"Productos de prueba",
    })

        localStorage.setItem('dbLocal', JSON.stringify(cliente))

    }
    var tdFoot = getId("tdFoot");
    tdFoot.innerHTML = (datosDb.length - 1) +" Elementos"
    for(var i = 1; 1 < datosDb.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>
            ${datosDb[i][0].name}
        </td>
        <td>
            ${datosDb[i][0].email}
        </td>
        <td>
            ${datosDb[i][0].phone}
        </td>
        <td>
            ${datosDb[i][0].celular}
        </td>
        <td>
            ${datosDb[i][0].name_company}
        </td>
        `;
    

        tbody2.appendChild(tr);
    };
    

}

function impDatos(){
    var imprimir = getId("imprimir");
    var datosDb = JSON.parse(localStorage.getItem("dbLocal"));

    for(var i = 1; 1 < datosDb.length; i++) {
        let div = document.createElement("div");
        div.style = "border: solid 1px black"
        div.innerHTML = `
        <div >
            <p>PLANTILLA DE INFORMACION</p>
            <div>
                <span>Nombre Compañia: </span>
                <span class"">${datosDb[i][0].name_company}</span>
            </div>
            <div>
                <span>Giro: </span>
                <span class"">${datosDb[i][0].giro}</span>
            </div>
        </div>
        <div>
            <p>Informacion de contacto</p>
            <div>
                <span>Nombre: </span>
                <span class"">${datosDb[i][0].name}</span>
            </div>
            <div>
                <span>Departamento: </span>
                <span class"">${datosDb[i][0].department}</span>
            </div>
            <div>
                <span>Email: </span>
                <span class"">${datosDb[i][0].email}</span>
            </div>
            <div>
                <span>Telefono: </span>
                <span class"">${datosDb[i][0].phone}</span>
            </div>
            <div>
                <span>Celular: </span>
                <span class"">${datosDb[i][0].celular}</span>
            </div>
        </div>
        <div>
            <span class"">
                <p>¿Conoces nuestros productos?</p>
                ${datosDb[i][0].knowOurProducts}
            </span>
        </div>
        <div>
            <span class"">
                <p>¿Cual es la calidad de los productos de su interes?</p>
                ${datosDb[i][0].productsInterestCalid}
            </span>
        </div>
        <div>
            <span class"">
                <p>¿En que productos esta interesado?</p>
                ${datosDb[i][0].productsInteresCostomer}
            </span>
        </div>
        <div>
            <span class"">
                <p>OBSERVACIONES</p>
                ${datosDb[i][0].observations}
            </span>
        </div>

        `;
    

        imprimir.appendChild(div);
    };
}