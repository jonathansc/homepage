class Site{
    constructor(title, url, template_file, in_navbar, data){
        this.title = title;
        this.url = url;
        this.template_file = template_file;
        this.in_navbar = in_navbar;
        this.data = data;
    }
}

module.exports = Site;