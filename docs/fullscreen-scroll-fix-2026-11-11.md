# Mechanism fullscreen exit: scrolling recovery

The reported failure reproduced on the previous production build at 390px and 1440px widths. Fullscreen scrolled, but a wheel gesture over the returned inline diagram left the chapter's scrollTop unchanged. Reporting an issue or unmounting the parent chapter during fullscreen could leave body overflow hidden after all dialogs closed.

## Changes

- Inline diagram viewports contain horizontal overscroll while allowing vertical scroll to reach the chapter. Fullscreen viewports retain vertical containment.
- A shared scroll-lock lease replaces separate overflow snapshots in chapter dialogs, fullscreen diagrams and mobile navigation. Closing overlays in either order restores the original body overflow only after the final owner closes.
- Original overflow axes and priority flags are preserved. Releases are idempotent. Focus returns without scrolling the underlying page to a different position.
- Mechanism SVGs have explicit namespaces, intrinsic dimensions and aspect-ratio preservation. State diagrams also carry an inline responsive aspect ratio so their size is defined without waiting for the study stylesheet.

## Validation

- All 106 Node tests passed, including five scroll-lock regressions for parent-first/child-first cleanup, menu-to-modal handoff, repeated release, original axes/priorities and independent document state.
- Production build, initial JavaScript budget and all 37 offline assets passed verification.
- Edge browser tests used only locally fulfilled production assets with other origins blocked. At 390px and 1440px, Exit full view, Escape, Report chemistry issue and parent unmount all passed. Fullscreen wheel scrolling, inline chapter wheel scrolling and restored main-page wheel scrolling were exercised directly. Mobile navigation-to-modal handoff also passed without a leaked lock or page errors.
- Touch emulation using browser touch events verified scrolling in fullscreen, after returning to the chapter, and on the main page after closing the chapter. Final observed scrollTop changes were 0→205, 1420→1635 and 0→213 respectively.
- The user additionally reported blank mechanisms in Android Chrome. The complete blank state did not reproduce in the local 390px Chromium viewport: PCC was visible inline, fullscreen and after exit. Explicit SVG dimensions were added as a compatibility improvement. A sweep then selected all 63 core reagent pathways plus Aldol and Cannizzaro and verified nonzero SVG bounds, actual SVG graphics and valid arrow-marker references. It completed without page errors. This does not prove the exact physical phone failure has been resolved; that requires a fresh device check or a reproducible example from that phone.

Chemistry datasets, diagrams and mechanism playback were unchanged. Mobile touch checks were emulated; physical phone testing is not claimed.
