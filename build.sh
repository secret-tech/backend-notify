#!/bin/bash

set -ex
IMAGE_NAME="jincort/backend-notify"
DOCKER_FILE="Dockerfile.$TAG"
DOCKER_FILE=$( [ -e "$DOCKER_FILE" ] && echo $DOCKER_FILE || echo Dockerfile )
docker build -f $DOCKER_FILE -t ${IMAGE_NAME}:${TAG} . || exit 1
docker push ${IMAGE_NAME}:${TAG}
