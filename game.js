class Navi extends AdventureScene {
    constructor() {
        super("navi", `Directions! Use this area to navigate throughout the mall.`);
    }
    preload() {
        this.load.image('mallsignmain', 'mallsign.png')
        this.load.image('spbdirect', 'directionsspb.png')
        this.load.image('furniture', 'furniturestore.png')
        this.load.image('exit', 'exitsign.png')
        this.load.image('fcsign', 'foodcourtsign.png')
    }
    onEnter() {
        this.add.sprite(this.w * 0.375, this.w * 0.275, 'mallsignmain').setScale(1.5)
        this.add.sprite(this.w * 0.485, this.w * 0.1343, 'spbdirect').setScale(1.50)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Shirts, Pants, and Beyond! The best clothing store in town')
            }) 
            .on('pointerdown', () => {
                this.gotoScene('clothes')
            })
        this.add.sprite(this.w * 0.2616, this.w * 0.169, 'furniture').setScale(1.50)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage(`Now That's What I Call Furniture! A primo place to buy some sweet new stuff.`)
            })
            .on('pointerdown', () => {
                this.gotoScene('furniture')
            })
        this.add.sprite(this.w* 0.426, this.w * 0.284, 'exit').setScale(1.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Leaving already?')
            })
            .on('pointerdown', () => {
                this.gotoScene('outro')
            })
        this.add.sprite(this.w*0.418, this.w* 0.193, 'fcsign').setScale(1.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('The Food Court! You HAVE to visit.')
            })
            .on('pointerdown', () => {
                this.gotoScene('fc')
            })
    }
}

