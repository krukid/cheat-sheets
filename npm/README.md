### display all published versions of npm package, sorted according to semver

    npm view grunt-contrib-uglify versions | tr \' \" | jq -r '.[]' | sort -V
