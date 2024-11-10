class Character {

    // Propriedades padrões de todos os bonecos.
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    // Todo boneco que eu criar tem que ser criado um nome.
    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life;
    } 

    set life(newLife){
        // Operador ternário: condional ? verdadeiro : falso
        return this._life = newLife < 0 ? 0 : newLife;
    }
}

class Hashira extends Character{
    constructor(name){
        // O super irá repassar o name para o constructor de "Character".
        super(name);
        // Características especificas dos Hashiras.
        this.life = 300;
        this.attack = 25;
        this.defense = 11;
        this.maxLife = this.life;
    }
}

class Slayer extends Character {
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 25;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class Demon extends Character {
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 12;
        this.defense = 5;
        this.maxLife = this.life;
    }
}

class MoonHigh extends Character{
    constructor(name){
        super(name);
        this.life = 150;
        this.attack = 24;
        this.defense = 13;
        this.maxLife = this.life;
    }
}

class Battle {
    constructor(playerOne, playerTwo, playerOneElement, playerTwoElement){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerOneElement = playerOneElement;
        this.playerTwoElement = playerTwoElement;
        this.battleInterval = null;
    }

    randomRound(){
        let attackDecision;

        this.battleInterval = setInterval(() =>{
            attackDecision = Math.random().toFixed(0);

            if(attackDecision == 0){
                this.attack(this.playerOne, this.playerTwo);
            }else{
                this.attack(this.playerTwo, this.playerOne);
            }
        },700);
    }

    start(){
        let log = document.querySelector('.info');
        let button = document.querySelector('.attackButton');
        console.log(button);
        // Chamo um método para atualizar a página com as informações mais atuais
        this.update();

        console.log(this.playerOne.maxLife);
        // Criando evento para os lutadores atacarem
        button.addEventListener('click', () => {
            if(!this.battleInterval){                
                button.textContent = "Batalhando";
                button.style.backgroundColor = "red";
                button.disabled = true;
                this.randomRound();
            }else{
                this.playerOne.life = this.playerOne.maxLife;
                this.playerTwo.life = this.playerTwo.maxLife;
                log.innerHTML = '';
                button.textContent = "Batalhando";
                button.style.backgroundColor = "red";
                button.disabled = true;
                this.randomRound();
            }            
        }); 
    }

    update(){
        // Lutador 1
        // Acesso e altero o conteudo do elemento do nome do jogador.
        this.playerOneElement.querySelector('.name strong').innerHTML = this.playerOne.name;
        // Crio uma variável para armazenar a vida do meu jogador.
        let playerOneHealth = (this.playerOne.life / this.playerOne.maxLife) * 100;
        // Acesso e altero o valor da propriedade do meu seletor com a vida do jogador em porcentagem.
        this.playerOneElement.querySelector('.bar').style.width = `${playerOneHealth}%`
        // Acesso e altero o conteúdo do meu elemento que exibe a vida do jogador.
        this.playerOneElement.querySelector('.health span').innerHTML = `${this.playerOne.life} HP`

        // Lutador 2
        this.playerTwoElement.querySelector('.name strong').innerHTML = this.playerTwo.name;
        let playerTwoHealth = (this.playerTwo.life / this.playerTwo.maxLife) * 100;
        this.playerTwoElement.querySelector('.bar').style.width = `${playerTwoHealth}%`
         this.playerTwoElement.querySelector('.health span').innerHTML = `${this.playerTwo.life} HP`
    }

    attack(attacking, attacked){
        let log = document.querySelector('.info');
        let li = document.createElement('li');
        let button = document.querySelector('.attackButton');

        if(attacked.life <= 0){
            li.textContent =  `${attacked.name} foi derrotado!`;
            log.appendChild(li);  
            button.textContent = "Batalhar";
            button.style.backgroundColor = "transparent";
            button.disabled = false;
            console.log(li.textContent);
            clearInterval(this.battleInterval);
        }else{
            let attackDamage = (Math.random() * attacking.attack).toFixed(2);

            if(attackDamage <= attacked.defense){
                li.textContent = `${attacked.name} defendeu!`
                log.appendChild(li);                
            }else{
                li.textContent = `${attacked.name} recebeu ${Math.floor(attackDamage)} de dano!`
                attacked.life -= Math.floor(attackDamage);
                log.appendChild(li);                
            }
            this.update();
            return this.randomRound;
        }
    }
}