import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

const createReport = async () => {
  const page1 = PDFPage
    .create()
    .setMediaBox(200, 200)
    .drawText('You can add text and rectangles to the PDF!', {
      x: 5,
      y: 235,
      color: '#007386',
      fontName: 'Roboto'
    })
    .drawRectangle({
      x: 25,
      y: 25,
      width: 150,
      height: 150,
      color: '#FF99CC',
    })
    .drawRectangle({
      x: 75,
      y: 75,
      width: 50,
      height: 50,
      color: '#99FFCC',
    });

  const docsDir = await PDFLib.getDocumentsDirectory();
  const pdfPath = `${docsDir}/sample.pdf`;
  PDFDocument
    .create(pdfPath)
    .addPages(page1)
    .write()
    .then((path) => {
      console.warn(`PDF created at: ${path}`);
    });
}

export default createReport
