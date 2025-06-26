# Google Maps API セットアップガイド

## 1. Google Cloud Console設定

### プロジェクト作成
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）

### APIs & Services設定
1. 「APIs & Services」→「Library」に移動
2. 以下のAPIを有効化：
   - **Maps JavaScript API**
   - **Places API** (オプション)
   - **Geocoding API** (オプション)

### 認証情報の作成
1. 「APIs & Services」→「Credentials」に移動
2. 「Create Credentials」→「API Key」を選択
3. APIキーが生成される

### APIキーの制限設定（セキュリティ強化）
1. 作成したAPIキーをクリック
2. 「API restrictions」で使用するAPIを制限：
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. 「Application restrictions」でリファラーを設定：
   - `http://localhost:5173/*` (開発環境)
   - `https://your-domain.com/*` (本番環境)

## 2. 環境変数の設定

### .envファイルの作成
```bash
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Vite設定での環境変数使用
```javascript
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
```

## 3. 料金について

### 無料枠
- Maps JavaScript API: 月28,000リクエストまで無料
- Places API: 月17,000リクエストまで無料
- Geocoding API: 月40,000リクエストまで無料

### 課金設定
1. Google Cloud Consoleで課金アカウントを設定
2. 使用量制限を設定してコスト管理

## 4. 機能説明

### 実装された機能
- **インタラクティブマップ**: 東京都内の物件をピンで表示
- **ホバー情報**: マーカーにホバーで物件情報を表示
- **クリック詳細**: マーカークリックで物件詳細ページを開く
- **マップ/リスト切り替え**: 表示方式の変更
- **自動境界調整**: 物件位置に応じてマップの表示範囲を調整

### カスタマイズ可能な要素
- **マーカーデザイン**: SVGカスタムアイコン
- **ホバーカード**: 物件情報の表示内容
- **マップスタイル**: Google Maps のスタイル設定
- **座標データ**: より精密な住所ベースの座標

## 5. 開発時の注意点

### APIキーの管理
- `.env`ファイルは`.gitignore`に追加
- 本番環境では環境変数で設定
- リファラー制限でセキュリティ強化

### パフォーマンス最適化
- マーカーの数が多い場合はクラスタリングを検討
- 画像の最適化（WebP形式など）
- 遅延読み込みの実装

### エラーハンドリング
- APIキー未設定時の適切な表示
- ネットワークエラー時のフォールバック
- 位置情報取得失敗時の対応

## 6. トラブルシューティング

### よくある問題
1. **地図が表示されない**
   - APIキーの確認
   - リファラー制限の確認
   - 課金設定の確認

2. **マーカーが表示されない**
   - 座標データの確認
   - JavaScript エラーの確認

3. **ホバー情報が正しく表示されない**
   - マウスイベントの確認
   - CSS z-index の調整

### デバッグ方法
```javascript
// ブラウザのコンソールで確認
console.log('Google Maps API Key:', GOOGLE_MAPS_API_KEY);
console.log('Map instance:', map);
console.log('Markers:', markers);
```

## 7. 本番デプロイ時のチェックリスト

- [ ] APIキーの環境変数設定
- [ ] リファラー制限の更新
- [ ] 課金設定の確認
- [ ] 使用量モニタリングの設定
- [ ] エラーハンドリングのテスト
- [ ] パフォーマンステスト