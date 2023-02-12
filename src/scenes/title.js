import * as Phaser from "phaser";
import { global } from '@/js/global';

export class Title extends Phaser.Scene {

  preload() {
    this.objects = {};
  }

  create() {
    const game = this;
    const level_scene = this.scene.get('level');
    const select_audio = this.sound.add("select_audio");

    this.objects.camera = this.cameras.add(0, 0);
    this.objects.camera.setBackgroundColor("rgba(230, 230, 230, 1)"); // 背景

    // タイトル テキスト
    const title = this.add.sprite(global.map.game_width / 2, 170, "title");
    title
      .setScale(global.map.sprite.zoom * 0.6)
      .setDepth(1);

    // バージョン テキスト
    this.add
    .text(global.map.game_width / 2, global.map.game_height - (global.map.sprite.zoomsize * 0.25 + 10), __TITLE__, {
      font: `50px`,
      fill: "#000",
    })
    .setFontFamily("dongle")
    .setOrigin(0.5, 0.5)
    .setDepth(1);

    // タイトル カエルのアイコン
    const icon = this.add.sprite(global.map.game_width / 2, 320, "icon");
    icon
      .setScale(global.map.sprite.zoom)
      .setDepth(1)
      .setInteractive();
    icon.displayHeight = global.map.sprite.zoomsize * 1.5;
    icon.displayWidth = global.map.sprite.zoomsize * 1.5;

    // ボリュームボタン
    const volume_btn = this.add.sprite(global.map.game_width - global.map.sprite.zoomsize / 2, global.map.sprite.zoomsize / 2, "volume");
    volume_btn
      .setScale(global.map.sprite.zoom - 1)
      .setDepth(2)
      .setInteractive();
    volume_btn.displayHeight = global.map.sprite.zoomsize * 0.65;
    volume_btn.displayWidth = global.map.sprite.zoomsize * 0.65;

    let isMute = getMuteStorage();
    game.sound.mute = isMute;
    volume_btn.alpha = isMute ? 0.3 : 1;
    volume_btn.on("pointerdown", toggleMute);

    // ローカルストレージから isMute 取得
    function getMuteStorage() {
      let flg = localStorage.getItem("isMute");

      if (flg === null) {
        localStorage.setItem("isMute", 0);
      } else {
        flg = Boolean(parseInt(localStorage.getItem("isMute"), 10));
      }
      return flg;
    }

    // スピーカボタン処理
    function toggleMute() {
      if (isMute) {
        localStorage.setItem("isMute", 0);
        volume_btn.alpha = 1;
        isMute = false;
        game.sound.mute = isMute;
      } else {
        localStorage.setItem("isMute", 1);
        volume_btn.alpha = 0.3;
        isMute = true;
        game.sound.mute = isMute;
      }
    }

    const base_btn_y = 500;
    const base_btn_margin = 130;

    // モードボタン
    for (let i = 0; i < 6; i++) {

      if (global.mode[i] === "kudamono_plus" || global.mode[i] === "kudamono_kake") {
        this.add.image(global.map.game_width / 2 - 190, base_btn_y + base_btn_margin * i, "kudamono_icon1")
        .setDisplaySize(55, 55)
        .setDepth(4);
        this.add.image(global.map.game_width / 2 + 190, base_btn_y + base_btn_margin * i, "kudamono_icon1")
        .setDisplaySize(55, 55)
        .setDepth(4);
      }

      this.add.image(global.map.game_width / 2, base_btn_y + base_btn_margin * i, global.mode[i])
        .setScale(global.map.sprite.zoom)
        .setDepth(3)
        .setInteractive()
        .on("pointerdown", function () {
          this.setScale(global.map.sprite.zoom * 0.98).setTint(0x999999);
        })
        .on("pointerout", function () {
          this.setScale(global.map.sprite.zoom).setTint(0xffffff);
        })
        .on("pointerup", function() {
          this.setScale(global.map.sprite.zoom).setTint(0xffffff);
          setTimeout(() => {
            game.scene.pause("title");
            select_audio.play();
            level_scene.mode = global.mode[i];
            game.scene.wake("level");
            level_scene.open("title");
          }, 100);
        });
    }
  }
}