export default {
  default: {
    map: [
      ["wal", "wal", "wal", "wal", "wal", "wal", "wal"],
      ["stp", "stc", "sky", "sky", "sky", "sky", "wal"],
      ["wal", "sky", "blc", "sky", "blc", "sky", "wal"],
      ["wal", "sky", "sky", "sky", "sky", "sky", "wal"],
      ["wal", "sky", "blc", "sky", "blc", "sky", "wal"],
      ["wal", "sky", "sky", "sky", "sky", "sky", "epc"],
      ["wal", "wal", "wal", "wal", "wal", "wal", "wal"],
    ],
    mode: {
      type: "passing", // element = 要素数, passing = 計算数, random = ランダム
      option: {
        range: { min: 1, max: 1 }, // 要素数, 計算数の範囲
        add_element: { min: 1, max: 1}, // 計算数のみ。追加したい要素数。0 の場合は計算数 = 要素数
        rate: 30, // ランダムのみ 要素の出現率 0 〜 100
      },
    },
    route: 0, // 一意になる値が複数あった時の優先的に選択する経路。 0 => ランダム, 1 => 短い経路, 2 => 長い経路
    allow_minus: false, // ゴール、経路の途中にマイナスを許容するかどうか。true of false
    start_range: { min: 1, max: 3 }, // スタートの乱数の範囲。[1, 3] => 1〜3のランダムな値が設定される
    middle_range: { min: 1, max: 3 }, // 経路の乱数の範囲。
    end_range: { min: 1, max: 9 }, // ゴールの範囲
    search_limit: 300 , // 一意にならない場合に繰り返す、回数
    start_point: {},
    start_player_point: {},
    end_point: {},
    end_player_point: {},
    allow_operator: [0],// 足し算 = 0, 引き算 = 1, 掛け算 = 2, 割り算 = 3
  },
  0: {
    data: [
      [null, null, null, null, null, null, null],
      [null,  "2",  "0",  "0",  "0",  "0", null],
      [null,  "0", null,  "0", null, "+2", null],
      [null,  "0",  "0",  "0",  "0",  "0", null],
      [null,  "0", null,  "0", null, "+2", null],
      [null,  "0",  "0",  "0",  "0",  "0",    6],
      [null, null, null, null, null, null, null]
    ],
  },
  1: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 4 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 5, max: 9 },
  },
  2: {
    mode: {
      type: "passing",
      option: {
        range: { min: 2, max: 2 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 5 },
    middle_range: { min: 1, max: 5 },
    end_range: { min: 1, max: 9 },
  },
  3: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 3 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 9 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 1, max: 20 },
  },
  4: {
    mode: {
      type: "passing",
      option: {
        range: { min: 4, max: 4 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 5, max: 12 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 20, max: 40 },
  },
  5: {
    mode: {
      type: "passing",
      option: {
        range: { min: 4, max: 4 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 10, max: 19 },
    middle_range: { min: 10, max: 30 },
    end_range: { min: 1, max: 99 },
  },
  6: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 6, max: 9 },
    middle_range: { min: 1, max: 4 },
    end_range: { min: 1, max: 5 },
    allow_operator: [0, 1],
  },
  7: {
    mode: {
      type: "passing",
      option: {
        range: { min: 2, max: 2 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 5, max: 9 },
    middle_range: { min: 1, max: 5 },
    end_range: { min: 1, max: 5 },
    allow_operator: [0, 1],
  },
  8: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 3 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 10, max: 20 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 1, max: 9 },
    allow_operator: [0, 1],
  },
  9: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 4 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 10, max: 40 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 1, max: 20 },
    allow_operator: [0, 1],
  },
  10: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 5 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 99 },
    middle_range: { min: 10, max: 30 },
    end_range: { min: 1, max: 9 },
    allow_operator: [0, 1],
  },
  11: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 9 },
    middle_range: { min: 2, max: 9 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2],
  },
  12: {
    mode: {
      type: "passing",
      option: {
        range: { min: 2, max: 2 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 5 },
    middle_range: { min: 2, max: 5 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2],
  },
  13: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 3 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 6 },
    middle_range: { min: 2, max: 6 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2],
  },
  14: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 4 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 9 },
    middle_range: { min: 2, max: 9 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2],
  },
  15: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 5 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2 ,max: 9 },
    middle_range: { min: 2, max: 10 },
    end_range: { min: 1, max: 256 },
    allow_operator: [2],
  },
  16: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 9 },
    middle_range: { min: 2, max: 9 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2,3],
  },
  17: {
    mode: {
      type: "passing",
      option: {
        range: { min: 2, max: 2 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 5 },
    middle_range: { min: 2, max: 5 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2,3],
  },
  18: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 3 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 6 },
    middle_range: { min: 2, max: 6 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2,3],
  },
  19: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 4 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2, max: 8 },
    middle_range: { min: 2, max: 8 },
    end_range: { min: 1, max: 81 },
    allow_operator: [2,3],
  },
  20: {
    mode: {
      type: "passing",
      option: {
        range: { min: 3, max: 5 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 2 ,max: 9 },
    middle_range: { min: 2, max: 10 },
    end_range: { min: 1, max: 256 },
    allow_operator: [2,3],
  },
  21: {
    mode: {
      type: "count",
      option: {
        range: { min: 1, max: 5 },
      },
    },
    middle_range: { min: 1, max: 1 },
    end_range: { min: 1, max: 10 },
  },
  22: {
    mode: {
      type: "count",
      option: {
        range: { min: 6, max: 10 },
      },
    },
    middle_range: { min: 1, max: 1 },
    end_range: { min: 2, max: 10 },
  },
  23: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 9 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 2, max: 10 },
  },
  24: {
    mode: {
      type: "passing",
      option: {
        range: { min: 1, max: 1 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 9 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 10, max: 10 },
  },
  25: {
    mode: {
      type: "passing",
      option: {
        range: { min: 2, max: 2 },
        add_element: { min: 2, max: 2},
      },
    },
    start_range: { min: 1, max: 9 },
    middle_range: { min: 1, max: 9 },
    end_range: { min: 10, max: 20 },
  },
  26: {
    mode: {
      type: "count",
      option:   {
        range: { min: 2, max: 10 },
      },
    },
    start_range: { min: 2, max: 3 },
    middle_range: { min: 2, max: 3 },
    end_range: { min: 1, max: 100 },
  },
  27: {
    mode: {
      type: "count",
      option:   {
        range: { min: 2, max: 10 },
      },
    },
    start_range: { min: 4, max: 6 },
    middle_range: { min: 4, max: 6 },
    end_range: { min: 1, max: 100 },
  },
  28: {
    mode: {
      type: "count",
      option:   {
        range: { min: 2, max: 10 },
      },
    },
    start_range: { min: 7, max: 9 },
    middle_range: { min: 7, max: 9 },
    end_range: { min: 1, max: 100 },
  },
  29: {
    mode: {
      type: "passing_fixed",
      option:   {
        range: { min: 3, max: 9 },
        add_element: { min: 1, max: 4},
      },
    },
    start_range: { min: 2, max: 5 },
    middle_range: { min: 2, max: 5 },
    end_range: { min: 1, max: 100 },
  },
  30: {
    mode: {
      type: "passing_fixed",
      option:   {
        range: { min: 3, max: 9 },
        add_element: { min: 1, max: 4},
      },
    },
    start_range: { min: 6, max: 9 },
    middle_range: { min: 6, max: 9 },
    end_range: { min: 1, max: 100 },
  },
};
