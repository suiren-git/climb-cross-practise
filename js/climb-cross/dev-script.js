document.addEventListener("DOMContentLoaded", function () {
    /* ------------------------------------------
        問題作成用
    ------------------------------------------ */
    let generate01, generate02, generate03;
    let flag = 0;

    /* サークル有無 + 近遠の組み合わせ8種類のデータ
    ------------------------------------------ */
    const correctAnswers = {
        "1_遠遠": { div1: "動かない", div2: "外", div3: "外", div4: "中" },
        "1_遠近": { div1: "動かない", div2: "中", div3: "外", div4: "外" },
        "1_近近": { div1: "動かない", div2: "中", div3: "中", div4: "外" },
        "1_近遠": { div1: "動かない", div2: "外", div3: "中", div4: "中" },
        "2_遠遠": { div1: "外", div2: "中", div3: "中", div4: "外" },
        "2_遠近": { div1: "外", div2: "外", div3: "中", div4: "中" },
        "2_近近": { div1: "中", div2: "外", div3: "外", div4: "中" },
        "2_近遠": { div1: "中", div2: "中", div3: "外", div4: "外" },
    };

    /* ポジション用
    ------------------------------------------ */
    const positionSelect = document.getElementById('positionSelect');
    const positionLabel = document.getElementById('positionLabel');
    const positionLabelAns01 = document.getElementById('positionLabelAns01');
    const positionLabelAns02 = document.getElementById('positionLabelAns02');
    const positionLabelAns03 = document.getElementById('positionLabelAns03');
    const positionLabelAns04 = document.getElementById('positionLabelAns04');

    /* ロールポジション初期
    ------------------------------------------ */
    const positions = {
        MT: { x: -18, y: -37 },
        ST: { x: 18, y: -37 },
        H1: { x: -35, y: -13 },
        H2: { x: 35, y: -13 },
        D1: { x: -18, y: 37 },
        D2: { x: 18, y: 37 },
        D3: { x: -35, y: 13 },
        D4: { x: 35, y: 13 }
    };

    /* ロールポジション移動後
    ------------------------------------------ */
    const moveAmounts = {
        MT: { 外: { x: -8, y: -15 }, 中: { x: 8, y: 10 } , 動かない: { x:18, y: 0 } },
        ST: { 外: { x: 8, y: -15 }, 中: { x: -8, y: 10 }, 動かない: { x:-18, y: 0 } },
        H1: { 外: { x: -20, y: -8 }, 中: { x: 8, y: 5 }, 動かない: { x:35, y: -24 } },
        H2: { 外: { x: 20, y: -8 }, 中: { x: -8, y: 5 }, 動かない: { x:-35, y: -24 } },
        D1: { 外: { x: -12, y: 15 }, 中: { x: 8, y: -12 }, 動かない: { x:18, y: 0 } },
        D2: { 外: { x: 12, y: 15 }, 中: { x: -8, y: -12 }, 動かない: { x:-18, y: 0 } },
        D3: { 外: { x: -23, y: 7 }, 中: { x: 7, y: -3 }, 動かない: { x:35, y: 14 } },
        D4: { 外: { x: 23, y: 0 }, 中: { x: -7, y: -3 }, 動かない: { x:-35, y: 14 } }
      };


    /* ------------------------------------------
        組み合わせを生成
    ------------------------------------------ */
    document.getElementById("generateBtn").addEventListener("click",function(){
        const setText = (elementId,choices) => {
        const element = document.getElementById(elementId);
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    
        /* テキストの設定
        ------------------------------------------ */
        element.textContent = randomChoice.text;
    
        /* 再ジェネレート時にクラスのリセット
        ------------------------------------------ */
        element.classList.remove("generate-circle--on", "generate-circle--off");
    
        /* 必要なクラスを追加
        ------------------------------------------ */
        element.classList.add("container__item",randomChoice.class);
        };
    
        setText("generate01", [
            { text: "有", class: "generate-circle--on" },
            { text: "なし", class:"generate-circle--off"}
        ]);

        /* setTextの内容に合わせflag設定
        ------------------------------------------ */
        const selectedText = document.getElementById("generate01").textContent;

        if (selectedText === "有") {
            flag = 1;
        } else if (selectedText === "なし") {
            flag = 2;
        } else {
            console.warn("generate01 のテキストが想定外:", selectedText);
        }
    
        /* 値を取得する
        ------------------------------------------ */
        const areas = [
            document.getElementById("generate02"),
            document.getElementById("generate03")
        ];
    
        areas.forEach(area => {
        const label = area.querySelector(".label");
    
        /* ランダム選択
        ------------------------------------------ */
        const randomClass = Math.random() < 0.5 ? "generate-climb--near" : "generate-climb--far";
        area.classList.remove("generate-climb--near", "generate-climb--far");
        area.classList.add(randomClass);
    
        label.textContent = randomClass === "generate-climb--near" ? "近" : "遠";
    
        });

    });

    /* ------------------------------------------
        ポジションセレクト用
    ------------------------------------------ */
    positionSelect.addEventListener('change', function () {
        const selectedPosition = positionSelect.value;
        const pos = positions[selectedPosition];

        /* すべての色クラスを削除
        ------------------------------------------ */
        positionLabel.classList.remove("position-name--blue", "position-name--green","position-name--red");
        positionLabelAns01.classList.remove("position-name--blue", "position-name--green","position-name--red");
        positionLabelAns02.classList.remove("position-name--blue", "position-name--green","position-name--red");
        positionLabelAns03.classList.remove("position-name--blue", "position-name--green","position-name--red");
        positionLabelAns04.classList.remove("position-name--blue", "position-name--green","position-name--red");
        
        /* ------ 選択したポジションでクラス追加 ------ */
        if (selectedPosition === "MT" || selectedPosition === "ST") {
            positionLabel.classList.add("position-name--blue");
            positionLabelAns01.classList.add("position-name--blue");
            positionLabelAns02.classList.add("position-name--blue");
            positionLabelAns03.classList.add("position-name--blue");
            positionLabelAns04.classList.add("position-name--blue");
        } else if (selectedPosition === "H1" || selectedPosition === "H2") {
            positionLabel.classList.add("position-name--green");
            positionLabelAns01.classList.add("position-name--green");
            positionLabelAns02.classList.add("position-name--green");
            positionLabelAns03.classList.add("position-name--green");
            positionLabelAns04.classList.add("position-name--green");
        } else if (selectedPosition === "D1" || selectedPosition === "D2" || selectedPosition === "D3" || selectedPosition === "D4") {
            positionLabel.classList.add("position-name--red");
            positionLabelAns01.classList.add("position-name--red");
            positionLabelAns02.classList.add("position-name--red");
            positionLabelAns03.classList.add("position-name--red");
            positionLabelAns04.classList.add("position-name--red");
        }

        /* ポジション用ラベルの位置変更
        ------------------------------------------ */
        positionLabel.setAttribute('x', pos.x);
        positionLabel.setAttribute('y', pos.y);
        /* ------ ラベルの内容も更新 ------ */
        positionLabel.textContent = selectedPosition;

        /* 回答用ラベルの位置変更
        ------------------------------------------ */
        positionLabelAns01.setAttribute('x', pos.x);
        positionLabelAns01.setAttribute('y', pos.y);
        positionLabelAns01.textContent = selectedPosition;

        positionLabelAns02.setAttribute('x', pos.x);
        positionLabelAns02.setAttribute('y', pos.y);
        positionLabelAns02.textContent = selectedPosition;

        positionLabelAns03.setAttribute('x', pos.x);
        positionLabelAns03.setAttribute('y', pos.y);
        positionLabelAns03.textContent = selectedPosition;

        positionLabelAns04.setAttribute('x', pos.x);
        positionLabelAns04.setAttribute('y', pos.y);
        positionLabelAns04.textContent = selectedPosition;
    });

    /* ------------------------------------------
        移動後の座標処理
    ------------------------------------------ */
    document.getElementById('checkBtn').addEventListener('click', () => {
        const selectedPosition = document.getElementById('positionSelect').value;
        if (!positions[selectedPosition]) {
            console.error('Invalid selectedPosition:', selectedPosition);
            /* ------ ↓位置が無効な場合、処理を中止↓ ------ */
            return;
        }
        const basePos = positions[selectedPosition];
    
        /* ラベルと対応するラジオボタンをまとめて処理
        ------------------------------------------ */
        for (let i = 1; i <= 4; i++) {
            const label = document.getElementById(`positionLabelAns0${i}`);
            const radioValue = document.querySelector(`input[name="div${i}"]:checked`).value;
    
          /* ------ 対応するロールの移動量を取得 ------ */
            const move = moveAmounts[selectedPosition][radioValue];
    
            label.setAttribute('x', basePos.x + move.x);
            label.setAttribute('y', basePos.y + move.y);
            label.textContent = selectedPosition;
        }
      });

    /* ------------------------------------------
        SVG色変更
    ------------------------------------------ */
    /* 南北チーム分け
    ------------------------------------------ */
    function getTeamFromSelect() {
        const val = document.getElementById("positionSelect").value;
        const team1 = ["MT", "ST", "H1", "H2"];
        return team1.includes(val) ? 1 : 2;
    }
    /* パス生成
    ------------------------------------------ */
    /* ------ 外円用 ------ */
    function getPath(isTop) {
        return isTop
        /* --- 上半分 --- */
        ? "M -90 0 A 90 90 0 0 1 90 0 L 0 0 Z"
        /* --- 下半分 --- */
        : "M 90 0 A 90 90 0 0 1 -90 0 L 0 0 Z";
    }
    /* ------ 内円用 ------ */
    function getInnerPath(isTop) {
        return isTop
        /* --- 上半分 --- */
        ? "M -50 0 A 50 50 0 0 1 50 0 L 0 0 Z"
        /* --- 下半分 --- */
        : "M 50 0 A 50 50 0 0 1 -50 0 L 0 0 Z";
    }

    /* SVG塗りつぶし更新
    ------------------------------------------ */
    function updateSVGFill(flipPattern = [false, false, false,false]) {
        const team = getTeamFromSelect();

        /* ------ パターン定義。true＝上 false＝下 ------ */
        const patternMap = {
        "1-1": [false, true, false, true],
        "2-1": [true, false, true, false],
        "1-2": [true, false, true, false],
        "2-2": [false, true, false, true],
        };

        let pattern = patternMap[`${flag}-${team}`];

        pattern.forEach((isTop, i) => {
            const original = isTop;
            const flip = flipPattern?.[i] || false;  // 反転フラグがあるかチェック
            const adjusted = flip ? !original : original;




            /* ------ 処理 ------ */
            const svgNum = String(i + 1).padStart(2,'0');
            const inPath = document.getElementById(`insvg-fill-${svgNum}`);
            const outPath = document.getElementById(`outsvg-fill-${svgNum}`);

            if (inPath) {
                inPath.setAttribute("d", getInnerPath(adjusted));
            }
        
            if (outPath) {
                outPath.setAttribute("d", getPath(adjusted));
            }
        });
    }

    /* ------------------------------------------
        回答チェック処理
    ------------------------------------------ */
    document.getElementById("checkBtn").addEventListener("click", function () {
        let score = 0;
        /* 現在の正解パターンを取得
        ------------------------------------------ */
        /* ------ 値を取得する ------ */
        const generate02 = document.getElementById("generate02");
        const generate03 = document.getElementById("generate03");
        
        const generate02Label = generate02.querySelector(".label").textContent;
        const generate03Label = generate03.querySelector(".label").textContent;
        const key = `${flag}_${generate02Label}${generate03Label}`;
        const correctSet = correctAnswers[key];

        /* ユーザーが選択したラジオボタンの値を取得
        ------------------------------------------ */
        for (let j = 1; j <= 4; j++) {  // 変数名を j に変更
            const div = document.querySelector(`input[name="div${j}"]:checked`);
            if (!div) {
                document.querySelector(`input[name="div${j}"]:first-child`).checked = true;
            }
        }
        const userAnswers = {
            div1: document.querySelector(`input[name="div1"]:checked`),
            div2: document.querySelector(`input[name="div2"]:checked`),
            div3: document.querySelector(`input[name="div3"]:checked`),
            div4: document.querySelector(`input[name="div4"]:checked`),
        };
        

        // ▼そのあとに flipPattern を生成
        const flipPattern = Object.entries(userAnswers).map(([key, answer]) => {
            const correct = correctSet[key];
            return flag === 2 && answer && answer.value !== correct;
        });


        

        /* 結果表示用の要素を取得
        ------------------------------------------ */
        const generateElements = {
            div1: document.getElementById("answer01"),
            div2: document.getElementById("answer02"),
            div3: document.getElementById("answer03"),
            div4: document.getElementById("answer04"),
        };

        /* ------ 既存の.note-textをすべて削除 ------ */
        document.querySelectorAll(".note-text").forEach(el => el.remove());


        /* ------ div1～div4割り振り用 ------ */
        let i = 0;


        /* 回答チェックと結果表示
        ------------------------------------------ */
        for (let key in userAnswers) {
            const resultElement = generateElements[key];

            if (userAnswers[key]) {
                if (userAnswers[key].value === correctSet[key]) {
                    score++;
                    resultElement.textContent = `結果: 〇`;
                } else {
                    resultElement.textContent = `結果: ×`;
                     // デバッグ用ログ
                    /* ------ 補足用 ------ */
                    const note = document.createElement("div");
                    note.className = "note-text";
                    if (key === "div1" && flag === 1) {
                        note.textContent = "連続ドーナツ範囲中のためHP0になる確率大";
                        resultElement.appendChild(note);
                    } else if (flag === 2) {
                        note.textContent = "自分or味方に二度付け禁止デバフが重なる確率大";
                        resultElement.appendChild(note);
                    }

                    if (flag === 2) {
                        flipPattern[i] = true;
                    }
                }
            } else {
                generateElements[key].textContent = `結果: 未選択`;
                generateElements[key].style.color = "black";
            }

            i++;
        }

        /*---SVG塗りつぶし実行---*/
        updateSVGFill(flipPattern);
    });

});
