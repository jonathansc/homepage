const pug = require('pug');

class TGen{
    constructor(template_folder){
        this.template_folder = template_folder;
    }

    render(file, data) {
        let comp_fn = pug.compileFile(`${this.template_folder}/${file}.pug`);
        let html_code = comp_fn(data);
        return html_code;
    }
}

module.exports = TGen;