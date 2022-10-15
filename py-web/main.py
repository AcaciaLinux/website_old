from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class request_handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="src", **kwargs)

host = sys.argv[1] if len(sys.argv) > 2 else '0.0.0.0'
port = int(sys.argv[len(sys.argv)-1]) if len(sys.argv) > 1 else 8080

print("Webserver listening on {}:{} ..".format(host, port))

httpd = HTTPServer((host, port), request_handler)
httpd.serve_forever()
