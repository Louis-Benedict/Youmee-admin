#!/bin/bash

RETRIES=1;
MAX_RETRIES=15;
INSTANCE_PUBLIC_IP=""

poll_instance() {
    local result
    result=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=$1" "Name=instance-state-name,Values=running" --query Reservations[].Instances[].PublicIpAddress --output text)

    if [[ -z "$result" ]]; then
        echo ""
    else
        echo "$result"
    fi
}

if [ -z "$1" ]; then
    echo "Usage: $0 <tag_value>"
    exit 1
fi

# Poll EC2 instance until it returns a running instance or
# max retries have been exceeded
until [[ -n "$INSTANCE_PUBLIC_IP" || $RETRIES -gt $MAX_RETRIES ]]
do
    INSTANCE_PUBLIC_IP=$(poll_instance "$1")
    if [[ -z "$INSTANCE_PUBLIC_IP" ]]; then
        # echo "[$RETRIES/$MAX_RETRIES] Polling instance..." 
        ((RETRIES=RETRIES+1))
        sleep 1
    fi
done

# Check if instance ID is empty after retries
if [[ -z "$INSTANCE_PUBLIC_IP" ]]; then
    echo "ERROR: Instance start could not be determined"
    exit 1
fi

# Echo out the instance ID
echo "INSTANCE_PUBLIC_IP=$INSTANCE_PUBLIC_IP"
exit 0