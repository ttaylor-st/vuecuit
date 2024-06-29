import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "io.github.vuecuit",
	appName: "vuecuit",
	webDir: "dist",
	plugins: {
		CapacitorHttp: {
			enabled: true
		},
		CapacitorCookies: {
			enabled: true
		}
	}
};

export default config;
