# remote dev with docker & vs code

## option 1 -- remote tunnel (beta)

pros: easy to set up
  - enable remote tunnel access on target machine
  - install "remote - tunnels" extension on client machine
  - use remote connections tab to attach to target machine

cons: does not work with remote containers

## option 2 -- remote ssh

pros: works with remote containers

cons: hard to set up (platform-specific, steps for win10-to-mac below)
  - go to win10 client machine, generate ssh key `your-key` with passphrase
  - enable ssh-agent service as follows though Powershell (with admin access)
    - `Get-Service ssh-agent | Set-Service -StartupType Automatic`
    - `Start-Service ssh-agent`
    - `Get-Service ssh-agent`
    - `ssh-add $env:USERPROFILE\.ssh\your-key` (provide passphrase)

  - go to mac target machine, copy your public key `your-key.pub` from client machine to `~/.ssh/authorized_keys`
  - edit `/etc/ssh/sshd_config` as follows
    - `set PubkeyAuthentication=yes`
    - `set PasswordAuthentication=no`
    - `set ChallengeResponseAuthentication=no`
    - `set PermitUserEnvironment=yes`
  - `echo "PATH=$PATH:$(dirname $(which docker))" > ~/.ssh/environment`
  - go to preferences/sharing dialog
  - note the local hostname on top of the sharing dialog, e.g. `MyMacBook.local`
  - go to remote login section
  - narrow down access to user you log in as to develop on this machine, e.g. `john.smith`
  - disable full disk access
  - enable remote login (disable & enable to restart sshd)

  - go back to win10 client machine
  - start up docker for windows
  - create docker context for target machine
    - `docker context create my-context --docker "host=ssh://john.smith:MyMacBook.local"`
    - `docker context use my-context`
    - (optional) `docker context update --docker ...`
    - (optional) `docker context ls`
    - `docker ps`
  - test docker over ssh connection by running `ssh john.smith:MyMacBook.local docker ps` (add known host when prompted)
  - go to VSCode, press CMD+SHIFT+P for command palette and select `my-context` in "Docker Contexts: Use"
  - go to your devcontainer folder or to remote connections tab and attach to your desired container
