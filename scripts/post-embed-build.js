const path = require('node:path')
const fs = require('node:fs')

const projectRoot = path.join(__dirname, '..')

// copy embed assets to embedr

const embedAssetSource = path.join(projectRoot, 'bskyembed', 'dist', 'static')

const embedAssetDest = path.join(projectRoot, 'bskyweb', 'embedr-static')

fs.cpSync(embedAssetSource, embedAssetDest, {recursive: true})

const embedEmbedJSSource = path.join(
  projectRoot,
  'bskyembed',
  'dist',
  'embed.js',
)

const embedEmbedJSDest = path.join(
  projectRoot,
  'bskyweb',
  'embedr-static',
  'embed.js',
)

fs.cpSync(embedEmbedJSSource, embedEmbedJSDest)

// copy entrypoint(s) to embedr

// additional entrypoints will need more work, but this'll do for now
const embedHomeHtmlSource = path.join(
  projectRoot,
  'bskyembed',
  'dist',
  'index.html',
)

const embedHomeHtmlDest = path.join(
  projectRoot,
  'bskyweb',
  'embedr-templates',
  'home.html',
)

fs.copyFileSync(embedHomeHtmlSource, embedHomeHtmlDest)

const embedPostHtmlSource = path.join(
  projectRoot,
  'bskyembed',
  'dist',
  'post.html',
)

const embedPostHtmlDest = path.join(
  projectRoot,
  'bskyweb',
  'embedr-templates',
  'postEmbed.html',
)

fs.copyFileSync(embedPostHtmlSource, embedPostHtmlDest)

// copy additional static assets (favicons, logos) from main bskyweb static directory
const mainStaticAssets = [
  'apple-touch-icon.png',
  'safari-pinned-tab.svg',
  'social-card-default-gradient.png',
  'social-card-default.png',
]

const bskywebStaticDir = path.join(projectRoot, 'bskyweb', 'static')
const embedrStaticDir = path.join(projectRoot, 'bskyweb', 'embedr-static')

mainStaticAssets.forEach(asset => {
  const sourcePath = path.join(bskywebStaticDir, asset)
  const destPath = path.join(embedrStaticDir, asset)

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath)
    console.log(`Copied ${asset} to embedr-static`)
  } else {
    console.warn(`Warning: ${asset} not found in bskyweb/static`)
  }
})

console.log(`Copied embed assets to embedr`)
