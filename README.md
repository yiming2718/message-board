# 🐾 YM的嗷嗷匿名留言板

這是一個使用 **Google Apps Script（GAS）+ Google Sheets** 來的匿名留言板，讓用戶可以匿名留言，並且資料會即時寫入 Google 試算表。

## 🎯 功能
✅ 使用者可以匿名留言
✅ 防止按鈕連續點擊，避免重複送出
✅ 自動儲存留言到 **Google Sheets**
✅ **Hover 動畫效果**，看起來很酷!

## 🏗️ 技術架構
- **前端**：HTML + CSS + JavaScript
- **後端**：Google Apps Script（GAS）
- **資料庫**：Google Sheets

## 📂 專案結構
```
/ YM-Message-Board
├── index.html  # 前端頁面
├── Code.gs     # Google Apps Script 後端處理
└── README.md   # 專案說明文件
```

## 🚀 部署方式

### **1️⃣ 建立 Google 試算表**
1. **開啟 Google Sheets**（https://docs.google.com/spreadsheets/）
2. 建立一個新的試算表，並檔案名稱命名為 **留言板**(或可自行取名)，下方的 **工作表** 改名為 **messages**
![alt text](image/image.png)
3. **建立三個欄位**：
   - **A1 ：時間**
   - **B1 ：名稱**
   - **C1 ：留言**
   ![alt text](image/image2.png)
4. 記下 **試算表 ID**（網址中的 `docs.google.com/spreadsheets/d/xxx/edit?...`，其中`xxx` 就是 試算表的ID）

### **2️⃣ 建立 Google Apps Script（GAS）**
1. **開啟 GAS 編輯器**（https://script.google.com/）
2. 建立新專案，並貼上 `Code.gs` 內容
3. 修改 `SHEET_ID`，填入你的試算表 ID
4. 修改 'MY_TITLE`，幫自己的網站標題命名

### **3️⃣ 設定前端頁面**
1. **新增檔案 → 選HTML → 命名為index**
![alt text](image/image3.png)
2. 貼上 `index.html` 內容

### **4️⃣ 部署網站**
   - 選擇 `部署` → `新部署`
   - 選擇 `Web 應用程式`
   - **存取權限** 設為 `任何人`
   - 點擊 `部署`
   - **複製網址** 完成!

## 📌 預覽畫面
💡 **PC & 手機瀏覽，畫面簡潔！**

## 🛠️ 可能遇到的問題
### **❓ GAS 回傳權限錯誤**
> 解決方式：請確認 **GAS 部署權限** 設為 `任何人`。

### **❓ 試算表沒有自動更新**
> 解決方式：確認 `submitToSheet()` 中的 `SHEET_ID` 是否正確。

## 🎉 歡迎使用
希望這個留言板能夠幫助你完成匿名留言的需求！嗷嗚 🐾
