from server.streaming_server import run


def main() -> None:

    bind_address = "[::]:50051"
    run(bind_address)

if __name__ == "__main__":
    main()
