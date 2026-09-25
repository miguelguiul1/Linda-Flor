# Pendências do site Linda Flor

Tudo o que ainda falta confirmar ou receber. Nenhum destes itens foi inventado no site.
No **modo revisão** (padrão) cada pendência aparece como uma etiqueta de fita crepe.
No **modo apresentação** (`?apresentacao=1`) elas ficam ocultas.

## Com a Márcia (dona do salão)

- [ ] **Autorização para usar as fotos das clientes:** as 5 fotos de unhas vieram do Instagram do salão (`public/fotos/`, usadas em `src/components/FotoColada.tsx`).
- [ ] **Logo:** pedir o arquivo original (Canva, PDF ou PNG grande). Hoje o site usa a versão de 359px do Instagram (`public/logo-linda-flor.jpg`). Os JPGs de referência estão em `docs/marca/`. A vetorização automática ficou diferente do original e foi descartada.
- [ ] **Perguntar à Márcia se faz cabelo (corte, escova), depilação e maquiagem.** Duas avaliações do Google citam esses serviços.
- [ ] **Preços:** confirmar se estão atuais. Vieram de um post de tabela no Instagram, que pode ser antigo (`src/data/servicos.ts`).
- [ ] **Ponto de referência** para chegar (`referencia` em `src/data/salao.ts`; também dá para acrescentar ao mapinha).
- [ ] **Frases que a Márcia fala**, para ajustar o tom dos textos.
- [ ] **Fotos do salão:** fachada, o teto de guarda-chuvas e o ambiente. Com elas, conferir se as cores dos guarda-chuvas batem com a paleta.
- [ ] **Cor exata do rosa da marca:** hoje é `#F962C2`, tirada de um JPG. É o token `--color-rosa` em `src/index.css`.

## Com o responsável pelo site

- [ ] **Avaliações do Google:** já estão coladas as de Shirley e Cristiane. Falta um terceiro bilhete: colar o texto real sem mudar nada, só com o primeiro nome (`src/data/avaliacoes.ts`). No modo apresentação, bilhete vazio não aparece.
- [ ] **Link direto do perfil no Google:** hoje é uma busca no Maps (`linkGoogle` em `src/data/avaliacoes.ts`).
- [ ] **Domínio definitivo:** preencher `url` no JSON-LD (`index.html`). Quando os preços forem confirmados, dá para incluir `priceRange` também.

## Já resolvido

- Horário: terça a sábado, das 9h às 18h. Vem da bio atual do Instagram, escrita pela Márcia.
- Serviços e preços: Manicure R$ 35, Pedicure R$ 35, Manicure e Pedicure R$ 60, Esmaltação R$ 15, Plástica dos pés + Pedicure R$ 70. Sobrancelha, cabelo e depilação saíram da lista até a Márcia confirmar (ver acima).
- Nome da dona: Márcia. Aparece só nos botões e na mensagem do WhatsApp. Sem história nem sobrenome.

## Textos para revisar [REVISAR]

- Hero: "Senta, que o café já tá passando." e o parágrafo logo abaixo.
- Cardápio: "Escolhe o que vai fazer." e "toca no serviço que ele vai pra comanda".
- Comanda: a mensagem pronta ("Oi, Márcia! Vim pelo site da Linda Flor. Queria marcar…"). **Manter o "Vim pelo site da Linda Flor"**, porque é assim que a Márcia mede quantas clientes o site traz.
- Comanda: "Aqui o horário marcado é respeitado."
- Café: "O cafezinho vem junto." e "Enquanto faz a unha, tem café e conversa boa."
- Avaliações: "Quem senta na cadeira, volta."
- Tabela: "Não achou o que queria? Pergunta pra Márcia."

## Antes de publicar de verdade

- [ ] Tirar o `noindex` em três lugares: a meta `robots` no `index.html`, o header `X-Robots-Tag` no `vercel.json` e o `public/robots.txt`.
- [ ] Publicar no modo apresentação (variável `VITE_MODO=apresentacao` na Vercel) ou resolver todas as pendências acima.
