# Letterboxed Reimagined

React Native prototype for a Letterboxd-style film logging app with a redesigned mobile experience.

The core product behaviour is familiar: users can log films, rate what they watch, keep a diary, build watchlists and organise their film history. The difference is the design direction. This prototype explores how the same kind of film-tracking product could feel cleaner, calmer and more intentional on mobile, with faster everyday actions and a more polished visual system.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Go / iOS Simulator for local testing
- Inter via `@expo-google-fonts/inter`
- Native `StyleSheet` styling

## Getting Started

```bash
npm install
npm run ios
```

This project is currently intended to run through Expo Go. If Expo opens a native development build and shows `No script URL provided`, stop that process and run `npm run ios` from this project instead.

## Current Scope

- Expo + React Native + TypeScript scaffold
- Branded login screen using the provided Letterboxed logo
- Personalised dashboard prototype with For You recommendations, watch goals, cinema picks and streaming suggestions
- Native styling foundation for the redesign direction
