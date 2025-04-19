
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const ZLE_RPROMPT_INDENT: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const PYENV_SHELL: string;
	export const HYPRLAND_CMD: string;
	export const npm_config_cache: string;
	export const XDG_SESSION_PATH: string;
	export const NVM_INC: string;
	export const CLUTTER_BACKEND: string;
	export const XDG_BACKEND: string;
	export const QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
	export const NODE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const PYENV_VIRTUALENV_DISABLE_PROMPT: string;
	export const DESKTOP_SESSION: string;
	export const ELECTRON_OZONE_PLATFORM_HINT: string;
	export const KITTY_PID: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const npm_config_globalconfig: string;
	export const XCURSOR_SIZE: string;
	export const EDITOR: string;
	export const OPEN: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_config_init_module: string;
	export const _: string;
	export const KITTY_PUBLIC_KEY: string;
	export const JAVAFX_HOME: string;
	export const POSH_SHELL: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const LANG: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const POSH_SHELL_VERSION: string;
	export const npm_package_version: string;
	export const POSH_SESSION_ID: string;
	export const WAYLAND_DISPLAY: string;
	export const CLIPC: string;
	export const VIRTUAL_ENV_DISABLE_PROMPT: string;
	export const KITTY_WINDOW_ID: string;
	export const OSTYPE: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const XDG_SEAT_PATH: string;
	export const INIT_CWD: string;
	export const QT_QPA_PLATFORM: string;
	export const npm_lifecycle_script: string;
	export const NVM_DIR: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const ANDROID_HOME: string;
	export const TERMINFO: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const ZSH: string;
	export const npm_config_prefix: string;
	export const VENV: string;
	export const USER: string;
	export const SDL_VIDEODRIVER: string;
	export const OZONE_PLATFORM: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const LOCALAI: string;
	export const SHLVL: string;
	export const NVM_CD_FLAGS: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const POSH_THEME: string;
	export const XDG_RUNTIME_DIR: string;
	export const PYENV_ROOT: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const XDG_DATA_DIRS: string;
	export const GDK_BACKEND: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const GDK_SCALE: string;
	export const npm_config_node_gyp: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_global_prefix: string;
	export const NVM_BIN: string;
	export const MAIL: string;
	export const POWERLINE_COMMAND: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		ZLE_RPROMPT_INDENT: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		PYENV_SHELL: string;
		HYPRLAND_CMD: string;
		npm_config_cache: string;
		XDG_SESSION_PATH: string;
		NVM_INC: string;
		CLUTTER_BACKEND: string;
		XDG_BACKEND: string;
		QT_WAYLAND_DISABLE_WINDOWDECORATION: string;
		NODE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		PYENV_VIRTUALENV_DISABLE_PROMPT: string;
		DESKTOP_SESSION: string;
		ELECTRON_OZONE_PLATFORM_HINT: string;
		KITTY_PID: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		npm_config_globalconfig: string;
		XCURSOR_SIZE: string;
		EDITOR: string;
		OPEN: string;
		XDG_SEAT: string;
		PWD: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		npm_config_init_module: string;
		_: string;
		KITTY_PUBLIC_KEY: string;
		JAVAFX_HOME: string;
		POSH_SHELL: string;
		MOTD_SHOWN: string;
		HOME: string;
		LANG: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		POSH_SHELL_VERSION: string;
		npm_package_version: string;
		POSH_SESSION_ID: string;
		WAYLAND_DISPLAY: string;
		CLIPC: string;
		VIRTUAL_ENV_DISABLE_PROMPT: string;
		KITTY_WINDOW_ID: string;
		OSTYPE: string;
		CONDA_PROMPT_MODIFIER: string;
		XDG_SEAT_PATH: string;
		INIT_CWD: string;
		QT_QPA_PLATFORM: string;
		npm_lifecycle_script: string;
		NVM_DIR: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		ANDROID_HOME: string;
		TERMINFO: string;
		TERM: string;
		npm_package_name: string;
		ZSH: string;
		npm_config_prefix: string;
		VENV: string;
		USER: string;
		SDL_VIDEODRIVER: string;
		OZONE_PLATFORM: string;
		PAM_KWALLET5_LOGIN: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		LOCALAI: string;
		SHLVL: string;
		NVM_CD_FLAGS: string;
		MOZ_ENABLE_WAYLAND: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		POSH_THEME: string;
		XDG_RUNTIME_DIR: string;
		PYENV_ROOT: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		XDG_DATA_DIRS: string;
		GDK_BACKEND: string;
		npm_config_noproxy: string;
		PATH: string;
		GDK_SCALE: string;
		npm_config_node_gyp: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_global_prefix: string;
		NVM_BIN: string;
		MAIL: string;
		POWERLINE_COMMAND: string;
		KITTY_INSTALLATION_DIR: string;
		npm_node_execpath: string;
		OLDPWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
