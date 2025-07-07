# Fokus Pomodoro

## Descrição

Fokus é uma aplicação web que combina um **temporizador Pomodoro** com um **gerenciador de tarefas** leve, permitindo otimizar a produtividade através de ciclos de foco e pausas programadas.

## Funcionalidades

* **Temporizador Pomodoro** com três modos:

  * Foco (padrão: 15 minutos)
  * Descanso curto (padrão: 5 minutos)
  * Descanso longo (padrão: 15 minutos)
* **Controles** de iniciar, pausar e reiniciar o temporizador
* **Música de fundo** opcional, com toggle para ligar/desligar
* **Gerenciamento de tarefas**:

  * Adicionar novas tarefas
  * Marcar tarefa em andamento
  * Editar descrição de tarefas existentes
  * Marcar tarefas como concluídas automaticamente ao fim de um ciclo de foco
  * Limpar tarefas concluídas ou apagar todas as tarefas
* **Persistência** usando `localStorage`, mantendo estado de tarefas entre sessões

## Tecnologias

* **HTML5** (`index.html`)
* **CSS3** (`styles.css`)
* **JavaScript**:

  * `app/main.js`: lógica do temporizador e mudança de contexto (foco/pausa)
  * `app/script-crud.js`: CRUD de tarefas e integração com eventos de fim de ciclo


## Como Executar

1. Clone ou baixe este repositório:

   ```bash
   git clone https://github.com/seu-usuario/fokus-pomodoro.git
   ```
2. Navegue até a pasta do projeto:

   ```bash
   cd fokus-pomodoro
   ```
3. Abra o arquivo `index.html` em um navegador moderno (Chrome, Firefox, Edge).

> Não é necessário servidor local: tudo roda estático no navegador.

## Uso

1. Selecione o modo desejado (Foco, Descanso curto ou Descanso longo).
2. Clique em "Começar" para iniciar o countdown.
3. Durante o foco, selecione ou edite tarefas na lista.
4. Ao término de um ciclo de foco, a tarefa em andamento é marcada como concluída e você pode prosseguir.
5. Use o botão de música para ligar/desligar a trilha de fundo.
6. Limpe tarefas concluídas ou apague todas via o menu de opções.


## Autor

* **Guilherme Martins** — mantenha-o informado sobre sugestões e bugs.
