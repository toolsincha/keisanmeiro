export default class Map {
  constructor() {
    // マップの雛形
    // stp プレイヤー 開始地点
    // stc 計算      開始地点
    // spc プレイヤー計算 開始地点が同じ
    // enp プレイヤー 終了地点
    // enc 計算      終了地点
    // wal 壁
    // blc ブロック(障害物)
    // sky 空
    this.tilemap = [
      ["wal", "wal", "wal", "wal", "wal", "wal", "wal"],
      ["stp", "stc", "sky", "sky", "sky", "sky", "wal"],
      ["wal", "sky", "blc", "sky", "blc", "sky", "wal"],
      ["wal", "sky", "sky", "sky", "sky", "sky", "wal"],
      ["wal", "sky", "blc", "sky", "blc", "sky", "wal"],
      ["wal", "sky", "sky", "sky", "sky", "sky", "epc"],
      ["wal", "wal", "wal", "wal", "wal", "wal", "wal"],
    ];

    this.sprite = {
      size: 108,
      zoom: 1,
      mapping: {
        sky: 0,
        stp: 0,
        stc: 0,
        spc: 0,
        epc: 0,
        enp: 0,
        enc: 0,
        blc: 1,
        wal: 1,
      },
    };

    this.sprite.zoomsize = this.sprite.size * this.sprite.zoom;

    this.control_margin = 20;
    this.header = { y: this.sprite.zoomsize * 1.5, x: 0 };
    this.game_erea = { y: this.header.y, x: 0 };
    this.control_size = 426;

    // map_size に壁の分を足す
    this.map_size = {
      y: this.tilemap.length,
      x: this.tilemap[0].length,
    };

    this.game_height = this.map_size.y * this.sprite.zoomsize + this.control_size + this.game_erea.y;
    this.game_width = this.map_size.x * this.sprite.zoomsize + this.game_erea.x * 2;

    console.log("game height = ", this.game_height);
    console.log("game width  = ", this.game_width);


  }
}