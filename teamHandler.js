/*jshint esversion: 6 */
/*jslint node: true */

'use strict';

var async = require('async');

var spreadsheetAccess = require('localLinkLibraries/SpreadsheetAccess/spreadsheet-access.js');




function GetTeamInformation(event) {

  var self = this;

  function getTeamSpreadsheet(teamName) {

      switch (teamName) {
        case "u14":
            return '15AzrSbXK0BxbY3g-rmXqyw7F_yAtxOUPeIJbN7u8hLE';
            break;
        case "u15":
            return 'not yet created';
            break;
        default:
            return undefined
      }
  }


  this.initialize = function(callback) {

    console.log('inside getClubNewsAndAnnouncements');
    console.log('event: ', event);
    console.log('query string parameters: ', event.queryStringParameters);
    console.log('team name: ', event.queryStringParameters.teamName);

    var teamName = event.queryStringParameters.teamName;

    var spreadsheetID = getTeamSpreadsheet(teamName);
    console.log('team spreadsheet id: ', spreadsheetID);

    if (spreadsheetID == undefined) {
      callback('Did not recognize your team', null);
    } else {
      callback(null, spreadsheetID);
    }
  }

}  // end of GetTeamInformation function




exports.getCoachContactInfo = function(event, context, callback) {

  var getTeamInfo = new GetTeamInformation(event);

  async.waterfall([
          getTeamInfo.initialize,
          function(spreadsheetID, callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            spreadsheetID,
                            2, // what sheet (tab) is wanted
                            7, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('inside getClubNewsAndAnnouncements Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
}


exports.getCoachReminder = function(event, context, callback) {

  var getTeamInfo = new GetTeamInformation(event);

  async.waterfall([
          getTeamInfo.initialize,
          function(spreadsheetID, callback) {
          // do some more stuff ...

          spreadsheetAccess.getGoogleSpreadsheetDataOneColumn(
                            spreadsheetID,
                            1, // what sheet (tab) is wanted
                            2, // how many rows to fetch
                            callback);

        },
        function(spreadsheetData, callback) {
          console.log('inside getClubNewsAndAnnouncements Waterfall: ',spreadsheetData);
          context.succeed(spreadsheetData);
          callback();
        }
  ]);
}
