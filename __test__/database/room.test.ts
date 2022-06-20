import * as fs from 'fs';
import { v4 } from 'uuid';
import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { get, ref, set } from "firebase/database";

// プロジェクトID
const projectId = v4();
// 認証ユーザID
const uid = v4();

// テスト環境
let testEnv: RulesTestEnvironment;

// 認証状態のデータベース参照
const getAuthDB = (testEnv: RulesTestEnvironment) => {
  const authenticatedContext = testEnv.authenticatedContext(uid);
  const authDB = authenticatedContext.database();
  return authDB;
};

// 未認証状態のデータベース参照
const getUnauthDB = (testEnv: RulesTestEnvironment) => {
  const unauthenticatedContext = testEnv.unauthenticatedContext();
  const unauthDB = unauthenticatedContext.database();
  return unauthDB;
};

// セットアップ
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    database: {
      rules: fs.readFileSync("./database.rules.json", "utf8")
    }
  });
});

// テスト毎のセットアップ
beforeEach(async () => {
  await testEnv.clearDatabase();
  //初期データをセット
  await testEnv.withSecurityRulesDisabled(async context => {
    const noRuleDB = context.database()
    await set(ref(noRuleDB, "/RoomApp/rooms/roomid"), {
      name: "room name",
    });
  })
});

// テスト終了処理
afterAll(async () => {
  await testEnv.cleanup();
});

describe("Realtime Database", () => {
  it("Fail test", async () => {
    const unauthDB = getUnauthDB(testEnv);
    //トップレベルは.read=falseなので失敗する
    await assertFails(
      get(ref(unauthDB, "/"))
    );
  });

  it("Success test", async () => {
    const authDB = getAuthDB(testEnv);
    //取得してログ表示もできます
    console.log((await get(ref(authDB, "/RoomApp/rooms/roomid"))).val());
    //.read=trueなので成功する
    await assertSucceeds(
      get(ref(authDB, "/RoomApp/rooms/roomid"))
    );
  });
});

// dummy