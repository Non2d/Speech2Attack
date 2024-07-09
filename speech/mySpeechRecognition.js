class MySpeechRecognition {
    constructor(player = "") {
        this.recognition = null;
        this.finalTranscript = "";
        this.interimTranscript = "";
        this.startButton = null;
        this.button = null;
        this.isRunning = false;
        this.response = "";

        this.typePower = { "fire": 1, "ice": 1, "volt": 1 }
        this.previousSpeechList = [];
        this.repeated = false;

        this.player = player;

        this.init();

        this.previousKeyIsDownE = false;
    }

    init() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.interimResults = true;
            this.recognition.continuous = false; //stop押さない限りずっと録音し続ける

            this.recognition.onresult = (event) => {
                this.interimTranscript = '';
                this.finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        this.finalTranscript += transcript;
                    } else {
                        this.interimTranscript += transcript;
                    }
                }
            };

            this.button = new Button({
                x: width - 300,
                y: height - 300,
                w: 200,
                h: 200,
                sizeOfText: 50,
                label: "音声\n認識",
                onClick: () => {
                    // 押ボタン式からEキーに変更
                    // if (this.isRunning) {
                    //     this.recognition.stop();
                    // } else if (this.calcGauge() == 1){
                    //     this.finalTranscript="";
                    //     this.interimTranscript="";
                    //     this.recognition.lang = "ja-JP";
                    //     this.recognition.start();
                    // }
                },
            });

            this.recognition.onerror = (event) => {
                console.error('音声認識エラー:', event.error);
            };
            this.recognition.onstart = () => {
                this.isRunning = true;
                this.button.label = "停止"
            }
            this.recognition.onend = () => {
                if (this.player !== "") this.player.eventPoint = 0;
                this.isRunning = false;
                this.button.label = "音声\n認識";
                if (this.finalTranscript !== "") {
                    if (this.previousSpeechList.includes(this.finalTranscript)) {
                        this.typePower = { "fire": 1, "ice": 1, "volt": 1 }
                        this.repeated = true;
                        console.warn("同じプロンプトを繰り返してはいけません．");
                    } else {
                        this.setTypePowerByGPT(this.finalTranscript);
                        this.repeated = false;
                    }
                    this.previousSpeechList.push(this.finalTranscript);

                    //10秒後にリセット
                    setTimeout(() => {
                        this.finalTranscript = "";
                        this.interimTranscript = "";
                    }, 10000);
                }
            }
        } else {
            createP('申し訳ありませんが、お使いのブラウザは音声認識をサポートしていません。').position(10, 90);
        }
    }

    // eキーで音声認識
    toggleAsr({ key }) {
        if (keyIsDown(keyCodeDict[key]) && !this.previousKeyIsDownE) {
            if (this.isRunning) {
                this.recognition.stop();
            } else if (this.calcGauge() == 1) {
                this.finalTranscript = "";
                this.interimTranscript = "";
                this.recognition.lang = "ja-JP";
                this.recognition.start();
            }
        }
        this.previousKeyIsDownE = keyIsDown(keyCodeDict[key]);
    }

    calcGauge() {
        if (this.player === "") {
            return 1;
        }
        let raw_rate = this.player.eventPoint / 50;
        if (raw_rate > 1) {
            return 1;
        } else if (raw_rate < 0) {
            return 0;
        }
        return raw_rate;
    }

    display() {
        //calc
        this.button.handleClick();

        //draw
        // 文字起こし表示
        textSize(50);
        fill(150);
        text(this.interimTranscript, width / 2, 100);

        this.repeated ? fill(255, 0, 0) : fill(0);
        textSize(50);
        textAlign(CENTER, TOP);
        if (this.finalTranscript !== "") {
            this.recognition.stop();
        }
        text(this.finalTranscript, width / 2, 100);
        textSize(40);

        if (this.repeated) {
            text("同じプロンプトは繰り返せません", width / 2, 170);
        }

        //音声認識ボタン
        this.button.displayCircleGauge(this.calcGauge());

        fill(0);
        stroke(200);
        strokeWeight(10);
        text("E", width - 300 + 170, height - 280);
    }

    setTypePowerByGPT(prompt) {
        const data = { text: prompt };
        fetch('http://localhost:8000/gpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', prompt, data);
                this.response = JSON.parse(data.response);
                this.typePower = { "fire": this.response[0], "ice": this.response[1], "volt": this.response[2] };
            })
            .catch((error) => {
                console.error('Error:', error);
                this.response = data;
            });
        // return { "fire": this.response[0], "ice": this.response[1], "volt": this.response[2]};
        // 非同期処理なので，ここでreturnしてもundefinedになる
    }

    displayTypePower() {
        //マジで緊急措置
        if(this.typePower.fire>10){
            this.player.buff = "fire";
        } else if(this.typePower.ice>10){
            this.player.buff = "ice";
        } else if (this.typePower.volt>10){
            this.player.buff = "volt";
        } else {
            this.player.buff = "";
        }
        //fire type power
        noStroke(0);
        fill(0);
        text("炎 " + this.typePower.fire, width - 100, 50);
        text("氷 " + this.typePower.ice, width - 100, 100);
        text("電 " + this.typePower.volt, width - 100, 150);
    }
}