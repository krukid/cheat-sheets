#!/usr/bin/env node

const Fs = require('fs')
const Path = require('path')
const Cheerio = require('cheerio')
const SvgPath = require('svgpath')
const Express = require('express')

const VIEWBOX = '0 0 400 400'
const SPACING = '0'
const SUFFIX = '_normalized'
const EXTENSION_REGEX = /(\.\w+$)/

function expandFilePaths(sourceRelPath) {
  try {
    const SOURCE_PATH = Fs.realpathSync(`src/${sourceRelPath}`)
    const TARGET_PATH = SOURCE_PATH.replace(EXTENSION_REGEX, `${SUFFIX}$1`)
    const DEBUG_PATH = TARGET_PATH.replace(EXTENSION_REGEX, '.html')
    return { SOURCE_PATH, TARGET_PATH, DEBUG_PATH }
  } catch (e) {
    console.error(e)
    console.error('Synapse: ./scripts/mounted/svgnorm.js assets/icons.svg')
    process.exit(1)
  }
}

const { SOURCE_PATH, TARGET_PATH, DEBUG_PATH } = expandFilePaths(process.argv[2])

function $parseSVG(absolutePath) {
  try {
    return Cheerio.load(Fs.readFileSync(absolutePath), {
      xmlMode: true,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

function $exportSVG(absolutePath, symbols) {
  Fs.writeFileSync(absolutePath, `
    <svg width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        ${symbols.map(serialize).join('\n')}
      </defs>
    </svg>
  `)
}

function $exportHTML(htmlPath, svgPath, symbols) {
  const svgName = Path.basename(svgPath)
  function icon({id}) {
    return `<svg class="icon"><use xlink:href="${svgName}#${id}" /></svg>`
  }
  const symbolHTML = symbols.map(icon).join('\n')
  Fs.writeFileSync(htmlPath, `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Symbols test page</title>
      <style>
        body {
          margin: 50px;
          color: red;
        }
        \.--small {
          font-size: 20px;
        }
        \.--normal {
          font-size: 40px;
        }
        \.--large {
          font-size: 80px;
        }
        .icon {
          display: inline-block;
          width: 1em;
          height: 1em;
          border: dashed 1px #000;
          margin: 5px;
        }
        .\--fill .icon {
          fill: currentColor;
          stroke: none;
        }
        .\--stroke .icon {
          stroke: currentColor;
          stroke-width: 15;
          fill: none;
        }
      </style>
    </head>
    <body>
      <div class="--fill --small">${symbolHTML}</div>
      <div class="--stroke --small">${symbolHTML}</div>
      <div class="--fill --normal">${symbolHTML}</div>
      <div class="--stroke --normal">${symbolHTML}</div>
      <div class="--fill --large">${symbolHTML}</div>
      <div class="--stroke --large">${symbolHTML}</div>
    </body>
    </html>
  `)
}

function normalizer(targetViewbox, targetSpacing) {
  const [nx, ny, nw, nh] = targetViewbox.split(' ').map(Number)
  const nm = Number(targetSpacing)
  return (viewbox, d) => {
    var [x, y, w, h] = viewbox.split(' ').map(Number)
    var sx = (nw - 2 * nm - nx) / (w - x)
    var sy = (nh - 2 * nm - ny) / (h - y)
    return SvgPath(d)
      .translate(-x, -y)
      .scale(sx, sy)
      .translate(nx + nm, ny + nm)
      .unshort()
      .unarc()
      .round()
      .rel()
      .toString()
  }
}

function serialize({id, paths}) {
  return `
    <symbol id="${id}" viewBox="${VIEWBOX}">
      ${paths.map(d => `<path d="${d}" />`).join('\n')}
    </symbol>
  `.trim()
}

///////////////////////////////////////

const $svg = $parseSVG(SOURCE_PATH)
const normalize = normalizer(VIEWBOX, SPACING)

const symbols = $svg('symbol').map(function() {
  const $symbol = Cheerio(this)

  const id = $symbol.attr('id')
  const vb = $symbol.attr('viewBox')

  // @see https://stackoverflow.com/questions/10717190/convert-svg-polygon-to-path
  const paths = $symbol.children().map(function() {
    const $element = Cheerio(this)

    switch (this.name) {
      case 'path':
        return $element.attr('d')
      case 'polygon':
        return 'M' + $element.attr('points') + 'z'
      case 'polyline':
        return 'M' + $element.attr('points')
      default:
        throw `Unsupported element found in symbol #${id}: ${this.name}`
    }
  }).toArray().map(path => normalize(vb, path))

  return {id, paths}
}).toArray()

$exportSVG(TARGET_PATH, symbols)
$exportHTML(DEBUG_PATH, TARGET_PATH, symbols)

const sourceSize = Fs.statSync(SOURCE_PATH).size
const targetSize = Fs.statSync(TARGET_PATH).size
console.log(`
SVG successfully normalized:
  Source (${sourceSize} B): ${SOURCE_PATH}
  Target (${targetSize} B): ${TARGET_PATH}
  Debug\t: ${DEBUG_PATH}
File size reduction: ${sourceSize - targetSize} B
`)

// @todo generate a local html file instead with inline SVG
const app = Express()
app.use(Express.static(Path.dirname(TARGET_PATH)))
app.listen(8080, '0.0.0.0', () => {
  console.log(`*** Serving test page at http://0.0.0.0:8080/`)
})