import type { LayoutServerLoad } from "./$types";

/*
Why we use this.  What happens If you remove it:
*- page.data.user will be undefined
*- the layout can no longer show “Logged in as ...” without another data source
*- server-side auth state from event.locals is not automatically available to the client
*/
export const load: LayoutServerLoad = ({ locals }) => {
  return {
    user: locals.user ?? null,
  };
};
