var fs = require("fs");
var Handlebars = require("Handlebars");
var compileTemplate;
var arrayOfLinks;
var arrayOfNames = [];
var exports = module.exports = {};


fs.readdir("./projects", function read(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    arrayOfLinks = data;
    function transformObject(data) {
        for (z = 0; z < data.length; z++) {
            var tempOb = {
                img: "./projects/" + data[z] + "/img.jpeg",
                text: data[z],
                link: "/" + data[z]
            };
            arrayOfNames.push(tempOb);
        }
    }

    transformObject(arrayOfLinks);
    // console.log(arrayOfNames);

    fs.readFile("./projects.hbs", "UTF-8", function read(err, template){
        if (err) {
            console.log(err);
            return;
        }
        compileTemplate = template;
        // console.log(compileTemplate);
        var fillTheSpaces = Handlebars.compile(compileTemplate);

        function templateMate(data) {
            var readyData = fillTheSpaces(data);
            module.exports = readyData;
            console.log(readyData);
        }
        templateMate(arrayOfNames);

    });

});
