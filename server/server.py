from http.server import BaseHTTPRequestHandler
from routes.main import routes
import json
import cgi

class Server(BaseHTTPRequestHandler):
  def do_HEAD(self):
    return
    
  def do_GET(self):
    self.respond()
    
  def do_POST(self):
    ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))

    if ctype != 'application/json':
        self.send_response(400)
        self.end_headers()
        return
    
    length = int(self.headers.getheader('content-length'))
    message = json.loads(self.rfile.read(length))
    message['received'] = 'ok'

    self._set_headers()
    self.wfile.write(json.dumps(message))
    
  def handle_http(self, status, content_type):
    self.send_response(status)
    self.send_header("Content-type", content_type)
    self.end_headers()
    route_content = routes[self.path]
    return bytes(route_content, "UTF-8")
    
  def respond(self):
    content = self.handle_http(200, "text/html")
    self.wfile.write(content)