"use strict";

var _cucumber = require("cucumber");

var _chai = require("chai");

(0, _cucumber.When)('Wait for {int}', function (int) {});
(0, _cucumber.Then)('Verify', function (dataTable) {//  Write code here that turns the phrase above into concrete actions
  //  return 'pending';
});
(0, _cucumber.When)('System out {string}', function (string) {
  console.log(string);
});
(0, _cucumber.When)('Check {int}', function (int) {
  (0, _chai.expect)(int).to.eql(int);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3N0ZXBzL3N0ZXBzLmpzIl0sIm5hbWVzIjpbImludCIsImRhdGFUYWJsZSIsInN0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJ0byIsImVxbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQSxvQkFBSyxnQkFBTCxFQUF1QixVQUFTQSxHQUFULEVBQWMsQ0FBRSxDQUF2QztBQUVBLG9CQUFLLFFBQUwsRUFBZSxVQUFTQyxTQUFULEVBQW9CLENBQ2pDO0FBQ0E7QUFDRCxDQUhEO0FBS0Esb0JBQUsscUJBQUwsRUFBNEIsVUFBU0MsTUFBVCxFQUFpQjtBQUMzQ0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLE1BQVo7QUFDRCxDQUZEO0FBSUEsb0JBQUssYUFBTCxFQUFvQixVQUFTRixHQUFULEVBQWM7QUFDaEMsb0JBQU9BLEdBQVAsRUFBWUssRUFBWixDQUFlQyxHQUFmLENBQW1CTixHQUFuQjtBQUNELENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaGVuLCBUaGVuIH0gZnJvbSAnY3VjdW1iZXInXHJcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknXHJcblxyXG5XaGVuKCdXYWl0IGZvciB7aW50fScsIGZ1bmN0aW9uKGludCkge30pXHJcblxyXG5UaGVuKCdWZXJpZnknLCBmdW5jdGlvbihkYXRhVGFibGUpIHtcclxuICAvLyAgV3JpdGUgY29kZSBoZXJlIHRoYXQgdHVybnMgdGhlIHBocmFzZSBhYm92ZSBpbnRvIGNvbmNyZXRlIGFjdGlvbnNcclxuICAvLyAgcmV0dXJuICdwZW5kaW5nJztcclxufSlcclxuXHJcbldoZW4oJ1N5c3RlbSBvdXQge3N0cmluZ30nLCBmdW5jdGlvbihzdHJpbmcpIHtcclxuICBjb25zb2xlLmxvZyhzdHJpbmcpXHJcbn0pXHJcblxyXG5XaGVuKCdDaGVjayB7aW50fScsIGZ1bmN0aW9uKGludCkge1xyXG4gIGV4cGVjdChpbnQpLnRvLmVxbChpbnQpXHJcbn0pXHJcbiJdfQ==