import * as Phaser from "phaser";
import { global } from '@/js/global';

export class Dialog extends Phaser.Scene {

  preload() {
    console.log("preload dialog");
    this.objects = {};
    this.scene.setVisible(false);
  }

  create() {
    console.log("create dialog");
    this.poti = this.sound.add("poti"); // マル

    const game = this;
    const base_height = global.map.game_height / 2 - 20;
    const base_margin = 165;

    const btn_y = global.map.game_height / 2 + 85;
    const btn_scale = global.map.sprite.zoom * 0.8;

    this.objects.camera = this.cameras.add(0, 0);


    this.dialog_window = this.physics.add.image(global.map.game_width / 2, global.map.game_height / 2, "dialog_window")
      .setDepth(2)
      .setInteractive()
      .setScale(0.3)
      .setAlpha(0);

    this.yes_btn = this.physics.add.image(global.map.game_width / 2 - 135 , btn_y, "yes")
    .setDepth(3)
    .setInteractive()
    .setScale(btn_scale)
    .setAlpha(0)
    .on("pointerdown", function () {
      this.setScale(btn_scale * 0.98).setTint(0x999999);
    })
    .on("pointerout", function () {
      this.setScale(btn_scale).setTint(0xffffff);
    })
    .on("pointerup", function() {
      this.setScale(btn_scale).setTint(0xffffff);
      setTimeout(() => {
        const keisan_scene = game.scene.get('keisan');
        game.scene.wake('title');
        game.scene.sleep('keisan');
        game.yes_btn.setAlpha(0);
        game.no_btn.setAlpha(0);
        game.dialog_window.setAlpha(0).setScale(0.3);
        game.scene.sleep();
      }, 100);
    });

    this.no_btn = this.physics.add.image(global.map.game_width / 2 + 135, btn_y, "no")
    .setDepth(3)
    .setInteractive()
    .setScale(btn_scale)
    .setAlpha(0)
    .on("pointerdown", function () {
      this.setScale(btn_scale * 0.98).setTint(0x999999);
    })
    .on("pointerout", function () {
      this.setScale(btn_scale).setTint(0xffffff);
    })
    .on("pointerup", function() {
      this.setScale(btn_scale).setTint(0xffffff);
      setTimeout(() => {
        game.close();
      }, 100);
    });

    this.scene.sleep();
  }

  open() {
    this.poti.play();
    this.scene.pause('keisan');
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0.5)"); // 背景
    this.tweens.add({
      targets: this.dialog_window,
      scale: 0.62,
      duration: 150,
      alpha: 1,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        this.yes_btn.setAlpha(1);
        this.no_btn.setAlpha(1);
      },
    });
  }

  close() {
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0)"); // 背景

    this.yes_btn.setAlpha(0);
    this.no_btn.setAlpha(0);

    this.tweens.add({
      targets: this.dialog_window,
      scale: 0.2,
      yoyo: false,
      duration: 150,
      alpha: 0,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        this.scene.resume('keisan');
      }
    });
  }
}