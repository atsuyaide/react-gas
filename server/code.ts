export function doGet() {
  return HtmlService.createHtmlOutputFromFile("hosting/index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("React + GAS");
}

export function convertToOptions<T>(
  keys: string[],
  values: any[][]
): Record<string, T>[] {
  return values.map((value) => {
    const result: Record<string, T> = {};
    keys.forEach((key, index) => {
      result[key] = value[index];
    });
    return result;
  });
}

// @ts-ignore
function getDateTimeNow(tz: string, format: string): string {
  return Utilities.formatDate(new Date(), tz, format);
}

function getSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
  const ssId = PropertiesService.getScriptProperties().getProperty("SS_ID");
  if (!ssId) {
    throw new Error("Error: SS_IDが設定されていません.");
  }
  const ss = SpreadsheetApp.openById(ssId);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`${sheetName}は存在しません.`);
  }
  return sheet;
}

// @ts-ignore
function getOptions(): Record<string, string>[] {
  const values = getSheet("UTC").getDataRange().getValues();
  const columns = values[0];
  const records = values.slice(1);
  return convertToOptions<string>(columns, records);
}

// @ts-ignore
function getFormats(): Record<string, string>[] {
  const values = getSheet("書式").getDataRange().getValues();
  const columns = values[0];
  const records = values.slice(1);
  return convertToOptions<string>(columns, records);
}
