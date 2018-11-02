#!/bin/bash

if [ -z "${FOO}" ] \
|| [ -z "${BAR}" ] \
|| [ -z "${BAZ}" ]; then

  echo "Must define FOO, BAR, BAZ environment variables."
  exit 1

fi

echo "Check: OK"
