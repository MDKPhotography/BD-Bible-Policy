## Supported Platforms

- **Linux**: Debian 8+, Ubuntu 20.04+, CentOS/RHEL 7+, Alpine (*) , FreeBSD (**)
- **Windows**: Windows 10+ / Server 2016 / 2019 (1803+) with OpenSSH Server
- **macOS**: 10.14+ (Mojave) with Remote Login enabled

## System Requirements

Remote host must have:

- **Shell**: `bash` (macOS/Linux) or `powershell` (Windows)
- **Downloader**: `wget` or `curl`
- **SSH server** with TCP forwarding support enabled

### Notes for Alpine Linux (*)

- Requires Cursor v0.50.5 or newer
- Install required packages:

```bash
apk add bash libstdc++ openssh wget
```

- Enable port forwarding:
  - Edit `/etc/ssh/sshd_config`
  - Set `AllowTcpForwarding yes`
  - Restart SSH:

```bash
service sshd restart
```

### Notes for FreeBSD (**)

Cursor on FreeBSD requires `bash`, `wget`, and Linux Binary Compatibility.

- Requires Cursor v0.50.5 or newer
- Enable Linux compatibility and install dependencies:

```bash
sudo sysrc linux_enable="YES"
sudo service linux start
sudo pkg install bash wget linux_base-rl9
```

### macOS: Enable Remote Login

- System Settings → General → Sharing → enable "Remote Login"
- Or via terminal (admin):

```bash
sudo systemsetup -setremotelogin on
```

### Windows: OpenSSH Server

- Ensure OpenSSH Server is installed and running (PowerShell as Admin):

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
```

If needed, update `C:\ProgramData\ssh\sshd_config` to allow TCP forwarding (`AllowTcpForwarding yes`) and restart the service:

```powershell
Restart-Service sshd
```

---

### Security and Connectivity Notes

- Ensure your firewall allows inbound SSH (typically TCP 22) and any required forwarded ports.
- After editing `sshd_config`, always restart the SSH service.
- Prefer key-based authentication over passwords; disable root login when possible.

### References

- OpenSSH `sshd_config` manual: `man sshd_config`
- Alpine Linux OpenSSH docs: `https://wiki.alpinelinux.org/wiki/Setting_up_a_ssh-server`
- FreeBSD Handbook (Linux Binary Compatibility): `https://docs.freebsd.org/en/books/handbook/linuxemu/`
- Microsoft OpenSSH Server on Windows: `https://learn.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse`

