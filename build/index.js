"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bot");
const bot_1 = require("./bot");
const rest_api_1 = require("./rest-api");
const PORT = process.env.PORT || 8000;
const api = (0, rest_api_1.createRestApi)(bot_1.client);
api.listen(PORT, () => console.log(`Rest api up at ${PORT}`));
