#!/usr/bin/env python3

from grpc.tools import protoc

# Run 'python3 grpc_api/proto/codegen.py' directly under backend.
protoc.main(
    (
        "",
        "-I.",
        "--python_out=./src/",
        "--grpc_python_out=./src/",
        "--mypy_out=./src/",
        "./proto/streaming_server.proto",
    )
)
