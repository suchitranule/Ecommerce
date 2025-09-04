# Ecommerce

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## 🚀 Tech Stack  
- **Angular** (20.1.4)  
- **HTML5, CSS3, Bootstrap**  
- **PurgeCSS** (CSS optimization)  
- **DummyJSON API** (for product & user data)  

## ✨ Features  
- ⚡ **Lazy Loading** – improves initial load time by loading modules only when needed.  
- 🔄 **Change Detection Strategy: OnPush** – boosts performance by reducing unnecessary checks.  
- 🖼️ **NgOptimizedImage** – optimized image loading for better performance.  
- 🔑 **Authentication & Authorization** – implemented using **Interceptors** and **AuthGuards**.  
- 🎨 **CSS Optimization with PurgeCSS** – removes unused styles from production builds.  
- 📱 **Responsive UI** – mobile-friendly layout with Bootstrap.  


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Added husky hooks to prettify and check test coverage
to bypass husky while 'git commit' and 'git push' use git commit --no-verify -m "commit message" and git push --no-verify respectively.