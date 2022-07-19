# console tips

## find and highlight element by css selector

    inspect($('[data-reactid=".h39uh7ho8w.1.0"]'))

## browser cache and settings

chrome://net-internals/#hsts -> query/delete by domain to clear hsts cache 

## cronjob one-liner to cleanup open tabs

cat tabs.list | xargs -I {} curl -s 'http://localhost:9222/json/close/{}'; curl -s 'http://localhost:9222/json/list' | jq -r '.[].id' > tabs.list
