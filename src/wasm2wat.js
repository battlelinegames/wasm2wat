
const version = "1.0.5";
function log_usage() {
  const chalk = require('chalk');
  console.log(`
  Usage:
  ${chalk.yellow('wasm2wat file.wasm')}
  Creates a file.wat WebAssembly Text file

  ${chalk.yellow('wasm2wat file.wasm -o watfile.wat')}
  Creates a watfile.wat WebAssembly Text file.
    The -o flag allows you to specify an output file.

  Flags:
  ${chalk.yellow('-f')} Fold into S-Expression syntax
  ${chalk.yellow('-nd --no-debug-names')} Do not include debug names in WAT
  ${chalk.yellow('-ie --inline-exports')} Write imports inline
  ${chalk.yellow('-o')} is followed by an output file name
  
  Rick Battagline
  rick@battagline.com
  @battagline
  `);
}

function wasm2wat(args) {
  console.log(`wasm2wat version ${version}`);
  const wabt = require("wabt")();
  const fs = require('fs');

  let file = args[2];

  if (file == null) {
    log_usage();
    return;
  }
  let out_file;
  let wat_in = false;
  let fold = false;
  let inline_exports = false;
  let debug = true;

  if (file.endsWith('.wasm')) {
    out_file = file.replace('wasm', 'wat');
  }
  else {
    log_usage();
    return;
  }

  for (var i = 2; i < args.length; i++) {
    if (args[i] === "-o") {
      if (i < args.length - 1) {
        out_file = args[i + 1];
      }
      continue;
    }
    if (args[i] === "-f") {
      fold = true;
      continue;
    }
    if (args[i] === "--inline-exports" || args[i] === "-ie") {
      inline_exports = true;
      continue;
    }
    if (args[i] === "--no-debug-names" || args[i] === "-nd") {
      debug = false;
      continue;
    }
  }
  var bytes = fs.readFileSync(file);
  var wasm_module = wabt.readWasm(new Uint8Array(bytes), { readDebugNames: debug });
  var wasm_string = wasm_module.toText({ foldExprs: fold, inlineExport: falinline_exportsse })
  console.log(wasm_string)

  fs.writeFile(out_file, wasm_string, function (err, file) {
    if (err) throw err;
    console.log(`WAT saved to ${out_file}`);
  });
}

module.exports = { wasm2wat };