module.exports = (eleventyConfig) => {
	  // Copy the "assets" directory to the compiled "_site" folder.
	  eleventyConfig.addPassthroughCopy('assets');
	  eleventyConfig.addPassthroughCopy('images');
	  eleventyConfig.addPassthroughCopy('style.css');
	  eleventyConfig.addPassthroughCopy('style.css.map');



	  
	  return {
		dir: {
		  input: './',
		  output: './_site',
		  layouts: './_layouts',
		},
		templateFormats: [
		  'html',
		  'liquid',
		  'md',
		  'njk',
		],
		//pathPrefix: '/<repo_name>/', // omit this line if using custom domain
	  };
	};