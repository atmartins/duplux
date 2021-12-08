# Duplux
Plugin-based application library with state management over a two-way connection.

## Getting Started
### Install
Install npm dependencies:

    npm install

### Start Server
From terminal:

    npm run start-server

### Start Client
In a separate terminal:

    npm run start-client

### Explore the code
See `src/example-app/`

## Overview
The goal is to write features for an application in one coherent spot and worry less about all the typical request/response boilerplate.

By sharing a copy of the exact same reducer in both the client and server, as long as actions are dispatched to both places, we can be reasonably assured that the resulting state will be the same. This leads to a very simple and easy way of updating client applications with the latest known information while ensuring the server can continue operating statefully.

![Duplux architecture](docs/architecture.png?raw=true "Duplux Architecture")

### Glossary
**Duplux**: This name is a combination of duplex (as-in duplex connection) and Redux which is the state managemer of choice at this time.
**Server Store**: Some data is only appropriate to keep in-memory on the server side. By dispatching actions to the server store, they will not be sent to the client.
**Shared Store**: For data that is useful in both client and server, use the shared store. Dispatching the action from either the client OR the server will cause both copies of this store to update.

## Roadmap
- [Use Lerna](https://github.com/lerna/lerna)
- Add connection "channels" to isolate stores
- Authentication
