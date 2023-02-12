import * as Phaser from "phaser";
import { global } from '@/js/global';

export class Level extends Phaser.Scene {

  preload() {
    this.objects = {};
    this.scene.setVisible(false);
  }

  create() {
    this.scene.bringToTop();
    this.base_scene = "title";

    console.log("create level");
    const game = this;
    const keisan_scene = this.scene.get('keisan');
    const base_margin = 165;
    const base_height = global.map.game_height / 2 - 20 - base_margin * 2;
    const select_audio = this.sound.add("select_audio");

    this.objects.camera = this.cameras.add(0, 0);
    this.box = this.physics.add.image(global.map.game_width / 2, global.map.game_height / 2, "lv_box")
      .setDepth(1)
      .setScale(0.3)
      .setAlpha(0);

    // ボタントグル処理
    this.toggleBtn = function(alpha) {
      game.close_btn.setAlpha(alpha);
      game.lv_btns.forEach(btn => {
        btn.setAlpha(alpha);
      });
    }

    this.lv_btns = [];

    function keisan_start() {
      select_audio.play();
      game.scene.wake('keisan');
      game.toggleBtn(0);

      game.box
        .setScale(0.3)
        .setAlpha(0);

      game.scene.sleep();
    }

    this.close_btn = this.physics.add.image(global.map.game_width - 90, 190, "close")
    .setDepth(2)
    .setInteractive()
    .setScale(0.15)
    .setAlpha(0)
    .on("pointerdown", function () {
      this.setTint(0x999999);
    })
    .on("pointerout", function () {
      this.setTint(0xffffff);
    })
    .on("pointerup", function() {
      this.setTint(0xffffff);
      setTimeout(() => {
        game.close();
      }, 100);
    });

    for (let i = 0; i < 5; i++) {
      const btn = this.physics.add.image(global.map.game_width / 2, base_height + base_margin * i, `lv${i + 1}`)
      .setDepth(2)
      .setInteractive()
      .setScale(global.map.sprite.zoom)
      .setAlpha(0)
      .on("pointerdown", function () {
        this.setScale(global.map.sprite.zoom * 0.98).setTint(0x999999);
      })
      .on("pointerout", function () {
        this.setScale(global.map.sprite.zoom).setTint(0xffffff);
      })
      .on("pointerup", function() {
        this.setScale(global.map.sprite.zoom).setTint(0xffffff);
        setTimeout(() => {
          keisan_scene.restart(game.mode, i + 1, 1);
          keisan_start();
        }, 100);
      });

      this.lv_btns.push(btn);
    }

    this.scene.sleep();
  }

  open(base_scene) {
    this.base_scene = base_scene;
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0.5)"); // 背景
    this.tweens.add({
      targets: this.box,
      scale: 0.62,
      duration: 150,
      alpha: 1,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        this.toggleBtn(1);
      },
    });
  }

  close() {
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0)"); // 背景
    this.toggleBtn(0);

    this.tweens.add({
      targets: this.box,
      scale: 0.2,
      yoyo: false,
      duration: 150,
      alpha: 0,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        this.scene.sleep();
        this.scene.resume(this.base_scene);
      }
    });

  }
}