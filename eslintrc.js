module.exports = {
	root: true,
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["tsconfig.json"],
				tsconfigRootDir: __dirname,
				sourceType: "module",
				createDefaultProgram: true,
			},
			extends: [
				"eslint:recommended",
				"plugin:prettier/recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@angular-eslint/recommended",
			],
			rules: {
				"prettier/prettier": "error",
			},
		},
	],
};
