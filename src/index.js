import axios from "axios";

const searchCepBtn = document.getElementById('search-cep__button');
const searchCepInput = document.getElementById('search-cep');
const resultSearch = document.querySelector('.result-search');
const imgInitial = document.getElementById('search-img__inicio');
const imgNotFound = document.getElementById('not-found');
const validacaoInput = document.querySelector('.search-cep__erro ');
const btnBuscarText = document.getElementById('search-cep__button');
const loading = document.getElementById('loading');

const cepElements = {
    cep: document.getElementById('cep'),
    logradouro: document.getElementById('logradouro'),
    bairro: document.getElementById('bairro'),
    complemento: document.getElementById('complemento'),
    localidade: document.getElementById('localidade'),
    uf: document.getElementById('uf')
};

searchCepBtn.addEventListener("click", function() {
    btnBuscarText.style.display = 'none';
    loading.style.display = 'block';

    setTimeout(buscarCep, 1000);
});

searchCepInput.addEventListener("keypress", function(enter) {
    if(event.key === "Enter") {
        btnBuscarText.style.display = 'none';
        loading.style.display = 'block';

        setTimeout(buscarCep, 1000);
    }
});

searchCepInput.addEventListener('input', function() {
    const maxLength = 9; 
    validacaoInput.style.display = 'none';

    if (searchCepInput.value.length > maxLength) {
        searchCepInput.value = searchCepInput.value.slice(0, maxLength); 
    }
});

function buscarCep() {
    const cep = searchCepInput.value;
    
    const cepLimpo = cep.replace(/\s|-/g, '');

    const regex = /^[0-9]+$/;

    if(cepLimpo.length === 0 || !cepLimpo.match(regex)) {
        validacaoInput.style.display = 'block';
        limparResultado();
        return;
    }

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    axios.get(apiUrl)
        .then(function(response) {
            validacaoInput.style.display = 'none';
            limparResultado();

            if(!response.data.erro) {
                const resposta = response.data;
                
                cepElements.cep.innerHTML = resposta.cep;
                cepElements.logradouro.innerHTML = resposta.logradouro;
                cepElements.bairro.innerHTML = resposta.bairro;
                cepElements.complemento.innerHTML = resposta.complemento;
                cepElements.localidade.innerHTML = resposta.localidade;
                cepElements.uf.innerHTML = resposta.uf;
                
                resultSearch.style.display = 'block';
                imgInitial.style.display = 'none';
            } else {
                imgInitial.style.display = 'none';
                imgNotFound.style.display = 'block';
            }
        })
        .catch(function(error) {
            imgInitial.style.display = 'none';
            imgNotFound.style.display = 'block';
            limparResultado();
        })
        .finally(function() {
            loading.style.display = 'none';
            btnBuscarText.style.display = 'block';
        });
}

function limparResultado() {
    searchCepInput.style.borderColor = '';
    searchCepInput.placeholder = 'Digite o CEP';
    resultSearch.style.display = 'none';
    imgInitial.style.display = 'block';
    imgNotFound.style.display = 'none';
    loading.style.display = 'none';
    btnBuscarText.style.display = 'block';
}

searchCepInput.addEventListener("input", function() {
    if(searchCepInput.value === '') {
        limparResultado();
    }
});