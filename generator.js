const fs = require('fs');
const TGen = require('./util/tgen');
const Site = require('./util/site');

const data_dir = 'data';
const template_dir = 'pug';

let tgen = new TGen(template_dir);

// RM OLD HTML FILES
let files = fs.readdirSync('public/');
files.forEach(file=>{
    if(file.includes(".html")) fs.unlinkSync(`public/${file}`);
});

// CREATE SITES
// STANDARD
let sites = [
    new Site('Index', 'index.html', 'index', true),
    new Site('Birds', 'birds.html', 'birds', true),
];
// SITES FROM ./data
let bird_sites = [];
files = fs.readdirSync(`${data_dir}/birds`);
files.forEach(file=>{
    let data = fs.readFileSync(`${data_dir}/birds/${file}`);
    let bird = JSON.parse(data);

    let bird_site = new Site(bird.title, bird.url+'.html', bird.template_file, false, bird);
    sites.push(bird_site);
    bird_sites.push(bird_site);
});

// CREATE NAV_ITEMS FOR PUG
let nav_items = {};
sites.forEach(site=>{
    if(site.in_navbar) nav_items[site.url] = site.title;
});

// GENERATE HTML FILES
let html_code = '';
sites.forEach(site=>{
    html_code = tgen.render(site.template_file, {
        'title': site.title,
        'nav_items': nav_items,
        'bird_sites': bird_sites,
        'additional_data': site.data,
    });

    fs.writeFile(`./public/${site.url}`, html_code, err => {
        if(err) throw err;
    });
});