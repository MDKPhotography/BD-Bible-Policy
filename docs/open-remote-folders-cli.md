## Opening Remote Folders via the CLI

You can open a remote workspace/folder directly with the Cursor CLI using the Remote SSH URI scheme.

### Basic syntax (SSH config host alias)

```bash
cursor --folder-uri vscode-remote://ssh-remote+<hostname>/<folder_path>
```

- **hostname**: The `Host` alias from your SSH config (e.g., `~/.ssh/config`).
- **folder_path**: Absolute path on the remote system.

Example (open `/app` on host alias `loginnode`):

```bash
cursor --folder-uri vscode-remote://ssh-remote+loginnode/app
```

If your path contains spaces, wrap the whole URI in quotes:

```bash
cursor --folder-uri "vscode-remote://ssh-remote+loginnode/var/projects/My App"
```

### Advanced syntax (hex-encoded JSON connection string)

Use this when you must specify a user, port, or other flags inline instead of relying on `~/.ssh/config`.

1) Build a JSON string with the full connection target in `hostName`:

```bash
SSH_CONF='{"hostName":"root@76.76.21.21 -p 22"}'
```

2) Hex-encode the JSON (macOS/Linux):

```bash
SSH_HEX_CONF=$(printf "%s" "$SSH_CONF" | od -A n -t x1 | tr -d '[\n\t ]')
```

3) Open the remote folder using the encoded hostname:

```bash
cursor --folder-uri vscode-remote://ssh-remote+${SSH_HEX_CONF}/app
```

Notes:

- The folder segment (`/app` above) is still the absolute path on the remote host.
- Quote the `--folder-uri` argument when it includes spaces or shell-special characters.
- Ensure the remote host meets the requirements in `docs/remote-host-requirements.md` (SSH, TCP forwarding, shell, wget/curl).

### Troubleshooting

- Verify SSH can connect to the host alias first: `ssh <hostname>`.
- If using the hex method, confirm your JSON and encoding by echoing `$SSH_CONF` and `$SSH_HEX_CONF`.
- Check firewalls and that the SSH server allows TCP forwarding if remote features fail to initialize.

### References

- See `docs/remote-host-requirements.md` for remote host setup and prerequisites.

