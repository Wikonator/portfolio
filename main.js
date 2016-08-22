 var http = require("http");
var fileus = require("fs");
var generator = require("./generator.js");

try {
    var projectList = fileus.readdirSync("./projects");

} catch (e) {
    console.log(e);
    return;
}

function isOnGuestList(url) {
    var preparedUrl = url.split("").filter(function (char) {
        return !(char == "/");
    }).join("");
    return projectList.some(function (project) {
        console.log(preparedUrl);
        console.log( project);
        return preparedUrl ==  project;
    });
}

function endsInSlash(url) {
    return url[url.length-1] == "/";
}

function streamAFile (path, resp) {
    var streamy = fileus.createReadStream(path);
    streamy.on("error", function(error) {
        console.log(error);
    });
    streamy.pipe(resp);
}

var serverus = http.createServer(function (req, resp) {
        req.on("error", function (error) {
            console.log(error);
        });
        resp.on("error", function (error){
            console.log(error);
        });

        if (req.method !== "GET") {
            resp.writeHead(403);
            resp.end("computer says: No");

        } else {
            var url = req.url;
            // console.log(isOnGuestList(url));
            // console.log(endsInSlash(url));
            var htmlPath;
            if (!isOnGuestList(url) && endsInSlash(url)) {
                resp.writeHead(404);
                resp.end("Ain't here boss");
            } else if (isOnGuestList(url) && !endsInSlash(url)) {
                if (url == "/discoduck/") {
                    //import from generator.js;
                    console.log("Fire n the ole!");
                    resp.writeHead(200, {"content-type": "text/html"});
                    var streamy = fileus.createReadStream(path);
                    streamy.on("error", function(error) {
                        console.log(error);
                    });
                    streamy.pipe(generator);
                } else {
                resp.writeHead(303, {"Location": url +"/"});
                resp.end();
                }
            } else if (isOnGuestList(url) && endsInSlash(url)) {
                var htmlPath = __dirname + "/projects" + url + "index.html";
                resp.writeHead(200, {"content-type": "text/html"});
                streamAFile(htmlPath, resp);
            } else {
                var justPath = __dirname + "/projects" + url;
                streamAFile(justPath, resp);

            }
        }

            // streamius.on("open", function() {
            //     streamius.pipe(resp);
            // });


});

serverus.listen(9001, function() {
    console.log("Say no more fam");
});

// redirect to xxxx/spotify/
