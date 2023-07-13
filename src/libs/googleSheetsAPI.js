```javascript
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const googleSheetsAPI = {};

googleSheetsAPI.authClient = null;

googleSheetsAPI.authenticate = async function(credentials) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    if (credentials.token) {
        oAuth2Client.setCredentials(credentials.token);
        this.authClient = oAuth2Client;
    } else {
        throw new Error('No valid Google Sheets API credentials');
    }
};

googleSheetsAPI.fetchURLs = async function(sheetId, range) {
    if (!this.authClient) {
        throw new Error('No authenticated client');
    }

    const request = {
        spreadsheetId: sheetId,
        range: range,
        auth: this.authClient,
    };

    const response = await sheets.spreadsheets.values.get(request);
    return response.data.values;
};

googleSheetsAPI.updateSheet = async function(sheetId, range, values) {
    if (!this.authClient) {
        throw new Error('No authenticated client');
    }

    const request = {
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: values
        },
        auth: this.authClient,
    };

    const response = await sheets.spreadsheets.values.update(request);
    return response.data;
};

module.exports = googleSheetsAPI;
```