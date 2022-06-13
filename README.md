
## 概要

JS で Twitter API を叩く練習。以下 `npm install` でインストールして使うパッケージ。

- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) : node 環境で使える twitter API v2 のラッパーライブラリ
- [dotenv](https://github.com/motdotla/dotenv) : カレントディレクトリに置かれた `.env` ファイルから環境変数を読むためのライブラリ
- [date-fns](https://github.com/date-fns/date-fns) : 日付操作のライブラリ
- [csv-stringify](https://github.com/adaltas/node-csv/tree/master/packages/csv-stringify) : オブジェクトや配列を CSV 用の文字列化するライブラリ

## セットアップ方法

JavaScript の実行環境である Node.js とツールチェインの管理ツールである [Volta](https://volta.sh) を Homebrew でインストールする。`package.json` で Volta を使ってそれぞれのバージョンを固定(`volta pin node`)してあるのでそのバージョンの Node と npm を使用する。

```sh
$ brew install volta
```

`VOLTA_HOME` 環境変数に `$HOME/.volta` をセットして、`PATH` に `$VOLTA_HOME/bin` を追加する。fish shell の場合は `config.fish` に以下の内容を記載する。

```sh:config.fish
# fish
set -gx VOLTA_HOME $HOME/.volta
fish_add_path $VOLTA_HOME/bin
```

Volta を使う準備ができたら、以下のコマンドで node と npm のインストールを行う。

```sh
$ volta install node
# node のLTS版がインストールされる(16.15.1)
# npm も同時にインストールされる
$ volta ls
# インストールした node のバージョンが表示される
```

`package.json` に記載されている依存関係を以下のコマンドでローカルインストールできる。

```sh
$ npm install
```

`.env` ファイルをプロジェクトのディレクトリ直下に作成して BBEARE_TOKEN の値を入力することで認証ができるようになる。

## クエリ構築

`index.js` ファイルの以下の箇所を変更することでクエリを構築できる。

```js
// クエリ構築
const queryWords = "JavaScript lang:ja";
const options = { 
  "max_results": 10, // 最大取得ツイート数
};
```

## 実行

`package.json` ファイルの scripts セクション(npm-scripts)に指定したコマンド `npm start` で `index.js` を実行できる。

```sh
$ npm start

> twitter-v2-test@1.0.0 start
> node index.js

# 成功時メッセージ
ファイルの書き込みに成功しました
```

存在しない場合には `results/` ディレクトリを作成して、その中に結果となる CSV ファイルを日付名で出力する。

