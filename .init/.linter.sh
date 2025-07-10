#!/bin/bash
cd /home/kavia/workspace/code-generation/task-management-system-113551/tasktrackr_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

