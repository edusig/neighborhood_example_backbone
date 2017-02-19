#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

import BaseHTTPServer
import os
from SocketServer import ThreadingMixIn
import SimpleHTTPServer

class CustomHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    """
    Custom http handler
    """
    def do_GET(self):
        path = os.path.abspath(self.path[1:])
        if not os.path.isdir(path) and not os.path.isfile(path) and '.' not in self.path:
            self.path = '/'
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        path = os.path.abspath(self.path[1:])
        if '.html' in path:
            self.send_no_cache_headers()
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def send_no_cache_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")


class ThreadedHTTPServer(ThreadingMixIn, BaseHTTPServer.HTTPServer):
    """Handle requests in a separate thread."""

if __name__ == '__main__':
    SERVER = ThreadedHTTPServer(('127.0.0.1', 80), CustomHandler)
    SERVER.serve_forever()
