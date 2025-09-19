# social.progressia.one

**social.progressia.one** is a community-driven fork of the official Bluesky Social client.  
It’s the **primary client for the ProgressiaOne community**, maintained *by and for* our members.  

> 🗳 **Have feedback?** Join the open conversation on Blacksky People’s Assembly: <https://assembly.blacksky.community/8bbfunvvau>

---

## Get the app

| Platform | Link | Status |
|----------|------|--------|
| **Web**  | <https://social.progressia.one> | ✅ Live |
| **iOS**  | *(App Store link forthcoming)* | 🛠 WIP |
| **Android** | *(Play Store link forthcoming)* | 🛠 WIP |

---

## Development Resources

This is a **[React Native](https://reactnative.dev/)** project in **TypeScript**.  
It depends on the open-source **AT Protocol** packages (e.g. [`@atproto/api`](https://npm.im/@atproto/api)).  
A vestigial Go service in `./bskyweb/` can serve a React Native Web build, but we deploy the web
front-end as static files (currently via Cloudflare Pages).

See **[docs/build.md](./docs/build.md)** for local setup. Nix users can leverage `flake.nix` for a
one-command dev shell.

Helpful AT Protocol links:

- Overview & Guides – <https://atproto.com/guides/overview>
- GitHub Discussions – <https://github.com/bluesky-social/atproto/discussions>
- Protocol Specs – <https://atproto.com/specs/atp>

---

## Contributions

> We ❤️ thoughtful contributions! Help us keep the diff small and the community safe.

**Rules**

- We may decline or delay PRs that are too large to maintain.
- We reserve the right to lock heated threads to protect contributors’ time.

**Guidelines**

1. **Open an issue first** – give the community time to discuss scope & maintenance.
2. **Prefer small patches** – anything that touches lots of upstream code is hard to carry.
3. **Put opinionated changes behind toggles**.
4. Avoid PRs that…
  - Rename common terms (e.g., “Post” → “Skeet”)
  - Replace core libraries without strong need (e.g., MobX → Redux)
  - Add entirely new features with no prior discussion

If your idea isn’t a fit, feel free to **fork** – that’s the beauty of open source!

---

## Forking Guidelines

- Re-brand clearly so users don’t confuse your fork with the ProgressiaOne community.
- Point analytics / error reporting to **your** endpoints.
- Update support links (feedback, email, terms, etc.) to your own.

---

## Security Disclosures

Found a vulnerability?  
Email **security@progressia1.app** – we will respond
promptly.

---

## License

**MIT** – see [./LICENSE](./LICENSE).
