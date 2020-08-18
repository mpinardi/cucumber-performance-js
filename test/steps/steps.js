import { When, Then } from 'cucumber'
import { expect } from 'chai'

When('Wait for {int}', async function(int) {
  await new Promise(resolve => {
    setTimeout(resolve, int);
  });
})

Then('Verify', function(dataTable) {
  //  Write code here that turns the phrase above into concrete actions
  //  return 'pending';
})

When('System out {string}', function(string) {
  console.log(string)
})

When('Check {int}', function(int) {
  expect(int).to.eql(int)
})
