#!/bin/sh
  
result="$(aws ec2 describe-instances  --filters  Name=tag:Name,Values=youmee-testing  --query  Reservations[].Instances[].State.Name --output text)"
echo "INSTANCE_STATE=$result"