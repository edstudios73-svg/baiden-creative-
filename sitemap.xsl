<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en"><head><meta charset="utf-8"><title>Sitemap | Baiden Creatives</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{margin:0;background:#000;color:#fff;font:16px/1.6 system-ui,sans-serif;padding:4rem 6vw}
h1{font-size:2.4rem;margin:0 0 .4rem;letter-spacing:-.03em}p{color:#a3a3a3;margin:0 0 2rem}
table{width:100%;max-width:960px;border-collapse:collapse}th{text-align:left;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;color:#a3a3a3;padding:.8rem 0;border-bottom:1px solid #333}
td{padding:1rem 0;border-bottom:1px solid #222}a{color:#fff}a:hover{opacity:.7}
</style></head><body>
<h1>Baiden Creatives sitemap</h1>
<p>baidencreatives.org: <xsl:value-of select="count(sm:urlset/sm:url)"/> pages for search engines.</p>
<table><tr><th>Page</th><th>Updated</th><th>Priority</th></tr>
<xsl:for-each select="sm:urlset/sm:url"><tr>
<td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
<td><xsl:value-of select="sm:lastmod"/></td><td><xsl:value-of select="sm:priority"/></td></tr></xsl:for-each>
</table></body></html>
</xsl:template></xsl:stylesheet>
