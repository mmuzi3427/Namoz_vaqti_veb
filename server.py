import http.server
import json

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/foydalanuvchi":
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)
            print("Qabul qilindi:", data)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = json.dumps({"status": "ok"})
            self.wfile.write(response.encode())

server = http.server.HTTPServer(('0.0.0.0', 5000), MyHandler)
print("Server ishga tushdi...")
server.serve_forever()
