const canvas = document.getElementById("traceCanvas");
const ctx = canvas.getContext("2d");

const result = document.getElementById("result");
const streakDisplay = document.getElementById("streak");

let isDrawing = false;
let currentStroke = 0;
let currentPoint = 0;

let streak = 0;
let freeDrawMode = false;
let drawingFinished = false;

let userPoints = [];

let currentLetter = 0;


/* =========================================================
   ARABIC LETTERS
========================================================= */

const letters = [

    /* 1 */
    {
        letter: "ا",
        arabicName: "ألف",
        englishName: "Alif",
        tipArabic: "ابدأ من الأعلى وارسم إلى الأسفل",
        tipEnglish: "Start from the top and draw down",
        strokes: [
            "alif"
        ]
    },

    /* 2 */
    {
        letter: "ب",
        arabicName: "باء",
        englishName: "Ba",
        tipArabic: "ابدأ من اليمين وارسم إلى اليسار ثم ضع النقطة",
        tipEnglish: "Start from the right, draw to the left, then place the dot",
        strokes: [
            "ba"
        ]
    },

    /* 3 */
    {
        letter: "ت",
        arabicName: "تاء",
        englishName: "Ta",
        tipArabic: "ارسم الجسم ثم ضع نقطتين فوقه",
        tipEnglish: "Draw the body, then place two dots above",
        strokes: [
            "ba",
            "taDots"
        ]
    },

    /* 4 */
    {
        letter: "ث",
        arabicName: "ثاء",
        englishName: "Tha",
        tipArabic: "ارسم الجسم ثم ضع ثلاث نقاط فوقه",
        tipEnglish: "Draw the body, then place three dots above",
        strokes: [
            "ba",
            "thaDots"
        ]
    },

    /* 5 */
    {
        letter: "ج",
        arabicName: "جيم",
        englishName: "Jeem",
        tipArabic: "ارسم القوس ثم ضع النقطة",
        tipEnglish: "Draw the curve, then place the dot",
        strokes: [
            "jeem",
            "singleBottomDot"
        ]
    },

    /* 6 */
    {
        letter: "ح",
        arabicName: "حاء",
        englishName: "Haa",
        tipArabic: "ابدأ من اليمين وارسم القوس",
        tipEnglish: "Start from the right and draw the curve",
        strokes: [
            "jeem"
        ]
    },

    /* 7 */
    {
        letter: "خ",
        arabicName: "خاء",
        englishName: "Khaa",
        tipArabic: "ارسم القوس ثم ضع النقطة فوقه",
        tipEnglish: "Draw the curve, then place the dot above",
        strokes: [
            "jeem",
            "singleTopDot"
        ]
    },

    /* 8 */
    {
        letter: "د",
        arabicName: "دال",
        englishName: "Dal",
        tipArabic: "ابدأ من الأعلى وارسم إلى اليسار",
        tipEnglish: "Start from the top and draw to the left",
        strokes: [
            "dal"
        ]
    },

    /* 9 */
    {
        letter: "ذ",
        arabicName: "ذال",
        englishName: "Dhal",
        tipArabic: "ارسم دال ثم ضع النقطة",
        tipEnglish: "Draw Dal, then place the dot",
        strokes: [
            "dal",
            "singleTopDot"
        ]
    },

    /* 10 */
    {
        letter: "ر",
        arabicName: "راء",
        englishName: "Ra",
        tipArabic: "ابدأ من الأعلى وارسم إلى الأسفل",
        tipEnglish: "Start from the top and curve down",
        strokes: [
            "ra"
        ]
    },

    /* 11 */
    {
        letter: "ز",
        arabicName: "زاي",
        englishName: "Zay",
        tipArabic: "ارسم راء ثم ضع النقطة",
        tipEnglish: "Draw Ra, then place the dot",
        strokes: [
            "ra",
            "singleTopDot"
        ]
    },

    /* 12 */
    {
        letter: "س",
        arabicName: "سين",
        englishName: "Seen",
        tipArabic: "ارسم الأسنان الثلاثة من اليمين إلى اليسار",
        tipEnglish: "Draw the three teeth from right to left",
        strokes: [
            "seen"
        ]
    },

    /* 13 */
    {
        letter: "ش",
        arabicName: "شين",
        englishName: "Sheen",
        tipArabic: "ارسم السين ثم ضع ثلاث نقاط",
        tipEnglish: "Draw Seen, then place three dots",
        strokes: [
            "seen",
            "thaDots"
        ]
    },

    /* 14 */
    {
        letter: "ص",
        arabicName: "صاد",
        englishName: "Sad",
        tipArabic: "ابدأ من اليمين وارسم الجسم",
        tipEnglish: "Start from the right and draw the body",
        strokes: [
            "sad"
        ]
    },

    /* 15 */
    {
        letter: "ض",
        arabicName: "ضاد",
        englishName: "Dad",
        tipArabic: "ارسم صاد ثم ضع النقطة",
        tipEnglish: "Draw Sad, then place the dot",
        strokes: [
            "sad",
            "singleTopDot"
        ]
    },

    /* 16 */
    {
        letter: "ط",
        arabicName: "طاء",
        englishName: "Ta",
        tipArabic: "ارسم الخط ثم القوس",
        tipEnglish: "Draw the vertical stroke and curve",
        strokes: [
            "taa"
        ]
    },

    /* 17 */
    {
        letter: "ظ",
        arabicName: "ظاء",
        englishName: "Dha",
        tipArabic: "ارسم طاء ثم ضع النقطة",
        tipEnglish: "Draw Ta, then place the dot",
        strokes: [
            "taa",
            "singleTopDot"
        ]
    },

    /* 18 */
    {
        letter: "ع",
        arabicName: "عين",
        englishName: "Ain",
        tipArabic: "ابدأ من اليمين وارسم العين",
        tipEnglish: "Start from the right and draw Ain",
        strokes: [
            "ain"
        ]
    },

    /* 19 */
    {
        letter: "غ",
        arabicName: "غين",
        englishName: "Ghain",
        tipArabic: "ارسم عين ثم ضع النقطة",
        tipEnglish: "Draw Ain, then place the dot",
        strokes: [
            "ain",
            "singleTopDot"
        ]
    },

    /* 20 */
    {
        letter: "ف",
        arabicName: "فاء",
        englishName: "Fa",
        tipArabic: "ارسم الجسم ثم ضع النقطة",
        tipEnglish: "Draw the body, then place the dot",
        strokes: [
            "fa",
            "singleTopDot"
        ]
    },

    /* 21 */
    {
        letter: "ق",
        arabicName: "قاف",
        englishName: "Qaf",
        tipArabic: "ارسم الجسم ثم ضع نقطتين",
        tipEnglish: "Draw the body, then place two dots",
        strokes: [
            "qaf",
            "taDots"
        ]
    },

    /* 22 */
    {
        letter: "ك",
        arabicName: "كاف",
        englishName: "Kaf",
        tipArabic: "ابدأ من الأعلى وارسم الكاف",
        tipEnglish: "Start from the top and draw Kaf",
        strokes: [
            "kaf"
        ]
    },

    /* 23 */
    {
        letter: "ل",
        arabicName: "لام",
        englishName: "Lam",
        tipArabic: "ابدأ من الأعلى وارسم إلى الأسفل",
        tipEnglish: "Start from the top and draw down",
        strokes: [
            "lam"
        ]
    },

    /* 24 */
    {
        letter: "م",
        arabicName: "ميم",
        englishName: "Meem",
        tipArabic: "ابدأ من اليمين وارسم الميم",
        tipEnglish: "Start from the right and draw Meem",
        strokes: [
            "meem"
        ]
    },

    /* 25 */
    {
        letter: "ن",
        arabicName: "نون",
        englishName: "Noon",
        tipArabic: "ارسم الجسم ثم ضع النقطة",
        tipEnglish: "Draw the body, then place the dot",
        strokes: [
            "noon",
            "singleTopDot"
        ]
    },

    /* 26 */
    {
        letter: "ه",
        arabicName: "هاء",
        englishName: "Haa",
        tipArabic: "ارسم الهاء",
        tipEnglish: "Draw Haa",
        strokes: [
            "haa"
        ]
    },

    /* 27 */
    {
        letter: "و",
        arabicName: "واو",
        englishName: "Waw",
        tipArabic: "ابدأ من الأعلى وارسم الواو",
        tipEnglish: "Start from the top and draw Waw",
        strokes: [
            "waw"
        ]
    },

    /* 28 */
    {
        letter: "ي",
        arabicName: "ياء",
        englishName: "Ya",
        tipArabic: "ارسم الجسم ثم ضع نقطتين",
        tipEnglish: "Draw the body, then place two dots",
        strokes: [
            "ya",
            "taDotsBottom"
        ]
    }

];


