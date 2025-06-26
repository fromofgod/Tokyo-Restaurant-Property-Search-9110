# Google Maps API 設定ガイド

## 🗺️ 現在の状況

あなたのプロジェクト（https://greta.questera.ai）では、Google Maps APIキーが未設定のため、マップ機能がデモモードで動作しています。

## 📋 設定手順

### 1. Google Cloud Console でプロジェクト作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. プロジェクト名: 例「Real Estate Map Project」

### 2. 必要なAPIを有効化

**APIs & Services** → **Library** で以下のAPIを有効化：

- ✅ **Maps JavaScript API** (必須)
- ✅ **Places API** (検索機能用)
- ✅ **Geocoding API** (住所→座標変換用)

### 3. APIキーの作成

1. **APIs & Services** → **Credentials** に移動
2. **Create Credentials** → **API Key** を選択
3. APIキーをコピーして保存

### 4. APIキーの制限設定（セキュリティ強化）

#### Application restrictions（アプリケーション制限）
```
HTTP referrers (web sites)

許可するリファラー:
https://greta.questera.ai/*
https://*.questera.ai/*
http://localhost:5173/*  (開発用)
```

#### API restrictions（API制限）
- Maps JavaScript API
- Places API  
- Geocoding API

### 5. 環境変数の設定

プロジェクトで以下の環境変数を設定：

```bash
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

## 💰 料金について

### 無料枠（月次）
- **Maps JavaScript API**: 28,000 マップロード
- **Places API**: 17,000 リクエスト  
- **Geocoding API**: 40,000 リクエスト

### 課金設定
1. Google Cloud Console で課金アカウントを有効化
2. 使用量制限を設定してコスト管理

## 🔧 実装済み機能

あなたのプロジェクトには既に以下が実装されています：

### マップ機能
- 📍 **物件マーカー**: 各物件の位置をマップ上に表示
- 🎯 **ホバー情報**: マーカーにマウスオーバーで物件情報表示
- 🖱️ **クリック詳細**: マーカークリックで物件詳細ページを開く
- 📱 **レスポンシブ**: デスクトップ・モバイル対応

### UI機能  
- 🗺️ **マップ/リスト切り替え**: 表示方式の変更
- 🔍 **検索フィルター**: エリア・路線・駅での絞り込み
- 📐 **自動境界調整**: 物件位置に応じて表示範囲を最適化

## 🚀 APIキー設定後の効果

設定完了後、以下が利用可能になります：

### 1. リアルタイムマップ
- Google Maps の高解像度地図
- ストリートビュー連携
- 道路・交通情報

### 2. 高精度位置情報
- 正確な物件位置表示
- 住所から座標への自動変換
- 周辺施設情報

### 3. 検索機能強化
- 住所・駅名での検索
- 周辺エリアの自動提案
- ルート案内機能

## 🐛 トラブルシューティング

### よくある問題

#### 1. マップが表示されない
- APIキーが正しく設定されているか確認
- リファラー制限の設定を確認
- 課金アカウントが有効か確認

#### 2. 「このページではGoogle Mapsを正しく読み込めませんでした」
- APIキーの権限を確認
- 使用制限に達していないか確認

#### 3. マーカーが表示されない
- Geocoding API が有効か確認
- 座標データが正しいか確認

### デバッグ方法

ブラウザのコンソールで確認：
```javascript
// APIキーの確認
console.log('API Key set:', !!window.google);

// マップインスタンスの確認  
console.log('Map instance:', map);

// マーカーの確認
console.log('Markers:', markers);
```

## 📞 サポート

設定でご不明な点がございましたら、以下の手順でサポートいたします：

1. Google Cloud Console のスクリーンショット
2. エラーメッセージのコピー
3. ブラウザのコンソールログ

## 🎯 次のステップ

1. **APIキーを取得** → Google Cloud Console で設定
2. **環境変数に設定** → `VITE_GOOGLE_MAPS_API_KEY`
3. **デプロイ** → 設定反映のため再デプロイ
4. **テスト** → マップ機能の動作確認

設定完了後、あなたの不動産サイトで本格的なGoogle Mapsが利用できるようになります！