# ![RealWorld Example App](logo.png)

> ### Next.js App router codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

> Describe the general architecture of your app here

# Getting started

## clone repository

> git clone https://github.com/dmdgpdi/realworld-starter-kit.git

## setting .env

```
# Address of the server that implements the real world specification.
# ex) https://api.realworld.io/api
# or
# Find this link https://codebase.show/projects/realworld?category=backend
NEXT_PUBLIC_BASE_URL='https://api.realworld.io/api'


# When using Mock Service Worker, using this url
LOCAL_URL='http://localhost:9090'

# If you use Mock Service Worker, set IS_MOCKING='enable'
# or If you want specific server, set IS_MOCKING='disable'
IS_MOCKING='disable'


# Encryption key.
ENCRYPTION_KEY='encryption'
```

## install dependency

> npm install

## run

> npm dev

### run when using MSW

```
npm mock
npm dev
```

# File Structure

```
📦
├─ app
├─ shared
├─ entities
├─ features
├─ widgets
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.json
├─ .gitattributes
├─ .github
├─ .gitignore
├─ .husky
├─ .lintstagedrc.json
├─ .prettierrc
├─ .storybook
├─ .yarn
├─ CODE_OF_CONDUCT.md
├─ LICENSE
├─ README.md
├─ favicon.ico
├─ mock
├─ cypress.config.js
├─ cypress
├─ next.config.js
├─ next.config.mjs
├─ package.json
├─ public
├─ tsconfig.json
└─ yarn.lock
```

# Tech Stack

<img alt="typescript" src ="https://img.shields.io/badge/typescript-3178C6.svg?&style=flat-square&logo=typescript&logoColor=white"/>
<img alt="react" src ="https://img.shields.io/badge/react-61DAFB.svg?&style=flat-square&logo=react&logoColor=white"/>
<img alt="nextjs" src ="https://img.shields.io/badge/nextjs-000000.svg?&style=flat-square&logo=nextdotjs&logoColor=white"/>
