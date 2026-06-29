import type { LayoutServerLoad } from './$types';
//necesitamos esto para que el usuario se refresque en la pagina de layout.svelte
export const load: LayoutServerLoad = ({ locals }) => ({
	user: locals.user ?? null
});
