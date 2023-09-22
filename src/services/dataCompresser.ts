import archiver from 'archiver'
import fs from 'fs'

export const compressFile = (fileToZip: Buffer) => {
  const output = fs
    .createWriteStream(__dirname + '/appointments.zip')
  const archive = archiver('zip', {
    zlib: { level: 9 }
  })
  archive.pipe(output)
  archive.append(fileToZip)
  archive.finalize()
  return output
}
