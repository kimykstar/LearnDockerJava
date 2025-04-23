FROM alpine:latest AS builder
WORKDIR /app
COPY hello.c .
RUN apk add --no-cache gcc musl-dev \
    && gcc -static -Os -fno-ident -fdata-sections -ffunction-sections \
    -fno-asynchronous-unwind-tables -fno-unwind-tables \
    -Wl,--gc-sections -Wl,--strip-all \ 
    -o hello hello.c

FROM scratch
COPY --from=builder /app/hello /hello
ENTRYPOINT [ "/hello" ]