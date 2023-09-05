

Drag-drop User Interface that describes pipelines for transforming data sources.
Uses connected nodes to create a DAG (directed acyclic graph) that describes such pipeline.
Backend service pending.

# Initial Setup

## System Dependencies

- nodejs (version 16+), npm
- [yarn](https://yarnpkg.com/getting-started/install)

## Steps

- Run `$ yarn install` to install application dependencies.

# Running After Initial Setup

```
$ yarn dev
```

# For Demo

Modify the node title/button title labels by going into:
```
src/nodeLabels.js
```

and modifying the constant values to whatever user-facing value needed.

