import Cookie from "js-cookie";

/**
 * 
 * @param {Object} newRecord Record object to be added to the table
 * @param {number} newRecord.amount Amount should be in cents, E.G. $12.56 = 1256
 * @param {string} newRecord.description Proper description for this record
 * @param {string} newRecord.userEmail Proper user eamil who's creating this record
 */
export function addRecord(newRecord = {}) {
    const records = getRecords();
    newRecord.date = new Date().toDateString();
    Cookie.set('records', [...records, newRecord]);
}
/**
 * Gets all records currently saved in cookies 
 * @returns {Object[]} Returns array of record objects
 */
export function getRecords() {
    const records = Cookie.get('records') || '[]';
    return JSON.parse(records);
}

export default addRecord;