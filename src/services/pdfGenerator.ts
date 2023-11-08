import PDFDocument from 'pdfkit'
import commonmark from 'commonmark'
import CommonmarkPDFRenderer from 'pdfkit-commonmark'
import { makeFriendlyCurrentDate } from './friendlyDateCreator'

type PDFFile = PDFKit.PDFDocument

const margins = {
  top: 50,
  bottom: 50,
  left: 80,
  right: 40
}

export const makePDF = async () => {
  const doc = new PDFDocument({
    size: 'A4',
    margins
  })
  const buffers: Buffer[] = []
  doc.on('data', buffers.push.bind(buffers))
  buildDocumentHeader(doc)
  buildDocumentBody(doc)
  return await returnPDFBuffer(doc, buffers)
}

const buildDocumentHeader = (doc: PDFFile) => {
  placeCCIcon(doc)
  writeHeadInfo(doc, 'Ofício ./2022')
  writeFriendlyDate(doc)
}

const placeCCIcon = (doc: PDFFile) => {
  doc
    .image('./images/cc-icon.png', 185, 35, { width: 200 })
    .moveDown
}

const writeHeadInfo = (doc: PDFFile, content: string) => {
  const firstLineBellowTheIcon = 130
  doc
    .fontSize(13)
    .font('Helvetica-Bold')
    .text(content, margins.left, firstLineBellowTheIcon)
    .moveDown()
}

const writeFriendlyDate = (doc: PDFFile) => {
  const today = makeFriendlyCurrentDate()
  doc
    .text(today, { align: 'right' })
    .moveDown(2)
}

const md =
  `À Sua Excelência a Senhora
*Desembargador J.J. Costa Tronco*
Corredor de Justiça do Distrito Federal
Corridoria de Justiça
Palácio da Justiça - Bloco XYZ
CEP: 10.990-900- Brasília-DF

Assunto: *Juízes de Paz Ad Hoc. PA (xxx) xxxxx.xx-x*`

const buildDocumentBody = (
  doc: PDFKit.PDFDocument
) => {
  const reader = new commonmark.Parser()
  const parsed = reader.parse(md)
  const writer = new CommonmarkPDFRenderer()
  doc.font('Helvetica')
  writer.render(doc, parsed)
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
