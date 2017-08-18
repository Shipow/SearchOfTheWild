// It's dangerous to go alone!
let airtable = require('airtable');
let algolia = require('algoliasearch');
let async = require('async');
// secret, edit with your own API credentials
let config = require('../secret.config.json');

let base = new airtable({apiKey: config.airtable.apiKey}).base(config.airtable.base);
let client = algolia(config.algolia.appID, config.algolia.apiKey);
let index = client.initIndex(config.algolia.index);

let transformRecord = (record,relationalContent) => {
	// Create an objectID from the primary key field of your row
	if (record && record.fields.name){
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
}

// cache material relations to avoid too many calls to airtable
var materialCache = {};

let getRelations = (record, relations) => {
	let materials = {};
	async.eachSeries(relations, (relation, callback) => {
		let rel = relation.split(':');
		if (typeof record.fields[rel[1]] !== "undefined"){
			async.eachLimit(record.fields[rel[1]], 4,(id, cb) => {
				// 4 in parrallel, airtable is limited to 5 requests per seconds
				getMaterial(id,rel[0], materialCache, (material) => {
					if (typeof materials[rel[1]] === 'undefined'){
						materials[rel[1]] = [];
					}
					if (material.image){
						materials[rel[1]].push({name:material.name, img: material.image[0].url});
					} else {
						materials[rel[1]].push({name:material.name});
					}
					materialCache[id]= material;
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
		transformRecord(record, materials);
		return 'done'
	});
}

let getMaterial = (id,relationTable,materialCache, cb) => {
	if (typeof materialCache[id] !== 'undefined' && typeof materialCache[id].name !== 'undefined'){
		//console.log('Loaded from cache: ' + materialCache[id].name);
		cb(materialCache[id]);
	} else {
		base(relationTable).find(id, (err, materialObject) => {
			if (err) { console.error(err); return; }
			cb(materialObject.fields);
		});
	}
}

let indexRecords = (table, relations) => {
	base(table).select({
		//maxRecords: 20, //debug
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
