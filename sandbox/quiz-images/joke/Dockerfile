FROM alpine:latest AS builder
WORKDIR /app
COPY joke.c .
RUN apk add --no-cache gcc musl-dev \
    && gcc -static -Os -fno-ident -fdata-sections -ffunction-sections \
    -fno-asynchronous-unwind-tables -fno-unwind-tables \
    -Wl,--gc-sections -Wl,--strip-all \ 
    -o joke joke.c

FROM scratch
COPY --from=builder /app/joke /joke
ENTRYPOINT [ "/joke" ]