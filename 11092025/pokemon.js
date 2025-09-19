//const url ="https://pokeapi.co/api/v2/type"

//async function carregarPokemons(){
    //debugger
    //const resp = await fetch(url); //funcao do java que faz a propria requisicao
    //const data = await resp.json();
    //console.log(data);
//}

//carregarPokemons();

const input = document.getElementById("nome");
const btn = document.getElementById("btn");
const saida = document.getElementById("saida");

btn.addEventListener("click", async()=>{
    const nome = input.value.trim().toLowerCase() // tira o espaço e deixa minusculo
    if(nome.length ===0){
        saida.textContent = "DIGITE O NOME DO POKÉMON."
        return // codigo morre aqui
    }

    saida.textContent ="Buscando..."

    try{
        debugger//ajuda a encontrar o erro
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`);
        
        if(!res.ok) throw new Error("não encontrado")

        const p = await res.json();

        const sprite = p.sprites.other?.["official-artwork"]?.front_default ||
                        p.sprites.front_default || "";

        saida.innerHTML=`
            <h2>#${p.id} ${p.name}</h2>
            <img src="${sprite}" /> 
        `
    }catch{
        saida.textContent = "Pokémon não encontrado."
        
    }
})