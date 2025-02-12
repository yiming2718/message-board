const SHEET_ID = ""; //填入自己的Sheet ID
const SHEET_NAME = "messages";
const MY_TITLE = ""; // 幫自己的留言板取個名字吧

// 儲存留言至 Google Sheets
function submitToSheet(name, message) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow(); // 找到最後一行
  sheet.getRange(lastRow + 1, 1, 1, 3).setValues([[new Date(), name, message]]);
}


// 讀取留言資料並回傳 JSON
function getMessages() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  data.shift(); // 移除表頭
  return data.map(row => ({ name: row[1], message: row[2] }));
}

// 設定前端頁面
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
         .setTitle(MY_TITLE);
}
