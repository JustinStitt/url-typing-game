package main

import (
	"flag"
	"log"
	"net/http"
)

func main() {
	port := flag.String("port", "8080", "port to listen on")
	flag.Parse()

	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	log.Printf("Server starting on http://localhost:%s\n", *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}
