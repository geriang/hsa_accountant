const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');


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
await doc.updateProperties({ title: 'renamed doc' });

const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
console.log(sheet.title);
console.log(sheet.rowCount);

// adding / removing sheets
const newSheet = await doc.addSheet({ title: 'another sheet' });
await newSheet.delete();