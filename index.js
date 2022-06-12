import * as fs from 'fs';
import { TwitterApi } from "twitter-api-v2";
import { stringify } from "csv-stringify/sync";
import { join } from "path";
import { format } from "date-fns";
import 'dotenv/config'; // ESmodule形式だとこうなる

const fsPromises = fs.promises;

// .env ファイルの読み込みがうまく行かなければエラー吐かせて終了
const token = process.env.BEARER_TOKEN;
if (typeof token === "undefined") {
  console.error('Error: "BEARER_TOKEN" is not set.');
  process.exit(1);
}
const client = new TwitterApi(token);

// クエリ構築
const queryWords = "JavaScript lang:ja";
const options = { 
  "max_results": 10, // 最大取得ツイート数
};

try {
  const jsTweets = await client.v2.search(queryWords, options);
  // 返り値が TweetSearchRecentV2Paginetor が入る Promise 
  const csvString = stringify(jsTweets.tweets, {
    header: false,
  });

  const timeStamp = format(new Date(), "yyyy-MM-dd-kk-mm-ss");
  const fileName = `${timeStamp}.csv`;

  const dirName = "results";
  const dirPath = join(process.cwd(), dirName);
  // process.cwd() でカレントディレクトリのパスを取得して join でパスを結合

  try {
    // ディレクトリの存在を保証する
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  await fsPromises.writeFile(`${dirPath}/${fileName}`, csvString);
  console.log("--> succeed writing data!")
} catch (err) {
  console.error(err);
}

