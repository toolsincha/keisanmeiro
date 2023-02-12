import * as Phaser from "phaser";
import("@scss/app");
import _ from "lodash";
import Algorithm from "@/js/algorithm";
import { global } from '@/js/global';
import stage_config from "@config/stage";

export class Keisan extends Phaser.Scene {
  preload() {
    console.log("preload keisan");

    this.objects = {};
    this.stage = 1;
    this.level = 1;
    this.mode = "init";

    this.scene.setVisible(false);
  }

  create() {
    console.log("create keisan");

    // アニメーション生成
    function create_player_animation() {
      game.anims.create({
        key: "left",
        frames: game.anims.generateFrameNumbers("player", {
          start: 4,
          end: 7,
          first: 4,
        }),
        frameRate: 8,
        repeat: -1,
      });

      game.anims.create({
        key: "right",
        frames: game.anims.generateFrameNumbers("player", {
          start: 8,
          end: 11,
          first: 8,
        }),
        frameRate: 8,
        repeat: -1,
      });

      game.anims.create({
        key: "down",
        frames: game.anims.generateFrameNumbers("player", {
          start: 0,
          end: 3,
          first: 0,
        }),
        frameRate: 8,
        repeat: -1,
      });

      game.anims.create({
        key: "up",
        frames: game.anims.generateFrameNumbers("player", {
          start: 12,
          end: 15,
          first: 12,
        }),
        frameRate: 8,
        repeat: -1,
      });
    }
    // くだもの初期化
    function init_kudamono() {
      const data = [...Array(global.map.map_size.y)].map(() => Array(global.map.map_size.x).fill(0));
      meiro.map.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          data[y][x] = create_kudamono({ y, x }, xrow);
        });
      });

      return data;
    }

    function create_kudamono(target, row) {
      const text_vector = vector2(target);
      const target_x = text_vector.x + global.map.game_erea.x;
      const target_y = text_vector.y + global.map.game_erea.y;
      const data = [];

      for (let i = 0; i < 9; i++) {
        data.push(create_kudamono_image(target_x, target_y, i + 1));
      }

      return data;
    }

    function create_kudamono_image(target_x, target_y, num) {
      const ringo_size_s = 30;
      const ringo_size_m = 36;
      const ringo_size_l = 48;
      const ringo_depth = 3;
      const ringo_key_name = "kudamono_icon1";

      let group = game.add.group();

      let data1, data2, data3, data4, data5, data6, data7, data8, data9;

      switch(num) {
        case 1:
          data1 = game.add.image(target_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_l, ringo_size_l);
          group.add(data1);
          break;
        case 2:
          data1 = game.add.image(target_x, target_y - 20, ringo_key_name)
            .setDisplaySize(ringo_size_l, ringo_size_l);
          data2 = game.add.image(target_x, target_y + 20, ringo_key_name)
            .setDisplaySize(ringo_size_l, ringo_size_l);
          group.addMultiple([data1, data2]);
          break;
        case 3:
          data1 = game.add.image(target_x - 18, target_y - 20, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data2 = game.add.image(target_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data3 = game.add.image(target_x + 18, target_y + 20, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          group.addMultiple([data1, data2, data3]);
          break;
        case 4:
          data1 = game.add.image(target_x - 15, target_y - 15, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data2 = game.add.image(target_x + 15, target_y - 15, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data3 = game.add.image(target_x - 15, target_y + 15, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data4 = game.add.image(target_x + 15, target_y + 15, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          group.addMultiple([data1, data2, data3, data4]);
          break;
        case 5:
          const ringo_margin_5_x = 18;
          const ringo_margin_5_y = 20;
          data1 = game.add.image(target_x - ringo_margin_5_x, target_y - ringo_margin_5_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data2 = game.add.image(target_x + ringo_margin_5_x, target_y - ringo_margin_5_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data3 = game.add.image(target_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data4 = game.add.image(target_x - ringo_margin_5_x, target_y + ringo_margin_5_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data5 = game.add.image(target_x + ringo_margin_5_x, target_y + ringo_margin_5_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          group.addMultiple([data1, data2, data3, data4, data5]);
          break;
        case 6:
          const ringo_margin_6_x = 15;
          data1 = game.add.image(target_x - ringo_margin_6_x, target_y - 30, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data2 = game.add.image(target_x + ringo_margin_6_x, target_y - 30, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data3 = game.add.image(target_x -ringo_margin_6_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data4 = game.add.image(target_x +ringo_margin_6_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data5 = game.add.image(target_x - ringo_margin_6_x, target_y + 30, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          data6 = game.add.image(target_x + ringo_margin_6_x, target_y + 30, ringo_key_name)
            .setDisplaySize(ringo_size_m, ringo_size_m);
          group.addMultiple([data1, data2, data3, data4, data5, data6]);
          break;
        case 7:
          data1 = game.add.image(target_x - 12, target_y + 10, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data2 = game.add.image(target_x + 12, target_y + 10, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data3 = game.add.image(target_x - 12, target_y + 34, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data4 = game.add.image(target_x + 12, target_y + 34, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data5 = game.add.image(target_x - 22, target_y - 30, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data6 = game.add.image(target_x, target_y - 20, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data7 = game.add.image(target_x + 22, target_y - 10, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          group.addMultiple([data1, data2, data3, data4, data5, data6, data7]);
          break;
        case 8:
          const ringo_margin_8_x = 13;
          const ringo_margin_8_y = 12;

          data1 = game.add.image(target_x - ringo_margin_8_x, target_y - ringo_margin_8_y * 3, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data2 = game.add.image(target_x + ringo_margin_8_x, target_y - ringo_margin_8_y * 3, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data3 = game.add.image(target_x - ringo_margin_8_x, target_y - ringo_margin_8_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data4 = game.add.image(target_x + ringo_margin_8_x, target_y - ringo_margin_8_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data5 = game.add.image(target_x - ringo_margin_8_x, target_y + ringo_margin_8_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data6 = game.add.image(target_x + ringo_margin_8_x, target_y + ringo_margin_8_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data7 = game.add.image(target_x - ringo_margin_8_x, target_y + ringo_margin_8_y * 3, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data8 = game.add.image(target_x + ringo_margin_8_x, target_y + ringo_margin_8_y * 3, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          group.addMultiple([data1, data2, data3, data4, data5, data6, data7, data8]);
          break;
        case 9:
          const ringo_margin_9_x = 26;
          const ringo_margin_9_y = 26;

          data1 = game.add.image(target_x - ringo_margin_9_x, target_y - ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data2 = game.add.image(target_x, target_y - ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data3 = game.add.image(target_x + ringo_margin_9_x, target_y - ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data4 = game.add.image(target_x -ringo_margin_9_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data5 = game.add.image(target_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data6 = game.add.image(target_x +ringo_margin_9_x, target_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data7 = game.add.image(target_x - ringo_margin_9_x, target_y + ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data8 = game.add.image(target_x, target_y + ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          data9 = game.add.image(target_x + ringo_margin_9_x, target_y + ringo_margin_9_y, ringo_key_name)
            .setDisplaySize(ringo_size_s, ringo_size_s);
          group.addMultiple([data1, data2, data3, data4, data5, data6, data7, data8, data9]);
          break;
        }

      group
        .setActive(true)
        .setVisible(true)
        .setDepth(ringo_depth);

      return group;
    }

    // 数字テキスト初期化
    function init_text() {
      const data = [...Array(global.map.map_size.y)].map(() => Array(global.map.map_size.x).fill(0));
      meiro.map.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          data[y][x] = create_text({ y, x }, xrow);
        });
      });

      return data;
    }

    // 数字テキスト生成
    function create_text(target, num) {
      const f_text = format_text(num, checkGoal(target));
      const style = {
        font: `76px`,
        fill: "#fff",
      };

      const text_vector = vector2(target);
      const text = game.add
        .text(text_vector.x + global.map.game_erea.x, text_vector.y + global.map.game_erea.y, f_text, style)
        .setFontFamily("dongle")
        .setOrigin(0.5, 0.5)
        .setStroke("rgba(32,32,32, 1)", 7)
        .setDepth(3);

      if (num === 0 || num === null) {
        text.visible = false;
        text.active = false;
      }

      return text;
    }

    // 数字フォーマット
    function format_text(num, isGoal) {
      let str = num;

      if (!isGoal) {
        if (num === "0") {
          str = "";
        } else if (num && num.indexOf("*") !== -1) {
          str = str.replace("*", "×");
        } else if (num && num.indexOf("/") !== -1) {
          str = str.replace("/", "÷");
        }
      }

      return str;
    }

    function checkGoal(target) {
      return (target.y === meiro.config.end_point.y && target.x === meiro.config.end_point.x);
    }


    // 数字テキスト リセット
    function reset_text(text_data, k_data, isKudamono) {
      meiro.map.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          const text = text_data[y][x];
          const kudamonos = k_data[y][x];
          const isGoal = checkGoal({y, x});

          // 全てのアイコンをまず非表示にする
          text.visible = false;
          text.active = false;

          kudamonos.forEach(kudamono => {
            kudamono.setActive(false);
            kudamono.setVisible(false);
            kudamono.setAlpha(1);
          });

          if (xrow !== null) {
            if (!isKudamono  || isGoal) {
              text.setText(format_text(xrow, isGoal));
              text.visible = true;
              text.active = true;
            } else if (isKudamono && xrow !== "0") {
              const num = Number(xrow);
              kudamonos[num - 1].setActive(true);
              kudamonos[num - 1].setVisible(true);
            }
          }
        });
      });
    }

    // 軌跡タイルの方向を取得
    function getDirectionTile(pre, cur, next) {
      let angle = 0,
        target = "st";

      // 現在のタイルと次のタイルのY軸の変化
      const isDiffYbaseToNext = next.y - cur.y === 0;

      // 二つ前の履歴があれば、次のタイルと前のタイルから、軌跡を決める
      if (pre) {
        const diffY = next.y - pre.y;
        const diffX = next.x - pre.x;

        if (diffY === 0 || diffX === 0) {
          target = "st";
          angle = diffY === 0 ? 90 : 0;
        } else {
          target = "tn";
          if (diffY > 0 && diffX > 0) {
            angle = isDiffYbaseToNext ? 0 : 180;
          } else if (diffY > 0 && diffX < 0) {
            angle = isDiffYbaseToNext ? 270 : 90;
          } else if (diffY < 0 && diffX > 0) {
            angle = isDiffYbaseToNext ? 90 : 270;
          } else {
            angle = isDiffYbaseToNext ? 180 : 0;
          }
        }
        // 二つ前がなければ、次のタイルと一つ前のタイルから、軌跡を決める
      } else {
        // 元画像が縦なので、y軸の変化がない場合は、x軸の変化なので、画像を横にする
        if (isDiffYbaseToNext) {
          angle = 90;
          target = "st";
        }
      }

      return { target, angle };
    }

    // タイル初期化
    function tile_init(tilemap) {
      const data = _.cloneDeep(tilemap);

      tilemap.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          data[y][x] = global.map.sprite.mapping[xrow];
        });
      });

      return data;
    }

    // 軌跡初期化
    function init_route(t) {
      const data = _.cloneDeep(t);
      t.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          const vector = vector2({ y, x });
          const st = game.add.image(vector.x + global.map.game_erea.x, vector.y + global.map.game_erea.y, "history_st");
          st.setScale(global.map.sprite.zoom).setDepth(1).setInteractive();
          st.visible = false;
          st.alpha = 0.7;
          const tn = game.add.image(vector.x + global.map.game_erea.x, vector.y + global.map.game_erea.y, "history_tn");
          tn.setScale(global.map.sprite.zoom).setDepth(1).setInteractive();
          tn.visible = false;
          tn.alpha = 0.7;
          data[y][x] = { st, tn };
        });
      });

      return data;
    }

    // 軌跡リセット
    function reset_route() {
      route_data.forEach((yrow, y) => {
        yrow.forEach((xrow, x) => {
          if (xrow) {
            xrow.st.visible = false;
            xrow.st.angle = 0;
            xrow.st.alpha = 0.7;
            xrow.tn.visible = false;
            xrow.tn.angle = 0;
            xrow.tn.alpha = 0.7;
          }
        });
      });
    };

    // vectorXY マッピング タイルマップ 座標から ピクセルに変換する
    function vector2(target) {
      return {
        x: global.map.sprite.zoomsize * (0.5 + target.x),
        y: global.map.sprite.zoomsize * (0.5 + target.y),
      };
    }

    // x, y 座標分進めた、タイルを取得する
    function getTileXY(target, x, y) {
      const tile = game.clayer.getTileAtWorldXY(target.x, target.y, true);
      let next_tile;

      if (tile) {
        const v = vector2({ x: tile.x + x, y: tile.y + y });
        next_tile = game.clayer.getTileAtWorldXY(v.x + global.map.game_erea.x, v.y + +global.map.game_erea.y, true);
      }

      return next_tile;
    }

    function goal_animation(flg) {
      if (flg) {
        maru.play();
        success(game.stage === game.stage_count);
      } else {
        batu.play();
        failure();
      }
    }

    function player_move(direction) {
      let x, y;
      switch (direction) {
        case "left":
          x = -1;
          y = 0;
          break;
        case "right":
          x = 1;
          y = 0;
          break;
        case "up":
          x = 0;
          y = -1;
          break;
        case "down":
          x = 0;
          y = 1;
          break;
      }

      player.play(direction);
      const result = move(getTileXY(player, x, y), x, y);

      if (result.isSuceses !== null) {
        goal_animation(result.isSuceses);
      } else {
        if (result.isMove) {
          pyon.play();
        } else {
          bom.play();
        }
      }
    }

    function left() {
      player_move("left");
    }

    function right() {
      player_move("right");
    }

    function up() {
      player_move("up");
    }
    function down() {
      player_move("down");
    }

    function create_tilemap(td) {
      // 既に存在する場合は削除
      if (game.cmap) {
        game.cmap.destroy();
      }

      // タイルマップ
      const map = game.make.tilemap({
        data: td,
        tileWidth: global.map.sprite.size,
        tileHeight: global.map.sprite.size,
        key: "tile",
      });
      const tiles = map.addTilesetImage("tile");
      const layer = map.createLayer(0, tiles, global.map.game_erea.x, global.map.game_erea.y);
      layer.setScale(global.map.sprite.zoom).setDepth(0);

      game.cmap = map;
      game.clayer = layer;
    }

    function get_player_start(point) {
      const player_start = vector2(meiro.config.start_player_point);
      const player_start_XY = {
        x: player_start.x + global.map.game_erea.x,
        y: player_start.y + global.map.game_erea.y,
      };
      const player_start_tile = game.clayer.getTileAtWorldXY(player_start_XY.x, player_start_XY.y, true);

      return {player_start, player_start_XY, player_start_tile}
    }

    function get_player_end(point) {
      const player_end = vector2(point);
      const player_end_XY = {
        x: player_end.x + global.map.game_erea.x,
        y: player_end.y + global.map.game_erea.y,
      };
      const player_end_tile = game.clayer.getTileAtWorldXY(player_end_XY.x, player_end_XY.y, true);

      return { x: player_end_XY.x - 3, y: player_end_XY.y + 19 };
    }

    function create_stg() {
      const stage_item = {
        "icon": [],
        "icon_d": [],
        "text": []
      };

      for (let i = 0; i < 7; i++) {
        stage_item.icon_d.push(create_stage_icon(i, false));
        stage_item.icon.push(create_stage_icon(i, true));
        stage_item.text.push(create_stage_text(i, (game.stage - 1 > i), (game.stage - 1 === i)));
      }

      return stage_item;
    }

    function reset_stage_icon(data, stg) {
      for (let i = 0; i < 7; i++) {
        if (game.stage_count < i + 1) {
          data.icon[i].setAlpha(0);
          data.icon_d[i].setAlpha(0);
          data.text[i].setAlpha(0);
        } else {
          data.icon[i].setAlpha(1);
          data.icon_d[i].setAlpha(1);
          data.text[i].setAlpha(1);
        }

        let isVisible = (i < stg - 1) ? 1 : 0;
        data.icon[i].setAlpha(isVisible);
      }
    }

    function change_stage_icon(data, stg) {

      data.icon[stg - 2].setAlpha(1);

      game.tweens.add({
        targets: data.icon[stg - 2],
        duration: 200,
        ease: "Cubic",
        scale: 1.3,
        yoyo: true,
        callbackScope: this,
        onComplete: function () {},
      });

    }

    function change_stage_text(data, stg) {
      for (let i = 0; i < 7; i++) {
        let color = (i > stg - 1) ? 0xaaaaaa : 0xffffff;
        data.text[i].setTint(color);
      }
    }

    function create_stage_text(i, is_active, is_target) {
      const style = {
        font: `50px`,
        fill: (is_active || is_target) ? '#fff' : '#fff',
      };

      const size = global.map.sprite.zoomsize - 0;
      const stg_text = game.add
      .text(size / 2 + size * (i + 0), size + 10, i + 1, style)
      .setFontFamily("dongle")
      .setOrigin(0.5, 0.5)
      .setStroke("rgba(32,32,32, 0.6)", 6)
      .setDepth(4).setTint(0x000000);

      if (is_active || is_target) {
        stg_text.setTint(0xffffff);
      } else {
        stg_text.setTint(0xaaaaaa);
      }

      return stg_text;
    }

    function create_stage_icon(i, is_active) {
      const size = global.map.sprite.zoomsize - 0;
      const icon_name = is_active ? 'hasu_a' : 'hasu_d';
      const icon_depth = is_active ? 3 : 2;

      // stage icon
      const stg_icon = game.add.sprite(size / 2 + size * (i + 0), size + 10, icon_name);
      stg_icon
        .setScale(1)
        .setDepth(icon_depth)
        .setInteractive();

      if (is_active) {
        stg_icon.setAlpha(0);
      }

      return stg_icon;
    }

    function stage_up() {
      if (game.stage < 7) {
        game.stage++;
      }
    }

    function calc_sum(s) {
      const tmp = s.concat();
      let sum_tmp = 0;
      const first = Number(tmp.shift());
      sum_tmp = first;

      tmp.forEach((d) => {
        if (d !== "0") {
          sum_tmp = Function("return (" + String(sum_tmp) + d + ");")();
        }
      });

      if (Number.isNaN(sum_tmp)) {
        sum_tmp = 0;
      }

      return sum_tmp;
    }

    // プレイヤーの移動処理
    function move(next_tile, nx, ny) {
      let isSuceses = null; // null: ゴールじゃない true: 正解 false: 不正解
      let isMove = true;
      let num_tmp, num_tmp_cast;

      const tile = game.clayer.getTileAtWorldXY(player.x, player.y, true);
      const pre_tile = history[history.length - 2];
      const before_tile = history[history.length - 1];
      const next_route = next_tile && route_data[next_tile.y] && route_data[next_tile.y][next_tile.x];

      // 移動可能タイル
      if (
        next_route &&
        next_tile &&
        next_tile.index === global.map.sprite.mapping["sky"] &&
        !next_route.st.visible &&
        !next_route.tn.visible
      ) {
        // 軌跡描画
        const base_route = route_data[tile.y][tile.x];
        const direction_tile = getDirectionTile(pre_tile, tile, next_tile);
        base_route[direction_tile.target].angle = direction_tile.angle;
        base_route[direction_tile.target].visible = true;

        // プレイヤー移動
        const move_vector = vector2(next_tile);
        player.x = move_vector.x + global.map.game_erea.x;
        player.y = move_vector.y + global.map.game_erea.y;

        if (game.kudamono) {
          basket.x = move_vector.x + global.map.game_erea.x - (nx * game.basket_diff);
          basket.y = move_vector.y + global.map.game_erea.y - (ny * game.basket_diff);
          basket_text.x = move_vector.x + global.map.game_erea.x - (nx * game.basket_diff);
          basket_text.y = move_vector.y + global.map.game_erea.y - (ny * game.basket_diff);
        }

        // 合計に加算
        if (!(meiro.config.end_point.y === next_tile.y && meiro.config.end_point.x === next_tile.x)) {
          num_tmp = meiro.map[next_tile.y][next_tile.x];

          sum.push(num_tmp);
          basket_text.setText(calc_sum(sum));

          if (game.kudamono && num_tmp !== "0") {
            num_tmp_cast = Number(num_tmp);
            let target_kudamono = kudamono_data[next_tile.y][next_tile.x][num_tmp_cast - 1];
            target_kudamono.setActive(false);
            target_kudamono.setAlpha(0.3);
            mogi.play();
          }
        }

        // 履歴に追加
        history.push(next_tile);

        // ゴール判定
        if (meiro.config.end_player_point.y === next_tile.y && meiro.config.end_player_point.x === next_tile.x) {
          const cs = calc_sum(sum);
          isSuceses = cs === meiro.map[next_tile.y][next_tile.x];
        }

        // 緑色のタイルの場合は、直近の場合は戻れる
      } else if (
        next_tile &&
        next_route &&
        (next_route.st.visible || next_route.tn.visible) &&
        pre_tile.x === next_tile.x &&
        pre_tile.y === next_tile.y
      ) {
        // 元のタイルは軌跡を消す
        next_route.st.visible = false;
        next_route.tn.visible = false;
        next_route.st.angle = 0;
        next_route.tn.angle = 0;

        // プレイヤー移動
        const move_vector = vector2(next_tile);
        player.x = move_vector.x + global.map.game_erea.x;
        player.y = move_vector.y + global.map.game_erea.y;

        if (game.kudamono) {
          basket.x = move_vector.x + global.map.game_erea.x - (nx * game.basket_diff);
          basket.y = move_vector.y + global.map.game_erea.y - (ny * game.basket_diff);
          basket_text.x = move_vector.x + global.map.game_erea.x - (nx * game.basket_diff);
          basket_text.y = move_vector.y + global.map.game_erea.y - (ny * game.basket_diff);
        }

        // 合計に減算
        if (!(meiro.config.end_point.y === tile.y && meiro.config.end_point.x === tile.x)) {
          num_tmp = sum.pop();

          if (game.kudamono && num_tmp !== "0") {
            basket_text.setText(calc_sum(sum));
            num_tmp_cast = Number(num_tmp);
            let target_kudamono = kudamono_data[tile.y][tile.x][num_tmp_cast - 1];
            target_kudamono.setActive(true);
            target_kudamono.setAlpha(1);
          }
        }

        // 履歴から削除
        history.pop();
      } else {
        isMove = false;
      }

      return { isSuceses, isMove };
    }

    // リスタート
    function restart(mode, level, stage, clear = false) {
      // コントロールを止める
      disableEvent();

      game.mode = mode;
      game.level = level;
      game.stage = stage;
      game.stage_count = stage_config[mode][level].length;

      reset_stage_icon(stage_data, stage);
      change_stage_text(stage_data, stage);

      // タイトルの更新
      if (game.cur_title) {
        game.cur_title.setAlpha(0);
      }

      game.titles[mode][level].setAlpha(1);
      game.cur_title = game.titles[mode][level];

      // 迷路データ取得
      meiro = alg.exec(mode, level, stage);

      // スタート、ゴールの位置を取得
      game.start_player = get_player_start(meiro.config.start_player_point);
      game.goal_icon_XY = get_player_end(meiro.config.end_player_point);
      game.kudamono = (mode === "kudamono_plus" || mode === "kudamono_kake");

      basket.alpha = (game.kudamono) ? 1 : 0;
      basket_text.alpha = (game.kudamono) ? 1 : 0;

      // 迷路描画　タイルマップ生成、テキストリセット、軌跡リセット
      const tile_data = tile_init(meiro.tilemap);
      create_tilemap(tile_data);
      reset_text(text_data, kudamono_data, game.kudamono);
      reset_route();

      // 各種変数のリセット
      sum = [];
      history = [];
      history.push(game.start_player.player_start_tile);

      // 旗の位置をゴールに戻して、表示
      hata.x = game.goal_icon_XY.x;
      hata.y = game.goal_icon_XY.y;
      hata.alpha = 1;

      // プレイヤーの位置をスタートから左にずらして、右を向く
      player.x = game.start_player.player_start.x + global.map.game_erea.x - global.map.sprite.zoomsize;
      player.y = game.start_player.player_start.y + global.map.game_erea.y;

      if (game.kudamono) {
        basket.x = game.start_player.player_start.x + global.map.game_erea.x - (1 * game.basket_diff);
        basket.y = game.start_player.player_start.y + global.map.game_erea.y - (0 * game.basket_diff);
        basket_text.x = game.start_player.player_start.x + global.map.game_erea.x - (1 * game.basket_diff);
        basket_text.y = game.start_player.player_start.y + global.map.game_erea.y - (0 * game.basket_diff);
      }

      player.play("right");

      // プレイヤーがステージに入ってくるアニメーション
      game.tweens.add({
        targets: player,
        x: game.start_player.player_start.x + global.map.game_erea.x,
        alpha: 1,
        duration: 500,
        ease: "Linear.easeIn",
        callbackScope: this,
        onComplete: function () {
          disableEvent();
          enableEvent();
        },
      });
    }

    // 不正解
    function failure() {
      disableEvent();

      game.tweens.add({
        targets: player,
        x: player.x - 50,
        yoyo: true,
        duration: 200,
        ease: "Bounce.easeOut",
        callbackScope: this,
        onComplete: function () {
          disableEvent();
          enableEvent();
        },
      });
    }

    // 正解
    function success(isClear) {
      console.log("suceses!!!");

      // コントロールを止める
      disableEvent();

      // 旗の数字を消す
      text_data[meiro.config.end_point.y][meiro.config.end_point.x].visible = false;
      text_data[meiro.config.end_point.y][meiro.config.end_point.x].active = false;

      // 旗をのアニメーション
      game.tweens.add({
        targets: hata,
        y: hata.y - 150,
        alpha: 0,
        duration: 450,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function () {},
      });

      // クリアしたステージのアイコンに色をつけるアニメーション
      change_stage_icon(stage_data, game.stage + 1);

      // プレイヤーが跳ねるアニメーション
      game.tweens.add({
        targets: player,
        y: player.y - 70,
        duration: 250,
        ease: "Bounce.easeInOut",
        yoyo: true,
        callbackScope: this,
        onComplete: function () {
          // プレイヤーをフェードアウトさせるアニメーション
          game.tweens.add({
            targets: player,
            x: player.x + global.map.sprite.zoomsize,
            alpha: 1,
            duration: 500,
            ease: "Linear.easeInOut",
            callbackScope: this,
            onComplete: function () {

              // ステージクリアの場合
              if (isClear) {
                // クリアアニメーション
                stage_clear();

                /*
                game.tweens.add({
                  targets: hata,
                  alpha: 1,
                  duration: 1,
                  ease: "Linear.easeIn",
                  callbackScope: this,
                });
                */
              } else {
                stage_up();
                restart(game.mode, game.level, game.stage);
              }
            },
          });
        },
      });
    }

    // プレイヤー移動 スワイプ処理
    function player_swipe(pointer) {
      player.off("pointerdown");
      pyon_loop.play();
      let result = null;

      // ポインタームーブ 描画
      game.input.on("pointermove", (pointer, localX, localY, event) => {
        const retile = history && history[history.length - 1];
        let x, y;

        if (retile) {
          const tile = game.clayer.getTileAtWorldXY(pointer.x, pointer.y, true);
          if (tile && !(tile.x === retile.x && tile.y === retile.y)) {
            const diff = Math.abs(retile.x - tile.x) + Math.abs(retile.y - tile.y);
            // 距離が 1 の場合は隣接しているので、塗り潰す
            if (diff === 1) {
              if (retile.y - tile.y === 1) {
                player.play("up");
                x = 0;
                y = -1;
              } else if (retile.y - tile.y === -1) {
                player.play("down");
                x = 0;
                y = 1;
              } else if (retile.x - tile.x === 1) {
                player.play("left");
                x = -1;
                y = 0;

              } else if (retile.x - tile.x === -1) {
                player.play("right");
                x = 1;
                y = 0;
              }
              const res = move(tile, x, y);
              if (res.isMove) {
                result = res.isSuceses;
              }
            }
          }
        }
      });

      const move_done = (ponter) => {
        // 不要なイベントを削除
        game.input.off("pointermove");
        game.input.off("pointerup");
        game.input.off("gameout");

        pyon_loop.stop();

        if (result !== null) {
          goal_animation(result);
        }

        if (result !== true) {
          // プレイヤーのイベント復活
          player.on("pointerdown", player_swipe);
        }
      };

      // ポインターアップ 確定
      game.input.on("pointerup", move_done);
      game.input.on("gameout", move_done);
    }

    // コントローラー生成
    function create_control(direction) {
      let angle, func;

      const button_size = 124;
      const button_ud_margin = 10;

      // ヘッダーの高さ + マップのサイズ +
      let y_base = global.map.sprite.zoomsize * 8.5 + button_size * 0.5 + (global.map.control_size -(button_size * 2 + global.map.control_margin * 2 + button_ud_margin)) / 2;


      //(global.map.control_size - button_size * 2 - global.map.control_margin * 2) / 2


      console.log("y base = ", y_base);
      // マップサイズの中央
      let x_base = global.map.game_width / 2;

      const x_shift = button_size + global.map.control_margin + button_ud_margin / 2;
      const y_shift_down = button_size + global.map.control_margin * 2 + button_ud_margin;
      const y_shift_LR = button_size / 2 + global.map.control_margin + button_ud_margin / 2;
      console.log(y_shift_down);


      switch (direction) {
        case "up":
          func = up;
          angle = 270;
          break;
        case "down":
          func = down;
          angle = 90;
          y_base += y_shift_down;
          break;
        case "left":
          func = left;
          angle = 180;
          y_base += y_shift_LR;
          x_base -= x_shift;
          break;
        case "right":
          func = right;
          angle = 0;
          y_base += y_shift_LR;
          x_base += x_shift;
          break;
      }

      const obj = game.physics.add.image(x_base, y_base, "control");
      obj.setDepth(3).setInteractive();
      obj.angle = angle;
      obj.displayHeight = button_size * 1.25;
      obj.displayWidth = button_size * 1.25;
      obj.x_base = x_base;
      obj.y_base = y_base;

      hold(obj, func);
      return obj;
    }

    function hold(obj, callback) {
      obj.on("pointerdown", function () {
        if (game.isControl) {
          obj.alpha = 0.7;
          obj.y += 10;
          callback();
          let time = 0;

          const clear = () => {
            obj.alpha = 1;
            obj.y = obj.y_base;
            clearInterval(interval);
            obj.off("pointerup");
            obj.off("pointerout");
          };

          const interval = setInterval(function () {
            if (game.isControl) {
              if (time > 350) {
                callback();
              } else {
                time += 100;
              }
            } else {
              // clear();
            }
          }, 100);

          obj.on("pointerup", clear);
          obj.on("pointerout", clear);
        }
      });
    }

    // イベントの有効化
    function enableEvent() {
      game.isControl = true;

      // キーボード操作
      game.input.keyboard.on("keydown-A", left);
      game.input.keyboard.on("keydown-LEFT", left);
      game.input.keyboard.on("keydown-D", right);
      game.input.keyboard.on("keydown-RIGHT", right);
      game.input.keyboard.on("keydown-W", up);
      game.input.keyboard.on("keydown-UP", up);
      game.input.keyboard.on("keydown-S", down);
      game.input.keyboard.on("keydown-DOWN", down);

      // プレイヤースワイプ
      player.on("pointerdown", player_swipe);

      // 戻るボタン
      back.on("pointerdown", move_title);
    }

    function move_title() {
      poti.play();
      game.scene.wake("dialog");
      dialog_scene.open(game.mode, game.level, game.stage);
    }

    function stage_clear() {
      console.log(4)
      game.scene.pause();
      game.scene.wake("clear");
      clear_scene.open(game.mode, game.level, 1);
    }

    function retry() {
      this.stage = 1;
      restart(this.mode, this.level, this.stage);
    }

    // イベントの無効化
    function disableEvent() {
      game.isControl = false;

      // キーボード操作
      game.input.keyboard.off("keydown-A", left);
      game.input.keyboard.off("keydown-LEFT", left);
      game.input.keyboard.off("keydown-D", right);
      game.input.keyboard.off("keydown-RIGHT", right);
      game.input.keyboard.off("keydown-W", up);
      game.input.keyboard.off("keydown-UP", up);
      game.input.keyboard.off("keydown-S", down);
      game.input.keyboard.off("keydown-DOWN", down);

      // プレイヤースワイプ
      player.off("pointerdown", player_swipe);

      back.off("pointerdown", move_title);
    }

    const game = this;


    const dialog_scene = this.scene.get('dialog');
    const clear_scene = this.scene.get('clear');
    const level_scene = this.scene.get('level');

    this.objects.camera = this.cameras.add(0, 0);
    this.objects.camera.setBackgroundColor("rgba(255, 255, 255, 1)"); // 背景

    const bom = this.sound.add("bom"); // 壁衝突音
    const batu = this.sound.add("batu"); // バツ
    const maru = this.sound.add("maru"); // マル
    const pyon = this.sound.add("pyon"); // ピョン
    const poti = this.sound.add("poti"); // マル
    const mogi = this.sound.add("mogi"); // マル
    const select_audio = this.sound.add("select_audio"); // マル

    const pyon_loop = this.sound.add("pyon", { loop: true }); // ピョン

    // 戻るボタン
    const back = this.add.sprite(global.map.sprite.zoomsize / 2 + global.map.sprite.zoomsize * 6, global.map.header.y / 4 + 8, "back");
    back
      .setScale(global.map.sprite.zoom)
      .setDepth(5)
      .setInteractive();
    back.displayHeight = global.map.sprite.zoomsize * 0.7;
    back.displayWidth = global.map.sprite.zoomsize * 0.7;


    // コントローラー
    const control_up = create_control("up");
    const control_down = create_control("down");
    const control_left = create_control("left");
    const control_right = create_control("right");

    const alg = new Algorithm();
    let meiro = alg.exec(this.mode, this.level, this.stage);

    let sum = []; // 合計値
    let history = []; // プレイヤーの移動履歴

    const tile_data = tile_init(meiro.tilemap);

    create_tilemap(tile_data);

    const route_data = init_route(tile_data);
    const text_data = init_text();
    const kudamono_data = init_kudamono();
    const stage_data = create_stg();

    // プレイヤー
    game.start_player = get_player_start(meiro.config.start_player_point);
    game.basket_diff = 70;

    const player = this.add.sprite(game.start_player.player_start_XY.x, game.start_player.player_start_XY.y, "player");
    player
      .setScale(global.map.sprite.zoom * 0.9)
      .setDepth(6)
      .setInteractive();

    const basket = this.add.image(game.start_player.player_start_XY.x, game.start_player.player_start_XY.y, "basket")
      .setDisplaySize(65, 65)
      .setAlpha(0)
      .setDepth(4);

    const basket_text = game.add.text(game.start_player.player_start_XY.x, game.start_player.player_start_XY.y, 0, {
        font: `55px`,
        fill: "#fff",
      })
      .setAlpha(0)
      .setFontFamily("dongle")
      .setOrigin(0.5, 0.4)
      .setStroke("rgba(32,32,32, 1)", 7)
      .setDepth(5);

    create_player_animation();

    player.play("right"); // 初期値は右を向く

    this.titles = {};

    global.mode.forEach(tname => {
      game.titles[tname] = [];
      for (let i = 0; i < 5; i++) {
        game.titles[tname][i + 1] = game.add.image(global.map.game_width / 2, global.map.header.y / 4 + 8, `${tname}${i + 1}`)
        .setScale(global.map.sprite.zoom * 0.6)
        .setAlpha(0)
        .setDepth(3)
        .setInteractive()
        .on("pointerup", select_level);
      }
    });

    function select_level() {
      if (game.isControl) {
        setTimeout(() => {
          game.scene.pause("keisan");
          select_audio.play();
          level_scene.mode = game.mode;
          game.scene.wake("level");
          level_scene.open("keisan");
        }, 100);
      }
    }

    // 初期位置を履歴に入れておく
    history.push(game.start_player.player_start_tile);

    // ゴールフラッグ
    game.goal_icon_XY = get_player_end(meiro.config.end_player_point);

    const hata = this.physics.add.image(game.goal_icon_XY.x, game.goal_icon_XY.y, "hata");
    hata.setDepth(2).setInteractive();
    hata.displayHeight = global.map.sprite.zoomsize * 1.2;
    hata.displayWidth = global.map.sprite.zoomsize * 1.2;

    this.restart = restart;
    this.retry = retry;
    this.scene.sleep();
  }
}