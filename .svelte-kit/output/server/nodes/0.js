

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C_B42PuF.js","_app/immutable/chunks/disclose-version.B2enAhEL.js","_app/immutable/chunks/runtime.CBvvWpuP.js"];
export const stylesheets = [];
export const fonts = [];
