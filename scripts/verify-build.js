const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
if (!fs.existsSync(outDir)) {
  console.error("\n❌ Build falló: no existe la carpeta out\n");
  process.exit(1);
}
const hasIndex = fs.existsSync(path.join(outDir, "index.html"));
if (!hasIndex) {
  console.error("\n❌ Build falló: out/ no contiene index.html\n");
  process.exit(1);
}
console.log("\n✅ Build correcto. Salida estática en out/ (para HostGator)\n");
process.exit(0);
