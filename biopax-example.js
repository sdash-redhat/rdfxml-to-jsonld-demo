var $rdf = require('rdflib');
var jsonld = require('jsonld');

// For quick access to those namespaces:
var FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
var RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
var RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
var OWL = $rdf.Namespace('http://www.w3.org/2002/07/owl#');
var DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
var RSS = $rdf.Namespace('http://purl.org/rss/1.0/');
var XSD = $rdf.Namespace('http://www.w3.org/TR/2004/REC-xmlschema-2-20041028/#dt-');
var CONTACT = $rdf.Namespace('http://www.w3.org/2000/10/swap/pim/contact#');

// TestStore implementation from dig.csail.mit.edu/2005/ajar/ajaw/test/rdf/rdfparser.test.html
// RDFIndexedFormula from dig.csail.mit.edu/2005/ajar/ajaw/rdf/identity.js
//  (extends RDFFormula from dig.csail.mit.edu/2005/ajar/ajaw/rdf/term.js which has no indexing and smushing)
// for the real implementation used by Tabulator which uses indexing and smushing

var kb = $rdf.graph();

var uri = 'http://www.pathwaycommons.org/pc2/Pathway_01c4db97c8d95c5c2480943ea1cb3038';

var docURI;
if (uri.indexOf('#') > -1) {
  docURI = uri.slice(0, uri.indexOf('#'));
} else {
  docURI = uri;
}

var fetch = $rdf.fetcher(kb);
fetch.nowOrWhenFetched(docURI,undefined,function(ok, body){ // @@ check ok
  console.log('Success: ' + ok);

  var nquads = kb.toString().replace(/{/g,'').replace(/}/g,'');

  /*
  // use the promises API
  var promises = jsonld.promises();

  // deserialize from RDF
  var promise = promises.fromRDF(nquads, {format: 'application/nquads'});
  promise.then(function(doc) {
    console.log('doc');
    console.log(doc);
  }, function(err) {
    console.log(err);

  });
  //*/

  // deserialize N-Quads (RDF) to JSON-LD
  jsonld.fromRDF(nquads, {format: 'application/nquads'}, function(err, doc) {
    // doc is JSON-LD
    console.log(JSON.stringify(doc, null, '\t'));
    return;
  });
});
