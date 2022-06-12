import * as fs from "fs";
import { TwitterApi } from "twitter-api-v2";
import { stringify } from "csv-stringify/sync";
import { join } from "path";
import { format } from "date-fns";
import "dotenv/config"; // ESmodule形式だとこうなる

// .env ファイルの読み込みがうまく行かなければエラー吐かせて終了
const token = process.env.BEARER_TOKEN;
if (typeof token === "undefined") {
  console.error('エラー: "BEARER_TOKEN" がセットされていません');
  process.exit(1);
}
const client = new TwitterApi(token);

// クエリ構築
const queryWords = "JavaScript lang:ja";
const options = {
  max_results: 10, // 最大取得ツイート数
};

const jsTweets = await fetchTweets(queryWords, options);
const csvString = stringify(jsTweets.tweets, {
  header: false,
});

const timeStamp = format(new Date(), "yyyy-MM-dd-kk-mm-ss");
const fileName = `${timeStamp}.csv`;
const dirName = "results";
const dirPath = join(process.cwd(), dirName);
// process.cwd() でカレントディレクトリのパスを取得して join でパスを結合

ensureDirSyncFn(dirPath);
try {
  fs.writeFileSync(`${dirPath}/${fileName}`, csvString);
  console.log("ファイルの書き込みに成功しました");
} catch (err) {
  console.error(err);
}

/**
 * ツイートの取得
 * @param {string} query
 * @param {object} option
 * @returns {Promise<TweetSearchRecentV2Paginator|void>} 取得した tweet
 */
async function fetchTweets(query, option) {
  try {
    return await client.v2.search(query, option);
    // 返り値が TweetSearchRecentV2Paginetor が入る Promise
  } catch (e) {
    console.log("データの取得に失敗しました");
    console.error(e);
    process.exit(1);
  }
}

/**
 * 指定したディレクトリがなければ作成する
 * @param {string} directory ディレクトリパス
 */
function ensureDirSyncFn(directory) {
  if (!fs.existsSync(directory)) {
    try {
      fs.mkdirSync(directory);
    } catch (err) {
      console.log("ディレクトリの作成に失敗しました");
      console.error(err);
      process.exit(1);
    }
  }
}