class Furniture extends AdventureScene {
    constructor() {
        super("furniture", "Now That's What I Call Furniture!");
    }
    preload() {
        this.load.image('fstorebg', 'fstorebg.png')
        this.load.image('purptable', 'purptable.png')
        this.load.image('wardrobe', 'wardrobe.png')
        this.load.image('bluechair', 'bluechair.png')
        this.load.image('fstoreguy', 'furniturestoreguy.png')
    }
    onEnter() {
        this.add.sprite(this.w * 0.375, this.w * 0.375, 'fstorebg').setScale(3.4)
        this.add.sprite(this.w * 0.5, this.w * 0.4, 'purptable').setScale(0.4)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A beautiful handmade purple table for only 200$!')
            })
            .on('pointerdown', () => {
                this.buy('purple table', 200)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.65, this.w * 0.36, 'wardrobe').setScale(0.6)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('An antique wardrobe! 500$ for this, is it worth it?')
            })
            .on('pointerdown', () => {
                this.buy('wardrobe', 500)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.33, this.w * 0.38, 'bluechair').setScale(0.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A comfy blue chair for 300$')
            })
            .on('pointerdown', () => {
                this.buy('blue chair', 300)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.15, this.w * 0.38, 'fstoreguy').setScale(0.8)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Are you done shopping for furniture?')
            })
            .on('pointerdown', () => {
                this.showMessage('Thanks for visiting!')
                this.time.delayedCall(1500, this.gotoScene('navi'))
            })

        
    }
}
class FrontEntrance extends AdventureScene {
    constructor() {
        super("FE", "Midtown Mall Front Entrance");
    }
    preload() {
        this.load.image('entrance', 'mallentrance (1).png')
        this.load.image('mallsign', 'midtownmall.png')
        this.load.image('doors', 'mallentrancedoors.png')
        this.load.image('money', 'money.png')
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, 'yo mama').setFontSize(100)
        this.add.sprite(this.w * 0.4, this.w * 0.28, 'entrance').setScale(1.3)
        this.add.sprite(this.w * 0.4, this.w * 0.095, 'mallsign').setScale(0.5)
        this.add.sprite(this.w * 0.4, this.w * 0.345, 'doors').setScale(1.3)
            .setInteractive()
            .on('pointerover', () => {
                if (this.bankaccount > 0) {
                    this.showMessage('Enter the Mall!');
                } else {
                    this.showMessage(`You don't have any money. 
                    Maybe there's some around?`);   
                }
                })
            .on('pointerdown', () => {
                if (this.bankaccount > 0) {
                    this.gotoScene('navi');
                } else {
                    this.showMessage(`You don't have any money.
                    Maybe there's some around?`)
                }
                })
            let money = this.add.sprite(this.w * 0.5, this.w * 0.5, 'money').setScale(0.15)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Get some money.');
            })
            .on('pointerdown', () => {
                this.bankaccount = 1000,
                this.gainItem(this.bankaccount),
                this.tweens.add({
                targets: money,
                alpha: {from: 1, to: 0},
                duration: 500,
                onComplete: () => money.destroy()
                })
            })
            

    }
}
class FoodCourt extends AdventureScene {
    constructor() {
        super('fc')
    }
    preload() {
        this.load.image('fcbg', 'fcbg.png')
        this.load.image('pizzaheaven', 'pizzaheaven!.png')
        this.load.image('chickenshop', 'chickenshop.png')
        this.load.image('eggout', 'eggout.png')
        this.load.image('exitfc', 'exitfc.png')
    }
    onEnter() {
        this.add.sprite(this.w*0.077, this.w*0.6, 'fcbg').setScale(6)
        this.add.sprite(this.w*0.15, this.w*0.3, 'pizzaheaven').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Pizza Heaven! The cheesiest place around. Get a slice for just 5$!')
            })
            .on('pointerdown', () => {
                this.buy('slice of pizza', 5)
                this.updateInventory
            })
        this.add.sprite(this.w*0.4, this.w*0.3, 'chickenshop').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage(`Let's Chicken! A perfectly crips bite every time. A 6 piece meal is 10$`)
            })
            .on('pointerdown', () => {
                this.buy('6 piece meal', 10)
                this.updateInventory
            })
        this.add.sprite(this.w*0.6, this.w*0.3, 'eggout')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Egg Out! Open from 8-2 every day, an egg sandwich is 10$.')
            })
            .on('pointerdown', () => {
                this.buy('Egg Sandwich', 10)
                this.updateInventory
            })
        this.add.sprite(this.w*0.65, this.w*0.5, 'exitfc').setScale(0.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Do you want to leave the food court?')
            })
            .on('pointerdown', () => {
                this.showMessage('See you later!')
                this.time.delayedCall(1000, this.gotoScene('navi'))
            })
    }
}
class Clothing extends AdventureScene {
    constructor() {
        super('clothes')
    }
    preload() {
        this.load.image('cstorebg', 'cstorebg.png')
        this.load.image('cstoreguy', 'clothesstoreguy2.png')
        this.load.image('bluepants', 'bluepants.png')
        this.load.image('multicolorpants', '2cpants.png')
        this.load.image('whitepants', 'whitepants.png')
        this.load.image('blackpants', 'blackpants.png')
        this.load.image('blueshirt', 'blueshirt.png')
        this.load.image('greenshirt', 'greenshirt.png')
        this.load.image('redshirt', 'redshirt.png')
        this.load.image('yellowshirt', 'yellowshirt.png')
    }
    onEnter() {
        this.add.sprite(this.w * 0.35, this.w*0.4, 'cstorebg').setScale(3.7)
        this.add.sprite(this.w * 0.376, this.w*0.36, 'cstoreguy').setScale(1.2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Welcome to Shirts, Pants, and Beyond!')
            })
            .on('pointerdown', () => {
                this.showMessage('Thanks for coming in!')
                this.time.delayedCall(1000, this.gotoScene('navi'))
            })
        this.add.sprite(this.w * 0.25, this.w*0.15, 'bluepants').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A beautiful pair of blue pants for 50$')
            })
            .on('pointerdown', () => {
                this.buy('blue pants', 50)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.25, this.w*0.3, 'multicolorpants').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Some sweet multi colored pants! 75$')
            })
            .on('pointerdown', () => {
                this.buy('multi-colored pants', 75)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.35, this.w*0.148, 'whitepants').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage(`Clean white pants for 50$, don't get them dirty!`)
            })
            .on('pointerdown', () => {
                this.buy('white pants', 50)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.35, this.w*0.3, 'blackpants').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Some awesome black pants for 100$')
            })
            .on('pointerdown', () => {
                this.buy('black pants', 100)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.5, this.w*0.15, 'blueshirt').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A nice striped blue shirt for 50$')
            })
            .on('pointerdown', () => {
                this.buy('blue shirt', 50)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.495, this.w*0.3, 'greenshirt').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A happy green shirt for 50$!')
            })
            .on('pointerdown', () => {
                this.buy('green shirt', 50)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.665, this.w*0.15, 'redshirt').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A classic plain red shirt for 25$')
            })
            .on('pointerdown', () => {
                this.buy('red shirt', 25)
                this.updateInventory
            })
        this.add.sprite(this.w * 0.665, this.w*0.3, 'yellowshirt').setScale(0.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A striped yellow shirt for 50$. It reminds me of someone!')
            })
            .on('pointerdown', () => {
                this.buy('yellow shirt', 50)
                this.updateInventory
            })
    }
}
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload() {
        this.load.image('logo', 'E2Games.png')
    }
    create() {
        this.jimberly = this.add.text(525, 500, 'Click To Start').setFontSize(100)
        this.image = this.add.sprite(2500, 500, 'logo');
        this.input.once('pointerdown', () => {
            this.jimberly.destroy()
            this.tweens.add({
                targets: this.image,
                x: -500,
                y: 500,
                ease: 'Linear',
                duration: 3000
            })
            this.time.delayedCall(3000, () => this.cameras.main.fade(1000, 0,0,0));
            this.time.delayedCall(4000
                , () => this.scene.start('FE'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, FrontEntrance, Navi, Furniture, Clothing, FoodCourt, Outro],
    title: "Midtown Mall",
});

