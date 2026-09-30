# Protótipo · site para salão de manicure

Um site de uma página para salão de manicure de bairro, pensado para a cliente escolher os serviços e já mandar o pedido de horário pelo WhatsApp.

**No ar:** https://linda-flor-olive.vercel.app

> Protótipo independente, feito por mim como estudo de design e de produto. Não é o site oficial de nenhum estabelecimento e não tem vínculo com nenhum negócio. Nomes, marcas e imagens de terceiros que aparecem na demonstração pertencem aos seus donos.

## O que o protótipo resolve

Salão pequeno vive de Instagram e WhatsApp: a cliente vê uma foto, manda "oi, tem horário?" e começa um vai e vem de mensagens para descobrir preço e disponibilidade. O site encurta esse caminho:

- **Cardápio de serviços com comanda:** a cliente marca o que quer, vê o total e envia tudo pronto numa mensagem de WhatsApp.
- **Como chegar:** mapa e referência para quem nunca foi.
- **Avaliações e nota do Google** para passar confiança.
- **Modo revisão e modo apresentação:** no modo revisão, o que ainda falta confirmar aparece marcado como "fita crepe". Com `?apresentacao=1`, essas marcas somem e o site fica limpo para mostrar.

Visualmente, a ideia foi fugir do template de salão com fundo rosa e foto de banco de imagens: ilustrações feitas à mão em SVG, papel, fita crepe e bilhetinhos.

## Tecnologias

React, TypeScript, Vite e Tailwind CSS. Sem backend: tudo é estático e o pedido sai por link do WhatsApp. Deploy na Vercel.

## Rodando localmente

```bash
git clone https://github.com/miguelguiul1/Linda-Flor.git
cd Linda-Flor
npm install
npm run dev
```

Abra `http://localhost:5173`. Para ver sem as marcações de revisão, use `http://localhost:5173/?apresentacao=1` ou copie o `.env.example` para `.env` e defina `VITE_MODO=apresentacao`.

```bash
npm run build     # checagem de tipos + build de produção
npm run lint      # oxlint
```

## Licença

O código está sob a licença [MIT](LICENSE). A licença não cobre marcas, logos, fotos nem textos de terceiros.
