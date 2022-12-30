/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
	test: {
		environment: "jsdom",
		coverage: {
			provider: "c8",
		},
	},
	plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
});
