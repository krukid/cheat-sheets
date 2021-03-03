for f in *.png; do mv "$f" "${f/vk_/}"; done

for f in {{1..3},7,9}.png; do echo $f; done
