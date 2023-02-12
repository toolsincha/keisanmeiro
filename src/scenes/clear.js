import * as Phaser from "phaser";
import { global } from '@/js/global';

export class Clear extends Phaser.Scene {

  preload() {
    console.log("preload clear");
    this.objects = {};
    this.scene.setVisible(false);
  }

  create() {
    console.log("create clear");

    const game = this;
    const base_height = global.map.game_height / 2 - 20;
    const base_margin = 165;
    const btn_y = global.map.game_height / 2 + 120;
    const btn_scale = global.map.sprite.zoom * 0.8;
    const keisan_scene = this.scene.get("keisan");
    this.clear_audio = this.sound.add("clear_audio"); // ピョン

    this.objects.camera = this.cameras.add(0, 0);

    this.dialog_window = this.physics.add.image(global.map.game_width / 2, global.map.game_height / 2, "clear_box")
      .setDepth(2)
      .setInteractive()
      .setScale(0.3)
      .setAlpha(0);

    this.retry_btn = this.physics.add.image(global.map.game_width / 2 - 135 , btn_y, "retry")
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
          keisan_scene.retry();
          game.close();
        }, 100);
      });

    this.ok_btn = this.physics.add.image(global.map.game_width / 2 + 135, btn_y, "ok")
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
          game.scene.wake('title');
          game.scene.sleep('keisan');
          game.retry_btn.setAlpha(0);
          game.ok_btn.setAlpha(0);
          game.dialog_window.setAlpha(0).setScale(0.3);
          game.scene.sleep();
        }, 100);
      });

    this.next_btn = this.physics.add.image(global.map.game_width / 2 + 135, btn_y, "next")
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
          keisan_scene.restart(game.mode, game.level, game.stage);
          game.close();
        }, 100);
      });

    this.scene.sleep();
  }

  open(mode, level, stage) {
    this.clear_audio.play();
    this.mode = mode;
    this.level = level + 1;
    this.stage = stage;
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0.5)"); // 背景
    this.tweens.add({
      targets: this.dialog_window,
      scale: 0.62,
      duration: 150,
      alpha: 1,
      ease: "Backout.easeOut",
      callbackScope: this,
      onComplete: function () {
        this.retry_btn.setAlpha(1);

        if (level === 5) {
          this.ok_btn.setAlpha(1);
        } else {
          this.next_btn.setAlpha(1);
        }
      },
    });
  }

  close() {
    this.objects.camera.setBackgroundColor("rgba(0, 0, 0, 0)"); // 背景

    this.retry_btn.setAlpha(0);
    this.ok_btn.setAlpha(0);
    this.next_btn.setAlpha(0);

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