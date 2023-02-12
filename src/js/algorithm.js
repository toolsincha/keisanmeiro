import _ from "lodash";
import lv_config from "@config/lv";
import stage_config from "@config/stage";

// mode
// ["tashi", "tashi_hiki", "kake", "kake_wari"];
// stage

export default class Algorithm {
  constructor() {
    // ゲーム設定
    this.config = {};
    // 演算子
    this.operator = ["+", "-", "*", "/"];
  }

  // 配列からランダムに要素を重複なく取り出す
  getRandomArray(array, arg_num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = arg_num < l ? arg_num : l;
    while (n-- > 0) {
      var i = (Math.random() * l) | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
  }

  // 乱数生成
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (++max - min)) + min;
  }

  // 探索再帰関数
  search(y, x, history = [], sum = "", isMinus = false, isDecimal = false, passing_num = -1) {


      //console.log("search", y, x);

    // 終了判定
    if (this.config.end_point.y === y && this.config.end_point.x === x) {
      //console.log("検査結果 ゴール 探索終了");

      this.meiro.push({
        route: history,
        passing_num,
        sum,
        distance: history.length,
        isMinus,
        isDecimal,
      });

      this.route.push(history);
      this.sums.push(sum);

      return true;
    } else {
      if (this.map[y] == null || this.map[y][x] == null) {
        return null;
      } else {
        let isDone = false;

        history.forEach((ele) => {
          if (ele[0] === y && ele[1] === x) {
            isDone = true;
          }
        });

        if (isDone) {
          // console.log("検査結果 既に通った道です 探索終了");
        } else {
          // 数値加算
          if (this.map[y][x] !== "0") {
            passing_num++;
            //sum += map[y][x];
            sum = Function("return (" + String(sum) + this.map[y][x] + ");")();
          }

          // 履歴に追加
          history.push([y, x]);

          // 一度でもマイナスになったらフラグを立てる
          if (sum < 0) {
            isMinus = true;
          } else if (!Number.isInteger(sum)) {
            isDecimal = true;
          }

          // 上下左右再帰的に呼ぶ
          this.search(y + 1, x, [...history], sum, isMinus, isDecimal, passing_num);
          this.search(y - 1, x, [...history], sum, isMinus, isDecimal, passing_num);
          this.search(y, x + 1, [...history], sum, isMinus, isDecimal, passing_num);
          this.search(y, x - 1, [...history], sum, isMinus, isDecimal, passing_num);
        }
      }
    }
    return true;
  }

  create_map(tl) {
    const data = _.cloneDeep(tl);

    tl.forEach((yrow, y) => {
      yrow.forEach((xrow, x) => {
        switch (xrow) {
          case "stc":
            this.config.start_point = { y, x };
            data[y][x] = null;
            break;
          case "stp":
            this.config.start_player_point = { y, x };
            data[y][x] = null;
            break;
          case "spc":
            this.config.start_point = { y, x };
            this.config.start_player_point = { y, x };
            data[y][x] = null;
            break;
          case "enc":
            this.config.end_point = { y, x };
            data[y][x] = null;
            break;
          case "enp":
            this.config.end_player_point = { y, x };
            data[y][x] = null;
            break;
          case "epc":
            this.config.end_point = { y, x };
            this.config.end_player_point = { y, x };
            data[y][x] = null;
            break;
          case "wal":
          case "blc":
            data[y][x] = null;
            break;
          case "sky":
            data[y][x] = "0";
            break;
        }
      });
    });

    return data;
  }

  // 要素の出現率で初期化
  init_map_random(map_base, rate) {
    let data = _.cloneDeep(map_base);
    let num_count = 0;

    // 最初に数値を埋めたくないマスは null を入れて置く
    data[this.config.start_point.y][this.config.start_point.x] = null;
    data[this.config.start_player_point.y][this.config.start_player_point.x] = null;
    data[this.config.end_player_point.y][this.config.end_player_point.x] = null;
    data[this.config.end_point.y][this.config.end_point.x] = null;

    data.forEach((yrow, y) => {
      yrow.forEach((xrow, x) => {
        if (xrow != null) {
          if (this.getRandomInt(1, 100) <= rate) {
            let num = this.getRandomInt(this.config.middle_range.min, this.config.middle_range.max);
            data[y][x] = this.operator[this.config.allow_operator[Math.floor(Math.random() * this.config.allow_operator.length)]] + String(num);
            num_count++;
          }
        }
      });
    });

    data[this.config.start_point.y][this.config.start_point.x] = String(this.getRandomInt(this.config.start_range.min, this.config.start_range.max));

    return data;
  }

  // 要素の数で初期化
  init_map_num(map_base, num, isStartPoint = true, rn = null) {
    let data = _.cloneDeep(map_base);
    let target_count = 0; // 要素を入れる候補の数
    let target_mapping = [];

    data[this.config.start_point.y][this.config.start_point.x] = (isStartPoint) ? null : "0";
    data[this.config.start_player_point.y][this.config.start_player_point.x] = null;
    data[this.config.end_player_point.y][this.config.end_player_point.x] = null;
    data[this.config.end_point.y][this.config.end_point.x] = null;

    data.forEach((yrow, y) => {
      yrow.forEach((xrow, x) => {
        if (xrow != null) {
          target_mapping[target_count] = { x, y };
          target_count++;
        }
      });
    });

    const target = this.getRandomArray(target_mapping, num);
    // console.table(target);

    target.forEach((t) => {
      let n = rn || this.getRandomInt(this.config.middle_range.min, this.config.middle_range.max);
      data[t.y][t.x] = this.operator[this.config.allow_operator[Math.floor(Math.random() * this.config.allow_operator.length)]] + String(n);
    });

    if (isStartPoint) {
      data[this.config.start_point.y][this.config.start_point.x] = String(this.getRandomInt(this.config.start_range.min, this.config.start_range.max));
    }

    return data;
  }

  // 一意になる、合計を探す
  check_sum(sum) {
    let uniq_count = {};
    let isSearch = false;

    this.meiro.forEach((i, index) => {
      if (sum === i.sum) {
        isSearch = true;
      }
    });

    if (isSearch) {
      this.map[this.config.end_point.y][this.config.end_point.x] = sum;
    } else {
      // console.log("ユニークなし");
    }

    return isSearch;
  }


  // 一意になる、合計を探す
  uniq_sum() {
    let uniq_count = {};
    let isSearch = false;

    this.meiro.forEach((i, index) => {
      // 答えは整数のみ
      const isInt = Number.isInteger(i.sum);

      // マイナスの許容チェック
      const isPlus = this.config.allow_minus || !i.isMinus;

      // 合計の範囲チェック
      const isSumRange = this.config.end_range.min <= i.sum && i.sum <= this.config.end_range.max;

      if (isInt && isPlus && isSumRange && !i.isDecimal) {
        uniq_count[i.sum] = (uniq_count[i.sum] || 0) + 1;
        this.meiro[index].isCheck = true;
      } else {
        this.meiro[index].isCheck = false;
      }
    });

    for (let i in uniq_count) {
      if (uniq_count[i] === 1) {
        this.meiro.forEach((j, index) => {
          if (j.sum === parseInt(i)) {
            // 計算数のチェック
            const passing = this.config.mode.option;
            let isPassing = !passing || (passing.range.min <= j.passing_num && j.passing_num <= passing.range.max);

            if (isPassing) {
              this.uniq.push(parseInt(i));
            }
          }
        });
      }
    }

    if (this.uniq.length) {
      // console.log("ユニーク発見");
      isSearch = true;
      this.map[this.config.end_point.y][this.config.end_point.x] = this.getGoal();
    } else {
      // console.log("ユニークなし");
    }

    return isSearch;
  }

  getGoal() {
    if (this.uniq.length === 1) {
      return this.uniq[0];
    } else {
      // ランダムに選択
      if (this.config.route === 0) {
        return this.uniq[this.getRandomInt(0, this.uniq.length - 1)];
      } else {
        let tmp = [];
        this.uniq.forEach((val) => {
          // console.log(val);
          let i = this.sums.indexOf(val);
          // console.log(i);
          tmp[i] = this.route[i].length;
        });

        let tmp2;

        // 短いルート優先
        if (this.config.route === 1) {
          const aryMin = (a, b) => {
            return Math.min(a, b);
          };
          tmp2 = tmp.reduce(aryMin); // => 1
        } else {
          // 長いルート優先
          const aryMax = (a, b) => {
            return Math.max(a, b);
          };
          tmp2 = tmp.reduce(aryMax); // => 10
        }

        return this.sums[tmp.indexOf(tmp2)];
      }
    }
  }

  exec(mode, level, stage) {

    console.log(`mode: ${mode}, level: ${level}, stage: ${stage}`);

    const default_config = _.cloneDeep(lv_config["default"]);

    if (lv_config[stage_config[mode][level][stage - 1]]) {
      console.log("level exists ");
      this.config = Object.assign(default_config, lv_config[stage_config[mode][level][stage - 1]]);
    } else {
      console.log("default ");
      this.config = default_config;
    }

    this.meiro = [];
    this.route = [];
    this.sums = [];
    this.map = [];
    this.uniq = [];
    this.uniq_flag = false;

    const map_base = this.create_map(this.config.map);

    if (this.config.data) {
      this.map = this.config.data;
    } else {
      let wcount = 0;
      const element_num = this.getRandomInt(this.config.mode.option.range.min, this.config.mode.option.range.max);

      while (this.config.search_limit > wcount && !this.uniq_flag) {
        wcount++;
        this.route = [];
        this.sums = [];
        this.meiro = [];

        let add_num;
        let uniq_check = true;
        let fsum = 0;
        let fnum;

        switch (this.config.mode.type) {
          case "passing":
            add_num = this.config.mode.option.add_element ? this.getRandomInt(this.config.mode.option.add_element.min, this.config.mode.option.add_element.max) : 0;
            this.map = this.init_map_num(map_base, element_num + add_num);
            break;
          case "passing_fixed":
            fnum = this.getRandomInt(this.config.middle_range.min, this.config.middle_range.max);
            add_num = this.config.mode.option.add_element ? this.getRandomInt(this.config.mode.option.add_element.min, this.config.mode.option.add_element.max) : 0;
            this.map = this.init_map_num(map_base, element_num + add_num, false, fnum);
            break;
          case "element":
            this.map = this.init_map_num(map_base, element_num);
            break;
          case "random":
            this.map = this.init_map_random(map_base, this.config.mode.option.rate);
            break;
          case "count":
            fnum = this.getRandomInt(this.config.middle_range.min, this.config.middle_range.max);
            this.map = this.init_map_num(map_base, element_num, false, fnum);
            fsum = element_num * fnum;
            uniq_check = false;
            break;
          default:
            break;
        }
        this.search(this.config.start_point.y, this.config.start_point.x);

        if (uniq_check) {
          this.uniq_flag = this.uniq_sum();
        } else {
          this.uniq_flag = this.check_sum(fsum);
        }
      }

      if (!this.uniq_flag) {
        console.log("マップデータの生成に失敗しました");
      } else {
        console.log(`${wcount} 回で探索完了`);
      }
    }

    //this.debug();

    return { map: this.map, tilemap: this.config.map, config: this.config };
  }

  debug() {
    console.log("map");
    console.table(this.map);
    console.log(JSON.stringify(this.map));
    console.log("this.route");
    console.table(this.route);
    console.log("this.sums");
    console.table(this.sums);
    console.log("uniq");
    console.table(this.uniq);
    console.log("this.meiro");
    console.table(this.meiro);
  }
}
