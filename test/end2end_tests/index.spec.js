// const Browser = require('zombie');

// Browser.localhost('localhost', 3000);

// describe('User visits the page', () => {

// 	const browser = new Browser();

// 	before(function (done) {
// 		return browser.visit('/', () => {

// 			browser.wait(() => {
// 				return document.querySelector('.row-z2m').getAttribute('style').indexOf('opacity: 1') > -1;
// 			}, () => {
// 				console.log('Browser waited enought time for GSAP animations to finish!');
// 				done();
// 			});

// 		});
// 	});

// 	describe('types using the keyboard', () => {

// 		it ('should be qwerty', (done) => {

// 			['q','w','e','r','t','y'].forEach((v) => {
// 				browser.click('span.' + v);
// 			});

// 			browser.assert.evaluate('browser.querySelector(\'input[name="collect-reservation-code"]\').value', 'QWERTY');

// 			done();

// 		});

// 	});

// });