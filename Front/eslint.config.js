import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  
  {
    rules: {
      'indent': ['error', 2], // Indentación de 2 espacios
      'quotes': ['error', 'single'], // Usa comillas simples
      'semi': ['error', 'never'], // No requiere punto y coma
      'no-console': 'warn', // Muestra advertencias al usar console.log
      'curly': 'error', // Requiere llaves para todas las estructuras de control
      'eqeqeq': ['error', 'always'], // Requiere el uso de === y !==
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'prefer-const': 'error', // Prefiere const sobre let cuando sea posible
      'max-len': ['error', { code: 80 }], 
      'object-curly-spacing': ['error', 'always'], // Requiere espacios dentro de llaves de objetos
      'array-bracket-spacing': ['error', 'never'], 
      'no-multiple-empty-lines': ['error', { max: 1 }], // Limita el número de líneas vacías a 1,
      'react/react-in-jsx-scope':'off'
    }
  }
  
]