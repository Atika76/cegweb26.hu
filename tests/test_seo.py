"""Dependency-free SEO regression checks: python -m unittest discover -s tests -v"""
import json, re, subprocess, unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse, unquote
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
BASE='https://cegweb26.hu/'
class HTML(HTMLParser):
    def __init__(self,text):
        super().__init__();self.tags=[];self.text=text;self.feed(text)
    def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
    def attr(self,tag,**match):return [a for t,a in self.tags if t==tag and all(a.get(k)==v for k,v in match.items())]
PAGES={p.name:HTML(p.read_text(encoding='utf-8-sig')) for p in ROOT.glob('*.html') if not p.name.startswith('google')}
SITEMAP=ET.parse(ROOT/'sitemap.xml')
URLS=[x.text for x in SITEMAP.findall('.//{*}loc')]

class SEOTests(unittest.TestCase):
    def test_sitemap_matches_indexable_canonical_pages(self):
        expected=[]
        for name,p in PAGES.items():
            robots=p.attr('meta',name='robots')
            self.assertEqual(len(robots),1,name)
            if 'noindex' not in robots[0]['content']:
                expected.append(BASE+('' if name=='index.html' else name))
        self.assertCountEqual(URLS,expected)
        self.assertEqual(len(URLS),len(set(URLS)))

    def test_robots_allows_crawling_and_announces_correct_sitemap(self):
        robots=(ROOT/'robots.txt').read_text()
        self.assertIn('Sitemap: '+BASE+'sitemap.xml',robots)
        self.assertNotRegex(robots,r'(?im)^Disallow:\s*/\s*$')

    def test_titles_descriptions_canonical_and_h1(self):
        titles=[];descriptions=[]
        for url in URLS:
            name=urlparse(url).path.lstrip('/') or 'index.html';p=PAGES[name]
            title=re.findall(r'<title>(.*?)</title>',p.text,re.S)
            self.assertEqual(len(title),1,name);self.assertTrue(title[0].strip(),name)
            descriptions.append(p.attr('meta',name='description')[0]['content'])
            self.assertTrue(descriptions[-1].strip(),name)
            titles+=title
            self.assertEqual([a['href'] for a in p.attr('link',rel='canonical')],[url],name)
            self.assertEqual(len(p.attr('h1')),1,name)
        self.assertEqual(len(titles),len(set(titles)))
        self.assertEqual(len(descriptions),len(set(descriptions)))

    def test_all_internal_links_assets_and_anchors_exist(self):
        for name,p in PAGES.items():
            for tag,a in p.tags:
                value=a.get('href') if tag in ('a','link') else a.get('src') if tag in ('img','script') else None
                if not value or value.startswith(('mailto:','tel:','data:','javascript:')):continue
                u=urlparse(urljoin(BASE+name,value))
                if u.netloc!='cegweb26.hu':continue
                path=unquote(u.path).lstrip('/') or 'index.html'
                self.assertTrue((ROOT/path).is_file(),(name,value))
                if tag=='a' and u.fragment and path in PAGES:
                    self.assertTrue(any(b.get('id')==unquote(u.fragment) or b.get('name')==unquote(u.fragment) for _,b in PAGES[path].tags),(name,value))

    def test_images_have_alt_and_dimensions(self):
        for name,p in PAGES.items():
            for a in p.attr('img'):
                for key in ['alt','width','height']:self.assertTrue(a.get(key),(name,a.get('src'),key))

    def test_mobile_metadata_and_structured_json(self):
        for name,p in PAGES.items():
            self.assertEqual(p.attr('html')[0].get('lang'),'hu',name)
            self.assertIn('width=device-width',p.attr('meta',name='viewport')[0]['content'])
            for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>',p.text,re.S):
                self.assertEqual(json.loads(data)['@context'],'https://schema.org')

    def test_sitemap_dates_match_last_content_commit(self):
        for item in SITEMAP.findall('{*}url'):
            name=urlparse(item.find('{*}loc').text).path.lstrip('/') or 'index.html'
            date=subprocess.check_output(['git','log','-1','--format=%cs','--',name],cwd=ROOT,text=True).strip()
            self.assertEqual(item.find('{*}lastmod').text,date,name)

if __name__=='__main__':unittest.main()
