const withTM = require("next-transpile-modules")
const withPWA = require("next-pwa")

module.exports = withTM([
    "@amcharts/amcharts4/core",
    "@amcharts/amcharts4/charts",
    "@amcharts/amcharts4/themes/animated"
]); // pass the modules you would like to see transpiled

module.exports = withPWA({
    pwa: {
        dest: "public",
        swSrc: "service-worker.js"
    }
});