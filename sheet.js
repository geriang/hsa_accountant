const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./hsa-accounting-4002da4e5a8e.json');  // Replace with the path to your credentials file

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet('1-5-C52CempgUmZ1qD9WRFdZX_eey9IuObfjzejaLZsc');  // Replace with your Google Sheet ID
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();  // Loads sheet details
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ Name: 'John Doe', Age: 25 });  // Adding a row
}

accessSpreadsheet();
