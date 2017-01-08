webvr-chat
======

# セットアップ
```
make install
```

# サーバ起動

※推奨

`foreman` が必要

```
make proc
open http://localhost:5000
```

入れられない場合

```
make server
open http://localhost:5000
```

# ビルド
```
make build
```

# Lint

※推奨 下記コマンドで自動 Lint + ビルド

```
make watcher 
```

あるいは

```
make lint
```

# デプロイ
```
make deploy
```
