# kagomeapp_hq_single
カゴメプロジェクト - 本社版 / 2画面独立（single / （1920px * 1080px） * 2）

## 管理除外ファイル
- movie
```
movie
```
以下の場所から取得してください：

```
https://drive.google.com/drive/u/0/folders/1mbkr-ZxvoDVrnp8S05cMYxzKblEYJ1gQ
GDrive > kidolin > 701_kagome > www > movie
```

- sound
```
sound
```

以下の場所から取得してください：

```
https://drive.google.com/drive/u/0/folders/1tqQaH202JXgZWsQjR39l_IlzQqUlC0sd
GDrive > kidolin > 701_kagome > www > sound 
```

## デプロイ方法
- 本番環境のURL
```
https://d3dukqzxpk3hjs.cloudfront.net
```
1. *S3へのアップロード*  
    * S3バケット（kagomeapp-hq-single）に更新したファイルを随時アップロード。

2. *Cloudfrontキャッシュの削除*  
    * CloudFront ディストリビューション（EHTDICANIP6U7）を選択。  
    * 「キャッシュ削除」タブを選択。  
    * すでにキャッシュ削除IDが存在する場合は、いずれかを選択し、「新規にコピー」を選択。  
      存在しない場合は、「キャッシュ削除を作成」を選択。  
    * オブジェクトパスに「/*」と記載し、「キャッシュ削除を作成」を選択。  

3. *本番環境URLにアクセスし、変更が反映されていることを確認*

- テスト環境のURL（※こちらは、本番リリース完了後に使用する為、現時点では使用しないこと。）
```
https://dev-kagomehq-single.s3.ap-northeast-1.amazonaws.com/index.html
```
※S3バケット（dev-kagomeapp-single）へのアップロードは、許可がない限り行わないこと。

## ローカルでの動作確認
- http://127.0.0.1:5503/
