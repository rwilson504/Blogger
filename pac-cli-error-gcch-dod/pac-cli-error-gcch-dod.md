![Fixing PAC CLI “non-recoverable error” in GCC High and DoD by enabling telemetry](https://github.com/user-attachments/assets/9104ef03-e3cc-4582-b8a3-dbc0cf2d3d2a)

If you use the Power Platform CLI (PAC CLI) in **GCC High** or **DoD** environments, you may run into a sudden crash that looks like this:

> Sorry, the app encountered a non-recoverable error and will need to terminate. The exception details have been captured and will be forwarded to the development team, if telemetry has been enabled. Session Id: 6e212345-df11-22a7-b633-42380ed22acd, Exception Type: System.NullReferenceException

It’s especially confusing because the message mentions telemetry like it’s only about reporting diagnostics, but in the scenario I hit, the crash was tied to telemetry being **disabled**.

This post explains the pattern, how to confirm if you’re affected, and the quick fix.

## What I observed

In my environment:

- PAC CLI **1.34.1** worked reliably
- The crash started happening on **versions after 1.34.1**
- This happened in **GCC High** (and is relevant for **DoD** tenants as well)
- I first noticed it while downloading and uploading Power Pages (Portals) sites, but I later found it can happen with **other commands too**. The portal commands were just the first place it showed up consistently.

## The surprising trigger: telemetry disabled

If PAC CLI telemetry is disabled, some commands can hit a failure path that results in the CLI terminating with a `System.NullReferenceException` and the “non-recoverable error” message.

So while the message says telemetry would help forward the exception details, in this case telemetry being disabled was part of what caused the crash behavior.

## Check your telemetry status

Run:

```bash
pac telemetry status
```

If it reports telemetry is disabled, you’re a prime candidate for this issue (especially if you’re on a PAC CLI version newer than 1.34.1 in GCC High or DoD).

## Fix: enable telemetry and retry

Enable telemetry:

```bash
pac telemetry enabled
```

Then re-run the command that was failing.

In my testing, simply enabling telemetry made the same commands that were terminating start working normally.

## Why the error is misleading

The message frames telemetry as "only" a mechanism to forward exception details. In practice, what I experienced is:

* With telemetry **disabled**, the CLI can crash with a null reference exception
* With telemetry **enabled**, the crash path doesn’t occur (or is handled correctly), and the command proceeds

So the wording is not wrong, but it doesn’t tell you that telemetry configuration may be directly related to the failure.

## Quick troubleshooting checklist

If you see the “non-recoverable error” + `System.NullReferenceException` in GCC High or DoD:

1. Confirm your PAC CLI version (and note if you upgraded recently)
2. Check telemetry status

   ```bash
   pac telemetry status
   ```
3. If disabled, enable it

   ```bash
   pac telemetry enabled
   ```
4. Retry the exact command that failed

## Wrap-up

If PAC CLI started crashing in GCC High or DoD with a "non-recoverable error" and `System.NullReferenceException`, check whether telemetry is disabled. Enabling telemetry is a simple change that can get you unstuck, even though the message makes it sound like telemetry only affects error reporting.
