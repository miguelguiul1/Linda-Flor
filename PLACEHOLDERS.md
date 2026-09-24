# Pendências do site Linda Flor

Tudo o que ainda falta confirmar ou receber. Nenhum destes itens foi inventado no site.
No **modo revisão** (padrão) cada pendência aparece como uma etiqueta de fita crepe.
No **modo apresentação** (`?apresentacao=1`) elas ficam ocultas.

## Com a dona do salão

- [ ] **Logo:** pedir o arquivo original (Canva, PDF ou PNG grande). Hoje o site usa o JPG de 150px (`public/logo-linda-flor.jpg`), que é a referência. A vetorização automática ficou diferente do original e foi descartada.
- [ ] **Horário de fechar:** o Instagram diz 18h e o Google diz 19h. Depois de confirmar: `src/data/salao.ts` (`fecha`), Hero, Rodapé e `openingHoursSpecification` no JSON-LD (`index.html`).
- [ ] **Lista completa de serviços:** confirmar se faz sobrancelha, cabelo, depilação ou outros (`src/data/servicos.ts`, grupo "o que mais tem?").
- [ ] **"Pé e mão":** confirmar se existe como combo e se tem preço próprio.
- [ ] **Preços** de todos os serviços (`preco` em `src/data/servicos.ts`).
- [ ] **Ponto de referência** para chegar (`referencia` em `src/data/salao.ts`; também dá para acrescentar ao mapinha).
- [ ] **Nome da dona, história do salão e origem do nome** (ainda não usados no site).
- [ ] **Frases que a dona fala**, para ajustar o tom dos textos.
- [ ] **Fotos reais:** fachada, o teto de guarda-chuvas, ambiente. Com elas, conferir se as cores dos guarda-chuvas batem com a paleta.
- [ ] **Cor exata do rosa da marca:** hoje é `#F962C2`, tirada de um JPG comprimido. É o token `--color-rosa` em `src/index.css`.

## Com o responsável pelo site

- [ ] **Avaliações do Google:** colar os textos reais, sem mudar nada, e só o primeiro nome (`src/data/avaliacoes.ts`).
- [ ] **Link direto do perfil no Google:** hoje é uma busca no Maps (`linkGoogle` em `src/data/avaliacoes.ts`).
- [ ] **Domínio definitivo:** preencher `url` no JSON-LD.

## Textos para revisar [REVISAR]

- Hero: "Senta, que o café já tá passando." e o parágrafo logo abaixo.
- Cardápio: "Escolhe o que vai fazer." e "toca no serviço que ele vai pra comanda".
- Comanda: a mensagem pronta. **Manter o "Vim pelo site da Linda Flor"**, porque é assim que a dona mede quantas clientes o site traz.
- Comanda: "Aqui o horário marcado é respeitado."
- Café: "O cafezinho vem junto." e "Enquanto faz a unha, tem café e conversa boa."
- Avaliações: "Quem senta na cadeira, volta."
- Tabela: "Não achou o que queria? Pergunta no WhatsApp."

## Antes de publicar de verdade

- [ ] Tirar o `noindex` em três lugares: a meta `robots` no `index.html`, o header `X-Robots-Tag` no `vercel.json` e o `public/robots.txt`.
- [ ] Publicar no modo apresentação (variável `VITE_MODO=apresentacao` na Vercel) ou resolver todas as pendências acima.
