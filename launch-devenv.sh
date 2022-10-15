#!/bin/sh

tmux new-session -d -s foo 'exec python3 py-web/main.py'
tmux send-keys 'bundle exec thin start' 'C-m'
tmux rename-window 'Foo'
tmux select-window -t foo:0
tmux send-keys 'bundle exec compass watch' 'C-m'
tmux split-window -h -t 0 'exec python3 branch/branchmaster/src/main.py'
tmux send-keys 'rake ts:start' 'C-m'
tmux -2 attach-session -t foo

