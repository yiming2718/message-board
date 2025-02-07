// 開啟 Google 試算表
const SHEET_ID = "1VdC-NCVUBHhfEqKu2rJ11-KY_0w9fplZ5E2LEU1chDI";
const SHEET_NAME = "messages-board";

// 儲存留言至 Google Sheets
function submitToSheet(name, message) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([new Date(),name, message]);
}

// 讀取留言資料
function getMessages() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  data.shift(); // 移除表頭
  Logger.log(data); // 加入此行來檢查讀取到的資料
  return data.map(row => ({ name: row[1], message: row[2] }));
}

// 回傳 Web App URL，包含動態參數
function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

// 根據 URL 中的 'page' 參數，決定回傳哪個頁面
function doGet(e) {
  const page = e.parameter.page || 'index'; // 預設頁面是 index
  let template;
  
  if (page === 'view') {
    template = HtmlService.createTemplateFromFile('View');
  } else {
    template = HtmlService.createTemplateFromFile('Index');
  }

  return template.evaluate();
}