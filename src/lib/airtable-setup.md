# Airtable Setup Guide

## 現在の状況
- **ステータス**: 403 Forbidden エラー
- **原因**: APIキーまたはベースIDの権限不足
- **対応**: モックデータで動作確認中

## エラー解決手順

### 1. APIキーの確認
1. [Airtable Developer Hub](https://airtable.com/developers/web/api/introduction)にアクセス
2. 「Personal access tokens」を確認
3. 以下の権限が必要：
   - `data.records:read`
   - `data.records:write` (更新が必要な場合)
   - `schema.bases:read`

### 2. ベースIDの確認
1. Airtableのベースを開く
2. URLから`app`で始まる部分をコピー
   - 例: `https://airtable.com/app3AZO4jZhAnBI7u/...`
   - ベースID: `app3AZO4jZhAnBI7u`

### 3. 設定ファイルの更新
`src/lib/airtable.js`で以下を更新：

```javascript
const AIRTABLE_BASE_ID = 'your_correct_base_id';
const AIRTABLE_API_KEY = 'your_correct_api_key';
```

### 4. テーブル構造の確認
以下のフィールドが必要：

#### 基本情報
- **Title** (Single line text)
- **Area** (Single select)
- **PropertyType** (Single select)
- **Rent** (Number)
- **RentDisplay** (Single line text)
- **Size** (Single line text)
- **Description** (Long text)

#### 位置情報
- **Address** (Single line text)
- **NearestStation** (Single line text)
- **Line** (Single line text) ← 新規追加
- **WalkingDistance** (Single line text)
- **WalkingMinutes** (Number) ← 新規追加

#### その他
- **Features** (Single line text) - カンマ区切り
- **Images** (Attachment)
- **Featured** (Checkbox)
- **Status** (Single select)

### 5. モックデータからの切り替え
`src/lib/database.js`で以下を変更：

```javascript
const USE_AIRTABLE = true; // false から true に変更
```

## 現在の動作
- **モックデータ**: 8件の物件データで動作確認可能
- **沿線・駅検索**: JR山手線、各メトロ線に対応
- **全機能**: 検索、フィルタリング、詳細表示すべて動作

## トラブルシューティング

### 403 Forbidden
- APIキーの権限を確認
- ベースIDが正しいか確認
- テーブル名が「Properties」であることを確認

### 404 Not Found
- ベースIDが間違っている
- テーブル名が間違っている

### フィールドエラー
- 必要なフィールドが存在しない
- フィールド名のスペルミス

## 次のステップ
1. Airtable設定を修正
2. `USE_AIRTABLE = true`に変更
3. 実際のデータでテスト
4. 必要に応じて追加のフィールドを設定