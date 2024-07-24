# ①課題番号-プロダクト名
kadai10

## ②課題内容（どんな作品か）

- 地図連携型投稿アプリ

## ③DEMO


## ④作ったアプリケーション用のIDまたはPasswordがある場合

guest@email.com
test

## ⑤工夫した点・こだわった点

- DBの移行　mongo -> supabase

- 画像投稿機能追加
  - 画像本体はsupabaseのストレージに保存

- いいねアクション
  - client側実装

- マップ機能の実装
  - 地図表示
  - クリックでマーカー
  - マーカーのポップアップでgoogleMapへのリンク(タブナビング防止)
  

- ユーザーhome画面
  - ログインユーザーの投稿のみ表示 24/07/24


## ⑥難しかった点・次回トライしたいこと(又は機能)

- 未実装メモ
  - 投稿の削除機能
  - 画像の削除機能
  - フォロー機能
  - 画像投稿ボタンのデザイン変更
  - 非同期処理中のローディング実装
    - ログイン、レジスター、投稿
  - 現在地表示機能（ピンとは別に）
  - 
  - 

- 未修正の不具合
  - create-postで投稿画面開いたときに前回の位置になっている。現在地更新されない
  - 本番環境で画像投稿ができない

## ⑦質問・疑問・感想、シェアしたいこと等なんでも
- 初回だけunhandleエラーがでたのだが、原因がわからない。