/* =========================================================
   PATH GENERATOR
========================================================= */

function generatePath(type) {

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const cx = w / 2;

    const points = [];

    function line(
        x1,
        y1,
        x2,
        y2,
        steps = 20
    ) {

        for (let i = 0; i <= steps; i++) {

            const t = i / steps;

            points.push({
                x: x1 + (x2 - x1) * t,
                y: y1 + (y2 - y1) * t
            });
        }
    }


    function curve(
        p0,
        p1,
        p2,
        steps = 30
    ) {

        for (let i = 0; i <= steps; i++) {

            const t = i / steps;

            const x =
                (1 - t) * (1 - t) * p0.x +
                2 * (1 - t) * t * p1.x +
                t * t * p2.x;

            const y =
                (1 - t) * (1 - t) * p0.y +
                2 * (1 - t) * t * p1.y +
                t * t * p2.y;

            points.push({ x, y });
        }
    }


    switch (type) {

        case "alif":

            line(
                cx,
                45,
                cx,
                h - 50,
                45
            );

            break;


        case "ba":

            curve(
                {
                    x: w * 0.75,
                    y: h * 0.32
                },
                {
                    x: w * 0.60,
                    y: h * 0.65
                },
                {
                    x: w * 0.28,
                    y: h * 0.47
                }
            );

            break;


        case "jeem":

            curve(
                {
                    x: w * 0.75,
                    y: h * 0.30
                },
                {
                    x: w * 0.38,
                    y: h * 0.28
                },
                {
                    x: w * 0.35,
                    y: h * 0.60
                }
            );

            curve(
                {
                    x: w * 0.35,
                    y: h * 0.60
                },
                {
                    x: w * 0.40,
                    y: h * 0.72
                },
                {
                    x: w * 0.62,
                    y: h * 0.67
                }
            );

            break;


        case "dal":

            curve(
                {
                    x: w * 0.70,
                    y: h * 0.30
                },
                {
                    x: w * 0.58,
                    y: h * 0.52
                },
                {
                    x: w * 0.30,
                    y: h * 0.48
                }
            );

            break;


        case "ra":

            curve(
                {
                    x: w * 0.70,
                    y: h * 0.32
                },
                {
                    x: w * 0.55,
                    y: h * 0.50
                },
                {
                    x: w * 0.35,
                    y: h * 0.72
                }
            );

            break;


        case "seen":

            line(
                w * 0.72,
                h * 0.55,
                w * 0.60,
                h * 0.35
            );

            line(
                w * 0.60,
                h * 0.35,
                w * 0.50,
                h * 0.55
            );

            line(
                w * 0.50,
                h * 0.55,
                w * 0.40,
                h * 0.35
            );

            line(
                w * 0.40,
                h * 0.35,
                w * 0.28,
                h * 0.55
            );

            break;


        case "sad":

            curve(
                {
                    x: w * 0.76,
                    y: h * 0.35
                },
                {
                    x: w * 0.58,
                    y: h * 0.20
                },
                {
                    x: w * 0.38,
                    y: h * 0.45
                }
            );

            curve(
                {
                    x: w * 0.38,
                    y: h * 0.45
                },
                {
                    x: w * 0.45,
                    y: h * 0.70
                },
                {
                    x: w * 0.70,
                    y: h * 0.55
                }
            );

            break;


        case "taa":

            line(
                cx,
                45,
                cx,
                h * 0.65
            );

            curve(
                {
                    x: w * 0.72,
                    y: h * 0.45
                },
                {
                    x: w * 0.55,
                    y: h * 0.70
                },
                {
                    x: w * 0.30,
                    y: h * 0.52
                }
            );

            break;


        case "ain":

            curve(
                {
                    x: w * 0.75,
                    y: h * 0.30
                },
                {
                    x: w * 0.50,
                    y: h * 0.20
                },
                {
                    x: w * 0.45,
                    y: h * 0.48
                }
            );

            curve(
                {
                    x: w * 0.45,
                    y: h * 0.48
                },
                {
                    x: w * 0.40,
                    y: h * 0.72
                },
                {
                    x: w * 0.70,
                    y: h * 0.60
                }
            );

            break;


        case "fa":

            curve(
                {
                    x: w * 0.75,
                    y: h * 0.35
                },
                {
                    x: w * 0.60,
                    y: h * 0.65
                },
                {
                    x: w * 0.30,
                    y: h * 0.50
                }
            );

            break;


        case "qaf":

            curve(
                {
                    x: w * 0.75,
                    y: h * 0.35
                },
                {
                    x: w * 0.60,
                    y: h * 0.65
                },
                {
                    x: w * 0.30,
                    y: h * 0.50
                }
            );

            break;


        case "kaf":

            line(
                w * 0.65,
                h * 0.25,
                w * 0.55,
                h * 0.70
            );

            curve(
                {
                    x: w * 0.65,
                    y: h * 0.40
                },
                {
                    x: w * 0.45,
                    y: h * 0.45
                },
                {
                    x: w * 0.30,
                    y: h * 0.60
                }
            );

            break;


        case "lam":

            line(
                w * 0.60,
                40,
                w * 0.40,
                h - 50,
                45
            );

            break;


        case "meem":

            curve(
                {
                    x: w * 0.70,
                    y: h * 0.40
                },
                {
                    x: w * 0.55,
                    y: h * 0.20
                },
                {
                    x: w * 0.35,
                    y: h * 0.45
                }
            );

            curve(
                {
                    x: w * 0.35,
                    y: h * 0.45
                },
                {
                    x: w * 0.40,
                    y: h * 0.70
                },
                {
                    x: w * 0.65,
                    y: h * 0.65
                }
            );

            break;


        case "noon":

            curve(
                {
                    x: w * 0.72,
                    y: h * 0.35
                },
                {
                    x: w * 0.60,
                    y: h * 0.65
                },
                {
                    x: w * 0.30,
                    y: h * 0.48
                }
            );

            break;


        case "haa":

            curve(
                {
                    x: w * 0.70,
                    y: h * 0.35
                },
                {
                    x: w * 0.50,
                    y: h * 0.15
                },
                {
                    x: w * 0.35,
                    y: h * 0.45
                }
            );

            curve(
                {
                    x: w * 0.35,
                    y: h * 0.45
                },
                {
                    x: w * 0.55,
                    y: h * 0.70
                },
                {
                    x: w * 0.70,
                    y: h * 0.45
                }
            );

            break;


        case "waw":

            curve(
                {
                    x: w * 0.60,
                    y: h * 0.25
                },
                {
                    x: w * 0.30,
                    y: h * 0.30
                },
                {
                    x: w * 0.50,
                    y: h * 0.55
                }
            );

            curve(
                {
                    x: w * 0.50,
                    y: h * 0.55
                },
                {
                    x: w * 0.60,
                    y: h * 0.70
                },
                {
                    x: w * 0.40,
                    y: h * 0.78
                }
            );

            break;


        case "ya":

            curve(
                {
                    x: w * 0.72,
                    y: h * 0.35
                },
                {
                    x: w * 0.60,
                    y: h * 0.65
                },
                {
                    x: w * 0.30,
                    y: h * 0.48
                }
            );

            break;


        case "singleTopDot":

            line(
                cx - 5,
                h * 0.18,
                cx + 5,
                h * 0.18,
                5
            );

            break;


        case "singleBottomDot":

            line(
                cx - 5,
                h * 0.72,
                cx + 5,
                h * 0.72,
                5
            );

            break;


        case "taDots":

            line(
                cx - 25,
                h * 0.20,
                cx - 25,
                h * 0.20,
                2
            );

            line(
                cx + 25,
                h * 0.20,
                cx + 25,
                h * 0.20,
                2
            );

            break;


        case "thaDots":

            line(
                cx - 30,
                h * 0.18,
                cx - 30,
                h * 0.18,
                2
            );

            line(
                cx,
                h * 0.15,
                cx,
                h * 0.15,
                2
            );

            line(
                cx + 30,
                h * 0.18,
                cx + 30,
                h * 0.18,
                2
            );

            break;


        case "taDotsBottom":

            line(
                cx - 25,
                h * 0.78,
                cx - 25,
                h * 0.78,
                2
            );

            line(
                cx + 25,
                h * 0.78,
                cx + 25,
                h * 0.78,
                2
            );

            break;

    }

    return points;
}


