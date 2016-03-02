#!/usr/local/bin/node

var dot = require('dot');
dot.templateSettings.strip = false;

var fs = require('fs');
require('colors');
var _ = require('underscore');
var YAML = require('js-yaml');

// Set to true for extra debugging
var DEBUG = false;

JSON.minify = JSON.minify || require('node-json-minify');

(function() {
    createAutomatedBuilds()
})();

// ===============================================================================
function createAutomatedBuilds() {
    console.log("Creating Automated Builds\n".cyan);

    var dirs = fs.readdirSync(__dirname).filter(isDirectory);
    dirs.forEach(function (image) {
        var config = getConfig(__dirname + '/' + image + '/config.yml');
        if (!config.tags) {
            //If we don't have tags, it means we don't have config file and so we shouldn't have templates
            return;
        }
        execWithTemplates(image, function(templates) {
            config.tags.forEach(function(tag) {
                console.log(image.green + ':' + tag.green);
                ensureDir(__dirname + "/" + image + '/' + tag);
                var changed = false;
                templates.forEach(function(template) {
                    var file = template.file.replace(/(^.*)(\.template)/, '$1');
                    var templateHasChanged =
                        fillTemplate(image + '/' + tag + "/" + file,
                            template.templ,
                            _.extend(
                                {},
                                {
                                    "version": tag,
                                    "config": _.extend({}, config.config['default'], config.config[tag])
                                }
                            ));
                    changed = changed || templateHasChanged;
                });
                if (!changed) {
                    console.log("       UNCHANGED".yellow);
                }
            });
        });
    });
}

function getConfig(path) {
    var config = {};
    if (fs.existsSync(path)) {
        config = YAML.safeLoad(fs.readFileSync(path, 'utf8'));
    }
    return config;
}

function execWithTemplates(path, templFunc) {
    var templates = fs.readdirSync(path)
        .filter(function(fileName) {
            return /\.template$/.test(fileName)
        });
    var ret = [];
    templates.forEach(function (template) {
        ret.push({
            "templ" : dot.template(fs.readFileSync(path + '/' + template, 'utf8')),
            "file" : template
        });
    });
    templFunc(ret);
}

function fillTemplate(file, template, config) {
    var newContent = template(config).trim() + "\n";
    var label = file.replace(/.*\/([^\/]+)$/,"$1");
    if (!newContent.length) {
        console.log("       " + label + ": " + "SKIPPED".grey);
        return false;
    } else {
        var exists = fs.existsSync(file);
        var oldContent = exists ? fs.readFileSync(file, "utf8") : undefined;
        if (!oldContent || newContent.trim() !== oldContent.trim()) {
            console.log("       " + label + ": " + (exists ? "CHANGED".green : "NEW".yellow));
            fs.writeFileSync(file,newContent,{ "encoding" : "utf8"});
            return true;
        }
    }
    return false;
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,0755);
    }
    if (!isDirectory(dir))
        throw new Error(dir + " is not a directory");
}

function isDirectory(path) {
    var stat = fs.statSync(path);
    return stat.isDirectory();
}