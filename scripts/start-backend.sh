#!/bin/bash
cd "$(dirname "$0")/../backend" || exit
source .venv/bin/activate
uvicorn app.main:app --reload