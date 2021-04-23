const path = require("path");
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from 'vite';
import html from 'vite-plugin-html';
import vitePluginImp from 'vite-plugin-imp';
import autoprefixer from 'autoprefixer';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const port = 3000;

export default  defineConfig({
  root: process.cwd(), // index.html 的目录，默认查找的目录
  base: "/", // 静态资源的目录
  mode: process.env.NODE_ENV, // 'production' | 'development' | 'none'
  define: {
    "process.env": {
      BUILD_ENV: process.env.BUILD_ENV || "beta",
    },
  }, // 定义
  plugins: [
    reactRefresh(),
    html({
      minify: true,
      inject: {
        injectData: {
          title: 'injectData title'
        }
      }
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            return`antd/lib/${name}/style/index.css`
          },
        }
      ]
    })
  ], // 插件
  publicDir: 'public', // 静态资源目录，打包原封不动的目录
  resolve: {
    alias: {
      "@": path.resolve("src"),
    }, // 别名
    dedupe: [], // 重复依赖
    conditions: [], // 导出 计算
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // 省去拓展名的类型
  },
  css: {
    modules: {
      // localsConvention: "camelCaseOnly",
    },
    postcss: {
      // parser
      plugins: [
        autoprefixer({
          "overrideBrowserslist": ['last 2 versions'],
          grid: true
        })
      ]
    },
    preprocessorOptions: {

    },
  },
  logLevel: isDev ? 'info' : 'error',
  server: {
    hmr: true,
    port: port,
    open: true,
    proxy: {
      "^/api": {
        target: "https://test.api.order.iduoliao.cn",
        changeOrigin: true,
        ws: false,
        'secure': false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  build: {
    // target: ""
    outDir: 'dist',
    assetsInlineLimit: 4096, // 在多少 kb 使用 base64
    cssCodeSplit: true, // css 拆分
    sourcemap: isDev ? 'inline' : false,
    minify: isProd ? 'terser': 'esbuild', // 使用打包器 terser打包效果好，但是打包速度慢  esbuild打包快
    terserOptions: {
      compress: true,
      ie8: false,
      format: {
        comments: false,
      }
    },
    cleanCssOptions: {
      level: 1,
    },
    write: true, // 将依赖资源写入到磁盘里面
    brotliSize: true, // 压缩报告
    chunkSizeWarningLimit: 500, //
  },
  optimizeDeps: {
    // entries: // 指定入口 index.html,
    
  }
});
