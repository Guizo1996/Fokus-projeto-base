const btnAddNovaTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea=document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");

const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const btnLixeira = document.querySelector(".app__form-footer__button--delete");

const tarefaEmAndamento = document.querySelector(".app__section-active-task-description");

const limparTarefasconcluidas = document.querySelector("#btn-remover-concluidas");
const limparTodasTarefas = document.querySelector("#btn-remover-todas");

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] ;
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefa () {
localStorage.setItem("tarefas", JSON.stringify( tarefas));
}

function limparEmAndamento () {
    tarefaEmAndamento.innerHTML = "";
}

function criarElementoTarefa(tarefa){
const li = document.createElement("li");
li.classList.add( "app__section-task-list-item");
li.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    
    <p class="app__section-task-list-item-description">
        ${tarefa.descricao}
    </p>
    <button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>
`;

if (tarefa.completa){
    li.classList.add("app__section-task-list-item-complete")
    li.querySelector("button").setAttribute('disabled',true)

} else{
    li.onclick = () => {
        /* 
    Comportamnetos li.onclick: 
    clicar na tarefa  coloca ela "em andamento" 
    clicar na mesma  tarefa deseleciona e tira de "em andamento"
    clicar em outra tarefa deseleciona a anterior 
    */
        document.querySelectorAll(".app__section-task-list-item-active")
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })
    
        if ( tarefaSelecionada == tarefa){
            tarefaEmAndamento.textContent = "";
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        tarefaEmAndamento.textContent = tarefa.descricao;
        li.classList.add("app__section-task-list-item-active");
        
    }
    
}

const botaoEditar = li.querySelector(".app_button-edit");
// Muda o nome da tarefa
botaoEditar.onclick = () => {
    const novaDescricao = prompt( "Qual a nova tarefa?").trim();
    if (novaDescricao) {
        li.querySelector(".app__section-task-list-item-description").innerHTML = novaDescricao
        tarefa.descricao = novaDescricao;
        atualizarTarefa ();
    } else {
        return;
    }
}   

return li;
}

////
btnAddNovaTarefa.addEventListener("click", () => {
formAdicionarTarefa.classList.toggle("hidden");
})    

// Cancela a entrada de uma nova tarefa 
btnLixeira.onclick = () =>{
    textArea.value = "";
    formAdicionarTarefa.classList.add ("hidden");
    }
    
btnCancelar.onclick = () => {
        textArea.value = "";
    }
    

formAdicionarTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tarefa ={
        descricao:textArea.value,
    }

    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
   ulTarefas.append(elementoTarefa);
   atualizarTarefa ();
    textArea.value = "";
    formAdicionarTarefa.classList.add("hidden");

})

tarefas.forEach (tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa)
   ulTarefas.append(elementoTarefa) 

});

document.addEventListener('FocoFinalizado' , () => {
    if(tarefaSelecionada && liTarefaSelecionada ){
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active")
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete")
        liTarefaSelecionada.querySelector("button").setAttribute('disabled',true)
        tarefaSelecionada.completa = true;
        limparEmAndamento();

       atualizarTarefa();

    }
})

// limpar tarefas concluidas e todas as tarefas 
const seletorApp = ".app__section-task-list-item"

const removerTarefas = (completas) => {
    const seletor = completas ? `${seletorApp}-complete` : seletorApp
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    })
    tarefas = completas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefa()
}

limparTarefasconcluidas.onclick = () => removerTarefas(true)
limparTodasTarefas.onclick= () => removerTarefas(false)