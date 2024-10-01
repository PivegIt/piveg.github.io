var y = document.getElementById("yes");
var n = document.getElementById("no");
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