
## 概要

JS で Twitter API を叩く練習。以下 `npm install` でインストールして使うパッケージ。

- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) : node 環境で使える twitter API v2 のラッパー
- [dotenv](https://github.com/motdotla/dotenv) : カレントディレクトリに置かれた `.env` ファイルから環境変数を読むためのモジュール

## セットアップ方法

Node.js とツールチェインの管理ツールである[Volta](https://volta.sh)をインストール。`package.json` でバージョン固定(`volta pin node`)してあるのでそのバージョンの Node と npm を使用する。

依存関係を以下のコマンドでローカルインストール。

```sh
$ npm install
```

## クエリ構築

`index.js` ファイルの以下の箇所を変更することでクエリを構築できる。

```js
const words = "非同期処理";
const options = { 
  "media.fields": "url",
  "max_results": 10,
};
```

## 実行

`package.json` ファイルにの scripts セクション(npm-scripts)で指定したコマンド `npm start` で `index.js` を実行できる。

```sh
$ npm start

> twitter-v2-test@1.0.0 start
> node index.js

# オブジェクトの配列で取得ツイートが出力される
```

