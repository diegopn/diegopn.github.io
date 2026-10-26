---
layout: post
title: "Ovenbird: um espaço de trabalho LaTeX integrado ao GNOME"
description: "Conheça o Ovenbird, um aplicativo nativo para escrever LaTeX no GNOME, com edição por código e visual, biblioteca BibTeX local e compilação de PDFs."
date: 2026-10-26
lang: pt-BR
permalink: /blog/ovenbird-editor-latex-gnome/
categories: [gnome, latex]
tags: [ovenbird, gnome, latex, bibtex, escrita-academica, software-livre]
image: /src/assets/images/ovenbird-blog-cover.jpg
image_alt: "Ilustração de um pássaro de papel sobre páginas acadêmicas, representando a escrita em LaTeX no Ovenbird."
translation_url: /en/blog/ovenbird-native-latex-workspace-gnome/
---

Escrever em LaTeX envolve mais do que editar um arquivo `.tex`: é preciso organizar o projeto, cuidar das referências, compilar e conferir o PDF. O Ovenbird reúne essas tarefas em um aplicativo nativo para GNOME, mantendo os documentos como arquivos comuns e a biblioteca BibTeX no computador.

Desenvolvido em Rust com GTK 4, Libadwaita e GtkSourceView, o Ovenbird foi pensado para quem trabalha no Linux e quer acompanhar o documento tanto pelo código quanto por uma visualização mais próxima do resultado final.

## Um projeto LaTeX continua sendo um projeto de arquivos

Os documentos do Ovenbird permanecem em arquivos `.tex`, nas pastas escolhidas por quem escreve. Isso permite abrir os mesmos arquivos com outras ferramentas, mantê-los em controle de versão e organizar figuras e capítulos do modo habitual.

O navegador de projeto permite criar pastas, mover e renomear arquivos e enviá-los para a lixeira. Dentro do documento, é possível inserir e formatar tabelas, equações, listas, imagens, links, notas e citações.

## Código e edição visual no mesmo documento

O Ovenbird oferece os modos Code e Visual para editar arquivos `.tex`. O modo de código é adequado para quem prefere trabalhar diretamente com comandos LaTeX. O modo visual apresenta um conjunto mais direto de operações de edição, como formatar texto e inserir elementos estruturados.

Os dois modos compartilham o histórico de desfazer e refazer. A edição visual cobre um subconjunto conservador de LaTeX: comandos e ambientes que ela não reconhece continuam no texto-fonte, para que a troca de modo não apague conteúdo desconhecido.

Esse limite é importante para documentos existentes. Um projeto pode incluir comandos próprios, pacotes específicos ou estruturas que não aparecem nas ferramentas visuais. Nesses casos, o código continua disponível para edição manual.

## Uma biblioteca BibTeX que acompanha diferentes projetos

A biblioteca de referências do Ovenbird é local e independente do projeto aberto. Ela permite catalogar referências por tipo, adicionar etiquetas, pesquisar registros e importar ou exportar arquivos `.bib`.

Na compilação, o aplicativo combina a biblioteca local com as entradas de bibliografia declaradas no próprio projeto e prepara um arquivo temporário para o processo. Assim, as referências reutilizáveis ficam em um só lugar, enquanto cada documento continua podendo declarar suas próprias entradas.

Esse arranjo atende quem mantém mais de um texto acadêmico ao longo do tempo. Uma referência importada não precisa ser cadastrada de novo em cada projeto, e a exportação BibTeX deixa a biblioteca utilizável fora do Ovenbird.

## Compilar e conferir o resultado

O Ovenbird pode compilar documentos com `latexmk`, `pdflatex` ou Tectonic. Depois, permite visualizar PDFs e imagens dentro do aplicativo. A visualização embutida de PDF depende do suporte Poppler-GLib incluído na compilação do aplicativo; a geração do documento também depende do motor LaTeX e dos pacotes exigidos pelo projeto.

O fluxo fica próximo: editar, compilar, ler o resultado e voltar ao trecho que precisa de ajuste. Quem já usa uma distribuição LaTeX pode continuar trabalhando com os motores instalados no próprio sistema.

## Modelos para começar sem uma página em branco

Ao criar um projeto, o Ovenbird oferece um modelo vazio e modelos para ABNT, IEEE, ACM, Elsevier e Springer Nature. Eles fornecem uma estrutura inicial para o documento; cada instituição, periódico ou evento pode exigir ajustes adicionais nas classes e nos pacotes usados.

Os modelos fornecem uma estrutura inicial que o autor pode alterar ou substituir por arquivos próprios.

## Para quem o Ovenbird faz sentido

O aplicativo é voltado principalmente a quem escreve LaTeX no GNOME, trabalha com arquivos locais e quer manter edição, referências e revisão do PDF no mesmo ambiente. A biblioteca BibTeX compartilhada entre projetos é útil para quem reutiliza referências; os dois modos de edição atendem tanto quem prefere comandos quanto quem busca operações visuais para tarefas frequentes.

Há dois pontos para considerar antes de adotar o fluxo: a edição visual não pretende cobrir toda a linguagem LaTeX, e a compilação continua sujeita aos motores, classes e pacotes necessários a cada documento. Para comandos menos comuns, o modo de código preserva o controle direto do arquivo.

## Conheça o projeto

O Ovenbird é software livre, licenciado sob GPL-3.0-or-later. No [site do Ovenbird](https://diegopn.github.io/ovenbird-site/) estão as informações do aplicativo e as opções de instalação. O [repositório no GitHub](https://github.com/diegopn/ovenbird) reúne o código-fonte e os detalhes técnicos.
