
## 概要

JS で Twitter API を叩く練習。以下 `npm install` でインストールして使うパッケージ。

- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) : node 環境で使える twitter API v2 のラッパーライブラリ
- [dotenv](https://github.com/motdotla/dotenv) : カレントディレクトリに置かれた `.env` ファイルから環境変数を読むためのライブラリ
- [date-fns](https://github.com/date-fns/date-fns) : 日付操作のライブラリ
- [csv-stringify](https://github.com/adaltas/node-csv/tree/master/packages/csv-stringify) : CSV のパースライブラリ

## セットアップ方法

Node.js とツールチェインの管理ツールである[Volta](https://volta.sh)を Homebrew でインストール。`package.json` でバージョン固定(`volta pin node`)してあるのでそのバージョンの Node と npm を使用する。

```sh
# node のLTS版がインストールされる(16.15.1)
# npm も同時にインストールされる
$ brew install volta
```

`VOLTA_HOME` 環境変数に `$HOME/.volta` をセットして、`PATH` に `$VOLTA_HOME/bin` を追加する。fish shell の場合は `config.fish` に以下の内容を記載する。

```sh:config.fish
# fish
set -gx VOLTA_HOME $HOME/.volta
fish_add_path $VOLTA_HOME/bin
```

`package.json` に記載されている依存関係を以下のコマンドでローカルインストールできる。

```sh
$ mkdir my-project
$ cd ./my-project
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

`package.json` ファイルの scripts セクション(npm-scripts)に指定したコマンド `npm start` で `index.js` を実行できる。

```sh
$ npm start

> twitter-v2-test@1.0.0 start
> node index.js

# オブジェクトの配列で取得ツイートが出力される
--> succeed writing date!
```

