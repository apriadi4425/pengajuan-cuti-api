const fs = require('fs');
const { TemplateHandler } = require('easy-template-x');
const request = require('request')




const BuatDokument = async (req, res) => {
    // 1. read template file
    const templateFile = fs.readFileSync('template/myTemplate.docx');

// 2. process the template
    const data = {
        posts: [
            { author: 'Alon Bar2', text: 'Very important\ntext here!' },
            { author: 'Alon Bar', text: 'Forgot to mention that...' },
            { author: 'Alon Bar', text: 'Forgot to mention that...' },
        ]
    };

    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

// 3. save output
    fs.writeFileSync('template/pengajuan.docx', doc);

    res.download('template/pengajuan.docx');
}

module.exports = { BuatDokument }
