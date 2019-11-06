const mdToPdf = require('md-to-pdf');

const config = {
    "pdf_options": {
      "format": "Letter",
      "margin": "15mm",
      "displayHeaderFooter": true,
      "headerTemplate": "<style>section {padding-left: 10mm; padding-right: 10mm; font-family: system-ui; font-size: 11px; }</style><section><span class='title'></span> - <span class='date'></span></section>",
      "footerTemplate": "<section><div>Page <span class='pageNumber'></span> of <span class='totalPages'></span></div></section>"
    },
      "stylesheet_encoding": "utf-8"
};

const docs = ['README'];

const start = async () => {
    for (let docName of docs) {
        config.dest = docName + '.pdf';
        const pdf = await mdToPdf(docName + '.md', config).catch(console.error);
 
        if (pdf) {
            console.log(pdf.filename);
        }
    }
    console.log('Done');
  }

start();