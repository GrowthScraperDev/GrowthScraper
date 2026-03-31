<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
      <meta name="robots" content="noindex,follow"/>

        <title>XML Sitemap - Growth Scraper</title>

        <style>
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #f4f6f5;
            color: #222;
          }

          /* Header */
          .header {
            background: white;
            padding: 16px 100px;
            display: flex;
            align-items: center;
          }

          /* Content */
          .container {
            padding: 24px 100px;
          }

          @media(max-width:768px){
            .header{
              padding:16px 30px;
            }
            .container {
              padding: 24px 30px;
            }
          }

          .logo {
            height: 36px;
          }

          /* Breadcrumb */
          .breadcrumb {
            font-size: 14px;
            margin-bottom: 12px;
            color: #666;
          }

          .breadcrumb span {
            color: #084734;
            font-weight: 500;
          }

          h1 {
            font-size: 18px;
            margin-bottom: 16px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }

          th {
            background: #084734;
            color: #fff;
            padding: 12px;
            text-align: left;
            font-size: 14px;
          }

          td {
            padding: 12px;
            border-bottom: 1px solid #e6e6e6;
            font-size: 14px;
          }

          tr:last-child td {
            border-bottom: none;
          }

          a {
            color: #084734;
            text-decoration: none;
            word-break: break-all;
          }

          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>

      <body>

        <!-- Header -->
        <div class="header">
          <img src="/growth-scraper-logo.svg" class="logo" alt="Logo"/>
        </div>

        <div class="container">

          <!-- Breadcrumb (ONLY for urlset pages) -->
          <xsl:if test="/sitemap:urlset">
            <div class="breadcrumb">
              <a href="/sitemap.xml">Sitemap Index</a>
              /
              <span>Pages</span>
            </div>
          </xsl:if>

          <!-- Count -->
          <h1>
            This XML Sitemap contains
            <xsl:choose>
              <xsl:when test="/sitemap:sitemapindex">
                <xsl:value-of select="count(/sitemap:sitemapindex/sitemap:sitemap)"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="count(/sitemap:urlset/sitemap:url)"/>
              </xsl:otherwise>
            </xsl:choose>
            URLs.
          </h1>

          <!-- Table -->
          <table>
            <tr>
              <th>
                <xsl:choose>
                  <xsl:when test="/sitemap:sitemapindex">Sitemap</xsl:when>
                  <xsl:otherwise>URL</xsl:otherwise>
                </xsl:choose>
              </th>
            </tr>

            <!-- Sitemap index rows -->
            <xsl:for-each select="/sitemap:sitemapindex/sitemap:sitemap">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
              </tr>
            </xsl:for-each>

            <!-- URL set rows -->
            <xsl:for-each select="/sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
              </tr>
            </xsl:for-each>

          </table>

        </div>

      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
