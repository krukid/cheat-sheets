# integrity attribute value manual calculation

    openssl dgst -sha256 -binary jquery-3.2.1.min.js | openssl base64 -A
    # see https://www.srihash.org/
