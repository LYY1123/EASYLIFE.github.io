var webpack = require('webpack')
var rm = require('rimraf')
var proConfig = require('./webpack.pro.config.js')

rm("./dist",err => {
	webpack(proConfig,(e,stats) => {
		if (e || stats.hasErrors()) {
			let errs = e || stats.hasErrors();
	    console.log(errs)
	  }
		process.stdout.write(stats.toString({
	      colors: true,
	      modules: false,
	      children: false,
	      chunks: false,
	      chunkModules: false
	    }) + '\n')

		console.log('')
	})
})

