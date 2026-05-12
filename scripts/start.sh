#!/bin/bash

cd "$(dirname "$0")" || exit

./start-backend.sh &
./start-frontend.sh

wait