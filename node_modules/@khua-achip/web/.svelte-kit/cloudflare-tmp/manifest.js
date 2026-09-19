export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.nmD8Ghxf.js",app:"_app/immutable/entry/app.DcfncHBX.js",imports:["_app/immutable/entry/start.nmD8Ghxf.js","_app/immutable/chunks/ucirV5Fr.js","_app/immutable/chunks/B-hmrK5E.js","_app/immutable/chunks/WMb57OuR.js","_app/immutable/entry/app.DcfncHBX.js","_app/immutable/chunks/ucirV5Fr.js","_app/immutable/chunks/CcGkifcF.js","_app/immutable/chunks/CupSigZ2.js","_app/immutable/chunks/B-hmrK5E.js","_app/immutable/chunks/9LbopdxU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base_path = "";
