# EuroTruckSite

Base estatica do site institucional da Euro Truck Implementos Rodoviarios. Esta pasta deve ser considerada o pacote do projeto para publicacao.

O site nao depende de instalacao, servidor Node, banco de dados ou build. Para publicar, envie o conteudo desta pasta para a raiz da hospedagem do dominio.

## O que NAO enviar para a hospedagem

A pasta `_nao-publicar/` guarda arquivos internos que nao fazem parte do site ao vivo (rascunhos antigos, logos originais nao usadas, imagens de clientes duplicadas/nao usadas). Nao arraste essa pasta para o FTP/SFTP — envie so o que esta descrito em "Arquivos principais" abaixo. A pasta `.claude/` (config interna do Claude Code) tambem nao deve ser publicada.

## Arquivos principais

- `index.html`: pagina inicial, SEO e conteudo.
- `assets/css/styles.css`: estilos responsivos.
- `assets/js/main.js`: menu mobile, ano automatico no rodape, lightbox de fotos e fallback de imagem quebrada.
- `assets/img/LogoSite/logo euro impl.png`: logo compacta usada no cabecalho e como icone do site.
- `assets/img/LogoSite/Logo Euro Truck.png`: imagem usada em destaque e compartilhamentos.
- `.htaccess`: configuracao do Apache (headers de seguranca, cache, paginas de erro, compressao).
- `404.html` / `500.html`: paginas de erro com a identidade visual do site, autocontidas (sem depender do CSS/JS principal).
- `robots.txt`: permissao de indexacao e link do sitemap.
- `sitemap.xml`: mapa inicial do site.
- `site.webmanifest`: configuracao basica para navegadores.

## Ambiente real de hospedagem (confirmado em 2026-09-04)

A hospedagem do dominio e cPanel compartilhado rodando Apache (nao Nginx/Node), confirmado por print da raiz da conta. Isso significa:

- `.htaccess` funciona de verdade nesse ambiente (usado para headers, cache e paginas de erro).
- A raiz publica do dominio e a pasta `public_html` — todo o conteudo desta pasta (exceto `_nao-publicar/`) deve ir para DENTRO de `public_html`, nao para a raiz da conta de hospedagem.
- O servidor tem PHP disponivel — usado pelo `contato.php` (unico script PHP do site) para processar o formulario de contato.
- Confirmar com o provedor se o certificado SSL ja esta ativo antes de descomentar o redirecionamento HTTPS no `.htaccess` (ver comentario no proprio arquivo).

## Antes de publicar

1. Confirmar se `eurotruck.ind.br` e o dominio final.
2. Confirmar e-mail, telefone e endereco.
3. Revisar todos os textos temporarios.
4. Confirmar se os logos em `assets/img/LogoSite/` sao os arquivos oficiais para cabecalho, destaque e rodape.
5. Confirmar se a hospedagem usa HTTPS.
6. Configurar headers de seguranca na hospedagem ou CDN quando disponivel.
7. **Fotos dos projetos**: em `index.html`, os cards da secao `#servicos` tem blocos `<!-- TODO: foto real -->` no lugar de fotos reais. Todos os 5 cards ja tem a estrutura de galeria em hover pronta, esperando 5 fotos cada. Substituir cada um por uma tag `<img>` apontando para a foto do projeto assim que o cliente enviar.
8. **Certificacoes**: o rodape tem um bloco comentado (`footer-certifications`) esperando os dados/selos oficiais (ex.: ISO 9001) que o cliente vai enviar. Preencher e descomentar antes de publicar.
9. **Formulario de contato**: ja foi migrado do Netlify para `contato.php` (envia por `mail()` nativo do PHP para `comercial@eurotruck.ind.br`). Depois de publicar, testar um envio real na hospedagem — se o e-mail nao chegar (comum em `mail()` sem SPF/DKIM configurado), trocar por SMTP autenticado (ex.: PHPMailer) usando uma caixa `@eurotruck.ind.br` real.

## Seguranca

Os headers `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy` ja estao configurados no `.htaccess` (nao depende mais de configuracao manual na hospedagem). Falta:

- HTTPS obrigatorio — depende do provedor confirmar o certificado (ver secao acima).
- `Content-Security-Policy`: deixado de fora de proposito por enquanto — o site usa `style=""` inline nas galerias de foto e um `<script type="application/ld+json">` no `<head>`; um CSP mal calibrado quebra os dois. Ha um comentario no `.htaccess` com o ponto de partida caso alguem for configurar isso depois.
- Protecao contra excesso de requisicoes ou DDoS geralmente e feita no nivel da hospedagem/CDN, fora do escopo deste repositorio.

## Teste local

Abra `index.html` no navegador. Como o site e estatico, a mesma estrutura pode ser enviada diretamente para a equipe responsavel pela publicacao.
