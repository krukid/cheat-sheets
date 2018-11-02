# install
http://docs.aws.amazon.com/cli/latest/userguide/installing.html

## from bundle:
http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-bundle-other-os

# configure
http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

  aws configure --profile profile

(see ~/.aws/*)

# commands

  aws s3 ls s3://bucket --profile profile
  aws s3 rm s3://bucket/ --profile profile --dryrun --recursive
