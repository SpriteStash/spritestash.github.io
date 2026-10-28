# Wraith Reaper — Dark Fantasy Bestiary / Pack 03

Sprite Stash. Final leader boss, ID8, supplied as a floating reaper monster with seven movements. Includes Wraith Reaper only.

## Included
2789 production animation PNG files across 60 component manifests and 290 original spritesheet pages. These include alternative Composed representations of the same art. Component layers, evaluated tracks and Composed frames are alternatives; they are not 2789 unique poses. Spritesheets arrange the same PNGs. Original source pixels, manual edits and soft RGBA alpha are preserved.

## Compatibility and scope
Unity 6000.0.47f1 / Built-in and Unreal Engine 5.8.3 / Paper 2D, tested in Windows editors. Other versions, URP/HDRP, UEFN and packaged platforms are not validated. Includes animation playback and a captured-target example; no enemy AI, collision/damage or complete combat system. Unreal uses native Blueprint assets and has no runtime dependency on Python or authored C++.

## Open the demo
Unity: open Assets/SpriteStash/WraithReaper/Scenes/SC_WraithReaperDemo.unity. Press Play. Buttons select seven actions; All actions plays each action once and loops the complete showcase.
Unreal: open WraithReaperDarkFantasyBestiaryPack03.uproject, enable Paper 2D, and open Maps/L_WraithReaperOverview. Keys 1-7 select Idle, Walk, Running, Attack1, Attack2, Hurt and Death.
Unreal: keys 8-9 cast at two different chosen targets; R restarts the seven-action showcase. Open Documentation/L_WraithReaperGuide for the native quick start and Maps/L_WraithReaperSourceAssets to inspect the native tracks and atlas pages. README.txt is beside the guide map on disk.
Free English guide: https://spritestash.github.io/docs/wraith-reaper/

## Timing
Idle 1800 ms, Walk 1260 ms and Running 900 ms loop in gameplay. Attack1 1190 ms, Attack2 4000 ms, Hurt 300 ms and Death 2400 ms play once. Death stays absent. Showcase order: Idle / Walk / Running / Attack1 / Attack2 / Hurt / Death, 11850 ms total. The 600 ms inspection holds in individual approved previews are never added to gameplay.

## Torso registration
Use 256 pixels per Unity unit or 2.56 pixels per Unreal centimeter, scale 1. The monster floats and registers at its fixed torso point, never at feet, weapon bounds or visible image bounds. Native storage atlases remove transparent margins only; each frame retains its original registration and pixels through its recorded crop and anchor. Do not resize for the scythe. Walk's 10-degree and Running's 16-degree inclinations are already baked. Never add rotation, smoothing or opacity dithering.

## Synchronized Attack1
The soul departs at 200 ms. The owner's 320 px outbound dash runs 320-440 ms with smoothstep interpolation; its return is linear over 730-870 ms. The soul returns 770-870 ms. Both return to origin at 870 ms. Contact starts at 440 ms, peaks at 490 ms and ends at 600 ms. At the action end, resume Idle at phase 320 ms, frame 4 with 20 ms already elapsed. Do not reset Idle to frame 1. Composed playback already contains the movement: owner motion must be counteracted on the visual child to avoid a second dash.

## Synchronized Attack2
Twenty souls accumulate progressively, release at 1280 ms, disperse until 1740 ms and hover until the command at 2940 ms. All pursue ONE selected target and never return to the boss. Recorded impacts occur 3260-3540 ms; each ghost fades over 40 ms into a 340 ms spectral impact. FX clear by 3880 ms. The invisible art example target (1400,780) is not a fixed gameplay requirement. Shared/FreedSouls and Shared/SpectralImpact provide reusable local art. Unity: call WraithReaperPlayer.PlayAttack2AtTarget(Vector2 worldTarget). Unreal: call BP_WraithReaperController.PlayAttack2AtTarget with one TargetWorldPosition vector; X/Z form the sprite plane. The selected point is captured once per cast; it is not live tracking of a moving actor. Before 2940 ms the approved Composed attack is shown; at command it switches to BodyPlayback and the local soul/trail/impact instances. All twenty souls hit the same selected point. Source-space example position is (632,-68) pixels relative to the torso in engine coordinates. At the action end, Idle continues at phase 60 ms. Use evaluated layers OR local shared instances OR Composed, never overlapping alternatives.

## Death
Preserve the single bottom-to-top disappearance of the complete body, head, scythe and aura while twenty souls rise in a compact upward cone. The approved Composed option includes every effect. Do not overlay another wind, shadow, soul layer or dissolve, and do not restore the historical protected-head version. Component reconstruction must keep the interleaved source draw order.

## Add, modify and migrate
Unity: use Prefabs/PF_WraithReaper, call WraithReaperPlayer.Play with an action name, and keep the library and all dependencies. Disable automatic demo playback for gameplay. The demo controls are examples, not an enemy AI or full combat system.
Unreal: use BP_WraithReaperController and PlayIdle, PlayWalk, PlayRunning, PlayAttack1, PlayAttack2, PlayHurt, PlayDeath. AutoPreview and DemoControls belong to the showcase; AutoReturnToIdle belongs to one-shot recovery. Use Asset Actions > Migrate with dependencies and preserve the product folder. The source gallery also exposes optional source tracks. Native integration contains 13 tracks and 66 lossless storage atlases; the raw-art download contains all 60 production components. The indexed local-glyph bank is a reusable key library, not an eighth action. Its gallery preview is slowed for inspection only.
Keep PIVOTS-AND-PLACEMENT.json, playback.json, Contracts and component manifests when building custom playback. Source art metadata saying engine_tested=false describes the art handoff, not a later tested release. The source metadata is preserved as the original art handoff; the integration and compatibility described above are supplied separately.

## Support
Instagram: https://www.instagram.com/spritestash/
Email: SpriteStash@proton.me
Need another move or monster? Tell us.

## Files and transparency
The PNG download contains production component PNGs, original sheets, manifests, Shared assets, approved playback/placement data and contracts. Review-only previews, generation recipes and historical versions are omitted. Engine atlases trim transparent storage margins without moving the original torso registration or resampling pixels. Imported RGBA remains uncompressed. Component compositing uses native engine alpha blending; tiny rounding differences from offline 8-bit compositions can occur where many translucent trails overlap. Use the Composed reference option when the approved example trajectory is desired exactly.
