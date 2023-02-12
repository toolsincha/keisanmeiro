import * as Phaser from "phaser";
import { global } from '@/js/global';

export class Item extends Phaser.Scene {

  preload() {
    this.objects = {};
  }

  create() {
    console.log("item create");

    const item_height = 272;
    const item_margin = 25;
    const item_size = 120;

    this.frog = [];
    this.num_text = [];
    this.frog_cur = null;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        let num = (i + 1) + (j * 5);
        this.frog[num] = this.add.sprite(global.map.game_width / 2 - item_size * 2 + item_size * i, item_height + item_margin + item_size * j, `frog${num}`)
          .setScale(0.8)
          .setDepth(3)
          .setAlpha(0)
          .setInteractive();

        this.num_text[num] = this.add
          .text(global.map.game_width / 2 - item_size * 2 + item_size * i - 0, item_height + item_margin + item_size * j + 50, `×${i * j * 90}`, {
            font: `22px roboto-mono`,
            fill: "#000",
          })
          .setOrigin(0.5)
          .setAlpha(0)
          .setDepth(4);

        this.frog[num].on("pointerdown", () => {
          if (this.frog_cur) {
            this.frog_cur.frog.stopOnFrame(this.frog_cur.frog.anims.currentAnim.frames[0]);
          }

          let anim = this.anims.create({
            key: `frog${num}`,
            frames: this.anims.generateFrameNumbers(`frog${num}`, {
              start: 0,
              end: 3,
              first: 0,
            }),
            frameRate: 8,
            repeat: -1,
          });

          this.frog[num].play(anim, null, false, true);
          this.frog_cur = {frog: this.frog[num], anim, num};
        });
      }
    }

    this.objects.camera = this.cameras.add(0, 0);
    this.box = this.physics.add.image(global.map.game_width / 2, global.map.game_height / 2, "box")
      .setDepth(2)
      .setInteractive()
      .setScale(0.3)
      .setAlpha(0);

    this.button = this.physics.add.image(global.map.game_width / 2, 1015, "button")
      .setDepth(3)
      .setInteractive()
      .setScale(0.8)
      .setAlpha(0)
      .on("pointerdown", function () {
        this.setScale(0.7).setTint(0x999999);
      })
      .on("pointerout", function () {
        this.setScale(0.8).setTint(0xffffff);
      });
    this.button.on("pointerup", () => {
      this.button.setScale(0.8).setTint(0xffffff);

      setTimeout(() => {
        this.close();
      }, 100);
    });

    this.open();
  }

  open() {
    console.log("item open");

    const title = this.scene.get('title');

    if (title.isModal === false) {
      title.isModal = true;
      this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0.5)"); // 背景
      this.tweens.add({
        targets: this.box,
        scale: 0.65,
        duration: 150,
        alpha: 1,
        ease: "Backout.easeOut",
        callbackScope: this,
        onComplete: function () {
          this.button.setAlpha(1);
          for (let i = 0; i< 30; i++) {
            this.frog[i + 1].setAlpha(1);
            this.num_text[i + 1].setAlpha(1);
          }
        },
      });
    }

  }

  close() {
    const title = this.scene.get('title');
    const game = this;

    this.button.setAlpha(0);

    for (let i = 0; i< 30; i++) {
      this.frog[i + 1].setAlpha(0);
      this.num_text[i + 1].setAlpha(0);
    }

    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0)"); // 背景
    this.tweens.add({
      targets: this.box,
      scale: 0.2,
      yoyo: false,
      duration: 150,
      alpha: 0,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        title.isModal = false;
        game.scene.sleep("item");
      }
    });
  }
}