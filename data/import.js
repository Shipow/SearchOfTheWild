// It's dangerous to go alone!
let airtable = require('airtable');
let algolia = require('algoliasearch');
let async = require('async');
let config = require('../secret.config.json');

let base = new airtable({apiKey: config.airtable.apiKey}).base(config.airtable.base);
let client = algolia(config.algolia.appID, config.algolia.apiKey);
let index = client.initIndex(config.algolia.index);

let transformRecord = (record,relationalContent) => {
	// Create an objectID from the primary key field of your row
	record.fields.objectID = new Buffer(record.fields.name).toString('base64');
	// Keep only the image url
	record.fields.image = record.fields.image[0].url;
	// Syntax for hierachical menu
	if (typeof record.fields.subclass !== "undefined"){
		record.fields.lvl1 = record.fields.class + ' > ' + record.fields.subclass;
	}
	// Flatten relations
	if (relationalContent){
		Object.keys(relationalContent).forEach((key,i) => {
			record.fields[key]= relationalContent[key];
		});
	}
	// Add the object to algolia index (update if exists)
	index.addObject(record.fields, (err, result) => {
		index.waitTask(result.taskID, () => {
			console.log('Indexed: '+ record.fields.name + ' – ' + record.fields.class  + ' – ' + record.fields.subclass);
		});
	});
}

let getRelations = (record, relations) => {
	let materials = {};
	async.each(relations, (relation, callback) => {
		let rel = relation.split(':');
		if (typeof record.fields[rel[1]] !== "undefined"){
			async.each(record.fields[rel[1]], (id, cb) => {
				// it's a lot in parrallel, airtable is limited to 5 requests per seconds
				getMaterial(id,rel[0], (material) => {
					if (typeof materials[rel[1]] === 'undefined'){
						materials[rel[1]] = [];
					}
					if (material.image){
						let image = material.image[0].url;
					} else {
						let image = null
					}
					materials[rel[1]].push({name:material.name, img:image});
					cb();
				});
			}, (err) => {
				if (err) { console.error(err); return; }
				callback();
			});
		} else {
			callback()
		}
	}, (err) => {
		if (err) { console.error(err); return; }
		transformRecord(record,materials);
		return 'done'
	});
}

let getMaterial = (id,relationTable, cb) => {
	base(relationTable).find(id, (err, materialObject) => {
		if (err) { console.error(err); return; }
		cb(materialObject.fields);
	});
}

let indexRecords = (table, relations) => {
	base(table).select({
		//maxRecords: 10, //debug
		view: "Grid view"
	}).eachPage(function page(records, fetchNextPage) {
		records.forEach((record) => {
			getRelations(record,relations);
		});
		fetchNextPage();
	}, function done(err) {
		if (err) { console.error(err); return; }
		console.log('all records, all pages');
	});
}

//index!

indexRecords('Stuff',["Material:armor_upgrade"]);
indexRecords('Food', ["Material:ingredients"]);
indexRecords('Material', ["Food:food_recipe","Stuff:armor_upgrade"]);
