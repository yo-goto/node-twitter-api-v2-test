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
const words = "非同期処理";
const options = { 
  "media.fields": "url",
  "max_results": 10,
};

try {
  const jsTweets = await client.v2.search(words, options);
  // 返り値が TweetSearchRecentV2Paginetor が入る Promise 
  const csvString = stringify(jsTweets.tweets, {
    header: false,
  });

  const dirName = "results";
  const timeStamp = format(new Date(), "yyyy-MM-dd-kk-mm-ss");
  const fileName = `${timeStamp}.csv`;
  const dirPath = join(process.cwd(), dirName);

  try {
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

