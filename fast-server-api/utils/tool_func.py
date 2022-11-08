
import random
import string
import time
from html.parser import HTMLParser

p = HTMLParser()


def get_random_str(len = 8):
    return ''.join(random.sample(string.ascii_letters + string.digits, len))


def get_random_hash(text = get_random_str(32)) -> str:
    h = str(abs(hash(text)))
    return h


def get_random_filename(text = get_random_str(32)) -> int:
    h = abs(hash(text))
    return h

def get_unix_time():
    return int(round(time.time() * 1000))

"""
处理html编码如: $#59 -> ' ;
"""
def html_decode(s:str):
    return p.unescape(s)
