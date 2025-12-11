#!/bin/bash
cd /home/kavia/workspace/code-generation/streamflix-platform-186045-186055/streaming_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

