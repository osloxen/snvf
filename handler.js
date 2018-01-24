/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');

var spreadsheetAccess = require('localLinkLibraries/SpreadsheetAccess/spreadsheet-access.js');

exports.testSpreadsheetAccess = function() {


  console.log('Testing Spreadsheet access');

  async.waterfall([
          function(callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            '15AzrSbXK0BxbY3g-rmXqyw7F_yAtxOUPeIJbN7u8hLE',
                            1, // what sheet (tab) is wanted
                            4, // how many rows to fetch
                            callback);

          console.log('foobar do you see this?');
        },
        function(spreadsheetData, callback) {
          console.log('inside Waterfall: ',spreadsheetData);
          callback();
        }
  ]);




}





exports.getClubNewsAndAnnouncements = function() {

  console.log('inside getClubNewsAndAnnouncements');


}
