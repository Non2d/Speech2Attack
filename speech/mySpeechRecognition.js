class MySpeechRecognition {
    constructor() {
        this.recognition = null;
        this.finalTranscript = "";
        this.interimTranscript = "";
        this.startButton = null;
        this.button = null;
        this.isRunning = false;
        this.response = "";

        this.init();
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
                x: width-150,
                y: height-150,
                w: 100,
                h: 100,
                sizeOfText: 40,
                label: "音声\n認識",
                onClick: () => {
                    if (this.isRunning) {
                        this.recognition.stop();
                    } else {
                        this.finalTranscript="";
                        this.interimTranscript="";
                        this.recognition.lang = "ja-JP";
                        this.recognition.start();
                    }
                },
            });

            this.recognition.onerror = (event) => {
                console.error('音声認識エラー:', event.error);
            };
            this.recognition.onstart = () => {
                this.isRunning = true;
                this.button.label = "一時\n停止"
            }
            this.recognition.onend = () => {
                this.isRunning = false;
                this.button.label = "音声\n認識"
                if(this.finalTranscript !== ""){
                    this.sendGroq(this.finalTranscript);
                }
            }
        } else {
            createP('申し訳ありませんが、お使いのブラウザは音声認識をサポートしていません。').position(10, 90);
        }
    }

    display() {
        this.button.handleClick();

        fill(0);
        textSize(24);
        textAlign(LEFT, TOP);
        if (this.finalTranscript !== "") {
            this.recognition.stop();
        }
        text("スピーチ内容：" + this.finalTranscript, 650, 140);

        fill(150);
        text(this.interimTranscript, 10, 180);

        fill(0);
        textSize(15);
        text("response:", 650, 170);
        text(this.response, 650, 200);
        
        this.button.display();
    }

    sendGroq(prompt) {
        const data = { text: prompt };
        fetch('http://localhost:8000/groq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', prompt, data);
            this.response = data.response;
            console.log(data.word_counts)
        })
        .catch((error) => {
            console.error('Error:', error);
            this.response = data;
        });
    }
}