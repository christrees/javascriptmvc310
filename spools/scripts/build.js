//steal/js spools/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('spools/scripts/build.html',{to: 'spools'});
});
