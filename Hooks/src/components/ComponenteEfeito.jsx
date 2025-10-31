import { useId } from 'react';
import {useState, useEffect} from "react"

function ComponenteEfeito(){
    const[imagem, setImagem] = useState(null);
    
    useEffect(() => {
       
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => setImagem(data.message))
    
    }, [])
    
    return(
        <div>
            <h2>Exemplo de useEffect</h2>
            {imagem?(
                <img src={imagem} style={{maxWidth:"500px"}}></img>):(
                
                <p>Carregando imagem...</p>

                )
            }
        </div>
    )
    
}

export default ComponenteEfeito;