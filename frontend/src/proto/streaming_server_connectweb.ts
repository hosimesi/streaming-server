// @generated by protoc-gen-connect-web v0.11.0 with parameter "target=ts"
// @generated from file streaming_server.proto (package stream, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { LlmResponse, UserRequest } from "./streaming_server_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service stream.ResponseStreamingService
 */
export const ResponseStreamingService = {
  typeName: "stream.ResponseStreamingService",
  methods: {
    /**
     * @generated from rpc stream.ResponseStreamingService.stream
     */
    stream: {
      name: "stream",
      I: UserRequest,
      O: LlmResponse,
      kind: MethodKind.ServerStreaming,
    },
  }
} as const;

