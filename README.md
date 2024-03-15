# Angular Slack

A simplified Slack messenger built with `Angular 17`, `Nx workspace`, `ngrx`, `TailwingCSS` and `Taiga UI`.

> This is not only a Slack clone built with Angular, but also an example of a modern Angular codebase and how it can be used for a **messenger** kind of app, especially, with NX workspace.

## Working application

Check out the live demo ->

![Angular Slack Demo][demo]

## Support

If you like my work, feel free to:

- ⭐ this repository

Thanks for supporting me!

## Motivation of this project 😊

> [Trung's](https://github.com/trungvose) project https://github.com/trungvose/angular-spotify inspired and motivated me to create this one. Thank you so much.

I've been working with Angular for about six years and regularly using Slack at my work. I like this experience.

So, I decided to implement basic Slack features, especially **Threads** and imitate the user interface as well. **Threads** are my most lovely ones, which were challenging 🙀, actually. But I think the result is good. Also, it is my additional portfolio-project, as proof of my skills and experience, because most of my real projects are enterprise-like and closed by NDA.

If we talk about the tech area, it's an app which focuses on a frontend part. But it has a mocked backend API (for usual integration with ngrx effects) which can be switched on a real API next time. By the way, I've also experimented with libraries as i wanted to try before: `NX`, `TaiwindCSS` and brand-new `ngrx` features like `@ngrx/signals`.

I've been working on it in my spare time for about two months. There are many Angular examples on the web but most of them are way too simple. I like to think that this codebase contains enough complexity and library variety to offer valuable insights to **Angular developers of some skill levels**.

## Tech stack

![Tech logos][stack]

- [Angular 17][angular]
- [Nx Workspace][nx]
- [ngrx][ngrx]
- [Taiga UI][taiga-ui] UI component: `avatar`, `dropdown`, `dialog`, `hint`, `input` and more
- [TailwindCSS][tailwind]
- [angular cdk][angular-cdk] packages includes: `Overlay` and `Scrolling`
- [ngx-quill][ngx-quill]
- [ngx-emoji-mart][ngx-emoji-mart]
- [Netlify][netlify] for deployment

[angular]: https://angular.io/
[ngrx]: https://ngrx.io/
[angular-cdk]: https://material.angular.io/cdk/categories
[tailwind]: https://tailwindcss.com/
[taiga-ui]: https://taiga-ui.dev/getting-started
[ngx-quill]: https://github.com/KillerCodeMonkey/ngx-quill
[ngx-emoji-mart]: https://github.com/scttcper/ngx-emoji-mart
[netlify]: http://netlify.com/

## High-level design

### Principles

All components are following:

- OnPush Change Detection and async pipes: all components use observable and async pipe for rendering data without any single manual subscribe
- Standalone components. I use modern Angular, and keep all components as a standalone by default
- Mostly, everything will stay in the `libs` folder.

### Structure

I followed the structure recommended by official [documentation](https://nx.dev/concepts/more-concepts/grouping-libraries) and [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)

```
.
└── root
    ├── apps
    │   └── angular-slack
    └── libs
        ├── client (dir)
        │   ├── feature-shell (angular:lib) - root page and main routes
        │   └── data-access (angular:lib, state management)
        ├── workspace (dir)
        │   └── feature-shell (angular:lib) - client chats entry point (channels, contacts, threads, etc.)
        ├── auth (dir)
        │   └── data-access (angular:lib) - store, services and models for mocked auth
        ├── tab-rail (dir)
        │   └── feature-tab-rail (angular:lib)
        ├── chat (dir)
        │   ├── data-access-messages (angular:lib)
        │   ├── feature-channel-chat-view (angular:lib)
        │   ├── feature-primary-view (angular:lib)
        │   └── feature-thread-chat-view (angular:lib)
        ├── channels (dir)
        │   ├── data-access-channels (angular:lib)
        │   ├── feature-create-channels (angular:lib)
        │   └── feature-edit-channels (angular:lib)
        ├── contacts (dir)
        │   └── data-access-contacts (angular:lib)
        ├── threads (dir)
        │   ├── data-access-threads (angular:lib)
        │   ├── feature-threads (angular:lib)
        │   └── ui-thread-card (angular:lib)
        └── shared (dir)
            └── data-access (dir)
                ├── ui-store (angular:lib) - shared ngrx signal store for secondary UI
                └── slack-api (angular:lib) - mocked api services, models
            ├── ui-message (angular:lib)
            ├── ui-message-editor (angular:lib)
            ├── pipes (dir)
            └── utils (angular:lib, shared pure functions, helpers)

```

### Dependency Graph

Nx provides an [dependency graph][dep-graph-nx] out of the box. To view it on your browser, clone my repository and run:

```bash
npm run graph
```

A simplified graph looks like the following. It gives you insightful information for your mono repo and is especially helpful when multiple projects depend on each other.

![Angular Slack Dependency Graph][dep-graph]

## Features and Roadmap

### 1.0 - Simple Slack clone

> March 15, 2024

- [x] Proven, scalable, and easy to understand the structure with Nx workspace
- [x] Send message to channel
- [x] Send direct message
- [x] Send thread message
- [x] Create and edit threads
- [x] View all threads grouped by chats on separate page
- [x] Attach emoji to any message
- [x] Create and edit channels
- [x] Good-looking user interface which reminds Slack 🤪

### Accessibility ♿

I use semantics tags and Taiga UI provides accessible UI components

## Setting up the development environment 🛠

- `git clone https://github.com/Morev1993/angular-slack.git`
- `cd angular-slack`
- `npm i --legacy-peer-deps`
- `npm start` for starting Angular web application
- The app should run on `http://localhost:4200/`

## Author: Igor Morev 🤖

- A passionate front-end engineer with eight years of experience

## Contributing

If you have any ideas, just [open an issue][issues] and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. [Pull requests][pull] are warmly welcome.

## License

Feel free to use my code on your project. Please put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)

[issues]: https://github.com/Morev1993/angular-slack/issues/new
[pull]: https://github.com/Morev1993/angular-slack/compare
[nx]: https://nx.dev/
[dep-graph-nx]: https://nx.dev/latest/angular/structure/dependency-graph
[demo]: /libs/shared/assets/angular-slack-demo.gif
[stack]: /libs/shared/assets/tech-stack.png
[dep-graph]: /libs/shared/assets/dep-graph.png
