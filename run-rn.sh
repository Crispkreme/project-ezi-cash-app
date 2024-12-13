#!/bin/bash

echo "Starting Express Server..."
cd backend
npm run start &

SERVER_PID=$!

echo "Starting React Application..."
cd ../frontend
npm run start

CLIENT_PID=$!

cleanup() {
	echo "Stopping the express server and React App..."
	kill $SERVER_PID $CLIENT_PID
	exit
}

trap cleanup SIGINT SIGTERM

wait
