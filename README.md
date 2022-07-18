# code_party_firebase
CodepartyのFirebaseプロジェクトを管理するリポジトリ

# 目次
- [環境構築（Docker）](#環境構築docker)
- [テスト実行](#テスト実行)
- [構文チェック・フォーマッター](#構文チェックフォーマッター)

# 環境構築（Docker）
- 以下を実行
```
$ git clone https://github.com/CodeParty2021/code_party_firebase.git
$ cd code_party_firebase
```
- プロジェクトフォルダに`.env`ファイルを作成
  - 中身は[こちら](https://www.notion.so/Firebase-9ea6d66210d9401a9ca06fa795ab7500)をコピー(notion リンクなので未招待の人は Teru まで)
- 続いて以下を実行
```
$ docker-compose build
$ docker-compose up -d
$ docker-compose run --rm firebase yarn
```

# テスト実行
- コンテナ内で以下を実行
```
# yarn test:watch
```

# 構文チェック・フォーマッター
- 構文チェックにはESLintを、フォーマッターにはPrettierを使用しています。
- CIでそれぞれチェックされるのでpush前に修正コマンドを実行しましょう。
- 以下のコマンドでそれぞれ修正してくれます。
```
# Macユーザ以外
$ yarn fixall

# Macユーザ
$ yarn fixallmac
```
