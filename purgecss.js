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

// (async () => {
//   try {
//     const purgeCSSResult = await new PurgeCSS().purge({
//       content: [
//         // 👇 Use Angular source templates instead of minified JS
//         "src/**/*.html",
//         "src/**/*.ts"
//       ],
//       css: [stylePath],
//       safelist: {
//         standard: [/^cdk-/, /^mat-/, /^ng-/, /^carousel/, /^modal/], // prevent removing Angular/Bootstrap classes
//       },
//     });

//     if (!purgeCSSResult || !purgeCSSResult.length) {
//       console.error("❌ PurgeCSS returned no result!");
//       process.exit(1);
//     }

//     fs.writeFileSync(stylePath, purgeCSSResult[0].css, "utf-8");
//     console.log(`✅ Purged and replaced: ${styleFile}`);
//   } catch (err) {
//     console.error("💥 Error in PurgeCSS:", err);
//   }
// })();


async function run() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      'src/**/*.html',
      'src/**/*.ts'
    ],
    css: ['dist/ecommerce/browser/styles-YPD7T5SI.css']
  })

  fs.writeFileSync(
    stylePath,
    purgeCSSResults[0].css,
    'utf-8'
  )
  console.log("✅ PurgeCSS complete. Output: dist/ecommerce/browser/styles.purged.css")
}

run()
