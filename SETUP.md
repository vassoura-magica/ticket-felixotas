# Guia de Configuração - Ticket Felixotas

## Pré-requisitos

- Node.js 16.9.0 ou superior
- Uma aplicação Discord criada no [Discord Developer Portal](https://discord.com/developers/applications)
- Servidor Discord onde o bot será instalado

## Passo 1: Criar o Bot no Discord

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome ao seu bot e clique em "Create"
4. Na aba "Bot", clique em "Add Bot"
5. Copie o **Token** do bot (será usado no arquivo .env)
6. Habilite as seguintes **Privileged Gateway Intents**:
   - Server Members Intent
   - Message Content Intent

## Passo 2: Obter as IDs Necessárias

1. Ative o **Modo Desenvolvedor** no Discord:
   - Discord → Configurações → Avançado → Modo Desenvolvedor

2. Copie as seguintes IDs (clique com botão direito e "Copiar ID"):
   - **CLIENT_ID**: Vá para Developer Portal → sua aplicação → General Information → Application ID
   - **GUILD_ID**: Clique com botão direito no ícone do seu servidor
   - **LOG_CHANNEL_ID**: Clique com botão direito no canal onde os logs serão enviados
   - **TICKET_CATEGORY_ID**: Clique com botão direito na categoria onde os tickets serão criados

## Passo 3: Instalar o Bot no Servidor

1. No Developer Portal, vá para "OAuth2" → "URL Generator"
2. Selecione os seguintes **scopes**:
   - bot
   - applications.commands
3. Selecione as seguintes **permissões**:
   - Read Messages/View Channels
   - Send Messages
   - Manage Channels
   - Manage Messages
   - Read Message History
   - Use Slash Commands
4. Copie o URL gerado e abra no navegador
5. Selecione seu servidor e autorize o bot

## Passo 4: Configurar o Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` e preencha com suas informações:
```env
TOKEN=seu_token_aqui
CLIENT_ID=seu_client_id_aqui
GUILD_ID=seu_guild_id_aqui
LOG_CHANNEL_ID=seu_log_channel_id_aqui
TICKET_CATEGORY_ID=seu_ticket_category_id_aqui
```

## Passo 5: Registrar os Comandos Slash

```bash
npm run deploy
```

Este comando registrará os comandos slash no seu servidor.

## Passo 6: Iniciar o Bot

```bash
npm start
```

Se tudo estiver configurado corretamente, você verá:
```
Bot online como NomeDoBot#1234
1 servidores conectados
```

## Passo 7: Criar o Painel de Tickets

1. No Discord, use o comando:
```
/ticket painel #nome-do-canal
```

2. O bot criará um painel no canal especificado

## Uso

### Para Usuários
- Clique no botão "Abrir Ticket" para criar um ticket

### Para Staff
- **Assumir**: Assumir responsabilidade pelo ticket
- **Fechar**: Fechar o ticket (impede novas mensagens)
- **Deletar**: Deletar completamente o canal do ticket

## Troubleshooting

### Bot não responde aos comandos
- Verifique se os comandos foram registrados (`npm run deploy`)
- Verifique se o bot tem as permissões necessárias
- Verifique os intents habilitados no Developer Portal

### Erro ao criar tickets
- Verifique se a categoria existe e se o bot tem permissões nela
- Verifique se o `TICKET_CATEGORY_ID` está correto no .env

### Logs não aparecem
- Verifique se o canal de logs existe
- Verifique se o `LOG_CHANNEL_ID` está correto no .env
- Verifique se o bot tem permissão para enviar mensagens no canal

## Personalização

Você pode personalizar as mensagens e cores editando o arquivo `config.js`:
- Títulos e descrições
- Cores dos embeds
- Nomes dos tickets
- Mensagens de confirmação

## Créditos

Desenvolvido por felixotas