/* =========================================================
   GET ALL STROKES
========================================================= */

function getCurrentPaths() {

    return letters[currentLetter]
        .strokes
        .map(type => generatePath(type));
}


/* =========================================================
   DRAW GUIDES
========================================================= */

function drawGuide() {

    clearVisual();

    if (freeDrawMode) {
        return;
    }

    const paths = getCurrentPaths();

    paths.forEach((path, index) => {

        if (!path.length) return;

        for (
            let i = 0;
            i < path.length;
            i += 2
        ) {

            const p = path[i];

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                index === currentStroke && i === 0
                    ? "#1765df"
                    : "#b8b8b8";

            ctx.fill();
        }
    });
}


/* =========================================================
   CLEAR VISUAL
========================================================= */

function clearVisual() {

    ctx.clearRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );
}


/* =========================================================
   CANVAS RESIZE
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    drawGuide();
}

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   POINTER POSITION
========================================================= */

function getPointer(event) {

    const rect =
        canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


/* =========================================================
   START
========================================================= */

canvas.addEventListener(
    "pointerdown",
    event => {

        if (drawingFinished) {
            return;
        }

        event.preventDefault();

        const point =
            getPointer(event);

        if (!freeDrawMode) {

            const paths =
                getCurrentPaths();

            const path =
                paths[currentStroke];

            if (!path || !path.length) {
                return;
            }

            const start =
                path[0];

            if (
                distance(point, start) > 45
            ) {

                showWrong();

                return;
            }
        }

        isDrawing = true;

        userPoints = [point];

        currentPoint = 0;

        canvas.setPointerCapture(
            event.pointerId
        );

        drawPoint(point);
    }
);


/* =========================================================
   DRAW
========================================================= */

canvas.addEventListener(
    "pointermove",
    event => {

        if (!isDrawing) {
            return;
        }

        event.preventDefault();

        const point =
            getPointer(event);

        userPoints.push(point);

        drawPoint(point);

        if (!freeDrawMode) {

            if (!validatePoint(point)) {

                finish(false);

                return;
            }
        }
    }
);


/* =========================================================
   DRAW USER STROKE
========================================================= */

function drawPoint(point) {

    if (userPoints.length < 2) {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#1765df";

        ctx.fill();

        return;
    }

    const previous =
        userPoints[
            userPoints.length - 2
        ];

    ctx.beginPath();

    ctx.moveTo(
        previous.x,
        previous.y
    );

    ctx.lineTo(
        point.x,
        point.y
    );

    ctx.strokeStyle =
        "#1765df";

    ctx.lineWidth = 7;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();
}


/* =========================================================
   VALIDATE
========================================================= */

function validatePoint(point) {

    const paths =
        getCurrentPaths();

    const path =
        paths[currentStroke];

    if (!path) {
        return true;
    }

    let nearest = Infinity;
    let nearestIndex = -1;

    const searchStart =
        Math.max(
            0,
            currentPoint - 4
        );

    const searchEnd =
        Math.min(
            path.length - 1,
            currentPoint + 15
        );


    for (
        let i = searchStart;
        i <= searchEnd;
        i++
    ) {

        const d =
            distance(
                point,
                path[i]
            );

        if (d < nearest) {

            nearest = d;

            nearestIndex = i;
        }
    }


    /*
        Drawing too far away
        from the dotted path.
    */

    if (nearest > 38) {
        return false;
    }


    /*
        Don't allow going backwards.
    */

    if (
        nearestIndex <
        currentPoint - 8
    ) {

        return false;
    }


    currentPoint =
        Math.max(
            currentPoint,
            nearestIndex
        );


    /*
        Stroke completed.
    */

    if (
        currentPoint >=
        path.length - 3
    ) {

        currentStroke++;

        currentPoint = 0;

        userPoints = [];

        /*
            All strokes completed.
        */

        if (
            currentStroke >=
            paths.length
        ) {

            setTimeout(() => {

                finish(true);

            }, 150);

            return true;
        }


        /*
            Redraw guides so the next
            stroke's starting point
            becomes blue.
        */

        drawGuide();
    }

    return true;
}


/* =========================================================
   POINTER UP
========================================================= */

canvas.addEventListener(
    "pointerup",
    event => {

        if (!isDrawing) {
            return;
        }

        isDrawing = false;

        if (freeDrawMode) {
            finish(true);
            return;
        }


        const paths =
            getCurrentPaths();

        /*
            Student released pointer before
            completing the current stroke.
        */

        if (
            currentStroke <
            paths.length
        ) {

            finish(false);
        }
    }
);


/* =========================================================
   FINISH
========================================================= */

function finish(correct) {

    isDrawing = false;

    drawingFinished = true;

    if (correct) {

        showCorrect();

    } else {

        showWrong();
    }
}


/* =========================================================
   CORRECT
========================================================= */

function showCorrect() {

    result.className =
        "result correct";

    result.textContent = "✓";

    streak++;

    updateStreak();


    /*
        5 consecutive correct
        → free drawing.
    */

    if (streak >= 5) {

        setTimeout(
            activateFreeDraw,
            900
        );

        return;
    }


    setTimeout(() => {

        clearCanvas();

    }, 900);
}


/* =========================================================
   WRONG
========================================================= */

function showWrong() {

    result.className =
        "result wrong";

    result.textContent = "✕";

    /*
        Important:
        3 correct + 4th wrong
        resets all 3.
    */

    streak = 0;

    updateStreak();


    setTimeout(() => {

        clearCanvas();

    }, 900);
}


/* =========================================================
   CLEAR
========================================================= */

function clearCanvas() {

    isDrawing = false;

    drawingFinished = false;

    currentStroke = 0;

    currentPoint = 0;

    userPoints = [];

    result.className = "result";

    result.textContent = "";

    drawGuide();
}


/* =========================================================
   DISTANCE
========================================================= */

function distance(a, b) {

    const dx =
        a.x - b.x;

    const dy =
        a.y - b.y;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


/* =========================================================
   STREAK
========================================================= */

function updateStreak() {

    streakDisplay.textContent =
        `${streak} / 5`;
}


/* =========================================================
   FREE DRAW
========================================================= */

function activateFreeDraw() {

    freeDrawMode = true;

    document.body.classList.add(
        "free-mode"
    );

    clearVisual();

    result.className =
        "result correct";

    result.textContent = "✓";


    document.getElementById(
        "instructionArabic"
    ).textContent =
        "ارسم الحرف من الذاكرة";


    document.getElementById(
        "instructionEnglish"
    ).textContent =
        "Draw the letter from memory";


    document.getElementById(
        "tipArabic"
    ).textContent =
        "أحسنت! الآن ارسم الحرف بدون الخط المنقط";


    document.getElementById(
        "tipEnglish"
    ).textContent =
        "Great! Now draw the letter without the dotted line";


    setTimeout(() => {

        result.className = "result";

        result.textContent = "";

    }, 1200);
}


/* =========================================================
   NEXT LETTER
========================================================= */

function nextLetter() {

    currentLetter++;

    if (
        currentLetter >=
        letters.length
    ) {

        currentLetter = 0;
    }

    streak = 0;

    freeDrawMode = false;

    document.body.classList.remove(
        "free-mode"
    );

    updateStreak();

    const data =
        letters[currentLetter];


    document.getElementById(
        "letterDisplay"
    ).textContent =
        data.letter;


    document.getElementById(
        "letterArabicName"
    ).textContent =
        data.arabicName;


    document.getElementById(
        "letterEnglishName"
    ).textContent =
        data.englishName;


    document.getElementById(
        "tipArabic"
    ).textContent =
        data.tipArabic;


    document.getElementById(
        "tipEnglish"
    ).textContent =
        data.tipEnglish;


    document.getElementById(
        "instructionArabic"
    ).textContent =
        "تتبع الحرف على الخط المنقط";


    document.getElementById(
        "instructionEnglish"
    ).textContent =
        "Trace the letter on the dotted line";


    clearCanvas();
}


/* =========================================================
   SOUND
========================================================= */

function playLetterSound() {

    const data =
        letters[currentLetter];

    const speech =
        new SpeechSynthesisUtterance(
            data.letter
        );

    speech.lang = "ar-SA";

    speech.rate = 0.7;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   BACK
========================================================= */

function goBack() {

    window.history.back();
}


/* =========================================================
   INITIALIZE
========================================================= */

resizeCanvas();