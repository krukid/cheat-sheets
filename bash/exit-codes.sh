echo "arguments: ${@} (${#})"

foo() {
  local var="${1}"
  echo "foo will exit with code: ${var}"
  return $1

  echo "FOO SLACK NOT PRINTED"
}

foo 0 && echo "printed 1/2"
foo 1 && echo "not printed"
foo 1 || echo "printed 2/2"

foo 255; [ "${?}" -eq 255 ] && echo "foo(255) => 255"
foo 255; [ "${?}" -eq 111 ] && echo "foo(255) => 111"

#
# chain the script:
# ./this.sh 0 && echo "printed"
# ./this.sh 1 && echo "not printed"
# ./this.sh 1 || echo "printed"
#
echo "script will exit with code: ${1}"
exit $1
