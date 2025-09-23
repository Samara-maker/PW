// Regex Patterns
const regexPatterns = {
    nome: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    rg: /^(\d{2}\.\d{3}\.\d{3}-\d{1})|(\d{2}\.\d{3}\.\d{3}-[A-Z]{1})/,
    telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    whatsapp: /^\(\d{2}\)\s\d{5}-\d{4}$/,
    cep: /^\d{5}-\d{3}$/,
    data: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    placa: /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/,
    pis: /^\d{3}\.\d{5}\.\d{2}-\d{1}$/,
};

// Mensagens
const errorMessages = {
    nome: "Nome deve conter apenas letras e espaços (2-50 caracteres)",
    email: "Digite um email válido",
    cpf: "CPF deve estar no formato: 123.456.789-10",
    rg: "RG inválido",
    telefone: "Telefone inválido",
    whatsapp: "WhatsApp inválido ou igual ao telefone",
    cep: "CEP inválido",
    data: "Data inválida ou idade <16 anos",
    senha: "Senha fraca",
    placa: "Placa inválida",
    pis: "PIS/PASEP inválido",
    responsavel: "Responsável obrigatório",
    cnh: "CNH obrigatória",
    categoriaCnh: "Categoria obrigatória",
};

const successMessages = {
    nome: "Nome válido ✓",
    email: "Email válido ✓",
    cpf: "CPF válido ✓",
    rg: "RG válido ✓",
    telefone: "Telefone válido ✓",
    whatsapp: "WhatsApp válido ✓",
    cep: "CEP válido ✓",
    data: "Data válida ✓",
    senha: "Senha forte ✓",
    placa: "Placa válida ✓",
    pis: "PIS/PASEP válido ✓",
    responsavel: "Campo preenchido ✓",
    cnh: "CNH válida ✓",
    categoriaCnh: "Categoria válida ✓",
};

// Funções de validação
function validateField(field, value) {
    const regex = regexPatterns[field];
    return regex ? regex.test(value) : true;
}

// Validação de data real + idade mínima
function validateDate(dateStr) {
    const regex = regexPatterns.data;
    if (!regex.test(dateStr)) return false;
    const [d,m,y] = dateStr.split('/').map(Number);
    const date = new Date(y, m-1, d);
    const now = new Date();
    const age = now.getFullYear() - y - ((now.getMonth() < m-1 || (now.getMonth() === m-1 && now.getDate() < d)) ? 1 : 0);
    return date.getDate() === d && date.getMonth() === m-1 && date.getFullYear() === y && age >= 16;
}

// Validação CPF real
function validateCPF(cpf) {
    const regex = regexPatterns.cpf;
    if(!regex.test(cpf)) return {valid:false, message:errorMessages.cpf};
    let nums = cpf.replace(/\D/g,'');
    if(/^(\d)\1+$/.test(nums)) return {valid:false, message:"CPF inválido: dígitos iguais"};
    let sum=0; for(let i=0;i<9;i++) sum+=parseInt(nums[i])*(10-i);
    let d1=(sum*10)%11; if(d1===10)d1=0;
    sum=0; for(let i=0;i<10;i++) sum+=parseInt(nums[i])*(11-i);
    let d2=(sum*10)%11; if(d2===10)d2=0;
    let isValid=d1===parseInt(nums[9])&&d2===parseInt(nums[10]);
    return isValid?{valid:true,message:successMessages.cpf}:{valid:false,message:"CPF inválido: dígitos verificadores"};
}

// Feedback visual
function showFeedback(field, isValid, customMsg=null) {
    const input = document.getElementById(field);
    const error = document.getElementById(`${field}-error`);
    if(isValid){
        input.classList.remove('invalid');
        input.classList.add('valid');
        error.textContent = customMsg||successMessages[field];
        error.style.color = '#28a745';
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        error.textContent = customMsg||errorMessages[field];
        error.style.color = '#dc3545';
        input.classList.add('shake');
        setTimeout(()=>input.classList.remove('shake'),500);
    }
}

// Máscaras
function applyCPFMask(v){return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})/,'$1-$2');}
function applyPhoneMask(v){return v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{4,5})(\d)/,'$1-$2');}
function applyCEPMask(v){return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2');}
function applyDateMask(v){return v.replace(/\D/g,'').replace(/(\d{2})(\d)/,'$1/$2').replace(/(\d{2})(\d)/,'$1/$2');}
function applyPlateMask(v){v=v.toUpperCase().replace(/[^A-Z0-9]/g,'');return v.length<=3?v:v.length<=7?v.replace(/([A-Z]{3})(\d{1,4})/,'$1-$2'):v.replace(/([A-Z]{3})(\d{1})([A-Z]{1})(\d{1,2})/,'$1$2$3$4');}

// DOM Ready
document.addEventListener('DOMContentLoaded', ()=>{
    const form=document.getElementById('validationForm');
    const resultado=document.getElementById('resultado');
    const masks={cpf:applyCPFMask,telefone:applyPhoneMask,whatsapp:applyPhoneMask,cep:applyCEPMask,data:applyDateMask,placa:applyPlateMask};
    
    Object.keys(regexPatterns).forEach(f=>{
        const input=document.getElementById(f);
        if(!input) return;
        input.addEventListener('input',()=>{
            let val=input.value;
            if(masks[f]) val=masks[f](val);
            input.value=val;

            let isValid=false;
            let customMsg=null;
            if(val!==''){
                if(f==='cpf') {const r=validateCPF(val);isValid=r.valid;customMsg=r.message;}
                else if(f==='data') isValid=validateDate(val);
                else isValid=validateField(f,val);
            }
            showFeedback(f,isValid,customMsg);

            // Condicional menor de idade
            if(f==='data'){
                const [d,m,y]=val.split('/').map(Number);
                const now=new Date();
                const age=now.getFullYear()-y-((now.getMonth()<m-1||(now.getMonth()===m-1&&now.getDate()<d))?1:0);
                document.getElementById('responsavel').style.display=age<18?'block':'none';
            }

            // Condicional placa CNH
            if(f==='placa') document.getElementById('cnh').style.display=document.getElementById('placa').value.trim()!==''?'block':'none';
            if(f==='placa') document.getElementById('categoriaCnh').style.display=document.getElementById('placa').value.trim()!==''?'block':'none';
        });
    });

    form.addEventListener('submit',e=>{
        e.preventDefault();
        let allValid=true,emptyFields=[];
        Object.keys(regexPatterns).forEach(f=>{
            const input=document.getElementById(f);
            if(!input) return;
            const val=input.value.trim();
            if(val===''){emptyFields.push(f); allValid=false;}
            if(!input.classList.contains('valid')) allValid=false;
        });
        if(emptyFields.length>0) resultado.innerHTML=`❌ Preencha: ${emptyFields.join(', ')}`;
        else if(allValid) resultado.innerHTML="✅ Formulário validado com sucesso!";
        else resultado.innerHTML="❌ Corrija os campos inválidos.";
    });

    document.getElementById('limpar').addEventListener('click',()=>{
        form.reset();
        Object.keys(regexPatterns).forEach(f=>{
            const input=document.getElementById(f);
            const err=document.getElementById(`${f}-error`);
            if(input) input.classList.remove('valid','invalid');
            if(err) err.textContent='';
        });
        resultado.innerHTML='';
        document.getElementById('responsavel').style.display='none';
        document.getElementById('cnh').style.display='none';
        document.getElementById('categoriaCnh').style.display='none';
    });
});
