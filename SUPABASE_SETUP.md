# Supabase Google認証セットアップガイド

## 1. Supabaseプロジェクト設定

### プロジェクト作成
1. [Supabase Dashboard](https://app.supabase.com/)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトの設定からAPI情報を確認

### API情報の取得
- **Project URL**: `https://[project-id].supabase.co`
- **Anon Key**: プロジェクトの Settings > API から取得

## 2. Google OAuth設定

### Google Cloud Console設定
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. 「APIs & Services」→「Credentials」に移動
4. 「Create Credentials」→「OAuth 2.0 Client IDs」を選択

### OAuth 2.0 Client ID設定
**Application type**: Web application

**Authorized JavaScript origins**:
```
http://localhost:5173
https://your-domain.com
```

**Authorized redirect URIs**:
```
https://[your-project-id].supabase.co/auth/v1/callback
```

### Client IDとClient Secretを取得
作成後に表示される：
- **Client ID**: `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxxxxxxxxxx`

## 3. Supabase認証設定

### Authentication設定
1. Supabase Dashboard → Authentication → Settings
2. 「Enable Google provider」をON
3. Google OAuth情報を入力：
   - **Client ID**: Google Cloud Consoleで取得したClient ID
   - **Client Secret**: Google Cloud Consoleで取得したClient Secret

### Site URL設定
**Site URL**:
```
http://localhost:5173
```

**Redirect URLs**:
```
http://localhost:5173/#/
https://your-domain.com/#/
```

## 4. 環境変数の設定

`src/lib/supabase.js`を更新：

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
```

## 5. データベース設定（オプション）

ユーザープロフィール用のテーブル作成：

```sql
-- プロフィールテーブル
create table profiles (
  id uuid references auth.users on delete cascade,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  
  primary key (id),
  constraint username_length check (char_length(username) >= 3)
);

-- RLS（Row Level Security）を有効化
alter table profiles enable row level security;

-- ユーザーは自分のプロフィールのみアクセス可能
create policy "Users can view own profile." 
  on profiles for select 
  using ( auth.uid() = id );

create policy "Users can update own profile." 
  on profiles for update 
  using ( auth.uid() = id );

-- 新規ユーザー登録時にプロフィールを自動作成
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 6. テスト

1. アプリを起動: `npm run dev`
2. 「Googleでログイン」ボタンをクリック
3. Google認証フローを確認
4. ログイン後にユーザー情報が正しく表示されることを確認

## トラブルシューティング

### よくある問題

1. **Redirect URI mismatch**
   - Google Cloud ConsoleのRedirect URIsが正しく設定されているか確認

2. **CORS エラー**
   - Supabaseの Site URL と Redirect URLs が正しく設定されているか確認

3. **Invalid client error**
   - Google OAuth の Client ID と Client Secret が正しく設定されているか確認

### デバッグ方法

ブラウザのデベロッパーツールで以下を確認：
- Console にエラーが出ていないか
- Network タブで認証リクエストの状態を確認
- Local Storage に Supabase のセッション情報があるか