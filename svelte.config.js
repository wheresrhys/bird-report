import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ pages: 'build', fallback: 'index.html' }),
		// vite: {
  //     ssr: {
  //       noExternal: ['@popperjs/core']
  //     }
  //   }
	}
};

export default config;
