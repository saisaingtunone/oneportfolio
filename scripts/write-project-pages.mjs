import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { projects, projectUrl } from '../src/content.ts'

const shell = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

await Promise.all(projects.map(async project => {
  const directory = 'dist' + projectUrl(project.id)
  await mkdir(directory, { recursive: true })
  const page = shell.replace(/<title>.*?<\/title>/, '<title>' + escape(project.title) + ' — Sai Saing Tun One</title>')
    .replace(/(<meta name="description" content=")[^"]+(")/, (_, start, end) => start + escape(project.summary) + end)
  await writeFile(directory + 'index.html', page)
}))
