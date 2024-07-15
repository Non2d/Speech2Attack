# Speech2Attack

## プレイ動画

- [YouTube プレイ動画](https://youtu.be/G-0TokT1WeM](https://www.youtube.com/watch?v=D6ZarGYNLLs)

## 概要

自由なプロンプトで強化した武器を使って、3種類の属性をもつ敵をなぎ倒そう！強力なプロンプトを唱えることが攻略の鍵となります。

## 操作方法

- **マウス**: エイム
- **W, A, S, Dキー**: 上下左右へ移動
- **左クリック(長押し可)**: 射撃

## 動作環境

- **対応ブラウザ**: Web Speech APIの動作する環境。現時点ではChromeのみ対応しています。
- **注意事項**: お手元のブラウザでプレイするためには、OpenAI API KeyまたはGroq API Keyを環境変数に設定していただく必要があります。

## 起動方法

- git clone

OpenAI API(gpt-4oモデル)を使用する場合(有料)
- backend/.env.exampleのファイル名を.envに変更し、OPENAI_API_KEYを追加してください。
- cd backend -> python main.py

Groq API(llama3-70b-8192モデル)を使用する場合(無料)
- https://console.groq.com/playground こちらでGroq API Keyを取得してください。
- backend/.env.exampleのファイル名を.envに変更し、GROQ_API_KEYを追加してください。
- cd backend -> python main-groq.py

- (VSCodeを使用している場合) index.htmlをLive Serverで開いて下さい

## 技術
- フロントエンド:p5.js
- バックエンド:FastAPI, OpenAI API, Groq API
- 音声認識:Web Speech API

## 是非プレイしてください！
