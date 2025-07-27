"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 3000;
const app = (0, app_1.createApp)();
app.listen(PORT, () => {
    logger_1.logger.info(`Server running on port ${PORT}`);
});
