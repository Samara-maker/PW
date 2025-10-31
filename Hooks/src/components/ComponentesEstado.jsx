import {useState}from'react';

//HOOKS: conjunto de funções, como por exemplo: useState

function ComponenteEstado(){

    const[contador, SetContador] = useState(0);
    return(
        <div>
            <h2>Exemplo de useState</h2>
            <p>Você clicou {contador} vezes</p>
            <button onClick={() => SetContador(contador + 1)}>
                Clique aqui
            </button>
        </div>
    );
}

export default ComponenteEstado;                             