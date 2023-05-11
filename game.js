class Navi extends AdventureScene {
    constructor() {
        super("navi", `Directions! Use this area to navigate throughout the mall.`);
    }
    preload() {
        this.load.image('mallsignmain', 'mallsign.png')
        this.load.image('spbdirect', 'directionsspb.png')
    }
    onEnter() {
        this.add.sprite(this.w * 0.375, this.w * 0.275, 'mallsignmain').setScale(2)
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('navi');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => 
            this.gotoScene('outro'));
    }
}
class SPB extends AdventureScene {
    constructor() {
        super("spb", "Shirts, Pants, and Beyond");
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
                if (this.hasItem('money')) {
                    this.showMessage('Enter the Mall!');
                } else {
                    this.showMessage(`You don't have any money. 
                    Maybe there's some around?`);   
                }
                })
            .on('pointerdown', () => {
                if (this.hasItem('money')) {
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
                this.gainItem('money'),
                this.tweens.add({
                targets: money,
                alpha: {from: 1, to: 0},
                duration: 500,
                onComplete: () => money.destroy()
                })
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
            this.time.delayedCall(1, () => this.scene.start('spb'));
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
    scene: [Intro, SPB, Navi, Demo2, Outro],
    title: "Adventure Game",
});

