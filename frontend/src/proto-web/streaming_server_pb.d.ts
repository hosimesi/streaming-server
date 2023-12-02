import * as jspb from 'google-protobuf'



export class UserRequest extends jspb.Message {
  getPrompt(): string;
  setPrompt(value: string): UserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
  static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRequest;
  static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
  export type AsObject = {
    prompt: string,
  }
}

export class LlmResponse extends jspb.Message {
  getLlmContent(): string;
  setLlmContent(value: string): LlmResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LlmResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LlmResponse): LlmResponse.AsObject;
  static serializeBinaryToWriter(message: LlmResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LlmResponse;
  static deserializeBinaryFromReader(message: LlmResponse, reader: jspb.BinaryReader): LlmResponse;
}

export namespace LlmResponse {
  export type AsObject = {
    llmContent: string,
  }
}

