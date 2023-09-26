import PDFDocument from 'pdfkit'


export const makePDF = async () => {
  const doc = new PDFDocument({ autoFirstPage: false })
  const buffers: Buffer[] = []
  doc.on('data', buffers.push.bind(buffers))

  return await returnPDFBuffer(doc, buffers)
}

const returnPDFBuffer = (
  doc: PDFKit.PDFDocument,
  buffers: Buffer[]
) => {
  return new Promise(resolve => {
    doc.on('end', () => resolve(Buffer.concat(buffers)))
    doc.end()
  })
}