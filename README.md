# Ticket Felixotas

Bot de tickets para Discord desenvolvido por felixotas.

## Recursos

- Sistema de tickets com slash commands
- Painel interativo com botões (Components v2)
- Gerenciamento completo de tickets (criar, assumir, fechar, deletar)
- Sistema de logs otimizado
- Design profissional e limpo
- Status de streaming personalizado

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais do Discord

4. Registre os comandos slash:
```bash
npm run deploy
```

5. Inicie o bot:
```bash
npm start
```

## Configuração

### Variáveis de Ambiente (.env)

- `TOKEN`: Token do bot Discord
- `CLIENT_ID`: ID do cliente do bot
- `GUILD_ID`: ID do servidor Discord
- `LOG_CHANNEL_ID`: ID do canal para logs
- `TICKET_CATEGORY_ID`: ID da categoria para os tickets

### Como obter as IDs

1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com botão direito nos elementos e selecione "Copiar ID"

## Uso

### Comandos

- `/ticket painel [canal]` - Cria o painel de tickets em um canal específico

### Funcionalidades

1. **Criar Ticket**: Usuários clicam no botão do painel para abrir um ticket
2. **Assumir Ticket**: Staff pode assumir um ticket clicando em "Assumir"
3. **Fechar Ticket**: Staff fecha o ticket, impedindo novas mensagens
4. **Deletar Ticket**: Remove o canal do ticket completamente

## Estrutura do Projeto

```
ticket-felixotas/
├── commands/           # Comandos slash
├── events/            # Eventos do Discord
├── utils/             # Utilitários (handlers, logger)
├── config.js          # Configurações do bot
├── index.js           # Arquivo principal
└── deploy-commands.js # Script para registrar comandos
```

## Créditos

Desenvolvido por felixotas

