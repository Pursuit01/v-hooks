// vite.config.ts
import {defineConfig} from "vite"
import dts from "vite-plugin-dts"
import path from "path"
export default defineConfig({
  plugins: [
    dts({
      // 指是否生成一个dts入口文件
      insertTypesEntry: false
      // declarationOnly: true,  // 打包产物中只包含dts声明文件
    })
  ],
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 10,
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "vHooks", // 在formats为 'umd' 或 'iife' 时是必需的
      fileName: (format: any) => `index.${format}.js`,
      formats: ["es", "umd"] // 指定打包产物的类型
    },
    rollupOptions: {
      external: ["vue"]
    }
  }
})
