// @generated by protoc-gen-es v1.5.0 with parameter "target=js+dts"
// @generated from file streaming_server.proto (package stream, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message stream.UserRequest
 */
export const UserRequest = proto3.makeMessageType(
  "stream.UserRequest",
  () => [
    { no: 1, name: "prompt", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message stream.LlmResponse
 */
export const LlmResponse = proto3.makeMessageType(
  "stream.LlmResponse",
  () => [
    { no: 1, name: "llm_content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

