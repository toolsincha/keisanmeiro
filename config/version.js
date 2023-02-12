const name = "けいさんめいろ";
const version = "3.0.25";

let dir_name = "latest";
//let dir_name = null;
let version_dir_name = "v" + version.replace(/\./g, '_');

if (!dir_name) {
  dir_name = version_dir_name;
}

module.exports = {
  version,
  version_dir_name,
  name,
  title: `ver ${version}`,
  publicPath: `/game/keisanmeiro/${dir_name}/`,
};