import path from 'node:path';
import { createRequire } from 'node:module';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const compiler = require('@dcloudio/uni-cli-shared/lib/@vue/compiler-sfc');

function resolveOutputDir(mode: string) {
  return path.resolve(
    __dirname,
    mode === 'production' ? 'dist/build/mp-weixin' : '../mp-weixin'
  );
}

export default defineConfig(({ mode }) => {
  const nodeEnv = mode === 'production' ? 'production' : 'development';

  process.env.UNI_PLATFORM = 'mp-weixin';
  process.env.UNI_CLI_CONTEXT = __dirname;
  process.env.UNI_INPUT_DIR = path.resolve(__dirname, 'src');
  process.env.UNI_OUTPUT_DIR = resolveOutputDir(mode);

  const rawUniAppPlugins = require('@dcloudio/uni-app/dist/uni.compiler.js')();
  const rawUniMpWeixinPlugins = require('@dcloudio/uni-mp-weixin/dist/uni.compiler.js');
  const pluginFactoryOptions = {
    vueOptions: {
      script: {
        babelParserPlugins: ['typescript'],
      },
    },
  };

  const uniAppPlugins = rawUniAppPlugins.map((plugin: unknown) =>
    typeof plugin === 'function' ? plugin(pluginFactoryOptions) : plugin
  );
  const uniMpWeixinPlugins = rawUniMpWeixinPlugins.map((plugin: unknown) =>
    typeof plugin === 'function' ? plugin(pluginFactoryOptions) : plugin
  );
  const uniMpCorePlugin = uniMpWeixinPlugins.find(
    (plugin: any) => plugin && typeof plugin === 'object' && 'uni' in plugin
  ) as
    | {
        uni?: {
          compiler?: unknown;
          compilerOptions?: Record<string, unknown>;
        };
      }
    | undefined;

  return {
    build: {
      emptyOutDir: true,
      outDir: process.env.UNI_OUTPUT_DIR,
    },
    define: {
      'process.env': JSON.stringify({ NODE_ENV: nodeEnv }),
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    },
    plugins: [
      vue({
        compiler,
        template: {
          compiler: uniMpCorePlugin?.uni?.compiler,
          compilerOptions: uniMpCorePlugin?.uni?.compilerOptions,
        },
      }),
      ...uniAppPlugins,
      ...uniMpWeixinPlugins,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
