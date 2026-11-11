# `data/` — datapack overrides

Loaded as a datapack that sits above mod data, so a file here replaces the
mod's file at the same path. Takes effect with `/reload`.

## `copycats/physics_block_properties/copycat_catwalk.json`

Silences 21 errors per boot:

```
[Server thread/ERROR] [dev.ryanhcode.sable.Sable/]:
  Failed to apply tag physics properties. Unknown block: copycats:copycat_catwalk
```

`copycats-3.0.9+mc.1.21.1-neoforge.jar` ships a Sable physics file whose
`selector` names `copycats:copycat_catwalk`, a block it does not register.
It is the only orphan of the 23: every other `physics_block_properties/*.json`
in that jar has a matching `blockstates/*.json`, this one has none. The catwalk
survives as an item model and a crafting recipe, so it looks like a block that
was pulled before release and left its physics file behind.

Sable resolves the selector itself and reports an unresolvable **block**. An
unresolvable **tag** it passes over in silence — `sablephysicscompat-1.3.0`
ships `"selector": "#aether:aerclouds"` and Aether is not in this pack, with no
complaint. So the override repoints the selector at an empty block tag
(`kubejs:physics_noop`, defined alongside) and empties `properties`.

Deliberately *not* done two other ways:

- **Editing the three `sable:light` / `quarter_volume` / `super_light` tags.**
  Nine mods contribute to `sable:light`. Removing one entry from a tag needs
  `"replace": true` plus a full restatement, which would discard the other
  eight mods' physics entries. Wrong tool, and the catwalk is not in those
  files anyway — they carry `immersiveengineering:*_catwalk`, which is what a
  loose grep for "catwalk" turns up.
- **`ServerEvents.tags('block', …).remove(…)`.** Sable reads the raw JSON
  rather than the resolved tag, so editing the resolved tag changes nothing.

Cosmetic — no gameplay effect. Delete both files once copycats drops the stale
file, and check after any copycats update that the override is still shadowing
a file that exists.

## Takes effect only after a restart (first time)

KubeJS enumerates `data/` when the server starts, not on `/reload`. When this
folder was created on 2026-11-11 the override above did nothing through
`/reload` — 21 catwalk errors still per boot — and a full restart dropped it to
0 at once. Creating `data/` or adding a namespace under it needs a restart;
editing a file in a namespace that already existed at boot is just `/reload`.
