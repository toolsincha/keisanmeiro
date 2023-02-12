import { global } from '@/js/global';
import * as Phaser from "phaser";
import dongle from "@fonts/Dongle-Regular.ttf";

import box from "@imgs/box.png";
import ok from "@imgs/ok.png";

import icon from "@imgs/icon-512x512.png";
import title from "@imgs/title.png";

import volume_img from "@imgs/volume.png";

import lv_box from "@imgs/lv_box.png";
import lv1 from "@imgs/lvs1.png";
import lv2 from "@imgs/lvs2.png";
import lv3 from "@imgs/lvs3.png";
import lv4 from "@imgs/lvs4.png";
import lv5 from "@imgs/lvs5.png";

import basket from "@imgs/basket.png";

import kudamono_icon1 from "@imgs/kudamono_icon7.png";

import kudamono from "@imgs/kudamono.png";
import kudamono1 from "@imgs/kudamono1.png";
import kudamono2 from "@imgs/kudamono2.png";
import kudamono3 from "@imgs/kudamono3.png";
import kudamono4 from "@imgs/kudamono4.png";
import kudamono5 from "@imgs/kudamono5.png";

import plus from "@imgs/plus.png";
import plus1 from "@imgs/plus1.png";
import plus2 from "@imgs/plus2.png";
import plus3 from "@imgs/plus3.png";
import plus4 from "@imgs/plus4.png";
import plus5 from "@imgs/plus5.png";

import kake_wari from "@imgs/kake_wari.png";
import kake_wari1 from "@imgs/kake_wari1.png";
import kake_wari2 from "@imgs/kake_wari2.png";
import kake_wari3 from "@imgs/kake_wari3.png";
import kake_wari4 from "@imgs/kake_wari4.png";
import kake_wari5 from "@imgs/kake_wari5.png";

import plus_minus from "@imgs/plus_minus.png";
import plus_minus1 from "@imgs/plus_minus1.png";
import plus_minus2 from "@imgs/plus_minus2.png";
import plus_minus3 from "@imgs/plus_minus3.png";
import plus_minus4 from "@imgs/plus_minus4.png";
import plus_minus5 from "@imgs/plus_minus5.png";

import kake from "@imgs/kake.png";
import kake1 from "@imgs/kake1.png";
import kake2 from "@imgs/kake2.png";
import kake3 from "@imgs/kake3.png";
import kake4 from "@imgs/kake4.png";
import kake5 from "@imgs/kake5.png";

import close from "@imgs/close.png";

import dialog_window from "@imgs/dialog.png";
import yes from "@imgs/yes.png";
import no from "@imgs/no.png";

import clear_box from "@imgs/stg_clear.png";
import retry from "@imgs/retry.png";
import next from "@imgs/next.png";

import frog_img from "@imgs/frog.png";
import control_img from "@imgs/control.png";
import history_st_img from "@imgs/history_st.png";
import history_tn_img from "@imgs/history_tn.png";
import flag_img from "@imgs/flag.png";
import back_img from "@imgs/back.png";
import tilemap_img from "@imgs/tile.png";
import hasu_a from "@imgs/hasu_a.png";
import hasu_d from "@imgs/hasu_d.png";

import batu_audio from "@audio/batu.mp3";
import bom_audio from "@audio/bom.mp3";
import maru_audio from "@audio/maru.mp3";
import poti_audio from "@audio/poti.mp3";
import pyon_audio from "@audio/pyon.mp3";
import clear_audio from "@audio/clear.mp3";
import select_audio from "@audio/pon.mp3";
import mogi_audio from "@audio/mogi.mp3";

export class Loading extends Phaser.Scene {

