export function doGet() {
  return HtmlService.createHtmlOutputFromFile("hosting/index.html")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("React + GAS");
}

// @ts-ignore
function getDateTimeNow(): string {
  return Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd (E) HH:mm:ss Z");
}
