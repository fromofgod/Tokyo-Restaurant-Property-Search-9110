# Airtable テーブル構造

## テーブル名
**Properties** (正確にこの名前)

## 必須フィールド

### 基本情報
| フィールド名 | タイプ | 説明 |
|------------|--------|------|
| Title | Single line text | 物件タイトル |
| Area | Single select | エリア（渋谷区、新宿区など） |
| PropertyType | Single select | 物件タイプ（居抜き物件、路面店など） |
| Rent | Number | 賃料（数値のみ） |
| RentDisplay | Single line text | 表示用賃料（35万円など） |
| Size | Single line text | 面積（25坪など） |
| Description | Long text | 物件説明 |

### 位置情報
| フィールド名 | タイプ | 説明 |
|------------|--------|------|
| Address | Single line text | 住所 |
| NearestStation | Single line text | 最寄り駅 |
| Line | Single line text | 路線名 |
| WalkingDistance | Single line text | 徒歩距離（徒歩3分など） |
| WalkingMinutes | Number | 徒歩分数（数値のみ） |

### 物件詳細
| フィールド名 | タイプ | 説明 |
|------------|--------|------|
| Floor | Single line text | 階数（1階、B1階など） |
| BuildingAge | Single line text | 築年数（築15年など） |
| Deposit | Single line text | 敷金（敷金2ヶ月など） |
| KeyMoney | Single line text | 礼金（礼金1ヶ月など） |
| ManagementFee | Single line text | 管理費（管理費5万円など） |
| BusinessHours | Single line text | 営業時間制限 |
| Parking | Single line text | 駐車場情報 |
| Equipment | Long text | 設備情報 |

### その他
| フィールド名 | タイプ | 説明 |
|------------|--------|------|
| Features | Single line text | 特徴（カンマ区切り：駅近,居抜き,角地） |
| Images | Attachment | 物件画像 |
| Featured | Checkbox | おすすめ物件フラグ |
| Status | Single select | ステータス（available, rented など） |
| ContactCompany | Single line text | 連絡先会社名 |
| ContactPhone | Single line text | 連絡先電話番号 |
| ContactEmail | Single line text | 連絡先メールアドレス |

## Single Select オプション例

### Area（エリア）
- 渋谷区
- 新宿区  
- 港区
- 千代田区
- 中央区
- 品川区
- 目黒区
- 世田谷区

### PropertyType（物件タイプ）
- 居抜き物件
- スケルトン
- 路面店
- 地下店舗
- ビル内店舗

### Status（ステータス）
- available
- rented
- reserved
- maintenance

## データ例
| Title | Area | Rent | RentDisplay | NearestStation | Line | WalkingMinutes |
|-------|------|------|-------------|----------------|------|----------------|
| 渋谷駅徒歩3分 居抜き物件 | 渋谷区 | 35 | 35万円 | 渋谷 | JR山手線 | 3 |
| 新宿南口 路面店舗 | 新宿区 | 28 | 28万円 | 新宿 | JR山手線 | 5 |