  preload() {
    console.log("preload loading");

    function loadFont(name, url) {
      var newFont = new FontFace(name, `url(${url})`);
      newFont
        .load()
        .then(function (loaded) {
          console.log("font loaded")
          document.fonts.add(loaded);
        })
        .catch(function (error) {
          return error;
        });
    }

    loadFont("dongle", dongle);

    this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();

    var progressBar = new Phaser.Geom.Rectangle(global.map.game_width / 2 - 200, global.map.game_height / 2 - 50, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(global.map.game_width / 2 + 5 - 145, global.map.game_height / 2 + 5 - 50, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		this.loadingText = this.add.text(global.map.game_width / 2, global.map.game_height / 2 + 30,"Loading: ", { fontSize: '32px', fill: '#FFF' })
    .setOrigin(0.5, 0.5);


    this.load.image("icon", icon);
    this.load.image("title", title);
    this.load.image("volume", volume_img);

    this.load.image("lv_box", lv_box);
    this.load.image("lv1", lv1);
    this.load.image("lv2", lv2);
    this.load.image("lv3", lv3);
    this.load.image("lv4", lv4);
    this.load.image("lv5", lv5);
    this.load.image("close", close);

    this.load.image("box", box);
    this.load.image("ok", ok);

    this.load.image("basket", basket);
    this.load.image("kudamono_icon1", kudamono_icon1);

    this.load.image("kudamono", kudamono);
    this.load.image("kudamono1", kudamono1);
    this.load.image("kudamono2", kudamono2);
    this.load.image("kudamono3", kudamono3);
    this.load.image("kudamono4", kudamono4);
    this.load.image("kudamono5", kudamono5);

    this.load.image("kudamono_plus", plus);
    this.load.image("kudamono_plus1", plus1);
    this.load.image("kudamono_plus2", plus2);
    this.load.image("kudamono_plus3", plus3);
    this.load.image("kudamono_plus4", plus4);
    this.load.image("kudamono_plus5", plus5);

    this.load.image("kudamono_kake", kake);
    this.load.image("kudamono_kake1", kake1);
    this.load.image("kudamono_kake2", kake2);
    this.load.image("kudamono_kake3", kake3);
    this.load.image("kudamono_kake4", kake4);
    this.load.image("kudamono_kake5", kake5);

    this.load.image("plus", plus);
    this.load.image("plus1", plus1);
    this.load.image("plus2", plus2);
    this.load.image("plus3", plus3);
    this.load.image("plus4", plus4);
    this.load.image("plus5", plus5);

    this.load.image("kake", kake);
    this.load.image("kake1", kake1);
    this.load.image("kake2", kake2);
    this.load.image("kake3", kake3);
    this.load.image("kake4", kake4);
    this.load.image("kake5", kake5);

    this.load.image("plus_minus", plus_minus);
    this.load.image("plus_minus1", plus_minus1);
    this.load.image("plus_minus2", plus_minus2);
    this.load.image("plus_minus3", plus_minus3);
    this.load.image("plus_minus4", plus_minus4);
    this.load.image("plus_minus5", plus_minus5);

    this.load.image("kake_wari", kake_wari);
    this.load.image("kake_wari1", kake_wari1);
    this.load.image("kake_wari2", kake_wari2);
    this.load.image("kake_wari3", kake_wari3);
    this.load.image("kake_wari4", kake_wari4);
    this.load.image("kake_wari5", kake_wari5);

    this.load.image("dialog_window", dialog_window);
    this.load.image("yes", yes);
    this.load.image("no", no);

    this.load.image("retry", retry);
    this.load.image("next", next);
    this.load.image("clear_box", clear_box);

    this.load.image("history_st", history_st_img);
    this.load.image("history_tn", history_tn_img);
    this.load.image("tile", tilemap_img);
    this.load.image("hata", flag_img);
    this.load.image("back", back_img);
    this.load.image("control", control_img);
    this.load.image("hasu_a", hasu_a);
    this.load.image("hasu_d", hasu_d);

    this.load.spritesheet("player", frog_img, {
      frameWidth: 18*6,
      frameHeight: 18*6,
      endFrame: 16,
    });

    this.load.audio("bom", bom_audio);
    this.load.audio("mogi", mogi_audio);
    this.load.audio("maru", maru_audio);
    this.load.audio("batu", batu_audio);
    this.load.audio("pyon", pyon_audio);
    this.load.audio("poti", poti_audio);
    this.load.audio("clear_audio", clear_audio);
    this.load.audio("select_audio", select_audio);

    this.load.on('progress', this.updateBar.bind(this));
    this.load.on('complete', this.complete.bind(this));
  }

  create() {
    console.log("1 create");
    setTimeout(() => {
      this.scene.launch("title");
      this.scene.launch("keisan");
      this.scene.launch("level");
      this.scene.launch("dialog");
      this.scene.launch("clear");
      this.scene.remove();
    }, 500);
  }

  updateBar(percentage) {
    console.log(percentage);


    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(global.map.game_width / 2 + 5 - 200, global.map.game_height / 2 + 5 - 50, percentage*390, 40));
    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");

    if (percentage >= 100) {
      console.log("2 100 per");
    }
  }

  complete() {
    console.log("3 complate");
  }



}