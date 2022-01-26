module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        require('postcss-preset-env'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
// doubt in order

// auto prefixer vs preset-env...why is auto prefixer dead
// what is the relation between browserlist 

// 'Autoprefixer target browsers do not need any prefixes.' +
//   'You do not need Autoprefixer anymore.\n' +
//   'Check your Browserslist config to be sure that your targets ' +
//   'are set up correctly.\n' +
//   '\n' +
//   '  Learn more at:\n' +
//   '  https://github.com/postcss/autoprefixer#readme\n' +
//   '  https://github.com/browserslist/browserslist#readme\n' +
//   '\n'