# show diff with last stash
git stash show -p stash@{0}

# uncommit latest commit (restore changes to working copy)
git reset --soft HEAD^

# remove tag locally and remotely
git tag -d tagName && git push origin :refs/tags/tagName

# list, create and push tag
git tag && git tag -m 'description' tagName && git push --tags

# list all commit messages between last two tags (commit-based, unnecessary)
git log --format="%s" $(\
  git tag --sort=-version:refname --format='%(objectname:short)'\
  | head -n 2 | tac | sed ':a;N;$!ba;s/\n/../'\
)

# list all commit messages between last tag and HEAD
git log --format="* %s" $(\
  git tag --sort=-version:refname | head -n 1\
)..HEAD

# get specified remote version and the one before it
git ls-remote -q --tags --refs | awk '{print $2}' | cut -d '/' -f 3 | sort -V | grep v1.1.9 -B 1