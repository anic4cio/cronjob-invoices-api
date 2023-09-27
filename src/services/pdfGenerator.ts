import PDFDocument from 'pdfkit'

type PDFFile = PDFKit.PDFDocument

const margins = {
  left: 80
}

export const makePDF = async () => {
  const doc = new PDFDocument({ size: 'A4' })
  const buffers: Buffer[] = []
  doc.on('data', buffers.push.bind(buffers))
  buildDocumentHeader(doc)



  return await returnPDFBuffer(doc, buffers)
}

const buildDocumentHeader = (doc: PDFFile) => {
  placeCCIcon(doc)
  writeHeadInfo(doc, 'Ofício ./2022')
}

const placeCCIcon = (doc: PDFFile) => {
  doc
    .image('./images/cc-icon.png', 185, 35, { width: 200 })
    .moveDown
}

const writeHeadInfo = (doc: PDFFile, content: string) => {
  doc
    .fontSize(13)
    .font('Helvetica-Bold')
    .text(content, margins.left, 130)
    .moveDown()
}

const returnPDFBuffer = (
  doc: PDFKit.PDFDocument,
  buffers: Buffer[]
): Promise<Buffer> => {
  return new Promise(resolve => {
    doc.on('end', () => resolve(Buffer.concat(buffers)))
    doc.end()
  })
}

import fs from 'fs';
(async () => {
  const pdf = await makePDF()
  fs.writeFileSync('./oficio.pdf', pdf)
})()