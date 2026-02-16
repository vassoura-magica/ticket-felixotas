# Documentação de Funcionalidades - Ticket Felixotas

## Visão Geral

Bot de tickets para Discord desenvolvido com JavaScript, utilizando Discord.js v14, slash commands e components v2. Design profissional, clean e sem emojis.

## Características Principais

### 1. Sistema de Tickets Completo

#### Criação de Tickets
- Usuários criam tickets clicando em um botão no painel
- Cada usuário pode ter apenas um ticket aberto por vez
- Tickets são criados em uma categoria específica
- Permissões configuradas automaticamente (apenas o usuário e staff podem ver)
- Nome do canal: `ticket-{username}`

#### Gerenciamento de Tickets
- **Assumir**: Staff pode assumir responsabilidade pelo ticket
- **Fechar**: Staff pode fechar o ticket (impede novas mensagens)
- **Deletar**: Staff pode deletar completamente o canal após fechamento

### 2. Slash Commands (Discord.js v14)

#### `/ticket painel [canal]`
- Cria o painel de tickets em um canal específico
- Requer permissões de Administrador
- Painel contém:
  - Embed com título e descrição
  - Botão "Abrir Ticket"
  - Crédito no rodapé

### 3. Components v2 (Botões Interativos)

Todos os botões utilizam a API de Components v2:
- **Abrir Ticket**: Cria novo ticket
- **Assumir**: Staff assume o ticket
- **Fechar**: Solicita confirmação para fechar
- **Deletar**: Solicita confirmação para deletar
- **Confirmar**: Confirma ações críticas
- **Cancelar**: Cancela operações

### 4. Sistema de Logs Otimizado

O sistema de logs foi projetado para eficiência:

#### Características
- Logs armazenados em memória durante operações
- Envio em lote ao final de cada ação
- Reduz chamadas à API do Discord
- Informações completas: usuário, staff, canal, timestamp

#### Eventos Registrados
- **Criação de Ticket**: Registra usuário e canal
- **Assumir Ticket**: Registra staff e canal
- **Fechar Ticket**: Registra staff, canal e timestamp
- **Deletar Ticket**: Registra staff, canal e timestamp

#### Formato dos Logs
```
Embed com:
- Título (tipo de ação)
- Campos com informações (usuário, staff, canal)
- Cor correspondente à ação
- Timestamp
- Crédito no rodapé
```

### 5. Design Profissional e Clean

#### Paleta de Cores
- **Primary** (#5865F2): Ações principais e painel
- **Success** (#57F287): Criação e assunção de tickets
- **Warning** (#FEE75C): Fechamento de tickets
- **Danger** (#ED4245): Deleção de tickets

#### Princípios de Design
- Sem emojis (conforme solicitado)
- Mensagens diretas e objetivas
- Layout consistente em todas as embeds
- Confirmações para ações destrutivas
- Feedback claro ao usuário

### 6. Status do Bot

O bot exibe um status personalizado:
- Tipo: Streaming
- Texto: "Sistema de Tickets | Desenvolvido por felixotas"
- URL: https://www.twitch.tv/felixotas
- Status: Online

### 7. Configuração Centralizada

Todas as configurações em um único arquivo (`config.js`):
- Credenciais (via .env)
- Textos e mensagens
- Cores do tema
- Nomes e padrões

## Fluxo de Uso

### Para Usuários

1. Usuário vê o painel de tickets
2. Clica no botão "Abrir Ticket"
3. Bot verifica se usuário já tem ticket aberto
4. Se não tiver, cria novo canal
5. Usuário pode conversar com staff no canal

### Para Staff

1. Staff vê novo ticket criado
2. Pode assumir o ticket (botão "Assumir")
3. Após resolver o problema, clica em "Fechar"
4. Confirma o fechamento
5. Ticket é fechado, usuários não podem mais enviar mensagens
6. Staff pode deletar o ticket (botão "Deletar")
7. Confirma a deleção
8. Canal é deletado após 5 segundos

## Permissões Necessárias

### Para o Bot
- Read Messages/View Channels
- Send Messages
- Manage Channels
- Manage Messages
- Read Message History
- Use Slash Commands

### Para Staff (Gerenciar Tickets)
- Manage Channels

## Segurança

- Token armazenado em variável de ambiente
- Validações de permissões em todas as ações
- Confirmações para ações destrutivas
- 0 vulnerabilidades encontradas no CodeQL Security Check

## Estatísticas do Código

- **Total de Linhas**: ~486 linhas
- **Arquivos JavaScript**: 8
- **Comandos Slash**: 1
- **Eventos**: 2
- **Utilitários**: 2
- **Dependências**: 2

## Manutenibilidade

### Estrutura Modular
- Comandos separados por arquivo
- Eventos organizados por tipo
- Utilitários reutilizáveis
- Configuração centralizada

### Boas Práticas
- Código limpo e legível
- Separação de responsabilidades
- Tratamento de erros
- Validações consistentes

## Extensibilidade

O bot foi projetado para fácil extensão:
- Adicionar novos comandos em `commands/`
- Adicionar novos eventos em `events/`
- Personalizar configurações em `config.js`
- Adicionar novos utilitários em `utils/`

## Créditos

Desenvolvido por felixotas

## Suporte

Para problemas ou dúvidas, consulte:
- README.md (documentação principal)
- SETUP.md (guia de configuração)
- Este arquivo (documentação de funcionalidades)
