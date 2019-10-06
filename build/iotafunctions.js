"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@iota/core");
function getAPI() {
    return core_1.composeAPI({ provider: "http://localhost:14625" });
}
exports.getAPI = getAPI;
//# sourceMappingURL=iotafunctions.js.map