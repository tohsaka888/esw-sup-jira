"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_swc_1 = require("@vitejs/plugin-react-swc");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)()],
    build: {
        outDir: "../dist/web", // 打包目录
    },
});
//# sourceMappingURL=vite.config.js.map