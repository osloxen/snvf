/*jshint esversion: 6 */
/*jslint node: true */

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

exports.sayHelloInEnglish = function() {
  return "Hello";
}



function GetSpreadsheetData(googleSpreadsheetID,
                            sheetNum,
                            maxRowNeeded,
                            callerCallback) {

  var self = this;

  self.callerCallback = callerCallback;

  this.initialize = function(callback) {

    console.log('inside initialize');
    console.log('Spreadsheet ID: ', googleSpreadsheetID);
    console.log('sheet number (tab): ', sheetNum);

    this.doc = new GoogleSpreadsheet(googleSpreadsheetID);

    callback();
  }


  this.getWorksheet = function(callback) {

    console.log('inside getWorksheet');

    this.doc.getInfo(function(err, info) {
      if (err) {
        console.log('ERROR getting spreadsheet: ' + err);
        callback();
      } else {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        console.log(info.worksheets[sheetNum]);
        self.sheet = info.worksheets[sheetNum];
        console.log(self.sheet);
        callback();
      }
    })
  }


  // Get data
  this.getInfoFromSheet = function(callback) {

    console.log('inside getInfoFromSheet');

    self.sheetInfo = [];

    self.sheet.getCells({
      'min-row': 1,
      'max-row': maxRowNeeded,
      'min-col': 1,
      'max-col': 1,
      'return-empty': true
    }, function(err, cells) {
      //console.log('cells: ', cells);
      for (var i=0;i<cells.length;i++) {
        //console.log('Cell R'+cells[i].row+'C'+cells[i].col+' = '+cells[i].value);
        //console.log('push cell value: ' + cells[i].value);
        self.sheetInfo.push(cells[i].value);
      }

      callback();
    });
  };


  this.debugPrintSpreadsheetArray = function(callback) {

    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('Sheet info...');
    console.log(self.sheetInfo);
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');
    console.log('W*W*W*W*W*W*W*W*W*W*W*W*');

    callback(null,self.sheetInfo);
  };


  this.callTheCallback = function(sheetInfo,callback) {

    self.callerCallback(null,sheetInfo);
  };


} // end of GetSpreadsheetData object



exports.getGoogleSpreadsheetDataOneColumn = function(idForSpreadsheet,
                                            sheetNum,
                                            maxRowNeeded,
                                            callerCallback) {

  console.log('*** inside getGoogleSpreadsheetDataOneColumn ***');
  console.log('Using this ID: ', idForSpreadsheet);
  console.log('Using this sheet number (tab): ', sheetNum);
  console.log('Returning this many rows: ', maxRowNeeded);

  var getSpreadsheetData = new GetSpreadsheetData(idForSpreadsheet,
                                                  sheetNum,
                                                  maxRowNeeded,
                                                  callerCallback);

  async.waterfall([

    // IT ALL BEGINS HERE
    getSpreadsheetData.initialize,
    getSpreadsheetData.getWorksheet,
    getSpreadsheetData.getInfoFromSheet,
    getSpreadsheetData.debugPrintSpreadsheetArray,
    getSpreadsheetData.callTheCallback
  ]
);

}; // end of getGoogleSpreadsheetDataOneColumn
