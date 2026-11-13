var LETTERS = [
  { ch:"ا", name:"ألف", audio:"../../audios/arabic-letters/01.mp3" },
  { ch:"س", name:"سين", audio:"../../audios/arabic-letters/12.mp3" },
  { ch:"ل", name:"لام", audio:"../../audios/arabic-letters/23.mp3" },
  { ch:"ح", name:"حاء", audio:"../../audios/arabic-letters/06.mp3" },
  { ch:"ظ", name:"ظاء", audio:"../../audios/arabic-letters/17.mp3" },
  { ch:"ي", name:"ياء", audio:"../../audios/arabic-letters/28.mp3" },
  { ch:"ز", name:"زاي", audio:"../../audios/arabic-letters/11.mp3" },
  { ch:"ك", name:"كاف", audio:"../../audios/arabic-letters/22.mp3" },
  { ch:"ج", name:"جيم", audio:"../../audios/arabic-letters/05.mp3" },
  { ch:"ط", name:"طاء", audio:"../../audios/arabic-letters/16.mp3" },
  { ch:"و", name:"واو", audio:"../../audios/arabic-letters/27.mp3" },
  { ch:"ر", name:"راء", audio:"../../audios/arabic-letters/10.mp3" },
  { ch:"ق", name:"قاف", audio:"../../audios/arabic-letters/21.mp3" },
  { ch:"ث", name:"ثاء", audio:"../../audios/arabic-letters/04.mp3" },
  { ch:"ض", name:"ضاد", audio:"../../audios/arabic-letters/15.mp3" },
  { ch:"ه", name:"هاء", audio:"../../audios/arabic-letters/26.mp3" },
  { ch:"ذ", name:"ذال", audio:"../../audios/arabic-letters/09.mp3" },
  { ch:"ف", name:"فاء", audio:"../../audios/arabic-letters/20.mp3" },
  { ch:"ت", name:"تاء", audio:"../../audios/arabic-letters/03.mp3" },
  { ch:"ص", name:"صاد", audio:"../../audios/arabic-letters/14.mp3" },
  { ch:"ن", name:"نون", audio:"../../audios/arabic-letters/25.mp3" },
  { ch:"د", name:"دال", audio:"../../audios/arabic-letters/08.mp3" },
  { ch:"غ", name:"غين", audio:"../../audios/arabic-letters/19.mp3" },
  { ch:"ب", name:"باء", audio:"../../audios/arabic-letters/02.mp3" },
  { ch:"ش", name:"شين", audio:"../../audios/arabic-letters/13.mp3" },
  { ch:"م", name:"ميم", audio:"../../audios/arabic-letters/24.mp3" },
  { ch:"خ", name:"خاء", audio:"../../audios/arabic-letters/07.mp3" },
  { ch:"ع", name:"عين", audio:"../../audios/arabic-letters/18.mp3" }
];

var WORD_AUDIO_FILES = [
  "بَ طَ شَ تْ.mp3",
  "شَ رِ بَ.mp3",
  "فُ عِ لَ تْ.mp3",
  "ذُ كَ رَ.mp3",
  "صَ نَ عَ تْ.mp3",
  "مَ دَ حَ.mp3",
  "سُ مِ عَ تْ.mp3",
  "ضُ رِ بَ.mp3",
  "ذَ كَ رَ تْ.mp3",
  "شُ رِ بَ.mp3",
  "لُ بِ سَ تْ.mp3",
  "رُ كِ بَ.mp3",
  "ضَ رَ بَ تْ.mp3",
  "بَ طَ شَ.mp3",
  "شَ كَ رَ تْ.mp3",
  "فُ عِ لَ.mp3",
  "رَ كِ بَ تْ.mp3",
  "صَ نَ عَ.mp3",
  "مُ دَ حَ تْ.mp3",
  "سُ مِ عَ.mp3",
  "فَ عَ لَ تْ.mp3",
  "ذَ كَ رَ.mp3",
  "شُ كَ رَ تْ.mp3",
  "لُ بِ سَ.mp3",
  "سَ مِ عَ تْ.mp3",
  "ضَ رَ بَ.mp3",
  "بُ طِ شَ تْ.mp3",
  "شَ كَ رَ.mp3",
  "لَ بِ سَ تْ.mp3",
  "رَ كِ بَ.mp3",
  "صُ نِ عَ تْ.mp3",
  "مُ دَ حَ.mp3",
  "شَ رِ بَ تْ.mp3",
  "فَ عَ لَ.mp3",
  "ذُ كَ رَ تْ.mp3",
  "شُ كَ رَ.mp3",
  "مَ دَ حَ تْ.mp3",
  "سَ مِ عَ.mp3",
  "ضُ رِ بَ تْ.mp3",
  "بُ طِ شَ.mp3",
  "شُ رِ بَ تْ.mp3",
  "لَ بِ سَ.mp3",
  "رُ كِ بَ تْ.mp3",
  "صُ نِ عَ.mp3"
];

var WORDS = WORD_AUDIO_FILES.map(function(fileName) {
  return {
    ch:fileName,
    name:fileName.replace(/\.mp3$/i,""),
    audio:"../../audios/level-2-game-words/" + encodeURIComponent(fileName)
  };
});

function createSequentialRounds(items, tileCounts, targetLimit) {
  var nextTargetIndex = 0;

  // Prompts follow item order; larger boards include later items as decoys.
  return tileCounts.map(function(tileCount) {
    var targetCount = Math.min(tileCount, targetLimit);
    var tiles = [];

    for (var i = 0; i < tileCount; i++) {
      tiles.push(items[(nextTargetIndex + i) % items.length]);
    }

    var targets = tiles.slice(0, targetCount);
    nextTargetIndex = (nextTargetIndex + targetCount) % items.length;

    return {
      tiles:tiles,
      targets:targets
    };
  });
}

export var LEVEL1_ROUNDS = createSequentialRounds(
  LETTERS,
  [7,14,21,28],
  9
);

export var LEVEL2_ROUNDS = createSequentialRounds(
  WORDS,
  [3,6,9,12],
  9
);
