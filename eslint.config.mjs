import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	globalIgnores([
		"**/.nx/",
		".vscode/*",
		"**/*.yaml",
		"**/*.yml",
		"**/*.mock.ts",
		"**/*.spec.ts",
		"**/coverage/",
		"dist/*",
		"**/Docker",
		"node_modules/*",
	]),
	{
		files: ["**/*.ts"],
		extends: compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:@angular-eslint/recommended",
			"plugin:@angular-eslint/template/process-inline-templates",
			"plugin:prettier/recommended"
		),
		rules: {
			"@angular-eslint/directive-selector": [
				"error",
				{
					type: "attribute",
					prefix: "app",
					style: "camelCase",
				},
			],
			"@angular-eslint/component-selector": [
				"error",
				{
					type: "element",
					prefix: "app",
					style: "kebab-case",
				},
			],
			"@typescript-eslint/no-unused-expressions": [
				"warn",
				{
					allowShortCircuit: true,
					allowTernary: true,
					allowTaggedTemplates: true,
				},
			],
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"prettier/prettier": "warn",
			"no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true, ignoreEnums: true }],
		},
	},
	{
		files: ["**/*.html"],

		extends: compat.extends(
			"plugin:@angular-eslint/template/recommended",
			"plugin:@angular-eslint/template/accessibility"
		),

		rules: {},
	},
]);
