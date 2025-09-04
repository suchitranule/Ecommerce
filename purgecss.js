import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";

const distPath = "dist/ecommerce/browser";

// Find the hashed CSS file
const files = fs.readdirSync(distPath);
const styleFile = files.find(f => f.startsWith("styles-") && f.endsWith(".css"));
if (!styleFile) {
  console.error("❌ No styles-*.css file found in dist folder!");
  process.exit(1);
}

const stylePath = path.join(distPath, styleFile);
console.log("🎯 Found CSS file:", styleFile);

async function run() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      'src/**/*.html',
      'src/**/*.ts'
    ],
    css: ['dist/ecommerce/browser/styles-YPD7T5SI.css'],
    safelist: {
      standard: [
        /^btn/,       // keep all Bootstrap buttons
        /^col/,       // grid system
        /^row/,       // row
        /^container/, // container and container-fluid
        /^navbar/,    // navbars
        /^dropdown/,  // dropdown menus
        /^alert/,     // alerts
        /^card/,      // cards
        /^form/,      // forms
      ],
    },
  })

  fs.writeFileSync(
    stylePath,
    purgeCSSResults[0].css,
    'utf-8'
  )
  console.log("✅ PurgeCSS complete")
}

run()
