const mappings = {
  mk: {
    digraphs: {
      dzh: "џ",
      sh: "ш",
      zh: "ж",
      nj: "њ",
      lj: "љ",
      kj: "ќ",
      ch: "ч",
      dz: "ѕ",
      ts: "ц",
    },
    letters: {
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      e: "е",
      z: "з",
      i: "и",
      j: "ј",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      u: "у",
      f: "ф",
      h: "х",
      c: "ц",
    },
  },
  rs: {
    digraphs: {
      nj: "њ",
      lj: "љ",
      dž: "џ",
      dj: "ђ",
      dz: "ѕ",
      ch: "ч",
      sh: "ш",
      zh: "ж",
    },
    letters: {
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      đ: "ђ",
      e: "е",
      z: "з",
      i: "и",
      j: "ј",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      ć: "ћ",
      u: "у",
      f: "ф",
      h: "х",
      c: "ц",
      č: "ч",
      š: "ш",
      ž: "ж",
    },
  },
  bg: {
    digraphs: {
      zh: "ж",
      ts: "ц",
      ch: "ч",
      sh: "ш",
      sht: "щ",
      yu: "ю",
      ya: "я",
    },
    letters: {
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      e: "е",
      z: "з",
      i: "и",
      y: "й",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      u: "у",
      f: "ф",
      h: "х",
    },
  },
  ru: {
    digraphs: {
      yo: "ё",
      zh: "ж",
      ts: "ц",
      ch: "ч",
      sh: "ш",
      shch: "щ",
      yu: "ю",
      ya: "я",
      ye: "е",
      e: "э",
    },
    letters: {
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      e: "е",
      z: "з",
      i: "и",
      j: "й",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      u: "у",
      f: "ф",
      h: "х",
      y: "ы",
      "'": "ь",
      '"': "ъ",
    },
  },
  uk: {
    digraphs: {
      zh: "ж",
      kh: "х",
      ts: "ц",
      ch: "ч",
      sh: "ш",
      shch: "щ",
      yu: "ю",
      ya: "я",
      ye: "є",
      yi: "ї",
    },
    letters: {
      a: "а",
      b: "б",
      v: "в",
      h: "г",
      g: "ґ",
      d: "д",
      e: "е",
      z: "з",
      y: "и",
      i: "і",
      j: "й",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      u: "у",
      f: "ф",
      "'": "ь",
    },
  },
};

function invertMapping(mapping) {
  // Invert digraphs and letters for reverse transliteration
  const digraphs = {};
  const letters = {};
  for (const [latin, cyrillic] of Object.entries(mapping.digraphs)) {
    digraphs[cyrillic] = latin;
  }
  for (const [latin, cyrillic] of Object.entries(mapping.letters)) {
    letters[cyrillic] = latin;
  }
  return { digraphs, letters };
}

class TransliterationResult {
  constructor(str, trInstance) {
    this.str = str;
    this.trInstance = trInstance;
  }
  reverse() {
    return this.trInstance.reverseTransliterate(this.str);
  }
  toString() {
    return this.str;
  }
}

class TransliterateCyrillic {
  constructor() {
    this.currentLocale = "mk";
  }

  locale(loc) {
    if (mappings[loc]) {
      this.currentLocale = loc;
    } else {
      throw new Error(`Locale '${loc}' not supported`);
    }
    return this;
  }

  transliterate(str) {
    const mapping = mappings[this.currentLocale];
    let result = str;

    // Replace digraphs (longest first)
    Object.keys(mapping.digraphs)
      .sort((a, b) => b.length - a.length)
      .forEach((digraph) => {
        result = result.replace(new RegExp(digraph, "gi"), (match) =>
          match[0] === match[0].toUpperCase()
            ? mapping.digraphs[digraph].toUpperCase()
            : mapping.digraphs[digraph]
        );
      });

    // Replace single letters
    result = result.replace(/[a-zćčđšž]/gi, (m) => {
      const lower = m.toLowerCase();
      const cyr = mapping.letters[lower];
      if (!cyr) return m;
      return m === lower ? cyr : cyr.toUpperCase();
    });

    return new TransliterationResult(result, this);
  }

  reverseTransliterate(str) {
    const mapping = mappings[this.currentLocale];
    const inverted = invertMapping(mapping);
    let result = str;

    // Replace digraphs (longest first)
    Object.keys(inverted.digraphs)
      .sort((a, b) => b.length - a.length)
      .forEach((cyrDigraph) => {
        result = result.replace(
          new RegExp(cyrDigraph, "g"),
          inverted.digraphs[cyrDigraph]
        );
      });

    // Replace single letters
    result = result.replace(
      /[\u0400-\u04FF]/g,
      (c) => inverted.letters[c] || c
    );

    return result;
  }
}

const transliterateCyrillic = new TransliterateCyrillic();

module.exports = transliterateCyrillic;
