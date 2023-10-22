const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');


async function updateGoogleSheet(userId, text) {

  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet('1-5-C52CempgUmZ1qD9WRFdZX_eey9IuObfjzejaLZsc', serviceAccountAuth);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });

  const geriSheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  const teddySheet = doc.sheetsByIndex[1];
  const jamesSheet = doc.sheetsByIndex[2];

  console.log("Text the googlesheet receives", text)
  
  let lines = text.split("\n")
  let date = lines[0].split(": ")[1]
  let item = lines[1].split(": ")[1]
  let cost = lines[2].split(": ")[1]
  let vendor = lines[3].split(": ")[1]

  console.log("date", date, "item", item, "cost", cost, "vendor", vendor)
  console.log("User ID googlesheet receives", userId)

  if (userId === 5316138505) {
    console.log("geri")
    const geriRow = await geriSheet.addRow({ "Date": date, "Item Description": item, "Cost": cost, "Vendor": vendor })
    await geriRow.save()
  }

  if (userId === 1170788510) {
    console.log("james")
    const jamesRow = await jamesSheet.addRow({ "Date": date, "Item Description": item, "Cost": cost, "Vendor": vendor })
    await jamesRow.save()
  }

  if (userId === 66) {
    console.log("teddy")
    const teddyRow = await teddySheet.addRow({ "Date": date, "Item Description": item, "Cost": cost, "Vendor": vendor })
    await teddyRow.save()
  }


}


module.exports = { updateGoogleSheet }