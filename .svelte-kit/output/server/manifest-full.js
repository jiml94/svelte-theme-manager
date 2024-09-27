export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.D0a3nbPn.js","app":"_app/immutable/entry/app.6UgYFQ0X.js","imports":["_app/immutable/entry/start.D0a3nbPn.js","_app/immutable/chunks/entry.CLhWpt51.js","_app/immutable/chunks/runtime.CBvvWpuP.js","_app/immutable/chunks/index.DfeiiaIW.js","_app/immutable/entry/app.6UgYFQ0X.js","_app/immutable/chunks/runtime.CBvvWpuP.js","_app/immutable/chunks/render.C2qhT5RD.js","_app/immutable/chunks/events.CfqqDqqS.js","_app/immutable/chunks/disclose-version.B2enAhEL.js","_app/immutable/chunks/index-client.D3MS40Eh.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
