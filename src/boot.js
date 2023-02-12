import * as Phaser from "phaser";
import { Title } from '@/scenes/title';
import { Keisan } from '@/scenes/keisan';
import { Clear } from '@/scenes/clear';
import { Level } from '@/scenes/level';
import { Dialog } from '@/scenes/dialog';
import { Loading } from '@/scenes/loading';

import Map from "@/js/map";
import { global } from '@/js/global';

export class Boot extends Phaser.Game {

  constructor() {
    const path = __PATH__;

    // サービスワーカー登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${path}sw.js`).then(function(registration) {
        //登録成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        //登録失敗
        console.log('ServiceWorker registration failed: ', err);
      });
    }

    const map = new Map();

    const config = {
      type: Phaser.AUTO,
      height: map.game_height,
      width:  map.game_width,
      zoom: .5,
      physics: {
        default: "arcade",
      },
      parent: "game-app",
      pixelArt: false,
    };

    super(config);

    global.map = map;

    // ウィンドウにフォーカス
    window.focus();

    // ウィンドウサイズに合わせてキャンバスをリサイズ
    resize();

    // リサイズイベントにresizeハンドラ登録
    window.addEventListener("resize", resize, false);

    // ウィンドウのリサイズ時の処理
    function resize() {
      // ウィンドウの縦横比に合わせてキャンバスサイズを変更する
      // ゲームの縦横比より横長なら横を短く、縦長なら縦を短く
      let canvas = document.querySelector("canvas");
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let windowRatio = windowWidth / windowHeight;
      let gameRatio = map.game_width / map.game_height;

      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = windowWidth / gameRatio + "px";
      } else {
        canvas.style.width = windowHeight * gameRatio + "px";
        canvas.style.height = windowHeight + "px";
      }
    }

    this.scene.add('loading', Loading);
    this.scene.add('title', Title);
    this.scene.add('level', Level);
    this.scene.add('keisan', Keisan);
    this.scene.add('dialog', Dialog);
    this.scene.add('clear', Clear);
  }

  on() {
    this.scene.start('loading');
    //this.scene.run('keisan')
  }
}