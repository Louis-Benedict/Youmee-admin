#!/bin/sh
  
local result

result=$(aws ec2 describe-instances  --filters  Name=tag:Name,Values=$1 Name=instance-state-name,Values=running  --query  Reservations[].Instances[].InstanceId --output text)
echo "INSTANCE_ID=$result"