// 5. Slot Machine

// El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando.

class SlotMachine {
    constructor() {
        this.coins = 0;
    }

    play() {
        //  Insertamos moneda
        this.coins++;

        // Generamos tres booleanos aleatorios para las ruletas
        const roulette1 = Math.random() < 0.5;
        const roulette2 = Math.random() < 0.5;
        const roulette3 = Math.random() < 0.5;

        // Comprobamos si el usuario ha ganado (todas las ruletas son true)
        if (roulette1 && roulette2 && roulette3) {
            console.log(`Congratulations!!!. You won ${this.coins} coins!!`);
            // Reiniciamos el contador de monedas a 0
            this.coins = 0;
        } else {
            console.log('Good luck next time!!');
        }
    }
}

const machine1 = new SlotMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
