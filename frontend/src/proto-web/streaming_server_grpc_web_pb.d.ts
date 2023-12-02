import * as grpcWeb from 'grpc-web';

import * as proto_streaming_server_pb from './streaming_server_pb';


export class ResponseStreamingServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  stream(
    request: proto_streaming_server_pb.UserRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<proto_streaming_server_pb.LlmResponse>;

}

export class ResponseStreamingServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  stream(
    request: proto_streaming_server_pb.UserRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<proto_streaming_server_pb.LlmResponse>;

}

