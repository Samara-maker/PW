document.querySelector("form").addEventListener("submit", function(evento) {
    evento.preventDefault()
    
    const numeros = document.getElementById("numeros").value
    const letras = document.getElementById("letras").value
    const email = document.getElementById("email").value

    console.log(numeros, letras, email)

});

document.getElementById("numeros").addEventListener("input", function() {

    const valor = document.getElementById("numeros").value
    const redex = /^[0-9]+$/
    const valido = redex.test(valor)
    console.log(valido)

    if(valor == "") {
        document.getElementById("numeros").className="";
        document.getElementById("msg1").textContent="";
    } else if(valido) {
        document.getElementById("numeros").className = "valido"
        document.getElementById("msg1").textContent="valido";
    }else {
        document.getElementById("numeros").className = "invalido"
        document.getElementById("msg1").textContent="invalido";
    }

});

document.getElementById("letras").addEventListener("input", function(evento) {

    const valor = document.getElementById("letras").value
    const redex = /^[a-zA-ZçÇ]+$/ // qualquer letra de A a Z minusculo e maiusculo
    const valido = redex.test(valor)
    console.log(valido)

    if(valor == "") {
        document.getElementById("letras").className="";
        document.getElementById("msg2").textContent="";
    } else if(valido) {
        document.getElementById("letras").className = "valido"
        document.getElementById("msg2").textContent="valido";
    }else {
        document.getElementById("letras").className = "invalido"
        document.getElementById("msg2").textContent="invalido";
    }

});

document.getElementById("email").addEventListener("input", function(evento) {

    const valor = document.getElementById("email").value
    const redex = /^\w+@\w+\.\w+$/ 
    const valido = redex.test(valor)
    console.log(valido)

    if(valor == "") {
        document.getElementById("email").className="";
        document.getElementById("msg3").textContent="";
    } else if(valido) {
        document.getElementById("email").className = "valido"
        document.getElementById("msg3").textContent="valido";
    }else {
        document.getElementById("email").className = "invalido"
        document.getElementById("msg3").textContent="invalido";
    }

});