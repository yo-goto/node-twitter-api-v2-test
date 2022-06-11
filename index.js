import { TwitterApi } from "twitter-api-v2";
import 'dotenv/config'; // ESmodule形式だとこうなる

// .env ファイルの読み込みがうまく行かなければエラー吐かせる
if (typeof process.env.BEARER_TOKEN === "undefined") {
  console.error('Error: "BEARER_TOKEN" is not set.');
  process.exit(1);
}
const token = process.env.BEARER_TOKEN;
const client = new TwitterApi(token);

const words = "非同期処理";
const options = { 
  "media.fields": "url",
  "max_results": 10,
};

try {
  const jsTweets = await client.v2.search(words, options);
  // 返り値が TweetSearchRecentV2Paginetor が入る Promise 
  console.log(jsTweets.tweets);
} catch (err) {
  console.error(err);
}

