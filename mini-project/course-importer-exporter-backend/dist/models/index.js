/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import configJson from "../config/db.config.js";
import { pathToFileURL } from "url";
import { getDirname, getBasename } from "../global/path.global.js";
const appModels = [];
const __dirname = getDirname(import.meta.url);
const basename = getBasename(import.meta.url);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const db = { Sequelize };
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new Sequelize(config.database ?? "", config.username ?? "", config.password ?? "", config);
}
const loadModels = async () => {
    const extension = process.env.NODE_ENV === "production" ? ".js" : ".ts";
    console.log(extension);
    console.log(__dirname);
    const files = fs.readdirSync(__dirname).filter((file) => {
        return (!file.startsWith(".") &&
            file !== basename &&
            file.endsWith(".js") &&
            file.indexOf(".test" + extension) === -1);
    });
    const modelImports = files.map((file) => import(pathToFileURL(path.join(__dirname, file)).href));
    let models = await Promise.all(modelImports);
    appModels.forEach((appModel) => {
        models = models.concat(appModel.default);
    });
    models.forEach((modelModule) => {
        const model = modelModule.default(sequelize, DataTypes);
        db[model.name] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
};
await loadModels();
db.sequelize = sequelize;
export default db;
