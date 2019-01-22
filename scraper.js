// Go here: https://www.viamichelin.com/web/Restaurants/Restaurants-United_States
// Load artoo.js
// Copy and run the following script in the web console

var listScraper = {
  iterator: 'li.poi-item-restaurant',
  data: {
  	name: {sel: '.poi-item-name'},
  	address: {sel: '.poi-item-details', attr: 'title'},
  	link: {sel: '.poi-item-name a', attr: 'href'},
  }
};

var linkScraper = {
	iterator: 'ul.datasheet-more-infos li:last',
	data: {
		website: {sel: 'a:first', method: 'text'}
	}
};

var results = artoo.scrape(listScraper);
var urlList = results.map(item => item.link)

artoo.ajaxSpider(urlList, {
	scrapeOne: linkScraper,
	done: function (data) {
		var newResults = results.map((item, i) => {
			console.log("restaurant:", item);
			console.log("website:", data[i]);
			delete item.link;
			item.website = data[i].website;
			return item;
		});

		artoo.saveCsv(newResults);
	}
});