# Airtable画像表示トラブルシューティングガイド

## 現在の状況
- Airtableからの画像表示を強化して修正しました
- より詳細なログとエラーハンドリングを追加

## 画像が表示されない場合の確認項目

### 1. ブラウザのデベロッパーツールを確認
1. F12キーを押してデベロッパーツールを開く
2. Consoleタブで以下のログを確認：
   - `Testing Airtable connection...`
   - `Sample images data:` 
   - `Property [ID] images:`
   - `Image loaded successfully:` または `Image failed to load:`

### 2. Airtableの画像フィールド設定を確認
1. Airtableベースを開く
2. `Images` フィールドが **Attachment** タイプであることを確認
3. 画像が正しくアップロードされていることを確認

### 3. 画像URLの確認
Console で以下のような情報が表示されているか確認：
```
Sample images data: [
  {
    "id": "attXXXXXXXXXXXXXX",
    "url": "https://dl.airtable.com/...",
    "filename": "image.jpg",
    "type": "image/jpeg"
  }
]
```

### 4. よくある問題と解決策

#### 問題1: 403 Forbidden エラー
**原因**: APIキーの権限不足
**解決策**: 
- Personal Access Tokenに `data.records:read` 権限があることを確認
- APIキーが正しく設定されていることを確認

#### 問題2: 画像フィールドが空
**原因**: フィールド名の不一致
**解決策**:
- Airtableのフィールド名が正確に `Images` であることを確認（大文字小文字も含む）

#### 問題3: 画像URLが無効
**原因**: Airtableの一時URLが期限切れ
**解決策**:
- 通常は自動で更新されるが、問題が続く場合は画像を再アップロード

#### 問題4: CORS エラー
**原因**: ブラウザのセキュリティ制限
**解決策**:
- Airtableの画像URLは通常CORS対応済み
- 問題が続く場合は画像を別のCDNに移行を検討

## デバッグ手順

### ステップ1: 接続テスト
```javascript
// ブラウザのConsoleで実行
console.log('Testing Airtable connection...');
```

### ステップ2: 画像データの確認
1. Airtableベースで画像が正しく表示されていることを確認
2. APIレスポンスで画像データが含まれていることを確認

### ステップ3: ネットワークタブの確認
1. デベロッパーツールのNetworkタブを開く
2. 画像リクエストが失敗していないか確認
3. ステータスコードが200でない場合は問題あり

## 修正内容

### 強化されたポイント:
1. **詳細なログ出力**: 各段階での画像処理ログ
2. **URL検証**: 画像URLの有効性をチェック
3. **エラーハンドリング**: 画像読み込み失敗時の適切なフォールバック
4. **画像ナビゲーション**: 複数画像の場合のナビゲーション機能
5. **サムネイル表示**: 画像一覧表示の改善

### コンソールログの例:
```
📡 Fetching properties from Airtable...
Processing images for record: recXXXXXXXXXXXXXX
Images field: [{url: "https://dl.airtable.com/...", ...}]
Image 0: {url: "https://dl.airtable.com/...", filename: "image.jpg"}
Added image URL: https://dl.airtable.com/...
Final images array for recXXXXXXXXXXXXXX: ["https://dl.airtable.com/..."]
Property recXXXXXXXXXXXXXX primary image: https://dl.airtable.com/...
Image loaded successfully: https://dl.airtable.com/...
```

## 次のステップ
1. ブラウザのConsoleでログを確認
2. 問題がある場合は、具体的なエラーメッセージを確認
3. 必要に応じてAirtableの設定を見直し