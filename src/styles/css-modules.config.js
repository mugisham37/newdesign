// CSS Modules Configuration for Brutalist Portfolio
// This file documents the CSS Modules setup and naming conventions

module.exports = {
  // CSS Modules naming convention
  localIdentName: {
    development: '[name]__[local]--[hash:base64:5]',
    production: '[hash:base64:8]',
  },

  // Export naming convention (camelCase for JavaScript imports)
  exportLocalsConvention: 'camelCase',

  // File patterns for CSS Modules
  patterns: {
    modules: /\.module\.(css|scss|sass)$/,
    global: /\.global\.(css|scss|sass)$/,
    regular: /\.(css|scss|sass)$/,
  },

  // Directory structure for component styles
  structure: {
    components: 'src/styles/components/',
    themes: 'src/styles/themes/',
    animations: 'src/styles/animations/',
    utilities: 'src/styles/utilities/',
  },

  // Naming conventions for CSS classes
  conventions: {
    // Component root classes
    component: 'componentName',

    // Element classes (BEM-like)
    element: 'componentElement',

    // Modifier classes
    modifier: 'componentName--modifier',

    // State classes
    state: 'componentName.isState',

    // Theme-aware classes
    theme: 'componentName--themeName',
  },

  // Examples of proper CSS Modules usage
  examples: {
    // Component file: Button.module.css
    button: {
      // Root component class
      '.button': 'button',

      // Size variants
      '.button--small': 'buttonSmall',
      '.button--large': 'buttonLarge',

      // State modifiers
      '.button.isLoading': 'buttonIsLoading',
      '.button.isDisabled': 'buttonIsDisabled',

      // Theme variants
      '.button--extreme': 'buttonExtreme',
      '.button--refined': 'buttonRefined',
    },

    // Usage in React component
    react: `
      import styles from './Button.module.css';
      
      const Button = ({ size, theme, isLoading, children }) => (
        <button 
          className={clsx(
            styles.button,
            styles[\`button\${size.charAt(0).toUpperCase() + size.slice(1)}\`],
            styles[\`button\${theme.charAt(0).toUpperCase() + theme.slice(1)}\`],
            isLoading && styles.buttonIsLoading
          )}
        >
          {children}
        </button>
      );
    `,
  },

  // Best practices for CSS Modules in this project
  bestPractices: [
    'Use camelCase for class names in CSS files',
    'Prefix component-specific classes with component name',
    'Use BEM-like naming for elements and modifiers',
    'Keep global styles in separate non-module files',
    'Use CSS custom properties for theme-aware styling',
    'Compose classes using clsx utility for conditional styling',
    'Avoid deep nesting - keep selectors flat',
    'Use :global() sparingly for theme overrides',
    'Document complex class combinations',
    'Test class name generation in both dev and prod builds',
  ],

  // Integration with theme system
  themeIntegration: {
    // Use CSS custom properties for theme values
    customProperties: 'var(--color-primary)',

    // Theme-specific overrides using :global()
    themeOverrides: ':global([data-theme="extreme-brutalist"]) .component',

    // Conditional theme classes
    conditionalClasses: 'styles[`component${theme}`]',
  },

  // Performance considerations
  performance: {
    // Tree shaking - only import used classes
    treeShaking: true,

    // Minimize class name length in production
    minifyClassNames: true,

    // Avoid runtime class name generation
    staticClassNames: true,

    // Use CSS containment for better performance
    containment: 'contain: layout style paint;',
  },
};
