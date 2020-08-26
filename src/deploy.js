const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = async () => {
  const options = {
    cwd: "/home/song/repos/databases",
  };
  const appName = "learndatabases.dev";
  const results = [];
  try {
    const result = await exec("git checkout -f", options);
    results.push(result.stdout);
    console.log(result.stdout);
  } catch (e) {
    console.log(e);
  }
  try {
    const result1 = await exec("git pull origin master", options);
    results.push(result1.stdout);
    console.log(result1.stdout);
  } catch (e) {
    console.log(e);
  }
  try {
    const result2 = await exec("npm i", options);
    console.log(result2.stdout);
    results.push(result2.stdout);
  } catch (e) {
    console.log(e);
  }
  try {
    const result3 = await exec(`pm2 delete ${appName}`, options);
    console.log(result3.stdout);
    results.push(result3.stdout);
  } catch (e) {
    console.log(e);
  }
  try {
    const result4 = await exec(
      `pm2 start npm --name "${appName}" -- start`,
      options
    );
    console.log(result4.stdout);
    results.push(result4.stdout);
  } catch (e) {
    console.log(e);
  }
  return results;
};
