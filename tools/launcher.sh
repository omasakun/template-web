#!/bin/bash
set -eu

SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
DIR="$(dirname "$SCRIPT")"
ROOT="$(dirname "$DIR")"

CMD="${1:-}"
shift || :

_launcher_complete_script() {
  # docs: https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion.html
  # tutorial: https://iridakos.com/programming/2018/03/01/bash-programmable-completion-tutorial
  if [ "$COMP_CWORD" == "1" ]; then
    COMPREPLY=($(compgen -W "$("$SCRIPT")" -- "${COMP_WORDS[COMP_CWORD]}"))
  fi
}

pushd "$ROOT" > /dev/null

case "$CMD" in
  meta.setup) #    Setup this launcher
    BIN="$DIR/bin"
    if [ -e "$BIN" ]; then
      if [ -e "$BIN/-" ]; then
        rm "$BIN/-"
      fi
      rmdir "$BIN"
    fi
    mkdir "$BIN"
    ln --symbolic --relative -T "$SCRIPT" "$BIN/-"
    echo "Added to \$PATH: $BIN"
    export PATH="$PATH:$BIN"

    # complete -W "$("$SCRIPT")" "-"
    complete -F _launcher_complete_script "-"
    ;;
  bridge.net) ##   Expose port 8137 (WSL2)
    # ref: https://github.com/microsoft/WSL/issues/5439
    IP="$(ip r | tail -n 1 | cut -d" " -f 9)"
    CMD="echo 'Processing...'"
    CMD="$CMD ; netsh.exe interface portproxy add v4tov4 listenport=8137 connectaddress=$IP"
    powershell.exe -Command "Start-process powershell -Verb runas -Wait -Argumentlist \"$CMD\"" # run as admin
    echo "Make sure that port 8137 is not blocked by a firewall"
    ;;
  c.dev) ##        Start dev server
    cd repos/client
    pnpm dev "$@"
    ;;
  c.build) ##      Build client app
    cd repos/client
    pnpm build "$@"
    ;;
  c.test) ##       Run test with fancy UI
    cd repos/client
    pnpm test "$@"
    ;;
  c.cypress) ##    Run test with Cypress
    cd repos/client
    pnpm cypress "$@"
    ;;
  c.playwright) ## Run test with Playwright
    cd repos/client
    pnpm playwright "$@"
    ;;
  c.cov) ##        Collect coverage
    cd repos/client
    pnpm coverage "$@"
    ;;
  c.cov.show) ##   Show coverage
    cd repos/client
    pnpm coverage:serve "$@"
    ;;
  git.archive) ##  Tag and delete the git branch
    NAME="$1"
    EXISTS="$(git show-ref "refs/heads/$NAME")"
    if [ ! -n "$EXISTS" ]; then
      echo "Branch '$NAME' does not exist!"
      exit
    fi
    git tag "archive/$NAME" "$NAME"
    git branch -D "$NAME"
    echo "ok."
    ;;
  git.restore) ##  Restore the archived git branch
    NAME="$1"
    git checkout -b "$NAME" "archive/$NAME"
    ;;
  help) ##         Show this help
    echo "# Subcommands"
    sed -ne '/@sed/!s/## //p' "$SCRIPT" | sed -e 's/^ *//g'
    ;;
  *)
    sed -ne '/@sed/!s/## //p' "$SCRIPT" | sed -e 's/^ *//g' | cut -d ")" -f 1 | sed -z 's/\n/ /g'
    echo
    ;;
esac

set +eu
popd > /dev/null
