'use strict';

var _cucumber = require('cucumber');

var _chai = require('chai');


(0, _cucumber.Then)('Wait for {int}', function (int) {
  Wait(100)
});
(0, _cucumber.Then)('Verify', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});
(0, _cucumber.When)('System out {string}', function (string) {
  //console.log(string);
});
(0, _cucumber.When)('Check {int}', function (int) {
  (0, _chai.expect)(int).to.eql(int);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3N0ZXBzL3N0ZXBzLmpzIl0sIm5hbWVzIjpbImRhdGFUYWJsZSIsInN0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJpbnQiLCJ0byIsImVxbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFFQSxvQkFBSyxRQUFMLEVBQWUsVUFBVUEsU0FBVixFQUFxQjtBQUNoQztBQUNBO0FBQ0QsQ0FISDtBQUlFLG9CQUFLLHFCQUFMLEVBQTRCLFVBQVVDLE1BQVYsRUFBa0I7QUFDNUNDLFVBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNELENBRkQ7QUFHQSxvQkFBSyxhQUFMLEVBQW9CLFVBQVVHLEdBQVYsRUFBZTtBQUNqQyxvQkFBT0EsR0FBUCxFQUFZQyxFQUFaLENBQWVDLEdBQWYsQ0FBbUJGLEdBQW5CO0FBQ0QsQ0FGRCIsImZpbGUiOiJzdGVwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFdoZW4sIFRoZW4gfSBmcm9tICdjdWN1bWJlcidcclxuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSdcclxuXHJcblRoZW4oJ1ZlcmlmeScsIGZ1bmN0aW9uIChkYXRhVGFibGUpIHtcclxuICAgIC8vIFdyaXRlIGNvZGUgaGVyZSB0aGF0IHR1cm5zIHRoZSBwaHJhc2UgYWJvdmUgaW50byBjb25jcmV0ZSBhY3Rpb25zXHJcbiAgICAvL3JldHVybiAncGVuZGluZyc7XHJcbiAgfSk7XHJcbiAgV2hlbignU3lzdGVtIG91dCB7c3RyaW5nfScsIGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKHN0cmluZylcclxuICB9KTtcclxuICBXaGVuKCdDaGVjayB7aW50fScsIGZ1bmN0aW9uIChpbnQpIHtcclxuICAgIGV4cGVjdChpbnQpLnRvLmVxbChpbnQpXHJcbiAgfSk7Il19